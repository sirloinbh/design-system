# #57 Show the app icon instead of the app name in the top bar

- Issue: [#57](https://github.com/sirloinbh/design-system/issues/57) (epic #55)
- Branch: `feat/57-app-icon`
- Related: sirloinbh/project-standards#1213 (registry `icon` value), user review of 2026-11-28 item 1
- Release: minor

## Changes — 2026-11-28

- `src/lib/apps.ts.tmpl`: imports the current app's lucide-react icon from the template variable `{{project.icon}}` and exports it as `CurrentAppIcon` (a named import, so only that icon is bundled). `scripts/render-dev-files.mjs` gives `render:dev` the sample `project.icon` value `Palette`.
- `src/components/layout/app-shell.tsx`: the home link shows `CurrentAppIcon` instead of the name. It keeps `aria-label` and `title` set to the app name and a 44px press area. The name stays in the mobile menu sheet title and the footer.
- Tests (`app-shell.test.tsx`), `docs/layout.md`.
- Delivery to the apps needs project-standards#1213 to define `project.icon` (a lucide-react icon name) and render it; until then an app's `lib/apps.ts` would not compile after upgrading.
- Not in this card: icons in the app switcher list.

## Verification

- `npm run check`.
