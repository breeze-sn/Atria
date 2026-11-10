# Testing Strategy

## 1. Current state

Atria has **no automated test suite**.

Verified facts:

- No `test` script exists in `package.json`.
- No Vitest, Jest, Playwright, Cypress, Testing Library, or similar package is installed.
- There are no test files in the repository.
- The CI workflow runs `npm install`, `npm run lint --if-present`, and `npm run build`.
- Because no `lint` script exists, the lint step is a no-op.

Earlier project notes mentioned Vitest and Playwright. They are **not present** in this codebase. This
document does not claim otherwise.

---

## 2. What is verified today

| Gate | Mechanism | Status |
|---|---|---|
| Dependency install | `npm install` locally and in CI | Enforced |
| Production build | `npm run build` locally and in CI | Enforced |
| Route rendering | Manual | Required for relevant changes |
| Interaction behaviour | Manual | Required for relevant changes |
| Responsive layout | Manual | Required for layout changes |
| Accessibility basics | Manual | Recommended for UI changes |
| Links | Manual | Required for docs changes |

---

## 3. Manual test matrix

Run this against `npm run dev` or, for production-specific behaviour, `npm run build && npm run preview`.

### 3.1 Routes

| Test | Expected |
|---|---|
| Open `/` | Landing page renders |
| Open `/docs` | Documentation hub renders |
| Open `/docs/` | Redirects to `/` (known current behaviour) |
| Open `/explore` | Redirects to `/explore/foundations` |
| Open `/explore/foundations` | Foundations brief renders |
| Open `/explore/tokens` | Tokens brief renders |
| Open `/explore/components` | Components brief renders |
| Open `/studio/anything` | Redirects to `/explore` |
| Open `/unknown` | Redirects to `/` |
| Refresh on a deep route in preview | Route still renders via SPA fallback |

### 3.2 Landing page interactions

| Test | Expected |
|---|---|
| Click each playground tab | Corresponding preview renders; selected tab styling updates |
| Keyboard activate tabs | Tabs activate via Enter/Space |
| Click copy token with permission | Label shows `COPIED`, then returns to `COPY` |
| Click copy token with permission denied | No false `COPIED`; page remains usable |
| Click internal anchor links | Page scrolls to the section |
| Click GitHub CTA | Opens repository in a new tab |
| Click contact links | Correct destinations open |
| Resize to mobile width | Nav links hide; hero stacks; preview compresses |

### 3.3 Documentation hub

| Test | Expected |
|---|---|
| Open `/docs` | Hero and three collections render |
| Card count | Six document cards |
| Click a card | Opens Google Docs in a new tab |
| Tab through cards | Focus-visible outline appears |
| Resize to mobile width | Collections and cards stack |
| Click back link | Returns to `/` |
| Click brand | Returns to `/` |

### 3.4 Explore Studio

| Test | Expected |
|---|---|
| Open `/explore` | Redirects to Foundations |
| Click each sidebar item | Correct brief renders |
| Active item | Matches the current URL |
| Resize to mobile width | Sidebar stacks; section nav scrolls horizontally |
| Footer links | Open correct destinations |
| Brand link | Returns to `/` |

### 3.5 Visual and motion

| Test | Expected |
|---|---|
| Hover buttons and cards | Transition without layout jump |
| Enable reduced motion | Transitions/animations effectively disabled |
| Check at 1440px, 1024px, 768px, 600px, 375px | Layout remains usable |
| Zoom to 200% | Content remains readable and reachable |

### 3.6 Console and network

| Test | Expected |
|---|---|
| Open each route | No JavaScript console errors |
| Check network panel | Only expected assets and fonts load |
| Offline after initial load | Page remains rendered; external links fail |

---

## 4. Documentation checks

For documentation changes:

- [ ] Every relative link resolves to an existing file.
- [ ] Every anchor in a table of contents resolves to a heading.
- [ ] Code blocks and commands are accurate.
- [ ] File paths match the repository.
- [ ] Status labels are correct.
- [ ] No unimplemented feature is described as complete.
- [ ] Mermaid diagrams render.
- [ ] External links use full URLs and are reachable.
- [ ] The documentation index is updated for new files.

---

## 5. Future test layers

These are recommendations, not current capabilities.

### Unit tests

Good first targets:

- token validation and reference resolution;
- foundation data transformations;
- export generation;
- utility functions once introduced.

Suggested tool: a Vite-native runner such as Vitest, if the team adopts it.

### Component tests

Good targets:

- playground tab switching;
- copy-token success and failure states;
- Studio brief rendering from data;
- future forms and validation.

Suggested tool: Testing Library with a DOM environment.

### End-to-end tests

Good targets:

- landing page navigation;
- `/docs` rendering;
- `/explore` redirects and sidebar navigation;
- future create/edit/save flows.

Suggested tool: Playwright, if the team adopts it.

### Accessibility tests

- automated checks for landmarks, labels, and contrast where possible;
- keyboard-only walkthroughs;
- screen-reader spot checks.

### Visual regression

- capture landing, docs, and Studio at documented breakpoints;
- compare against approved baselines.

### CI integration

A future CI pipeline could run:

```bash
npm ci
npm run lint
npm run test
npm run build
```

The current pipeline intentionally runs only what exists.

---

## 6. Adding tests

When adding a test framework:

1. Add an ADR describing the choice and scope.
2. Add the dependency and scripts to `package.json`.
3. Update CI.
4. Document the commands in this file and in the root README.
5. Keep tests deterministic and fast.
6. Avoid testing implementation details that are likely to churn.

---

## 7. Related documents

- [Quality overview](README.md)
- [Accessibility](accessibility.md)
- [Coding standards](coding-standards.md)
- [Review checklist](review-checklist.md)
- [CI/CD](../deployment/ci-cd.md)
- [Debugging](../contributing/debugging.md)
