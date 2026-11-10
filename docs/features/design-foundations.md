# Design Foundations

**Status:** Placeholder — implementation brief only
**Route:** `/explore/foundations`
**Source:** `src/pages/Foundations.jsx`

> This page documents a contributor-facing brief. It does **not** describe a working foundations
> editor. No values can be created, edited, saved, previewed, or exported today.

---

## 1. What the brief asks for

The Foundations page is the intended source of truth for the visual rules behind a design system.
Contributors are asked to build the foundations before using them in tokens and components.

The brief states:

> Developers should be able to add, edit, preview, and organise foundation values. Keep the interface
> visual and make every value understandable without needing to inspect the source code.

### Required characteristics

- Add, edit, preview, and organise foundation values.
- Keep the interface visual.
- Make every value understandable without reading source code.
- Build foundations before tokens and components use them.

---

## 2. Task areas

### 01 — Colour system

**Description:** Create and organise palettes, including neutral, brand, and feedback colours.

**Implementation checklist from the brief:**

- Define colour values and meaningful names.
- Add light and dark theme previews.
- Show accessible foreground and background pairings.

**Expected result:** A reusable colour foundation with clear usage guidance.

### 02 — Typography

**Description:** Build a type scale that documents how text should appear across products.

**Implementation checklist:**

- Set font families, weights, sizes, and line heights.
- Preview headings, body text, labels, and captions.
- Document intended usage for each text style.

**Expected result:** A consistent, previewable typography scale.

### 03 — Spacing and layout

**Description:** Define the spatial rules that keep layouts predictable and consistent.

**Implementation checklist:**

- Create spacing and sizing scales.
- Document grid, container, and breakpoint conventions.
- Include radius and elevation only where the system needs them.

**Expected result:** A documented set of layout and spacing foundations.

---

## 3. Developer notes from the brief

1. Start with a clear data structure for each foundation type; avoid hard-coding values into the UI.
2. Build reusable preview and editing patterns so new foundation types can be added without duplicating
   the page.
3. Plan for validation, empty states, responsive layouts, and accessible colour contrast.
4. Connect saved foundations to the token workflow when persistence is introduced.

These notes are guidance. None of the described behaviour is implemented.

---

## 4. Current implementation

What exists:

- a static page at `/explore/foundations`;
- the implementation-brief layout;
- a `tasks` array containing the three areas above;
- developer notes rendered as an ordered list;
- the Explore sidebar with an active state.

What does not exist:

- colour, typography, or spacing data models;
- forms or inline editing;
- preview components for foundations;
- theme switching;
- contrast checking;
- saving or loading;
- connection to tokens;
- export;
- tests.

---

## 5. Suggested implementation direction

This section is a proposal for contributors. It is not an agreed specification and must be validated
before implementation.

### Data model sketch

```ts
type FoundationCategory = 'colour' | 'typography' | 'spacing' | 'layout'

interface FoundationValue {
  id: string
  category: FoundationCategory
  name: string
  value: string | number
  description?: string
  metadata?: Record<string, unknown>
}
```

Possible category-specific structures:

- **Colour:** hex value, RGB/HSL value, role (neutral, brand, feedback), light/dark pairing.
- **Typography:** family, weight, size, line height, letter spacing, text style role.
- **Spacing:** scale step, numeric value, unit, usage.
- **Layout:** grid columns, gutter, container width, breakpoints, radius, elevation.

### UI direction

- A category switcher for colour, typography, spacing, and layout.
- A list or table of values with add, edit, and delete actions.
- A live preview beside the editor.
- Empty states for each category.
- Validation messages that explain the problem in plain language.

### Quality requirements

- Keyboard reachable controls.
- Focus-visible states.
- Accessible names for icon-only actions.
- Contrast checks for colour pairings.
- Responsive editing layout.
- No hard-coded presentation values inside the editor.

---

## 6. Acceptance criteria for implementation

A contributor implementing this brief should be able to demonstrate:

- [ ] Adding a colour, type style, and spacing value.
- [ ] Editing and deleting each value.
- [ ] Meaningful names and descriptions.
- [ ] Live preview that updates with edits.
- [ ] Light/dark preview for colour where applicable.
- [ ] Accessible contrast feedback or documented limitation.
- [ ] Empty states and validation errors.
- [ ] Responsive behaviour.
- [ ] Persistence or an explicitly scoped in-memory demo.
- [ ] Tests for the data model and critical interactions.
- [ ] Updated documentation that no longer calls the page a placeholder.

---

## 7. Related documents

- [Explore Studio](explore-studio.md)
- [Design tokens](design-tokens.md)
- [Landing page](landing-page.md)
- [Data flow](../architecture/data-flow.md)
- [ADR-0005: Implementation briefs](../architecture/adr/0005-placeholder-implementation-briefs.md)
- [ADR-0006: Static content and no persistence](../architecture/adr/0006-static-content-no-persistence.md)
