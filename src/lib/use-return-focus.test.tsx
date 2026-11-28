import { act, fireEvent, render, screen } from '@testing-library/react';
import { useRef, useState } from 'react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

import { useReturnFocus } from './use-return-focus';

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

function Page({ rows = ['a', 'b'] }: { rows?: string[] }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(rows);
  const { remember, onCloseAutoFocus } = useReturnFocus(heading);
  const close = () => {
    setOpen(false);
    onCloseAutoFocus(new Event('focus'));
  };
  return (
    <div>
      <h2 ref={heading} tabIndex={-1}>
        Rows
      </h2>
      {list.map((row) => (
        <button
          key={row}
          type="button"
          onClick={(event) => {
            remember(event);
            setOpen(true);
          }}
        >
          Edit {row}
        </button>
      ))}
      {open ? (
        <div role="dialog" aria-label="Edit">
          <button type="button" onClick={close}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              setList((current) => current.filter((row) => row !== 'a'));
              close();
            }}
          >
            Delete row
          </button>
        </div>
      ) : null}
    </div>
  );
}

test('focus returns to the button that opened the dialog', () => {
  render(<Page />);
  const opener = screen.getByRole('button', { name: 'Edit b' });
  fireEvent.click(opener);
  fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
  act(() => {
    vi.runAllTimers();
  });
  expect(opener).toHaveFocus();
});

test('focus goes to the fallback when the opener is gone', () => {
  render(<Page />);
  fireEvent.click(screen.getByRole('button', { name: 'Edit a' }));
  fireEvent.click(screen.getByRole('button', { name: 'Delete row' }));
  act(() => {
    vi.runAllTimers();
  });
  expect(screen.getByRole('heading', { name: 'Rows' })).toHaveFocus();
});

test('onCloseAutoFocus stops the default focus move', () => {
  let captured!: ReturnType<typeof useReturnFocus>;
  function Capture() {
    captured = useReturnFocus({ current: null });
    return null;
  }
  render(<Capture />);
  const event = new Event('focus', { cancelable: true });
  act(() => captured.onCloseAutoFocus(event));
  expect(event.defaultPrevented).toBe(true);
});
