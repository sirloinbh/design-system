# #12 Add ToggleChips, List and ListItem

- Issue: [#12](https://github.com/sirloinbh/design-system/issues/12)
- Branch: `feat/12-toggle-chips-list`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) rows 11 and 12
- Release: minor

## Changes — 2026-11-28

- `src/components/toggle-chips/toggle-chips.tsx`: `ToggleChips` on the Radix toggle group already in `radix-ui`. `type="single"` (default) is a radio group where clicking the chosen chip clears it; `type="multiple"` is a row of pressed buttons. Props: `options` (`value`, `label`, `disabled`), `value` or `defaultValue`, `onValueChange`, `disabled`, `className`, `aria-label` or `aria-labelledby`. 40px chips, 48px on touch, pointer cursor, focus ring. It differs from `SegmentedControl`, which always has exactly one choice.
- `src/components/list/list.tsx`: `List` (divided rows), `ListItem` (44px, 48px on touch) and `ListItemActions` (actions at the end of the row).
- Tests for both, and stories `Components/ToggleChips` and `Components/List`.
- The workout-memo originals were not available in this checkout, so the API is written from the survey notes; the migration card for workout-memo adjusts any gap.

## Verification

- `npm run check` passes (Tests 218 passed | 3 skipped (221)).
