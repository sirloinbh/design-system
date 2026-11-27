import type { Meta, StoryObj } from '@storybook/react-vite';

import { ToggleChips } from '../../src/components/toggle-chips/toggle-chips';

const options = [
  { value: 'mon', label: 'Mon' },
  { value: 'tue', label: 'Tue' },
  { value: 'wed', label: 'Wed' },
  { value: 'thu', label: 'Thu', disabled: true },
];

const meta = {
  title: 'Components/ToggleChips',
  component: ToggleChips,
  args: { 'aria-label': 'Days', options },
} satisfies Meta<typeof ToggleChips>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Single: Story = { args: { defaultValue: 'tue' } };

export const Multiple: Story = { args: { type: 'multiple', defaultValue: ['mon', 'wed'] } };
