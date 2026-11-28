# #1169 The screen checks live here

Epic #1155 in project-standards. The text size (12px) and Korean screen text checks that every app runs are now owned by this repository.

Release: minor

## Change

| File                                   | Content                                                                                                                                                                                                                                                                                  |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `delivery/standards/screen-checks.mjs` | `checkMinFontSize`, `checkKoreanScreenText` and their helpers, moved from project-standards `scripts/standards-check.mjs`. Node built-ins only, no Hangul characters. Part of every release (`delivery/standards/`): sync vendors it into each app as `.standards/lib/screen-checks.mjs` |
| `scripts/test/screen-checks.test.mjs`  | The tests of both checks (Hangul samples as `\u` escapes)                                                                                                                                                                                                                                |
| `scripts/test/no-hangul.test.mjs`      | No Hangul anywhere in `delivery/`, `src/`, `stories/`, `showcase/`, `.storybook/` (the former `ui-kit-english` test, widened)                                                                                                                                                            |

## Contract

A release must contain `delivery/standards/screen-checks.mjs`. Sync fails when the pinned tag lacks it (project-standards#1169). The apps' `standards-check` keeps the same groups (`text size`, `screen text`) and the same messages. `scripts/lib/korean-text.mjs` (the repository-wide count of Korean documents used by the compliance report) is not a screen check and stays in project-standards.

## Checks

`npm run check`: passed.
