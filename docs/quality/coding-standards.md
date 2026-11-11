# Coding Standards

## 1. Purpose

This document records the conventions actually used in the Atria codebase and recommends rules for new
code. Atria does not currently have a linter or formatter configuration, so these standards rely on
review and consistency rather than automation.

The first rule is simple: **match the surrounding file**.

---

## 2. Language and modules

- JavaScript with JSX.
- ES modules (`"type": "module"` in `package.json`).
- Modern syntax supported by Vite: `const`/`let`, arrow functions, template literals, optional
  chaining where useful.
- No TypeScript.
- No CommonJS `require`.

### Imports

- Group imports at the top of the file.
- Third-party packages first or after framework imports, matching the file.
- Local files use relative paths and explicit extensions where present (`./App.jsx`,
  `./pages/Tokens.jsx`).
- Import only what is used. Remove unused imports when touching a file.
- Use named imports for React hooks and router primitives.
- Default exports for page and layout components.

---

## 3. File and component naming

| Kind | Convention | Examples |
|---|---|---|
| React component files | PascalCase | `DashboardLayout.jsx`, `Foundations.jsx` |
| Entry files | lowercase | `main.jsx`, `index.css` |
| Root app component | `App.jsx` | `App` |
| Layout files | PascalCase in `layouts/` | `DashboardLayout.jsx` |
| Page files | PascalCase in `pages/` | `Tokens.jsx` |
| Documentation files | lowercase kebab-case | `system-architecture.md` |
| CSS | single global file today | `index.css` |

Component functions use PascalCase. Helper functions and variables use camelCase.

---

## 4. Formatting

### Observed style

There is a minor inconsistency between files:

- `src/App.jsx` and `src/Docs.jsx` omit semicolons.
- `src/layouts/DashboardLayout.jsx` and the three page files use semicolons.
- All files use single quotes for JavaScript strings and JSX attributes.
- Indentation is two spaces.
- JSX inherits standard React formatting.

Until a formatter is configured, follow the file's existing style. Do not reformat an entire file in an
unrelated pull request; it makes review harder.

### Recommendations if a formatter is added

- Use Prettier or equivalent.
- Use single quotes, no semicolons, two-space indentation, and a 100-character print width, or choose
  the opposite and apply it consistently.
- Add a `format` script and a CI check.
- Format the whole repo in a dedicated commit.

---

## 5. React conventions

- Function components only.
- Keep components focused on one responsibility.
- Keep static data arrays at module scope.
- Use `useState` for local UI state.
- Do not add global state until there is a demonstrated need.
- Use conditional rendering with clear JSX expressions.
- Use `NavLink` for router-aware navigation inside the app.
- Use native `<a>` for the `/docs` page because it sits outside the router.
- Provide `key` props for mapped lists.
- Keep markup semantic (`section`, `article`, `nav`, `main`, `aside`, `header`, `footer`).

### Example

```jsx
const tasks = [
  { number: '01', title: 'Colour system' },
]

export default function Example() {
  return (
    <div className="studio-page">
      {tasks.map((task) => (
        <article className="studio-task" key={task.number}>
          <span className="studio-task-number">{task.number}</span>
          <h3>{task.title}</h3>
        </article>
      ))}
    </div>
  )
}
```

---

## 6. Data shapes

- Keep data close to the component that renders it.
- Use descriptive field names.
- Keep arrays immutable in render code.
- Use stable identifiers for list keys.
- Document new shared data shapes in the low-level design.

---

## 7. CSS conventions

- Use the `.shell` container for page width.
- Use existing classes before adding new ones.
- Prefix area-specific classes (`explore-`, `studio-`, `doc-`, `art-`).
- Use CSS custom properties for core colours when possible.
- Avoid inline styles except for data-driven values (for example, swatch background colours).
- Keep responsive rules near their component section or in the established responsive blocks.
- Preserve the reduced-motion media query.
- Do not introduce a CSS framework without an ADR.
- Do not use `!important` except in the reduced-motion override (or document a strong reason).

### Class naming

Prefer:

```css
.explore-section-link { }
.explore-section-link.active { }
.explore-section-icon { }
```

Avoid generic names like `.container`, `.box`, `.item`, or `.text` that can collide globally.

---

## 8. Accessibility conventions

- Use native interactive elements.
- Give every control an accessible name.
- Hide purely decorative icons where practical.
- Keep focus visible.
- Preserve keyboard order.
- Do not use colour alone to convey state.
- Respect reduced motion.
- Test with keyboard and zoom.

See [Accessibility](accessibility.md).

---

## 9. Documentation conventions

- Write in clear, direct language.
- Use relative links inside the repository.
- Label status as Implemented, Placeholder, or Planned.
- Do not claim unbuilt functionality.
- Include commands that actually exist.
- Update indexes when adding files.
- Use Mermaid for diagrams.
- Verify every link.

See [Documentation guidelines](../contributing/documentation-guidelines.md).

---

## 10. Comments

- JavaScript and JSX currently contain no explanatory comments. Keep code self-explanatory.
- CSS uses section comments to separate areas. Keep them meaningful.
- Add comments only where the reason is non-obvious, not to narrate the code.
- Do not leave commented-out code in a pull request.

---

## 11. Tests

There is no test framework today. When adding tests:

- place them near the code or in an agreed test directory;
- follow the framework's conventions;
- test behaviour and public contracts, not implementation details;
- add the test command to `package.json` and CI;
- document the command.

See [Testing strategy](testing-strategy.md).

---

## 12. Git and commit conventions

Recommended:

- Use a focused branch name: `docs/readme-redesign`, `fix/mobile-nav`, `feat/token-model`.
- Use imperative commit subjects.
- Consider Conventional Commits:
  - `docs:`
  - `feat:`
  - `fix:`
  - `refactor:`
  - `test:`
  - `chore:`
- Keep the subject under about 72 characters.
- Explain the why in the body when needed.
- Do not mix unrelated changes.
- Do not commit `node_modules/` or `dist/`.

See [Contribution workflow](../contributing/contribution-workflow.md).

---

## 13. Review rules

A change should be rejected or revised if it:

- introduces a dependency without justification;
- silently changes public routes;
- documents unbuilt features as complete;
- breaks responsive layout;
- removes keyboard access;
- ignores reduced motion;
- adds secrets or private data;
- leaves stale links or documentation;
- fails `npm run build`.

See [Review checklist](review-checklist.md).

---

## 14. Related documents

- [Frontend architecture](../engineering/frontend-architecture.md)
- [Styling and design tokens](../engineering/styling-and-design-tokens.md)
- [Testing strategy](testing-strategy.md)
- [Accessibility](accessibility.md)
- [Pull request guidelines](../contributing/pull-request-guidelines.md)
