# #1180 Scaffold the Storybook showcase

- Issue: [sirloinbh/project-standards#1180](https://github.com/sirloinbh/project-standards/issues/1180)
- Branch: `feat/1180-storybook-scaffold`
- Related: #1179 (Storybook chosen), #1157 (showcase epic), #1165 (tokens package, merged)

## Changes — 2026-11-28

- Storybook 10 with the React + Vite builder, written by hand (no `storybook init`). Config in `.storybook/` (`main.ts`, `preview.ts`); stories in `stories/` (`*.stories.tsx` and `*.mdx`).
- The story hierarchy is the showcase menu: Foundations, Components, Layout, Patterns, Guidelines (`storySort` in `preview.ts`). A Guidelines welcome page and one sample component story (`Components/Sample`) exist.
- `preview.ts` loads `showcase/theme.css`, which imports the tokens package in this repository (`packages/design-tokens/tokens.css`, with the Pretendard font). Dark mode follows the tokens (`.dark` class or the system setting); the theme tool is #1184.
- Scripts: `npm run storybook` (dev, port 6006), `npm run storybook:build` (static output in `.local/storybook-static` for #1187). `npm run check` now also builds Storybook.
- ESLint and `tsc` cover `stories/` and `.storybook/`; default exports are allowed in story and Storybook config files.

## Dependency review (docs/dependency-policy.md)

All dev dependencies, exact versions, MIT, no `preinstall`/`install`/`postinstall`/`prepare` script on the direct packages, installed with `--ignore-scripts`.

| Package                                                                        | Version                      | Released             | Publisher              |
| ------------------------------------------------------------------------------ | ---------------------------- | -------------------- | ---------------------- |
| storybook, @storybook/react-vite, @storybook/addon-docs, @storybook/addon-a11y | 10.6.7                       | 2026-11-10 (18 days) | storybookjs            |
| react, react-dom, @types/react, @types/react-dom                               | 19.3.0 (versions.json)       | per versions.json    | meta / DefinitelyTyped |
| vite, @vitejs/plugin-react                                                     | 6.4.5, 5.2.0 (versions.json) | per versions.json    | vitejs                 |

10.6.8 and 10.6.9 are newer than the 14-day rule, so 10.6.7 is used. React, Vite and the plugin match the versions the apps use.

## Verification

- `npm run check` (lint, format, typecheck, tests, scans, links, Storybook build).
