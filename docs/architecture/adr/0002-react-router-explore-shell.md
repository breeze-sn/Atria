# ADR-0002: React Router and nested Explore shell

- **Status:** Accepted
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

The Studio needs persistent navigation while users move between Foundations, Tokens, and Components.
The public landing page also needs a stable route, and legacy `/studio` links should not break.

## Decision

Use React Router 7 with a `BrowserRouter` and a nested route tree:

- `/` renders the landing page;
- `/explore` renders `DashboardLayout`;
- `/explore/foundations`, `/explore/tokens`, and `/explore/components` render the Studio briefs;
- `/explore` index redirects to `foundations`;
- `/studio/*` redirects to `/explore`;
- unknown routes redirect to `/`.

The layout uses an `<Outlet />` so the header, sidebar, and footer persist while section content
changes. Sidebar links use `NavLink` for active-state styling.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Separate top-level pages per section | Loses the persistent Studio frame and shared sidebar |
| Hash routing | Unnecessary for static hosting with rewrite support |
| Full page navigation | Slower and loses the SPA model |
| A single Studio page with internal tabs | Would not provide shareable section URLs |
| A UI framework router | Adds a dependency without solving a current problem |

## Consequences

### Positive

- Shareable URLs for each Studio section.
- Persistent layout without re-rendering the full shell.
- Active navigation states derive from the URL.
- Redirects preserve old paths.
- Unknown paths fail safely to home.

### Negative

- `/explore/unknown` redirects to `/`, not to the Studio index.
- `/studio/*` redirects lose the requested section.
- Requires server-side rewrite configuration for direct URL loads.
- The router is not used for `/docs`, creating a mixed routing model.

### Neutral

- Route definitions are centralised in `src/App.jsx`, which keeps navigation easy to inspect.

## Related documents

- [Routing](../../engineering/routing.md)
- [Low-level design](../low-level-design.md)
- [Explore Studio feature](../../features/explore-studio.md)
- [ADR-0003: Docs outside router](0003-docs-outside-router.md)
- [ADR-0007: Vercel SPA rewrites](0007-vercel-spa-rewrites.md)
