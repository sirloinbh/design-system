import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { DescriptionItem, DescriptionList } from './description-list';

test('each pair is a term with its definition inside one list', () => {
  const { container } = render(
    <DescriptionList aria-label="Body">
      <DescriptionItem label="Weight">72.5 kg</DescriptionItem>
      <DescriptionItem label="Waist">80 cm</DescriptionItem>
    </DescriptionList>,
  );
  expect(container.querySelector('dl')).toBe(screen.getByLabelText('Body'));
  expect(screen.getAllByRole('term').map((term) => term.textContent)).toEqual(['Weight', 'Waist']);
  expect(screen.getAllByRole('definition').map((value) => value.textContent)).toEqual([
    '72.5 kg',
    '80 cm',
  ]);
  // Every dt sits in a div that is a direct child of the dl, the markup HTML allows.
  for (const term of screen.getAllByRole('term')) {
    expect(term.parentElement?.parentElement).toBe(container.querySelector('dl'));
  }
});

test('the label is muted and a phone gets one column', () => {
  render(
    <DescriptionList aria-label="Totals" columns={3}>
      <DescriptionItem label="Income">1,000</DescriptionItem>
    </DescriptionList>,
  );
  expect(screen.getByRole('term')).toHaveClass('text-muted-foreground');
  const list = screen.getByLabelText('Totals');
  expect(list).toHaveClass('grid-cols-1', 'sm:grid-cols-3');
});

test('the default is two columns and every class name and prop passes through', () => {
  render(
    <DescriptionList aria-label="Default" className="extra" data-testid="list">
      <DescriptionItem label="A" className="item" data-testid="item">
        x
      </DescriptionItem>
    </DescriptionList>,
  );
  expect(screen.getByTestId('list')).toHaveClass('extra', 'sm:grid-cols-2');
  expect(screen.getByTestId('item')).toHaveClass('item');
});
