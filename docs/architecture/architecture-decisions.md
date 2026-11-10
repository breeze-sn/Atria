# Architecture Decision Records

## About this set

Architecture Decision Records (ADRs) capture structural decisions and their consequences. The records
below document the architecture that is **observable in the current repository**. They do not claim a
historical vote or a formal design meeting. Where a decision has known tradeoffs, those tradeoffs are
recorded.

Status values:

- **Accepted** — the decision is implemented and in use.
- **Accepted with tradeoffs** — implemented, but with a known limitation.
- **Proposed** — not implemented; recorded as future direction.

---

## Index

| ADR | Decision | Status |
|---|---|---|
| [0001](adr/0001-react-vite-spa.md) | Use React 19 with Vite 6 as a client-side SPA | Accepted |
| [0002](adr/0002-react-router-explore-shell.md) | Use React Router with a nested `/explore` shell | Accepted |
| [0003](adr/0003-docs-outside-router.md) | Render `/docs` through a pathname branch outside the router | Accepted with tradeoffs |
| [0004](adr/0004-handwritten-css-tokens.md) | Use hand-written global CSS with CSS custom properties | Accepted with tradeoffs |
| [0005](adr/0005-placeholder-implementation-briefs.md) | Represent unfinished Studio areas as implementation briefs | Accepted |
| [0006](adr/0006-static-content-no-persistence.md) | Keep all content static with no persistence in the current scope | Accepted |
| [0007](adr/0007-vercel-spa-rewrites.md) | Deploy as a static SPA on Vercel with rewrite fallback | Accepted |
| [0008](adr/0008-google-docs-product-design.md) | Keep product and design documents in Google Docs, engineering docs in the repo | Accepted with tradeoffs |

---

## Summary of consequences

### Strengths

- Extremely small operational surface.
- Fast local setup and low cognitive overhead.
- Clear separation between public landing, documentation hub, and Studio shell.
- Deployment works with static hosting only.
- Documentation can describe the system completely.
- Placeholder briefs make the next contribution surface explicit.

### Tradeoffs

- `/docs` behaves differently from every other route.
- Brand and footer markup are duplicated across pages.
- Global CSS will become harder to maintain as features grow.
- No automated tests or linting means regressions rely on manual review.
- Static content cannot be edited by non-developers.
- External Google Docs are outside repository version control and link checking.
- No persistence means the Studio cannot yet deliver its core product value.

### Triggers for revisiting

Revisit an ADR when:

- a backend or database is introduced;
- Studio editing becomes functional;
- a fourth page needs the same brand or footer component;
- the stylesheet exceeds a maintainable size;
- automated tests or linting are added;
- `/docs` needs search, filtering, or in-app rendering;
- shared team workspaces or authentication become requirements.

---

## How to add an ADR

1. Copy the structure of an existing record.
2. Use the next four-digit number.
3. State the context, decision, alternatives, and consequences.
4. Set a status: Proposed, Accepted, Accepted with tradeoffs, Superseded, or Rejected.
5. Link related documents.
6. Add the record to this index and to [`adr/README.md`](adr/README.md).
7. Update the architecture documents if the decision changes the described system.

ADRs should be short enough to read in review and specific enough to prevent re-litigation.
