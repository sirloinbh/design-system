import { act, renderHook } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';

import { useCopyText } from './use-copy-text';

const original = Object.getOwnPropertyDescriptor(globalThis.navigator, 'clipboard');
const setClipboard = (value: unknown) =>
  Object.defineProperty(globalThis.navigator, 'clipboard', { value, configurable: true });

afterEach(() => {
  if (original) Object.defineProperty(globalThis.navigator, 'clipboard', original);
  else Reflect.deleteProperty(globalThis.navigator, 'clipboard');
});

test('copy writes the text and reports a status', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  setClipboard({ writeText });
  const { result } = renderHook(() => useCopyText());
  let copied: boolean | undefined;
  await act(async () => {
    copied = await result.current.copy('hello');
  });
  expect(writeText).toHaveBeenCalledWith('hello');
  expect(copied).toBe(true);
  expect(result.current.notice).toEqual({ kind: 'status', text: 'Copied' });
});

test('a refused permission reports an error and returns false', async () => {
  setClipboard({ writeText: vi.fn().mockRejectedValue(new Error('denied')) });
  const { result } = renderHook(() => useCopyText());
  let copied: boolean | undefined;
  await act(async () => {
    copied = await result.current.copy('hello');
  });
  expect(copied).toBe(false);
  expect(result.current.notice?.kind).toBe('error');
  expect(result.current.notice?.text).toMatch(/copy it by hand/);
});

test('no clipboard at all is reported the same way', async () => {
  setClipboard(undefined);
  const { result } = renderHook(() => useCopyText());
  await act(async () => {
    await result.current.copy('hello');
  });
  expect(result.current.notice?.kind).toBe('error');
});

test('messages can be set for the hook or for one call, and clear removes the notice', async () => {
  setClipboard({ writeText: vi.fn().mockResolvedValue(undefined) });
  const { result } = renderHook(() => useCopyText({ success: 'Page default' }));
  await act(async () => {
    await result.current.copy('a');
  });
  expect(result.current.notice?.text).toBe('Page default');
  await act(async () => {
    await result.current.copy('a', { success: 'Link copied.' });
  });
  expect(result.current.notice?.text).toBe('Link copied.');
  act(() => result.current.clear());
  expect(result.current.notice).toBeUndefined();
});
