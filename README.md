# design-system

Shared design system for the sirloinbh app portfolio: tokens, the UI kit, UI and UX guidelines, and a Storybook showcase. The decision record is [ADR-0031](https://github.com/sirloinbh/project-standards/blob/main/docs/adr/0031-design-system-repository.md) in project-standards; the move plan is [docs/design-system-move.md](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-move.md).

Status: scaffold (#1162). The UI files, tokens and documents still live in project-standards and move here card by card (#1154 to #1157).

## How the apps receive changes

design-system is the source. The project-standards sync delivers the UI files to each app from a **pinned design-system release**, with per-app values and the same hash drift check. design-system never opens pull requests in app repositories, and apps install no new package for it. `@sirloinbh/design-tokens` keeps its own name and registry (GitHub Packages).

## Work here

| Command                                             | What it does                                                                                                                      |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                                            | Install the pinned dev dependencies. Needs `NODE_AUTH_TOKEN` with `read:packages` for the `@sirloinbh/*` packages                 |
| `npm run check`                                     | Lint, format check, typecheck, unit tests, secret scan, supply-chain scan, relative links in the Markdown files. CI runs the same |
| `npm run lint`, `format:check`, `typecheck`, `test` | The parts of `check`                                                                                                              |

Showcase (Storybook, #1179): not set up yet. Release process: not set up yet (version scheme in ADR-0031, card #1160).

## Rules

- Work follows the project-standards procedure: an issue in `sirloinbh/project-standards` (card numbers in this repository's PRs refer to it), a branch `<type>/<issue-number>-<slug>`, a commit and a `docs/changes/<issue-number>-<slug>.md` record together, a pull request from the template, and a merge commit. `main` is protected: a pull request is required.
- Design rules: [AGENTS.project.md](AGENTS.project.md).
- Agent instructions: [AGENTS.md](AGENTS.md). The full set arrives later through the central sync (#1163).
