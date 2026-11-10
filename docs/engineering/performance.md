# Performance

## 1. Overview

Atria is a small static single-page application. Performance is currently dominated by:

- the JavaScript bundle;
- the icon library import surface;
- Google Fonts;
- initial render of the landing page.

There is no runtime data fetching, so there are no network waterfalls after the initial load. There is
also no code splitting, image optimisation, or caching strategy beyond Vercel's static hosting.

This document records a measured baseline and identifies realistic improvements. It does not claim
performance work that has not been done.

---

## 2. Verified baseline

A production build was run with Vite 6 during documentation verification.

| Asset | Size | Gzip |
|---|---|---|
| `dist/index.html` | ~0.91 kB | ~0.49 kB |
| `dist/assets/index-*.css` | ~21.84 kB | ~5.09 kB |
| `dist/assets/index-*.js` | ~358.98 kB | ~107.08 kB |

Build summary:

- 4,587 modules transformed.
- Build completed successfully.

Exact sizes and hashes change with every build. Treat these numbers as a baseline for comparison, not a
contract.

---

## 3. What contributes to the bundle

| Contributor | Notes |
|---|---|
| React and React DOM | Core runtime |
| React Router | Routing |
| Phosphor Icons | Many icon imports; individual icons are tree-shaken, but the import surface is large |
| Landing page | Largest page component |
| Docs page | Static content and icons |
| Studio layout and briefs | Static content and icons |
| CSS | One global stylesheet |

### Icon imports

`src/App.jsx` imports a large set of Phosphor icons, including `ArrowsOut` and `FigmaLogo`, which are
not used in the current JSX. Unused imports are typically removed by tree-shaking, but reviewing them
is still worthwhile.

Icons are imported from the package root rather than per-icon modules. If bundle size becomes a
concern, verify whether the package supports a more granular import path in the installed version.

---

## 4. Fonts

`index.html` loads Manrope and DM Mono from Google Fonts.

Implications:

- extra DNS/TLS connections to Google Fonts;
- render-blocking stylesheet request;
- potential layout shift when fonts swap;
- no self-hosting or preloading beyond `preconnect`.

Current mitigations:

- `preconnect` to `fonts.googleapis.com` and `fonts.gstatic.com`;
- `display=swap` in the Google Fonts URL;
- system fallbacks if fonts fail.

Possible improvements:

- self-host the two families;
- preload the primary font files;
- subset fonts to required characters;
- use `font-display: swap` explicitly in local `@font-face` rules.

These are not implemented.

---

## 5. Rendering

- All pages are client-rendered.
- The initial HTML contains only the shell and module script.
- A blank page appears until the bundle executes.
- The landing page renders a large DOM for the hero preview and sections.
- No images are used in the app; the visual preview is CSS and icons.
- No heavy animation loop or canvas is used.

### Layout shift risks

- webfont swap;
- responsive `clamp()` headings;
- no explicit image dimensions because there are no content images.

---

## 6. Caching and hosting

- Vercel serves static assets from its CDN.
- Vite emits content-hashed asset filenames, enabling long-lived caching.
- `vercel.json` rewrites all paths to `index.html`, so HTML is not versioned by path.
- No custom cache headers are configured in the repository.

---

## 7. Opportunities

Ordered by likely value and effort.

### Low effort

1. Remove unused icon imports.
2. Confirm tree-shaking of Phosphor Icons.
3. Add resource hints only where measured beneficial.
4. Document the performance baseline when making large changes.

### Medium effort

1. Add route-level code splitting with `React.lazy` and `Suspense`.
2. Self-host and subset fonts.
3. Split the CSS into tokens, base, and area files for maintainability (not directly a runtime win).
4. Add a simple bundle-size check to CI.

### Larger effort

1. Evaluate a documentation site generator or static rendering if SEO becomes important.
2. Evaluate image optimisation if product screenshots or user avatars are added.
3. Add performance budgets and Lighthouse CI.
4. Add monitoring for real-user metrics.

None of these are implemented.

---

## 8. Measurement guidance

To reproduce a build:

```bash
npm install
npm run build
```

Inspect `dist/assets/` sizes. For lab measurements, use browser DevTools performance and Lighthouse
against `npm run preview`.

Record:

- date;
- Node.js and npm versions;
- bundle sizes before and after;
- page and viewport;
- tool version and settings.

---

## 9. Performance acceptance for PRs

For a normal content or documentation change, no performance work is required. For changes that add a
dependency, a large component, or a new route:

- [ ] Justify the dependency.
- [ ] Compare bundle size before and after.
- [ ] Confirm no accidental full-library import.
- [ ] Check the page still renders without layout breakage.
- [ ] Document any intentional tradeoff.

---

## 10. Related documents

- [Frontend architecture](frontend-architecture.md)
- [Styling and design tokens](styling-and-design-tokens.md)
- [Build and deployment](../deployment/build-and-deployment.md)
- [Testing strategy](../quality/testing-strategy.md)
