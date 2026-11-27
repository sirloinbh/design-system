# #1166 Move the shared UI kit (templates/ui) to design-system

- Issue: [sirloinbh/project-standards#1166](https://github.com/sirloinbh/project-standards/issues/1166)
- Branch: `feat/1166-ui-kit`
- Related: ADR-0031, [move plan rows A1 to A4, B4, E1](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-move.md), #1165 (tokens)

## Changes — 2026-11-28

Copied from `sirloinbh/project-standards@25f5651` `templates/ui/frontend/` (the project-standards copy stays until #1170):

- `src/components/ui/` (the shadcn components with their tests and helper files), `src/components/layout/` (app-shell, ai-shell, app-switcher, theme-toggle with tests) and `src/lib/` (`utils`, `theme`, `use-notice`, `api`, `ai-chat`, `use-ai-chat`, `apps`, `theme-config`, `ai-config`, `auth-config`) plus `src/health`, `src/auth-origin`, `src/session-watch` with their tests. `public/theme-init.js.tmpl`. Every file is byte for byte the same, so the files the apps receive do not change.
- The plumbing files (`api`, `ai-chat`, `use-ai-chat`, `health`, `auth-origin`, `session-watch`, the `ai-config` and `auth-config` templates) came along because `ai-shell` and the notice tests import them and the sync delivers one folder; moving them keeps the kit self-contained. The plan's "safe default is Stay" is decided as: they are copied here, and a later card can split them out.
- Not copied: `sign-in.tsx` (imports the private `@sirloinbh/auth-client`) and `service-worker.ts` with its test (needs the app's `public/sw.js`). Plan row A5 says both stay.
- `.tmpl` files stay templates. `scripts/render-dev-files.mjs` writes them with sample values for lint, types and tests (git-ignored output).
- Tests: the kit tests run with vitest (jsdom, the apps' standard setup in `test/setup.ts`); `scripts/test/ui-kit-english.test.mjs` (no Hangul, #1148) and `scripts/test/cn-text-styles.test.mjs` (`cn()` knows every text style of the tokens, row B4) moved with them.
- Dependencies, exact versions from project-standards `versions.json` (already used by all 8 apps): react, react-dom, react-router, radix-ui, class-variance-authority, clsx, lucide-react, sonner, tailwind-merge, vaul; dev: @testing-library/dom, jest-dom and react, @types/react, @types/react-dom, jsdom. No install scripts run (`--ignore-scripts`); `ioc-scan` is clean.
- `.prettierignore` lists the moved folders: the apps do not format the managed kit, and a formatted copy would change the bytes the apps receive. `eslint.config.mjs` marks `Input` as a native input for the label rule, as the apps do. `tsconfig.json` includes `test/`. The placeholder `src/index.ts` and its test are removed.

## Verification

- `npm run check` in design-system: 42 test files, 199 tests pass (3 skipped as in project-standards), lint, types, format, token and package checks, secret and IOC scans, doc links.
- `node scripts/compare-ui-kit.mjs <this clone>` in project-standards (added in the project-standards PR for #1166): 90 kit files render the same for all 8 apps.
