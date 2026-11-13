<div align="center">
  <img src="docs/assets/atria-banner.svg" alt="Atria — an open-source design system studio" width="100%" />
</div>

<div align="center">

# Atria

### Design, structure, and consistency.

**An open-source design system studio for discovering, customising, and shipping reusable interface foundations.**

[Live studio](https://atriastudio.vercel.app) · [Explore resources](https://atriastudio.vercel.app/explore/foundations) · [Documentation](https://atriastudio.vercel.app/docs) · [Report a bug](https://github.com/breeze-sn/Atria/issues/new?template=bug_report.yml)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=141414)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-20201E?logo=github)](CONTRIBUTING.md)

</div>

---

## What is Atria?

Atria is a workspace for the small decisions that make products feel consistent. It brings design foundations, design tokens, and reusable UI patterns into one practical place.

The project is built for designers, developers, students, and product teams who want to move from visual decisions to implementation without losing context.

## Explore the studio

| Area | What you can do |
|---|---|
| **Foundations** | Browse 16 starter resources across colour, typography, spacing, and radius. Open a resource to customise values, copy them, and export CSS or JSON. |
| **Tokens** | Search, filter, add, edit, and remove primitive or semantic tokens. Copy individual values and export a token collection as CSS or JSON. |
| **Components** | Explore 10 interface patterns with live previews and copy-ready React and CSS examples. |

### Foundations resources

- **Colour:** Neutral & Minimal, Warm Earth, Cool & Calm, Soft Pastel, Vibrant Studio, Dark Interface, and Monochrome.
- **Typography:** Modern Sans, Editorial, and Compact UI.
- **Spacing:** Compact, Balanced, and Spacious.
- **Radius:** Soft Corners, Sharp & Precise, and Rounded.

Resource edits are stored in the current browser using local storage. They do not overwrite the starter presets and are not synchronised across devices or users.

### Component library

The current library includes Button, Text Field, Status Badge, Content Card, Avatar, Navigation Bar, Modal Dialog, Dropdown Select, Tabs, and Checkbox.

Examples are starting points, not a replacement for reviewing accessibility, validation, keyboard behaviour, and product-specific requirements before shipping.

## Product preview

- **Website:** https://atriastudio.vercel.app
- **Explore:** https://atriastudio.vercel.app/explore
- **Foundations:** https://atriastudio.vercel.app/explore/foundations
- **Tokens:** https://atriastudio.vercel.app/explore/tokens
- **Components:** https://atriastudio.vercel.app/explore/components

## Tech stack

- React 19 and React DOM
- Vite 6
- React Router
- JavaScript and CSS
- Phosphor Icons
- Browser local storage for local resource customisation
- Express health-check server scaffold
- Prisma configuration scaffold for PostgreSQL

The frontend is a client-rendered application. The current resource collections are local starter data; Atria does not yet provide hosted accounts, cloud sync, collaborative editing, or community publishing. The Express server currently exposes a health endpoint, and the Prisma schema is an initial database scaffold.

## Run locally

**Requirements:** Node.js 20+ and npm.

```bash
git clone https://github.com/breeze-sn/Atria.git
cd Atria
npm ci
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

To create and preview a production build:

```bash
npm run build
npm run preview
```

To run the optional health-check server in a second terminal:

```bash
npm run dev:server
```

The server listens on port 3000 by default. Check `/api/health`. Database-backed features are not yet connected; see `.env.example` before configuring the Prisma scaffold.

## Repository structure

```text
Atria/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Bug and feature request forms
│   ├── workflows/            # Build verification
│   └── PULL_REQUEST_TEMPLATE.md
├── docs/                     # Product, design, architecture, and contributor docs
├── prisma/                   # Initial Prisma schema
├── server/                   # Express API scaffold and health route
├── src/
│   ├── data/                 # Starter resource data and local persistence
│   ├── layouts/              # Explore Studio layout
│   ├── pages/                # Foundations, Tokens, Components, Overview
│   ├── App.jsx
│   ├── Docs.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
└── vercel.json
```

## Quality checks

The GitHub Actions workflow installs the locked dependencies and runs the Vite production build on pushes and pull requests to `main`.

```bash
npm ci
npm run build
```

There is not yet a dedicated automated test runner or lint script. Please include reproducible manual verification steps in pull requests, especially for interactive changes and responsive layouts.

## Contributing

Atria welcomes contributions in product design, frontend engineering, accessibility, documentation, testing, and developer experience.

1. Read [CONTRIBUTING.md](CONTRIBUTING.md).
2. Check existing issues before starting work.
3. For substantial changes, open an issue to agree on scope.
4. Create a focused branch and make the change.
5. Run `npm ci` and `npm run build`.
6. Update documentation and include screenshots for visual changes.
7. Open a pull request using the repository template.

Good first contributions include improving keyboard accessibility, adding tests, refining mobile layouts, improving token validation, and expanding copy-ready component examples.

Please do not submit cosmetic commit or PR spam. Focused, reviewed changes are more useful to the project and its users.

## Roadmap

- [x] Foundations resource library and editable resource pages
- [x] Token collection with search, editing, and exports
- [x] Interactive component examples with React and CSS snippets
- [ ] Automated unit and browser tests
- [ ] Accessibility audit and component-level keyboard testing
- [ ] Shared resource publishing and version history
- [ ] Accounts, team workspaces, and cloud synchronisation
- [ ] Community-contributed resource collections

Roadmap items are intentions, not promises or shipped functionality. Follow the issue tracker for active work.

## License

Atria is released under the [MIT License](LICENSE).

---

<div align="center">

**Design with intention. Build with clarity. Document everything.**

If Atria is useful to you, consider starring the repository or contributing an improvement.

</div>
