import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import Overview from './pages/Overview.jsx'
import Foundations from './pages/Foundations.jsx'
import Tokens from './pages/Tokens.jsx'
import Components from './pages/Components.jsx'
import Community from './pages/Community.jsx'
import Studio from './pages/Studio.jsx'
import Docs from './Docs.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import MotionController from './components/MotionController.jsx'
import { ThemeProvider, useThemePreview } from './context/ThemeContext.jsx'
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

const swatches = ['#EDEBE4', '#111111', '#1D4ED8', '#F43F5E']
const tickerPhrases = ['DESIGN WITH INTENTION', 'BUILD WITH CLARITY', 'DOCUMENT EVERYTHING']

function LandingPage() {
  const [activeTab, setActiveTab] = useState('Button')
  const [copied, setCopied] = useState(false)
  useThemePreview()

  const copyToken = async () => {
    try {
      await navigator.clipboard.writeText('--atria-space-4: 16px;')
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch { setCopied(false) }
  }

  return (
    <main className="landing-page atria-home-v2" data-theme="dark">
      <nav className="nav shell home-nav">
        <a className="brand" href="#" aria-label="Atria home">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span>atria<span className="brand-period">.</span></span>
        </a>
        <div className="nav-links">
          <Link to="/explore/community">Community</Link><Link to="/studio">Studio</Link>
          <a href="#foundations">Foundations</a><a href="#components">Components</a>
          <Link to="/docs">Docs</Link>
        </div>
        <a className="nav-cta" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">
          <GithubLogo size={17}/> GitHub <ArrowUpRight size={14}/>
        </a>
      </nav>

      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="eyebrow"><span className="live-dot"/> OPEN-SOURCE DESIGN SYSTEM WORKSPACE</div>
          <h1 aria-label="Make consistency feel effortless">Make your system<br/><em>make sense.</em></h1>
          <p>Atria brings foundations, tokens and components into one connected workspace — so teams can make better design decisions and carry them into code.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/explore">Explore Library <ArrowRight size={16}/></Link>
            <Link className="text-link" to="/studio">Open Studio <ArrowUpRight size={15}/></Link>
          </div>
          <div className="home-hero-meta"><span>DESIGN SYSTEMS, WITHOUT THE SCATTER</span><span>01 — 04</span></div>
        </div>
        <div className="home-hero-visual" aria-label="Atria visual identity">
          <div className="home-visual-head"><span>ATRIA / DESIGN LANGUAGE</span><span>BUILT WITH INTENTION</span></div>
          <div className="home-hero-art" aria-hidden="true">
            <div className="home-art-orbit home-art-orbit-one"/>
            <div className="home-art-orbit home-art-orbit-two"/>
            <div className="home-art-disc"/>
            <div className="home-art-block home-art-block-blue"/>
            <div className="home-art-block home-art-block-coral"/>
            <div className="home-art-letter">A<span>.</span></div>
            <div className="home-art-note home-art-note-top">FOUNDATIONS<br/>01 / 04</div>
            <div className="home-art-note home-art-note-bottom">A SYSTEM OF<br/>CONNECTED IDEAS</div>
            <div className="home-art-cross">✳</div>
          </div>
          <div className="home-visual-caption"><span>FIG. 01</span><span>FORM FOLLOWS INTENTION</span></div>
        </div>
      </section>

      <div className="home-marquee ticker" role="region" aria-label="Atria principles">
        <div className="ticker-group"><span>MAKE WITH INTENTION</span><i>✳</i><span>BUILD WITH CLARITY</span><i>✳</i><span>SHIP WITH CONFIDENCE</span><i>✳</i></div>
        <div className="ticker-group" aria-hidden="true"><span>MAKE WITH INTENTION</span><i>✳</i><span>BUILD WITH CLARITY</span><i>✳</i><span>SHIP WITH CONFIDENCE</span><i>✳</i></div>
      </div>

      <section className="home-intro shell">
        <div className="section-index">[ 01 — THE IDEA ]</div>
        <div><h2>Good products are built<br/>on <em>good systems.</em></h2>
          <div className="home-intro-aside"><p>From the first colour decision to the final component state, Atria gives your product language a clear, consistent home. Less scattered documentation. More connected decisions.</p><Link className="text-link" to="/explore">Explore the workspace <ArrowUpRight size={15}/></Link></div>
        </div>
      </section>

      <section className="home-foundations" id="foundations">
        <div className="shell">
          <div className="home-section-head"><div><div className="section-index">[ 02 — THE BUILDING BLOCKS ]</div><h2>A system starts<br/>with the <em>essentials.</em></h2></div><p>Build a visual language your whole team can understand, use and extend.</p></div>
          <div className="home-foundation-grid">
            {foundations.map((item,index)=>{const Icon=item.icon;return <Link to={index===3?"/explore/components":"/explore/foundations"} className="home-foundation-item" key={item.name}>
              <div className="home-foundation-top"><span>{item.meta}</span><ArrowUpRight size={17}/></div><Icon size={25} weight="light"/>
              <h3>{item.name}</h3><p>{item.detail}</p><span className="home-foundation-number">0{index+1}</span>
            </Link>})}
          </div>
        </div>
      </section>

      <section className="home-components shell" id="components">
        <div className="section-index">[ 03 — COMPONENTS IN CONTEXT ]</div>
        <div className="home-components-layout">
          <div><h2>See how the<br/>system <em>behaves.</em></h2><p>Explore component anatomy, states and usage guidance. Switch between examples to see the details in action.</p><Link className="text-link" to="/explore/components">Browse components <ArrowUpRight size={15}/></Link></div>
          <div className="home-playground">
            <div className="home-playground-top"><span>INTERACTIVE PLAYGROUND</span><span>COMPONENT / 0{['Button','Input','Badge'].indexOf(activeTab)+1}</span></div>
            <div className="home-playground-tabs">{['Button','Input','Badge'].map(tab=><button key={tab} className={activeTab===tab?'active':''} onClick={()=>setActiveTab(tab)}>{tab}</button>)}</div>
            <div className="home-playground-stage">
              {activeTab==='Button'&&<><button className="home-primary-button">Get started <ArrowRight size={15}/></button><button className="home-secondary-button">Learn more</button></>}
              {activeTab==='Input'&&<label>Email address<input type="email" placeholder="you@example.com"/></label>}
              {activeTab==='Badge'&&<><span className="home-badge">Stable</span><span className="home-badge coral">Draft</span></>}
            </div>
            <div className="home-playground-bottom"><span>DEFAULT STATE</span><span>INTERACTIVE PREVIEW</span></div>
          </div>
        </div>
      </section>

      <section className="home-token-band">
        <div className="shell home-token-layout"><div><div className="section-index">[ 04 — DESIGN TO DEVELOPMENT ]</div><h2>Decisions that<br/>travel with <em>you.</em></h2></div>
          <div><p>Keep design intent close to the code with clear specifications, reusable tokens and developer-ready exports.</p>
            <div className="home-code"><code>--atria-space-4: 16px;</code><button onClick={copyToken}><Copy size={14}/>{copied?'COPIED':'COPY TOKEN'}</button></div>
            <Link className="text-link" to="/explore/tokens">Explore design tokens <ArrowUpRight size={15}/></Link>
          </div>
        </div>
      </section>

      <section className="home-contact shell" id="contact">
        <div className="section-index">[ 05 — JOIN THE WORK ]</div>
        <div className="home-contact-layout"><div><h2>Build something<br/><em>considered.</em></h2><p>Atria is open source. Explore the workspace, contribute a resource, or help shape what comes next.</p></div>
          <div className="home-contact-links"><Link to="/explore/community">Explore community <ArrowUpRight size={16}/></Link><Link to="/docs">Read the docs <ArrowUpRight size={16}/></Link><a href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">Contribute on GitHub <ArrowUpRight size={16}/></a></div></div>
      </section>
      <footer className="home-footer shell"><a className="brand" href="#"><span className="brand-mark"><span/><span/><span/><span/></span><span>atria<span className="brand-period">.</span></span></a><span>© 2026 ATRIA STUDIO</span><span>OPEN SOURCE · DESIGN SYSTEM STUDIO</span><Link to="/docs">DOCUMENTATION ↗</Link></footer>
    </main>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <MotionController />
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/explore" element={<DashboardLayout />}>
              <Route index element={<Overview />} />
              <Route path="foundations" element={<Foundations />} />
              <Route path="foundations/:categoryId/:resourceId" element={<Foundations />} />
              <Route path="tokens" element={<Tokens />} />
              <Route path="components" element={<Components />} />
              <Route path="community" element={<Community />} />
            </Route>

            <Route path="/studio" element={<Studio />} />
            <Route path="/docs" element={<Docs />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App