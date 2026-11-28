# #77 Add a copy-to-clipboard hook with a notice

- Issue: [#77](https://github.com/sirloinbh/design-system/issues/77)
- Branch: `feat/77-copy-text-hook`
- Related: #65 (epic), `docs/component-survey.md` candidate E
- Release: patch

## Changes - 2026-11-28

- `src/lib/use-copy-text.ts`: `useCopyText(defaults?)` returns `copy(text, messages?)`, `notice` and `clear`. `copy` resolves to true or false and sets a `NoticeValue` through `useNotice` (status "Copied", or an error that says to copy by hand). It handles a missing clipboard and a refused permission. Messages can be set for the hook or for one call.
- `src/lib/use-copy-text.test.tsx`: success, refusal, no clipboard, custom messages and `clear`.
- Where the copies were: study-log `exercises.tsx` (copy, then a status or an alert) and dev-career-portfolio `share.tsx` (`copy`, "Link copied." or an error). Both migrate in their cards (project-standards#1177). `docs/ui-components.md` is owned by another lane and is not updated here.

## Verification

- `npm run check` passes (see the PR for the run).
