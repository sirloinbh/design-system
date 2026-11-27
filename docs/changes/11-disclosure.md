# #11 Add the Disclosure component

- Issue: [#11](https://github.com/sirloinbh/design-system/issues/11)
- Branch: `feat/11-disclosure`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 9
- Release: minor

## Changes — 2026-11-28

- `src/components/disclosure/disclosure.tsx`: `Disclosure` on the native `<details>`. Props: `summary`, `open`, `onOpenChange`, `className`, `summaryClassName`, and every other `<details>` prop (for example `name` for an exclusive group). The summary is 44px tall (48px on touch), shows the pointer cursor and the focus ring, and has a chevron that turns when open. No new package.
- `src/components/disclosure/disclosure.test.tsx`: name, open and close, `onOpenChange`, touch height and focus ring, prop passthrough.
- `stories/Components/Disclosure.stories.tsx`: closed, open and a group.
- Not in this card: the apps' migration cards remove each app's own `<details>` copy after the release.

## Verification

- `npm run check` passes (Tests 212 passed | 3 skipped (215)).
