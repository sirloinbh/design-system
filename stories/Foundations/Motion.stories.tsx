import type { Meta, StoryObj } from '@storybook/react-vite';

import { MotionPage } from '../../showcase/foundations/pages';

const meta = {
  title: 'Foundations/Motion, layers and loading',
  component: MotionPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof MotionPage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
