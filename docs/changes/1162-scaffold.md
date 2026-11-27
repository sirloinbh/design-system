# #1162 Scaffold the design-system repository

- Issue: [sirloinbh/project-standards#1162](https://github.com/sirloinbh/project-standards/issues/1162)
- Branch: `feat/1162-scaffold`
- Related: ADR-0031, #1161 (repository created, public), #1163 (agent files by sync)

## Changes — 2026-11-27

- `package.json` with dev dependencies at the versions in project-standards `versions.json`; `npm run check` runs lint, format check, typecheck, tests, secret scan, supply-chain scan and the relative link check.
- Config from the shared packages: `eslint.config.mjs` (`@sirloinbh/eslint-config`, pointed at `src/`), `prettier.config.mjs`, `tsconfig.json` (`@sirloinbh/tsconfig/react-app.json`), `.npmrc` as in the apps.
- `scripts/` holds `check-doc-links.mjs`, `secret-scan.mjs` and `ioc-scan.mjs`, and `security/blocked-packages.json` is the list `ioc-scan` reads, all copied unchanged from project-standards.
- `.github/workflows/ci.yml`: one job, `check`, on pull requests and pushes to main. Issue and PR templates copied from project-standards.
- README, a temporary `AGENTS.md` that points to the project-standards rules, `CLAUDE.md`, `AGENTS.project.md` with the design rules, `docs/changes/` and `docs/adr/`.
- `src/index.ts` and one test, so lint, types and tests have something to run until the UI files move in.

## Verification

- `npm ci` and `npm run check` locally and in CI.
