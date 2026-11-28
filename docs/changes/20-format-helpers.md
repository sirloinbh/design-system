# #20 Add the shared format helpers

- Issue: [#20](https://github.com/sirloinbh/design-system/issues/20)
- Branch: `feat/20-format-helpers`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 19
- Release: minor

## Changes — 2026-11-28

- `src/lib/format.ts`: `plural(count, one, many?)` ("1 set", "3 sets", "2 people"; the count is grouped), `formatNumber` (thousands separators, two decimals by default, empty text for a value that is not a number), `formatDuration` (minutes as "45m", "1h", "2h 15m"; negative or unreadable gives "0m"), `formatDate` (`YYYY-MM-DD` as "Nov 28, 2026", styles `short`, `medium`, `long`; bad text is returned unchanged) and `serviceToday` (the Asia/Seoul day, the same value as the existing `seoulToday`, which stays). Output is English and dates are formatted in UTC, so no time zone moves a day.
- `src/components/ui/number-step.ts`: `optionalNumber` now also answers `NaN` for more than 15 significant digits, which merges health-log's `parseAmount` into it. Every input that was valid before and has up to 15 digits reads the same.
- `src/lib/format.test.ts`: unit tests for each helper and the 15-digit rule. No story: these are not visual.
- The apps' originals were not available in this checkout, so the helpers follow the survey notes (`formatMinutes` becomes `formatDuration`). Not in this card: the apps' own copies stay until their migration cards.

## Verification

- `npm run check`, including `delivery:check` after `npm run delivery`.
