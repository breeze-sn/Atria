# Architecture Diagrams

This page collects the primary architecture diagrams in one place. All diagrams use Mermaid and
describe the implementation in this repository. Planned capabilities are labelled.

---

## 1. System context diagram

Shows the system boundary, actors, static hosting, and external services.

```mermaid
flowchart LR
  Visitor([Visitor / Contributor])
  Host[Vercel static hosting]

  subgraph System["Atria system boundary"]
    SPA[React SPA<br/>Landing + Docs + Studio shell]
  end

  GitHub[GitHub]
  Actions[GitHub Actions]
  GDocs[Google Docs]
  Fonts[Google Fonts]
  Clipboard[Clipboard API]
  External[External profile links]

  Visitor -->|HTTPS| Host
  Host -->|serves| SPA
  SPA -->|source and issue links| GitHub
  GitHub -->|CI| Actions
  SPA -->|document cards| GDocs
  SPA -->|webfonts| Fonts
  SPA -->|copy demo| Clipboard
  SPA -->|contact links| External
```

**Notes**

- One deployable unit: the static SPA.
- No backend, API, database, authentication, or persistence.
- Google Docs and Google Fonts are external dependencies.

---

## 2. Application architecture diagram

Shows entry branching and route composition.

```mermaid
flowchart TD
  HTML[index.html] --> Main[src/main.jsx]
  Main --> Path{pathname === '/docs'?}
  Path -->|Yes| Docs[src/Docs.jsx]
  Path -->|No| App[src/App.jsx]
  App --> Router[BrowserRouter]
  Router --> Landing[LandingPage]
  Router --> Layout[DashboardLayout]
  Layout --> Foundations[Foundations]
  Layout --> Tokens[Tokens]
  Layout --> Components[Components]
  CSS[src/index.css] --> Landing
  CSS --> Docs
  CSS --> Layout
  CSS --> Foundations
  CSS --> Tokens
  CSS --> Components
```

**Notes**

- `Docs` is outside React Router.
- `DashboardLayout` wraps the three Studio briefs through an `Outlet`.

---

## 3. Component interaction diagram

Shows interaction between UI components and local state.

```mermaid
flowchart LR
  subgraph Entry
    Main[main.jsx]
  end

  subgraph Public
    Landing[LandingPage]
    Tabs[Playground tabs]
    Preview[Preview stage]
    Copy[Copy button]
    Clipboard[Clipboard API]
  end

  subgraph Docs
    DocsPage[Docs]
    DocCard[doc-card]
    GDocs[Google Docs]
  end

  subgraph Studio
    Layout[DashboardLayout]
    Nav[Sidebar NavLink]
    Brief[Selected brief]
  end

  Main --> Landing
  Main --> DocsPage
  Landing --> Tabs
  Tabs -->|activeTab| Preview
  Copy --> Clipboard
  Clipboard -->|copied| Copy
  DocsPage --> DocCard
  DocCard --> GDocs
  Landing --> Layout
  Layout --> Nav
  Nav -->|route| Brief
```

**Notes**

- `activeTab` and `copied` are local to `LandingPage`.
- The sidebar active state is derived from the current route.

---

## 4. Data flow diagram

Shows static content, URL state, local state, and external links.

```mermaid
flowchart LR
  Arrays[Static arrays<br/>foundations, swatches, groups, briefs] --> Render[React render]
  Route[URL / router state] --> Render
  Local[Local useState] --> Render
  Click[User interaction] --> Local
  Click --> Clipboard[Clipboard API]
  Render --> DOM[Rendered UI]
  DocsURLs[Google Docs URLs] --> DocCards[/docs cards]
  FontURLs[Google Fonts URLs] --> Browser[Browser font loading]
```

**Notes**

- No API, database, or persistence.
- The only runtime write is the hard-coded token string copied to the clipboard.

---

## 5. Application workflow diagram

Shows the main user journeys.

```mermaid
flowchart TD
  Start([Open Atria]) --> Which{Which area?}
  Which -->|Landing| Explore[Read hero and sections]
  Explore --> Try[Try playground tabs]
  Explore --> CopyToken[Copy demo token]
  Explore --> Contact[Follow contact links]
  Which -->|/docs| Docs[Browse documentation collections]
  Docs --> External[Open external Google Doc]
  Docs --> Back[Return home]
  Which -->|/explore| Studio[Explore Studio shell]
  Studio --> F[Read Foundations brief]
  Studio --> T[Read Tokens brief]
  Studio --> C[Read Components brief]
  F --> Contribute{Want to build it?}
  T --> Contribute
  C --> Contribute
  Contribute -->|Yes| Issue[Open or discuss an issue]
  Issue --> PR[Fork, implement, build, open PR]
```

**Notes**

- Studio sections are informational today.
- Contribution is the intended next step after reading a brief.

---

## 6. Deployment architecture diagram

Shows source control, CI verification, and Vercel hosting.

```mermaid
flowchart LR
  Dev[Developer] -->|push / PR| GitHub[GitHub repository]
  GitHub -->|workflow| CI[GitHub Actions]
  CI -->|npm install| Install[Install dependencies]
  Install -->|npm run lint --if-present| Lint[No-op: no lint script]
  Lint -->|npm run build| BuildCheck[Build verification]
  GitHub -->|Vercel Git integration| Vercel[Vercel build]
  Vercel -->|npm run build| Dist[dist/]
  Dist --> CDN[Vercel CDN]
  CDN -->|rewrite to index.html| Browser([Browser])
```

**Notes**

- GitHub Actions verifies the build; it does not deploy.
- Vercel handles the production build and static hosting.
- All paths rewrite to `index.html` so client routes work on refresh.

---

## Diagram maintenance

When the architecture changes:

1. Update the relevant diagram in this file.
2. Update the matching detailed document.
3. Add or update an ADR if the decision is structural.
4. Confirm the diagram does not claim unbuilt functionality.
5. Check that Mermaid renders in GitHub and your editor.

---

## Related documents

- [System architecture](system-architecture.md)
- [High-level design](high-level-design.md)
- [Low-level design](low-level-design.md)
- [Component architecture](component-architecture.md)
- [Data flow](data-flow.md)
- [Deployment](../deployment/build-and-deployment.md)
