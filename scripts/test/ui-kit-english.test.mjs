import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'vitest';

// #1147: the UI kit (src and public) goes to every app, and several apps guard their frontend
// against Hangul, so the kit holds no Korean at all, comments included.
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const HANGUL = /[가-힣]/;
const BINARY = /\.(png|jpe?g|gif|ico|webp|woff2?|ttf|otf)$/i;

function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.name === 'node_modules') return [];
    return entry.isDirectory() ? files(full) : [full];
  });
}

test('no file in the UI kit contains Korean, comments included (#1147)', () => {
  const found = ['src', 'public'].flatMap((folder) => files(path.join(root, folder)))
    .filter((file) => !BINARY.test(file))
    .filter((file) => HANGUL.test(fs.readFileSync(file, 'utf8')))
    .map((file) => path.relative(root, file).split(path.sep).join('/'));
  assert.deepEqual(found, []);
});
