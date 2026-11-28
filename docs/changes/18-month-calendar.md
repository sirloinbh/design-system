# #18 Add MonthCalendar and Heatmap

- Issue: [#18](https://github.com/sirloinbh/design-system/issues/18)
- Branch: `feat/18-month-calendar`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 6
- Release: minor

## Changes — 2026-11-28

- `src/components/month-calendar/month-calendar.tsx`: `MonthCalendar` shows one month (`month`, `onMonthChange`), with `selected` and `onSelect`, `renderDay(day)` for content under the day number, `minDate` and `maxDate` (they stop the month buttons and disable days), `weekStartsOn` (Sunday by default, like the other date components) and `today`. It builds on `monthWeeks` from `date-fields.ts`. Days of the month are buttons (44px, 48px on touch) with `aria-pressed` for the selected day and `aria-current="date"` for today; days of neighbouring months are blank cells. Without `onSelect` the days are labelled groups. A month with no data still renders. It is not a date picker (use `DateField` for a form).
- `src/components/month-calendar/heatmap.tsx` and `heatmap-bands.ts`: `Heatmap` draws one square per day from `from` to `to`, shaded by `bands` (ascending thresholds, at most 4, so up to five shades from `bg-accent` and `bg-primary` at four opacities). **Decision: it is a separate component, not built on the calendar grid**, because it is a week-column strip over many months, while the calendar is a month with interactive days. Color is never the only signal: each square has an accessible label with the day and its value, and a legend lists each shade in words (for example "1–2 workouts"). Month and weekday labels are `text-meta` (12px). The grid scrolls inside a named, focusable region.
- Tests, and `stories/Components/MonthCalendar.stories.tsx` (default, with day content, read-only, heatmap) with visual baselines.
- Not in this card: the apps' migration cards, and keyboard arrow-key movement between days (days are ordinary buttons in tab order; `DateField` keeps its roving grid for the picker).

## Verification

- `npm run check`; baselines written with the Playwright container command in `docs/showcase-tests.md`.
