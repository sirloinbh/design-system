import { afterEach, expect, test, vi } from 'vitest';

import { createRetryKeys, newIdempotencyKey } from './retry-keys';

afterEach(() => vi.unstubAllGlobals());

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

test('a new key is a v4 UUID and differs each time', () => {
  const first = newIdempotencyKey();
  expect(first).toMatch(uuid);
  expect(newIdempotencyKey()).not.toBe(first);
});

test('without crypto.randomUUID (an http page) the fallback still gives a v4 UUID', () => {
  vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });
  expect(newIdempotencyKey()).toMatch(uuid);
});

test('the same request keeps its key until the server answers', () => {
  let count = 0;
  const keys = createRetryKeys(() => `key-${++count}`);
  expect(keys.keyFor('POST /meals {a}')).toBe('key-1');
  expect(keys.keyFor('POST /meals {a}')).toBe('key-1');
  keys.answered();
  expect(keys.keyFor('POST /meals {a}')).toBe('key-2');
});

test('a different request gets a new key', () => {
  let count = 0;
  const keys = createRetryKeys(() => `key-${++count}`);
  expect(keys.keyFor('POST /meals {a}')).toBe('key-1');
  expect(keys.keyFor('POST /meals {b}')).toBe('key-2');
  expect(keys.keyFor('POST /meals {a}')).toBe('key-3');
});
