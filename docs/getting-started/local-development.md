# Local Development

## Purpose

This guide explains the day-to-day development loop for Atria: running the dev server, understanding
hot reload, navigating the app, making common changes, and verifying your work.

---

## 1. Start the dev server

```bash
npm run dev
```

Vite serves the app with hot module replacement (HMR). Changes to JavaScript, JSX, and CSS appear in
the browser without a full reload in most cases.

If you need a specific host or port:

```bash
npm run dev -- --host 0.0.0.0 --port 3000
```

---

## 2. Navigate the application

| Area | URL | What to test |
|---|---|---|
| Landing | `/` | Hero, anchors, playground tabs, copy token, contact links |
| Docs | `/docs` | Collections, outbound cards, responsive layout |
| Explore | `/explore` | Redirect and shell |
| Foundations | `/explore/foundations` | Brief layout and sidebar active state |
| Tokens | `/explore/tokens` | Brief layout and sidebar active state |
| Components | `/explore/components` | Brief layout and sidebar active state |

Remember: `/docs` is rendered outside the React Router tree. Navigating to it from the app causes a
full page load. This is current, documented behaviour, not a bug.

---

## 3. Where to edit

| Change | File |
|---|---|
| Landing page content or structure | `src/App.jsx` |
| Route table or redirects | `src/App.jsx` |
| Documentation hub content | `src/Docs.jsx` |
| Explore header, sidebar, footer | `src/layouts/DashboardLayout.jsx` |
| Foundations brief | `src/pages/Foundations.jsx` |
| Tokens brief | `src/pages/Tokens.jsx` |
| Components brief | `src/pages/Components.jsx` |
| Any visual style | `src/index.css` |
| Fonts, metadata, title | `index.html` |
| Build tooling | `vite.config.js` |
| Hosting and SPA rewrites | `vercel.json` |
| CI | `.github/workflows/ci.yml` |
| Documentation | `docs/` and root Markdown files |

---

## 4. Common development tasks

### Add a landing-page card or section

1. Add or expand a constant array in `src/App.jsx`.
2. Add JSX inside `LandingPage`.
3. Add CSS in the relevant section of `src/index.css`.
4. Test at desktop, tablet (`850px`), and mobile (`600px`, `650px`).

### Add a Studio section

1. Create `src/pages/YourSection.jsx`.
2. Add a child route under `/explore` in `src/App.jsx`.
3. Add the navigation entry to `sections` in `src/layouts/DashboardLayout.jsx`.
4. Reuse the `.studio-page` visual pattern.
5. Update `docs/features/explore-studio.md` and `docs/architecture/low-level-design.md`.

### Change typography or colour

1. Prefer the CSS custom properties in `:root` for core values.
2. Update the relevant literal values if a token does not yet exist.
3. Check contrast and responsive behaviour.
4. Update [Styling and design tokens](../engineering/styling-and-design-tokens.md) if the documented
   system changes.

### Add or change documentation

1. Add the file under the appropriate `docs/` subdirectory.
2. Link it from `docs/README.md`.
3. Link it from the root `README.md` documentation index if it is a primary entry point.
4. Follow [Documentation guidelines](../contributing/documentation-guidelines.md).
5. Verify every link.

---

## 5. Hot reload behaviour

- React Fast Refresh preserves component state where possible.
- Editing `src/main.jsx` or route configuration may trigger a full reload.
- CSS edits are injected without a full reload.
- Changes to `index.html` may require a manual refresh.
- Changes to `vite.config.js` restart the dev server.

If HMR appears stuck, stop the server (`Ctrl+C`) and run `npm run dev` again.

---

## 6. Verify before committing

Minimum verification:

```bash
npm run build
```

Recommended manual checks:

- [ ] `/` renders and the playground tabs switch correctly.
- [ ] Copy token shows `COPIED` when clipboard permission is allowed.
- [ ] `/docs` renders and cards open in a new tab.
- [ ] `/explore` redirects to `/explore/foundations`.
- [ ] All three Studio sections render and the sidebar active state follows the URL.
- [ ] `/studio/anything` redirects to `/explore`.
- [ ] An unknown path redirects to `/`.
- [ ] Layout works at desktop and mobile widths.
- [ ] Reduced motion does not break the page.
- [ ] No console errors.

Use the full [Testing strategy](../quality/testing-strategy.md) for a complete matrix.

---

## 7. Production preview

```bash
npm run build
npm run preview
```

This serves `dist/` locally. Use it to test behaviour that differs between dev and production, such as
direct route loading and bundle-only issues.

---

## 8. What not to do

- Do not add environment variables for data that belongs in source today.
- Do not introduce a backend or database without an agreed design and ADR.
- Do not describe placeholder Studio features as implemented.
- Do not commit `node_modules/` or `dist/`.
- Do not add generated files unless the repository explicitly needs them.
- Do not change global CSS without checking every page that uses it.

---

## 9. Related documents

- [Installation](installation.md)
- [Environment configuration](environment-configuration.md)
- [Frontend architecture](../engineering/frontend-architecture.md)
- [Routing](../engineering/routing.md)
- [Debugging](../contributing/debugging.md)
- [Testing strategy](../quality/testing-strategy.md)
