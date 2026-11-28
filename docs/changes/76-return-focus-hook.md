# #76 Add a hook that returns focus after a dialog closes

- Issue: [#76](https://github.com/sirloinbh/design-system/issues/76)
- Branch: `feat/76-return-focus-hook`
- Related: #65 (epic), `docs/component-survey.md` candidate D
- Release: patch

## Changes - 2026-11-28

- `src/lib/use-return-focus.ts`: `useReturnFocus(fallbackRef)` returns `remember`, `returnFocus` and `onCloseAutoFocus`. Focus goes back to the opener, or to the fallback (add button or a heading with `tabIndex={-1}`) when the opener is gone after a redraw. It takes health-log's version (it handles redraws) and adds what cert-manager and life-journal wrote by hand: `remember` accepts a click event, and `onCloseAutoFocus` is ready for the dialog content.
- `src/lib/use-return-focus.test.tsx`: opener present, opener removed, and the default focus move is stopped.
- Not in this card: the apps replace `return-focus.ts` (health-log), `use-section-focus.ts` (cert-manager) and the `onCloseAutoFocus` code (life-journal) in their migration cards. `docs/ui-components.md` is owned by another lane; the hook is documented in its source comment for now.

## Verification

- `npm run check` passes (see the PR for the run).
