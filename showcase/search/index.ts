// The showcase search. Entries for tokens and guideline rules are built from the sources at build time;
// stories and docs pages come from Storybook's own index.json at run time (see SearchPage).

export type SearchEntry = {
  kind: 'token' | 'rule' | 'section' | 'page';
  name: string;
  detail: string;
  /** Storybook path, for example /story/foundations-colors--page. */
  path: string;
};

type TokenSource = Record<string, unknown>;

const TOKEN_PAGES: Record<string, string> = {
  color: '/story/foundations-colors--page',
  font: '/story/foundations-typography--page',
  fontSize: '/story/foundations-typography--page',
  fontWeight: '/story/foundations-typography--page',
  textStyles: '/story/foundations-typography--page',
  spacing: '/story/foundations-spacing-and-layout--page',
  breakpoints: '/story/foundations-spacing-and-layout--page',
  responsive: '/story/foundations-spacing-and-layout--page',
  radius: '/story/foundations-radius-borders-and-shadows--page',
  shadow: '/story/foundations-radius-borders-and-shadows--page',
  border: '/story/foundations-radius-borders-and-shadows--page',
  icon: '/story/foundations-icons-and-emoji--page',
  zIndex: '/story/foundations-motion-layers-and-loading--page',
  motion: '/story/foundations-motion-layers-and-loading--page',
  loading: '/story/foundations-motion-layers-and-loading--page',
};

// Names of the tokens: every list item with a `name`, the color list and the layout tokens.
export function tokenEntries(tokens: TokenSource): SearchEntry[] {
  const entries: SearchEntry[] = [];
  const add = (group: string, item: unknown) => {
    if (!item || typeof item !== 'object') return;
    const { name, use } = item as { name?: unknown; use?: unknown };
    if (typeof name !== 'string' || !TOKEN_PAGES[group]) return;
    entries.push({
      kind: 'token',
      name,
      detail: `${group}${typeof use === 'string' ? `: ${use}` : ''}`,
      path: TOKEN_PAGES[group],
    });
  };
  for (const [group, value] of Object.entries(tokens)) {
    if (Array.isArray(value)) value.forEach((i) => add(group, i));
  }
  const color = tokens.color as { light?: unknown[] } | undefined;
  color?.light?.forEach((i) => add('color', i));
  const layout = (tokens.spacing as { layout?: unknown[] } | undefined)?.layout;
  layout?.forEach((i) => add('spacing', i));
  return entries;
}

export type DocSource = { id: string; title: string; source: string };

const stripMarkdown = (s: string) =>
  s
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .trim();

// Headings of each guidelines document, and the first column of its tables (the rule or area names).
export function docEntries(docs: DocSource[]): SearchEntry[] {
  const entries: SearchEntry[] = [];
  for (const doc of docs) {
    const path = `/story/guidelines-${doc.id}--page`;
    let heading = doc.title;
    for (const line of doc.source.split('\n')) {
      const h = /^#{2,3}\s+(.+)$/.exec(line);
      if (h) {
        heading = stripMarkdown(h[1]);
        entries.push({ kind: 'section', name: heading, detail: doc.title, path });
        continue;
      }
      const row = /^\|\s*([^|]+?)\s*\|/.exec(line);
      if (row && !/^[-: ]+$/.test(row[1]) && !['Area', 'Rule', 'Token', 'Name'].includes(row[1])) {
        entries.push({
          kind: 'rule',
          name: stripMarkdown(row[1]),
          detail: `${doc.title}: ${heading}`,
          path,
        });
      }
    }
  }
  return entries;
}

export type StoryIndex = {
  entries: Record<string, { id: string; title: string; name: string; type: string }>;
};

// One entry per component or page title in Storybook's index.json.
export function indexEntries(index: StoryIndex): SearchEntry[] {
  const seen = new Set<string>();
  const entries: SearchEntry[] = [];
  for (const e of Object.values(index.entries)) {
    if (seen.has(e.title)) continue;
    seen.add(e.title);
    entries.push({
      kind: 'page',
      name: e.title.split('/').pop() ?? e.title,
      detail: e.title,
      path: `/${e.type === 'docs' ? 'docs' : 'story'}/${e.id}`,
    });
  }
  return entries;
}

// Case-insensitive match on every word; names that start with the query rank first.
export function search(entries: SearchEntry[], query: string, limit = 25): SearchEntry[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of entries) {
    const name = entry.name.toLowerCase();
    const hay = `${name} ${entry.detail.toLowerCase()}`;
    if (!words.every((w) => hay.includes(w))) continue;
    const score =
      name === query.toLowerCase()
        ? 0
        : name.startsWith(words[0])
          ? 1
          : name.includes(words[0])
            ? 2
            : 3;
    scored.push({ entry, score });
  }
  return scored
    .sort((a, b) => a.score - b.score || a.entry.name.localeCompare(b.entry.name))
    .slice(0, limit)
    .map((s) => s.entry);
}
