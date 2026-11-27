// The guideline pages a pattern can name (their story ids come from stories/Guidelines).
export const GUIDELINES = {
  'design-guidelines': { label: 'Design guidelines', path: 'guidelines-design-guidelines--page' },
  layout: { label: 'Layout', path: 'guidelines-layout--page' },
  'ui-components': { label: 'UI components', path: 'guidelines-ui-components--page' },
  'review-checklist': { label: 'Review checklist', path: 'guidelines-review-checklist--page' },
} as const;

export type GuidelineId = keyof typeof GUIDELINES;

export function guidelineHref(id: GuidelineId): string {
  return `?path=/story/${GUIDELINES[id].path}`;
}
