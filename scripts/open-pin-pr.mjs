// Opens or updates the project-standards PR that raises the design-system pin to a release (#1173, ADR-0031).
// Usage (release.yml only): PIN_APP_ID=<id> PIN_APP_PRIVATE_KEY=<pem> node scripts/open-pin-pr.mjs <version> <sha> <notes-file>
// It edits only the `"design-system"` line of versions.json on the branch chore/design-system-<version>. The PR then goes through
// the normal review in project-standards and its sync waves deliver the release. The App token (contents and pull requests on
// project-standards only) is exchanged here and never printed.
import crypto from 'node:crypto';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export const CENTRAL = 'sirloinbh/project-standards';
const PIN_LINE = /^(\s*"design-system":\s*)(\{[^\n]*\})(,?)[ \t]*$/m;

/** versions.json text with the design-system pin set to version and sha; every other byte stays. */
export function raisePin(text, { version, sha }) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error(`not a version: ${version}`);
  if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error(`not a commit sha: ${sha}`);
  const match = text.match(PIN_LINE);
  if (!match) throw new Error('versions.json has no one-line "design-system" entry');
  const { repo } = JSON.parse(match[2]);
  return text.replace(PIN_LINE, `$1{ "repo": ${JSON.stringify(repo)}, "version": ${JSON.stringify(version)}, "sha": ${JSON.stringify(sha)} }$3`);
}

export function prBody({ version, sha, notes, runUrl }) {
  return `## What changed
Raises the design-system pin to v${version} (\`${sha.slice(0, 7)}\`). The sync then delivers the release to the apps in waves.

## Why
Release flow (#1173): a design-system release reaches the apps through this pin and the sync PRs.

## Release notes
${notes}

## Verification
- \`npm run check\` runs in this PR. Before merging, check the release against every app (#1178).

## Check before merging
- [ ] A major release lists app changes in its notes; merge only together with them.

## Impact
Sync PRs open in every app after this merges (wave order, ADR-0029).

Opened by design-system${runUrl ? `: ${runUrl}` : ''}

Refs #1173
`;
}

/** Calls the GitHub REST API through `request(method, path, body, options)`; returns the PR URL. */
export async function openPinPr({ request, version, sha, notes, runUrl }) {
  const branch = `chore/design-system-${version}`;
  const main = await request('GET', `/repos/${CENTRAL}/git/ref/heads/main`);
  const file = await request('GET', `/repos/${CENTRAL}/contents/versions.json?ref=main`);
  const current = Buffer.from(file.content, 'base64').toString('utf8');
  const updated = raisePin(current, { version, sha });
  if (updated === current) throw new Error(`the pin on project-standards main is already v${version}`);
  const existing = await request('GET', `/repos/${CENTRAL}/git/ref/heads/${branch}`, undefined, { allow404: true });
  if (!existing) await request('POST', `/repos/${CENTRAL}/git/refs`, { ref: `refs/heads/${branch}`, sha: main.object.sha });
  const onBranch = existing ? await request('GET', `/repos/${CENTRAL}/contents/versions.json?ref=${branch}`) : file;
  await request('PUT', `/repos/${CENTRAL}/contents/versions.json`, {
    message: `chore: raise the design-system pin to v${version} (#1173)`,
    content: Buffer.from(updated).toString('base64'),
    sha: onBranch.sha,
    branch,
  });
  const body = prBody({ version, sha, notes, runUrl });
  const open = await request('GET', `/repos/${CENTRAL}/pulls?head=sirloinbh:${branch}&state=open`);
  if (open.length) {
    await request('PATCH', `/repos/${CENTRAL}/pulls/${open[0].number}`, { body });
    return open[0].html_url;
  }
  const pr = await request('POST', `/repos/${CENTRAL}/pulls`, { title: `chore: raise the design-system pin to v${version} (#1173)`, head: branch, base: 'main', body });
  return pr.html_url;
}

export const githubRequest = (token, fetchImpl = fetch) => async (method, path, body, { allow404 = false } = {}) => {
  const response = await fetchImpl(`https://api.github.com${path}`, {
    method,
    headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'x-github-api-version': '2022-11-28', ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30_000),
  });
  if (allow404 && response.status === 404) return null;
  if (!response.ok) throw new Error(`${method} ${path.split('?')[0]} failed: ${response.status}`);
  return response.status === 204 ? null : response.json();
};

const base64url = (input) => Buffer.from(input).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

/** Short-lived installation token for project-standards only, from the App id and private key (RS256 JWT, node:crypto). */
export async function installationToken({ appId, privateKey, fetchImpl = fetch, now = Math.floor(Date.now() / 1000) }) {
  if (!appId) throw new Error('PIN_APP_ID is not set');
  if (!privateKey?.includes('PRIVATE KEY')) throw new Error('PIN_APP_PRIVATE_KEY is not a PEM private key');
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const payload = base64url(JSON.stringify({ iat: now - 60, exp: now + 540, iss: String(appId) }));
  const jwt = `${header}.${payload}.${base64url(crypto.createSign('RSA-SHA256').update(`${header}.${payload}`).sign(privateKey))}`;
  const asApp = githubRequest(jwt, fetchImpl);
  const installation = await asApp('GET', `/repos/${CENTRAL}/installation`);
  const issued = await asApp('POST', `/app/installations/${installation.id}/access_tokens`, { repositories: [CENTRAL.split('/')[1]], permissions: { contents: 'write', pull_requests: 'write' } });
  return issued.token;
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  const [version, sha, notesFile] = process.argv.slice(2);
  try {
    const notes = fs.readFileSync(notesFile, 'utf8').trim();
    console.log(await openPinPr({ request: githubRequest(await installationToken({ appId: process.env.PIN_APP_ID, privateKey: process.env.PIN_APP_PRIVATE_KEY })), version, sha, notes, runUrl: process.env.RUN_URL ?? '' }));
  } catch (error) {
    console.error(`open-pin-pr: ${error.message}`);
    process.exit(1);
  }
}
