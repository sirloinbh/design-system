import type { Meta, StoryObj } from '@storybook/react-vite';

import { IconsPage } from '../../showcase/foundations/pages';

const meta = {
  title: 'Foundations/Icons and emoji',
  component: IconsPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof IconsPage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
