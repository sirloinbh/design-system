# #1183 Showcase layout and pattern pages

- Issue: [sirloinbh/project-standards#1183](https://github.com/sirloinbh/project-standards/issues/1183)
- Branch: `feat/1183-layout-patterns`
- Related: #1182 (components), #1172 (guidelines), #1185 (guideline pages), #1157

## Changes — 2026-11-28

- **Layout/AppShell**: the shared `AppShell` with the shared menu order (Day log, Week, 12 weeks, the app's other pages, Dashboard, Settings), the app switcher and the theme toggle in the top bar; and a page for the two top-bar controls alone. Stories use a `MemoryRouter`.
- **Patterns/Screens**: Day log (page header, `DateStepper`, session cards), Week (`SegmentedControl`, `RangeSummary`, `StatCard` grid) and 12 weeks (a bar list with screen-reader text).
- **Patterns/Forms and states**: a session form built from the pickers (`DateField`, `TimeField`, `Combobox`, `SegmentedControl`, `NumberInput`, `Switch`, `Textarea`), the same form with a field error, the empty state, the error state with a retry button, the loading state (`SkeletonList` in an `aria-busy` group), and a `ConfirmDialog` and a `Drawer`.
- Every pattern page starts with a "Follows" line that names the guideline and rule it follows and links to the guideline page from #1185 (`showcase/patterns/PatternFrame.tsx`; a test checks every link points to an existing guideline page).
- Sample data is English only and every pattern is built from the shared components. The 12-week chart is plain markup because the shared chart components are not part of the kit yet (#1176).

## Verification

- `npm run check`.
