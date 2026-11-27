# #1185 Showcase search and guidelines pages

- Issue: [sirloinbh/project-standards#1185](https://github.com/sirloinbh/project-standards/issues/1185)
- Branch: `feat/1185-search-guidelines`
- Related: #1172 (guidelines), #1181 (foundations), #1157

## Changes — 2026-11-28

- **Guidelines pages**: `Guidelines/Design guidelines`, `Review checklist`, `Design system`, `Layout` and `UI components` render the Markdown files in `docs/` (imported with `?raw`, shown with the Storybook `Markdown` block), so the documents stay the single source. Relative links between these documents are rewritten to showcase pages and open in the Storybook window.
- **Search page** (`Guidelines/Search`): a client-side search over
  - tokens (names from `tokens/tokens.json`, linking to the foundation page that shows them),
  - guideline rules and headings (the first column of each table and every `##` and `###` heading, linking to the document page),
  - every component and page in Storybook's `index.json`, read at run time, so a new component is searchable without a change here.
    The token and rule entries are built with the bundle; matching is case-insensitive and every word must match (`showcase/search/index.ts`).
- Storybook's own sidebar search keeps working for story titles.
- Tests: the search index and ranking, link rewriting,.

## Verification

- `npm run check`.
