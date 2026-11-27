import React, { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import {
  ArrowUpRight,
  GithubLogo,
  Palette,
  Coin,
  PuzzlePiece,
  Sparkle,
  UsersThree,
} from '@phosphor-icons/react';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import { useThemePreview } from '../context/ThemeContext.jsx';

const sections = [
  { name: 'Studio', path: '/studio', icon: <Sparkle size={17} weight="regular" />, number: '04' },
  { name: 'Foundations', path: '/explore/foundations', icon: <Palette size={17} weight="regular" />, number: '01' },
  { name: 'Tokens', path: '/explore/tokens', icon: <Coin size={17} weight="regular" />, number: '02' },
  { name: 'Components', path: '/explore/components', icon: <PuzzlePiece size={17} weight="regular" />, number: '03' },
  { name: 'Community', path: '/explore/community', icon: <UsersThree size={17} weight="regular" />, number: '05' },
];

function AtriaMark({ small = false }) {
  return (
    <span className={small ? 'brand-mark small' : 'brand-mark'} aria-hidden="true">
      <span /><span /><span /><span />
    </span>
  );
}

function ExploreFooter() {
  return (
    <footer className="footer explore-footer shell">
      <div className="footer-top">
        <Link className="brand" to="/" aria-label="Atria home">
          <AtriaMark />
          <span>atria<span className="brand-period">.</span></span>
        </Link>
        <p>A more considered way to build<br />and maintain design systems.</p>
        <a className="footer-github" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">
          <GithubLogo size={18} /> Star the project <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ATRIA STUDIO</span>
        <span>OPEN SOURCE · DESIGN SYSTEM STUDIO</span>
        <Link to="/docs">DOCUMENTATION</Link>
        <a href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12} /></a>
      </div>
    </footer>
  );
}

export default function DashboardLayout() {
  const { previewTheme, isDark } = useThemePreview();

  return (
    <div className="explore-page" data-theme={previewTheme}>
      <header className="explore-header">
        <nav className="nav shell explore-top-nav" aria-label="Explore Studio navigation">
          <Link className="brand" to="/" aria-label="Atria home">
            <AtriaMark />
            <span>atria<span className="brand-period">.</span></span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ThemePreviewToggle
              mode={previewTheme}
              onChange={setPreviewTheme}
              label="Explore Studio navbar theme toggle"
            />
            <a className="nav-cta" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">
              <GithubLogo size={17} weight="regular" /> View on GitHub <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      </header>

      <div className="explore-workspace shell">
        <aside className="explore-sidebar" aria-label="Explore sections">
          <div className="explore-sidebar-label">EXPLORE STUDIO</div>
          <nav className="explore-section-nav">
            {sections.map((section) => (
              <NavLink
                key={section.path}
                to={section.path}
                className={({ isActive }) =>
                  isActive ? 'explore-section-link active' : 'explore-section-link'
                }
                aria-label={`${section.name} ${section.number}`}
              >
                <span className="explore-section-icon">{section.icon}</span>
                <span>{section.name}</span>
                <small>{section.number}</small>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="explore-content">
          <ErrorBoundary>
            <Outlet context={{ previewTheme, setPreviewTheme, isDark }} />
          </ErrorBoundary>
        </main>
      </div>

      <ExploreFooter />
    </div>
  );
}
