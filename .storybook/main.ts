import type { StorybookConfig } from '@storybook/react-vite';

// The story hierarchy follows the showcase menu: Foundations, Components, Layout, Patterns, Guidelines.
const config: StorybookConfig = {
  framework: '@storybook/react-vite',
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  core: { disableTelemetry: true },
};

export default config;
