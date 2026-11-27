import type { Meta, StoryObj } from '@storybook/react-vite';

import { ShapesPage } from '../../showcase/foundations/pages';

const meta = {
  title: 'Foundations/Radius, borders and shadows',
  component: ShapesPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ShapesPage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
