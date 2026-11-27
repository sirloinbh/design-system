# Showcase tests

CI runs browser checks over the built Storybook (`.github/workflows/showcase-tests.yml`, job `showcase`). For every story and docs page, in light and dark at 360px and 1280px, it checks:

- **Accessibility**: an axe scan of the page; no serious or critical issue.
- **Text size**: no visible text under 12px (the floor in `AGENTS.project.md`).
- **English only**: no Hangul in the rendered text, except a line that contains `korean-ok`.
- **Screenshot**: the page matches the stored baseline in `showcase/tests/__screenshots__/`. A changed or missing baseline fails CI, so a component change shows up as a reviewed image diff in the pull request.

## Run it locally

Screenshots are compared only in the pinned Playwright container, so fonts and Chromium match CI. Build Storybook first, then run the tests in the container (the repository is mounted, so the installed Playwright package is used):

```sh
npm run storybook:build
docker run --rm --ipc=host -v "$PWD:/work" -w /work -e SHOWCASE_VISUAL=1 \
  mcr.microsoft.com/playwright:v1.63.0-noble@sha256:eff16c30e6f3f4af0a03fa4b706120d5e9b0891c344a27d64559aff5900a4a27 \
  node node_modules/@playwright/test/cli.js test
```

Outside CI a missing baseline is written (`updateSnapshots: 'missing'`), so a new story gets its baseline on the first run. Review the new images and commit them with the story. To accept an intended visual change, add `--update-snapshots` to the command above and commit the changed images.

Without the container, `npm run showcase:test` runs the accessibility, text size and English checks only, using the installed Chrome.

## Adding a story

Add the story, run the container command, look at the new baselines, and commit them. The tests read every entry of the built Storybook `index.json`, so no test file changes.
