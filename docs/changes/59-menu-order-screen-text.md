# #59 Menu order and screen text rules

- Issue: [sirloinbh/design-system#59](https://github.com/sirloinbh/design-system/issues/59)
- Branch: `docs/59-menu-order-screen-text`
- Parent: #56

## Changes — 2026-11-28

- `docs/layout.md`: the menu order is now Day log, the app's other pages, Dashboard, Settings. Week and 12 weeks live inside Dashboard behind a `SegmentedControl` or `PeriodNav`; the old paths redirect to Dashboard. The `nav` example drops the Week item.
- `docs/guidelines.md`: new "Screen text rule" (explanatory, example and motivational text, one example each, and what stays); the menu order row is updated.
- `docs/review-checklist.md`: a screen text item.
- Stories no longer carry `description` text or example placeholders. `ConfirmDelete` and `BackupSection` lose their default explanatory dialog text; the `description` props stay for callers that need a dialog description for screen readers.

## Verification

- Search: `grep -rnE "description[=:]|e\.g\.|placeholder=" stories src --include=*.tsx` (non-test, non-lane files) finds only props, `DateField` format placeholders and comments.
- `npm run check`.
