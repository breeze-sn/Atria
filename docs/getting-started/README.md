# Getting Started

This section takes you from a fresh clone to a running local Atria instance. It assumes no prior
knowledge of the repository.

Atria is a Vite + React single-page application. There is no backend, database, or environment
configuration to set up.

---

## Prerequisites

| Requirement | Why | Verified version |
|---|---|---|
| Node.js 20 or newer | Vite 6 and the CI workflow | CI uses Node.js 20 |
| npm | Installs dependencies from `package-lock.json` | Bundled with Node.js |
| Git | Clone and contribute | Any current version |
| A modern browser | Runs the React application | Chrome, Edge, Firefox, Safari |

The repository was verified locally with Node.js 24.18.0 and npm 11.16.0. CI uses Node.js 20, so both
are valid for development. If you encounter tooling issues, prefer Node.js 20 LTS or newer.

---

## Quick setup

```bash
git clone https://github.com/breeze-sn/Atria.git
cd Atria
npm install
npm run dev
```

Open the URL printed by Vite, typically `http://localhost:5173`.

---

## Documents in this section

| Document | Read it for |
|---|---|
| [Installation](installation.md) | Exact commands, build verification, troubleshooting |
| [Local development](local-development.md) | Day-to-day loop, routes, HMR, common edits |
| [Environment configuration](environment-configuration.md) | Why no env vars are needed and safe future conventions |

---

## What you should see

| Route | Expected |
|---|---|
| `/` | Public landing page |
| `/docs` | Documentation hub |
| `/explore` | Redirect to `/explore/foundations` |
| `/explore/foundations` | Foundations implementation brief |
| `/explore/tokens` | Tokens implementation brief |
| `/explore/components` | Components implementation brief |

The Studio pages are **not** editors. They are contributor guidance. If that surprises you, read the
[feature overview](../features/README.md).

---

## Next steps

- Read the [project structure](../../README.md#project-structure).
- Read [Local development](local-development.md) before making changes.
- Read [Contribution workflow](../contributing/contribution-workflow.md) before opening a pull request.
- Read [Testing strategy](../quality/testing-strategy.md) so you know how to verify your change.
