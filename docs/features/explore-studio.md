# Explore Studio

**Status:** Implemented workspace and resource areas
**Routes:** `/explore`, `/explore/foundations/*`, `/explore/tokens`, `/explore/components`
**Sources:** `src/layouts/DashboardLayout.jsx`, `src/pages/*.jsx`, `src/App.jsx`

Explore Studio is the product workspace for Atria's foundations, tokens, and component examples.

## 1. Workspace layout

| Element | Behaviour |
|---|---|
| Header | Atria brand link and GitHub repository CTA |
| Sidebar | Foundations, Tokens, and Components navigation |
| Content area | Renders the selected section through React Router's `Outlet` |
| Footer | Project links and documentation |
| Active state | Derived from the current route |
| Responsive layout | Sidebar adapts for narrow screens |

## 2. Routes

| Route | Result |
|---|---|
| `/explore` | Redirects to the Overview page |
| `/explore/foundations` | Foundations resource catalogue |
| `/explore/foundations/:categoryId/:resourceId` | Selected foundation resource editor |
| `/explore/tokens` | Editable token collection |
| `/explore/components` | Component catalogue and snippet previews |
| `/studio/*` | Redirects to `/explore` |
| Unknown route | Redirects to `/` |

## 3. Section responsibilities

| Section | Source | Current capability |
|---|---|---|
| Overview | `src/pages/Overview.jsx` | Workspace introduction and links to core areas |
| Foundations | `src/pages/Foundations.jsx` | Preset library, resource editor, local customisation, CSS/JSON export |
| Tokens | `src/pages/Tokens.jsx` | Search, group filters, add/edit/delete, copy, CSS/JSON export |
| Components | `src/pages/Components.jsx` | Ten live examples and copy-ready React/CSS snippets |

Read the [feature overview](README.md) and the section-specific documents for exact capability boundaries.

## 4. State and persistence

Foundations and Tokens use the `useStudioData` helper or resource-specific local-storage keys. This is local browser persistence, not a shared backend. Atria does not currently provide accounts, team workspaces, hosted publishing, or cross-device sync.

Component preview state is held in the page while it is open. It is not persisted as a published component record.

## 5. Adding a section

1. Create a page component in `src/pages/`.
2. Add a child route in `src/App.jsx`.
3. Add the navigation entry in `src/layouts/DashboardLayout.jsx`.
4. Reuse the existing visual language and ensure the layout works on narrow screens.
5. Add manual verification steps and tests when test tooling is available.
6. Update the relevant feature documentation and index.

## 6. Limitations

- No account system, permissions, or shared workspaces.
- No server-backed resource storage or community publishing.
- No automated browser test suite yet.
- Resource and token exports are client-side.
- Component snippets are examples, not an installable component package.

## Related documents

- [Feature overview](README.md)
- [Design foundations](design-foundations.md)
- [Design tokens](design-tokens.md)
- [Component library](component-library.md)
- [Routing](../engineering/routing.md)
- [State management](../engineering/state-management.md)
