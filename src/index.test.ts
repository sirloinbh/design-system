import { expect, test } from 'vitest';

import { designSystem } from './index';

test('the entry exports the design system name', () => {
  expect(designSystem.name).toBe('design-system');
});
