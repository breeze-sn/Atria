# Features

This section documents what Atria actually does today and what each Studio area is intended to become.

Status definitions:

| Status | Meaning |
|---|---|
| **Implemented** | The behaviour exists in the current codebase and is user-visible |
| **Implemented, limited** | The behaviour exists but is a demonstration, not a full product capability |
| **Placeholder** | A contributor-facing implementation brief exists; the product capability does not |
| **Not implemented** | No product capability exists |
| **Planned** | Direction only; nothing is built |

---

## Feature matrix

| Feature | Status | Route | Source |
|---|---|---|---|
| Public landing page | Implemented | `/` | `src/App.jsx` |
| Hero and workspace preview | Implemented | `/` | `src/App.jsx`, `src/index.css` |
| Principles ticker | Implemented | `/` | `src/App.jsx`, `src/index.css` |
| Foundation overview cards | Implemented (static) | `/` | `foundations` array in `src/App.jsx` |
| Component playground | Implemented, limited | `/` | `activeTab` state in `src/App.jsx` |
| Copy token demo | Implemented, limited | `/` | `copyToken` in `src/App.jsx` |
| Contact links | Implemented | `/` | `src/App.jsx` |
| Documentation hub | Implemented | `/docs` | `src/Docs.jsx` |
| Outbound document cards | Implemented | `/docs` | `groups` array in `src/Docs.jsx` |
| Explore Studio shell | Implemented | `/explore/*` | `src/layouts/DashboardLayout.jsx` |
| Studio sidebar navigation | Implemented | `/explore/*` | `sections` + `NavLink` |
| Foundations workspace | Placeholder | `/explore/foundations` | `src/pages/Foundations.jsx` |
| Tokens workspace | Placeholder | `/explore/tokens` | `src/pages/Tokens.jsx` |
| Components workspace | Placeholder | `/explore/components` | `src/pages/Components.jsx` |
| Design token export | Not implemented | — | Described as roadmap |
| Persistence | Not implemented | — | No storage layer |
| API | Not implemented | — | No server |
| Authentication | Not implemented | — | No auth |
| Automated tests | Not configured | — | No test runner |
| Linting | Not configured | — | No lint script |

---

## Documents

| Document | Status | Summary |
|---|---|---|
| [Landing page](landing-page.md) | Implemented | Every section, interaction, and limitation |
| [Explore Studio](explore-studio.md) | Implemented shell | Layout, sidebar, routes, placeholder model |
| [Design foundations](design-foundations.md) | Placeholder | What contributors are asked to build |
| [Design tokens](design-tokens.md) | Placeholder | Token model, groups, validation, exports |
| [Component library](component-library.md) | Placeholder | Registry, preview, and documentation direction |
| [Documentation hub](documentation-hub.md) | Implemented | Collections, external links, maintenance |
| [API reference](api-reference.md) | None | Confirms no API exists |

---

## Product intent vs. current state

Atria's long-term intent is a functional design-system workspace. Today it provides the frontend shell
and the product narrative, not the editing workflows.

The distinction matters for:

- **Documentation accuracy** — never claim exports, persistence, or editors exist.
- **Contribution scope** — Studio implementation is open work, not a bug fix.
- **Review expectations** — a placeholder improvement is different from a feature delivery.
- **Release notes** — do not list planned features as shipped.

For the direction behind each Studio area, read the individual briefs. For the architecture that will
support them, read [High-level design](../architecture/high-level-design.md).
