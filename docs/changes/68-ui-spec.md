# #68 One spec for every UI element

- Issue: [sirloinbh/design-system#68](https://github.com/sirloinbh/design-system/issues/68)
- Branch: `docs/68-ui-spec`
- Parent: #66; next: #69 (align the kit with the spec)

## Changes — 2026-11-28

- `docs/ui-spec.md`: the page-level parts (page padding, gaps, content width, top bar, sidebar) and a section for every exported component, with height on pointer and touch screens, padding, gap, radius, border, text style, icon size and the color of each state, read from the code. Each section lists where the code differs from the rules; a summary table is the work list for #69, and a second table lists the values that change today's look for the user to confirm.
- `scripts/ui-spec-coverage.mjs` and `scripts/test/ui-spec-coverage.test.mjs`: the test fails when a component file under `src/components/` has no `Source: \`path\``line in the spec or an exported component is not named in it. It runs in`npm run test`, so it is part of `npm run check`.
- `docs/guidelines.md` and `docs/review-checklist.md` link the spec.

## Verification

- `node scripts/ui-spec-coverage.mjs` failed before the spec existed and passes now; the test also covers a fixture with a missing section.
- `npm run check`.
