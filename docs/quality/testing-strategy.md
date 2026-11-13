# Testing Strategy

## 1. Current state

Atria currently has no automated test runner or lint script. The enforced CI gate is a clean dependency install followed by a production build.

- `npm ci` installs the lockfile-defined dependency graph.
- `npm run build` verifies that Vite can compile the application.
- GitHub Actions runs these commands for pushes and pull requests targeting `main`.
- UI behaviour still needs focused manual verification.

## 2. Current quality gates

| Gate | Mechanism | Status |
|---|---|---|
| Dependency install | `npm ci` | Enforced in CI |
| Production build | `npm run build` | Enforced in CI |
| Routes and navigation | Manual checks | Required for relevant changes |
| Editor and export behaviour | Manual checks | Required for relevant changes |
| Responsive layout | Manual checks | Required for layout changes |
| Keyboard and accessibility | Manual checks | Required for interactive changes |
| Automated unit/component tests | Not configured | Future work |
| Linting and formatting | Not configured | Future work |

## 3. Manual test matrix

Run checks with `npm run dev`. For production routing, also run `npm run build && npm run preview`.

### Routes

| Test | Expected |
|---|---|
| Open `/` | Landing page renders |
| Open `/docs` | Documentation hub renders |
| Open `/explore` | Redirects to Overview |
| Open `/explore/foundations` | Foundations catalogue renders |
| Open `/explore/foundations/colour/warm-earth` | Warm Earth resource editor renders |
| Open `/explore/tokens` | Token workspace renders |
| Open `/explore/components` | Component library renders |
| Refresh a nested foundation route | Same resource renders after refresh |
| Open `/studio/anything` | Redirects to `/explore` |
| Open an unknown route | Redirects to `/` |

### Foundations

- [ ] Open each category and select a preset.
- [ ] Confirm the detail route reflects the selected resource.
- [ ] Edit a colour name and value; confirm the preview and HEX value update.
- [ ] Edit typography size and weight.
- [ ] Edit spacing and radius values.
- [ ] Add a colour and confirm it appears in the palette.
- [ ] Copy an individual value and the generated CSS.
- [ ] Export CSS and JSON; verify the downloaded contents.
- [ ] Refresh the page and confirm local edits persist.
- [ ] Reset and confirm the original preset values return.
- [ ] Confirm editing one preset does not change another preset.

### Tokens

- [ ] Search by token name, value, and description.
- [ ] Switch between All, Primitive, and Semantic filters.
- [ ] Edit a token name and value.
- [ ] Add and delete a token.
- [ ] Copy an individual value.
- [ ] Export CSS and JSON and inspect the contents.
- [ ] Refresh and confirm local collection changes persist.
- [ ] Reset and confirm the starter collection returns.

### Components

- [ ] Select all ten component entries.
- [ ] Confirm each entry displays its own preview and description.
- [ ] Test button variants and editable text.
- [ ] Test text-field input and error/disabled states.
- [ ] Open and close the modal using its controls and backdrop.
- [ ] Switch tabs, change the dropdown, and toggle the checkbox.
- [ ] Switch between React and CSS snippets.
- [ ] Copy snippets and confirm clipboard feedback.
- [ ] Check keyboard focus and narrow-screen layout.

### Responsive and accessibility checks

- [ ] Check at 1440px, 1024px, 768px, 600px, and 375px widths.
- [ ] Navigate using only the keyboard.
- [ ] Confirm visible focus for interactive controls.
- [ ] Confirm controls have accessible names and labels.
- [ ] Check text contrast and avoid relying on colour alone.
- [ ] Enable reduced motion and confirm animations are minimised.
- [ ] Zoom to 200% and confirm content remains reachable.

### General

- [ ] No unexpected console errors on changed routes.
- [ ] Clipboard failures do not show false success feedback.
- [ ] Internal and external links go to the expected destinations.
- [ ] Browser local-storage limitations are documented accurately.

## 4. Future automated test layers

Recommended first targets:

1. **Unit tests:** preset transformations, token naming, CSS/JSON export generation, and persistence helpers.
2. **Component tests:** palette editing, token filters, copy feedback, and modal interactions.
3. **End-to-end tests:** route navigation, deep-link refresh, resource edits, and export flows.
4. **Accessibility tests:** automated landmark/label checks plus keyboard and screen-reader review.

A Vite-compatible test runner such as Vitest and a browser tool such as Playwright are candidates, but neither is currently installed. Add an ADR and update CI when adopting them.

## 5. CI commands

The current CI workflow runs:

```bash
npm ci
npm run build
```

When test and lint tooling is introduced, extend the workflow to run those checks before the production build.

## Related documents

- [Quality overview](README.md)
- [Accessibility](accessibility.md)
- [Coding standards](coding-standards.md)
- [Review checklist](review-checklist.md)
- [CI/CD](../deployment/ci-cd.md)
