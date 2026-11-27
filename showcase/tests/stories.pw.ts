// Browser checks over every story of the built Storybook: a screenshot per theme and width, an accessibility
// scan, the 12px text floor and the English-only rule. Run with `npm run showcase:test` (builds Storybook first).
import fs from 'node:fs';

import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

type IndexEntry = { id: string; title: string; type: 'story' | 'docs' };

const index = JSON.parse(fs.readFileSync('.local/storybook-static/index.json', 'utf8')) as {
  entries: Record<string, IndexEntry>;
};
const entries = Object.values(index.entries);
const THEMES = ['light', 'dark'] as const;
const WIDTHS = [360, 1280] as const;
const visual = !!process.env.SHOWCASE_VISUAL;

// Accessibility issues that are tracked and not fixed yet. Remove an entry when its issue is closed.
const KNOWN_AXE_ISSUES = [
  // SegmentedControl: inactive segments are below 4.5:1 in light mode.
  { rule: 'color-contrast', target: '[data-state="off"]', issue: 'sirloinbh/design-system#32' },
];

function isKnownIssue(rule: string, target: string): boolean {
  return KNOWN_AXE_ISSUES.some((k) => k.rule === rule && target.includes(k.target));
}

const HANGUL = /[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7AF]/;
const MIN_TEXT_PX = 12;

for (const entry of entries) {
  for (const theme of THEMES) {
    for (const width of WIDTHS) {
      test(`${entry.id} ${theme} ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        const globals = encodeURIComponent(`theme:${theme}`);
        await page.goto(`/iframe.html?id=${entry.id}&viewMode=${entry.type}&globals=${globals}`);
        // Storybook marks the body once the story has rendered (an open dialog leaves the story root empty).
        await page.waitForSelector('body.sb-show-main, body.sb-show-errordisplay');
        await expect(
          page.locator('body.sb-show-errordisplay'),
          'the story failed to render',
        ).toHaveCount(0);
        await page.evaluate(() => document.fonts.ready);
        // Let content that loads after the first render (for example the search index) settle.
        await page.waitForLoadState('networkidle');

        const root = '#storybook-root, #storybook-docs';

        // Accessibility: no serious or critical issues.
        // The whole page: open dialogs render in a portal outside the story root.
        const axe = await new AxeBuilder({ page }).analyze();
        const blocking = axe.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => ({
            ...v,
            nodes: v.nodes.filter((n) => !isKnownIssue(v.id, n.target.join(' '))),
          }))
          .filter((v) => v.nodes.length > 0);
        expect(
          blocking.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`),
          'serious or critical accessibility issues',
        ).toEqual([]);

        // 12px floor: no visible text smaller than 12px.
        const small = await page.evaluate(
          ({ min, selector }) => {
            const out: string[] = [];
            const container = document.querySelector(selector);
            if (!container) return out;
            const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
              const text = node.textContent?.trim();
              const el = node.parentElement;
              if (!text || !el) continue;
              const style = getComputedStyle(el);
              if (style.display === 'none' || style.visibility === 'hidden') continue;
              if (parseFloat(style.fontSize) < min)
                out.push(`${text.slice(0, 40)} (${style.fontSize})`);
            }
            return out;
          },
          { min: MIN_TEXT_PX, selector: root.split(',')[0] },
        );
        expect(small, 'text under 12px').toEqual([]);

        // English only: no Hangul in rendered text, except content marked korean-ok.
        const text = await page.locator(root).first().innerText();
        const hangul = text
          .split('\n')
          .filter((line) => HANGUL.test(line) && !line.includes('korean-ok'));
        expect(hangul, 'Hangul in the rendered page').toEqual([]);

        if (visual) {
          await expect(page).toHaveScreenshot(`${entry.id}-${theme}-${width}.png`, {
            fullPage: true,
          });
        }
      });
    }
  }
}
