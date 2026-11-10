# Low-Level Design

## Purpose

This document describes the implementation details of the current Atria codebase: entry points,
routes, component internals, data shapes, event handlers, CSS organisation, and edge cases.

It is written against the files in this repository. If the code changes, this document must change
with it.

---

## 1. File inventory

### Application source

| File | Type | Responsibility |
|---|---|---|
| `src/main.jsx` | Entry | Selects Docs or App and mounts React |
| `src/App.jsx` | Application | Landing page, router, route table, redirects |
| `src/Docs.jsx` | Page | Documentation hub and outbound document cards |
| `src/layouts/DashboardLayout.jsx` | Layout | Explore Studio header, sidebar, footer, outlet |
| `src/pages/Foundations.jsx` | Page | Static Foundations implementation brief |
| `src/pages/Tokens.jsx` | Page | Static Tokens implementation brief |
| `src/pages/Components.jsx` | Page | Static Components implementation brief |
| `src/index.css` | Stylesheet | Full visual system, responsive rules, motion handling |

### Application configuration

| File | Responsibility |
|---|---|
| `index.html` | Document shell, metadata, font links, root node, module script |
| `vite.config.js` | Vite configuration with the React plugin |
| `vercel.json` | Vercel framework/build/output configuration and SPA rewrites |
| `package.json` | Dependencies and scripts |
| `package-lock.json` | Locked dependency graph |
| `.github/workflows/ci.yml` | CI install and build workflow |

---

## 2. Entry point: `src/main.jsx`

```jsx
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Docs from './Docs.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {window.location.pathname === '/docs' ? <Docs /> : <App />}
  </React.StrictMode>,
)
```

### Behaviour

1. Imports React, `createRoot`, both page trees, and the global stylesheet.
2. Reads `window.location.pathname` once during render.
3. Mounts exactly one tree into `#root`.
4. Wraps the tree in `React.StrictMode`.

### Constraints

- This is not a router. Navigation after mount does not re-evaluate the branch.
- The comparison is exact: `/docs` matches; `/docs/`, `/docs/anything`, and `/docs?query` (pathname is
  `/docs`) behave differently. `/docs?query` still has pathname `/docs` and matches.
- Because `Docs` is outside `BrowserRouter`, links inside it use native anchors and cause full page
  loads.
- `StrictMode` enables extra development checks. It does not affect production behaviour.

---

## 3. Application and landing page: `src/App.jsx`

### 3.1 Imports

- `useState` from React.
- `BrowserRouter`, `Routes`, `Route`, `Navigate` from React Router.
- Layout and page components.
- Phosphor icons: `ArrowDownRight`, `ArrowRight`, `ArrowUpRight`, `ArrowsOut`, `Check`, `Code`,
  `Copy`, `Cube`, `FigmaLogo`, `GithubLogo`, `LinkedinLogo`, `Globe`, `EnvelopeSimple`, `Stack`,
  `Palette`, `SlidersHorizontal`, `Sparkle`, `SquaresFour`, `TextAa`.

Some imported icons (`ArrowsOut`, `FigmaLogo`) are not used in the current JSX. This is a harmless but
real bundle-cost detail.

### 3.2 Data: `foundations`

```js
const foundations = [
  { icon: Palette, name: 'Colour', detail: 'Build expressive, accessible palettes', meta: 'FOUNDATION / 01' },
  { icon: TextAa, name: 'Typography', detail: 'Define type scales and text styles', meta: 'FOUNDATION / 02' },
  { icon: SlidersHorizontal, name: 'Spacing', detail: 'Create a consistent spatial system', meta: 'FOUNDATION / 03' },
  { icon: Cube, name: 'Components', detail: 'Document reusable interface patterns', meta: 'LIBRARY / 04' },
]
```

Shape:

| Field | Type | Meaning |
|---|---|---|
| `icon` | Phosphor component | Rendered at size 22, weight `light` |
| `name` | string | Card title |
| `detail` | string | Card description |
| `meta` | string | Eyebrow metadata |

### 3.3 Data: `swatches`

```js
const swatches = ['#171717', '#55534F', '#99958D', '#D5D1C8', '#EEECE7']
```

Five neutral colours rendered as flex children with inline `background`.

### 3.4 LandingPage state

```js
const [activeTab, setActiveTab] = useState('Button')
const [copied, setCopied] = useState(false)
```

