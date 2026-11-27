# #1186 Showcase tests: visual screenshots and accessibility checks

- Issue: [sirloinbh/project-standards#1186](https://github.com/sirloinbh/project-standards/issues/1186)
- Branch: `feat/1186-showcase-tests`
- Related: #1182, #1183, #1185, #1178 (the release gate), #1157

## Changes — 2026-11-28

- `showcase/tests/stories.pw.ts` (Playwright) runs over every entry of the built Storybook `index.json`, in light and dark at 360px and 1280px (320 tests today). Each test checks:
  - an axe scan of the whole page, failing on serious or critical issues,
  - no visible text under 12px,
  - no Hangul in the rendered text (a line with `korean-ok` is allowed),
  - a full-page screenshot against the baseline in `showcase/tests/__screenshots__/` (`toHaveScreenshot`).
- A new story needs no test change. Its baselines are written on the first run in the container and committed with the story (`docs/showcase-tests.md`).
- `playwright.config.ts` serves `.local/storybook-static` with `showcase/tests/serve-static.mjs` (Node built-ins only), keeps one Linux baseline set, and in CI never writes baselines: a missing or changed baseline fails. Screenshots are compared only with `SHOWCASE_VISUAL=1` in the pinned Playwright container; elsewhere only the accessibility, text size and English checks run in the installed Chrome.
- `.github/workflows/showcase-tests.yml`: job `showcase` runs `npm run showcase:test` in the Playwright container pinned by digest (the digest of project-standards `versions.json` `images.playwright`) and uploads the report. It is separate from `check`, which stays fast. Making `showcase` a required check is a repository setting.
- `npm run showcase:test` builds Storybook and runs the tests. The 320 baselines were made in the container with Playwright 1.63.0.
- Found by the new tests and fixed here:
  - The `Markdown` block threw outside a docs page, so the guideline pages of #1185 did not render in the browser. They are now MDX docs pages (`stories/Guidelines/*.mdx`) and links, search and the pattern "Follows" lines point to `--docs` ids.
  - The Colors page used a `<small>` of 11.2px. It is 12px now.
  - Markdown task list boxes in the review checklist had no accessible name; `GuidelinePage` names them with their line text.
- Known issue kept in the test with a link: inactive `SegmentedControl` segments fail `color-contrast` in light mode (sirloinbh/design-system#32). Remove the `KNOWN_AXE_ISSUES` entry when it is fixed.

## Dependency review (docs/dependency-policy.md)

Dev dependencies, exact, no install scripts, installed with `--ignore-scripts`, and the same versions as the apps (project-standards `versions.json`): `@playwright/test` 1.63.0 (Apache-2.0, released 2026-09-04) and `@axe-core/playwright` 4.13.0 (MPL-2.0, released 2026-08-11). MPL-2.0 is not on the license allow list of the apps' license check, but both packages are already in every app. `@axe-core/playwright` would install its own newer `playwright-core` (1.65.1), which gives two incompatible `Page` types, so `package.json` `overrides` pins `playwright-core` to 1.63.0. `@types/node` 24.19.2 (MIT, types only, the version `versions.json` pins for the app backends) is added so the Playwright files type-check.

## Verification

- `npm run check`, and the container run of the 320 tests (300 matched the baselines made by the previous run, so screenshots are stable).
