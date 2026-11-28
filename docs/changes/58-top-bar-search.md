# #58 Add a top bar search over menus, pages and app content

- Issue: [#58](https://github.com/sirloinbh/design-system/issues/58) (epic #55)
- Branch: `feat/58-top-bar-search`
- Related: sirloinbh/project-standards#1217 (per-app content search), user review of 2026-11-28 item 9
- Release: minor

## Changes — 2026-11-28

- `src/components/search/search-dialog.tsx`: `SearchDialog` on the existing `Dialog`. Groups Menus, Pages and Content; content search is debounced (250 ms), aborts the previous request, and uses `LoadingRegion` and `LoadFailed` (with retry). The input is a named combobox over a listbox; arrows move, `Enter` opens, `Esc` closes; the result count is announced politely.
- `src/components/search/search-match.ts`: `SearchResult`, `SearchPage` and the word matcher (every word must appear, case ignored).
- `src/components/search/use-search-shortcut.ts`: `Ctrl+K` / `Cmd+K`, and `/` when focus is not in a field.
- `src/components/layout/app-shell.tsx`: a "Search" icon button in the top bar; new optional props `pages` and `searchContent`. Focus returns to whatever opened the search.
- Tests in `src/components/search/search-dialog.test.tsx`, a story under Layout, and the sections in `docs/layout.md` and `docs/ui-components.md`.
- No new package.

## Verification

- `npm run check`.
