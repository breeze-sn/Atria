# Features

This section describes the Atria product as implemented in the repository. Status labels distinguish working local interactions from future hosted capabilities.

## Status definitions

| Status | Meaning |
|---|---|
| **Implemented** | User-visible behaviour exists in the current codebase |
| **Implemented, local** | Works in the browser but is not shared or backed by a hosted service |
| **Implemented, limited** | A working example with a deliberately narrow scope |
| **Planned** | Product direction only; not shipped |

## Feature matrix

| Feature | Status | Route | Source |
|---|---|---|---|
| Public landing page and responsive visual system | Implemented | `/` | `src/App.jsx`, `src/index.css` |
| Documentation hub | Implemented | `/docs` | `src/Docs.jsx` |
| Explore Studio shell and navigation | Implemented | `/explore/*` | `src/layouts/DashboardLayout.jsx` |
| Foundations resource library | Implemented | `/explore/foundations` | `src/pages/Foundations.jsx` |
| Foundation presets and editable detail pages | Implemented, local | `/explore/foundations/:categoryId/:resourceId` | `src/pages/Foundations.jsx` |
| Foundation CSS and JSON export | Implemented, local | Foundation detail routes | `src/pages/Foundations.jsx` |
| Token search, filters, add/edit/delete | Implemented, local | `/explore/tokens` | `src/pages/Tokens.jsx` |
| Token CSS and JSON export | Implemented, local | `/explore/tokens` | `src/pages/Tokens.jsx` |
| Component library with live examples | Implemented, limited | `/explore/components` | `src/pages/Components.jsx` |
| React and CSS component snippets | Implemented | `/explore/components` | `src/pages/Components.jsx` |
| Local browser persistence | Implemented, local | Foundations and Tokens | `src/data/studioStore.js` |
| Hosted accounts, team sync, publishing | Planned | — | — |
| Database-backed resource API | Planned | — | Express and Prisma scaffolds only |
| Automated test runner and linting | Not configured | — | See [Testing strategy](../quality/testing-strategy.md) |

## Studio capabilities

### Foundations

The library currently contains 16 presets: seven colour palettes, three typography scales, three spacing scales, and three radius systems. Each preset opens a detail view with editable values, copy actions, and CSS/JSON exports. Changes are saved locally in the current browser and do not modify the starter preset.

### Tokens

The token workspace includes starter primitive and semantic tokens, search, group filters, inline editing, add/delete actions, individual value copying, and CSS/JSON exports. Token collections are stored in browser local storage.

### Components

The component library currently includes Button, Text Field, Status Badge, Content Card, Avatar, Navigation Bar, Modal Dialog, Dropdown Select, Tabs, and Checkbox. Each has a live example and React/CSS snippets. These examples are starting points and should be reviewed for production accessibility, validation, and application-specific behaviour.

## Important product boundaries

- Local storage is browser- and device-specific; it does not sync between people.
- There is no account system, hosted publishing, collaboration, or shared community catalogue yet.
- The Express server currently exposes a health-check route only.
- Prisma is an initial PostgreSQL configuration scaffold, not a connected product data layer.
- The component examples are copy-ready starting points, not a package or isolated code sandbox.

## Documents

| Document | Summary |
|---|---|
| [Landing page](landing-page.md) | Public site sections and interactions |
| [Explore Studio](explore-studio.md) | Workspace shell, routes, and navigation |
| [Design foundations](design-foundations.md) | Presets, editor behaviour, local persistence, and exports |
| [Design tokens](design-tokens.md) | Token editing, search, grouping, and export behaviour |
| [Component library](component-library.md) | Current component set, previews, snippets, and limitations |
| [Documentation hub](documentation-hub.md) | `/docs` content and outbound links |
| [API reference](api-reference.md) | Current API boundary and health endpoint |
