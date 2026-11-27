# Agent instructions (temporary)

This repository follows the project-standards agent rules. The full agent files will arrive through the central sync (#1163); until then this file points to them.

- Read `AGENTS.md` and the `std-*` skills in [sirloinbh/project-standards](https://github.com/sirloinbh/project-standards) (`templates/common/`): work procedure (std-backlog, std-git-writing, std-code-review, std-session-notes), prohibited actions, accounts and security.
- Design rules for this repository: [AGENTS.project.md](AGENTS.project.md).
- Explanations, issues, commits, PRs and docs are in English.
- Verification: `npm run check` before every commit and pull request. Do not run `npx`, and install packages only with `npm install --ignore-scripts --save-exact` after the dependency policy review (project-standards `docs/dependency-policy.md`).
- `main` is protected: work on a branch, open a pull request, merge it with a merge commit.
