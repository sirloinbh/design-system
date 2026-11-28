# #8 Add the Table component family

- Issue: [#8](https://github.com/sirloinbh/design-system/issues/8)
- Branch: `feat/8-table`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 2
- Release: minor

## Changes — 2026-11-28

- `src/components/table/table.tsx`: `Table`, `TableCaption`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`.
  - `Table` needs a `label`. It puts the table in a scroll wrapper that is a named, focusable region (`overflow-x-auto`), so a wide table scrolls inside its frame and the page never overflows at 360px, and a keyboard user can scroll it. `wrapperClassName` styles the wrapper.
  - `TableCaption` names the table and sits on top (`caption-top`). Every table is expected to have one; hide it with `sr-only` only when a heading already names it.
  - `TableHead` is a `th` with `scope="col"` by default (`scope="row"` for a row header). `TableCell` is a `td`. Both take `numeric` (right-aligned, `tabular-nums`) and `sticky` (keeps the first column in place while scrolling).
  - Text is `text-body-sm` (never under 12px); colors are tokens (`bg-muted` head, `border`, `bg-card` for sticky cells).
- `src/components/table/table.test.tsx` and `stories/Components/Table.stories.tsx` (default, scrolls sideways) with visual baselines.
- Not in this card: a column-definition `DataTable` (its own card later) and the apps' migration cards.

## Verification

- `npm run check`; baselines written with the Playwright container command in `docs/showcase-tests.md`.
