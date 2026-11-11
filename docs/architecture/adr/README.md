# Architecture Decision Records

This directory contains individual Architecture Decision Records (ADRs) for Atria. Each record
describes a structural decision, the context around it, alternatives considered, and consequences.

Records describe the repository as it exists. They are not a promise that no better approach exists.

---

## Records

| ADR | Title | Status |
|---|---|---|
| [0001](0001-react-vite-spa.md) | React and Vite single-page application | Accepted |
| [0002](0002-react-router-explore-shell.md) | React Router and nested Explore shell | Accepted |
| [0003](0003-docs-outside-router.md) | Documentation hub outside React Router | Accepted with tradeoffs |
| [0004](0004-handwritten-css-tokens.md) | Hand-written global CSS with custom properties | Accepted with tradeoffs |
| [0005](0005-placeholder-implementation-briefs.md) | Implementation briefs for unfinished Studio areas | Accepted |
| [0006](0006-static-content-no-persistence.md) | Static content and no persistence | Accepted |
| [0007](0007-vercel-spa-rewrites.md) | Vercel static hosting with SPA rewrites | Accepted |
| [0008](0008-google-docs-product-design.md) | Google Docs for product and design, repo for engineering | Accepted with tradeoffs |

---

## Status definitions

| Status | Meaning |
|---|---|
| Proposed | Undecided or not implemented; recorded for discussion |
| Accepted | Implemented and current |
| Accepted with tradeoffs | Implemented, with known limitations |
| Rejected | Considered and not adopted |
| Superseded | Replaced by a later record |

---

## Template

```markdown
# ADR-XXXX: Title

- **Status:** Proposed | Accepted | Accepted with tradeoffs | Rejected | Superseded by ADR-YYYY
- **Date:** YYYY-MM-DD
- **Context:** One paragraph
- **Decision:** One paragraph
- **Alternatives considered:** Bullet list
- **Consequences:** Positive, negative, neutral
- **Related documents:** Links
```

---

## Index

See the [architecture decisions summary](../architecture-decisions.md) for a grouped overview and
triggers for revisiting decisions.
