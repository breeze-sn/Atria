# Component Library

**Status:** Placeholder — implementation brief only
**Route:** `/explore/components`
**Source:** `src/pages/Components.jsx`

> This page documents a contributor-facing brief. It does **not** describe a working component
> registry, live preview runtime, or publishing flow. Those capabilities do not exist yet.

---

## 1. What the brief asks for

The Components page is intended to be a shared library where creators can publish interface components
and others can discover, inspect, preview, and reuse them.

The brief states:

> Each component entry should explain what it does, how it behaves, how it can be configured, and how
> another creator can use it. Treat the live preview and its documentation as equally important.

### Required characteristics

- Publish, discover, inspect, preview, and reuse components.
- Explain behaviour, configuration, and usage.
- Treat preview and documentation as equally important.
- Support a community publishing model.

---

## 2. Component entry areas

### 01 — Anatomy and API

Document the component name, purpose, properties, slots, and composition rules.

### 02 — Variants and states

Support visual variants and interaction states such as default, hover, focus, disabled, and loading
where relevant.

### 03 — Live preview

Render working examples and let contributors change supported properties to explore behaviour.

### 04 — Usage and accessibility

Include do/don't guidance, keyboard behaviour, semantic requirements, and responsive considerations.

### 05 — Share and reuse

Make published component entries discoverable, previewable, and reusable by other creators.

---

## 3. Developer notes from the brief

1. Create a component registry rather than maintaining separate hard-coded cards for every component.
2. Give each entry metadata such as name, description, category, creator, version, tags, and preview.
3. Keep examples isolated so a preview cannot accidentally affect the surrounding Studio interface.
4. Document props and variants alongside usage examples and accessible interaction behaviour.
5. Design the publishing flow around the community model: create, preview, publish, discover, and
   reuse.

These notes are guidance. None of the described behaviour is implemented.

---

## 4. Current implementation

What exists:

- a static page at `/explore/components`;
- the implementation-brief layout;
- a `componentParts` array of five areas;
- developer notes rendered as an ordered list;
- the Explore sidebar with an active state.

What does not exist:

- a component registry;
- component metadata storage;
- a preview runtime or sandbox;
- prop controls;
- variants and states beyond the landing-page demonstration;
- publishing or discovery;
- reuse or copy actions;
- tests.

The landing page has a small playground that switches between hand-authored Button, Input, and Badge
examples. It is a visual demonstration only and is not connected to this page.

---

## 5. Suggested model

This is a proposal for contributors, not an agreed schema.

```ts
interface ComponentEntry {
  id: string
  name: string
  description: string
  category: string
  creator: string
  version: string
  tags: string[]
  preview: unknown
  props?: PropDefinition[]
  variants?: VariantDefinition[]
  usage?: string
  accessibility?: string
}
```

### Implementation questions to resolve before building

- How are previews authored and stored? Code strings, source files, or registered React components?
- How is preview code isolated from the Studio application?
- What is trusted content, and what needs sandboxing?
- Who can publish, and how is ownership tracked?
- How are versions represented and compared?
- How are props documented and validated?
- What does reuse mean: copy code, install a package, or reference a registry entry?
- How are accessibility requirements enforced or reviewed?

These questions imply future decisions about persistence, authentication, and possibly execution
sandboxing. They should not be answered implicitly in a UI-only implementation.

---

## 6. Acceptance criteria for implementation

A contributor implementing this brief should be able to demonstrate:

- [ ] A component registry backed by a documented data model.
- [ ] Creating a component entry with metadata.
- [ ] Documenting props, variants, and states.
- [ ] An isolated preview that cannot affect the Studio shell.
- [ ] Changing supported properties in the preview.
- [ ] Usage and accessibility guidance.
- [ ] Publishing and discovery flow.
- [ ] A reuse action with a clear meaning.
- [ ] Empty, loading, and error states.
- [ ] Responsive and keyboard-accessible UI.
- [ ] Tests for registry behaviour and critical interactions.
- [ ] Updated documentation that no longer calls the page a placeholder.

---

## 7. Related documents

- [Explore Studio](explore-studio.md)
- [Design foundations](design-foundations.md)
- [Design tokens](design-tokens.md)
- [Landing page](landing-page.md)
- [Data flow](../architecture/data-flow.md)
- [ADR-0005: Implementation briefs](../architecture/adr/0005-placeholder-implementation-briefs.md)
- [ADR-0006: Static content and no persistence](../architecture/adr/0006-static-content-no-persistence.md)
