# #1172 Design guidelines

- Issue: [sirloinbh/project-standards#1172](https://github.com/sirloinbh/project-standards/issues/1172)
- Branch: `docs/1172-guidelines`
- Related: #1156, #1167

## Changes — 2026-11-28

- `docs/guidelines.md`: one table of the screen rules (language, type scale, 12px floor, tokens, light and dark, contrast, touch targets, cursor, focus, pick instead of type, loading, empty and error, icons, responsive, menu order, accessibility, dependencies), each with the check that enforces it or "Review" where none exists yet. Component API conventions: names, props, `variant`, `size`, `className`, controlled and uncontrolled inputs, `ref`, `aria-*`, tokens, English defaults, tests.
- `docs/review-checklist.md`: checklist for design-system PRs.
- The PR template has a "Design checklist" section linking the checklist; README lists both pages.

## Notes

- Rules marked "Review" have no automatic check today; they are candidates for tests and are tracked by the showcase test cards (#1186) and the component cards.
- The `std-code-review` addition in project-standards is a one-line pointer to the checklist, done with #1168 because that card owns the shared agent files.

## Verification

- `npm run check` in CI; the relative link check passes locally.

## Also

- Links to `design-tokens.md` and the tokens README (moved by #1165) are relative now; README lists all documents.
