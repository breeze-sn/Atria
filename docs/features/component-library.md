# Component Library

**Status:** Implemented, limited
**Route:** `/explore/components`
**Source:** `src/pages/Components.jsx`

The Components page is a small catalogue of reusable interface examples. Each entry includes a live preview and copy-ready React and CSS snippets.

## 1. Current component catalogue

| Component | Category | Example purpose |
|---|---|---|
| Button | Actions | Primary, secondary, and ghost actions |
| Text field | Forms | Labelled input with hint and error states |
| Status badge | Feedback | Neutral, success, and warning status |
| Content card | Layout | Group related content and actions |
| Avatar | Identity | Display a user's initials |
| Navigation bar | Navigation | Horizontal navigation with an active item |
| Modal dialog | Overlays | Focus a user on a short task or confirmation |
| Dropdown select | Forms | Choose one option from a list |
| Tabs | Navigation | Switch between related content views |
| Checkbox | Forms | Toggle an individual setting |

## 2. Preview and snippets

Selecting a component updates the preview panel. Available examples include interactive controls such as a text field, modal open/close, tabs, dropdown selection, and checkbox state.

The code panel provides React and CSS snippets that can be copied into another project. Snippets are illustrative starting points and may need adaptation to the destination project's framework, styling conventions, and dependencies.

## 3. Accessibility and production caveats

The examples are not yet a fully audited component package or isolated preview sandbox. Before shipping a copied example, review:

- keyboard interaction and focus management;
- semantic HTML and accessible names;
- focus restoration and Escape handling for dialogs;
- form validation and error announcements;
- responsive behaviour and touch targets;
- disabled, loading, and error states;
- design-token integration and theming.

In particular, the modal example is a basic demonstration and should not be treated as a complete accessible dialog implementation.

## 4. Current limitations

- Components are authored in a static source array; community publishing and user-authored registry entries are not available.
- There is no package install command or generated component package.
- Previews are rendered in the Atria page rather than an isolated sandbox.
- Prop controls and comprehensive state matrices are limited.
- Snippet quality and accessibility need ongoing review and tests.

## 5. Future improvements

- Move component metadata into a documented registry format.
- Add prop and state controls for each preview.
- Add complete keyboard and focus behaviour to interactive patterns.
- Introduce automated component and accessibility tests.
- Add copy feedback and snippet validation for all examples.
- Explore versioned publishing only after authentication, ownership, and preview isolation are designed.

## Related documents

- [Feature overview](README.md)
- [Design foundations](design-foundations.md)
- [Design tokens](design-tokens.md)
- [Accessibility](../quality/accessibility.md)
