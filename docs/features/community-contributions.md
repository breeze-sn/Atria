# Community Contributions

**Status:** Implemented, static\
**Route:** `/explore/community`\
**Sources:** `community/`, `src/data/communityContributions.js`, `src/data/communityValidation.js`,
`src/pages/Community.jsx`

The Community page browses repository-submitted colour palettes, design token sets, and component
designs. Visitors can filter by resource type and inspect token values, palette swatches, component
previews, variants, states, contributor attribution, and source links.

## Data and validation

Contributions are JSON files grouped in `community/palettes/`, `community/tokens/`, and
`community/components/`. The Vite app discovers and bundles these files at build time. The shared
validator checks the contribution type against the folder, required data, supported fields, URLs,
HEX colours, token-specific values, and duplicate IDs.

Run `npm run validate:contributions` from the repository root before submitting changes. Invalid,
parseable entries are reported in the app and omitted from cards; invalid JSON is reported by the
validation command because it cannot be imported by the app bundler.

The complete schema, examples, validation workflow, and pull request process are documented in
[Community Contributions](../contributing/community-contributions.md).

## Product boundary

This is a local-first, static catalogue. Adding or updating an entry requires a reviewed pull
request and a new site build. There is no account, backend, database, in-app submission, or cloud
synchronization.
