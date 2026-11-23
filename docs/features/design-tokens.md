# Design Tokens

**Status:** Implemented, local
**Route:** `/explore/tokens`
**Source:** `src/pages/Tokens.jsx`, `src/data/studioStore.js`

The Tokens workspace is a small editable collection for reusable design values. It supports primitive and semantic groups, search, inline editing, and client-side exports.

## 1. Current capabilities

- Starter tokens for colour, spacing, radius, and typography-related values.
- Search across token name, value, and description.
- Filter by All, Primitive, or Semantic.
- Add a token with a name, value, type, group, and optional description.
- Edit token names and values inline.
- Delete tokens.
- Copy an individual token value.
- Export the current collection as CSS custom properties or JSON.
- Preview tokens across light and dark modes with distinguishable contrast rims for both light and dark swatches (without altering saved token values).
- Import tokens from JSON with a review step (see [Importing tokens](#importing-tokens)).
- Reset the collection to its starter values.

## 2. Token shape

A token currently contains:

| Field | Purpose |
|---|---|
| `id` | Stable local identifier |
| `name` | Dot-separated token name |
| `value` | Raw string value |
| `type` | Colour, dimension, font, number, or string |
| `group` | Primitive or Semantic |
| `description` | Optional usage note |

Example:

```json
{
  "id": "t1",
  "name": "color.text.primary",
  "value": "#171717",
  "type": "color",
  "description": "Primary text and icon colour",
  "group": "Primitive"
}
```

## 3. Export behaviour

CSS exports transform dots in token names into hyphens and prefix each custom property with `--atria-`. JSON exports include token name, value, type, description, and group. Exports are generated in the browser from the current collection.

## 4. Persistence and boundaries

The collection is saved in browser local storage through `useStudioData('tokens')`. It persists in the same browser but is not shared between users or devices. There is no server-side validation, reference resolution, cloud sync, or version history.

## 5. Current limitations

- Primitive and semantic are organisational groups; semantic references are not resolved.
- Name and value fields are editable, but there is not yet comprehensive validation for token naming or type/value compatibility.
- Deleting a token does not check for dependent references because reference relationships are not implemented.
- Export is a straightforward CSS/JSON representation, not a full design-token interchange specification.
- The workspace does not yet import token files or connect tokens to Foundations or Components.

## 6. Future improvements

- Add schema validation for names, types, and values.
- Introduce explicit token references with missing-reference and cycle detection.
- Add import and round-trip export tests.
- Support themes and token collections.
- Provide clear empty, invalid, and export-error states.
- Add accessibility and keyboard interaction tests.

## Related documents

- [Feature overview](README.md)
- [Design foundations](design-foundations.md)
- [Component library](component-library.md)
- [State management](../engineering/state-management.md)

## Importing tokens

The Tokens page has an import panel. Paste JSON or choose a `.json` file, press **Preview import**, review the list, then confirm. Nothing is applied until you confirm.

Supported shapes:

```json
[{ "name": "color.accent", "value": "#315FCE", "type": "color", "group": "Semantic", "description": "Accent colour" }]
```

```json
{ "tokens": [{ "name": "space.5", "value": "20px", "type": "dimension" }] }
```

```json
{ "color.accent": "#315FCE", "space.5": { "value": "20px", "type": "dimension" } }
```

Rules:

- `name` and `value` are required. Names use letters, numbers, dots, dashes and underscores.
- `type` is one of `color`, `dimension`, `font`, `number`, `string` (default `string`). Other types are shown as invalid.
- `group` is `Primitive` or `Semantic` (default `Primitive`).
- A name that already exists, or that repeats inside the file, is marked as skipped. Existing tokens are never overwritten.
- Invalid rows are listed with the reason and are not imported.
