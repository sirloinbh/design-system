import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from '../../src/components/progress-bar/progress-bar';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  args: { label: 'Storage used', value: 40 },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Percentage: Story = {};

export const WithValueText: Story = { args: { max: 100, valueText: '40 of 100 GB' } };

export const Full: Story = { args: { value: 100 } };

export const Indeterminate: Story = { args: { label: 'Loading', value: undefined } };

export const LabelHidden: Story = { args: { hideLabel: true } };
