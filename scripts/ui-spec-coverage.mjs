// Coverage check for docs/ui-spec.md (#68): every component file under src/components/ has its path in the spec, and every
// exported component (a PascalCase export) is named in it. Read-only, Node built-ins only.
// Usage: node scripts/ui-spec-coverage.mjs [--root <repository>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

/** Component source files: `.tsx` under src/components/ that are not tests or stories. */
export function componentFiles(root) {
  const base = path.join(root, 'src', 'components');
  if (!fs.existsSync(base)) return [];
  return walk(base)
    .map((file) => path.relative(root, file).split(path.sep).join('/'))
    .filter((file) => file.endsWith('.tsx') && !/\.(test|stories)\.tsx$/.test(file))
    .sort();
}

/** PascalCase names a source file exports, from declarations and `export { A, B as C }` lists. */
export function exportedComponents(source) {
  const names = new Set();
  for (const m of source.matchAll(/^export\s+(?:default\s+)?(?:async\s+)?(?:function|const|class)\s+([A-Z]\w*)/gm)) names.add(m[1]);
  for (const m of source.matchAll(/^export\s*\{([^}]*)\}/gm)) {
    for (const part of m[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop();
      if (name && /^[A-Z]\w*$/.test(name)) names.add(name);
    }
  }
  return [...names];
}

/** Problems found in a repository; an empty list means the spec covers every component. */
export function specProblems(root) {
  const specPath = path.join(root, 'docs', 'ui-spec.md');
  if (!fs.existsSync(specPath)) return ['docs/ui-spec.md is missing'];
  const spec = fs.readFileSync(specPath, 'utf8');
  const problems = [];
  for (const file of componentFiles(root)) {
    const names = exportedComponents(fs.readFileSync(path.join(root, file), 'utf8'));
    if (names.length === 0) continue;
    if (!spec.includes(`\`${file}\``)) problems.push(`${file} has no "Source: \`${file}\`" line in docs/ui-spec.md`);
    for (const name of names) {
      if (!new RegExp(String.raw`\b${name}\b`).test(spec)) problems.push(`${name} (${file}) is not named in docs/ui-spec.md`);
    }
  }
  return problems;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const i = process.argv.indexOf('--root');
  const root = i > -1 ? path.resolve(process.argv[i + 1]) : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const problems = specProblems(root);
  for (const p of problems) console.error(`ui-spec: ${p}`);
  if (problems.length > 0) process.exit(1);
  console.log('ui-spec: every component has a section');
}
