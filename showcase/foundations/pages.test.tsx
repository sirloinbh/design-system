import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';

import tokens from '../../tokens/tokens.json';
import {
  ColorsPage,
  IconsPage,
  MotionPage,
  ShapesPage,
  SpacingPage,
  TypographyPage,
} from './pages';

const html = renderToStaticMarkup(
  <>
    <ColorsPage />
    <TypographyPage />
    <SpacingPage />
    <ShapesPage />
    <IconsPage />
    <MotionPage />
  </>,
);

function expectAll(label: string, names: string[]) {
  const missing = names.filter((n) => !html.includes(n));
  expect(missing, `${label} missing from the foundation pages`).toEqual([]);
}

test('every color token appears in light and dark', () => {
  expectAll(
    'light colors',
    tokens.color.light.map((c) => c.value),
  );
  expectAll(
    'dark colors',
    tokens.color.dark.map((c) => c.value),
  );
  expectAll(
    'color names',
    [...tokens.color.light, ...tokens.color.dark].map((c) => `>${c.name}<`),
  );
});

test('every typography, spacing, shape and motion token appears', () => {
  expectAll(
    'font sizes',
    tokens.fontSize.map((s) => `>text-${s.name}<`),
  );
  expectAll(
    'font weights',
    tokens.fontWeight.map((w) => `>font-${w.name}<`),
  );
  expectAll(
    'text styles',
    tokens.textStyles.map((s) => `>${s.name}<`),
  );
  expectAll(
    'layout',
    tokens.spacing.layout.map((l) => `>${l.name}<`),
  );
  expectAll(
    'breakpoints',
    tokens.breakpoints.map((b) => `>${b.name}<`),
  );
  expectAll(
    'radius',
    tokens.radius.map((r) => `>rounded-${r.name}<`),
  );
  expectAll(
    'shadows',
    tokens.shadow.map((s) => `>shadow-${s.name}<`),
  );
  expectAll(
    'icons',
    tokens.icon.map((i) => `>icon-${i.name}<`),
  );
  expectAll(
    'z-index',
    tokens.zIndex.map((z) => `>z-${z.name}<`),
  );
  expectAll(
    'motion',
    ['duration-fast', 'duration-normal', 'duration-slow', 'ease-standard'].map((n) => `>${n}<`),
  );
});

test('text colors show a contrast ratio', () => {
  expect(html).toMatch(/\d+\.\d\d:1 AA/);
});
