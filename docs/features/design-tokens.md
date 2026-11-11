# Design Tokens

**Status:** Placeholder — implementation brief only
**Route:** `/explore/tokens`
**Source:** `src/pages/Tokens.jsx`

> This page documents a contributor-facing brief. It does **not** describe a working token workspace.
> No tokens can be created, grouped, edited, validated, copied, or exported today.

---

## 1. What the brief asks for

The Tokens page is intended to be a structured layer between design foundations and implementation.
Tokens should make design decisions reusable, traceable, and ready to export.

The brief states:

> Build a token workspace where creators can add, group, edit, search, and export tokens. Keep raw
> values separate from semantic meaning so a theme can change without rewriting every component.

### Required characteristics

- Add, group, edit, search, and export tokens.
- Separate raw values from semantic meaning.
- Make design decisions reusable and traceable.
- Support CSS custom properties and JSON export.

---

## 2. Task areas

### 01 — Token structure

**Description:** Create a predictable token model with names, values, types, and optional descriptions.

**Example from the brief:**

```text
colour.text.primary  →  #171717
```

### 02 — Token groups and references

**Description:** Organise tokens by category and allow semantic tokens to reference primitive values.

**Example from the brief:**

```text
button.background  →  colour.brand.primary
```

### 03 — Edit, validate and export

**Description:** Give contributors a safe way to update values and share them with a codebase.

**Example from the brief:**

```text
Export formats  →  CSS variables · JSON
```

---

## 3. Developer notes from the brief

1. Define a token schema with a stable ID, name, category, value, type, and description.
2. Support primitive and semantic tokens, including references between them.
3. Validate names, value formats, missing references, and circular references before saving or
   exporting.
4. Provide copy actions and exports for CSS custom properties and structured JSON.
5. Keep the data model format-friendly so additional export formats can be added later.

These notes are guidance. None of the described behaviour is implemented.

---

## 4. Current implementation

What exists:

- a static page at `/explore/tokens`;
- the implementation-brief layout;
- a `stages` array containing the three areas above;
- code-example blocks;
- developer notes rendered as an ordered list;
- the Explore sidebar with an active state.

What does not exist:

- a token data model;
- token creation or editing;
- grouping or reference resolution;
- validation;
- search;
- copy or export generation;
- CSS or JSON output;
- persistence;
- tests.

The landing page has a separate copy-token demo that copies a single literal string. It is not
connected to this page and is not a token export feature.

---

## 5. Suggested data model

This is a proposal for contributors, not an agreed schema.

```ts
type TokenType = 'color' | 'typography' | 'spacing' | 'radius' | 'shadow' | 'other'
type TokenKind = 'primitive' | 'semantic'

interface Token {
  id: string
  name: string
  category: string
  value: string
  type: TokenType
  kind: TokenKind
  description?: string
  references?: string[]
}
```

### Example token set

```json
[
  {
    "id": "colour.brand.primary",
    "name": "colour.brand.primary",
    "category": "colour",
    "value": "#171717",
    "type": "color",
    "kind": "primitive",
    "description": "Primary brand colour"
  },
  {
    "id": "button.background",
    "name": "button.background",
    "category": "component",
    "value": "{colour.brand.primary}",
    "type": "color",
    "kind": "semantic",
    "references": ["colour.brand.primary"],
    "description": "Default button background"
  }
]
```

### Validation rules to consider

- Token names are non-empty and follow an agreed naming convention.
- IDs are unique and stable.
- Values match the declared type.
- Semantic references resolve to an existing token.
- Circular references are rejected.
- Deletion checks for dependent references.
- Exports fail loudly when the token set is invalid.

### Export direction

- CSS custom properties: `--token-name: value;`
- JSON: a structured object or array matching the agreed schema.
- Exported names must be deterministic and documented.

The exact format is not decided. Any implementation should include a written format specification and
tests.

---

## 6. Acceptance criteria for implementation

A contributor implementing this brief should be able to demonstrate:

- [ ] Creating primitive and semantic tokens.
- [ ] Grouping tokens by category.
- [ ] Editing and deleting tokens with reference safety.
- [ ] Validation for names, formats, missing references, and cycles.
- [ ] Search or filtering if the list is large enough.
- [ ] Copy actions for individual tokens.
- [ ] CSS custom property export.
- [ ] JSON export.
- [ ] Empty, loading, and error states.
- [ ] Responsive and keyboard-accessible UI.
- [ ] Persistence or a clearly scoped in-memory demo.
- [ ] Tests for validation, reference resolution, and export output.
- [ ] Updated documentation that no longer calls the page a placeholder.

---

## 7. Related documents

- [Explore Studio](explore-studio.md)
- [Design foundations](design-foundations.md)
- [Component library](component-library.md)
- [Data flow](../architecture/data-flow.md)
- [API reference](api-reference.md)
- [ADR-0005: Implementation briefs](../architecture/adr/0005-placeholder-implementation-briefs.md)
- [ADR-0006: Static content and no persistence](../architecture/adr/0006-static-content-no-persistence.md)
