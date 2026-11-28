# #94 Add the shared pieces from #74 to #81 to the UI components doc

- Issue: [#94](https://github.com/sirloinbh/design-system/issues/94) (epic #65)
- Branch: `docs/94-ui-components-shared-pieces`
- Related: #74, #75, #76, #77, #78, #80, #81
- Release: patch

## Changes - 2026-11-28

- `docs/ui-components.md`, "Shared helpers": seven rows for `formatCurrency`, `DescriptionList` and `DescriptionItem`, `useReturnFocus`, `useCopyText`, `useUrlParam`, `newIdempotencyKey` and `createRetryKeys`, and `shiftMonth`, `isMonth` and `monthLabel`. Each row says what it does and which copies it replaces.
- #79 (draft hook) was closed as not planned, so it has no row.

## Verification

- `npm run check`.
