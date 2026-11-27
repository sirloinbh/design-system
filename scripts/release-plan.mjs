// Plans a design-system release from the change records (#1173, ADR-0031 "Versioning").
// Every docs/changes/<issue>-<slug>.md may carry one line `Release: major|minor|patch|none`; a record without it counts as patch.
// Usage: node scripts/release-plan.mjs                  prints { from, bump, next, records, changelog } for the records added since the last v* tag
//        node scripts/release-plan.mjs --notes <version>  prints the root CHANGELOG.md section of that version (release notes)
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const BUMPS = ['none', 'patch', 'minor', 'major'];
export const FIRST_VERSION = '1.0.0';
const VERSION = /^\d+\.\d+\.\d+$/;

/** The bump a change record asks for; a record without a Release line counts as patch. */
export function parseBump(text) {
  const match = text.match(/^Release:\s*(major|minor|patch|none)\s*$/im);
  return match ? match[1].toLowerCase() : 'patch';
}

/** First "# " heading of a record. */
export function recordTitle(text, fallback) {
  return text.match(/^#\s+(.+)$/m)?.[1].trim() ?? fallback;
}

/** The highest bump among the given ones; 'none' when the list is empty. */
export function highestBump(bumps) {
  return bumps.reduce((best, bump) => (BUMPS.indexOf(bump) > BUMPS.indexOf(best) ? bump : best), 'none');
}

/** `current` (x.y.z) raised by `bump`. A major bump resets minor and patch, a minor bump resets patch. */
export function nextVersion(current, bump) {
  if (!VERSION.test(current)) throw new Error(`not a version: ${current}`);
  if (!BUMPS.includes(bump) || bump === 'none') throw new Error(`cannot raise ${current} by "${bump}"`);
  const [major, minor, patch] = current.split('.').map(Number);
  if (bump === 'major') return `${major + 1}.0.0`;
  if (bump === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

/** Plan from the records added since the last release (`last` is a version or null). `records` is [{ file, text }]. */
export function planRelease({ last, records }) {
  const bumps = records.map((r) => parseBump(r.text));
  const bump = highestBump(bumps);
  const next = bump === 'none' ? null : last ? nextVersion(last, bump) : FIRST_VERSION;
  const lines = records.map((r, i) => `- ${recordTitle(r.text, r.file)} (${bumps[i]}; ${r.file})`);
  return { from: last, bump, next, records: records.map((r) => r.file), changelog: next ? `## ${next}\n\n${lines.join('\n')}\n` : '' };
}

/** The text of the `## <version>` section of a changelog, or null. */
export function releaseNotes(text, version) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const start = lines.indexOf(`## ${version}`);
  if (start < 0) return null;
  const end = lines.findIndex((line, i) => i > start && line.startsWith('## '));
  return lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim();
}

/** Newest version heading of a changelog, or null. */
export function newestVersion(text) {
  return text.match(/^## (\d+\.\d+\.\d+)\s*$/m)?.[1] ?? null;
}

const git = (root, ...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();

function lastVersion(root) {
  try {
    return git(root, 'describe', '--tags', '--abbrev=0', '--match', 'v[0-9]*').slice(1);
  } catch {
    return null;
  }
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  try {
    if (process.argv[2] === '--notes') {
      const notes = releaseNotes(fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8'), process.argv[3]);
      if (notes === null) throw new Error(`CHANGELOG.md has no "## ${process.argv[3]}" section`);
      console.log(notes);
    } else {
      const last = lastVersion(root);
      const listing = last ? git(root, 'diff', '--name-only', '--diff-filter=A', `v${last}..HEAD`, '--', 'docs/changes') : git(root, 'ls-files', 'docs/changes');
      const records = listing.split('\n').filter((f) => f.endsWith('.md')).map((file) => ({ file, text: fs.readFileSync(path.join(root, file), 'utf8') }));
      console.log(JSON.stringify(planRelease({ last, records }), null, 2));
    }
  } catch (error) {
    console.error(`release-plan: ${error.message}`);
    process.exit(1);
  }
}
