# #1182 Showcase component pages

- Issue: [sirloinbh/project-standards#1182](https://github.com/sirloinbh/project-standards/issues/1182)
- Branch: `feat/1182-component-stories`
- Related: #1166 (UI kit moved here), #1180, #1184, #1157

## Changes — 2026-11-28

- Tailwind CSS 4 in the showcase: `@tailwindcss/vite` is added to Storybook's Vite config in `.storybook/main.ts`, and `showcase/theme.css` imports `tailwindcss`, the tokens package's `tailwind.css` (theme and dark variant) and `tw-animate-css`, with `@source` for `src/`, `stories/` and `showcase/`. The components render with the same classes as in the apps.
- The `pointer-coarse:` variant is redefined in `showcase/theme.css` to answer to the real `(pointer: coarse)` media query and to `data-pointer="coarse"` on `<html>`, so the toolbar's Touch mode (#1184) now shows the 48px touch sizes.
- Stories for every component of the moved kit, in `stories/Components/`: Button (every variant and size, disabled, with icon, icon only), Badge, Card, StatCard, PageHeader, Inputs (Input, Textarea, Label, FieldError, Checkbox, Switch), Pickers (SegmentedControl, NativeSelect, Select, Combobox, NumberInput, DateField, TimeField, DateStepper and RangeSummary), Feedback (AlertBanner, Notice, Spinner, Skeleton family, EmptyState, Toaster) and Overlays (Dialog, ConfirmDialog, Sheet, Drawer, DropdownMenu). Stateful components use small wrapper components. The old sample story is removed.
- Not covered here: the layout components (AppShell, AppSwitcher, ThemeToggle) belong to #1183, and `AiShell` needs a running AI service, so it has no static page.
- New components from other lanes add their own stories next to this set.

## Dependency review (docs/dependency-policy.md)

Dev dependencies, exact, MIT, no install scripts, and the same versions the apps pin in project-standards `versions.json`: `tailwindcss` 4.3.3, `@tailwindcss/vite` 4.3.3, `tw-animate-css` 1.4.0.

## Verification

- `npm run check`.
