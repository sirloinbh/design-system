# #1176 Add BarChart, LineChart and ChartBoundary

- Issue: [sirloinbh/project-standards#1176](https://github.com/sirloinbh/project-standards/issues/1176) (epic #1156)
- Branch: `feat/1176-charts`
- Related: the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 8; the heatmap is in the MonthCalendar and Heatmap card
- Release: minor

## Changes — 2026-11-28

- Base decision: **plain HTML and one SVG path, no charting library.** The charts the apps draw are small (bars and one line), a library such as recharts is a new dependency with its own review and a large bundle, and HTML labels keep the 12px floor at every width (text inside a scaled SVG shrinks). A library can be added later behind the same props.
- `src/components/chart/chart.tsx`: `BarChart` and `LineChart` (props `title`, `data` as `{ label, value }`, `valueLabel`, `className`), `ChartTable`, and `ChartBoundary`. Each chart is a figure with a caption; its values are also a table for screen readers; an empty data set says "No data to show." Colors are theme tokens (`bg-primary`, `stroke-primary`, `border`, `text-muted-foreground`), so light and dark need no code. Labels use `text-meta` (12px). A native `title` on each bar and dot shows the value on hover.
- `ChartBoundary` catches a chart that throws or whose lazy module fails: a message that points to the table with the same values (pass `data`), and a "Try again" button. Apps keep their own `lazy()` import and wrap it in `ChartBoundary` plus `Suspense`; no `lazyChart` helper is needed without a library.
- `src/components/chart/chart-data.ts`: `niceMax`, `share`, `formatValue`.
- Tests and `stories/Components/Charts.stories.tsx` (bars, line, empty, failed).
- Not in this card: a heatmap (MonthCalendar and Heatmap card), tooltips beyond the native title, and the app adoption (one app replaces its own chart after the first release).

## Verification

- `npm run check`.
