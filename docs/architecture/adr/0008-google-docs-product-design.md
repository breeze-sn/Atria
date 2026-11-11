# ADR-0008: Google Docs for product and design, repository for engineering

- **Status:** Accepted with tradeoffs
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

Atria has two kinds of documentation:

1. **Product and design documents** — PRD, product overview, design system guidelines, component
   documentation.
2. **Engineering documentation** — setup, architecture, conventions, contribution workflow.

Product and design authors may prefer a familiar collaborative editor. Engineers need documentation
that lives with the code, participates in code review, and can be linked from pull requests.

## Decision

- Host product and design documents in Google Docs, surfaced through the `/docs` hub.
- Host engineering documentation in this repository under `docs/`.
- Link between the two where useful, but keep the repository as the source of truth for engineering
  guidance.
- Do not mirror full Google Docs content into the repository unless it is needed for code-level
  context.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Put all documentation in the repository | Poor collaborative editing for product/design authors |
| Put all documentation in Google Docs | Disconnected from code review and version history |
| Use a wiki | Another platform; less reviewable than repository docs |
| Use a documentation site generator | Adds build tooling before content is stable |
| Embed Google Docs in the app | Requires authentication, iframe permissions, and complex handling |

## Consequences

### Positive

- Product and design authors use a familiar editor.
- Engineering docs are versioned, reviewed, and deployed with the code.
- The `/docs` hub gives users one place to find both.
- No documentation build step is required.
- Relative links make engineering docs easy to navigate in GitHub and IDEs.

### Negative

- Two sources of truth for different content types.
- Google Docs links can break or require access permissions.
- Google Docs changes do not appear in repository history.
- Link checking must cover external URLs manually.
- Content can drift between the hub and the repository.

### Neutral

- The repository documentation index should state clearly which documents are external.
- If documentation grows significantly, a unified docs site may be worth reconsidering in a new ADR.

## Related documents

- [Documentation hub](../../features/documentation-hub.md)
- [Documentation index](../../README.md)
- [Documentation guidelines](../../contributing/documentation-guidelines.md)
- [Architecture decisions](../architecture-decisions.md)
