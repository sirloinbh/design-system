# #78 Add a hook for filter state in the URL

- Issue: [#78](https://github.com/sirloinbh/design-system/issues/78)
- Branch: `feat/78-url-param-hook`
- Related: #65 (epic), `docs/component-survey.md` candidate F
- Release: patch

## Changes - 2026-11-28

- `src/lib/use-url-param.ts`: `useUrlParam(key, fallback = '', { replace, resetKeys })` returns `[value, setValue]` on `?key=`. Setting the fallback or an empty string removes the parameter; other parameters stay; `resetKeys` removes listed parameters (for example `page`) when the value changes; `replace` swaps the history entry for a field the person types into. It uses the `react-router` 8.4.0 that is already in `package.json` (the app shell imports it), so no package changes.
- `src/lib/use-url-param.test.tsx`: read and fallback, write with other parameters kept and keys reset, removal, replace versus push.
- Dates keep using `readDateParam` and `writeDateParam` (they validate the date).
- Where the copies were: health-log `medications.tsx`, `report.tsx`; life-journal `calendar.tsx`, `essays.tsx`; money-ledger `day-log.tsx`, `budget-progress.tsx`; cert-manager `songs.tsx`, `words.tsx`. They migrate in their cards (project-standards#1177). `docs/ui-components.md` is owned by another lane and is not updated here.

## Verification

- `npm run check` passes (see the PR for the run).
