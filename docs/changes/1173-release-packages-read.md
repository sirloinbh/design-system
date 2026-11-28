# #1173 release.yml: read the @sirloinbh packages

Release: none

The first `v1.0.0` run of `release.yml` failed at `npm ci` with a 403 on `@sirloinbh/tsconfig` (run 46112657541): the workflow had `contents: write` only, so `GITHUB_TOKEN` could not read GitHub Packages.

## Changes — 2026-11-28

- `.github/workflows/release.yml`: `permissions` now also has `packages: read`, like `ci.yml`.
- Checked the rest of the workflow: the checks step already sets `NODE_AUTH_TOKEN`; `release-plan.mjs --notes` only reads `CHANGELOG.md`; the Release step uses `contents: write`; the pin step uses its own App installation token (`PIN_APP_ID`, `PIN_APP_PRIVATE_KEY`), not `GITHUB_TOKEN`. No other gap.
- `scripts/test/release.test.mjs`: a test that every workflow that runs `npm ci` has a `packages` permission and `NODE_AUTH_TOKEN`.
