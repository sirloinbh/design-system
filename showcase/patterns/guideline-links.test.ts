import { expect, test } from 'vitest';

import { GUIDELINE_DOCS } from '../guidelines/docs';
import { guidelineHref } from './guideline-links';

test('every guideline link points to an existing guideline page', () => {
  for (const id of ['design-guidelines', 'layout', 'ui-components', 'review-checklist'] as const) {
    const href = guidelineHref(id);
    expect(href).toMatch(/^\?path=\/docs\/guidelines-/);
    expect(GUIDELINE_DOCS.some((d) => href.includes(`guidelines-${d.id}--docs`))).toBe(true);
  }
});
