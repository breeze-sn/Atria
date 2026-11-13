# API Reference

**Status:** Minimal health endpoint only
**Source:** `server/index.js`, `server/routes/health.js`

Atria includes an Express server scaffold. It currently exposes one health-check route; it is not yet a product API for foundations, tokens, components, accounts, or publishing.

## 1. Available endpoint

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Basic server health response |

The server uses Express, enables CORS, and parses JSON request bodies. The port is configured through `PORT` and defaults to `3000`.

Start it with:

```bash
npm run dev:server
```

Then request:

```bash
curl http://localhost:3000/api/health
```

Inspect `server/routes/health.js` for the exact response shape.

## 2. Not implemented

| Surface | Status |
|---|---|
| Foundations, tokens, and component resource endpoints | Not implemented |
| Authentication and user accounts | Not implemented |
| Authorisation and team workspaces | Not implemented |
| Database-backed persistence | Not implemented |
| Community publishing and resource discovery API | Not implemented |
| File uploads and asset storage | Not implemented |
| Webhooks, WebSockets, and GraphQL | Not implemented |

The Prisma schema currently declares a PostgreSQL datasource but does not define product models or migrations. The frontend's current customisation data is stored in browser local storage.

## 3. Before adding product endpoints

Define the use case, authentication and authorisation model, request/response contract, validation, database ownership, error format, rate limits, and tests before implementing a new endpoint. Keep the API contract versioned and documented in this repository.

## Related documents

- [Data flow](../architecture/data-flow.md)
- [System architecture](../architecture/system-architecture.md)
- [Security and authentication](../engineering/security-and-authentication.md)
- [Design foundations](design-foundations.md)
- [Design tokens](design-tokens.md)
