import type { Meta, StoryObj } from '@storybook/react-vite';

import { ExternalLink } from '../../src/components/external-link/external-link';

const meta = {
  title: 'Components/ExternalLink',
  component: ExternalLink,
  args: { href: 'https://example.com', children: 'Example site' },
} satisfies Meta<typeof ExternalLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UnsafeAddressIsText: Story = {
  args: { href: 'javascript:void(0)', children: 'Not a link' },
};
