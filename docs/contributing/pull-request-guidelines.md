# Pull Request Guidelines

## 1. Purpose

A good pull request makes review fast, keeps the project stable, and leaves a useful record for future
maintainers.

This document defines the expected format and checklist for Atria pull requests.

---

## 2. Before opening a PR

- [ ] You have read the relevant documentation.
- [ ] The change is scoped to one problem.
- [ ] You have run `npm run build`.
- [ ] You have performed the relevant manual checks.
- [ ] You updated documentation for code changes.
- [ ] You did not commit `node_modules/` or `dist/`.
- [ ] You did not include secrets or private data.

---

## 3. PR title format

Use Conventional Commits style:

```text
type(scope): short summary
```

Examples:

```text
docs: redesign README and expand documentation library
fix(routing): handle trailing slash on /docs
feat(studio): add token group navigation
refactor(css): extract foundation card styles
test(tokens): add validation tests
chore(ci): add lint script
```

### Allowed types

| Type | Use |
|---|---|
| `feat` | User-facing functionality |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Internal restructuring without behaviour change |
| `test` | Tests |
| `chore` | Tooling, dependencies, maintenance |
| `perf` | Performance improvement |
| `ci` | CI configuration |

Keep the summary imperative and concise.

---

## 4. PR description template

```markdown
## Summary

Briefly describe what changed and why.

## Related issue

Closes #<issue-number>

## Type of change

- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactor
- [ ] Tests
- [ ] CI/tooling

## What changed

- ...
- ...

## How to verify

1. `npm install`
2. `npm run dev`
3. Open ...
4. Confirm ...

## Screenshots

Include before/after screenshots for visual changes.

## Checklist

- [ ] `npm run build` succeeds
- [ ] Relevant manual checks performed
- [ ] Documentation updated
- [ ] Links verified
- [ ] No unimplemented feature described as complete
- [ ] Responsive behaviour checked
- [ ] Keyboard and reduced-motion behaviour checked
- [ ] No secrets or private data
```

The repository also provides `.github/PULL_REQUEST_TEMPLATE.md` with this structure.

---

## 5. Scope

### Good PRs

- One concern.
- Small enough to review in one sitting.
- Clear rationale.
- Tests or manual evidence where applicable.
- Documentation in the same change.

### Avoid

- Mixing refactor with feature work.
- Reformatting unrelated files.
- Adding dependencies without justification.
- Changing public routes without documentation.
- Large UI changes without screenshots.
- Documentation that claims unimplemented features.

---

## 6. Documentation changes

For docs-only PRs:

- [ ] New files are linked from `docs/README.md`.
- [ ] Primary documents are linked from the root README.
- [ ] Relative links resolve.
- [ ] Anchors resolve.
- [ ] Status labels are accurate.
- [ ] Mermaid diagrams render.
- [ ] No broken images.
- [ ] Commands are accurate.
- [ ] File paths match the repository.

See [Documentation guidelines](documentation-guidelines.md).

---

## 7. Visual changes

Include:

- before and after screenshots;
- viewport widths used;
- notes about responsive behaviour;
- notes about reduced motion;
- notes about keyboard interaction.

If you add or replace assets in `docs/assets/screenshots/`, update `docs/assets/README.md` with
provenance.

---

## 8. Review expectations

Reviewers may ask for:

- narrower scope;
- a data model before a UI implementation;
- tests;
- an ADR for a structural change;
- updated documentation;
- removal of unverified claims;
- accessibility improvements.

Respond to comments or explain your reasoning. Do not resolve a comment without addressing it.

---

## 9. Merge conditions

A PR is mergeable when:

- CI is green;
- the build succeeds;
- the change is reviewed;
- documentation is accurate;
- no placeholder is misrepresented;
- the branch is up to date;
- no unresolved blocking comments remain.

---

## 10. Related documents

- [Contribution workflow](contribution-workflow.md)
- [Documentation guidelines](documentation-guidelines.md)
- [Review checklist](../quality/review-checklist.md)
- [Coding standards](../quality/coding-standards.md)
- [Testing strategy](../quality/testing-strategy.md)
