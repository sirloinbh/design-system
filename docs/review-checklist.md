# Design-system pull request checklist

Use it when you review a pull request in this repository, and tick it in the PR body when you open one. It adds to the project-standards `std-code-review` order (design, behavior, tests, security). The rules are in [guidelines.md](guidelines.md).

## Component or token change

- [ ] English only: text, `aria-*` text, test names, stories (no Hangul outside a marked sample).
- [ ] Screen text rule: no explanatory, example or motivational text; no description props or `e.g.` lines in components and stories ([rule](guidelines.md#screen-text-rule)).
- [ ] Matches the [UI element spec](ui-spec.md): a new or changed component has its section there (the coverage test fails otherwise) and its values follow the spec.
- [ ] Tokens only: no color codes, no raw type sizes, no token override. Light and dark both look right.
- [ ] Text is at least 12px; controls are 40px (48px on touch) and keep a 44px press area on touch.
- [ ] Clickable controls show the pointer cursor; disabled ones show `cursor-not-allowed`; the focus ring stays.
- [ ] Props follow the [API conventions](guidelines.md#component-api-conventions): `variant` and `size` names, `className` passthrough, rest props spread, ref forwarded.
- [ ] Controlled and uncontrolled both work for an input-like component.
- [ ] Accessible name, keyboard operation, announced state; a Testing Library test covers it.
- [ ] A choice control is used where the values are known (pick instead of type).
- [ ] Loading, empty and error states exist where the component fetches or lists.

## Delivery to the apps

- [ ] The API did not change, or the change is listed in the release notes as breaking (major bump, see ADR-0031).
- [ ] No file other than the UI kit sources is added to the folder apps receive; stories stay out.
- [ ] A new package follows the dependency policy, and the PR body records the review.

## PR hygiene

- [ ] `npm run check` passes; the PR body follows the template; a `docs/changes/` record is included.
- [ ] A change to a rule updates `guidelines.md` and names its check.
