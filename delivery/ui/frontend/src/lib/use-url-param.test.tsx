import { act, render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter, useLocation, useNavigationType } from 'react-router';
import { expect, test } from 'vitest';

import { useUrlParam } from './use-url-param';

const wrap =
  (initial: string) =>
  ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={[initial]}>{children}</MemoryRouter>
  );

test('the value is read from the address and falls back when the parameter is absent', () => {
  const { result } = renderHook(() => useUrlParam('q'), { wrapper: wrap('/songs?q=love') });
  expect(result.current[0]).toBe('love');
  const empty = renderHook(() => useUrlParam('status', 'all'), { wrapper: wrap('/songs') });
  expect(empty.result.current[0]).toBe('all');
});

function Probe({ replace }: { replace?: boolean }) {
  const [value, setValue] = useUrlParam('q', '', { replace, resetKeys: ['page'] });
  const location = useLocation();
  return (
    <>
      <output aria-label="url">{location.pathname + location.search}</output>
      <output aria-label="value">{value}</output>
      <button type="button" onClick={() => setValue('abc')}>
        set
      </button>
      <button type="button" onClick={() => setValue('')}>
        clear
      </button>
    </>
  );
}

test('setting a value writes it, keeps other parameters and resets the listed ones', () => {
  render(
    <MemoryRouter initialEntries={['/songs?tag=x&page=3']}>
      <Probe />
    </MemoryRouter>,
  );
  act(() => screen.getByRole('button', { name: 'set' }).click());
  expect(screen.getByLabelText('url').textContent).toBe('/songs?tag=x&q=abc');
  expect(screen.getByLabelText('value').textContent).toBe('abc');
});

test('setting the fallback or an empty string removes the parameter', () => {
  render(
    <MemoryRouter initialEntries={['/songs?q=abc&tag=x']}>
      <Probe />
    </MemoryRouter>,
  );
  act(() => screen.getByRole('button', { name: 'clear' }).click());
  expect(screen.getByLabelText('url').textContent).toBe('/songs?tag=x');
});

test('replace swaps the history entry, the default adds one', () => {
  function Navigation({ replace }: { replace: boolean }) {
    const [, setValue] = useUrlParam('q', '', { replace });
    const type = useNavigationType();
    return (
      <>
        <output aria-label="type">{type}</output>
        <button type="button" onClick={() => setValue('typed')}>
          type
        </button>
      </>
    );
  }
  for (const [replace, expected] of [
    [true, 'REPLACE'],
    [false, 'PUSH'],
  ] as const) {
    const { unmount } = render(
      <MemoryRouter>
        <Navigation replace={replace} />
      </MemoryRouter>,
    );
    act(() => screen.getByRole('button', { name: 'type' }).click());
    expect(screen.getByLabelText('type').textContent).toBe(expected);
    unmount();
  }
});
