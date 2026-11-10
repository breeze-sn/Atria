# Installation

## 1. Prerequisites

Install:

- **Git** — https://git-scm.com/
- **Node.js 20 or newer** — https://nodejs.org/
- **npm** — included with Node.js

Verify your tools:

```bash
node --version
npm --version
git --version
```

Expected: Node.js `v20.x` or newer. The CI workflow uses Node.js 20. Local verification has also been
performed with Node.js 24.

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

### Reproducible install

For a clean, lockfile-exact install:

```bash
npm ci
```

`npm ci` removes `node_modules/` and installs strictly from the lockfile. It is useful when
reproducing CI behaviour.

---

## 4. Start the development server

```bash
npm run dev
```

Vite prints a local URL:

```text
VITE v6.x  ready in ... ms
➜  Local:   http://localhost:5173/
```

Open the URL in a modern browser.

If port `5173` is already in use, Vite selects the next available port and prints it. You can request a
specific port:

```bash
npm run dev -- --port 3000
```

---

## 5. Verify the routes

| URL | Expected result |
|---|---|
| `http://localhost:5173/` | Landing page |
| `http://localhost:5173/docs` | Documentation hub |
| `http://localhost:5173/explore` | Redirect to `/explore/foundations` |
| `http://localhost:5173/explore/foundations` | Foundations brief |
| `http://localhost:5173/explore/tokens` | Tokens brief |
| `http://localhost:5173/explore/components` | Components brief |

---

## 6. Verify the production build

```bash
npm run build
```

Expected output includes a successful Vite build and files in `dist/`:

```text
dist/index.html
dist/assets/index-*.css
dist/assets/index-*.js
```

Then preview the production build:

```bash
npm run preview
```

Open the printed URL (typically `http://localhost:4173/`). Direct navigation to `/docs` and
`/explore/tokens` should work because Vite preview provides SPA fallback. In production, Vercel
provides the equivalent fallback through `vercel.json` rewrites.

---

## 7. Optional: reproduce CI locally

CI performs:

```bash
npm install
npm run lint --if-present
npm run build
```

Because there is no `lint` script, the lint step is a no-op. The meaningful local check is:

```bash
npm install
npm run build
```

---

## 8. Environment variables

**None are required.** Atria reads no environment variables and has no `.env` file. Do not create one
for the current feature set.

If configuration becomes necessary, follow
[Environment configuration](environment-configuration.md).

---

## 9. Troubleshooting installation

| Problem | Likely cause | Fix |
|---|---|---|
| `node: command not found` | Node.js not installed or not on PATH | Install Node.js 20+ and reopen the terminal |
| Unsupported engine or Vite error | Node.js too old | Upgrade to Node.js 20+ |
| `npm install` fails behind a proxy | Registry access blocked | Configure npm proxy or use a permitted network |
| Port already in use | Another dev server is running | Stop it or use `--port` |
| Blank page at `/docs` | Trailing slash or path mismatch | Use exactly `/docs` |
| Fonts look different offline | Google Fonts unavailable | Browser fallback fonts are used |
| Clipboard copy does nothing | Browser permission or insecure context | Use `localhost`/HTTPS and allow clipboard access |

For more, see [Debugging](../contributing/debugging.md).

---

## 10. Next steps

- [Local development](local-development.md)
- [Contribution workflow](../contributing/contribution-workflow.md)
- [Testing strategy](../quality/testing-strategy.md)
