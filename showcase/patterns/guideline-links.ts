// The guideline pages a pattern can name (their story ids come from stories/Guidelines).
export const GUIDELINES = {
  'design-guidelines': { label: 'Design guidelines', path: 'guidelines-design-guidelines--docs' },
  layout: { label: 'Layout', path: 'guidelines-layout--docs' },
  'ui-components': { label: 'UI components', path: 'guidelines-ui-components--docs' },
  'review-checklist': { label: 'Review checklist', path: 'guidelines-review-checklist--docs' },
} as const;

export type GuidelineId = keyof typeof GUIDELINES;

export function guidelineHref(id: GuidelineId): string {
  return `?path=/docs/${GUIDELINES[id].path}`;
}
