import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchPage } from '../../showcase/search/SearchPage';

const meta = {
  title: 'Guidelines/Search',
  component: SearchPage,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof SearchPage>;

export default meta;

export const Page: StoryObj<typeof meta> = {};
