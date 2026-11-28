# #1219 Format the kit like the apps

Release: patch

The v1.0.0 sync PR in workout-memo (#523) failed `prettier --check` on 5 delivered components. The apps format with `prettier-plugin-tailwindcss` (`templates/app/prettier.config.mjs.tmpl` in project-standards), which sorts Tailwind classes, and this repository did not.

## Changes — 2026-11-28

- `prettier.config.mjs` uses `prettier-plugin-tailwindcss` 0.8.1 (the version the apps pin) with the same `tailwindPreserveWhitespace` option; `tailwindStylesheet` points at `showcase/theme.css`, which imports the same Tailwind theme and tokens.
- `package.json`, `package-lock.json`: the plugin as a dev dependency (exact, installed with `--ignore-scripts`).
- Class order fixed in `disclosure`, `external-link`, `file-field`, `nav-tabs` and `score-field`; `delivery/ui/frontend/` regenerated. `format:check` (part of `npm run check`) now covers the app formatting of everything the kit delivers, and `delivery:check` keeps `delivery/` equal to `src/`.
- The sixth failing file, `markdown/markdown.md`, was a sync problem: the sync put its managed header directly above the heading, and Prettier wants a blank line. Fixed in project-standards (#1219), no change here.
