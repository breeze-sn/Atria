# Landing Page

**Status:** Implemented
**Route:** `/`
**Source:** `src/App.jsx` (`LandingPage`), `src/index.css`

The landing page is the public face of Atria. It explains the product idea, demonstrates the visual
language, and gives visitors a way into the Studio and documentation.

It is a single React component composed of sections, plus two pieces of local state for interaction.

---

## 1. Purpose

The landing page should:

1. Communicate what Atria is within the first screen.
2. Show the visual quality of the design system.
3. Explain the product's relationship to foundations, tokens, and components.
4. Provide a small, honest demonstration of interactivity.
5. Link visitors to the Studio, documentation, repository, and contact channels.

---

## 2. Section-by-section

### 2.1 Navigation

- Brand: four-square mark plus the `atria.` wordmark.
- Links: Studio (`#studio`), Foundation (`#foundations`), Components (`#components`), Docs (`/docs`),
  Contact (`#contact`).
- Primary CTA: **View on GitHub**, opening `https://github.com/breeze-sn/Atria` in a new tab.
- On small screens, the text links are hidden and the GitHub CTA remains.

### 2.2 Hero

Left column:

- eyebrow: `OPEN-SOURCE DESIGN WORKSPACE` with a live dot;
- headline: **Make consistency feel effortless.** with an italic serif emphasis;
- description of the product;
- primary CTA **Explore the studio** to `/explore`;
- secondary text link to the repository;
- footnote: `01 / 04` and `DESIGNED FOR TEAMS THAT CARE ABOUT THE DETAILS`.

Right column: an abstract workspace preview built entirely from markup and CSS:

- window chrome with `ATRIA / WORKSPACE` and `PREVIEW 001`;
- a mini sidebar with workspace navigation;
- workspace heading and date;
- three stats: Foundations `04`, Components `12`, Design Tokens `28`;
- colour palette with five swatches: Ink, Stone, Ash, Mist, Paper;
- footer line and figure caption.

The stats and palette are illustrative preview content, not connected to real data.

### 2.3 Principles ticker

A static strip of mono-spaced phrases:

`DESIGN WITH INTENTION` · `BUILD WITH CLARITY` · `DOCUMENT EVERYTHING`

The phrases repeat visually to create a ticker effect. It is not an animated marquee.

### 2.4 Intro section (`#studio`)

- Section index: `[ 01 — THE IDEA ]`.
- Heading about giving the details of a system a home.
- Supporting paragraph about consistent decisions.
- Link to the foundations section.

### 2.5 Foundations (`#foundations`)

- Section index: `[ 02 — BUILDING BLOCKS ]`.
- Heading and supporting copy.
- Four cards from the `foundations` array:

| Card | Detail | Meta |
|---|---|---|
| Colour | Build expressive, accessible palettes | FOUNDATION / 01 |
| Typography | Define type scales and text styles | FOUNDATION / 02 |
| Spacing | Create a consistent spatial system | FOUNDATION / 03 |
| Components | Document reusable interface patterns | LIBRARY / 04 |

Cards are visually interactive on hover but are `article` elements, not links. They do not navigate.

### 2.6 Component playground (`#components`)

- Section index: `[ 03 — THE COMPONENT LIBRARY ]`.
- Heading and explanation.
- Tab buttons for **Button**, **Input**, and **Badge**.
- A preview stage that switches based on `activeTab`.
- Footer: `DEFAULT STATE / {TAB}` and `PREVIEW ONLY`.

The previews are hand-authored JSX, not dynamically rendered component code.

### 2.7 Token strip

- Dark section with section index `[ 04 — DEVELOPER FRIENDLY ]`.
- Heading about handoff.
- Copy about keeping design intent close to code.
- Code snippet: `--atria-space-4: 16px;`.
- Copy button using `navigator.clipboard.writeText`.
- Status line: `CSS variables & JSON exports are part of the roadmap`.

This is honest: the copy action works for one literal value, and export is explicitly future work.

### 2.8 Contact (`#contact`)

