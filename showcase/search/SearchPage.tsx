import { useEffect, useMemo, useState } from 'react';

import tokens from '../../tokens/tokens.json';
import { GUIDELINE_DOCS } from '../guidelines/docs';
import {
  docEntries,
  indexEntries,
  search,
  type SearchEntry,
  type StoryIndex,
  tokenEntries,
} from './index';

// Built once, with the bundle: tokens and guideline rules.
const BUILT_ENTRIES: SearchEntry[] = [...tokenEntries(tokens), ...docEntries(GUIDELINE_DOCS)];

const KIND_LABEL: Record<SearchEntry['kind'], string> = {
  token: 'Token',
  rule: 'Rule',
  section: 'Guideline section',
  page: 'Page',
};

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [pages, setPages] = useState<SearchEntry[]>([]);

  // Stories and component pages come from Storybook's index.json, so new components are searchable at once.
  useEffect(() => {
    fetch('index.json')
      .then((r) =>
        r.ok ? (r.json() as Promise<StoryIndex>) : Promise.reject(new Error(String(r.status))),
      )
      .then((index) => setPages(indexEntries(index)))
      .catch(() => setPages([]));
  }, []);

  const results = useMemo(() => search([...BUILT_ENTRIES, ...pages], query), [pages, query]);

  return (
    <div
      style={{ maxWidth: 720, width: '100%', padding: 16, fontFamily: 'var(--font-family-sans)' }}
    >
      <h1>Search</h1>
      <label htmlFor="showcase-search" style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>
        Search tokens, components and guidelines
      </label>
      <input
        id="showcase-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="For example: muted-foreground, Skeleton, touch"
        style={{
          width: '100%',
          minHeight: 40,
          padding: '0 12px',
          fontSize: 16,
          boxSizing: 'border-box',
        }}
      />
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 16 }} aria-live="polite">
        {results.map((r) => (
          <li
            key={`${r.kind}-${r.name}-${r.path}`}
            style={{ borderBottom: '1px solid var(--border)', padding: '8px 0' }}
          >
            <a
              href={`?path=${r.path}`}
              target="_top"
              style={{ minHeight: 40, display: 'inline-block', cursor: 'pointer' }}
            >
              {r.name}
            </a>
            <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
              {KIND_LABEL[r.kind]} · {r.detail}
            </div>
          </li>
        ))}
        {query && results.length === 0 ? <li>No results.</li> : null}
      </ul>
    </div>
  );
}
