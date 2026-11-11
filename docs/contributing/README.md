# Contributing

This section explains how to contribute to Atria: the workflow, pull request format, debugging
guidance, and documentation standards.

Start with the root [CONTRIBUTING.md](../../CONTRIBUTING.md) for the short version, then use these
documents for detail.

---

## Documents

| Document | Purpose |
|---|---|
| [Contribution workflow](contribution-workflow.md) | Fork, branch, commit, push, and open a PR |
| [Pull request guidelines](pull-request-guidelines.md) | Required PR format and checklist |
| [Debugging](debugging.md) | Common local, routing, and interaction problems |
| [Documentation guidelines](documentation-guidelines.md) | Accuracy, status labels, links, diagrams |

---

## Ways to contribute

- Fix a bug.
- Improve documentation accuracy and navigation.
- Improve responsive behaviour.
- Improve accessibility.
- Refine the visual system.
- Implement a Studio brief with a clear data model and tests.
- Add automated tests or linting.
- Report an issue with a clear reproduction.

---

## Before you start

1. Check existing issues and pull requests.
2. Open an issue for a new feature or a large refactor.
3. Read the relevant architecture and feature documentation.
4. Keep the change focused.
5. Verify the build.

---

## Quality expectations

- `npm run build` must succeed.
- Manual checks must match the change.
- Documentation must be updated with code changes.
- Placeholder features must remain labelled as placeholders until implemented.
- Interactive elements must remain keyboard accessible.
- Responsive behaviour must be preserved.
- No secrets or private data.

---

## Code of conduct

All participation is covered by the [Code of Conduct](../../CODE_OF_CONDUCT.md).

---

## Related documents

- [Contribution workflow](contribution-workflow.md)
- [Pull request guidelines](pull-request-guidelines.md)
- [Testing strategy](../quality/testing-strategy.md)
- [Coding standards](../quality/coding-standards.md)
