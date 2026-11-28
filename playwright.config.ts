import { defineConfig } from '@playwright/test';

const port = 6007;
// Screenshot comparison runs only in the pinned Playwright container (SHOWCASE_VISUAL=1), with its bundled
// Chromium; elsewhere the installed Chrome is used for the accessibility and text checks only.
const visual = !!process.env.SHOWCASE_VISUAL;

export default defineConfig({
  testDir: 'showcase/tests',
  testMatch: '**/*.pw.ts',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 1,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  // One baseline set made in Linux, so no platform suffix in the file name.
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  // CI never writes baselines; a missing or changed one fails.
  updateSnapshots: process.env.CI ? 'none' : 'missing',
  expect: { toHaveScreenshot: { animations: 'disabled', caret: 'hide', scale: 'css' } },
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    channel: visual ? undefined : 'chrome',
    timezoneId: 'UTC',
    locale: 'en-US',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: `node showcase/tests/serve-static.mjs .local/storybook-static ${port}`,
    url: `http://127.0.0.1:${port}/index.json`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
