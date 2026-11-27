// Pure helpers behind the showcase toolbar (theme, pointer, width frames). The Storybook decorator
// in .storybook/preview.tsx applies them; keeping them here makes them testable without a browser.

export type ThemeTool = 'system' | 'light' | 'dark' | 'dark-only';
export type PointerTool = 'fine' | 'coarse';
export type FramesTool = 'off' | 'on';

export const FRAME_WIDTHS = [360, 768, 1280] as const;

// The same rules as theme-init.js and applyTheme in the apps: "system" leaves <html> without a class so the
// tokens follow prefers-color-scheme; "dark-only" previews an app with features.darkOnly, which is always dark.
export function themeClasses(theme: ThemeTool): readonly string[] {
  if (theme === 'light') return ['light'];
  if (theme === 'dark' || theme === 'dark-only') return ['dark'];
  return [];
}

type ElementLike = {
  classList: { add(...names: string[]): void; remove(...names: string[]): void };
  dataset: Record<string, string | undefined>;
};

export function applyTools(html: ElementLike, theme: ThemeTool, pointer: PointerTool) {
  html.classList.remove('light', 'dark');
  html.classList.add(...themeClasses(theme));
  html.dataset.theme = theme;
  html.dataset.pointer = pointer;
}

// The URL of one story rendered inside a width frame. The frame carries the same toolbar globals,
// with frames switched off so it does not nest.
export function frameUrl(storyId: string, theme: ThemeTool, pointer: PointerTool): string {
  const globals = `theme:${theme};pointer:${pointer};frames:off`;
  return `iframe.html?id=${encodeURIComponent(storyId)}&viewMode=story&globals=${encodeURIComponent(globals)}`;
}
