import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Foundations from './pages/Foundations.jsx'
import Tokens from './pages/Tokens.jsx'
import Components from './pages/Components.jsx'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ArrowsOut,
  Check,
  Code,
  Copy,
  Cube,
  FigmaLogo,
  GithubLogo,
  LinkedinLogo,
  Globe,
  EnvelopeSimple,
  Stack,
  Palette,
  SlidersHorizontal,
  Sparkle,
  SquaresFour,
  TextAa,
} from '@phosphor-icons/react'

const foundations = [
  { icon: Palette, name: 'Colour', detail: 'Build expressive, accessible palettes', meta: 'FOUNDATION / 01' },
  { icon: TextAa, name: 'Typography', detail: 'Define type scales and text styles', meta: 'FOUNDATION / 02' },
  { icon: SlidersHorizontal, name: 'Spacing', detail: 'Create a consistent spatial system', meta: 'FOUNDATION / 03' },
  { icon: Cube, name: 'Components', detail: 'Document reusable interface patterns', meta: 'LIBRARY / 04' },
]

const swatches = ['#171717', '#55534F', '#99958D', '#D5D1C8', '#EEECE7']

function LandingPage() {
  const [activeTab, setActiveTab] = useState('Button')
  const [copied, setCopied] = useState(false)

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText('--atria-space-4: 16px;')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main>
      <nav className="nav shell">
        <a className="brand" href="#" aria-label="Atria home">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span>atria<span className="brand-period">.</span></span>
        </a>
        <div className="nav-links">
          <a href="#studio">Studio</a>
          <a href="#foundations">Foundation</a>
          <a href="#components">Components</a>
          <a href="/docs">Docs</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-cta" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">
          <GithubLogo size={17} weight="regular" /> View on GitHub <ArrowUpRight size={14} />
        </a>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> OPEN-SOURCE DESIGN WORKSPACE</div>
          <h1>Make consistency<br />feel <em>effortless.</em></h1>
          <p className="hero-description">
            A thoughtful space to create, organise, and document design systems — bringing design decisions and development closer together.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#studio">Explore the studio <ArrowRight size={16} /></a>
            <a className="text-link" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">Explore the repository <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-footnote"><span className="mono">01 / 04</span><span>DESIGNED FOR TEAMS THAT CARE ABOUT THE DETAILS</span></div>
        </div>

        <div className="hero-art" aria-label="Abstract preview of a design system workspace">
          <div className="art-topline"><span>ATRIA / WORKSPACE</span><span>PREVIEW 001</span></div>
          <div className="art-window">
            <aside className="art-sidebar">
              <div className="mini-brand"><span className="brand-mark small"><span /><span /><span /><span /></span> atria</div>
              <div className="side-label">WORKSPACE</div>
              <div className="side-item active"><SquaresFour size={14} /> Overview</div>
              <div className="side-item"><Palette size={14} /> Foundations</div>
              <div className="side-item"><Cube size={14} /> Components</div>
              <div className="side-item"><Stack size={14} /> Tokens</div>
              <div className="side-bottom"><span className="avatar">A</span><span>Personal space</span></div>
            </aside>
            <div className="art-main">
              <div className="art-heading"><div><span className="side-label">YOUR WORKSPACE</span><h3>Good design<br />starts with a system.</h3></div><span className="art-date">MON, 03 NOV</span></div>
              <div className="art-stats">
                <div><span>FOUNDATIONS</span><strong>04</strong><small>Core principles</small></div>
                <div><span>COMPONENTS</span><strong>12</strong><small>Reusable patterns</small></div>
                <div><span>DESIGN TOKENS</span><strong>28</strong><small>Shared decisions</small></div>
              </div>
              <div className="art-palette">
                <div className="palette-heading"><span>COLOUR PALETTE</span><span>NEUTRAL / 01</span></div>
                <div className="swatches">{swatches.map((color) => <span key={color} style={{ background: color }} />)}</div>
                <div className="palette-values"><span>INK</span><span>STONE</span><span>ASH</span><span>MIST</span><span>PAPER</span></div>
              </div>
              <div className="art-bottom"><span><Sparkle size={13} /> A system in progress</span><span>VIEW DETAILS <ArrowUpRight size={12} /></span></div>
            </div>
          </div>
          <div className="art-caption"><span>FIG. 01</span><span>A SINGLE SOURCE OF DESIGN TRUTH</span></div>
        </div>
      </section>

      <section className="ticker" aria-label="Atria principles">
        <div className="ticker-track"><span>DESIGN WITH INTENTION</span><i>✳</i><span>BUILD WITH CLARITY</span><i>✳</i><span>DOCUMENT EVERYTHING</span><i>✳</i><span>DESIGN WITH INTENTION</span><i>✳</i><span>BUILD WITH CLARITY</span><i>✳</i></div>
      </section>

      <section className="intro-section shell" id="studio">
        <div className="section-index">[ 01 — THE IDEA ]</div>
        <div className="intro-content">
          <h2>A home for the details<br />that make a <em>system.</em></h2>
          <div className="intro-aside">
            <p>Great products are built on small, consistent decisions. Atria gives those decisions a place to live — from the first colour token to the final component specification.</p>
            <a className="text-link" href="#foundations">Discover the foundations <ArrowDownRight size={15} /></a>
          </div>
        </div>
      </section>

      <section className="foundations-section" id="foundations">
        <div className="shell">
          <div className="section-heading">
            <div><div className="section-index">[ 02 — BUILDING BLOCKS ]</div><h2>Everything starts<br />with a <em>foundation.</em></h2></div>
            <p>Bring the visual language of your product into one clear, connected place.</p>
          </div>
          <div className="foundation-grid">
            {foundations.map((item, index) => {
              const Icon = item.icon
              return <article className="foundation-card" key={item.name}>
                <div className="card-meta"><span>{item.meta}</span><span>0{index + 1}</span></div>
                <div className="foundation-icon"><Icon size={22} weight="light" /></div>
                <h3>{item.name}</h3>
                <p>{item.detail}</p>
                <div className="card-arrow"><ArrowUpRight size={17} /></div>
              </article>
            })}
          </div>
        </div>
      </section>

      <section className="components-section shell" id="components">
        <div className="section-index">[ 03 — THE COMPONENT LIBRARY ]</div>
        <div className="component-layout">
          <div className="component-copy"><h2>From design<br />to <em>real use.</em></h2><p>Explore component anatomy, states, and usage guidance in a space made for both designers and developers.</p><div className="component-note"><Code size={17} /> ONE LANGUAGE. TWO DISCIPLINES.</div></div>
          <div className="component-preview">
            <div className="preview-top"><span>COMPONENT PLAYGROUND</span><span>INTERACTIVE PREVIEW <span className="live-dot" /></span></div>
            <div className="preview-tabs">{['Button', 'Input', 'Badge'].map(tab => <button key={tab} className={activeTab === tab ? 'selected' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div>
            <div className="preview-stage">
              {activeTab === 'Button' && <><button className="sample-button">Get started <ArrowRight size={15} /></button><button className="sample-secondary">Learn more</button></>}
              {activeTab === 'Input' && <label className="sample-input">Email address<input type="email" placeholder="you@example.com" /></label>}
              {activeTab === 'Badge' && <><span className="sample-badge"><span className="live-dot" /> Stable</span><span className="sample-badge muted">In progress</span></>}
            </div>
            <div className="preview-footer"><span>DEFAULT STATE / {activeTab.toUpperCase()}</span><span>PREVIEW ONLY</span></div>
          </div>
        </div>
      </section>

      <section className="token-strip">
        <div className="shell token-inner">
          <div><div className="section-index">[ 04 — DEVELOPER FRIENDLY ]</div><h2>Designed to be<br /><em>handed off.</em></h2></div>
          <div className="token-copy"><p>Keep design intent close to the code. Atria is being shaped around clear specifications, reusable tokens, and developer-ready exports.</p><div className="code-snippet"><code><span>--atria-space-4</span>: 16px;</code><button onClick={copyToken} aria-label="Copy token"><Copy size={15} /> {copied ? 'COPIED' : 'COPY'}</button></div><div className="token-foot"><Check size={14} /> CSS variables & JSON exports are part of the roadmap</div></div>
        </div>
      </section>


      <section className="contact-section shell" id="contact">
        <div className="section-index">[ 05 — GET IN TOUCH ]</div>
        <div className="contact-layout">
          <div><h2>Good things start<br />with a <em>conversation.</em></h2><p className="contact-intro">Have a thought, a question, or an idea to build together? Find me around the web.</p></div>
          <div className="contact-links">
            <a className="contact-link contact-email" href="mailto:nagekarsimran@outlook.com"><span><EnvelopeSimple size={18} /> Email</span><ArrowUpRight size={16} /></a>
            <a className="contact-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><span><LinkedinLogo size={18} /> LinkedIn</span><ArrowUpRight size={16} /></a>
            <a className="contact-link" href="https://github.com/breeze-sn" target="_blank" rel="noreferrer"><span><GithubLogo size={18} /> GitHub</span><ArrowUpRight size={16} /></a>
            <a className="contact-link" href="https://simransn.vercel.app" target="_blank" rel="noreferrer"><span><Globe size={18} /> Website</span><ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="footer-top"><a className="brand" href="#"><span className="brand-mark"><span /><span /><span /><span /></span><span>atria<span className="brand-period">.</span></span></a><p>A more considered way to build<br />and maintain design systems.</p><a className="footer-github" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer"><GithubLogo size={18} /> Star the project <ArrowUpRight size={14} /></a></div>
        <div className="footer-bottom"><span>© 2026 ATRIA STUDIO</span><span>OPEN SOURCE · EARLY DEVELOPMENT</span><a href="/docs">DOCUMENTATION</a><a href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12} /></a></div>
      </footer>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studio" element={<DashboardLayout />}>
          <Route index element={<Navigate to="foundations" replace />} />
          <Route path="foundations" element={<Foundations />} />
          <Route path="tokens" element={<Tokens />} />
          <Route path="components" element={<Components />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App