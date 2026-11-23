# Installation

## 1. Prerequisites

Install:

- **Git** — https://git-scm.com/
- **Node.js 20 or newer** — https://nodejs.org/ (Node 20 LTS, 22, and 24 are verified)
- **npm** — included with Node.js (v10 or newer)

Verify your tools:

```bash
node --version
npm --version
git --version
```

Expected: Node.js `v20.x` or newer. The CI workflow uses Node.js 20. Local verification has also been
performed with Node.js 22 and 24.

---

## 2. Clone the repository

### Contribute through your fork

The project accepts contributions through forks. Replace `<your-username>` with your GitHub username.

```bash
git clone https://github.com/<your-username>/Atria.git
cd Atria
```

### Browse the upstream repository

```bash
git clone https://github.com/breeze-sn/Atria.git
cd Atria
```

---

## 3. Install dependencies

```bash
npm install
```

This reads `package.json` and `package-lock.json` and installs the exact dependency graph into
`node_modules/`.

The repository includes an `.npmrc` file configuring `legacy-peer-deps=true` to ensure clean resolution
across dependencies.

### Reproducible install

For a clean, lockfile-exact install (matching CI):

```bash
npm ci
```

`npm ci` removes `node_modules/` and installs strictly from the lockfile.

---

## 4. Configure environment (Optional)

The frontend client runs without any environment variables. However, if running the Express backend
server or configuring database options, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Default variables in `.env.example`:

| Variable | Default / Purpose |
|---|---|
| `PORT` | `3000` — Port for Express server |
| `DATABASE_URL` | PostgreSQL connection string declared for Prisma schema |

---

## 5. Start the development server

### Start frontend client

```bash
npm run dev
```

(Or `npm run dev:client`). Vite prints a local URL:

```text
VITE v8.x  ready in ... ms
➜  Local:   http://localhost:5173/
```

Open the URL in a modern browser.

If port `5173` is already in use, Vite selects the next available port and prints it. You can request a
specific port:

```bash
npm run dev -- --port 3000
```

### Start backend API (Optional)

To start the Express server with live reload:

```bash
npm run dev:server
```

Server runs on `http://localhost:3000`. You can verify health via:

```bash
curl http://localhost:3000/api/health
```

---

## 6. Verify the routes

| URL | Expected result |
|---|---|
| `http://localhost:5173/` | Landing page with interactive playground and foundations |
| `http://localhost:5173/docs` | Documentation hub |
| `http://localhost:5173/explore` | Explore Studio overview dashboard with navigation cards |
| `http://localhost:5173/explore/foundations` | Foundations catalogue |
| `http://localhost:5173/explore/foundations/:categoryId/:resourceId` | Resource detail editor (e.g. `/explore/foundations/colour/warm-earth`) |
| `http://localhost:5173/explore/tokens` | Design tokens editor with import and export |
| `http://localhost:5173/explore/components` | Component library catalogue and preview snippets |
| `http://localhost:5173/studio` | Interactive Studio visual builder workspace |
| `http://localhost:3000/api/health` | JSON response: `{"status":"ok",...}` |

---

## 7. Run automated tests

Atria uses Vitest with React Testing Library.

```bash
npm test
```

Runs all test suites (including navigation journeys, token import workflows, and keyboard accessibility
specifications).

---

## 8. Verify the production build

```bash
npm run build
```

Expected output includes a successful Vite build and files in `dist/`:

```text
dist/index.html
dist/assets/index-*.css
dist/assets/index-*.js
```

Then preview the production build locally:

```bash
npm run preview
```

Open the printed URL (typically `http://localhost:4173/`). Direct navigation to client routes works
because Vite preview provides SPA fallback. In production, Vercel provides equivalent fallback through
`vercel.json` rewrites.

---

## 9. Reproduce CI locally

CI performs:

```bash
npm ci
npm run build
```

Local verification before pushing should also include tests:

```bash
npm test
npm run build
```

---

## 10. Troubleshooting installation

| Problem | Likely cause | Fix |
|---|---|---|
| `node: command not found` | Node.js not installed or not on PATH | Install Node.js 20+ and reopen the terminal |
| Unsupported engine or Vite error | Node.js too old | Upgrade to Node.js 20+ |
| `npm install` peer dependency conflict | npm resolving strict peer trees | Ensure `.npmrc` has `legacy-peer-deps=true` or pass `--legacy-peer-deps` |
| Port `5173` already in use | Another Vite dev server running | Vite will pick next port, or specify `--port 3001` |
| Port `3000` already in use | Express server collision | Change `PORT` in `.env` or stop the conflicting process |
| `vitest: command not found` | Dependencies not installed | Run `npm install` first |
| Vitest out of memory on Windows (`Zone Allocation failed`) | JSDOM concurrency memory overhead | Run with `npx vitest run --poolOptions.threads.singleThread` |
| Blank page at `/docs` | Trailing slash or path mismatch | Navigate directly to `/docs` |
| Fonts look different offline | Google Fonts unavailable | Browser fallback fonts are used |
| Clipboard copy does nothing | Browser permission or insecure context | Use `localhost` / HTTPS and allow clipboard access |

For more, see [Debugging](../contributing/debugging.md).

---

## 11. Next steps

- [Local development](local-development.md)
- [Environment configuration](environment-configuration.md)
- [Contribution workflow](../contributing/contribution-workflow.md)
- [Testing strategy](../quality/testing-strategy.md)
