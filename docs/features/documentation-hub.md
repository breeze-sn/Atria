# Documentation Hub

**Status:** Implemented
**Route:** `/docs`
**Source:** `src/Docs.jsx`, entry branch in `src/main.jsx`

The documentation hub is a public index of Atria's product, design, and engineering documents. It is a
static page with outbound links to Google Docs.

---

## 1. What exists

```mermaid
flowchart TD
  Docs[/docs] --> Hero[Hero and index metadata]
  Docs --> Product[01 Product]
  Docs --> Design[02 Design]
  Docs --> Engineering[03 Engineering]
  Product --> PRD[Product Requirements Document]
  Product --> Overview[Product Overview]
  Design --> Guidelines[Design System Guidelines]
  Design --> ComponentDocs[Component Documentation]
  Engineering --> Architecture[Architecture Notes]
  Engineering --> DeveloperNotes[Developer Notes]
```

| Element | Behaviour |
|---|---|
| Header | Brand link to `/`, nav links, GitHub CTA |
| Back link | Returns to `/` |
| Hero | Eyebrow, headline, description, index metadata |
| Collections | Three groups: Product, Design, Engineering |
| Document cards | Open external Google Docs in a new tab |
| Footer | Brand, statement, GitHub CTA, return-home link |

### Header and metadata

- Eyebrow: `THE KNOWLEDGE SPACE`.
- Headline: **Made to be understood.**
- Description: a growing library of product thinking, design decisions, and technical documentation.
- Meta: `DOCUMENTATION / INDEX` and `03 COLLECTIONS · 06 DOCUMENTS`.
- Content heading: `06 ENTRIES / IN PROGRESS`.

### Collections

| Number | Collection | Description | Documents |
|---|---|---|---|
| 01 | Product | Purpose, scope, and direction | Product Requirements Document; Product Overview |
| 02 | Design | Visual language and reusable interface decisions | Design System Guidelines; Component Documentation |
| 03 | Engineering | How the product is structured, built, and maintained | Architecture Notes; Developer Notes |

### Cards

Each card contains:

- an icon;
- a type label (`PRD`, `OVERVIEW`, `DESIGN SYSTEM`, `REFERENCE`, `ARCHITECTURE`, `DEVELOPER GUIDE`);
- a title;
- a description;
- a status label (`OPEN DOCUMENT`);
- an external-link arrow.

### External links

| Document | Destination |
|---|---|
| Product Requirements Document | Google Docs |
| Product Overview | Google Docs |
| Design System Guidelines | Google Docs |
| Component Documentation | Google Docs |
| Architecture Notes | Google Docs |
| Developer Notes | Google Docs |

All cards use `target="_blank"` and `rel="noreferrer"`, and have an `aria-label` describing the
outbound action.

---

## 2. How it is rendered

`src/main.jsx` checks `window.location.pathname === '/docs'` and renders `Docs` directly, outside the
React Router tree.

Consequences:

- `/docs` works on direct load and refresh because Vercel rewrites all paths to `index.html`.
- Navigation from Docs back to `/` uses a native anchor and causes a full page load.
- `/docs/` with a trailing slash is not matched by the branch and falls through to the app router,
  which redirects to `/`.
- The page does not define nested routes, search, or filters.

See [Routing](../engineering/routing.md) and
[ADR-0003](../architecture/adr/0003-docs-outside-router.md).

---

## 3. Relationship to repository docs

| Content type | Location | Source of truth |
|---|---|---|
| Product requirements and overview | Google Docs | Google Docs |
| Design system guidelines and component documentation | Google Docs | Google Docs |
| Engineering, architecture, setup, contribution | `docs/` in this repository | Repository |
| Public entry point | `/docs` web page | Repository (links) |

The two systems are intentionally connected but not mirrored. Google Docs links can change access
settings or move; repository docs are versioned with the code.

---

## 4. Maintenance

### Adding a document to the hub

1. Add an item to the appropriate `groups` entry in `src/Docs.jsx`.
2. Provide an icon, title, type, status, URL, and description.
3. Update the hard-coded count strings if the number changes:
   - `03 COLLECTIONS · 06 DOCUMENTS`;
   - `06 ENTRIES / IN PROGRESS`.
4. Verify the external URL opens without an unexpected permission prompt.
5. Check the card layout on desktop and mobile.

### Removing or replacing a document

1. Remove the item from `groups`.
2. Update the counts.
3. Check for links to the removed document in this repository.
4. If the content moved into the repository, add a relative link instead.

### Adding a repository document

1. Add the file under the appropriate `docs/` directory.
2. Link it from [`docs/README.md`](../README.md).
3. Link it from the root README documentation index if it is a primary entry.
4. Follow [Documentation guidelines](../contributing/documentation-guidelines.md).

---

## 5. Limitations

- External documents may be private or unavailable.
- No in-app document rendering.
- No search or filtering.
- No automatic link checking.
- Counts are hard-coded and can drift from the data.
- The page is outside React Router, so navigation behaviour differs from the Studio.
- Google Docs content is not versioned with the repository.

---

## 6. Accessibility notes

Present:

- Semantic `main`, `nav`, `section`, `footer`.
- Cards are anchors with `aria-label`.
- Focus-visible outline on cards.
- Descriptive document titles.

Gaps:

- External-link behaviour is conveyed visually with an arrow but not announced as "opens in a new
  window" in text.
- Contrast has not been formally audited.
- No automated accessibility tests.

---

## 7. Related documents

- [Feature overview](README.md)
- [Routing](../engineering/routing.md)
- [Documentation index](../README.md)
- [Documentation guidelines](../contributing/documentation-guidelines.md)
- [ADR-0008: Google Docs and repository docs](../architecture/adr/0008-google-docs-product-design.md)
