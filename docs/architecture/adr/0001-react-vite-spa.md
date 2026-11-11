# ADR-0001: React and Vite single-page application

- **Status:** Accepted
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

Atria needs an interactive interface for a design-system workspace, a landing page, and a
documentation hub. The project is early-stage, contributions are expected from multiple developers,
and the current scope has no backend or persistence. Setup speed and a small operational surface are
more valuable than server-side rendering or a heavy framework.

## Decision

Build Atria as a client-side single-page application using:

- React 19.1 with JSX;
- React DOM 19.1 via `createRoot`;
- Vite 6 with `@vitejs/plugin-react` for development, hot module replacement, and production builds;
- JavaScript ES modules with `"type": "module"` in `package.json`.

The root entry is `src/main.jsx`, which mounts into `#root` from `index.html`.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Next.js or another SSR framework | Unnecessary operational complexity for a static, client-only surface |
| Create React App | Superseded tooling; Vite provides faster dev and modern defaults |
| Plain HTML/CSS/JS | Would make the interactive playground and routed layout harder to maintain |
| TypeScript | Not currently configured; introducing it is a separate, cross-cutting decision |
| Astro or static site generation | The app is already interactive and route-based; SSG adds little today |

## Consequences

### Positive

- Fast install and dev server.
- Simple static deployment.
- Small dependency surface.
- Familiar React model for contributors.
- Vite's production build is fast and produces a static `dist/`.

### Negative

- No server-side rendering or SEO beyond the HTML shell metadata.
- No JavaScript means no rendered content.
- Client bundle includes all page code; no route-level code splitting yet.
- No framework-level conventions for data fetching, auth, or APIs.

### Neutral

- The choice does not prevent adding a backend later; it only defines the current frontend.
- TypeScript can be introduced incrementally in a future ADR.

## Related documents

- [System architecture](../system-architecture.md)
- [Frontend architecture](../../engineering/frontend-architecture.md)
- [Installation](../../getting-started/installation.md)
- [Build and deployment](../../deployment/build-and-deployment.md)
