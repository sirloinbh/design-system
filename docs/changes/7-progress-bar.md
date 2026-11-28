# #7 Add the ProgressBar component

- Issue: [#7](https://github.com/sirloinbh/design-system/issues/7)
- Branch: `feat/7-progress-bar`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 1
- Release: minor

## Changes — 2026-11-28

- `src/components/progress-bar/progress-bar.tsx`: `ProgressBar` with `label`, `value`, `max` (default 100), `valueText`, `hideLabel`, `className`. The track is `role="progressbar"` named by the label, with `aria-valuenow`, `-valuemin`, `-valuemax` and `-valuetext` (a percentage when no text is given). A value outside the range is clamped; without a value the bar is indeterminate and has no `aria-valuenow`. Track and fill use `bg-accent` and `bg-primary`; the label and value text use the type scale and `tabular-nums`. Motion is off under `prefers-reduced-motion`.
- `src/components/progress-bar/progress-bar.test.tsx`: name, values, value text, clamping, indeterminate, hidden label.
- `stories/Components/ProgressBar.stories.tsx`: percentage, value text, full, indeterminate, hidden label.
- Not in this card: the apps' migration cards remove each app's own bar after the release.

## Verification

- `npm run check`.
