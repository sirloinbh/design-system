import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'vitest';

import { exportedComponents, specProblems } from '../ui-spec-coverage.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..', '..');

function fixture(files) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'ui-spec-'));
  for (const [file, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true });
    fs.writeFileSync(path.join(dir, file), text);
  }
  return dir;
}

test('finds PascalCase exports from declarations and export lists only', () => {
  const source = 'export function Alpha() {}\nexport const Beta = 1;\nexport const gamma = 2;\nfunction Delta() {}\nexport { Delta, Epsilon as Zeta, helper };\n';
  assert.deepEqual(exportedComponents(source).sort(), ['Alpha', 'Beta', 'Delta', 'Zeta']);
});

test('fails when a new component has no section in the spec', () => {
  const dir = fixture({
    'src/components/ui/thing.tsx': 'export function Thing() {}\n',
    'src/components/ui/thing.test.tsx': 'export function NotAComponentFile() {}\n',
    'docs/ui-spec.md': '# Spec\n',
  });
  assert.deepEqual(specProblems(dir), ['src/components/ui/thing.tsx has no "Source: `src/components/ui/thing.tsx`" line in docs/ui-spec.md', 'Thing (src/components/ui/thing.tsx) is not named in docs/ui-spec.md']);
});

test('passes when the spec names the file and the component', () => {
  const dir = fixture({
    'src/components/ui/thing.tsx': 'export function Thing() {}\n',
    'docs/ui-spec.md': '## Thing\n\n- Source: `src/components/ui/thing.tsx`\n',
  });
  assert.deepEqual(specProblems(dir), []);
});

test('this repository documents every component', () => {
  assert.deepEqual(specProblems(root), []);
});
