# #1173 Release flow: a design-system merge reaches all apps

Epic #1156 in project-standards, ADR-0031 delivery model A.

Release: none

## Change

| File                              | Content                                                                                                                                                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `scripts/release-plan.mjs`        | Reads the change records added since the last `v*` tag and prints the highest bump (`Release:` line, default patch), the next version (`1.0.0` first) and a CHANGELOG draft; `--notes <version>` prints one CHANGELOG section        |
| `.github/workflows/release.yml`   | A `v<x.y.z>` tag runs the checks, requires the tag to be the newest CHANGELOG version, creates the GitHub Release, and opens or updates the pin PR in project-standards. The pin step is skipped with a warning without `PIN_APP_ID` |
| `scripts/open-pin-pr.mjs`         | Edits only the `design-system` line of `versions.json` on `chore/design-system-<version>` through the GitHub API, with a project-standards-only App token, and opens or updates the PR with the release notes                        |
| `CHANGELOG.md`, `docs/release.md` | Where release sections go; the steps and the user setup                                                                                                                                                                              |
| `scripts/test/release.test.mjs`   | Bump levels, plan, notes, pin edit, PR creation and update, App token scope, workflow trigger                                                                                                                                        |

## Flow

release PR (CHANGELOG section) -> user pushes tag `v<version>` -> Release + pin PR in project-standards -> project-standards review and check against the apps (#1178) -> merge -> sync PRs in the apps in wave order. The sync reads `delivery/ui/` of the pinned tag (project-standards#1171).

## User steps

- Push the first tag (like the package tags).
- Install the sync App on project-standards with Contents and Pull requests write; set `PIN_APP_ID` and `PIN_APP_PRIVATE_KEY` here.

## Checks

`npm run check`: passed.
