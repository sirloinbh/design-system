import { expect, test } from 'vitest';

import { applyTools, FRAME_WIDTHS, frameUrl, themeClasses } from './tools';

function fakeHtml() {
  const classes = new Set<string>(['stale', 'light']);
  return {
    classes,
    classList: {
      add: (...n: string[]) => n.forEach((x) => classes.add(x)),
      remove: (...n: string[]) => n.forEach((x) => classes.delete(x)),
    },
    dataset: {} as Record<string, string | undefined>,
  };
}

test('the theme classes match the apps theme script', () => {
  expect(themeClasses('system')).toEqual([]);
  expect(themeClasses('light')).toEqual(['light']);
  expect(themeClasses('dark')).toEqual(['dark']);
  expect(themeClasses('dark-only')).toEqual(['dark']);
});

test('applying the tools replaces the old theme class and sets the data attributes', () => {
  const html = fakeHtml();
  applyTools(html, 'dark-only', 'coarse');
  expect([...html.classes].sort()).toEqual(['dark', 'stale']);
  expect(html.dataset).toEqual({ theme: 'dark-only', pointer: 'coarse' });
});

test('the width frames are 360, 768 and 1280', () => {
  expect(FRAME_WIDTHS).toEqual([360, 768, 1280]);
});

test('a frame URL keeps the story and the globals and turns frames off', () => {
  const url = frameUrl('components-sample--default', 'dark', 'coarse');
  expect(url).toContain('id=components-sample--default');
  expect(decodeURIComponent(url)).toContain('globals=theme:dark;pointer:coarse;frames:off');
});
