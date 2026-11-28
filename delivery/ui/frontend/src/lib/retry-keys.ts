// One `Idempotency-Key` per user action (#80). Sending the same request again after it got no answer keeps its key, so
// the server can tell a retry from a new action and answers it without adding the entry twice. A different request, or
// one the server answered, gets a new key. Send the key as the `Idempotency-Key` request header.

/**
 * A random v4 UUID. `crypto.randomUUID` exists only on a secure page (https or localhost), so on a phone that opens a
 * local http server it falls back to `crypto.getRandomValues`, which works everywhere.
 */
export function newIdempotencyKey(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 15) | 64;
  bytes[8] = (bytes[8] & 63) | 128;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/**
 * Keeps the key of the last request. `keyFor(request)` gives the same key while `request` (any string that identifies
 * the action, such as the path and body) stays the same; call `answered()` when the server answered, success or refusal.
 */
export function createRetryKeys(newKey: () => string = newIdempotencyKey) {
  let last: { request: string; key: string } | undefined;
  return {
    keyFor(request: string) {
      if (last?.request !== request) last = { request, key: newKey() };
      return last.key;
    },
    /** The server answered: the next request is a new action. */
    answered() {
      last = undefined;
    },
  };
}
