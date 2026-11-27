import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentProps, useState } from 'react';

import { ScoreField } from '../../src/components/score-field/score-field';

function Controlled(args: ComponentProps<typeof ScoreField>) {
  const [value, setValue] = useState<number | null>(args.value);
  return <ScoreField {...args} value={value} onChange={setValue} />;
}

const meta = {
  title: 'Components/ScoreField',
  component: ScoreField,
  args: { label: 'Mood', value: 3, onChange: () => {}, lowLabel: 'Poor', highLabel: 'Great' },
  render: (args) => <Controlled {...args} />,
} satisfies Meta<typeof ScoreField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HalfSteps: Story = { args: { min: 0.5, max: 5, step: 0.5, value: null } };

export const NoRating: Story = { args: { value: null } };
