# #60 Fix white text on white dropdown lists in dark mode

- Issue: [#60](https://github.com/sirloinbh/design-system/issues/60)
- Branch: `fix/60-dark-dropdown-lists`
- Related: #56 (epic)
- Release: patch

## Cause

`NativeSelect` is the only affected control. Its field is `bg-transparent` (`dark:bg-input/30`), so the browser's open option list had no solid background while the options inherited the light dark-mode text color. `Select`, `Combobox` and `DropdownMenu` already use `bg-popover text-popover-foreground` on their lists.

## Changes - 2026-11-28

- `src/components/ui/native-select.tsx`: `option` and `optgroup` get `bg-popover text-popover-foreground`. The closed field look and light mode are unchanged.
- `src/components/ui/native-select.test.tsx`: guards the option colors and the transparent field.

## Contrast

Dark tokens: `--popover-foreground` oklch(0.985 0 0) on `--popover` oklch(0.205 0 0), about 16:1 (needs 4.5:1). Light: oklch(0.145 0 0) on oklch(1 0 0), about 19:1. These are estimates from the token lightness values, not measured in a browser. `Select`, `Combobox` and `DropdownMenu` use the same pair.

## Not verified

- A real-browser check in Chrome/Edge on Windows and on a phone was not run in this lane. The browser draws the option list, so the jsdom test only guards the classes.

## Verification

- `npm run check` passes (see the PR for the run).
