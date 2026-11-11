# Environment Configuration

## Current state: no environment variables required

Atria reads **no environment variables**. There is no `.env` file, no `.env.example`, no
`import.meta.env` usage, and no server-side configuration.

You can run the full application with:

```bash
npm install
npm run dev
```

No secrets, API keys, database URLs, or hosting credentials are needed.

This is consistent with the architecture: a static client-only application with no backend, database,
or authentication.

---

## Configuration files that do exist

| File | Purpose | Required |
|---|---|---|
| `vite.config.js` | Registers the React plugin | Yes, for the build |
| `vercel.json` | Vercel framework, build command, output, SPA rewrites | Only for Vercel deployment |
| `index.html` | Metadata, fonts, root element, module entry | Yes |
| `package.json` | Dependencies and scripts | Yes |
| `package-lock.json` | Locked dependency graph | Yes, for reproducible installs |
| `.github/workflows/ci.yml` | CI trigger and build verification | Only for GitHub Actions |

None of these require local edits to get started.

---

## Public configuration values in source

Some values are intentionally public and embedded in the frontend:

| Value | Location | Notes |
|---|---|---|
| Google Fonts URL | `index.html` | Public webfont request |
| GitHub repository URL | Navigation and footer links | Public |
| Contact email and profile links | `src/App.jsx` | Public contact information |
| Google Docs URLs | `src/Docs.jsx` | Public links, subject to document sharing settings |
| Demo token string | `copyToken` in `src/App.jsx` | Static demonstration value |

Do not treat these as secrets.

---

## If configuration becomes necessary

Follow these rules when introducing environment variables in the future:

1. **Vite requires the `VITE_` prefix** for variables exposed to client code.
2. **Anything exposed to the client is public.** Never put secrets in `VITE_*` variables.
3. **Secrets belong on the server.** Atria has no server today; do not add client-side secrets.
4. **Document every variable** in this file and add a `.env.example` with safe placeholder values.
5. **Do not commit `.env` files.** Add them to `.gitignore` when the first one is introduced.
6. **Keep production values in the hosting provider**, not in source control.
7. **Add an ADR** if configuration changes the architecture or introduces an external service.

### Example of a safe future pattern

```env
# .env.example — do not put real secrets here
VITE_PUBLIC_SITE_URL=https://example.com
```

```js
const siteUrl = import.meta.env.VITE_PUBLIC_SITE_URL
```

This pattern only applies to genuinely public values.

---

## Environment-specific behaviour

| Environment | Behaviour |
|---|---|
| Local development | Vite dev server, HMR, default port 5173 |
| Local production preview | Vite preview, static `dist/`, default port 4173 |
| CI | Node.js 20, `npm install`, optional no-op lint, `npm run build` |
| Production | Vercel build, static assets, SPA rewrites |

No environment-specific code branches exist in the application.

---

## Related documents

- [Installation](installation.md)
- [Local development](local-development.md)
- [Build and deployment](../deployment/build-and-deployment.md)
- [CI/CD](../deployment/ci-cd.md)
- [Security and authentication](../engineering/security-and-authentication.md)
