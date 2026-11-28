# #15 Add FileField, downloadBlob and BackupSection

- Issue: [#15](https://github.com/sirloinbh/design-system/issues/15)
- Branch: `feat/15-file-backup`
- Related: sirloinbh/project-standards#1156 (epic), the [component survey](https://github.com/sirloinbh/project-standards/blob/main/docs/design-system-component-survey.md) row 10
- Release: minor

## Changes — 2026-11-28

- `src/components/file-field/file-field.tsx`: `FileField` shows an English button ("Choose file" by default, or its children) instead of the browser's own file control. The real file input stays in the page, visually hidden, so the keyboard and screen readers work; the button shows the focus ring. `onFiles(files)` is called with the chosen files and the input is cleared right after, so choosing the same file again fires again. Props: `accept`, `multiple`, `disabled`, `className` and the other input props.
- `src/components/file-field/download-blob.ts`: `downloadBlob(name, type, data)` saves data through a temporary link and releases the address.
- `src/components/backup-section/backup-section.tsx`: `BackupSection` with an export button, an import `FileField`, a `ConfirmDialog` before the import replaces data, and two live regions (`role="status"` for success, `role="alert"` for a failure). Props: `fileName`, `onExport`, `onImport`, and English text overrides.
- Tests for all three and stories `Components/FileField` and `Components/BackupSection`.
- The study-log, life-journal, money-ledger and workout-memo originals were not available in this checkout, so the APIs follow the survey notes.

- Visual baselines for the FileField and BackupSection stories, made in the pinned Playwright container (`docs/showcase-tests.md`). The PeriodNav baselines (#1175) were also missing on main, so they are included; they are the images the PeriodNav card would produce.

## Verification

- `npm run check` passes (Tests 242 passed | 3 skipped (245)).
