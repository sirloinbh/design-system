import type { Meta, StoryObj } from '@storybook/react-vite';

import { TypographyPage } from '../../showcase/foundations/pages';

const meta = {
  title: 'Foundations/Typography',
  component: TypographyPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof TypographyPage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
