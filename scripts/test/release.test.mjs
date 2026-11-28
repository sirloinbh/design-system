import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'vitest';
import { installationToken, openPinPr, prBody, raisePin } from '../open-pin-pr.mjs';
import { highestBump, newestVersion, nextVersion, parseBump, planRelease, releaseNotes } from '../release-plan.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const SHA = 'a'.repeat(40);
const VERSIONS = '{\n  "node": "24.21.0",\n  "design-system": { "repo": "sirloinbh/design-system", "version": null, "sha": null },\n  "packages": {}\n}\n';

test('a change record asks for a bump with a Release line, and counts as patch without one', () => {
  assert.equal(parseBump('# x\n\nRelease: minor\n'), 'minor');
  assert.equal(parseBump('# x\nrelease: NONE\n'), 'none');
  assert.equal(parseBump('# x\n\nno line\n'), 'patch');
  assert.equal(highestBump(['patch', 'major', 'minor']), 'major');
  assert.equal(highestBump([]), 'none');
});

test('versions are raised by the ADR-0031 levels', () => {
  assert.equal(nextVersion('1.4.2', 'patch'), '1.4.3');
  assert.equal(nextVersion('1.4.2', 'minor'), '1.5.0');
  assert.equal(nextVersion('1.4.2', 'major'), '2.0.0');
  assert.throws(() => nextVersion('1.4.2', 'none'), /cannot raise/);
  assert.throws(() => nextVersion('v1.4', 'patch'), /not a version/);
});

