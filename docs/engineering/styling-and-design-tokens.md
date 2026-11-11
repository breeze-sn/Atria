# Styling and Design Tokens

## 1. Overview

Atria's visual system is authored in a single global stylesheet, `src/index.css`. There is no Tailwind
CSS, CSS Modules, CSS-in-JS, Sass, or PostCSS pipeline.

The system uses:

- CSS custom properties for core colours and the mono font;
- literal colour values for additional tones;
- Manrope for interface text and DM Mono for technical labels;
- CSS Grid and Flexbox for layout;
- `clamp()` for fluid type;
- media queries for responsiveness;
- a reduced-motion media query.

This document records the values and patterns currently in use. It is a reference, not a proposal to
freeze the design forever.

---

## 2. Core custom properties

Defined in `:root`:

| Property | Value | Role |
|---|---|---|
| `--paper` | `#f7f7f5` | Page background |
| `--ink` | `#20201e` | Primary text |
| `--muted` | `#85837d` | Muted text |
| `--line` | `#deddd8` | Borders and dividers |
| `--mono` | `'DM Mono', monospace` | Technical labels |

Root typography:

```css
:root {
  font-family: 'Manrope', sans-serif;
  color: #20201e;
  background: #f7f7f5;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
```

---

## 3. Colour palette in use

The stylesheet uses a warm neutral palette with a muted green accent.

### Neutrals and surfaces

| Colour | Value | Typical use |
|---|---|---|
| Paper | `#f7f7f5` | Page background |
| Off-white surface | `#f8f8f6` | Cards, doc cards |
| Light surface | `#fafaf8` | Workspace preview |
| Warm surface | `#eeede9` | Foundations section, hover surfaces |
| Warm muted surface | `#f0efeb` | Briefs, sidebar hover |
| Ticker surface | `#eae9e4` | Principles strip |
| Preview surface | `#fbfbf9` | Component preview |
| Ink | `#20201e` | Primary text, dark sections |
| Dark hover | `#44433f` | Button hover |
| Deep surface | `#242420` | Token strip, dark buttons |
| Muted ink | `#55534f` | Code examples |
| Stone | `#55534F` | Palette swatch |
| Ash | `#99958D` | Palette swatch |
| Mist | `#D5D1C8` | Palette swatch |
| Paper swatch | `#EEECE7` | Palette swatch |

### Text tones

| Colour | Value | Typical use |
|---|---|---|
| Primary | `#20201e` | Headings and active items |
| Secondary | `#77756f` | Body copy |
| Tertiary | `#85837d` | Muted variable |
| Soft | `#89867e` | Card copy |
| Faint | `#99968e`, `#9a978f`, `#aaa79f` | Labels and metadata |
| Deep label | `#6e6c66`, `#6f6d67` | Navigation and eyebrow |
| Border | `#deddd8` | Dividers |
| Soft border | `#e9e7e1`, `#e7e5df`, `#e5e3dd`, `#e1dfd9` | Card and preview borders |

### Accent

| Colour | Value | Use |
|---|---|---|
| Live green | `#8b9d79` | Live dot |
| Live green glow | `#8b9d791b` | Dot halo |
| Badge green | `#5e7051` | Stable badge text |
| Badge surface | `#f2f5ef` | Stable badge background |
| Badge border | `#d9dfd3` | Stable badge border |
| Success text | `#8f9d82` | Token footer |
| Code accent | `#a8b79a` | CSS variable name |
| Inverse text | `#f4f3ef` | Dark section text |

### Dark section

| Colour | Value |
|---|---|
| Background | `#242420` |
| Text | `#f4f3ef` |
| Muted text | `#aaa79f` |
| Border | `#4b4a44` |
| Code text | `#e7e5df` |

---

## 4. Typography

### Families

| Role | Family | Source |
|---|---|---|
| Interface and display | Manrope | Google Fonts, weights 400–800 |
| Technical labels | DM Mono | Google Fonts, weights 400 and 500 |
| Italic emphasis | Georgia | System serif |

`index.html` loads:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

### Display scale

| Element | Size | Notes |
|---|---|---|
| `h1` | `clamp(48px, 6vw, 76px)` | Letter spacing `-.075em`, line height `.99` |
| `h2` | `clamp(38px, 5vw, 57px)` | Letter spacing `-.07em`, line height `1.05` |
| Studio `h2` | `clamp(28px, 4vw, 42px)` | Studio main |
| Brief `h3` | `clamp(19px, 2.5vw, 25px)` | Brief panel |
| Hero art `h3` | `23px` | Preview heading |
| Card `h3` | `17px` | Foundation cards |
| Doc group `h3` | `17px` | Documentation collections |
| Studio task `h3` | `16px` | Brief tasks |

### Body scale

| Element | Size | Line height |
|---|---|---|
| Hero description | `14px` | `1.85` |
| Section copy | `13px` | `1.9` |
| Studio copy | `13px` | `1.8` |
| Card copy | `10px` | `1.6` |
| Doc card copy | `9px` | `1.6` |
| Technical labels | `7–10px` | Variable |

### Technical labels

