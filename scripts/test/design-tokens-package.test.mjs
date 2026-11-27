import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'vitest';
import { renderTailwindCss, renderTokensCss } from '../build-tokens.mjs';
import { changelogSection } from '../changelog-section.mjs';
import { checkAll, checkTag } from '../package-guard.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8').replace(/\r\n/g, '\n');
const json = (rel) => JSON.parse(read(rel));
const tokens = json('tokens/tokens.json');

test('the design-tokens package passes package-guard and is the only package', () => {
  assert.deepEqual(checkAll(root), []);
  assert.deepEqual(fs.readdirSync(path.join(root, 'packages')).sort(), ['design-tokens']);
});

test('a release tag must match the package version', () => {
  const { version } = json('packages/design-tokens/package.json');
  assert.deepEqual(checkTag(root, `design-tokens/v${version}`), []);
  assert.deepEqual(checkTag(root, 'design-tokens/v0.0.1'), [`tag design-tokens/v0.0.1: packages/design-tokens is version ${version}`]);
  assert.deepEqual(checkTag(root, 'v1.0.0'), ['tag v1.0.0 must look like <package>/v<x.y.z>']);
  assert.ok(changelogSection(read('packages/design-tokens/CHANGELOG.md'), version), 'the release notes come from the CHANGELOG section');
});

test('the design-tokens CSS is generated from tokens/tokens.json and committed', () => {
  assert.equal(read('packages/design-tokens/tokens.css'), renderTokensCss(tokens), 'run `npm run tokens`');
  assert.equal(read('packages/design-tokens/tailwind.css'), renderTailwindCss(tokens), 'run `npm run tokens`');
  const css = renderTokensCss(tokens);
  for (const c of tokens.color.light) assert.ok(css.includes(`  --${c.name}: `), c.name);
  // Dark colors apply with <html class="dark">, and with the system setting unless <html class="light">.
  assert.match(css, /\n\.dark \{\n {2}color-scheme: dark;\n {2}--background: oklch\(0\.145 0 0\);/);
  assert.match(css, /@media \(prefers-color-scheme: dark\) \{\n {2}:root:not\(\.light\) \{\n {4}color-scheme: dark;/);
  assert.match(renderTailwindCss(tokens), /@custom-variant dark \{\n {2}&:where\(\.dark, \.dark \*\) \{/);
  const tw = renderTailwindCss(tokens);
  for (const u of ['text-body', 'text-body-sm', 'text-caption', 'text-meta']) assert.ok(tw.includes(`@utility ${u} {`), u);
  assert.match(tw, /@media \(min-width: 48rem\) \{\n {4}h1 \{\n {6}font-size: var\(--text-3xl\);/);
});

test('the bundled Pretendard files match the recorded hashes', () => {
  const sha = (rel) => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');
  const { files } = tokens.font.pretendard;
  const fonts = 'packages/design-tokens/fonts';
  assert.equal(sha(`${fonts}/pretendard.css`), files['pretendardvariable-dynamic-subset.css']);
  assert.equal(sha(`${fonts}/LICENSE-Pretendard.txt`), files['LICENSE.txt']);
  assert.match(read(`${fonts}/LICENSE-Pretendard.txt`), /SIL Open Font License, Version 1\.1/);
  // Exactly the recorded chunks are bundled, and the full 2 MB font is not (#989).
  assert.deepEqual(fs.readdirSync(path.join(root, fonts)).sort(), ['LICENSE-Pretendard.txt', 'pretendard.css', 'woff2-dynamic-subset']);
  assert.deepEqual(fs.readdirSync(path.join(root, fonts, 'woff2-dynamic-subset')).sort(), Object.keys(files.subsets).sort());
  assert.equal(Object.keys(files.subsets).length, 92);
  for (const [name, hash] of Object.entries(files.subsets)) assert.equal(sha(`${fonts}/woff2-dynamic-subset/${name}`), hash, name);
});

test('pretendard.css loads each subset chunk only for its unicode-range, with the same family, weights and display', () => {
  const css = read('packages/design-tokens/fonts/pretendard.css');
  const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
  assert.equal(faces.length, 92);
  const urls = [];
  for (const face of faces) {
    assert.match(face, /font-family: 'Pretendard Variable';/);
    assert.match(face, /font-weight: 45 920;/);
    assert.match(face, new RegExp(`font-display: ${tokens.font.pretendard.fontDisplay};`));
    assert.match(face, /unicode-range: U\+[0-9a-f]/i, 'without a unicode-range the browser downloads the chunk for every page');
    const url = /src: url\(\.\/woff2-dynamic-subset\/([^)]+)\) format\('woff2-variations'\);/.exec(face);
    assert.ok(url, face);
    urls.push(url[1]);
  }
  assert.deepEqual(urls.sort(), Object.keys(tokens.font.pretendard.files.subsets).sort(), 'every chunk is referenced exactly once');
  assert.ok(tokens.font.sans.startsWith('"Pretendard Variable",'), 'the token font stack names the same family');
});
