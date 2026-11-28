import type { Meta, StoryObj } from '@storybook/react-vite';

import { ConfirmDelete } from '../../src/components/confirm-delete/confirm-delete';

const meta = {
  title: 'Components/ConfirmDelete',
  component: ConfirmDelete<{ name: string }>,
  args: {
    item: { name: 'Bench press' },
    label: (item) => item.name,
    onConfirm: () => {},
    onClose: () => {},
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ConfirmDelete<{ name: string }>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const CustomTexts: Story = {
  args: { description: 'The sets in this workout are deleted too.', confirmLabel: 'Remove' },
};