`.eyebrow`, `.section-index`, `.mono`, `.hero-footnote`, `.art-topline`, `.art-caption`, `.side-label`,
`.art-date`, `.art-stats div > span`, `.palette-heading`, `.palette-values`, `.art-bottom`,
`.card-meta`, `.preview-top`, `.preview-footer`, `.component-note`, `.token-foot`, and
`.footer-bottom` share:

```css
font-family: var(--mono);
font-size: 9px;
letter-spacing: .07em;
```

Individual groups override size where needed.

---

## 5. Layout

### Container

```css
.shell {
  width: min(1160px, calc(100% - 64px));
  margin: 0 auto;
}
```

Mobile override at `≤ 600px`:

```css
.shell {
  width: min(100% - 36px, 480px);
}
```

### Grid patterns

| Layout | Columns |
|---|---|
| Hero | `.92fr 1.08fr` |
| Foundation grid | `repeat(4, 1fr)` |
| Component layout | `.8fr 1.2fr` |
| Token strip | `1fr 1fr` |
| Contact | `1fr .8fr` |
| Doc group | `.55fr 1.45fr` |
| Explore workspace | `218px minmax(0, 1fr)` |
| Studio task | `55px 1fr` |
| Doc card | `42px 1fr auto` |

### Spacing

Spacing is expressed with literal pixel values rather than a token scale. Common values:

- 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 27, 28, 30, 32, 34,
  35, 38, 40, 42, 43, 46, 47, 48, 50, 52, 55, 58, 62, 66, 68, 70, 72, 75, 76, 80, 82, 83, 90, 92, 95,
  96, 105, 110, 112, 116, 120.

A spacing token scale does not exist yet. The landing page does show a token example
`--atria-space-4: 16px;`, but it is a static demonstration value.

### Radii and shadows

| Element | Radius / shadow |
|---|---|
| Buttons, cards, nav CTA | `3px` or `4px` |
| Small swatches | `2px` |
| Badges | `20px` |
| Banner (SVG) | `22px` |
| Hero art shadow | `0 22px 60px #28251b0a` |
| Card hover shadow | `0 12px 28px #24211a0b` |
| Live dot | `50%` with `0 0 0 3px #8b9d791b` |

---

## 6. Breakpoints

| Breakpoint | Area | Changes |
|---|---|---|
| `max-width: 850px` | Landing | Hero one column; foundation grid two columns; component gap reduced |
| `max-width: 800px` | Explore | Sidebar column 180px; smaller gaps |
| `max-width: 700px` | Docs | Docs hero and group layout stack; cards resize |
| `max-width: 650px` | Explore / legacy Studio | Explore workspace stacks; sidebar static; horizontal section nav; legacy studio stacks |
| `max-width: 600px` | Landing/contact/studio briefs | Shell width, nav text hidden, hero stack, preview compression, footer wrap, brief spacing |

There is no `min-width`-based mobile-first system. The stylesheet is desktop-first with `max-width`
overrides.

---

## 7. Motion

### Transitions

| Element | Transition |
|---|---|
| `.nav-cta` | `.2s` |
| `.button-dark` | `.2s`, hover translateY(-2px) |
| `.foundation-card` | transform and box-shadow `.2s`, hover translateY(-4px) |
| `.contact-link` | color and padding `.2s` |
| `.doc-card` | border-color and background `.2s` |
| `.explore-section-link` | color, background, border-color `.2s` |

### Smooth scrolling

```css
html { scroll-behavior: smooth; }
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
    animation-duration: .01ms !important;
  }
}
```

This is a strong accessibility default. Keep it when adding motion.

### Ticker

The principles strip is static markup; it is not an animated marquee. The repeated phrases create the
visual rhythm.

---

## 8. Class naming

Atria uses a loose BEM-like naming convention:

- block: `.hero`, `.footer`, `.doc-card`;
- element: `.hero-copy`, `.footer-top`, `.doc-card-copy`;
- modifier: `.button-dark`, `.sample-badge.muted`, `.explore-section-link.active`;
- state: `.selected`, `.active`, `.copied` (state is expressed through text in the copy button).

There is no enforced naming standard or CSS linting. New classes should:

- use a clear prefix tied to the area (`explore-`, `studio-`, `doc-`, `art-`);
- avoid generic names that could collide;
- avoid inline styles except for data-driven values such as swatch backgrounds.

---

## 9. If you change the design system

1. Prefer updating `:root` custom properties for core values.
2. Search for literal duplicates before introducing new values.
3. Update all areas that use a shared class.
4. Check contrast for text and controls.
5. Check every breakpoint.
6. Confirm reduced-motion behaviour.
7. Update this document with new values or breakpoints.
8. Capture updated screenshots if the public visual changes.

### Future improvement opportunities

- Promote more literal colours into custom properties.
- Introduce spacing, radius, and shadow token variables.
- Split the stylesheet into `tokens.css`, `base.css`, and area files.
- Add a documented token export pipeline when the Studio token model exists.
- Add visual regression testing.

These are proposals, not implemented.

---

## 10. Related documents

- [Frontend architecture](frontend-architecture.md)
- [Accessibility](../quality/accessibility.md)
- [Performance](performance.md)
- [ADR-0004: Hand-written CSS](../architecture/adr/0004-handwritten-css-tokens.md)
- [Design foundations](../features/design-foundations.md)
- [Design tokens](../features/design-tokens.md)
