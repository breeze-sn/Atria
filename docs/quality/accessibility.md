# Accessibility

## 1. Scope

This document records accessibility features present in the current Atria frontend, known gaps, and a
manual verification checklist.

Atria has **not** been formally audited against WCAG 2.2. Nothing in this document should be read as a
claim of conformance.

---

## 2. Present features

### Semantic structure

- `main`, `nav`, `header`, `footer`, `section`, and `aside` are used across pages.
- Headings follow a readable hierarchy in each page.
- Navigation bars have accessible labels in the Explore layout.
- The principles ticker section has an `aria-label`.

### Interactive elements

- Playground tabs are native `<button>` elements.
- Navigation uses native anchors and React Router links.
- The copy control is a native `<button>` with an `aria-label`.
- Documentation cards are anchors with descriptive `aria-label` values.

### Focus

- Documentation cards have a `:focus-visible` outline:
  ```css
  .doc-card:focus-visible {
    outline: 2px solid #77756f;
    outline-offset: 3px;
  }
  ```
- Native controls remain keyboard focusable.
- No custom keyboard traps are implemented.

### Motion

- `prefers-reduced-motion: reduce` reduces transition and animation durations to `0.01ms` and disables
  smooth scrolling.
- No autoplaying video, carousel, or looping animation is used.
- The ticker is static text, not a moving marquee.

### Images and icons

- No content images are used in the app.
- The workspace preview is built from markup and CSS.
- Phosphor icons are used decoratively and for interface affordances.

---

## 3. Known gaps and risks

| Area | Gap | Impact |
|---|---|---|
| Automated testing | No axe, Lighthouse, or similar checks | Regressions can go unnoticed |
| Contrast | No formal contrast audit | Some small muted text may fail AA |
| Text size | Many labels are 6–10px | Hard to read for low-vision users |
| Landmarks | `aria-label` is used on a plain `div` for the hero art | Some screen readers may ignore it |
| Icon semantics | Decorative icons are not consistently hidden | Possible redundant announcements |
| External links | New-tab behaviour is not announced in text | Users may be surprised |
| Skip link | None | Keyboard users must tab through navigation |
| Error messages | Clipboard failure is silent | Users do not know why copy failed |
| Error boundary | None | A render error can blank the page |
| Forms | None exist | Not applicable yet |
| Focus management | No focus management on route changes | Focus may remain on a removed element |
| Zoom | Not tested at 200% / 400% | Reflow issues may exist |
| Screen reader | Not tested with NVDA/JAWS/VoiceOver | Unknown announcement quality |

### Specific observations from the code

- `.eyebrow`, `.section-index`, `.card-meta`, `.preview-top`, `.footer-bottom`, and similar labels use
  font sizes between 6px and 10px.
- `.hero-art` has `aria-label` but no explicit role.
- The brand mark is decorative, but only the Explore layout marks it `aria-hidden="true"`.
- The landing page foundation cards are `article` elements with hover styling but no action; this is
  visually ambiguous but not a keyboard trap.
- The documentation card `aria-label` says "Open ... in Google Docs", which communicates the external
  destination well.

---

## 4. Manual accessibility checklist

Run these checks for any UI change.

### Keyboard

- [ ] Tab through the page from the top.
- [ ] Every interactive element is reachable.
- [ ] Focus order matches visual order.
- [ ] Focus indicator is visible.
- [ ] Enter/Space activates buttons and links.
- [ ] No keyboard trap.
- [ ] Escape closes any overlays (none currently).

### Structure

- [ ] One `main` per page.
- [ ] Headings are hierarchical and descriptive.
- [ ] Navigation regions are labelled.
- [ ] Lists use list semantics where appropriate.
- [ ] Decorative elements are hidden from assistive technology where practical.
- [ ] Links have descriptive text out of context.

### Visual

- [ ] Text remains readable at 200% zoom.
- [ ] Content reflows at narrow widths.
- [ ] Colour is not the only means of conveying information.
- [ ] Focus indicator contrast is sufficient.
- [ ] Muted text is legible.
- [ ] Hover states do not cause layout shift.

### Motion

- [ ] Enable reduced motion in the OS/browser.
- [ ] Confirm transitions are effectively disabled.
- [ ] Confirm no essential information depends on motion.

### Screen reader (spot check)

- [ ] Page title is meaningful.
- [ ] Landmarks are announced.
- [ ] Buttons and links have useful names.
- [ ] The copy feedback is understandable.
- [ ] External links make sense.

---

## 5. Recommended improvements

### High value, low effort

1. Add a skip-to-content link.
2. Add explicit `aria-hidden="true"` to decorative icons and marks consistently.
3. Increase the smallest label sizes where they carry meaningful information.
4. Announce copy success/failure with an `aria-live` region.
5. Add `(opens in a new tab)` to external link text or accessible names.
6. Add a visible focus style for all interactive elements, not only doc cards.

### Medium effort

1. Run an automated accessibility check in CI.
2. Audit contrast against WCAG AA.
3. Test with a screen reader.
4. Add focus management on route changes.
5. Add an error boundary with an accessible fallback.

### Larger effort

1. Establish a documented accessibility target.
2. Add automated regression tests for keyboard flows.
3. Include accessibility acceptance criteria in feature work.

These are proposals, not implemented work.

---

## 6. Related documents

- [Testing strategy](testing-strategy.md)
- [Styling and design tokens](../engineering/styling-and-design-tokens.md)
- [Landing page](../features/landing-page.md)
- [Documentation hub](../features/documentation-hub.md)
- [Error handling](../engineering/error-handling.md)
