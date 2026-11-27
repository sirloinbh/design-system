# #1184 Showcase tools

- Issue: [sirloinbh/project-standards#1184](https://github.com/sirloinbh/project-standards/issues/1184)
- Branch: `feat/1184-showcase-tools`
- Related: #1180 (Storybook scaffold), #1157

## Changes — 2026-11-28

- Toolbar globals in `.storybook/preview.tsx`, applied by one decorator to every story:
  - **Theme**: System, Light, Dark, Dark-only app. The same `<html>` class rules as the apps' theme script (`showcase/tools.ts`, `themeClasses`); "Dark-only app" previews an app with `features.darkOnly` (always dark).
  - **Widths**: "360 / 768 / 1280 side by side" renders the story in three iframes of those widths. Each frame loads `iframe.html` with the same theme and pointer globals and frames off. The built-in viewport tool also has 360, 768 and 1280 presets.
  - **Pointer**: Touch (coarse) sets `data-pointer="coarse"` on `<html>`.
- Limit: a page cannot force the browser media query `(pointer: coarse)`. Components that use the Tailwind `pointer-coarse:` variant respond to a real touch device or DevTools touch emulation. The `data-pointer` attribute is the hook: once Tailwind is part of the showcase, a `@custom-variant` can match `[data-pointer='coarse']` too.
- `showcase/tools.ts` holds the pure helpers and `showcase/tools.test.ts` tests them.

## Verification

- `npm run check`.
