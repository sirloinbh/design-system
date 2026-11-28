# #69 Align the shared components with the UI spec

- Issue: [sirloinbh/design-system#69](https://github.com/sirloinbh/design-system/issues/69)
- Branch: `feat/69-align-kit-with-spec`
- Parent: #66; spec: [ui-spec.md](../ui-spec.md) (#68)

## Changes — 2026-11-28

The user confirmed all 12 look changes of the spec (option A). Applied:

- **Heights:** `Button` `sm` and the `Select` small trigger 40px; `SegmentedControl` items, menu, select and combobox rows 40px (48px on touch); Dialog, Drawer and Sheet close buttons 40px (48px on touch) with `cursor-pointer`.
- **Press area:** `Checkbox` and `Switch` keep a 44px press area on every screen; the `Markdown` link gets one; link badges show a pointer.
- **Tokens:** new colors `destructive-foreground` and `overlay`, new text styles `text-stat` and `text-title` (the token build now emits the `md` size of a text utility). `text-white`, `bg-black/50`, `text-sm`, `text-xs`, `text-lg`, `text-2xl`, `rounded-[4px]` and `w-[100px]` are gone from the components; `cn()` knows the new text styles.
- **Same look everywhere:** focus ring `ring-ring/50` on Switch and SegmentedControl; invalid ring on Select, Checkbox and Switch; DateField disabled cells `opacity-50`; popovers on `--z-popover`; 16px text on touch from 768px for the text fields and 16px on the Select trigger below 768px; `SegmentedControl` accepts `disabled`; `Switch` has `data-slot`; `StatCard` accepts `className`.
- **Smaller fixes:** `PeriodNav` and `RangeSummary` use `text-meta` and 16px margins; `PageHeader` drops `break-keep`; `Markdown` `headingStart` stops at `h4`.
- **Not changed:** `AppShell` (frozen while another card edits it) and the places listed under "Differences still open" in the spec.
- `docs/ui-spec.md` now describes the new values; the delivery mirror and the showcase baselines are regenerated.

## Verification

- Tests updated for the new heights, press areas and text sizes, and added for `Button` `sm`, the destructive text token, the `Select` trigger, a disabled `SegmentedControl`, the `Switch` look and `StatCard`.
- `npm run check`.
