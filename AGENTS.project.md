# Design rules for shared UI

These apply to everything shipped from this repository. They come from the project-standards design system documents and the user requirements of 2026-11-26 (#1123).

- **English only.** No Hangul in shared UI text, labels, `aria-*` text, test names or stories. The apps' Korean check (#1129) would fail on it.
- **Text size.** 12px is the minimum for any visible text; use the type scale tokens, not raw sizes.
- **Controls.** Interactive controls are at least 40px tall on a pointer screen and 48px on touch (`pointer-coarse`); a small visual control keeps a 44px press area.
- **Cursor.** Every control that acts on click shows the pointer cursor.
- **Pick instead of type.** Where the possible values are known, offer a choice control (`SegmentedControl`, `NativeSelect`, `Select`, `Combobox`, `DateField`, `NumberInput`, `Switch`) before a free text field.
- **Accessibility.** Each component has a name, keyboard operation, visible focus, and a state announced to screen readers; test it with Testing Library.
- **Tokens.** Colors, spacing, radius and type come from `@sirloinbh/design-tokens`; light and dark both work.
- **No new package without review.** Follow the dependency policy; dev dependencies only, exact versions, no install scripts.
