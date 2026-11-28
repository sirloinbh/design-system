# #75 Add a DescriptionList for label and value grids

- Issue: [#75](https://github.com/sirloinbh/design-system/issues/75)
- Branch: `feat/75-description-list`
- Related: #65 (epic), `docs/component-survey.md` candidate C
- Release: patch

## Changes - 2026-11-28

- `src/components/description-list/description-list.tsx`: `DescriptionList` (native `dl`, prop `columns` 1, 2 or 3, default 2) and `DescriptionItem` (`label` and children; a `div` holding the `dt` and `dd`). `columns` is the count from the `sm` width up; a phone always gets one column. The label is muted, text uses the `text-body-sm` token, and the value wraps long words. No new package.
- `src/components/description-list/description-list.test.tsx`: term and definition roles, dl and div structure, muted label, column classes, default two columns, prop passthrough.
- `stories/Components/DescriptionList.stories.tsx`: one, two and three columns.
- Where the copies were: 28 files in 6 apps, for example health-log `body.tsx`, `checks.tsx`, `foods.tsx`. Some of them (health-log 2 columns even on a phone, money-ledger boxed totals) differ from this default; the money-ledger boxed totals are `StatCard` copies and stay out of this component. The apps adopt it in their migration cards (project-standards#1177). `docs/ui-components.md` is owned by another lane and is not updated here.

## Verification

- `npm run check` passes (see the PR for the run).
