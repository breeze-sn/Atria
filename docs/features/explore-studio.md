# Explore Studio

**Status:** Implemented shell; placeholder sections
**Routes:** `/explore`, `/explore/foundations`, `/explore/tokens`, `/explore/components`
**Sources:** `src/layouts/DashboardLayout.jsx`, `src/pages/*.jsx`, `src/App.jsx`

Explore Studio is the navigable workspace shell for Atria's design-system sections. It currently
provides the frame and the contributor briefs, not the editing capabilities.

---

## 1. What exists

```mermaid
flowchart LR
  Explore[/explore] --> Foundation[/explore/foundations]
  Explore --> Tokens[/explore/tokens]
  Explore --> Components[/explore/components]
  Legacy[/studio/*] -->|redirect| Explore
```

| Element | Behaviour |
|---|---|
| Header | Brand link to `/`, GitHub CTA |
| Sidebar | Three `NavLink` entries with icons and numbering |
| Content area | Renders the selected section through `<Outlet />` |
| Footer | Brand, statement, GitHub CTA, legal row |
| Active state | Derived from the current URL |
| Responsive layout | Sticky sidebar on desktop; stacked/horizontal nav on mobile |

### Route behaviour

| Route | Result |
|---|---|
| `/explore` | Redirects to `/explore/foundations` |
| `/explore/foundations` | Foundations brief |
| `/explore/tokens` | Tokens brief |
| `/explore/components` | Components brief |
| `/explore/unknown` | Redirects to `/` (catch-all) |
| `/studio/*` | Redirects to `/explore` |

---

## 2. What does not exist

The Studio does **not** provide:

- forms or editors for creating foundations, tokens, or components;
- saved data;
- data fetching or an API;
- token validation or export;
- component preview execution;
- user accounts or permissions;
- search, filtering, or publishing;
- collaboration.

Each section page is a static implementation brief. The status label
`PLACEHOLDER · READY FOR CONTRIBUTION` is accurate.

---

## 3. Layout anatomy

```text
explore-page
├── explore-header
│   └── nav.shell.explore-top-nav
│       ├── brand link
│       └── GitHub CTA
├── explore-workspace.shell
│   ├── aside.explore-sidebar
│   │   ├── "EXPLORE STUDIO" label
│   │   └── nav.explore-section-nav
│   │       └── NavLink × 3
│   └── main.explore-content
│       └── Outlet
└── footer.footer.explore-footer
```

### Sidebar

- Receives a static `sections` array.
- Each entry has `name`, `path`, `icon`, and `number`.
- `NavLink` applies `.active` when the route matches.
- On desktop, the sidebar is `position: sticky` with `top: 28px`.
- On mobile (`≤ 650px`), the sidebar becomes static and the section nav becomes horizontally
  scrollable.

### Content

- `.explore-content .studio-page` caps content width at 850px.
- The brief pages use the shared `.studio-*` classes.
- Content is not padded independently beyond the shell and layout spacing.

### Footer

- Reuses `.footer` styling with Explore overrides.
- Pushes to the bottom through the flex column page layout.
- Contains the same public links as the landing footer.

---

## 4. Section briefs

| Section | File | Status | Main content |
|---|---|---|---|
| Foundations | `src/pages/Foundations.jsx` | Placeholder | Colour, typography, spacing and layout brief |
| Tokens | `src/pages/Tokens.jsx` | Placeholder | Token structure, groups, edit/validate/export brief |
| Components | `src/pages/Components.jsx` | Placeholder | Anatomy, variants, preview, usage, reuse brief |

Each brief contains:

- an implementation-brief index label;
- a page heading and status badge;
- an intro paragraph;
- a "What to build" panel;
- a numbered task/stage/part list;
- developer notes.

Read the detailed briefs:

- [Design foundations](design-foundations.md)
- [Design tokens](design-tokens.md)
- [Component library](component-library.md)

---

## 5. How to add a section

1. Create a page component in `src/pages/`.
2. Add a child route under `/explore` in `src/App.jsx`.
3. Add an entry to `sections` in `src/layouts/DashboardLayout.jsx` with a Phosphor icon and number.
4. Reuse `.studio-page` or extract a shared brief layout if the pattern repeats.
5. Add the route to the manual test matrix.
6. Update this document and the [documentation index](../README.md).
7. If the section introduces data, add a schema and persistence design first.

---

## 6. Design decisions

- The Studio uses a compact sidebar while the landing page uses a horizontal nav. This keeps the
  workspace scannable without competing with the public marketing layout.
- The section pages are briefs rather than empty placeholders so contributors have direction.
- The shell does not own section state; each section can evolve independently.
- The current layout uses an `Outlet`, so the header, sidebar, and footer do not re-mount on section
  navigation.

See [ADR-0002](../architecture/adr/0002-react-router-explore-shell.md) and
[ADR-0005](../architecture/adr/0005-placeholder-implementation-briefs.md).

---

## 7. Limitations

- No persistence or data model.
- No UI for adding or editing items.
- No preview isolation or component execution.
- No export.
- No authentication or ownership.
- No automated tests for navigation or layout.

---

## 8. Related documents

- [Landing page](landing-page.md)
- [Design foundations](design-foundations.md)
- [Design tokens](design-tokens.md)
- [Component library](component-library.md)
- [Routing](../engineering/routing.md)
- [Component architecture](../architecture/component-architecture.md)
