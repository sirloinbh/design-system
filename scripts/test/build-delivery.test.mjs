import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, test } from 'vitest';
import { buildDelivery, deliveryProblems, FIX, kitFiles } from '../build-delivery.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'delivery-'));
afterAll(() => fs.rmSync(tmp, { recursive: true, force: true }));

const git = (...args) => execFileSync('git', ['-c', 'user.name=test', '-c', 'user.email=test@example.com', ...args], { cwd: tmp, encoding: 'utf8' });
const write = (rel, text) => {
  fs.mkdirSync(path.dirname(path.join(tmp, rel)), { recursive: true });
  fs.writeFileSync(path.join(tmp, rel), text);
};

test('the delivery folder is a copy of the tracked kit files, without stories', () => {
  git('init', '--quiet');
  write('src/button.tsx', 'button');
  write('src/button.stories.tsx', 'story');
  write('src/ignored.ts', 'not tracked');
  write('public/theme-init.js.tmpl', 'theme');
  write('delivery/ui/skills/x/SKILL.md.tmpl', 'hand written');
  git('add', 'src/button.tsx', 'src/button.stories.tsx', 'public/theme-init.js.tmpl', 'delivery/ui/skills/x/SKILL.md.tmpl');
  assert.deepEqual(kitFiles(tmp), ['public/theme-init.js.tmpl', 'src/button.tsx']);
  assert.equal(deliveryProblems(tmp).length, 2);
  assert.equal(buildDelivery(tmp), 2);
  assert.deepEqual(deliveryProblems(tmp), []);
  assert.equal(fs.readFileSync(path.join(tmp, 'delivery/ui/skills/x/SKILL.md.tmpl'), 'utf8'), 'hand written');
});

test('an edited kit file, a removed one and a stray delivered file are reported', () => {
  write('src/button.tsx', 'button v2');
  write('delivery/ui/frontend/src/old.tsx', 'old');
  assert.deepEqual(deliveryProblems(tmp), ['delivery/ui/frontend/src/button.tsx differs from src/button.tsx', 'delivery/ui/frontend/src/old.tsx has no source in src/ or public/']);
  assert.equal(FIX, 'npm run delivery');
});

test('this repository delivers exactly its kit', () => {
  assert.deepEqual(deliveryProblems(root), []);
});
