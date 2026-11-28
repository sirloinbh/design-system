# #67 Find UI pieces used in two or more places in the apps

- Issue: [#67](https://github.com/sirloinbh/design-system/issues/67)
- Branch: `docs/67-component-survey`
- Related: #65 (epic), sirloinbh/project-standards#1174 (first survey), sirloinbh/project-standards#1177 (app adoption)
- Release: none (documentation only)

## Changes - 2026-11-28

- `docs/component-survey.md`: the survey. It names the commit of each app scanned, lists 9 new candidates (A to I) with where they are used, how the copies differ, a proposed API and effort, and lists the app files that copy or rebuild a component the kit already has.
- No CHANGELOG line: the release PR writes it from this record.
- Scan method and limits are in the survey: a name and pattern scan of 703 source files, read-only on `origin/main` of each app. Counts are lower bounds.

## Still open on the card

- The user approves which candidates become components (through the coordinator); then one card per accepted candidate is registered under #65.
- The local-copy list is posted as a comment on sirloinbh/project-standards#1177.

## Verification

- Prettier and links check on the two new files (see the PR).
