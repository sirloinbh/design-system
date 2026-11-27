import type { Meta, StoryObj } from '@storybook/react-vite';

import { ColorsPage } from '../../showcase/foundations/pages';

const meta = {
  title: 'Foundations/Colors',
  component: ColorsPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ColorsPage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
