# Changelog

All notable changes to Atria are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Because Atria is pre-1.0, minor versions may include breaking changes.

---

## [Unreleased]

### Added

- Complete documentation library under `docs/`:
  - architecture and architecture decision records;
  - getting started and environment configuration;
  - feature references and implementation status;
  - frontend engineering, routing, styling, state, workflows, error handling, security, and
    performance;
  - testing strategy, accessibility, coding standards, and review checklist;
  - build, deployment, CI/CD, and troubleshooting;
  - contribution, pull request, debugging, and documentation guidelines.
- Root project files: `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and this changelog.
- Pull request template in `.github/`.
- Documentation assets: animated SVG banner and real product screenshots.

### Changed

- Redesigned the root `README.md` with a visual hero, badges, verified feature status, screenshots,
  architecture diagrams, and links to the documentation.
- Corrected project claims to match the implementation: no Tailwind, no Express, no PostgreSQL, no
  Prisma, and no Vitest/Playwright test suite.
- Clarified that the Explore Studio Foundations, Tokens, and Components pages are implementation
  briefs rather than working editors.

### Fixed

- Documented the exact `/docs` route behaviour, including the trailing-slash redirect to `/`.
- Documented the clipboard demonstration's lack of error feedback when permission is denied.

---

## [0.1.0] - 2026-11-03

### Added

- Vite + React 19 application shell.
- Landing page with hero, workspace preview, design language, token copy actions, Studio launch,
  Google Docs collection, and contact footer.
- Explore Studio shell with sidebar, mobile controls, breadcrumb, and footer.
- Foundations, Tokens, and Components implementation briefs.
- Documentation hub rendered at `/docs`.
- Hand-written CSS design token system with light and dark themes.
- Responsive layouts and reduced-motion support.
- Phosphor icon integration.
- Vercel deployment configuration with SPA rewrites.
- GitHub Actions workflow that installs dependencies and runs the production build.

### Notes

- No authentication, backend, database, API, persistence, token export, test suite, or lint script
  exists in this release.
- The Studio pages are placeholders prepared for contribution.

---

## Status labels

| Label | Meaning |
|---|---|
| Added | New capability or content |
| Changed | Behaviour or content change |
| Deprecated | Still present, planned for removal |
| Removed | Removed capability |
| Fixed | Bug fix |
| Security | Security-related change |

---

## Links

- [Unreleased diff](https://github.com/breeze-sn/Atria/compare/v0.1.0...HEAD)
- [v0.1.0](https://github.com/breeze-sn/Atria/releases/tag/v0.1.0)