| State | Initial | Set by | Effect |
|---|---|---|---|
| `activeTab` | `'Button'` | Playground tab buttons | Selects Button, Input, or Badge preview |
| `copied` | `false` | `copyToken` | Changes copy button label to `COPIED` for 1.8 seconds |

### 3.5 Handler: `copyToken`

```js
const copyToken = async () => {
  try {
    await navigator.clipboard.writeText('--atria-space-4: 16px;')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  } catch {
    setCopied(false)
  }
}
```

Behaviour:

- Writes the literal string `--atria-space-4: 16px;` to the clipboard.
- On success, shows `COPIED` for 1800 ms.
- On failure (permission denied, insecure context, unsupported browser), leaves `copied` false.
- Does not copy a generated token or export a token set.

### 3.6 Landing page sections

| Section | Element / class | Content | Interactive |
|---|---|---|---|
| Navigation | `.nav.shell` | Brand, anchors, GitHub CTA | Links |
| Hero | `.hero.shell` | Eyebrow, headline, description, CTAs, footnote, preview panel | Links |
| Ticker | `.ticker` | Static principle phrases | No |
| Intro | `.intro-section` | Idea statement and link | Link |
| Foundations | `.foundations-section` | Four cards from `foundations` | No (cards are articles) |
| Components | `.components-section` | Playground with tabs and preview | Yes |
| Token strip | `.token-strip` | Copy token demo | Yes |
| Contact | `.contact-section` | Email, LinkedIn, GitHub, website | Links |
| Footer | `.footer` | Brand, statement, GitHub CTA, legal links | Links |

### 3.7 Playground details

Tabs: `Button`, `Input`, `Badge`.

| Active tab | Rendered preview |
|---|---|
| `Button` | `Get started` sample button and `Learn more` secondary button |
| `Input` | Email label and email input with placeholder |
| `Badge` | `Stable` badge with live dot and `In progress` muted badge |

The footer line reads `DEFAULT STATE / {activeTab.toUpperCase()}` and `PREVIEW ONLY`. This is accurate:
no component code is exposed or generated.

