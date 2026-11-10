# Routing

## 1. Overview

Atria has two routing paths:

1. **Documentation branch** — `/docs` is selected in `src/main.jsx` before React Router mounts.
2. **Application router** — every other path is handled by `BrowserRouter` in `src/App.jsx`.

This is a deliberate but unusual split. Read this page before changing navigation.

---

## 2. Entry branch

```jsx
// src/main.jsx
{window.location.pathname === '/docs' ? <Docs /> : <App />}
```

| Condition | Rendered |
|---|---|
| `pathname === '/docs'` | `src/Docs.jsx` |
| Any other pathname | `src/App.jsx` with `BrowserRouter` |

### Exact-match implications

| URL | `pathname` | Branch |
|---|---|---|
| `/docs` | `/docs` | Docs |
| `/docs?tab=product` | `/docs` | Docs |
| `/docs/` | `/docs/` | App router → catch-all → `/` |
| `/docs/anything` | `/docs/anything` | App router → catch-all → `/` |
| `/` | `/` | App router |
| `/explore/tokens` | `/explore/tokens` | App router |

Only the first two render the documentation hub.

---

## 3. Application route table

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/explore" element={<DashboardLayout />}>
      <Route index element={<Navigate to="foundations" replace />} />
      <Route path="foundations" element={<Foundations />} />
      <Route path="tokens" element={<Tokens />} />
      <Route path="components" element={<Components />} />
    </Route>
    <Route path="/studio/*" element={<Navigate to="/explore" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</BrowserRouter>
```

| Route | Result | Type |
|---|---|---|
| `/` | Landing page | Page |
| `/explore` | Layout + index redirect to `foundations` | Redirect |
| `/explore/foundations` | Layout + Foundations brief | Nested page |
| `/explore/tokens` | Layout + Tokens brief | Nested page |
| `/explore/components` | Layout + Components brief | Nested page |
| `/studio/*` | Redirect to `/explore` | Legacy redirect |
| `*` | Redirect to `/` | Catch-all |
| `/docs` | Never reaches this router | Special entry branch |

---

## 4. Navigation behaviour

### Landing page

- Internal hash links: `#studio`, `#foundations`, `#components`, `#contact`.
- Studio CTA: native anchor to `/explore`.
- Docs link: native anchor to `/docs` (full page load).
- External links open new tabs.

### Explore Studio

- Sidebar uses React Router `NavLink`.
- Active state is derived from the URL.
- Navigation is client-side and does not reload the page.
- Header brand link to `/` is a native anchor.
- Footer links are native anchors.

### Documentation hub

- Native anchors throughout.
- Back-to-home link causes a full page load.
- Document cards open Google Docs in a new tab.

---

## 5. Why `/docs` is different

`Docs` was built as a separate page tree and is selected before the router. This avoids adding a router
for a single static page, but creates tradeoffs:

- navigation to and from Docs is not client-side;
- `/docs` is not a router route, so nested docs routes do not exist;
- trailing slashes and subpaths do not work as expected;
- shared layout components are duplicated rather than provided by a router layout.

Read [ADR-0003](../architecture/adr/0003-docs-outside-router.md) for the decision record.

### When to move `/docs` into the router

Consider moving Docs into React Router if:

- documentation gains nested pages;
- search, filtering, or in-app rendering is added;
- Docs needs to share navigation state with the app;
- full page reloads become a measurable UX problem;
- the duplicated nav/footer becomes costly to maintain.

---

## 6. SPA fallback and direct requests

Static hosting must serve `index.html` for client routes. `vercel.json` rewrites every path:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Without this:

- `GET /explore/tokens` would return 404 on refresh;
- `GET /docs` would return 404 on direct load;
- shared links would break.

Vite preview provides SPA fallback locally, so direct route checks usually work there.

---

## 7. Adding a route

### Add a Studio section

1. Create `src/pages/YourSection.jsx`.
2. Import it in `src/App.jsx`.
3. Add a child route under `/explore`:

```jsx
<Route path="your-section" element={<YourSection />} />
```

4. Add a sidebar entry to `sections` in `src/layouts/DashboardLayout.jsx`.
5. Add the route to the manual test matrix.
6. Update [Low-level design](../architecture/low-level-design.md) and
   [Explore Studio](../features/explore-studio.md).

### Add a top-level route

1. Add a `<Route>` before the catch-all.
2. Decide whether it belongs inside the router or the entry branch.
3. Add navigation links.
4. Update the route table in this document.
5. Add a test case to [Testing strategy](../quality/testing-strategy.md).

### Change a redirect

1. Update the route in `src/App.jsx`.
2. Search for links to the old path.
3. Update documentation that names the route.
4. Verify with a production preview, not only the dev server.

---

## 8. Route pitfalls

| Pitfall | Consequence | Prevention |
|---|---|---|
| Adding `/docs` to `App.jsx` only | Router never receives `/docs`; entry branch wins | Decide entry vs router explicitly |
| Using `/docs/` in links | Falls through to catch-all and redirects home | Link to exactly `/docs` |
| Adding a nested route under `/docs` | Not supported by the entry branch | Move Docs into the router first |
| Forgetting `vercel.json` rewrites | Direct route loads 404 | Keep rewrite rule |
| Linking with `href` instead of `Link`/`NavLink` inside the app | Full page reload | Use router primitives for app routes |
| Using `NavLink` inside Docs | No router context | Use native anchors |
| Relying on `replace` | Back button does not return to redirect source | Understand `Navigate replace` behaviour |

---

## 9. Verification checklist

- [ ] `/` loads the landing page.
- [ ] `/docs` loads the documentation hub.
- [ ] `/docs/` redirects home (current known behaviour).
- [ ] `/explore` redirects to `/explore/foundations`.
- [ ] Each Studio section loads and the sidebar active state is correct.
- [ ] `/studio/anything` redirects to `/explore`.
- [ ] An unknown path redirects to `/`.
- [ ] Direct loads work in a production preview.
- [ ] No console errors.

---

## 10. Related documents

- [System architecture](../architecture/system-architecture.md)
- [Low-level design](../architecture/low-level-design.md)
- [Explore Studio](../features/explore-studio.md)
- [Documentation hub](../features/documentation-hub.md)
- [ADR-0002: React Router](../architecture/adr/0002-react-router-explore-shell.md)
- [ADR-0003: Docs outside router](../architecture/adr/0003-docs-outside-router.md)
- [ADR-0007: Vercel rewrites](../architecture/adr/0007-vercel-spa-rewrites.md)
