# Screen text must be English (#1129)

User requirement of 2026-11-26: no Korean on any screen. Shared UI text, labels, `aria-*` text and test names here are English only. The apps enforce the same rule with their own check.

The rule and the check code stay in project-standards, because the check runs inside each app repository (`.standards/check.mjs`) without access to this repository. This page owns the wording; the code is `scripts/standards-check.mjs` and `scripts/lib/korean-text.mjs` in [project-standards](https://github.com/sirloinbh/project-standards/blob/main/docs/korean-text-check.md).

## What the app check does

The app-side `npm run standards:check` **fails** (group `screen text`) when a frontend source holds Korean outside a comment, because that text can reach a screen.

- Scanned: `frontend/src/**/*.{ts,tsx,js,jsx,html}`. Comments (`//`, `/* */`) are removed first.
- Not scanned: `*.test.*`, `*.spec.*`, `*.stories.*`, and files under `test/`, `tests/`, `__tests__/`, `__mocks__/`, `fixtures/`, `e2e/`. Samples of user data stay Korean there.
- Code that must recognize Korean input (a CSV header such as `'날짜'`, a label parser for Korean nutrition labels) stays Korean. Mark it with `korean-ok: <reason>` in a comment on the same line or the line above, or put `korean-ok-file: <reason>` anywhere in the file when the whole file does this.
- Do not use the marker for text a user reads. Translate that text instead.

## In this repository

- Shared components, stories and docs are English. A component test that checks for Hangul in the UI kit moves here with the kit (move plan row E1).
- Samples of Korean user data in a story or test may stay Korean, with a `korean-ok` marker and the reason.
