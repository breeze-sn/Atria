# ADR-0003: Documentation hub outside React Router

- **Status:** Accepted with tradeoffs
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

The documentation hub at `/docs` was built as a separate page tree. The application entry needs to
decide which tree to render. The documentation hub does not share the Studio layout and currently has
no nested routes of its own.

## Decision

In `src/main.jsx`, branch on the exact pathname:

```jsx
{window.location.pathname === '/docs' ? <Docs /> : <App />}
```

- `/docs` renders `src/Docs.jsx` directly.
- Every other path renders `src/App.jsx` and React Router.

The Docs page uses native anchors for home navigation and external anchors for Google Docs.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Add `/docs` as a React Router route | Would unify routing but require restructuring the entry and current page model |
| Give Docs its own router | Adds routing machinery for a single static page |
| Keep a server route for `/docs` | There is no server |
| Use hash routing for docs | Would change the public URL and add complexity |

## Consequences

### Positive

- Extremely simple entry logic.
- Docs can evolve independently from the Studio router.
- No route configuration needed for a static index page.
- The Vercel rewrite already makes direct `/docs` requests work.

### Negative

- `/docs` behaves differently from other routes.
- Navigation into and out of Docs causes full page loads.
- The exact comparison means `/docs/` is not matched and falls through to the app router, then to
  `/` via the catch-all.
- Future nested documentation routes would require reworking the branch.
- Documentation links and canonical URLs must account for the special case.

### Neutral

- The tradeoff is acceptable while Docs is a single static page.
- If Docs gains search, filtering, or nested pages, moving it into React Router should be reconsidered
  in a new ADR.

## Related documents

- [Routing](../../engineering/routing.md)
- [Documentation hub feature](../../features/documentation-hub.md)
- [ADR-0002: React Router and Explore shell](0002-react-router-explore-shell.md)
- [Low-level design](../low-level-design.md)
