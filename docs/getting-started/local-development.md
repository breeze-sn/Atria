# Local Development

## Purpose

This guide explains the day-to-day development loop for Atria: running the client and backend servers,
understanding hot reload, navigating the app, making common changes, running tests, and verifying your work.

---

## 1. Start the dev servers

### Client dev server (Vite)

```bash
npm run dev
```

(Or `npm run dev:client`). Vite serves the frontend application with hot module replacement (HMR).
Changes to JavaScript, JSX, and CSS appear in the browser almost immediately without a full page reload.

To specify a custom port or host:

```bash
npm run dev -- --host 0.0.0.0 --port 3000
```

### Backend dev server (Express)

```bash
npm run dev:server
```

Runs `node --watch server/index.js` on port `3000` (or `PORT` from `.env`). The server restarts
automatically when files inside `server/` change.

---

## 2. Navigate the application

| Area | URL | What to test |
|---|---|---|
| Landing | `/` | Hero, anchors, interactive component playground tabs, copy token, contact links |
| Docs | `/docs` | Collections, outbound documentation cards, responsive layout |
| Explore Overview | `/explore` | Workspace dashboard overview with navigation cards |
| Foundations | `/explore/foundations` | Foundations catalogue (Colour, Typography, Spacing, Radius) |
| Foundation Detail | `/explore/foundations/:categoryId/:resourceId` | Interactive token editor, preview changes, copy CSS/JSON, local persistence |
| Tokens | `/explore/tokens` | Search, filter, add/edit/delete tokens, import tokens from JSON with review modal, CSS export |
| Components | `/explore/components` | Live component catalogue, modal/tabs keyboard navigation, copyable snippets |
| Studio | `/studio` | Visual builder canvas, section editing, style controls, local storage state |
| Backend Health | `http://localhost:3000/api/health` | Express server status response |

> **Note on `/docs`:** The documentation hub is rendered outside the React Router tree in `src/main.jsx`.
> Navigating directly to it causes a standard full-page load.

---

## 3. Where to edit

| Area / Feature | Key files |
|---|---|
| Landing page content or structure | `src/App.jsx` |
| Route definitions | `src/App.jsx` |
| Documentation hub | `src/Docs.jsx` |
| Explore dashboard shell (header, sidebar) | `src/layouts/DashboardLayout.jsx` |
| Explore Overview dashboard | `src/pages/Overview.jsx` |
| Foundations catalogue & resource detail | `src/pages/Foundations.jsx` |
| Tokens workspace & JSON import review | `src/pages/Tokens.jsx`, `src/data/tokenImport.js` |
| Component catalogue & previews | `src/pages/Components.jsx` |
| Studio visual builder & persistence store | `src/pages/Studio.jsx`, `src/pages/studio.css`, `src/data/studioStore.js` |
| Visual styles & design tokens | `src/index.css` |
| Backend server & API routes | `server/index.js`, `server/routes/health.js` |
| Prisma database configuration | `prisma/schema.prisma` |
| Automated test suite | `tests/App.test.jsx`, `tests/ComponentsKeyboard.test.jsx`, `tests/navigation.test.jsx`, `tests/TokensImport.test.jsx`, `tests/tokenImport.test.js` |
| Build and dependencies | `vite.config.js`, `package.json`, `.npmrc` |
| Deployment & rewrites | `vercel.json` |
| Documentation | `docs/` and root `.md` files |

---

## 4. Common development tasks

### Add or edit a design foundation

1. Update or add resources in `src/pages/Foundations.jsx`.
2. Test both the catalogue overview (`/explore/foundations`) and resource detail routes (`/explore/foundations/:categoryId/:resourceId`).
3. Verify that edits persist locally in browser storage and test reset functionality.

### Work on tokens and token import

1. Tokens are rendered and filtered in `src/pages/Tokens.jsx`.
2. The import and review parsing logic is contained in `src/data/tokenImport.js`.
3. When updating token parsing or validation, run tests:
   ```bash
   npm test tests/tokenImport.test.js
   ```

### Add or update component examples

1. Open `src/pages/Components.jsx`.
2. Follow accessibility standards: ensure keyboard navigation (arrow keys for tabs, Escape / focus trap for modals).
3. Verify with the keyboard test suite:
   ```bash
   npm test tests/ComponentsKeyboard.test.jsx
   ```

### Add a backend endpoint

1. Create or update route modules under `server/routes/`.
2. Mount the router in `server/index.js`.
3. Test using `curl` or browser against `http://localhost:3000/<path>`.
4. Update `docs/features/api-reference.md`.

---

## 5. Hot reload behaviour

- **Client (Vite):** React Fast Refresh preserves component state. Edits to JSX and CSS inject instantly.
- **Backend (Node):** Started with `node --watch server/index.js`, restarting on file saves in `server/`.
- If HMR or watch becomes desynchronized, stop the process (`Ctrl+C`) and restart.

---

## 6. Running tests

Atria includes automated unit and integration tests powered by Vitest and JSDOM:

```bash
# Run all tests once
npm test

# Run tests in watch mode
npx vitest

# Run a specific test file
npx vitest tests/navigation.test.jsx
```

---

## 7. Verify before committing

Run both automated quality gates:

```bash
npm test
npm run build
```

Recommended manual checks:

- [ ] `/` renders and playground tabs switch correctly.
- [ ] Copy token shows `COPIED` when clicked.
- [ ] `/docs` renders collections and outbound links.
- [ ] `/explore` renders the Overview dashboard.
- [ ] `/explore/foundations` renders categories and allows navigating to resource details.
- [ ] `/explore/tokens` allows searching, adding, and importing tokens via JSON review.
- [ ] `/explore/components` renders live examples and handles modal / tab keyboard controls.
- [ ] `/studio` renders the visual builder canvas and tools.
- [ ] Unknown path redirects to `/`.
- [ ] No browser console errors or uncaught exceptions.

---

## 8. Related documents

- [Installation](installation.md)
- [Environment configuration](environment-configuration.md)
- [Explore Studio](../features/explore-studio.md)
- [API Reference](../features/api-reference.md)
- [Testing strategy](../quality/testing-strategy.md)
- [Contribution workflow](../contributing/contribution-workflow.md)
