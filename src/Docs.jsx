import { Link } from 'react-router-dom'
import ThemePreviewToggle from './components/ThemePreviewToggle.jsx'
import { useThemePreview } from './context/ThemeContext.jsx'
import {
  ArrowUpRight,
  BookOpen,
  Code,
  FileText,
  Palette,
  Stack,
  Cube,
  GithubLogo,
} from '@phosphor-icons/react'
import './Docs.css'

const REPO = 'https://github.com/breeze-sn/Atria/blob/main'

const groups = [
  {
    id: 'getting-started',
    number: '01',
    title: 'Getting Started',
    description: 'Everything you need to understand Atria and start working with the project.',
    items: [
      {
        icon: BookOpen,
        title: 'Getting Started Guide',
        type: 'GUIDE',
        description: 'An introduction to Atria, its structure, prerequisites and development workflow.',
        href: `${REPO}/docs/getting-started/README.md`,
      },
      {
        icon: FileText,
        title: 'Installation',
        type: 'SETUP',
        description: 'Clone the repository, install dependencies and run Atria locally.',
        href: `${REPO}/docs/getting-started/installation.md`,
      },
      {
        icon: Code,
        title: 'Local Development',
        type: 'DEVELOPER GUIDE',
        description: 'Understand the development workflow, routes, commands and testing.',
        href: `${REPO}/docs/getting-started/local-development.md`,
      },
    ],
  },
  {
    id: 'foundations',
    number: '02',
    title: 'Foundations',
    description: 'Explore the visual foundations that create a consistent design language.',
    items: [
      {
        icon: Palette,
        title: 'Explore Foundations',
        type: 'OPEN IN ATRIA',
        description: 'Browse colour, typography, spacing and radius resources.',
        to: '/explore/foundations',
      },
      {
        icon: FileText,
        title: 'Foundation Guidelines',
        type: 'REFERENCE',
        description: 'Understand foundation presets, editing and available exports.',
        href: `${REPO}/docs/features/design-foundations.md`,
      },
    ],
  },
  {
    id: 'tokens',
    number: '03',
    title: 'Tokens',
    description: 'Learn how reusable design values are organised, edited and exported.',
    items: [
      {
        icon: Stack,
        title: 'Explore Tokens',
        type: 'OPEN IN ATRIA',
        description: 'Open the token workspace to search, edit and organise design values.',
        to: '/explore/tokens',
      },
      {
        icon: FileText,
        title: 'Token Documentation',
        type: 'REFERENCE',
        description: 'Read about token collections, validation, local storage and exports.',
        href: `${REPO}/docs/features/design-tokens.md`,
      },
    ],
  },
  {
    id: 'components',
    number: '04',
    title: 'Components',
    description: 'Discover reusable interface patterns, examples and implementation guidance.',
    items: [
      {
        icon: Cube,
        title: 'Explore Components',
        type: 'OPEN IN ATRIA',
        description: 'Browse component examples, states, variants and code snippets.',
        to: '/explore/components',
      },
      {
        icon: FileText,
        title: 'Component Documentation',
        type: 'REFERENCE',
        description: 'Read about component anatomy, usage and accessibility considerations.',
        href: `${REPO}/docs/features/component-library.md`,
      },
    ],
  },
  {
    id: 'studio',
    number: '05',
    title: 'Studio',
    description: 'Move from design decisions to an interactive workspace.',
    items: [
      {
        icon: Code,
        title: 'Open Studio',
        type: 'LAUNCH WORKSPACE',
        description: 'Create, customise, preview and export a design system.',
        to: '/studio',
      },
      {
        icon: BookOpen,
        title: 'Studio Guide',
        type: 'GUIDE',
        description: 'Understand the Studio canvas, panels, local saving and export options.',
        href: `${REPO}/docs/features/studio-builder.md`,
      },
      {
        icon: Stack,
        title: 'Explore Library',
        type: 'OPEN IN ATRIA',
        description: 'Return to the Explore workspace and its design resources.',
        to: '/explore',
      },
    ],
  },
]

