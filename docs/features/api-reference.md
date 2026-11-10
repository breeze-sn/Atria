# API Reference

**Status:** No API exists
**Last verified against:** current repository

Atria has **no API** today. This page exists to make that explicit so contributors and integrators do
not look for endpoints, authentication flows, or data contracts that are not there.

---

## 1. Current integration surface

| Surface | Exists | Notes |
|---|---|---|
| REST API | No | No server application |
| GraphQL API | No | No server application |
| RPC API | No | No server application |
| Server actions | No | No server |
| Data loaders | No | No data fetching |
| Webhooks | No | No integrations |
| Authentication | No | No accounts or tokens |
| Database | No | No persistence |
| File uploads | No | No storage |
| Token export endpoint | No | Export is planned only |
| Component registry endpoint | No | Registry is planned only |

---

## 2. What the frontend actually does

The application is entirely client-side:

- reads static arrays and JSX at build time;
- uses React Router for `/explore/*`;
- branches on `/docs` for the documentation hub;
- writes one literal string to the clipboard on user action;
- opens external links in new tabs.

There are no `fetch`, `XMLHttpRequest`, Axios, WebSocket, or server-sent event calls in the source.

---

## 3. External URLs in the repository

The frontend links to external services. These are navigational links, not API integrations.

| Destination | Where | Purpose |
|---|---|---|
| `https://github.com/breeze-sn/Atria` | Navigation, footers | Repository |
| `https://atriastudio.vercel.app` | README | Live deployment |
| Google Docs URLs | `src/Docs.jsx` | Product/design documents |
| Google Fonts | `index.html` | Webfonts |
| LinkedIn, GitHub, personal site, email | `src/App.jsx` contact section | Public contact links |

---

## 4. If an API is introduced

An API should not be added implicitly. Before implementation, define and document:

1. **Purpose** — what data or operation requires a server.
2. **Authentication** — who can call it and how identity is established.
3. **Authorisation** — what each caller may read or write.
4. **Contract** — endpoints, payloads, status codes, and error shapes.
5. **Validation** — input and output rules.
6. **Persistence** — database schema, migrations, ownership, and deletion.
7. **Rate limiting and abuse protection** — if exposed publicly.
8. **Observability** — logs, metrics, and error reporting.
9. **Versioning** — how breaking changes are managed.
10. **Documentation** — an OpenAPI or equivalent specification plus examples.

The API documentation should live in this repository, ideally generated or validated from the contract.

---

## 5. Related documents

- [Data flow](../architecture/data-flow.md)
- [System architecture](../architecture/system-architecture.md)
- [Security and authentication](../engineering/security-and-authentication.md)
- [ADR-0006: Static content and no persistence](../architecture/adr/0006-static-content-no-persistence.md)
- [Design tokens](design-tokens.md)
