# #1181 Showcase foundation pages

- Issue: [sirloinbh/project-standards#1181](https://github.com/sirloinbh/project-standards/issues/1181)
- Branch: `feat/1181-foundations`
- Related: #1180, #1184, #1165 (tokens), #1157

## Changes — 2026-11-28

- Six pages under `Foundations/` in the showcase: Colors, Typography, Spacing and layout, Radius borders and shadows, Icons and emoji, Motion layers and loading. They read `tokens/tokens.json` directly, so a token added there shows up without an edit.
- Colors show each token with its light and dark swatch and value, the use, and the WCAG contrast ratio (AA needs 4.5:1) of each text color on its background, in both modes. The ratio comes from `showcase/foundations/contrast.ts` (oklch to sRGB, then relative luminance); transparent colors have no ratio.
- Every token name is a button that copies the name to the clipboard.
- `showcase/foundations/pages.test.tsx` renders all pages to static markup and fails if any token in `tokens.json` (colors in both modes, sizes, weights, text styles, layout, breakpoints, radius, shadows, icon sizes, z-index, motion) is missing from them.
- Limits: icons show the size scale only (lucide is not a showcase dependency) and emoji get a placeholder until the component kit lands (#1182). Shadow values are the Tailwind defaults, because `tokens.json` lists shadow names and uses but no values.

## Verification

- `npm run check`.
