# ADR-0006: Static content and no persistence

- **Status:** Accepted
- **Date:** 2026-11-09
- **Deciders:** Atria maintainers (observable in repository)

## Context

The current Studio areas are implementation briefs, not data editors. The product has no backend,
database, authentication, or requirement yet for sharing design-system data between users. Adding
persistence before the data model is agreed would create migration and security obligations
prematurely.

## Decision

Keep all current content static:

- page content comes from constant arrays or JSX literals;
- there are no API calls, data loaders, or server actions;
- there is no browser storage of design-system data;
- there is no database, ORM, or schema;
- the only runtime data writes are local React state and the clipboard demo.

Any future persistence must arrive with an explicit data schema, validation rules, storage choice,
security model, and ADR.

## Alternatives considered

| Alternative | Why not chosen |
|---|---|
| Add a database now | No agreed schema or user model; adds operational burden |
| Use localStorage for drafts | Useful later, but premature before editor flows exist |
| Add an API-first backend | No consumer beyond a static frontend |
| Use a hosted headless CMS | Would not model design tokens or component registries well |
| Store data in Google Docs | Suitable for prose documents, not structured editable tokens |

## Consequences

### Positive

- Minimal security and privacy surface.
- No migration or backup obligations.
- Simple deployment and testing.
- Contributors can focus on UI and data-model design first.
- No risk of exposing user data.

### Negative

- Studio cannot deliver its core value yet.
- Content changes require code changes and deployment.
- No user accounts, sharing, or collaboration.
- Every future persistence decision is still open.

### Neutral

- The static architecture is a valid foundation for later incremental persistence.
- The token brief already proposes a schema direction; that proposal is not an implementation.

## Related documents

- [Data flow](../data-flow.md)
- [API reference](../../features/api-reference.md)
- [Security and authentication](../../engineering/security-and-authentication.md)
- [Design tokens](../../features/design-tokens.md)
- [System architecture](../system-architecture.md)
