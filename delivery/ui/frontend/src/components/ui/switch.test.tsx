import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';

import { Label } from './label';
import { Switch } from './switch';

test('a switch is named by its label and toggles', () => {
  const onCheckedChange = vi.fn();
  render(
    <>
      <Switch id="auto" onCheckedChange={onCheckedChange} />
      <Label htmlFor="auto">Auto-start when a set is done</Label>
    </>,
  );
  const control = screen.getByRole('switch', {
    name: 'Auto-start when a set is done',
  });
  expect(control).not.toBeChecked();
  fireEvent.click(control);
  expect(control).toBeChecked();
  expect(onCheckedChange).toHaveBeenCalledWith(true);
});

test('a disabled switch does not toggle', () => {
  render(<Switch aria-label="Notifications" disabled />);
  const control = screen.getByRole('switch', { name: 'Notifications' });
  fireEvent.click(control);
  expect(control).not.toBeChecked();
});

test('every screen gets a tap area of at least 44px around the 20px track (#1103)', () => {
  render(<Switch aria-label="Notifications" />);
  // The ::after area is sized from the padding box inside the 1px border:
  // height (20 - 2) + 14 × 2 = 46px, width (36 - 2) + 14 × 2 = 62px.
  expect(screen.getByRole('switch', { name: 'Notifications' })).toHaveClass('h-5', 'w-9', 'border', 'after:-inset-3.5');
});

test('a switch shows a pointer cursor (#1126)', () => {
  render(<Switch aria-label="Auto" />);
  expect(screen.getByRole('switch', { name: 'Auto' })).toHaveClass('cursor-pointer', 'disabled:cursor-not-allowed');
});

test('a switch has a data-slot, the shared focus ring and an invalid look (ui-spec)', () => {
  render(<Switch aria-label="Auto" />);
  expect(screen.getByRole('switch', { name: 'Auto' })).toHaveClass('focus-visible:ring-ring/50', 'aria-invalid:border-destructive');
  expect(screen.getByRole('switch', { name: 'Auto' })).toHaveAttribute('data-slot', 'switch');
});
