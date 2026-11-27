// Shared UI holds no Korean at all, comments included: the apps run a Korean screen text check (#1129) and
// the managed UI kit goes to every app (#1147, moved here with the UI kit in #1169).
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'vitest';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const HANGUL = /[가-힣]/;
const BINARY = /\.(png|jpe?g|gif|ico|webp|woff2?|ttf|otf)$/i;
// What ships to the apps or shows on a screen. delivery/ is what sync copies; src/ is the kit source; stories and showcase are screens.
const FOLDERS = ['delivery', 'src', 'stories', 'showcase', '.storybook'];

function files(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules') return [];
    return entry.isDirectory() ? files(full) : [full];
  });
}

test('no shared UI file contains Korean, comments included', () => {
  const found = FOLDERS.flatMap((folder) => files(path.join(root, folder)))
    .filter((file) => !BINARY.test(file))
    .filter((file) => HANGUL.test(fs.readFileSync(file, 'utf8')))
    .map((file) => path.relative(root, file).split(path.sep).join('/'));
  assert.deepEqual(found, []);
});
