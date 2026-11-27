// Generates docs/design-tokens.md from tokens/tokens.json.
// Usage: node scripts/build-token-docs.mjs          write the file
//        node scripts/build-token-docs.mjs --check  fail if the committed file is stale
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const table = (headers, rows) => [`| ${headers.join(' | ')} |`, `|${headers.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${r.join(' | ')} |`)];

export function renderTokens(t) {
  const size = Object.fromEntries(t.fontSize.map((s) => [s.name, s]));
  const weight = Object.fromEntries(t.fontWeight.map((w) => [w.name, w]));
  const dark = Object.fromEntries(t.color.dark.map((c) => [c.name, c.value]));
  return [
    '# Design tokens',
    '',
    '<!-- Generated file. Edit tokens/tokens.json, then regenerate with `npm run tokens:docs`. -->',
    '',
    `Values shared by the 8 apps. Names follow the shadcn/ui and Tailwind CSS 4 conventions ([ADR-0007](https://github.com/sirloinbh/project-standards/blob/main/docs/adr/0007-shadcn-ui-icons-emoji.md)). The only thing that differs per app is the display name; all apps use the same black-and-white colors ([ADR-0008](https://github.com/sirloinbh/project-standards/blob/main/docs/adr/0008-neutral-light-dark.md)).`,
    '',
    '## Fonts',
    '',
    `- Body and headings: \`${t.font.sans}\``,
    `- Monospace: \`${t.font.mono}\``,
    `- Pretendard ${t.font.pretendard.version} (${t.font.pretendard.released}), ${t.font.pretendard.license}. ${t.font.pretendard.delivery} \`font-display: ${t.font.pretendard.fontDisplay}\`.`,
    '',
    '## Font sizes',
    '',
    ...table(['Name', 'Size', 'Line height', 'Used for'], t.fontSize.map((s) => [`\`text-${s.name}\``, `${s.size} (${s.px}px)`, s.lineHeight, s.use])),
    '',
    '## Font weights',
    '',
    ...table(['Name', 'Value', 'Used for'], t.fontWeight.map((w) => [`\`font-${w.name}\``, w.value, w.use])),
    '',
    '## Text styles (heading levels, body, caption)',
    '',
    'The mobile size is the default, and from `md` (768px) up it grows to the size on the right.',
    '',
    ...table(
      ['Style', 'Element', 'Mobile', 'md and up', 'Weight', 'Tracking', 'Color', 'Used for'],
      t.textStyles.map((s) => [`\`${s.name}\``, `\`${s.element}\``, `${size[s.size].px}px`, `${size[s.sizeMd].px}px`, weight[s.weight].value, s.tracking, `\`${s.color}\``, s.use]),
    ),
    '',
    '**12px floor (user decision, 2026-11-26, #1127).** No text on any screen is smaller than 12px: `text-xs` and `meta` are the smallest sizes, and arbitrary values such as `text-[10px]`, inline `fontSize` under 12, and SVG label sizes under 12 are not allowed. `standards-check` fails on them (`text under 12px`, #1135); the `std-ux-audit` skill checks the computed size in the browser.',
    '',
    '## Spacing',
    '',
    `- ${t.spacing.rule}`,
    '',
    ...table(['Name', 'Mobile', 'md', 'lg', 'Used for'], t.spacing.layout.map((l) => [`\`${l.name}\``, l.mobile, l.md, l.lg, l.use])),
    '',
    '## Corner radius',
    '',
    ...table(['Name', 'CSS variable', 'Value', 'px', 'Used for'], t.radius.map((r) => [`\`rounded-${r.name}\``, `\`${r.css}\``, `\`${r.value}\``, r.px, r.use])),
    '',
    '## Shadows and borders',
    '',
    ...table(['Name', 'Used for'], t.shadow.map((s) => [`\`shadow-${s.name}\``, s.use])),
    '',
    `- ${t.border.rule}`,
    '',
    '## Responsive',
    '',
    `- ${t.responsive.approach} The narrowest screen is ${t.responsive.minWidth}.`,
    `- ${t.responsive.touchRule}`,
    `- ${t.responsive.safeArea}`,
    `- ${t.responsive.verify}`,
    '',
    ...table(['Breakpoint', 'Min width', 'Used for'], t.breakpoints.map((b) => [`\`${b.name}\``, `${b.minWidth} (${b.px}px)`, b.use])),
    '',
    '## Icon sizes',
    '',
    ...table(['Name', 'px', 'Used for'], t.icon.map((i) => [`\`${i.name}\``, i.px, i.use])),
    '',
    '## Stacking order (z-index)',
    '',
    ...table(['Name', 'Value', 'Used for'], t.zIndex.map((z) => [`\`${z.name}\``, z.value, z.use ?? ''])),
    '',
    '## Motion',
    '',
    `- Fast ${t.motion.fast}, normal ${t.motion.normal}, slow ${t.motion.slow}, easing \`${t.motion.easing}\`.`,
    `- ${t.motion.rule}`,
    '',
    '## Loading indicators',
    '',
    `- Skeleton: ${t.loading.skeleton}`,
    `- Spinner: ${t.loading.spinner}`,
    `- ${t.loading.rule}`,
    '',
    '## Colors',
    '',
    `Values are in ${t.color.format}. ${t.color.theme}`,
    '',
    `- ${t.color.mode}`,
    '',
    ...table(['Token', 'Light', 'Dark', 'Used for'], t.color.light.map((c) => [`\`--${c.name}\``, `\`${c.value}\``, `\`${dark[c.name]}\``, c.use])),
    '',
    '## workout-memo legacy token mapping',
    '',
    t.legacy.description,
    '',
    ...table(['Legacy', 'New token', 'Note'], t.legacy.map.map((m) => [`\`${m.old}\``, m.new, m.note])),
    '',
  ].join('\n');
}

const isMain = process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url));
if (isMain) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const tokens = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tokens.json'), 'utf8'));
  const rel = 'docs/design-tokens.md';
  const text = renderTokens(tokens);
  const target = path.join(root, rel);
  if (process.argv.includes('--check')) {
    const current = fs.existsSync(target) ? fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n') : '';
    if (current !== text) {
      console.error(`${rel} is stale. Run \`npm run tokens:docs\` and commit the result.`);
      process.exit(1);
    }
    console.log(`${rel}: up to date`);
  } else {
    fs.writeFileSync(target, text);
    console.log(`wrote ${rel}`);
  }
}
