# Review Checklist

Use this checklist when reviewing or preparing a pull request.

---

## Scope

- [ ] The change addresses one clear problem or issue.
- [ ] The pull request description explains what changed and why.
- [ ] Unrelated refactors are excluded.
- [ ] New files are necessary.
- [ ] No generated files, `node_modules/`, or `dist/` are committed.
- [ ] No secrets, tokens, or private data are included.

---

## Correctness

- [ ] The implementation matches the stated behaviour.
- [ ] Route changes are intentional and documented.
- [ ] Redirects still behave as documented.
- [ ] No placeholder capability is described as implemented.
- [ ] Content claims are accurate.
- [ ] Edge cases are considered (trailing slash, unknown route, clipboard denial).

---

## Build and CI

- [ ] `npm run build` succeeds locally.
- [ ] `package-lock.json` is updated if dependencies changed.
- [ ] CI passes.
- [ ] New scripts are documented.
- [ ] New environment variables are documented and safe for client exposure.

---

## UI and UX

- [ ] Layout works at desktop and mobile widths.
- [ ] Tested at the documented breakpoints: 850, 800, 700, 650, 600.
- [ ] No unintended layout shift or overlap.
- [ ] Hover and focus states are clear.
- [ ] Loading, empty, and error states exist where relevant.
- [ ] Copy and status labels are accurate.

---

## Accessibility

- [ ] Keyboard navigation works.
- [ ] Focus is visible.
- [ ] Interactive elements are native or fully accessible.
- [ ] Icons that are decorative are hidden where practical.
- [ ] Controls have accessible names.
- [ ] Reduced motion is respected.
- [ ] No colour-only state communication.
- [ ] Text remains readable when zoomed.

---

## Content and documentation

- [ ] Documentation is updated with the code change.
- [ ] Links resolve.
- [ ] Anchors resolve.
- [ ] Mermaid diagrams render.
- [ ] Status labels are accurate.
- [ ] Commands are correct.
- [ ] File paths match.
- [ ] The documentation index is updated for new files.
- [ ] Screenshots are updated if the public UI changed.

---

## Dependencies

- [ ] A new dependency is necessary and maintained.
- [ ] Licence is compatible.
- [ ] Bundle impact is understood.
- [ ] No full-library import when a specific import is available.
- [ ] An ADR exists if the dependency changes the architecture.

---

## Security

- [ ] No secrets in code, docs, or screenshots.
- [ ] External links use safe attributes.
- [ ] No untrusted HTML rendering.
- [ ] No unsafe evaluation.
- [ ] No client-side secrets.
- [ ] Auth/persistence changes include a security design.

---

## Merge readiness

- [ ] CI is green.
- [ ] Review comments are resolved.
- [ ] The branch is up to date with `main`.
- [ ] The pull request title and description follow the template.
- [ ] The change is safe to roll back.
- [ ] The changelog is updated if the change is user-visible and the repository tracks it.

---

## Related documents

- [Coding standards](coding-standards.md)
- [Testing strategy](testing-strategy.md)
- [Accessibility](accessibility.md)
- [Pull request guidelines](../contributing/pull-request-guidelines.md)
- [CI/CD](../deployment/ci-cd.md)
