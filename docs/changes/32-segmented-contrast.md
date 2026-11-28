# #32 SegmentedControl inactive segments contrast

- Issue: [sirloinbh/design-system#32](https://github.com/sirloinbh/design-system/issues/32)
- Branch: `fix/32-segmented-contrast`
- Related: project-standards#1186 (the showcase accessibility scan found it)

## Changes — 2026-11-28

- `SegmentedControl`: inactive segments use `text-foreground/70` instead of `text-muted-foreground`. Muted text on the muted background was about 4.1:1 in light mode (AA needs 4.5:1); the `foreground` token at 70% is well above it in light and dark. No new color is hard-coded. Hover still uses `text-foreground`.
- `showcase/tests/stories.pw.ts`: the known-issue entry for this rule is removed (the list stays, empty, for future use), so the scan now fails if the contrast comes back.
- Baselines: the SegmentedControl, Week and form stories were re-compared in the pinned container and still match within the screenshot tolerance, so their images are unchanged. Baselines for the new `PeriodNav` stories are added (a component merged by another lane after the last baseline run).
- The fix reaches the apps with the next design-system release.

## Verification

- `npm run check`, and the container run of all 364 tests with no known-issue exclusion.
