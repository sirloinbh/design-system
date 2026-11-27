# #1165 Move the design tokens package and its build to design-system

- Issue: [sirloinbh/project-standards#1165](https://github.com/sirloinbh/project-standards/issues/1165)
- Branch: `feat/1165-tokens-package`
- Related: ADR-0031, [move plan rows B1 to B3, B5, B7](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-move.md)

## Changes — 2026-11-28

Moved from `sirloinbh/project-standards@25f5651` (the project-standards copies stay until #1170 removes them):

- `design/tokens.json` is now `tokens/tokens.json`, the source of every token.
- `packages/design-tokens/` (`tokens.css`, `tailwind.css`, Pretendard fonts and licence, README, CHANGELOG, `package.json`) with the same package name `@sirloinbh/design-tokens`, so apps need no change.
- `scripts/build-tokens.mjs` generates the two CSS files (`npm run tokens`, `npm run tokens:check`); `scripts/build-token-docs.mjs` generates `docs/design-tokens.md` (`npm run tokens:docs`). This replaces the token part of project-standards `gen-docs.mjs`.
- `scripts/package-guard.mjs` and `scripts/changelog-section.mjs` (supply-chain rules and release notes for the package).
- `.github/workflows/publish.yml`: pushing a tag `design-tokens/vX.Y.Z` runs the full check, publishes to GitHub Packages and records the Release. The tag push stays a user step.
- Tests ported from `node:test` to vitest: `scripts/test/tokens.test.mjs` (token rules, contrast, generated doc) and `scripts/test/design-tokens-package.test.mjs` (package rules, tag check, generated CSS, font hashes).
- Version `1.1.1`: values, fonts and exports are unchanged. Only the repository link, the description (now English) and the "Generated file" comment in the two CSS files changed.
- `.prettierignore` skips the generated files and the hash-checked fonts.

Not moved here: `scripts/test/cn-text-styles.test.mjs` (row B4) needs `utils.ts`, so it moves with the UI kit in #1166.

## User steps

- In the package settings of `@sirloinbh/design-tokens`, give `design-system` Write access (publish) and Read access (install), as done for the other packages.
- Push the tag `design-tokens/v1.1.1` after this merges. Then project-standards raises `versions.json` to `1.1.1` and the sync PRs follow.

## Verification

- `npm run check` in design-system: lint, format, types, all tests pass, `tokens:check` (CSS and doc up to date), `package:check`, secret scan, IOC scan, doc links.
- Generated `tokens.css` and `tailwind.css` differ from project-standards only in the header comment line.
