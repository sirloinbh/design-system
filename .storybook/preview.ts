import '../showcase/theme.css';

import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    options: {
      storySort: { order: ['Foundations', 'Components', 'Layout', 'Patterns', 'Guidelines'] },
    },
  },
};

export default preview;
