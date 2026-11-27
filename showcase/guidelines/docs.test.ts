import { expect, test } from 'vitest';

import { docEntries } from '../search';
import { GUIDELINE_DOCS, rewriteLinks } from './docs';

test('every guideline document is loaded and starts with a heading', () => {
  for (const doc of GUIDELINE_DOCS) {
    expect(doc.source, doc.file).toMatch(/^#\s+\S/m);
  }
});

test('the design guidelines rules are searchable by area name', () => {
  const names = docEntries(GUIDELINE_DOCS).map((e) => e.name);
  expect(names).toContain('Loading');
});

test('links to other guideline documents become showcase page links', () => {
  const out = rewriteLinks(
    'See [the checklist](review-checklist.md#a) and [other](x.md).',
    GUIDELINE_DOCS,
  );
  expect(out).toContain('(?path=/docs/guidelines-review-checklist--docs)');
  expect(out).toContain('(x.md)');
});
