import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoadFailed, LoadingRegion } from '../../src/components/load-state/load-state';

const meta = {
  title: 'Components/LoadState',
  component: LoadingRegion,
  args: { label: 'Loading entries' },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoadingRegion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rows: Story = {};

export const Card: Story = { args: { shape: 'card' } };

export const Cards: Story = { args: { shape: 'cards', rows: 2 } };

export const Failed: Story = {
  render: () => (
    <LoadFailed message="Entries could not be loaded. Check your connection." onRetry={() => {}} />
  ),
};

export const Retrying: Story = {
  render: () => <LoadFailed message="Entries could not be loaded." onRetry={() => {}} pending />,
};
