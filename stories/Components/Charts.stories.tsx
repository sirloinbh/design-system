import type { Meta, StoryObj } from '@storybook/react-vite';

import { BarChart, ChartBoundary, LineChart } from '../../src/components/chart/chart';

const week = [
  { label: 'Mon', value: 30 },
  { label: 'Tue', value: 45 },
  { label: 'Wed', value: 0 },
  { label: 'Thu', value: 60 },
  { label: 'Fri', value: 25 },
  { label: 'Sat', value: 90 },
  { label: 'Sun', value: 40 },
];

const meta = {
  title: 'Components/Charts',
  component: BarChart,
  args: { title: 'Minutes per day', valueLabel: 'Minutes', data: week },
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Bars: Story = {};

export const Line: Story = { render: (args) => <LineChart {...args} title="Weight (kg)" /> };

export const Empty: Story = { args: { data: [] } };

function Broken(): never {
  throw new Error('The chart module failed to load');
}

export const Failed: Story = {
  render: (args) => (
    <ChartBoundary title={args.title} data={args.data} valueLabel={args.valueLabel}>
      <Broken />
    </ChartBoundary>
  ),
};
