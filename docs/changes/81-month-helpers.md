# #81 Add month helpers to the period helpers

- Issue: [#81](https://github.com/sirloinbh/design-system/issues/81)
- Branch: `feat/81-month-helpers`
- Related: #65 (epic), `docs/component-survey.md` candidate A
- Release: patch

## Changes - 2026-11-28

- `src/components/period-nav/periods.ts`: `shiftMonth(month, delta)` (stops at 0001-01 and 9999-12), `isMonth(value)` and `monthLabel(month, style)` ("October 2026" for `long`, "Oct" for `short`).
- `src/components/period-nav/periods.test.ts`: year rollover both ways, the ends, invalid months, both label styles.
- Where the copies differed: life-journal returned `null` past the year range; the others never did. The shared `shiftMonth` always returns a string and stops at the ends, so callers need no null check. `monthLabel` covers the two label shapes found (long with year, short month only).
- Not in this card: apps replace their copies in the migration cards (project-standards#1177): workout-memo `workspace/activity.ts`, study-log `month-calendar.ts`, life-journal `calendar-month.ts`, money-ledger `entry-filters-state.ts`, and the `monthLabel` copies in study-log, life-journal, money-ledger and plan-routine. `docs/ui-components.md` is owned by another lane and is not updated here.

## Verification

- `npm run check` passes (see the PR for the run).
