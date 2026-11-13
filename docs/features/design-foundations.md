# Design Foundations

**Status:** Implemented, local
**Routes:** `/explore/foundations` and `/explore/foundations/:categoryId/:resourceId`
**Source:** `src/pages/Foundations.jsx`, `src/data/studioStore.js`

Foundations is a browsable library of starter design resources. People can choose a preset, open its detail page, customise values, and export the result.

## 1. Resource catalogue

| Category | Presets |
|---|---|
| Colour | Neutral & Minimal, Warm Earth, Cool & Calm, Soft Pastel, Vibrant Studio, Dark Interface, Monochrome |
| Typography | Modern Sans, Editorial, Compact UI |
| Spacing | Compact, Balanced, Spacious |
| Radius | Soft Corners, Sharp & Precise, Rounded |

The catalogue contains 16 starter resources. Presets are defined in the page's local resource data.

## 2. Resource detail workflow

Selecting a resource opens a dedicated route. The detail view provides:

- editable values and live visual previews;
- colour pickers and editable colour names for palettes;
- editable type sizes and weights for typography;
- editable numeric spacing and radius values;
- copy actions for individual values and complete CSS;
- CSS and JSON download actions;
- reset to the original preset.

The route is addressable, so a resource can be linked directly.

## 3. Persistence and data boundaries

Each resource's custom values are stored in browser local storage under a resource-specific key. This means:

- edits persist across refreshes in the same browser;
- different resource presets have separate saved values;
- edits do not overwrite the in-code starter preset;
- values do not sync across devices, browsers, or users;
- clearing browser storage removes local customisations.

There is no account, server API, cloud save, or community publishing flow.

## 4. Export behaviour

The detail page generates CSS custom properties and a JSON representation from the current edited values. Users can copy CSS or JSON and download them as files. Export formats are generated client-side.

## 5. Current limitations

- Presets are curated in source code; users cannot publish new presets to a shared catalogue.
- Typography currently edits size and weight; family and advanced font metrics are not configurable in this editor.
- Spacing and radius use numeric pixel values.
- Contrast validation, theme pairing, and design-token linking are not yet implemented.
- The radius category currently covers corner-radius scales; shadow presets are not yet part of the catalogue.

## 6. Quality expectations for future work

- Keep resource IDs stable because they are used in routes and local-storage keys.
- Validate values before export and show clear feedback for invalid entries.
- Preserve keyboard access and visible focus states.
- Add contrast checks and theme-aware previews before introducing accessibility claims.
- Keep preset data separate from editor rendering.
- Add automated tests for transformations, persistence, and export generation when a test runner is introduced.

## Related documents

- [Feature overview](README.md)
- [Design tokens](design-tokens.md)
- [Component library](component-library.md)
- [State management](../engineering/state-management.md)
