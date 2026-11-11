# ADR-0007: Vercel static hosting with SPA rewrites

- **Status:** Accepted
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

Atria is a client-side SPA with routes such as `/explore/tokens` and a special `/docs` page. Static
hosting must serve the application shell for direct requests to these paths, otherwise a refresh or
shared link returns a 404.

## Decision

Deploy the Vite production build to Vercel with the following `vercel.json` configuration:

- framework: `vite`;
- build command: `npm run build`;
- output directory: `dist`;
- install command: `npm install`;
- rewrite `/(.*)` to `/index.html`.

GitHub Actions separately installs dependencies and runs `npm run build` for verification. It does
not deploy.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| GitHub Pages without rewrites | Direct route requests would 404 |
| Netlify | Viable, but Vercel is already configured |
| Server-side routing | No server exists |
| Hash routing | Avoids rewrites but produces less clean URLs |
| Custom CDN configuration | More operational work than the current scope requires |

## Consequences

### Positive

- Direct links and refreshes work for all client routes.
- Static hosting is inexpensive and reliable.
- Build output is a simple `dist/` directory.
- The configuration is explicit and version-controlled.

### Negative

- Every path returns `index.html`, including genuinely missing assets unless handled by Vercel.
- No server-side redirect logic; redirects are handled client-side.
- Deployment depends on Vercel's Git integration, which is outside this repository's workflow files.
- SEO depends on the static HTML shell and client rendering.

### Neutral

- The rewrite rule is a standard SPA pattern.
- CI and deployment are intentionally separate concerns.

## Related documents

- [Build and deployment](../../deployment/build-and-deployment.md)
- [CI/CD](../../deployment/ci-cd.md)
- [Routing](../../engineering/routing.md)
- [System architecture](../system-architecture.md)
