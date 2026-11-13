# Atria Documentation

> The repository documentation library for contributors, developers, designers, and reviewers.
>
> **Status legend:** **Implemented** means the behaviour exists in the current codebase.
> **Placeholder** means a contributor-facing brief exists but the product capability does not.
> **Planned** means direction only — nothing is built yet.

This documentation describes the Atria repository as it exists today. It does not describe planned
functionality as if it were complete. If a capability is not implemented, it is labelled clearly.

---

## Start here

Choose the path that matches what you need.

| I want to… | Read this |
|---|---|
| Understand what Atria is and whether it is ready to use | [Project README](../README.md) |
| Understand the system before changing it | [System architecture](architecture/system-architecture.md) |
| Run the app locally | [Installation](getting-started/installation.md) |
| Make my first contribution | [Contribution workflow](contributing/contribution-workflow.md) |
| Know exactly what is implemented | [Feature overview](features/README.md) |
| Work on the Foundations, Tokens, or Components Studio area | [Explore Studio](features/explore-studio.md) |
| Review a pull request | [Pull request guidelines](contributing/pull-request-guidelines.md) |
| Write or update documentation | [Documentation guidelines](contributing/documentation-guidelines.md) |
| Understand deployment | [Build and deployment](deployment/build-and-deployment.md) |
| Report a security issue | [Security policy](../SECURITY.md) |

### Recommended reading paths

**New contributor**

