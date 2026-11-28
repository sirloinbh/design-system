# #74 Add a currency formatter to the format helpers

- Issue: [#74](https://github.com/sirloinbh/design-system/issues/74)
- Branch: `feat/74-format-currency`
- Related: #65 (epic), `docs/component-survey.md` candidate B
- Release: patch

## Changes - 2026-11-28

- `src/lib/format.ts`: `formatCurrency(value, currency = 'KRW')`, for example `₩12,500` and `$12.50`. The currency sets the decimals (won has none). A value that is not a finite number gives an empty string, like `formatNumber`. Formatters are kept per currency. Pass a valid ISO 4217 code: an unknown code throws, as `Intl.NumberFormat` does.
- `src/lib/format.test.ts`: won, zero, negative, rounding, USD, JPY, NaN and Infinity.
- Where the copies were: money-ledger `format.ts` (`formatWon`), health-log `visit-text.ts` (`wonText`), life-journal `items.ts` (`formatKrw`). All built the same `Intl.NumberFormat('en-US', { style: 'currency', currency: 'KRW' })`; the apps replace them in their migration cards (project-standards#1177). `docs/ui-components.md` is owned by another lane and is not updated here.

## Verification

- `npm run check` passes (see the PR for the run).
