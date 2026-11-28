# #9 Add LoadingRegion, LoadFailed and RetryButton

- Issue: [#9](https://github.com/sirloinbh/design-system/issues/9)
- Branch: `feat/9-load-state`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 3
- Release: minor

## Changes — 2026-11-28

- `src/components/load-state/load-state.tsx`:
  - `LoadingRegion` (`label`, `shape` rows, card or cards, `rows`): a `role="status"` region, `aria-busy`, named by `label`, with a Skeleton of the real shape. The placeholder shapes are hidden from screen readers.
  - `RetryButton` (`onRetry`, `pending`, children, default "Try again"): an outline `Button`. While `pending` it shows a `Spinner`, uses `aria-disabled` (not `disabled`, so focus stays) and ignores clicks. When it leaves the page while focused, focus moves to the nearest named region (`role="region"` or a `section` with a name, or `data-focus-region`), then to `<main>`. This is the plan-routine behaviour, made shared.
  - `LoadFailed` (`message`, `onRetry`, `pending`, `retryLabel`): an `AlertBanner` (announced at once) with the retry action; without `onRetry` only the message shows.
- `load-state.test.tsx` and `stories/Components/LoadState.stories.tsx` (rows, card, cards, failed, retrying) with visual baselines.
- Follows the "Loading" and "Empty and error" rules in `docs/guidelines.md`.
- Not in this card: the apps' migration cards, and `use-load` style data hooks (app code).

## Verification

- `npm run check`; baselines written with the Playwright container command in `docs/showcase-tests.md`.
