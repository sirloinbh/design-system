# #10 Add BusyButton and the useBusy hook

- Issue: [#10](https://github.com/sirloinbh/design-system/issues/10)
- Branch: `feat/10-busy-button`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 4
- Release: minor

## Changes — 2026-11-28

- `src/components/busy-button/busy-button.tsx`: `BusyButton` is a `Button` with a `busy` prop. While busy it shows a `Spinner` (named by `busyLabel`, default "Working"), sets `aria-busy`, ignores clicks, and uses `aria-disabled` instead of `disabled`, so it keeps keyboard focus. An explicit `disabled` still disables it.
- `src/components/busy-button/use-busy.ts`: `useBusy()` returns `{ busy, run }`. `run(task)` runs one task at a time (a second call while busy returns `undefined` at once). It remembers the focused element when the task starts and, when the task ends and focus fell to the page, gives focus back to it if it is still on the page. A failing task rejects to the caller and the hook is free again.
- Tests and `stories/Components/BusyButton.stories.tsx` (idle, busy, busy outline) with visual baselines.
- Not in this card: the apps' own `focus-moves`, `return-focus` and `use-section-focus` helpers stay until their migration cards; the `RetryButton` in the load-state card has its own focus handoff.

## Verification

- `npm run check`; baselines written with the Playwright container command in `docs/showcase-tests.md`.
