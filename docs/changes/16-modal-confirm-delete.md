# #16 Add ResponsiveModal and ConfirmDelete

- Issue: [#16](https://github.com/sirloinbh/design-system/issues/16)
- Branch: `feat/16-modal-confirm-delete`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 15
- Release: minor

## Changes — 2026-11-28

- `src/components/ui/dialog.tsx`: `DialogContent` gets `layout` (`center` by default, `sheet`, `full`). `center` is exactly the old box, so existing dialogs do not change. Below 640px `sheet` sticks the dialog to the bottom edge and `full` fills the screen; from 640px up both are the centered box. In `sheet` and `full` the dialog stays above the on-screen keyboard. This edits a file the apps receive, so it ships in the next release as a backward-compatible addition.
- `src/components/ui/keyboard-inset.ts`: `useKeyboardInset(active)` reads `window.visualViewport` and returns how many pixels the keyboard covers; `DialogContent` sets it as `--keyboard-inset`. It is zero without a visual viewport and listens only while active.
- `src/components/responsive-modal/responsive-modal.tsx`: `ResponsiveModal` is the Dialog with a title, optional description, body and footer, `layout` `sheet` (default) or `full`, and either a `trigger` or `open` and `onOpenChange`.
- `src/components/confirm-delete/confirm-delete.tsx`: `ConfirmDelete` replaces workout-memo's `useConfirmDelete` and study-log's `DeleteConfirm` with one component on `ConfirmDialog`. The screen keeps the chosen item in state and passes it as `item`; the dialog is open while it is set, names the item in the title (`label`), calls `onConfirm(item)` (closes on success, stays open on failure) and `onClose` for Cancel, Escape and after success.
- Tests for the layout classes, the keyboard inset, the modal, and the delete flow; stories `Components/ResponsiveModal` and `Components/ConfirmDelete`, with their visual baselines made in the pinned Playwright container.
- The app originals were not available in this checkout, so the APIs follow the survey notes.

## Verification

- `npm run check`: see the PR.
