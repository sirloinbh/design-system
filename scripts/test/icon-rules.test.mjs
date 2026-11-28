// The shared icon map (src/lib/icons.ts) and the import rule that keeps apps on it (#70).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ESLint } from 'eslint';
import { expect, test } from 'vitest';

import { ICON_MEANINGS, iconImportConfig } from '../../src/lib/icon-rules.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const iconsSource = fs.readFileSync(path.join(root, 'src/lib/icons.ts'), 'utf8');

// "  Trash2 as DeleteIcon," → { icon: 'Trash2', name: 'DeleteIcon' }
const mapped = [...iconsSource.matchAll(/^\s+(\w+) as (\w+Icon),$/gm)].map(([, icon, name]) => ({ icon, name }));

test('every icon in the map has a rule entry with the same lucide icon, and the other way round', () => {
  expect(mapped.length).toBeGreaterThan(20);
  const byName = new Map(ICON_MEANINGS.map((m) => [m.name, m.icon]));
  expect(Object.fromEntries(mapped.map((m) => [m.name, m.icon]))).toEqual(Object.fromEntries(byName));
});

test('no alternate is also a map icon, and no icon is used for two meanings', () => {
  const icons = ICON_MEANINGS.map((m) => m.icon);
  expect(new Set(icons).size).toBe(icons.length);
  const alternates = ICON_MEANINGS.flatMap((m) => m.alternates);
  expect(alternates.filter((a) => icons.includes(a))).toEqual([]);
});

test('the size scale is 16, 20 and 24 pixels as full Tailwind class names', () => {
  expect(iconsSource).toContain("inline: 'size-4'");
  expect(iconsSource).toContain("menu: 'size-5'");
  expect(iconsSource).toContain("feature: 'size-6'");
});

async function lint(code, filePath = 'src/example.tsx') {
  const eslint = new ESLint({
    cwd: root,
    overrideConfigFile: true,
    overrideConfig: [
      { languageOptions: { ecmaVersion: 'latest', sourceType: 'module' } },
      iconImportConfig({ files: ['src/**/*.{ts,tsx}'], ignores: ['src/lib/icons.ts'] }),
    ],
  });
  const [result] = await eslint.lintText(code, { filePath: path.join(root, filePath) });
  return result.messages.map((m) => m.message);
}

test('an alternate icon for a covered meaning is reported with the icon to use', async () => {
  const messages = await lint("import { Trash } from 'lucide-react';\nexport const a = Trash;\n");
  expect(messages).toHaveLength(1);
  expect(messages[0]).toContain('DeleteIcon');
});

test('the lucide icon the map uses, with or without the Icon suffix, is reported too', async () => {
  expect(await lint("import { Trash2, PlusIcon } from 'lucide-react';\nexport const a = [Trash2, PlusIcon];\n")).toHaveLength(2);
  expect(await lint("import { Pencil as Change } from 'lucide-react';\nexport const a = Change;\n")).toHaveLength(1);
});

test('an icon with no shared meaning, the map itself and other packages are allowed', async () => {
  expect(await lint("import { Dumbbell } from 'lucide-react';\nexport const a = Dumbbell;\n")).toEqual([]);
  expect(await lint("import { AddIcon } from '../lib/icons';\nexport const a = AddIcon;\n")).toEqual([]);
  // The map file is ignored by the rule (ESLint says so), so no icon message is reported for it.
  const source = "import { Trash2 as DeleteIcon } from 'lucide-react';\nexport { DeleteIcon };\n";
  const map = await lint(source, 'src/lib/icons.ts');
  expect(map.filter((m) => m.includes('lib/icons'))).toEqual([]);
});