1. [README](../README.md)
2. [Installation](getting-started/installation.md)
3. [Local development](getting-started/local-development.md)
4. [Project structure](#repository-structure)
5. [Contribution workflow](contributing/contribution-workflow.md)
6. [Coding standards](quality/coding-standards.md)

**Frontend developer**

1. [System architecture](architecture/system-architecture.md)
2. [High-level design](architecture/high-level-design.md)
3. [Low-level design](architecture/low-level-design.md)
4. [Frontend architecture](engineering/frontend-architecture.md)
5. [Routing](engineering/routing.md)
6. [Styling and design tokens](engineering/styling-and-design-tokens.md)
7. [State management](engineering/state-management.md)
8. [Testing strategy](quality/testing-strategy.md)

**Designer or product contributor**

1. [Project overview](../README.md#project-overview)
2. [Feature overview](features/README.md)
3. [Landing page](features/landing-page.md)
4. [Design foundations](features/design-foundations.md)
5. [Design tokens](features/design-tokens.md)
6. [Component library](features/component-library.md)
7. [Accessibility](quality/accessibility.md)

**Maintainer or reviewer**

1. [Architecture decisions](architecture/architecture-decisions.md)
2. [Application workflows](engineering/application-workflows.md)
3. [Error handling](engineering/error-handling.md)
4. [Security and authentication](engineering/security-and-authentication.md)
5. [CI/CD](deployment/ci-cd.md)
6. [Pull request guidelines](contributing/pull-request-guidelines.md)

---

## Documentation map

### Architecture

The architecture set explains what exists, how it is composed, and why it is built this way.

| Document | Status | Summary |
|---|---|---|
| [Architecture index](architecture/README.md) | Implemented docs | How the architecture set is organised |
| [System architecture](architecture/system-architecture.md) | Implemented | System context, runtime model, boundaries, quality attributes |
| [High-level design](architecture/high-level-design.md) | Implemented | Actors, capabilities, containers, lifecycle, evolution |
| [Low-level design](architecture/low-level-design.md) | Implemented | Files, data shapes, handlers, route definitions, CSS structure |
| [Component architecture](architecture/component-architecture.md) | Implemented | Component tree, responsibilities, duplication, extension points |
| [Data flow](architecture/data-flow.md) | Implemented | Static data, interaction flows, clipboard, external links, no persistence |
| [Architecture diagrams](architecture/diagrams.md) | Implemented | Six Mermaid diagram views in one gallery |
| [Architecture decision records](architecture/architecture-decisions.md) | Implemented docs | Index of eight ADRs with tradeoffs |
| [ADR directory](architecture/adr/README.md) | Implemented docs | Individual decision records |

### Getting started

| Document | Status | Summary |
|---|---|---|
| [Getting started index](getting-started/README.md) | Implemented docs | Setup sequence and prerequisites |
| [Installation](getting-started/installation.md) | Implemented | Clone, install, run, build, verify, troubleshoot |
| [Local development](getting-started/local-development.md) | Implemented | Dev loop, routes, HMR, common edits |
| [Environment configuration](getting-started/environment-configuration.md) | Implemented | No env vars required today; safe future conventions |

### Features

| Document | Status | Summary |
|---|---|---|
| [Feature overview](features/README.md) | Mixed | Implemented/placeholder/planned matrix |
| [Landing page](features/landing-page.md) | Implemented | Section-by-section product and implementation notes |
| [Explore Studio](features/explore-studio.md) | Implemented | Workspace shell, resource routes, and navigation |
| [Design foundations](features/design-foundations.md) | Implemented, local | Resource catalogue, editable presets, and exports |
| [Design tokens](features/design-tokens.md) | Implemented, local | Token editing, search, filters, and exports |
| [Component library](features/component-library.md) | Placeholder | Implementation brief for the component registry |
| [Documentation hub](features/documentation-hub.md) | Implemented | `/docs` collections and outbound documents |
| [API reference](features/api-reference.md) | None | Explicit confirmation that no API exists |

### Engineering

| Document | Status | Summary |
|---|---|---|
| [Engineering index](engineering/README.md) | Implemented docs | Engineering documentation map |
| [Frontend architecture](engineering/frontend-architecture.md) | Implemented | Entry points, components, CSS, imports, conventions |
| [Routing](engineering/routing.md) | Implemented | Route table, redirects, `/docs` branch, edge cases |
| [Styling and design tokens](engineering/styling-and-design-tokens.md) | Implemented | CSS variables, palette, type, layout, breakpoints |
| [State management](engineering/state-management.md) | Implemented | Local state, derived UI, URL state, absent global store |
| [Application workflows](engineering/application-workflows.md) | Implemented | Visitor, reader, explorer, and contributor journeys |
| [Error handling](engineering/error-handling.md) | Implemented | Clipboard fallback, route fallback, gaps |
| [Security and authentication](engineering/security-and-authentication.md) | Implemented | Client-only threat model and absent auth |
| [Performance](engineering/performance.md) | Measured | Build baseline and optimisation opportunities |

### Quality

| Document | Status | Summary |
|---|---|---|
| [Quality index](quality/README.md) | Implemented docs | Quality documentation map |
| [Testing strategy](quality/testing-strategy.md) | Weak / manual | No automated tests; production build and manual matrix |
| [Accessibility](quality/accessibility.md) | Partial | Present features, gaps, manual checks |
| [Coding standards](quality/coding-standards.md) | Implemented docs | Observed conventions and review rules |
| [Review checklist](quality/review-checklist.md) | Implemented docs | Practical merge checklist |

### Deployment

| Document | Status | Summary |
|---|---|---|
| [Deployment index](deployment/README.md) | Implemented docs | Deployment documentation map |
| [Build and deployment](deployment/build-and-deployment.md) | Implemented | Local build, Vercel config, SPA rewrites, live routes |
| [CI/CD](deployment/ci-cd.md) | Implemented | GitHub Actions behaviour, no deploy step, no tests |
| [Troubleshooting](deployment/troubleshooting.md) | Implemented docs | Build, preview, and hosting issues |

### Contributing

| Document | Status | Summary |
|---|---|---|
| [Contributing index](contributing/README.md) | Implemented docs | Contribution documentation map |
| [Contribution workflow](contributing/contribution-workflow.md) | Implemented docs | Fork, branch, commit, PR, sync |
| [Pull request guidelines](contributing/pull-request-guidelines.md) | Implemented docs | Required PR format and review checklist |
| [Debugging](contributing/debugging.md) | Implemented docs | Common local and runtime problems |
| [Documentation guidelines](contributing/documentation-guidelines.md) | Implemented docs | Accuracy, status labels, Mermaid, link verification |

### Assets

| Document | Status | Summary |
|---|---|---|
| [Assets index](assets/README.md) | Implemented docs | Provenance of the banner and screenshots |

---

## Repository structure

```text
docs/
├── architecture/
│   ├── adr/
│   ├── architecture-decisions.md
│   ├── component-architecture.md
│   ├── data-flow.md
│   ├── diagrams.md
│   ├── high-level-design.md
│   ├── low-level-design.md
│   ├── README.md
│   └── system-architecture.md
├── assets/
│   ├── screenshots/
│   ├── atria-banner.svg
│   └── README.md
├── contributing/
│   ├── README.md
│   ├── contribution-workflow.md
│   ├── debugging.md
│   ├── documentation-guidelines.md
│   └── pull-request-guidelines.md
├── deployment/
│   ├── README.md
│   ├── build-and-deployment.md
│   ├── ci-cd.md
│   └── troubleshooting.md
├── engineering/
│   ├── README.md
│   ├── application-workflows.md
│   ├── error-handling.md
│   ├── frontend-architecture.md
│   ├── performance.md
│   ├── routing.md
│   ├── security-and-authentication.md
│   ├── state-management.md
│   └── styling-and-design-tokens.md
├── features/
│   ├── README.md
│   ├── api-reference.md
│   ├── component-library.md
│   ├── design-foundations.md
│   ├── design-tokens.md
│   ├── documentation-hub.md
│   ├── explore-studio.md
│   └── landing-page.md
├── getting-started/
│   ├── README.md
│   ├── environment-configuration.md
│   ├── installation.md
│   └── local-development.md
├── quality/
│   ├── README.md
│   ├── accessibility.md
│   ├── coding-standards.md
│   ├── review-checklist.md
│   └── testing-strategy.md
└── README.md
```

---

## What is and is not documented

### Documented as implemented

- The Vite + React single-page application and its entry points.
- The `/docs` documentation hub and its six outbound document cards.
- The public landing page and its interactive playground and clipboard demo.
- The Explore Studio shell and its three placeholder sections.
- The CSS design system, responsive breakpoints, and reduced-motion handling.
- Routing, redirects, build scripts, CI, and Vercel configuration.

### Documented as placeholder or planned

- Foundation editing, previewing, and organisation.
- Token creation, grouping, validation, and export.
- Component publishing, discovery, and reuse.
- Persistence, API, database, authentication, and user accounts.
- Automated unit, integration, and end-to-end tests.

If you find documentation that contradicts the code, the code is the source of truth. Please open an
issue or submit a focused documentation fix.

---

## Documentation rules

1. **Verify before writing.** Read the relevant source file or configuration before describing it.
2. **Label status honestly.** Use *Implemented*, *Placeholder*, or *Planned*.
3. **Link relatively inside the repository.** Use repository paths for repo documents.
4. **Prefer Mermaid for diagrams.** Do not add binary diagram files when text will do.
5. **Keep the index current.** New documents must be added to this index and, where relevant, to the
   root README.
6. **Do not document secrets or private endpoints.**
7. **Do not claim tests, APIs, databases, or features that do not exist.**

See [Documentation guidelines](contributing/documentation-guidelines.md) for examples and review
criteria.

---

## Maintenance

Documentation is part of the product. When you change routing, styling, build configuration, or a
Studio section, update the matching document in the same pull request. Reviewers should treat stale
documentation as a defect.

For the web version of the documentation index, visit
[atriastudio.vercel.app/docs](https://atriastudio.vercel.app/docs). The web page links to product and
design documents hosted externally; this repository remains the source of truth for engineering
documentation.
