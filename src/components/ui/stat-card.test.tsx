import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import { StatCard } from './stat-card';

test('it shows the label, the value with its unit, and the note', () => {
  render(
    <StatCard
      label="Total volume"
      value="1,500"
      unit="kg"
      icon={<svg aria-hidden="true" />}
      foot="Total weight × reps"
    />,
  );

  expect(screen.getByText('Total volume')).toBeInTheDocument();
  expect(screen.getByText('kg').parentElement).toHaveTextContent('1,500kg');
  expect(screen.getByText('Total weight × reps')).toBeInTheDocument();
});

test('the value uses the text-stat token and the card accepts a className', () => {
  const { container } = render(<StatCard label="Sets" value="12" unit="sets" icon={<svg aria-hidden="true" />} foot="This week" className="w-60" />);
  expect(container.querySelector('[data-slot="stat-value"]')).toHaveClass('text-stat');
  expect(container.querySelector('[data-slot="stat"]')).toHaveClass('w-60');
});
