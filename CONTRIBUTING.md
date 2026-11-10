# Contributing to Atria

Thank you for considering a contribution. Atria is an open-source design system studio built in public
as part of **NSoC Winter Edition 2026**.

This document is the short entry point. Detailed guidance lives in [`docs/contributing/`](docs/contributing/README.md).

---

## Code of conduct

All participation is covered by the [Code of Conduct](CODE_OF_CONDUCT.md). Be respectful, constructive,
and considerate.

---

## What you can contribute

- Bug fixes.
- Documentation improvements and corrections.
- Responsive and accessibility improvements.
- Visual system refinements.
- Implementations of the Studio briefs in [`src/pages/`](src/pages/).
- Automated tests, linting, and CI improvements.
- Issue reports with clear reproductions.

---

## Before you start

1. Check existing issues and pull requests.
2. For a new feature or large refactor, open an issue first.
3. Read the relevant documentation:
   - [Architecture](docs/architecture/README.md)
   - [Features](docs/features/README.md)
   - [Frontend architecture](docs/engineering/frontend-architecture.md)
   - [Coding standards](docs/quality/coding-standards.md)
4. Keep the change focused.

### Important project status

The **Foundations**, **Tokens**, and **Components** pages under `/explore` are currently
**implementation briefs**, not working editors. Do not describe them as complete. If you implement one,
update its status and documentation in the same pull request.

---

## Development setup

Prerequisites:

- Node.js 20 or newer
- npm
- Git

```bash
git clone https://github.com/<your-username>/Atria.git
cd Atria
npm install
npm run dev
```

There are **no environment variables** to configure.

---

## Verify your change

Minimum:

```bash
npm run build
```

Then perform the relevant manual checks from
[Testing strategy](docs/quality/testing-strategy.md).

There is currently no automated test suite or lint script. CI runs the production build only.

---

## Contribution workflow

1. Fork the repository.
2. Create a focused branch.
3. Make the change.
4. Run `npm run build`.
5. Update documentation.
6. Commit with a clear message.
7. Open a pull request against `main`.
8. Respond to review.

Full workflow: [Contribution workflow](docs/contributing/contribution-workflow.md)

---

## Pull request format

Use Conventional Commits style for titles:

```text
docs: redesign README and expand documentation library
feat(studio): add token group navigation
fix(routing): handle trailing slash on /docs
```

Use the repository pull request template. Include:

- summary;
- related issue;
- type of change;
- what changed;
- how to verify;
- screenshots for visual changes;
- checklist.

Full guidance: [Pull request guidelines](docs/contributing/pull-request-guidelines.md)

---

## Coding standards

- Match the surrounding file style.
- Use function components and local state.
- Reuse existing CSS classes and prefixes.
- Keep accessibility and reduced motion intact.
- Do not introduce dependencies without justification.
- Do not claim unimplemented functionality.
- Do not commit `node_modules/` or `dist/`.
- Do not add secrets.

Full guidance: [Coding standards](docs/quality/coding-standards.md)

---

## Documentation contributions

Documentation is a first-class contribution.

- The code is the source of truth.
- Label status as Implemented, Placeholder, or Planned.
- Verify every link and anchor.
- Use Mermaid for diagrams.
- Update the documentation index.
- Do not fabricate screenshots or product claims.

Full guidance: [Documentation guidelines](docs/contributing/documentation-guidelines.md)

---

## Security

Do not open a public issue for a security vulnerability. Follow [SECURITY.md](SECURITY.md).

---

## Licence

By contributing, you agree that your contribution is licensed under the repository's
[MIT License](LICENSE).

---

## Questions

Open a GitHub issue with the `question` label if available, or comment on the relevant issue or pull
request. Please keep discussions focused and public unless the topic is security-sensitive.

Thank you for helping make Atria better.