function DocumentationCard({ item }) {
  const Icon = item.icon

  const content = (
    <>
      <div className="docs-card-top">
        <span className="docs-card-icon">
          <Icon size={21} weight="light" />
        </span>
        <span className="docs-card-type">{item.type}</span>
      </div>

      <div className="docs-card-copy">
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>

      <div className="docs-card-action">
        <span>{item.to ? 'Open workspace' : 'Read documentation'}</span>
        <ArrowUpRight size={16} />
      </div>
    </>
  )

  return item.to ? (
    <Link
      className="docs-card"
      to={item.to}
      aria-label={`${item.title} — open workspace`}
    >
      {content}
    </Link>
  ) : (
    <a
      className="docs-card"
      href={item.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.title} — open repository documentation`}
    >
      {content}
    </a>
  )
}

export default function Docs() {
  const { previewTheme, setPreviewTheme } = useThemePreview()

  return (
    <main className="docs-page" data-theme={previewTheme}>
      <nav className="nav shell docs-nav" aria-label="Documentation navigation">
        <Link className="brand" to="/" aria-label="Atria home">
          <span className="brand-mark">
            <span /><span /><span /><span />
          </span>
          <span>atria<span className="brand-period">.</span></span>
        </Link>

        <div className="nav-links">
          <Link to="/explore">Explore Library</Link>
          <Link to="/studio">Open Studio</Link>
          <Link to="/docs" aria-current="page">Docs</Link>
        </div>

        <div className="docs-nav-actions">
          <ThemePreviewToggle
            mode={previewTheme}
            onChange={setPreviewTheme}
            label="Docs theme preview toggle"
          />

          <a
            className="nav-cta"
            href="https://github.com/breeze-sn/Atria"
            target="_blank"
            rel="noreferrer"
          >
            <GithubLogo size={17} />
            GitHub
            <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      <section className="docs-hero shell">
        <div className="docs-hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            THE ATRIA KNOWLEDGE SPACE
          </div>

          <h1>
            Understand the system.
            <br />
            <em>Build with clarity.</em>
          </h1>

          <p className="hero-description">
            Explore the documentation behind Atria, from getting started
            and design foundations to reusable components and the Studio
            workspace.
          </p>

          <div className="docs-hero-actions">
            <Link className="button button-dark" to="/explore">
              Explore Library <ArrowUpRight size={16} />
            </Link>

            <Link className="text-link" to="/studio">
              Open Studio <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="docs-index-panel">
          <span className="docs-index-label">DOCUMENTATION INDEX</span>
          <strong>05</strong>
          <span>CORE COLLECTIONS</span>
          <div className="docs-index-divider" />
          <p>
            One place for product context, design guidance and implementation
            resources.
          </p>
          <span className="docs-index-footer">ATRIA / KNOWLEDGE BASE</span>
        </div>
      </section>

      <section className="docs-jump shell" aria-label="Documentation sections">
        <span>JUMP TO</span>

        {groups.map(group => (
          <a key={group.id} href={`#${group.id}`}>
            {group.title}
          </a>
        ))}
      </section>

      <section className="docs-library">
        <div className="shell">
          <div className="docs-library-heading">
            <div>
              <div className="section-index">[ THE DOCUMENTATION LIBRARY ]</div>
              <h2>Explore the <em>knowledge.</em></h2>
            </div>

            <span className="docs-count">
              05 COLLECTIONS / REPOSITORY GUIDES
            </span>
          </div>

          {groups.map(group => (
            <section
              className="docs-group"
              id={group.id}
              key={group.id}
            >
              <div className="docs-group-heading">
                <span className="docs-group-number">{group.number}</span>

                <div>
                  <h2>{group.title}</h2>
                  <p>{group.description}</p>
                </div>
              </div>

              <div className="docs-card-grid">
                {group.items.map(item => (
                  <DocumentationCard
                    key={item.title}
                    item={item}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <footer className="footer shell docs-footer">
        <div className="footer-top">
          <Link className="brand" to="/">
            <span className="brand-mark">
              <span /><span /><span /><span />
            </span>
            <span>atria<span className="brand-period">.</span></span>
          </Link>

          <p>
            A more considered way to build
            <br />
            and maintain design systems.
          </p>

          <Link className="footer-github" to="/explore">
            Explore the workspace <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="footer-bottom">
          <span>© 2026 ATRIA STUDIO</span>
          <span>DOCUMENTATION / KNOWLEDGE BASE</span>
          <Link to="/studio">OPEN STUDIO</Link>
          <Link to="/">BACK TO HOME</Link>
        </div>
      </footer>
    </main>
  )
}