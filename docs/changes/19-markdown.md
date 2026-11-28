# #19 Add the Markdown component

- Issue: [#19](https://github.com/sirloinbh/design-system/issues/19)
- Branch: `feat/19-markdown`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 18
- Release: minor

## Changes — 2026-11-28

- Decision: the dependency-free renderer, as the survey recommends. study-log's `react-markdown` is not adopted, so no package is added and no dependency review is needed. The apps' own renderers were not available in this checkout, so the syntax follows the survey notes.
- `src/components/markdown/parse.ts`: a small parser that builds plain data (blocks and inline nodes), never HTML. Links go through `safeWebUrl`, so only `http` and `https` become links.
- `src/components/markdown/markdown.tsx`: `Markdown` renders that data as React elements. `#` becomes `h2` by default (`headingStart` 2 to 4) because the page owns `h1`. Links open in a new tab with a screen reader hint.
- `src/components/markdown/markdown.md`: the table of supported syntax; `markdown.test.tsx` has one test per row, plus tests that raw HTML, images and `javascript:` links stay inert.
- Story `Components/Markdown` with visual baselines.
- Not in this card: the apps' own renderers stay until their migration cards.

## Verification

- `npm run check`; baselines written with the Playwright container command in `docs/showcase-tests.md`.
