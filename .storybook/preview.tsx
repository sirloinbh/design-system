import '../showcase/theme.css';

import type { Decorator, Preview } from '@storybook/react-vite';

import {
  applyTools,
  FRAME_WIDTHS,
  type FramesTool,
  frameUrl,
  type PointerTool,
  type ThemeTool,
} from '../showcase/tools';

const withTools: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'system') as ThemeTool;
  const pointer = (context.globals.pointer ?? 'fine') as PointerTool;
  const frames = (context.globals.frames ?? 'off') as FramesTool;
  applyTools(document.documentElement, theme, pointer);

  if (frames === 'on' && context.viewMode === 'story') {
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', overflowX: 'auto' }}>
        {FRAME_WIDTHS.map((width) => (
          <figure key={width} style={{ margin: 0, flex: 'none' }}>
            <figcaption style={{ fontSize: 12, marginBottom: 4 }}>{width}px</figcaption>
            <iframe
              title={`${width}px frame`}
              src={frameUrl(context.id, theme, pointer)}
              style={{ width, height: 640, border: '1px solid var(--border)' }}
            />
          </figure>
        ))}
      </div>
    );
  }
  return <Story />;
};

const preview: Preview = {
  decorators: [withTools],
  globalTypes: {
    theme: {
      description: 'Color theme. Dark-only previews an app with features.darkOnly.',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'system', title: 'System' },
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'dark-only', title: 'Dark-only app' },
        ],
      },
    },
    pointer: {
      description: 'Pointer mode. Touch sets data-pointer="coarse" on the page for touch sizes.',
      toolbar: {
        title: 'Pointer',
        icon: 'mobile',
        dynamicTitle: true,
        items: [
          { value: 'fine', title: 'Pointer (mouse)' },
          { value: 'coarse', title: 'Touch (coarse)' },
        ],
      },
    },
    frames: {
      description: 'Show the story at 360, 768 and 1280px side by side.',
      toolbar: {
        title: 'Widths',
        icon: 'grid',
        dynamicTitle: true,
        items: [
          { value: 'off', title: 'Single view' },
          { value: 'on', title: '360 / 768 / 1280 side by side' },
        ],
      },
    },
  },
  initialGlobals: { theme: 'system', pointer: 'fine', frames: 'off' },
  parameters: {
    layout: 'centered',
    viewport: {
      options: {
        phone: { name: 'Phone 360', styles: { width: '360px', height: '740px' } },
        tablet: { name: 'Tablet 768', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop 1280', styles: { width: '1280px', height: '800px' } },
      },
    },
    options: {
      storySort: { order: ['Foundations', 'Components', 'Layout', 'Patterns', 'Guidelines'] },
    },
  },
};

export default preview;
