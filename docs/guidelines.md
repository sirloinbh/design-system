# Design guidelines

The single list of rules every shared component and every app screen follows (#1172). Details and values live in the linked pages; this page says what the rule is and **what enforces it**. The exact size, spacing, radius, text and state values of every element are in the [UI element spec](ui-spec.md).

The "Check" column names the test or check that fails when the rule is broken. **Review** means no automatic check exists yet: the reviewer uses the [review checklist](review-checklist.md), and the gap is a candidate for a new test.

## Rules

| Area                 | Rule                                                                                                                                                                                              | Check                                                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Language             | Screen text, labels, `aria-*` text, test names and stories are English. Korean appears only as sample user data, marked `korean-ok` ([screen text](screen-text-check.md))                         | App check group `screen text` (`standards:check`); the UI kit Korean test (`ui-kit-english`, moves here with the kit) |
| Type scale           | Use the type scale tokens (`text-body`, `text-body-sm`, `text-caption`, `text-meta`, `h1` to `h4`), never raw sizes. One `h1` per page                                                            | Review                                                                                                                |
| Text floor           | Visible text is at least 12px                                                                                                                                                                     | App check group `text size` (`checkMinFontSize`)                                                                      |
| Colors               | Colors, spacing, radius and shadows come from `@sirloinbh/design-tokens` by token name. No color codes, no token overrides                                                                        | Review; the tokens build test fails on a malformed token source                                                       |
| Light and dark       | Both modes work, with no per-mode colors. Dark-only apps always render dark                                                                                                                       | Component tests where the look differs; otherwise Review                                                              |
| Contrast             | Text meets WCAG AA (4.5:1). Muted text on a muted background does not                                                                                                                             | Browser accessibility checks in the showcase (#1186); otherwise Review                                                |
| Touch targets        | 40px tall controls on a pointer screen, 48px on touch (`pointer-coarse`); every other control keeps a 44px press area on touch                                                                    | Component tests (button, input, select, checkbox, switch, segmented control, dialog parts)                            |
| Cursor               | Controls that act on click show the pointer cursor; disabled ones show `cursor-not-allowed`                                                                                                       | Component tests                                                                                                       |
| Focus                | The focus ring is never removed. Menus, modals and drawers work with the keyboard alone                                                                                                           | Keyboard tests per component; the `jsx-a11y` lint rules                                                               |
| Pick instead of type | Known values use a choice control, not free text ([table](ui-components.md#pick-a-value-instead-of-typing-it))                                                                                    | `std-ux-audit` skill row in the apps; Review                                                                          |
| Loading              | First load uses a Skeleton of the real shape; a save uses a `Spinner` in the button; no full-screen blocker; work under 300ms shows nothing ([loading screens](ui-components.md#loading-screens)) | Review; `std-ux-audit`                                                                                                |
| Empty and error      | A list with no rows shows `EmptyState` with a next action. A failed load shows the reason (`Notice` or `AlertBanner`) with a retry when one exists                                                | Review                                                                                                                |
| Icons and emoji      | `lucide-react` icons only, with `aria-label` when meaningful. Emoji are Fluent Emoji Flat SVGs as `<img>`                                                                                         | Review ([ADR-0001](adr/0001-shadcn-ui-icons-emoji.md))                                                                |
| Responsive           | Mobile first from 360px; the LNB becomes a sidebar at 768px; no horizontal overflow                                                                                                               | Browser tests at 360, 768 and 1280 (#1186); otherwise Review                                                          |
| Screen text          | No explanatory, example or motivational text on a screen ([screen text rule](#screen-text-rule))                                                                                                  | Review                                                                                                                |
| Menu order           | Day log, the app's pages, Dashboard (week and 12-week views inside it), Settings last ([layout](layout.md#menu-order-every-app))                                                                  | Review                                                                                                                |
| Accessibility        | Every component has a name, keyboard operation, visible focus and a state announced to screen readers                                                                                             | A Testing Library test per component (see the component rules below)                                                  |
| Dependencies         | No new package without the dependency review. Exact versions, no install scripts                                                                                                                  | `ioc:check` and the lockfile; project-standards `dependency-policy.md`                                                |

## Screen text rule

A screen carries no text whose only job is to explain, give an example or encourage (user requirement, 2026-11-28, #59). Three kinds are removed:

| Kind         | What it is                                                                      | Example to remove                                 |
| ------------ | ------------------------------------------------------------------------------- | ------------------------------------------------- |
| Explanatory  | Intro paragraphs, `PageHeader` and card descriptions, helper lines under fields | `description="What you did on the selected day."` |
| Example      | `e.g. ...` lines and example placeholders                                       | `placeholder="e.g. Bench press"`                  |
| Motivational | Taglines, encouragement, quotes                                                 | `Great job, keep your streak going!`              |

What stays:

- Field labels and button text.
- Error and validation messages.
- Empty-state titles.
- Status text (saved, loading, counts, dates).
- Screen-reader-only text (`sr-only`, `aria-label`, the hidden description a dialog needs for its accessible name).
- Legal pages.

## Component API conventions

These apply to every component in `src/components/ui/` and to new components (#1175, #1176 and the component cards).

- **Names.** A component is a PascalCase noun in a kebab-case file (`date-field.tsx` exports `DateField`). Its test is `date-field.test.tsx` beside it. Helpers that are not components go in a `.ts` file with the same stem (`date-fields.ts`).
- **Props.** Extend the native element props (`React.ComponentProps<'button'>`) and spread the rest onto the root element, so `id`, `data-*`, `aria-*` and event handlers pass through. Name booleans without `is` (`disabled`, `required`, `open`), handlers `onX` (`onChange`, `onOpenChange`), and render slots by role (`action`, `icon`, `trigger`).
- **`variant`.** One visual choice among a closed list, as a string union built with `class-variance-authority`. Shared names: `default`, `secondary`, `outline`, `ghost`, `destructive`, `link`; status looks use `success`, `warning`, `destructive`. Do not invent a synonym for an existing one.
- **`size`.** `default`, `sm`, `lg`, and `icon` for square icon buttons; no size goes below the touch rule on touch screens. Spinner uses `sm`, `md`, `lg` (16, 24, 32px).
- **`className`.** Every component accepts `className` and merges it last with `cn(...)`, so a caller can add layout classes. Callers do not override colors or sizes that a `variant` or `size` already covers.
- **Controlled and uncontrolled.** An input-like component supports both: `value` with `onChange` (controlled), or `defaultValue` (uncontrolled), and never switches between them. The value is a plain string or number the form can validate; it may be empty or partly typed, and the form and the server still validate it.
- **`ref`.** Forward a ref to the root element that holds focus. A component that lets the page focus a heading takes `headingRef`.
- **Accessibility (`aria-*`).**
  - Every control has an accessible name: visible text, `aria-label`, or `aria-labelledby`. An icon-only button has `aria-label`; a decorative icon has `aria-hidden`.
  - An invalid field sets `aria-invalid` and links its message with `aria-describedby` (`invalidProps`).
  - A loading area sets `aria-busy` and a name. A status message uses `role="status"`, a failure `role="alert"`; the live region stays in the page and is empty until there is a message.
  - A popup trigger sets `aria-expanded` and `aria-haspopup` (the Radix parts do it).
- **Tokens only.** No color codes or raw pixel type sizes in a component. Use token utilities.
- **English only.** Defaults such as "Delete", "Cancel" and "Loading" are English; a caller can override them with a prop.
- **Test.** Each component has a Vitest and Testing Library test that covers its name, keyboard use, and any state change (`aria-invalid`, `aria-busy`, disabled).

## Where each rule comes from

User requirements of 2026-11-26 (#1123): English screens (#1129), larger controls (#1125), pointer cursor (#1126), menu order (#1128), pick instead of type (#1130), the 12px floor and the 16px touch date field (#1135, #1151). Earlier decisions are in [ADR-0001](adr/0001-shadcn-ui-icons-emoji.md) to [ADR-0004](adr/0004-shared-ui-stays-on-sync.md).
