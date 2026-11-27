import { expect, test } from 'vitest';

import { contrastRatio, parseOklch, textPairs } from './contrast';

test('parses oklch with and without alpha', () => {
  expect(parseOklch('oklch(0.5 0.1 20)')).toEqual({ l: 0.5, c: 0.1, h: 20, alpha: 1 });
  expect(parseOklch('oklch(1 0 0 / 10%)')?.alpha).toBeCloseTo(0.1);
  expect(parseOklch('red')).toBeNull();
});

test('black on white is 21:1 and white on white is 1:1', () => {
  expect(contrastRatio('oklch(0 0 0)', 'oklch(1 0 0)')).toBeCloseTo(21, 0);
  expect(contrastRatio('oklch(1 0 0)', 'oklch(1 0 0)')).toBeCloseTo(1, 5);
});

test('the shared foreground on background pair passes AA in light', () => {
  expect(contrastRatio('oklch(0.145 0 0)', 'oklch(1 0 0)')).toBeGreaterThan(7);
});

test('a transparent color has no ratio', () => {
  expect(contrastRatio('oklch(1 0 0 / 10%)', 'oklch(0.145 0 0)')).toBeNull();
});

test('text pairs pair X-foreground with X and add the muted and destructive pairs', () => {
  const pairs = textPairs([
    'background',
    'foreground',
    'card',
    'card-foreground',
    'muted-foreground',
    'destructive',
  ]);
  expect(pairs).toContainEqual({ text: 'card-foreground', on: 'card' });
  expect(pairs).toContainEqual({ text: 'muted-foreground', on: 'background' });
  expect(pairs).toContainEqual({ text: 'destructive', on: 'background' });
  expect(pairs.filter((p) => p.text === 'muted-foreground')).toHaveLength(1);
});
