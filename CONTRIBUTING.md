# Contributing to Atria

Thank you for helping improve Atria. Contributions in frontend engineering, product design, accessibility, documentation, testing, and developer experience are welcome.

Atria is an open-source design system studio. The product currently includes a Foundations resource library, an editable token workspace, and a component library with live previews and copy-ready examples.

## Before you start

1. Search [existing issues](https://github.com/breeze-sn/Atria/issues) and pull requests to avoid duplicated work.
2. For a new feature, architectural change, or broad refactor, open an issue first and discuss the approach.
3. Read the [repository README](README.md) and the relevant documents in [docs/](docs/README.md).
4. Keep pull requests focused. One coherent change is easier to review, test, and maintain.

## What you can contribute

- Bug fixes and interaction improvements.
- Accessible, keyboard-friendly components and patterns.
- Better responsive behaviour and mobile layouts.
- Foundations, token, and component resources that solve real interface needs.
- React and CSS examples with clear usage guidance.
- Automated tests, linting, and CI improvements.
- Documentation corrections and contributor experience improvements.

## Development setup

Requirements: Node.js 20 or newer, npm, and Git.

```bash
git clone https://github.com/<your-username>/Atria.git
cd Atria
npm ci
npm run dev
```

To run the optional Express health-check server, use a second terminal:

```bash
npm run dev:server
```

The server uses port 3000 by default and exposes `/api/health`. The Prisma/PostgreSQL configuration is scaffolding; database-backed product functionality is not yet connected.

## Verify your change

Before opening a pull request, run:

```bash
npm ci
npm run build
```

The GitHub Actions workflow runs the production build for pushes and pull requests targeting `main`. A dedicated automated test runner and lint script are not configured yet, so include exact manual verification steps for the behaviour you changed.

For UI changes, check:
- desktop and narrow mobile layouts;
- keyboard navigation and visible focus;
- labels and accessible names for controls;
- empty, error, disabled, and success states where relevant;
- clipboard and export behaviour;
- reduced-motion preferences if you add animation.

## Branches and commits

Create a focused branch from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b feat/short-description
```

Use clear commit messages. Conventional Commit prefixes are encouraged:

```text
feat(foundations): add accessible palette contrast checks
fix(tokens): validate exported custom property names
docs: clarify local resource persistence
test(components): cover dialog keyboard interactions
```

## Pull requests

Open a pull request against `main` and use the repository pull request template. Include:

- a concise summary and motivation;
- the related issue, if one exists;
- screenshots or a short recording for visual changes;
- exact setup and verification steps;
- known limitations or follow-up work.

Keep changes proportionate and avoid unrelated formatting churn. Do not split one logical fix into multiple low-value pull requests.

## Product and code principles

- **Useful over decorative:** prioritise resources people can actually use in products.
- **Accessible by default:** semantic HTML, keyboard access, focus visibility, and meaningful labels.
- **Honest documentation:** distinguish implemented behaviour from planned work.
- **Small dependencies:** justify new packages and keep the stack maintainable.
- **Safe persistence:** never store secrets or sensitive data in browser local storage.
- **Respect the design language:** preserve Atria's minimal, considered visual direction.
- **No contribution farming:** do not create trivial commits, duplicate issues, or meaningless pull requests to inflate activity.

## Code of conduct

All participation is covered by the [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful, constructive, and considerate.

## Security

Do not disclose vulnerabilities in public issues. Follow [SECURITY.md](SECURITY.md).

By contributing, you agree that your contribution is licensed under the repository's [MIT License](LICENSE).

Thank you for making Atria better.
