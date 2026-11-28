# #17 Add the ListToolbar component

- Issue: [#17](https://github.com/sirloinbh/design-system/issues/17)
- Branch: `feat/17-list-toolbar`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 13
- Release: minor

## Changes — 2026-11-28

- `src/components/list-toolbar/list-toolbar.tsx`: `ListToolbar` is a `role="search"` form with a labelled search field, any number of labelled filter selects, an optional sort select, a Reset button and a result count. It is controlled: the page owns the values and filters its own rows (table or cards). The count is a polite live region that stays in the page and is empty while `resultCount` is left out (loading). Reset shows only while the search or a filter differs from its default (or `active` says so), calls `onReset`, and moves focus to the search field. Enter does not submit.
- `src/components/list-toolbar/list-query.ts`: `parseListQuery`, `formatListQuery` and `isListQueryChanged` keep the search text (`q`), each filter and the sort in the URL query string. Defaults are left out of the URL, and other parameters (`tab`, `page`) are kept. They are plain functions on `URLSearchParams`, so the page uses them with any router.
- Tests for both and `stories/Components/ListToolbar.stories.tsx` with visual baselines.
- Not in this card: the apps' own toolbars stay until their migration cards; sorting and filtering the rows stay with the page.

## Verification

- `npm run check`; baselines written with the Playwright container command in `docs/showcase-tests.md`.
