# Assets

This directory contains the visual assets used by the repository documentation.

---

## Contents

| File | Type | Purpose |
|---|---|---|
| `atria-banner.svg` | Vector | README hero banner |
| `screenshots/landing-hero.png` | PNG | Landing page screenshot |
| `screenshots/explore-foundations.png` | PNG | Explore Studio Foundations brief screenshot |
| `screenshots/docs-index.png` | PNG | Documentation hub screenshot |

---

## Banner

`atria-banner.svg` is a hand-authored SVG:

- 1200 × 360 viewBox;
- dark warm-neutral background with a subtle grid and glow;
- the Atria four-square mark and wordmark;
- headline: "Design, structure, and consistency.";
- technology chips for React 19, Vite 6, and Open Source;
- an illustrative workspace preview with palette swatches and stats;
- subtle SVG/CSS animation that respects `prefers-reduced-motion`.

The banner is decorative and does not represent live product data.

---

## Screenshots

All screenshots were captured from a **local production build** of this repository. They are real
renders, not concept art.

### Capture method

1. Build and serve the app locally:

   ```bash
   npm install
   npm run build
   npm run preview -- --port 4173
   ```

2. Use a headless browser at 1440 × 1100 with a device scale factor of 1:

   ```bash
   chrome --headless --disable-gpu --hide-scrollbars \
     --window-size=1440,1100 \
     --virtual-time-budget=6000 \
     --screenshot=docs/assets/screenshots/landing-hero.png \
     http://localhost:4173/
   ```

3. Repeat for:

   - `http://localhost:4173/explore/foundations`
   - `http://localhost:4173/docs`

4. Review the images and update alt text if the visible content changed.

### Guidelines

- Capture from the current build, never from a mock-up.
- Do not include private browser chrome, bookmarks, or personal data.
- Do not edit the UI in the screenshot to imply unbuilt features.
- Keep the images reasonably compressed.
- Update screenshots when the public visual changes.
- Document the viewport and date in the pull request.

---

## Alt text used in the README

| Image | Alt text |
|---|---|
| `landing-hero.png` | Atria landing page showing the hero, workspace preview, and design language |
| `explore-foundations.png` | Atria Explore Studio showing the Foundations implementation brief |
| `docs-index.png` | Atria documentation hub listing product, design, and engineering documents |

---

## Ownership and licensing

These assets are part of the Atria repository and are covered by the repository's
[MIT License](../../LICENSE), unless a future asset states otherwise.

Do not add third-party images without confirming their licence and attribution requirements.

---

## Related documents

- [Documentation index](../README.md)
- [Documentation guidelines](../contributing/documentation-guidelines.md)
- [Landing page](../features/landing-page.md)
- [Documentation hub](../features/documentation-hub.md)
