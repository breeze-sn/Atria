# Atria — Design System Studio

<p align="center">
  A collaborative workspace for creating, managing, and documenting design systems.
</p>

<p align="center">
  <strong>Design, structure, and consistency.</strong>
</p>

---

## Overview

Atria is an open-source design system workspace that bridges the gap between design and development. It provides a centralised environment to define design foundations, manage reusable UI components, document design decisions, and export developer-friendly design tokens.

Our goal is to make building and maintaining consistent design systems easier, more accessible, and collaborative.

## Target Users

- **UI/UX Designers** — Create and organise design foundations and reusable components.
- **Frontend Developers** — Access component specifications, design tokens, and developer-ready exports.
- **Design System Engineers** — Maintain and evolve scalable component libraries.
- **Students & Independent Creators** — Learn, experiment, and build structured design systems.
- **Product Teams & Startups** — Establish a consistent visual language across products.

## Core Features

- **Design Foundations:** Define colour palettes, typography, spacing, sizing, and other visual foundations.
- **Design Token Management:** Create, organise, edit, and manage reusable design tokens.
- **Component Library:** Build and manage reusable UI components with variants and interaction states.
- **Live Previews:** Preview components and visual changes in real time.
- **Theme Customisation:** Explore themes, colour modes, and styling configurations.
- **Documentation:** Maintain structured documentation and component usage guidelines.
- **Export & Integration:** Export design tokens and configurations in formats such as CSS variables and JSON.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend framework |
| JavaScript (ES6+) | Primary programming language |
| Vite | Development and build tooling |
| Tailwind CSS | Styling |
| Radix UI | Accessible UI primitives |
| Phosphor Icons | Icon library |
| Node.js | Backend runtime |
| Express.js | API development |
| PostgreSQL | Database |
| Prisma | Database ORM |
| Vitest | Unit testing |
| Playwright | End-to-end testing |

## Project Goals

Atria aims to:

- Simplify the creation and maintenance of design systems.
- Bridge the gap between design and frontend development.
- Encourage component reusability and visual consistency.
- Make design tokens and documentation easier to manage.
- Build an extensible, community-driven open-source platform.

## Contributing

Contributions are welcome!

Whether you're a designer, frontend developer, backend developer, or someone interested in improving developer experience, there's room to contribute.

You can contribute through:

- Developing new features and UI components.
- Improving the user experience and interface.
- Building design token management workflows.
- Improving documentation.
- Writing tests and fixing bugs.
- Suggesting features and reporting issues.

Please check the contribution guidelines before submitting a pull request.

## Documentation

Documentation is maintained in the repository `docs/` folder and on the [Atria documentation page](https://atriastudio.vercel.app/docs).

Contributors and developers should refer to either location for product context, design system guidelines, architecture notes, developer setup, and other project documentation. The documentation library is being expanded as the project develops.

## Backend Setup (Express + Prisma)

The repository now includes a backend workspace in `server/` and Prisma configuration in `prisma/`.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and set your PostgreSQL connection string:

```bash
cp .env.example .env
```

Required values:

- `DATABASE_URL` (PostgreSQL connection string)
- `PORT` (optional, defaults to `3000`)

### 3. Run development servers

Run frontend and backend in separate terminals:

```bash
npm run dev:client
npm run dev:server
```

Health check endpoint:

- `GET http://localhost:3000/api/health`

## License

Atria is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the software, subject to the terms of that license.

---

## Project Status

Atria is currently in its early development stage as part of **NSoC Winter Edition 2026**.

Features, architecture, and implementation details may evolve as the project develops.

---

<p align="center">
  Built with care by the Atria community.
</p>
