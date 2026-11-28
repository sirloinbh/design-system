// The apps get some files rendered from `*.tmpl` templates by the project-standards sync (app list, dark-only flag,
// AI shell flag, root domain). The kit imports the rendered files, so before lint, types and tests this script writes
// them next to the templates with sample values. The generated files are git-ignored and never part of a release.
// Usage: node scripts/render-dev-files.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Sample values only. The real ones come from registry/projects.json in project-standards.
export const SAMPLE = {
  'project.name': 'design-system',
  'project.icon': 'Palette',
  'project.features.darkOnly': 'false',
  'project.features.aiShell': 'false',
  'platform.rootDomain': 'example.test',
  'apps.list': "  { name: 'design-system', label: 'Design system', href: 'https://design.example.test/' },",
};

export const renderTemplate = (text, values = SAMPLE) =>
  text.replace(/\{\{\s*([A-Za-z0-9_.@/-]+)\s*\}\}/g, (match, name) => {
    if (!(name in values)) throw new Error(`no sample value for template variable ${name}`);
    return values[name];
  });

/** Lists the `*.tmpl` files of the kit (src and public). */
export function templateFiles(dir = root) {
  const out = [];
  const walk = (folder) => {
    for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
      const full = path.join(folder, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.tmpl')) out.push(full);
    }
  };
  for (const base of ['src', 'public']) if (fs.existsSync(path.join(dir, base))) walk(path.join(dir, base));
  return out;
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  for (const file of templateFiles()) {
    fs.writeFileSync(file.slice(0, -'.tmpl'.length), renderTemplate(fs.readFileSync(file, 'utf8')));
    console.log(`wrote ${path.relative(root, file).slice(0, -'.tmpl'.length).split(path.sep).join('/')}`);
  }
}
