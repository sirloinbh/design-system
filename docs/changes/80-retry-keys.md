# #80 Share the retry key helper

- Issue: [#80](https://github.com/sirloinbh/design-system/issues/80)
- Branch: `feat/80-retry-keys`
- Related: #65 (epic), `docs/component-survey.md` candidate H
- Release: patch

## Decision (the card's first task)

Worth it. The two apps do not just copy each other: health-log `retry-key.ts` memoizes one key per request but generates it with `crypto.randomUUID()`, which exists only on a secure page. workout-memo `workspace/use-workout-draft.ts` has a generator with a `crypto.getRandomValues` fallback for a phone that opens a local http server. The shared helper joins both.

## Changes - 2026-11-28

- `src/lib/retry-keys.ts` (a new file, next to `api.ts` rather than inside it): `newIdempotencyKey()` (v4 UUID with the http fallback) and `createRetryKeys(newKey?)` with `keyFor(request)` and `answered()`.
- `src/lib/retry-keys.test.ts`: UUID format, the fallback, same request keeps its key until answered, a different request gets a new key.
- `docs/component-survey.md`: the decisions for G (closed as not planned, see #79) and H.
- Apps replace `retry-key.ts` (health-log) and `retryKey()` (workout-memo) in their migration cards (project-standards#1177). `docs/ui-components.md` is owned by another lane and is not updated here.

## Verification

- `npm run check` passes (see the PR for the run).