### 3.8 Router

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/explore" element={<DashboardLayout />}>
      <Route index element={<Navigate to="foundations" replace />} />
      <Route path="foundations" element={<Foundations />} />
      <Route path="tokens" element={<Tokens />} />
      <Route path="components" element={<Components />} />
    </Route>
    <Route path="/studio/*" element={<Navigate to="/explore" replace />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</BrowserRouter>
```

Route table:

| Path | Result | Notes |
|---|---|---|
| `/` | Landing page | |
| `/explore` | Layout + index redirect | Redirects to `foundations` |
| `/explore/foundations` | Layout + Foundations | |
| `/explore/tokens` | Layout + Tokens | |
| `/explore/components` | Layout + Components | |
| `/studio/*` | Redirect to `/explore` | Legacy/alternate path |
| `*` | Redirect to `/` | Catch-all |

`/docs` never reaches this router because `main.jsx` selects `Docs` first. `App.jsx` does not define a
`/docs` route.

---

## 4. Documentation hub: `src/Docs.jsx`

### 4.1 Data: `groups`

```js
const groups = [
  {
    number: '01',
    title: 'Product',
    description: '...',
    items: [
      { icon, title, type, status, href, description },
      // ...
    ],
  },
  // Design, Engineering
]
```

Shape:

| Field | Type | Meaning |
|---|---|---|
| `number` | string | Group index displayed in the left column |
| `title` | string | Collection title |
| `description` | string | Collection summary |
| `items` | array | Document cards |
| `item.icon` | Phosphor component | Card icon |
| `item.title` | string | Document title |
| `item.type` | string | Short type label |
| `item.status` | string | Current label, all `OPEN DOCUMENT` |
| `item.href` | string | Google Docs URL |
| `item.description` | string | Card summary |

### 4.2 Collections

| Collection | Documents |
|---|---|
| Product | Product Requirements Document; Product Overview |
| Design | Design System Guidelines; Component Documentation |
| Engineering | Architecture Notes; Developer Notes |

The hub header states `03 COLLECTIONS · 06 DOCUMENTS` and the content heading states
`06 ENTRIES / IN PROGRESS`.

### 4.3 Rendering

- Maps `groups` to `.doc-group` sections.
- Maps each item to an `.doc-card` anchor with `target="_blank"` and `rel="noreferrer"`.
- Each card has an `aria-label` describing the outbound action.
- The footer includes a `DOCUMENTATION · EARLY DEVELOPMENT` label.

### 4.4 Constraints

- No search, filtering, or in-app document rendering.
- External URLs are hard-coded.
- Document availability depends on Google Docs sharing settings.
- The hub bypasses React Router and uses native anchors for home navigation.

---

## 5. Studio layout: `src/layouts/DashboardLayout.jsx`

### 5.1 Data: `sections`

| Name | Path | Icon | Number |
|---|---|---|---|
| Foundations | `/explore/foundations` | `Palette` | `01` |
| Tokens | `/explore/tokens` | `Coin` | `02` |
| Components | `/explore/components` | `PuzzlePiece` | `03` |

### 5.2 Local components

| Component | Responsibility |
|---|---|
| `AtriaMark` | Renders the four-square brand mark, optionally small |
| `ExploreFooter` | Shared Explore footer with brand, statement, GitHub link, and legal row |
| `DashboardLayout` | Header, sidebar, `Outlet`, footer |

### 5.3 Layout structure

```jsx
<div className="explore-page">
  <header className="explore-header">...</header>
  <div className="explore-workspace shell">
    <aside className="explore-sidebar">...</aside>
    <main className="explore-content"><Outlet /></main>
  </div>
  <ExploreFooter />
</div>
```

- The sidebar uses `NavLink` with an `isActive` class callback.
- The content area renders the matched child route.
- The footer uses `.explore-footer` overrides on top of `.footer`.
- The header contains only brand and GitHub CTA; section navigation lives in the sidebar.

### 5.4 Accessibility attributes

- `aria-label="Explore Studio navigation"` on the top nav.
- `aria-label="Explore sections"` on the sidebar.
- `aria-hidden="true"` on the brand mark.
- `aria-label="Atria home"` on the brand link.

---

## 6. Studio briefs

### 6.1 Foundations: `src/pages/Foundations.jsx`

Data: `tasks` array.

| Number | Title | Details count | Output |
|---|---|---|---|
| 01 | Colour system | 3 | Reusable colour foundation with usage guidance |
| 02 | Typography | 3 | Consistent, previewable type scale |
| 03 | Spacing & layout | 3 | Documented layout and spacing foundations |

Rendered structure:

- `.studio-page`
- `.section-index` label
- `.studio-page-heading` with `PLACEHOLDER · READY FOR CONTRIBUTION`
- `.studio-page-intro`
- `.studio-brief`
- `.studio-task-list` with `.studio-task` articles
- `.studio-dev-note` with four developer notes

### 6.2 Tokens: `src/pages/Tokens.jsx`

Data: `stages` array.

| Number | Title | Example |
|---|---|---|
| 01 | Token structure | `colour.text.primary → #171717` |
| 02 | Token groups & references | `button.background → colour.brand.primary` |
| 03 | Edit, validate & export | `Export formats → CSS variables · JSON` |

The developer notes describe a future token schema with ID, name, category, value, type, description,
primitive/semantic references, validation, and CSS/JSON exports. These are **planned**, not
implemented.

### 6.3 Components: `src/pages/Components.jsx`

Data: `componentParts` array of `[title, description]` tuples.

| Index | Title |
|---|---|
| 01 | Anatomy & API |
| 02 | Variants & states |
| 03 | Live preview |
| 04 | Usage & accessibility |
| 05 | Share & reuse |

The developer notes describe a component registry, metadata, isolated previews, documented props, and
a create → preview → publish → discover → reuse flow. These are **planned**, not implemented.

### 6.4 Shared brief markup

All three briefs use:

- `.studio-page`;
- `.section-index`;
- `.studio-page-heading`;
- `.studio-status`;
- `.studio-page-count`;
- `.studio-page-intro`;
- `.studio-brief`;
- `.studio-kicker`;
- `.studio-dev-note`.

The status label is explicit: `PLACEHOLDER · READY FOR CONTRIBUTION`.

---

## 7. Styling implementation: `src/index.css`

### 7.1 Structure

The stylesheet is organised in sections separated by comments:

1. Root variables and global resets.
2. Shared shell, navigation, brand, buttons.
3. Landing hero and art preview.
4. Ticker.
5. Intro and foundations.
6. Component playground.
7. Token strip.
8. Footer.
9. Responsive rules for landing.
10. Reduced motion.
11. Contact section.
12. Documentation page.
13. Legacy Studio dashboard styles.
14. Studio implementation briefs.
15. Explore Studio layout.

### 7.2 Root variables

| Variable | Value | Use |
|---|---|---|
| `--paper` | `#f7f7f5` | Page background |
| `--ink` | `#20201e` | Primary text |
| `--muted` | `#85837d` | Muted text |
| `--line` | `#deddd8` | Borders and dividers |
| `--mono` | `'DM Mono', monospace` | Technical labels |

Additional literal colours are used throughout. See
[Styling and design tokens](../engineering/styling-and-design-tokens.md).

### 7.3 Key shared classes

| Class | Purpose |
|---|---|
| `.shell` | Max-width 1160px container with 32px side gutters |
| `.nav` | 82px navigation bar with bottom border |
| `.brand` | Wordmark and mark layout |
| `.brand-mark` | Four-square rotated mark |
| `.button` / `.button-dark` | Primary action styling |
| `.text-link` | Inline action with arrow |
| `.section-index` | Mono eyebrow labels |
| `.footer` | Shared footer spacing |

### 7.4 Layout techniques

- CSS Grid for hero, foundation grid, component layout, token strip, contact, docs groups, and Explore
  workspace.
- Flexbox for navigation, ticker, card metadata, and lists.
- `clamp()` for fluid heading sizes.
- `position: sticky` for the Explore sidebar.
- Absolute positioning for card arrows and sidebar bottom content.

### 7.5 Motion

- Buttons translate and change colour on hover.
- Cards lift on hover.
- Links shift padding or colour.
- `html { scroll-behavior: smooth; }`.
- `prefers-reduced-motion` sets transition and animation duration to `0.01ms` and disables smooth
  scrolling.

### 7.6 Responsive rules

See section 6 of [System architecture](system-architecture.md) for breakpoints. The mobile navigation
on the landing page hides `.nav-links` and keeps the GitHub CTA. Explore converts to a stacked layout
and a horizontally scrollable section nav.

### 7.7 Legacy styles

`.studio-shell`, `.studio-sidebar`, `.studio-brand`, `.studio-nav`, and `.studio-main` are scoped
styles from an earlier dashboard layout. The current Explore layout uses `.explore-*` classes.
Retaining unused legacy CSS is harmless but adds maintenance weight.

---

## 8. HTML shell: `index.html`

- `lang="en"`.
- UTF-8 and responsive viewport.
- `theme-color` `#f7f7f5`.
- Description meta tag.
- Title: `Atria — Design System Studio`.
- Preconnect to Google Fonts.
- Manrope 400–800 and DM Mono 400/500.
- Root element `#root`.
- Module script pointing to `/src/main.jsx`.

---

## 9. Build and configuration

### `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

No aliases, proxies, environment prefixes, or custom output paths.

### `vercel.json`

- `framework: vite`
- `buildCommand: npm run build`
- `outputDirectory: dist`
- `installCommand: npm install`
- rewrite `/(.*)` to `/index.html`

### `package.json` scripts

| Script | Command |
|---|---|
| `dev` | `vite` |
| `build` | `vite build` |
| `preview` | `vite preview` |

No `test`, `lint`, `format`, or `typecheck` scripts.

---

## 10. Edge cases and known behaviours

| Case | Behaviour | Notes |
|---|---|---|
| `/docs/` | Not matched by `main.jsx`; app router catch-all sends user to `/` | Exact pathname comparison |
| `/docs?x=1` | `pathname` is `/docs`; Docs renders | Query string does not affect branch |
| `/studio/tokens` | Redirect to `/explore` | No section preservation |
| `/explore/unknown` | Catch-all redirect to `/` | Not to `/explore/foundations` |
| Clipboard denied | No copied confirmation | `catch` resets state |
| Navigating from Docs to home | Full page load | Docs is outside router |
| Clicking landing internal hash links | Browser smooth scroll | `scroll-behavior: smooth` |
| Reduced motion | Animations nearly disabled | Media query present |
| No JavaScript | Blank page | Client-rendered only |

---

## 11. Related documents

- [System architecture](system-architecture.md)
- [High-level design](high-level-design.md)
- [Component architecture](component-architecture.md)
- [Data flow](data-flow.md)
- [Frontend architecture](../engineering/frontend-architecture.md)
- [Routing](../engineering/routing.md)
- [Styling and design tokens](../engineering/styling-and-design-tokens.md)