test('the plan takes the highest bump of the records since the last release', () => {
  const records = [
    { file: 'docs/changes/1-a.md', text: '# Add a badge variant\n\nRelease: minor\n' },
    { file: 'docs/changes/2-b.md', text: '# Fix focus ring\n' },
  ];
  const plan = planRelease({ last: '1.2.3', records });
  assert.deepEqual([plan.bump, plan.next], ['minor', '1.3.0']);
  assert.match(plan.changelog, /^## 1\.3\.0\n\n- Add a badge variant \(minor; docs\/changes\/1-a\.md\)\n- Fix focus ring \(patch; docs\/changes\/2-b\.md\)\n$/);
  assert.equal(planRelease({ last: null, records }).next, '1.0.0');
  assert.deepEqual(planRelease({ last: '1.0.0', records: [{ file: 'f.md', text: 'Release: none' }] }).next, null);
});

test('release notes are the CHANGELOG section of one version', () => {
  const text = '# Changelog\n\n## 1.1.0\n\n- B\n\n## 1.0.0\n\n- A\n';
  assert.equal(releaseNotes(text, '1.1.0'), '- B');
  assert.equal(releaseNotes(text, '1.0.0'), '- A');
  assert.equal(releaseNotes(text, '2.0.0'), null);
  assert.equal(newestVersion(text), '1.1.0');
  assert.match(newestVersion(fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8')), /^\d+\.\d+\.\d+$/);
});

test('the release workflow runs on v tags only, never on package tags, and skips the pin PR without the App', () => {
  const text = fs.readFileSync(path.join(root, '.github/workflows/release.yml'), 'utf8');
  assert.match(text, /tags: \['v\*'\]/);
  assert.match(text, /PIN_APP_ID is not set, so the pin PR was not opened/);
  assert.ok(!text.includes('${{ github.ref_name }}"'), 'the tag is read from the TAG variable only');
});

test('raisePin changes only the design-system line', () => {
  const out = raisePin(VERSIONS, { version: '1.0.0', sha: SHA });
  assert.equal(out, VERSIONS.replace('"version": null, "sha": null', `"version": "1.0.0", "sha": "${SHA}"`));
  assert.throws(() => raisePin(VERSIONS, { version: '1.0', sha: SHA }), /not a version/);
  assert.throws(() => raisePin(VERSIONS, { version: '1.0.0', sha: 'abc' }), /not a commit sha/);
  assert.throws(() => raisePin('{}', { version: '1.0.0', sha: SHA }), /no one-line/);
});

function fakeGithub({ branchExists = false, openPr = false } = {}) {
  const calls = [];
  const request = async (method, path, body, { allow404 = false } = {}) => {
    calls.push([method, path.split('?')[0], body]);
    if (path.endsWith('/git/ref/heads/main')) return { object: { sha: 'm'.repeat(40) } };
    if (path.includes('/contents/versions.json')) return { sha: 'blob', content: Buffer.from(VERSIONS).toString('base64') };
    if (path.includes('/git/ref/heads/chore/')) return branchExists ? { object: { sha: 'b'.repeat(40) } } : allow404 ? null : assert.fail('404 expected');
    if (path.startsWith('/repos/sirloinbh/project-standards/pulls?')) return openPr ? [{ number: 7, html_url: 'https://pr/7' }] : [];
    if (method === 'POST' && path.endsWith('/pulls')) return { html_url: 'https://pr/8' };
    return {};
  };
  return { calls, request };
}

test('the pin PR is created on a new branch, or updated when it is already open', async () => {
  const fresh = fakeGithub();
  assert.equal(await openPinPr({ request: fresh.request, version: '1.0.0', sha: SHA, notes: '- A', runUrl: 'https://run' }), 'https://pr/8');
  assert.deepEqual(fresh.calls.map(([m, p]) => `${m} ${p.replace('/repos/sirloinbh/project-standards', '')}`), [
    'GET /git/ref/heads/main',
    'GET /contents/versions.json',
    'GET /git/ref/heads/chore/design-system-1.0.0',
    'POST /git/refs',
    'PUT /contents/versions.json',
    'GET /pulls',
    'POST /pulls',
  ]);
  const put = fresh.calls.find(([m]) => m === 'PUT')[2];
  assert.equal(put.branch, 'chore/design-system-1.0.0');
  assert.match(Buffer.from(put.content, 'base64').toString(), /"version": "1\.0\.0"/);

  const again = fakeGithub({ branchExists: true, openPr: true });
  assert.equal(await openPinPr({ request: again.request, version: '1.0.0', sha: SHA, notes: '- A', runUrl: '' }), 'https://pr/7');
  assert.ok(!again.calls.some(([m, p]) => m === 'POST' && p.endsWith('/git/refs')));
  assert.ok(again.calls.some(([m]) => m === 'PATCH'));
});

test('the pin PR body carries the release notes and the template headings', () => {
  const body = prBody({ version: '2.0.0', sha: SHA, notes: '- Removed Foo', runUrl: '' });
  for (const heading of ['## What changed', '## Why', '## Release notes', '## Verification', '## Check before merging', '## Impact']) assert.ok(body.includes(heading), heading);
  assert.ok(body.includes('- Removed Foo'));
});

test('an installation token is requested for project-standards only', async () => {
  const { privateKey } = crypto.generateKeyPairSync('rsa', { modulusLength: 2048, privateKeyEncoding: { type: 'pkcs8', format: 'pem' }, publicKeyEncoding: { type: 'spki', format: 'pem' } });
  const seen = [];
  const fetchImpl = async (url, init) => {
    seen.push([init.method, url, init.body]);
    const ok = (json) => ({ ok: true, status: 200, json: async () => json });
    return url.endsWith('/installation') ? ok({ id: 42 }) : ok({ token: 'tkn' });
  };
  assert.equal(await installationToken({ appId: '1', privateKey, fetchImpl }), 'tkn');
  assert.equal(seen[1][1], 'https://api.github.com/app/installations/42/access_tokens');
  assert.deepEqual(JSON.parse(seen[1][2]), { repositories: ['project-standards'], permissions: { contents: 'write', pull_requests: 'write' } });
  await assert.rejects(installationToken({ appId: '', privateKey, fetchImpl }), /PIN_APP_ID/);
  await assert.rejects(installationToken({ appId: '1', privateKey: 'nope', fetchImpl }), /PEM/);
});
