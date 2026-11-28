# #91 Give the top bar search a name that does not collide with app search buttons

- Issue: [#91](https://github.com/sirloinbh/design-system/issues/91)
- Branch: `fix/91-search-name` (into `release/1.0.x`)
- Related: #58 (the top bar search), sirloinbh/project-standards#1224 (the v1.0.1 pin PR)
- Release: patch

## Cause

#58 named the AppShell top bar button and the SearchDialog input "Search". The apps already use that name for their own search buttons and fields, so the v1.0.1 pin PR failed `design-system-release-check` at frontend tests in two apps: health-log `getByRole('button', { name: 'Search' })` (food search) and dev-career-portfolio `getByLabelText('Search')` (list search) found two elements. A screen reader user also heard two "Search" buttons on one screen.

## Changes - 2026-11-28

- `src/components/layout/app-shell.tsx`: the top bar button is named "Search this app".
- `src/components/search/search-dialog.tsx`: the combobox is named "Search this app". The hidden dialog title stays "Search".
- `src/components/search/search-dialog.test.tsx`, `docs/layout.md`, `docs/ui-components.md`: the new name.
- `delivery/ui/`: regenerated with `npm run delivery`.

App changes: none needed. App tests that look for their own "Search" button or field find one element again.

## Release

1.0.2 is cut from `release/1.0.x` (v1.0.1 plus this change), not from main: main also has #73, whose `{{project.icon}}` placeholder needs sirloinbh/project-standards#1213 before it can reach the apps. The same change goes to main in a separate PR.

## Verification

- See the PR for the local test run and the CI `check`.
