# #99 Align AppShell with the UI spec

- Issue: [sirloinbh/design-system#99](https://github.com/sirloinbh/design-system/issues/99)
- Branch: `feat/99-appshell-spec`
- Parent: #66; follows #69 (PR #98)

## Changes — 2026-11-28

- Menu items are 40px tall, 48px on touch screens (were 36px and 44px).
- The header home link is 48px square on touch screens and shows the pointer cursor.
- The header side padding is `--page-x` (16px, 24px from `md`, 32px from `lg`), kept clear of the left and right safe area, so the top bar lines up with the page body.
- The footer honours the left safe area like the main column.
- `docs/ui-spec.md`: the `AppShell` rows leave "Differences still open"; the AppShell section and the page layout table show the new values.
- Tests for the menu item height, the home link, and the top bar and footer padding; the delivery mirror and the showcase baselines are regenerated.

## Verification

- `npm run check`.
