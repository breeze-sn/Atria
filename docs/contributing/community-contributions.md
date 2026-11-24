# Community Contributions

Atria's community library is a set of reviewed JSON files committed to this repository. The app
bundles those files at build time; browsing them does not require an account, backend, database, or
cloud sync.

## Folder structure

```text
community/
├── palettes/
│   └── quiet-morning.json
├── tokens/
│   └── quiet-interface.json
└── components/
    └── grounded-button.json
```

Add one `.json` file per contribution to the folder that matches its type. Use a unique, lowercase
hyphenated ID for both the filename and the `id` field (for example, `quiet-morning.json` and
`"id": "quiet-morning"`). The app discovers files in these folders automatically.

## Shared fields

Every contribution is a JSON object with these required fields:

| Field | Type | Rules |
|---|---|---|
| `type` | string | `palette`, `tokens`, or `component`; must match the folder |
| `id` | string | Unique slug made of letters, numbers, and single hyphens |
| `name` | string | Non-empty display name |
| `description` | string | Non-empty summary |
| `contributor` | object | Must include a non-empty `name`, `github`, or both |
| `sourceUrl` | string | Absolute `http` or `https` URL for the original source |

`contributor` accepts only `name` and `github`; `github` is a username without an `@`, containing
1–39 letters, numbers, or single hyphens. It must start and end with a letter or number.
External URLs must use HTTP or HTTPS. Unknown fields are rejected so misspelled keys do not silently
disappear from the library.

## Palette format

Palettes require at least two named colours. HEX values accept `#RGB`, `#RGBA`, `#RRGGBB`, or
`#RRGGBBAA`. Palette-level `usageNotes` and per-colour `notes` are optional strings.

```json
{
  "type": "palette",
  "id": "quiet-morning",
  "name": "Quiet Morning",
  "description": "A soft, grounded palette for calm product interfaces.",
  "usageNotes": "Use darker tones for text and actions.",
  "colors": [
    { "name": "Pine", "hex": "#263B35", "notes": "Primary text and actions." },
    { "name": "Dawn", "hex": "#F7F5EF" }
  ],
  "contributor": { "name": "Example Designer", "github": "example-user" },
  "sourceUrl": "https://github.com/example-user/designs"
}
```

## Token-set format

`tokens` is an object containing one or more category arrays. Omit categories that are not needed.
Every token requires a unique `name` within the set. Optional token `description` values are plain
strings.

| Category | Required item fields | Value rules |
|---|---|---|
| `colors` | `name`, `value` | `value` must be a HEX colour in one of the formats above |
| `typography` | `name`, `fontFamily`, `fontSize`, `fontWeight`, `lineHeight` | `fontSize` is a CSS size; weight is an integer from 1–1000; line height is a positive number |
| `spacing` | `name`, `value` | Non-negative CSS dimension, such as `8px`, `1rem`, or `0` |
| `radius` | `name`, `value` | Non-negative CSS dimension |
| `other` | `name`, `type`, `value` | `type`: `shadow`, `border`, `opacity`, `duration`, `elevation`, or `other`; value is a string or finite number |

Example:

```json
{
  "type": "tokens",
  "id": "quiet-interface",
  "name": "Quiet Interface",
  "description": "A compact token foundation for product UI.",
  "tokens": {
    "colors": [{ "name": "color.ink", "value": "#20201E" }],
    "typography": [{
      "name": "type.body",
      "fontFamily": "Manrope, sans-serif",
      "fontSize": "14px",
      "fontWeight": 400,
      "lineHeight": 1.7
    }],
    "spacing": [{ "name": "space.4", "value": "16px" }],
    "radius": [{ "name": "radius.card", "value": "8px" }],
    "other": [{ "name": "shadow.card", "type": "shadow", "value": "0 4px 12px #00000014" }]
  },
  "contributor": { "github": "example-user" },
  "sourceUrl": "https://github.com/example-user/designs"
}
```

## Component format

Components include a safe, data-driven preview rather than executable markup or code. Preview kinds
are `button`, `card`, and `badge`; each requires a `label`, `background`, and `foreground` HEX value.
`variants` and `states` each require at least one `{ "name", "description" }` entry. `references` is
an optional array of `{ "label", "url" }` links.

```json
{
  "type": "component",
  "id": "grounded-button",
  "name": "Grounded Button",
  "description": "A high-contrast call to action.",
  "preview": {
    "kind": "button",
    "label": "Continue",
    "background": "#263B35",
    "foreground": "#FFFFFF"
  },
  "variants": [{ "name": "Primary", "description": "The main action." }],
  "states": [{ "name": "Default", "description": "Ready for interaction." }],
  "references": [{
    "label": "Button accessibility guidance",
    "url": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  }],
  "contributor": { "name": "Example Designer" },
  "sourceUrl": "https://github.com/example-user/designs"
}
```

## Create and validate a contribution

1. Choose the correct folder and copy the matching example file.
2. Give the file and `id` a unique slug. Add attribution and a source link.
3. Keep previews descriptive and safe: component previews are rendered from JSON fields, never run
   as arbitrary HTML or JavaScript.
4. Validate all contribution files from the repository root:

   ```bash
   npm run validate:contributions
   ```

   The command checks JSON syntax, required fields and types, allowed fields, folder/type agreement,
   HEX colours, URLs, token values, and duplicate IDs. It prints each invalid path with a specific
   field-level error and exits non-zero. Correct every reported error before submitting.
5. Run the normal project checks (`npm test` and `npm run build`) and inspect the Community page at
   `/explore/community`, including a narrow viewport.

Invalid JSON cannot be displayed by the app because the bundler must parse contribution files first;
the validation command reports JSON syntax errors before a pull request is ready. Structurally invalid
but parseable files are reported in the app and excluded from its cards.

## Submit, review, and update

Submit the contribution in a pull request to `main`, following the repository's
[pull request guidelines](pull-request-guidelines.md). Link the issue or discussion when relevant,
describe the resource and its intended use, include any required source/credit, and state that
`npm run validate:contributions`, `npm test`, and `npm run build` passed.

Maintainers review schema validity, attribution and source links, usefulness, accessibility and
licensing before merge. Contributions become available with the next static-site build. To update or
remove a resource, change or remove its JSON file in a follow-up pull request and explain the change;
the same validation and review process applies. There is no in-app submission, account, or hosted
publishing workflow.

## Included examples

- [Quiet Morning palette](../../community/palettes/quiet-morning.json)
- [Quiet Interface token set](../../community/tokens/quiet-interface.json)
- [Grounded Button component](../../community/components/grounded-button.json)
