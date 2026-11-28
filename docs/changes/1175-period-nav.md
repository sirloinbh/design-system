# #1175 Add PeriodNav and the period helpers

- Issue: [sirloinbh/project-standards#1175](https://github.com/sirloinbh/project-standards/issues/1175) (epic #1156)
- Branch: `feat/1175-period-nav`
- Related: the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 7
- Release: minor

## Changes — 2026-11-28

- `src/components/period-nav/periods.ts`: pure date helpers on `YYYY-MM-DD` text in UTC: `addDays`, `weekStart`, `weekDays`, `lastWeeks`, `periodRange` (day, week, 12 weeks), `stepDays`, `dayLabel`, `rangeLabel`, and `readDateParam` and `writeDateParam` for `?date=` (a real date from 1900 to 2100; today is left out of the address).
- `src/components/period-nav/period-nav.tsx`: `PeriodNav` with previous, next, a date field, Today and the shown range, built on `DateStepper` and `Button` (40px, 48px on touch). Props: `period`, `date`, `today`, `onDateChange`, `weekStartsOn`, `label`, `children`.
- Tests for both and `stories/Components/PeriodNav.stories.tsx`.
- Week start is a prop. The default is Sunday, because money-ledger, life-journal and cert-manager use it; workout-memo uses Monday and passes `weekStartsOn={1}`. The default is one constant, `defaultWeekStart`. User decision 2026-11-28 on project-standards#1175: Sunday by default, Monday through the prop.
- The page views (Week and 12-week content) stay in the apps. Not in this card: the app migration cards, and a router hook (the URL helpers take `URLSearchParams`, so apps keep their own `useSearchParams` call).

## Verification

- `npm run check`.
