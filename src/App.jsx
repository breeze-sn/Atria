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
import ThemePreviewToggle from './components/ThemePreviewToggle.jsx'
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

const swatches = ['#171717', '#55534F', '#99958D', '#D5D1C8', '#EEECE7']
const tickerPhrases = ['DESIGN WITH INTENTION', 'BUILD WITH CLARITY', 'DOCUMENT EVERYTHING']

function LandingPage() {
  const [activeTab, setActiveTab] = useState('Button')
  const [copied, setCopied] = useState(false)
  const { previewTheme, setPreviewTheme, isDark } = useThemePreview()

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
    <main className="landing-page" data-theme={previewTheme}>
      <nav className="nav shell">
        <a className="brand" href="#" aria-label="Atria home">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span>atria<span className="brand-period">.</span></span>
        </a>
        <div className="nav-links">
          <Link to="/studio">Studio</Link>
          <a href="#foundations">Foundation</a>
          <a href="#components">Components</a>
          <Link to="/explore/community">Community</Link>
          <Link to="/docs">Docs</Link>
          <a href="#contact">Contact</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <ThemePreviewToggle
            mode={previewTheme}
            onChange={setPreviewTheme}
            label="Navbar theme preview toggle"
          />
          <a className="nav-cta" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">
            <GithubLogo size={17} weight="regular" /> View on GitHub <ArrowUpRight size={14} />
          </a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> OPEN-SOURCE DESIGN WORKSPACE</div>
          <h1>Make consistency<br />feel <em>effortless.</em></h1>
          <p className="hero-description">
            A thoughtful space to create, organise, and document design systems — bringing design decisions and development closer together.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/explore">Explore library <ArrowRight size={16} /></Link>