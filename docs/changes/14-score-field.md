# #14 Add the ScoreField rating component

- Issue: [#14](https://github.com/sirloinbh/design-system/issues/14)
- Branch: `feat/14-score-field`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 5
- Release: minor

## Changes — 2026-11-28

- `src/components/score-field/score-field.tsx`: `ScoreField` on native radio buttons that share one name, so the browser gives arrow key movement, a single tab stop and the announced state. Props: `label`, `value` (a number or `null` for no rating), `onChange`, `min` (1), `max` (5), `step` (1; half steps work), `lowLabel` and `highLabel` (the two ends, read as the group's description), `clearLabel` (`Clear`), `allowClear`, `disabled`, `name`, `className`. A Clear button returns to `null`. Choices are 40px (48px on touch) with the pointer cursor and a visible focus ring. `scoreValues` lists the steps without rounding drift.
- This replaces life-journal's select (0.5 to 5) and plan-routine's radio group (1 to 5 with Clear); both can be expressed with the props above.
- Tests: group name, shared radio name, checked state, choose and clear, decimal steps, captions as the group description, disabled and touch classes. Story `Components/ScoreField`.

## Verification

- `npm run check` passes (Tests 232 passed | 3 skipped (235)).
