import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { EmptyIcon } from '../../lib/icons';
import { Button } from './button';
import { EmptyState } from './empty-state';

test('an empty state names the situation and offers the next step', () => {
  render(
    <EmptyState
      icon={<EmptyIcon />}
      title="No entries yet"
      description="Record your first workout."
      action={<Button>Add entry</Button>}
    />,
  );
  expect(screen.getByRole('heading', { level: 2, name: 'No entries yet' })).toBeInTheDocument();
  expect(screen.getByText('Record your first workout.')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Add entry' })).toBeInTheDocument();
});

test('the heading level can follow the page, and the icon is decorative', () => {
  const { container } = render(<EmptyState title="No results" headingLevel="h3" icon={<EmptyIcon />} />);
  expect(screen.getByRole('heading', { level: 3, name: 'No results' })).toBeInTheDocument();
  expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull();
});