- Section index `[ 05 — GET IN TOUCH ]`.
- Heading and short invitation.
- Links:
  - Email: `nagekarsimran@outlook.com`
  - LinkedIn: `https://www.linkedin.com/`
  - GitHub: `https://github.com/breeze-sn`
  - Website: `https://simransn.vercel.app`

Email is `mailto:`; the others open in a new tab with `rel="noreferrer"`.

### 2.9 Footer

- Brand and statement.
- GitHub CTA: **Star the project**.
- Bottom row: copyright, open-source status, documentation link, GitHub link.

---

## 3. Interactions

### Playground tabs

```text
Click tab → setActiveTab(name) → selected class moves → preview stage re-renders
```

- Initial state: `Button`.
- Only one preview at a time.
- Keyboard activation works because the controls are native `<button>` elements.

### Copy token

```text
Click copy → navigator.clipboard.writeText('--atria-space-4: 16px;')
  → success: setCopied(true), label COPIED, reset after 1800 ms
  → failure: setCopied(false)
```

- No error message is shown on failure.
- Requires a secure context (`localhost` or HTTPS) and clipboard permission.

### Links

- Internal anchors use hash navigation with smooth scrolling.
- Studio and Docs links cause navigation.
- External links open new tabs with `rel="noreferrer"`.

---

## 4. Visual system

| Aspect | Implementation |
|---|---|
| Background | `#f7f7f5` paper |
| Primary text | `#20201e` ink |
| Borders | `#deddd8` line |
| Secondary surfaces | `#eeede9`, `#f0efeb`, `#eae9e4` |
| Accent green | `#8b9d79`, `#a8b79a`, `#8f9d82` |
| Display type | Manrope, tight letter spacing, large `clamp()` sizes |
| Emphasis | Georgia italic |
| Technical labels | DM Mono, uppercase, small sizes, letter spacing |
| Container | `.shell`, max 1160px, 32px gutters |
| Motion | Hover transitions, card lift, smooth scroll, reduced-motion override |

---

## 5. Responsive behaviour

| Breakpoint | Changes |
|---|---|
| `≤ 850px` | Hero becomes one column; foundation grid becomes two columns; component layout gap reduces |
| `≤ 600px` | Shell gutters reduce; nav text links hide; headings scale; hero actions stack; preview panel compresses; cards reduce padding; token strip stacks; footer wraps |
| Reduced motion | Transitions/animations nearly disabled |

The layout was verified at 1440px width for the documentation screenshot. Mobile behaviour is defined
in CSS and should be checked manually after changes.

---

## 6. Accessibility notes

Present:

- Semantic `nav`, `main`, `section`, `footer`.
- `aria-label` on the brand link and copy button.
- Native buttons and links for interaction.
- `prefers-reduced-motion` support.
- Descriptive link text.

Gaps and considerations:

- Some decorative icons are not explicitly hidden from assistive technology.
- The ticker uses repeated text that could be announced twice; it has an `aria-label` on the section.
- No automated accessibility tests.
- Contrast has not been formally audited.
- Foundation cards look interactive but are not links; this should be clarified if they become
  clickable.

---

## 7. Limitations

- The workspace preview is illustrative, not live data.
- The playground is a visual demonstration, not a component API explorer.
- The token copy action copies one literal string.
- Exports do not exist; the page says they are on the roadmap.
- Contact links point to personal/public profiles.
- The page has no analytics or personalisation.

---

## 8. Change guidance

When changing the landing page:

1. Keep the product claims accurate.
2. Do not imply Studio editors or exports are complete.
3. Check every breakpoint after layout changes.
4. Keep native interactive elements for keyboard support.
5. Update this document if sections, links, or interactions change.
6. Capture an updated screenshot for `docs/assets/screenshots/` when the visual design changes.

---

## 9. Related documents

- [Feature overview](README.md)
- [Explore Studio](explore-studio.md)
- [Styling and design tokens](../engineering/styling-and-design-tokens.md)
- [Accessibility](../quality/accessibility.md)
- [Low-level design](../architecture/low-level-design.md)
