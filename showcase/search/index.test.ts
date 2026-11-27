import { expect, test } from 'vitest';

import tokens from '../../tokens/tokens.json';
import { docEntries, indexEntries, search, tokenEntries } from './index';

const docs = [
  {
    id: 'design-guidelines',
    title: 'Design guidelines',
    source:
      '# Design guidelines\n\n## Rules\n\n| Area | Rule |\n| --- | --- |\n| Type scale | Use the tokens |\n| Loading | Use a Skeleton |\n',
  },
];

test('token entries cover colors, sizes and layers', () => {
  const entries = tokenEntries(tokens);
  const names = entries.map((e) => e.name);
  expect(names).toContain('muted-foreground');
  expect(names).toContain('md');
  expect(names).toContain('modal');
  expect(search(entries, 'muted-foreground')[0].path).toBe('/story/foundations-colors--page');
});

test('guideline rule names and headings are found', () => {
  const entries = docEntries(docs);
  expect(search(entries, 'type scale')[0]).toMatchObject({
    kind: 'rule',
    path: '/story/guidelines-design-guidelines--page',
  });
  expect(search(entries, 'rules')[0].kind).toBe('section');
  expect(entries.map((e) => e.name)).not.toContain('Area');
});

test('story index entries are one per title', () => {
  const entries = indexEntries({
    entries: {
      'a--one': { id: 'a--one', title: 'Components/Button', name: 'One', type: 'story' },
      'a--two': { id: 'a--two', title: 'Components/Button', name: 'Two', type: 'story' },
    },
  });
  expect(entries).toHaveLength(1);
  expect(entries[0]).toMatchObject({ name: 'Button', path: '/story/a--one' });
});

test('search ranks a starting match first and needs every word', () => {
  const entries = [
    { kind: 'token' as const, name: 'card-foreground', detail: 'color', path: '/x' },
    { kind: 'token' as const, name: 'card', detail: 'color', path: '/y' },
  ];
  expect(search(entries, 'card')[0].name).toBe('card');
  expect(search(entries, 'card nothing')).toEqual([]);
  expect(search(entries, '')).toEqual([]);
});
