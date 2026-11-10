# ADR-0005: Implementation briefs for unfinished Studio areas

- **Status:** Accepted
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

Atria's core product value depends on functional Foundations, Tokens, and Components workspaces. The
repository is open for contribution, but the data models and workflows are not yet settled. Shipping
empty pages would provide no direction; hiding the sections would make the intended product unclear.

## Decision

Represent each unfinished Studio area with a structured **implementation brief**:

- a clear status label: `PLACEHOLDER · READY FOR CONTRIBUTION`;
- an explanation of what to build;
- a numbered task or stage list with expected outcomes;
- a developer-notes section covering data structure, validation, accessibility, persistence, and
  extension.

The briefs are static content. They do not include editors, forms, previews, persistence, or export
actions.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Hide empty sections | Loses the opportunity to communicate scope and invite contribution |
| Ship non-functional forms | Creates misleading UI and false expectations |
| Wait for a complete design | Blocks contribution and makes the product direction invisible |
| Build all three workspaces at once | Too large for the current project stage and unclear data model |

## Consequences

### Positive

- Contributors can see exactly what is expected.
- The product direction is visible without pretending it is complete.
- Scope can be discussed before implementation.
- Documentation can link to a concrete brief.
- Reviewers can compare implementations against stated outcomes.

### Negative

- Visitors may expect working editors and be disappointed.
- The briefs must be updated when implementation begins.
- There is a risk of the brief becoming stale or overly prescriptive.
- Placeholder copy increases the amount of content to maintain.

### Neutral

- Each brief is a starting point, not a final specification.
- When a workspace becomes functional, replace the placeholder status and update this ADR with a
  superseding record if the design changes materially.

## Related documents

- [Explore Studio](../../features/explore-studio.md)
- [Design foundations](../../features/design-foundations.md)
- [Design tokens](../../features/design-tokens.md)
- [Component library](../../features/component-library.md)
- [Roadmap](../../../README.md#roadmap)
