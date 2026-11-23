# Getting Started

This section takes you from a fresh clone to a running local Atria instance. It assumes no prior
knowledge of the repository.

Atria combines a modern React 19 single-page application bundled with Vite 8, an Express API backend
scaffold (`server/index.js`), Prisma configuration (`prisma/schema.prisma`), and local browser-persisted
workspaces (`src/data/studioStore.js`).

---

## Prerequisites

| Requirement | Why | Verified version |
|---|---|---|
| Node.js 20 or newer | Vite 8, React 19, and CI workflow | CI uses Node.js 20; verified on Node 20, 22, and 24 |
| npm | Installs dependencies from `package-lock.json` | Bundled with Node.js (v10+) |
| Git | Clone and contribute | Any current version |
| A modern browser | Runs the React application and local storage | Chrome, Edge, Firefox, Safari |

If you encounter tooling issues, prefer Node.js 20 LTS or newer.

---

## Quick setup

```bash
git clone https://github.com/breeze-sn/Atria.git
cd Atria
npm install
npm run dev
```

Open the URL printed by Vite, typically `http://localhost:5173`.

### Backend API (Optional)

Atria includes an Express backend scaffold exposing health check endpoints:

```bash
# In a separate terminal
npm run dev:server
```

Server runs on `http://localhost:3000/api/health` by default (configurable via `PORT` in `.env`).

### Run test suite

```bash
npm test
```

Executes the Vitest test suite covering navigation journeys, token import, and keyboard accessibility.

---

## Documents in this section

| Document | Read it for |
|---|---|
| [Installation](installation.md) | Exact commands, prerequisites, build verification, and troubleshooting |
| [Local development](local-development.md) | Day-to-day dev loop, client and server scripts, routes, and testing |
| [Environment configuration](environment-configuration.md) | Environment variables (`PORT`, `DATABASE_URL`), `.env.example`, and conventions |

---

## What you should see

| Route | Expected |
|---|---|
| `/` | Public landing page with playground and foundation previews |
| `/docs` | Documentation hub |
| `/explore` | Explore Studio overview dashboard with resource stats and direct module links |
| `/explore/foundations` | Foundations catalogue (Colour, Typography, Spacing, Radius) |
| `/explore/foundations/:categoryId/:resourceId` | Interactive foundation resource detail editor |
| `/explore/tokens` | Interactive design token workspace with JSON import and CSS export |
| `/explore/components` | Component library with live interactive examples and code snippets |
| `/studio` | Interactive Studio visual builder workspace |
| `http://localhost:3000/api/health` | Backend API health response (when `dev:server` is running) |

---

## Next steps

- Read the [repository structure](../../README.md#repository-structure).
- Read [Local development](local-development.md) before making changes.
- Read [Contribution workflow](../contributing/contribution-workflow.md) before opening a pull request.
- Read [Testing strategy](../quality/testing-strategy.md) so you know how to verify your change.
