import type { Meta, StoryObj } from '@storybook/react-vite';

import { FileField } from '../../src/components/file-field/file-field';

const meta = {
  title: 'Components/FileField',
  component: FileField,
  args: { onFiles: () => {} },
} satisfies Meta<typeof FileField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomLabel: Story = { args: { children: 'Import a backup', accept: '.json' } };

export const Disabled: Story = { args: { disabled: true } };
