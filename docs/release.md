# Releasing the design system

A release is how a change here reaches every app (ADR-0031, delivery model A). The apps never read this repository: the central sync in `sirloinbh/project-standards` delivers a **pinned release** with the per-app values filled in.

## What a release holds

- A tag `v<major>.<minor>.<patch>` (not the `design-tokens/v*` package tags) and a GitHub Release with the CHANGELOG section as notes.
- A folder `delivery/ui/` with the files the apps receive, laid out like an app (`frontend/src/...`, `.tmpl` files carry the per-app variables). Stories, showcase files and docs never go in `delivery/`.

## Choosing the version

Each change record (`docs/changes/<issue>-<slug>.md`) may carry one line `Release: major`, `minor`, `patch` or `none`; a record without it counts as `patch`. The bump levels are the ADR-0031 table (major = an app edit is needed, minor = backward-compatible addition, patch = fix).

`node scripts/release-plan.mjs` reads the records added since the last `v*` tag and prints the highest bump, the next version (`1.0.0` for the first release) and a CHANGELOG draft.

## Steps

1. Open a release PR: run `node scripts/release-plan.mjs`, paste the draft as the newest `## <version>` section of `CHANGELOG.md`, and name the app changes a **major** release needs under it. `npm run check` and review as usual.
2. After the merge, the user pushes the tag `v<version>` on the merge commit (user step, like the package tags).
3. `release.yml` checks the tag against the newest CHANGELOG version, creates the Release, and opens or updates the PR `chore/design-system-<version>` in project-standards that raises `versions.json` `design-system` to that version and commit.
4. project-standards reviews that PR (and checks the release against every app, #1178). After the merge its sync opens a PR in each app, in wave order (ADR-0029).

A major release is merged in project-standards only together with the app changes it needs.

## One-time setup (user steps)

- Install the sync GitHub App on `sirloinbh/project-standards` with Contents and Pull requests write, then set the variable `PIN_APP_ID` and the secret `PIN_APP_PRIVATE_KEY` in this repository. Without them `release.yml` still creates the Release and warns that the pin PR was not opened.
