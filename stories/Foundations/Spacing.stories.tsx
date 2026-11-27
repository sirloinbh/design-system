import type { Meta, StoryObj } from '@storybook/react-vite';

import { SpacingPage } from '../../showcase/foundations/pages';

const meta = {
  title: 'Foundations/Spacing and layout',
  component: SpacingPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SpacingPage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
