# #1167 Move the design-system docs and UI ADRs here

- Issue: [sirloinbh/project-standards#1167](https://github.com/sirloinbh/project-standards/issues/1167)
- Branch: `docs/1167-design-docs`
- Related: #1155, #1160 (ADR-0031), move plan rows C1 to C4

## Changes — 2026-11-28

- Copied `design-system.md`, `layout.md`, `ui-components.md` and the 11 screenshots in `docs/ui-components/` from project-standards `docs/`. Links to files that moved here are relative; links to files that stay in project-standards (`directory-rules.md`, `dependency-policy.md`, ADR-0031, the move plan) and to files that move later (`design-tokens.md` and the tokens README, #1165) are absolute GitHub links, to be made relative when they arrive.
- The four UI ADRs are copied and renumbered: project-standards ADR-0007 is ADR-0001, ADR-0008 is ADR-0002, ADR-0011 is ADR-0003, ADR-0020 is ADR-0004. Each has an "Originally project-standards ADR-00NN" line. The decision text is unchanged.
- New `docs/screen-text-check.md`: the screen-text part of `korean-text-check.md` (move plan row C4). The report part, the allow list and the check code stay in project-standards.
- README lists the documents.
- `ui-components.md` still describes `query.ts`, `session-watch.ts`, `sign-in.tsx` and `health.ts`. Move plan row A3 says those stay in project-standards, so they are listed here only until #1172 and the component cards separate the kit from app plumbing.

## Not moved

- `docs/design-tokens.md` and its generator move with the tokens (#1165).
- `docs/design.md` sections 2, 4 and 5.1 stay in project-standards (move plan row C8): they describe how sync delivers files, and ADR-0031 already updated their pointers.

## Verification

- `npm run check` locally and in CI.
