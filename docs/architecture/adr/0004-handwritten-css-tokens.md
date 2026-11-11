# ADR-0004: Hand-written global CSS with custom properties

- **Status:** Accepted with tradeoffs
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

Atria needs a distinctive editorial visual language: a warm neutral palette, Manrope and DM Mono
typography, precise borders, generous spacing, subtle motion, and responsive layouts. The current
surface is small. The team wants the design system itself to be readable as CSS.

## Decision

Use one global stylesheet at `src/index.css` with:

- CSS custom properties for the core palette, text, border, and mono font;
- literal colour values for additional tones;
- CSS Grid and Flexbox for layout;
- `clamp()` for fluid headings;
- media queries for responsiveness;
- a `prefers-reduced-motion` query;
- class names grouped by product area.

Do not introduce Tailwind, CSS Modules, CSS-in-JS, Sass, or a PostCSS pipeline at this stage.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Tailwind CSS | Adds tooling and utility noise; the visual language is bespoke and easier to read as authored CSS |
| CSS Modules | Would scope styles but fragment a small, shared visual system |
| CSS-in-JS | Adds runtime or build complexity without a current need |
| Sass | Current CSS does not require variables beyond custom properties or nesting |
| Component library | Would conflict with Atria's goal of being a design system studio |

## Consequences

### Positive

- No styling dependency or build plugin.
- The visual system is inspectable in one file.
- CSS custom properties make core tokens easy to change.
- Global classes allow consistent reuse across pages.
- Reduced-motion support is centralised.

### Negative

- The file is already about 340 lines and will grow with features.
- Global scope increases the risk of accidental collisions.
- Duplicated values exist outside custom properties.
- No automated linting or dead-CSS detection.
- Refactoring becomes riskier without visual regression tests.

### Neutral

- A future split into `tokens.css`, `base.css`, and per-area files is possible without changing the
  product architecture.

## Related documents

- [Styling and design tokens](../../engineering/styling-and-design-tokens.md)
- [Frontend architecture](../../engineering/frontend-architecture.md)
- [Accessibility](../../quality/accessibility.md)
- [System architecture](../system-architecture.md)
