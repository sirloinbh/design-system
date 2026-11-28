// Copies the UI kit (what git tracks under src/ and public/, without stories) into delivery/ui/frontend/, the folder a
// release hands to the project-standards sync (ADR-0031). delivery/ui/skills is written by hand and is not touched.
// Usage: node scripts/build-delivery.mjs           writes delivery/ui/frontend/
//        node scripts/build-delivery.mjs --check   fails when delivery/ui/frontend/ is not what the command above writes
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const KIT_FOLDERS = ['src', 'public'];
export const TARGET = 'delivery/ui/frontend';
export const FIX = 'npm run delivery';

/** The kit files of a checkout: git-tracked files under src/ and public/, without stories. */
export function kitFiles(dir) {
  const out = execFileSync('git', ['ls-files', '-z', '--', ...KIT_FOLDERS], { cwd: dir, encoding: 'utf8' });
  return out
    .split('\0')
    .filter(Boolean)
    .filter((f) => !/\.stories\.[a-z]+$/.test(f))
    .sort();
}

const walk = (dir, base = dir) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name), base) : [path.relative(base, path.join(dir, e.name)).split(path.sep).join('/')]))
    : [];

/** Differences between the kit and delivery/ui/frontend/, as readable lines. Empty when they match byte for byte. */
export function deliveryProblems(dir, files = kitFiles(dir)) {
  const problems = [];
  const delivered = walk(path.join(dir, TARGET));
  for (const f of files) {
    const target = path.join(dir, TARGET, f);
    if (!fs.existsSync(target)) problems.push(`${TARGET}/${f} is missing`);
    else if (!fs.readFileSync(target).equals(fs.readFileSync(path.join(dir, f)))) problems.push(`${TARGET}/${f} differs from ${f}`);
  }
  for (const f of delivered) if (!files.includes(f)) problems.push(`${TARGET}/${f} has no source in src/ or public/`);
  return problems;
}

/** Makes delivery/ui/frontend/ equal to the kit. */
export function buildDelivery(dir, files = kitFiles(dir)) {
  fs.rmSync(path.join(dir, TARGET), { recursive: true, force: true });
  for (const f of files) {
    const target = path.join(dir, TARGET, f);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(path.join(dir, f), target);
  }
  return files.length;
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  if (process.argv.includes('--check')) {
    const problems = deliveryProblems(root);
    if (problems.length) {
      for (const p of problems) console.error(`error: ${p}`);
      console.error(`\nThe release folder ${TARGET}/ is out of date with src/ and public/. Run \`${FIX}\` and commit the result.`);
      process.exit(1);
    }
    console.log(`build-delivery: ${TARGET}/ matches the kit`);
  } else {
    console.log(`build-delivery: wrote ${buildDelivery(root)} files to ${TARGET}/`);
  }
}
