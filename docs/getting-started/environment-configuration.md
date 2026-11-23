# Environment Configuration

## Current state

Atria's frontend single-page application runs without requiring any environment variables. For client-only
development, no `.env` file is necessary.

For backend and database development, an environment configuration template is provided in `.env.example`.

```bash
cp .env.example .env
```

No secrets or external API keys are required to run the local application or test suite.

---

## Configuration variables

| Variable | Default in `.env.example` | Scope | Purpose |
|---|---|---|---|
| `PORT` | `3000` | Backend | Port used by the Express server in `server/index.js` |
| `DATABASE_URL` | `postgresql://...` | Backend / Prisma | Database connection string used by `prisma/schema.prisma` |

---

## Configuration files in the repository

| File | Purpose | Required |
|---|---|---|
| `.env.example` | Template documenting environment variables | Yes (tracked in git) |
| `.env` | Local environment overrides | Optional for client; ignored by `.gitignore` |
| `.npmrc` | Sets `legacy-peer-deps=true` for npm dependency resolution | Yes |
| `vite.config.js` | Vite build tool and React plugin configuration | Yes |
| `vercel.json` | Vercel SPA routing and build output settings | Required for Vercel deployment |
| `index.html` | Root HTML shell, fonts, and module entry point | Yes |
| `package.json` | Scripts (`dev`, `dev:client`, `dev:server`, `build`, `test`), dependencies | Yes |
| `package-lock.json` | Locked dependency tree | Yes |
| `prisma/schema.prisma` | Prisma ORM datasource configuration | Required for Prisma tooling |
| `.github/workflows/ci.yml` | GitHub Actions CI pipeline | Required for CI |

---

## Public values in source code

Some values are intentionally public and embedded in the frontend source:

| Value | Location | Notes |
|---|---|---|
| Google Fonts URL | `index.html` | Public webfont stylesheet link |
| GitHub repository URLs | Navigation, hero, and footer links | Public upstream repository |
| Contact email and links | `src/App.jsx` | Public contact and author profile links |
| Documentation links | `src/Docs.jsx` | Public Google Docs reference links |
| Token example string | `copyToken` in `src/App.jsx` | Static demonstration CSS variable |

Do not treat these values as secrets.

---

## Conventions for future environment variables

When introducing new environment configuration:

1. **Vite requires the `VITE_` prefix** for variables exposed to the client bundle (`import.meta.env.VITE_*`).
2. **Never expose secrets to the client.** Any variable prefixed with `VITE_` is compiled into public JavaScript.
3. **Server-side secrets belong in backend configuration.** Database credentials, API private keys, and session secrets must only be accessed from `server/` via `process.env`.
4. **Update `.env.example`** with safe placeholder values whenever a new variable is introduced.
5. **Never commit `.env` files.** The `.gitignore` file must always exclude `.env` and `.env.local`.
6. **Set production values in your hosting provider's dashboard** (e.g. Vercel environment variables).

---

## Environment-specific behaviour

| Environment | Behaviour |
|---|---|
| Local client dev | Vite dev server with HMR, default port `5173` |
| Local server dev | Express server with watch mode (`node --watch`), default port `3000` |
| Local production preview | Vite preview serving `dist/`, default port `4173` |
| Local test suite | Vitest test runner running JSDOM component & unit tests |
| CI (GitHub Actions) | Node.js 20, `npm ci`, `npm run build` |
| Production (Vercel) | Static assets compiled by Vite, client-side routing via `vercel.json` rewrites |

---

## Related documents

- [Installation](installation.md)
- [Local development](local-development.md)
- [Build and deployment](../deployment/build-and-deployment.md)
- [CI/CD](../deployment/ci-cd.md)
- [API Reference](../features/api-reference.md)
- [Security and authentication](../engineering/security-and-authentication.md)
