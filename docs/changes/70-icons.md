# #70 Unify icons: one icon per meaning and one size scale

- Issue: [#70](https://github.com/sirloinbh/design-system/issues/70) (epic #66)
- Branch: `feat/70-icons`
- Related: user request of 2026-11-28 item 5, ADR-0001
- Release: minor

## Changes — 2026-11-28

- Survey (kit and the 8 app frontends on origin/main, read only): the apps differ in `Plus`/`PlusIcon`, `X`/`XIcon`, `ChevronDown`/`ChevronDownIcon`, `Trash2`, and in sizes (default, 15, 16, 19, 22 px in workout-memo). Seven apps use `LayoutDashboard` and `Settings2` for the menu; the table keeps those.
- `src/lib/icons.ts`: the icons by meaning (`AddIcon`, `DeleteIcon`, ...) and `ICON_SIZE` (16, 20, 24 px). The kit imports common icons from it; the `Loader2Icon` alias is now `LoadingIcon` (`LoaderCircle`).
- Sizes in the kit: the main menu icons are 20px (were 16px) and the external-link glyph is 16px (was 14px).
- `src/lib/icon-rules.mjs`: `iconImportConfig()` for ESLint, reporting a `lucide-react` import of a covered meaning or one of its alternates; on in this repository for `src/`. `scripts/test/icon-rules.test.mjs` checks it against a fixture and keeps the map, the table and the rule in step.
- `docs/ui-spec.md`: the "Icons" section (meaning table, size scale, stroke, icon or emoji, the lint rule).
- Not in this card: stories keep importing from `lucide-react` (not part of the kit); the apps adopt the map in project-standards#1221.

## Verification

- `npm run check`.
