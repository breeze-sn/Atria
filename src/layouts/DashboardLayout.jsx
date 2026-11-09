import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  ArrowUpRight,
  GithubLogo,
  House,
  Palette,
  Coin,
  PuzzlePiece,
} from '@phosphor-icons/react';

const sections = [
  { name: 'Foundations', path: '/explore/foundations', icon: <Palette size={17} weight="regular" />, number: '01' },
  { name: 'Tokens', path: '/explore/tokens', icon: <Coin size={17} weight="regular" />, number: '02' },
  { name: 'Components', path: '/explore/components', icon: <PuzzlePiece size={17} weight="regular" />, number: '03' },
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
        <a className="brand" href="/" aria-label="Atria home">
          <AtriaMark />
          <span>atria<span className="brand-period">.</span></span>
        </a>
        <p>A more considered way to build<br />and maintain design systems.</p>
        <a className="footer-github" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">
          <GithubLogo size={18} /> Star the project <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ATRIA STUDIO</span>
        <span>OPEN SOURCE · EARLY DEVELOPMENT</span>
        <a href="/docs">DOCUMENTATION</a>
        <a href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12} /></a>
      </div>
    </footer>
  );
}

export default function DashboardLayout() {
  return (
    <div className="explore-page">
      <header className="explore-header">
        <nav className="nav shell explore-top-nav" aria-label="Main navigation">
          <a className="brand" href="/" aria-label="Atria home">
            <AtriaMark />
            <span>atria<span className="brand-period">.</span></span>
          </a>
          <div className="nav-links">
            <a href="/#studio">Studio</a>
            <a href="/#foundations">Foundation</a>
            <a href="/#components">Components</a>
            <a href="/docs">Docs</a>
            <a href="/#contact">Contact</a>
          </div>
          <a className="nav-cta" href="https://github.com/breeze-sn/Atria" target="_blank" rel="noreferrer">
            <GithubLogo size={17} weight="regular" /> View on GitHub <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <div className="explore-workspace shell">
        <aside className="explore-sidebar" aria-label="Explore sections">
          <a className="explore-sidebar-brand" href="/" aria-label="Atria home">
            <AtriaMark />
            <span>atria<span className="brand-period">.</span></span>
          </a>
          <div className="explore-sidebar-label">EXPLORE STUDIO</div>
          <nav className="explore-section-nav">
            {sections.map((section) => (
              <NavLink
                key={section.path}
                to={section.path}
                className={({ isActive }) => `explore-section-link ${isActive ? 'active' : ''}`}
              >
                <span className="explore-section-icon">{section.icon}</span>
                <span>{section.name}</span>
                <small>{section.number}</small>
              </NavLink>
            ))}
          </nav>
          <a className="explore-home-link" href="/">
            <House size={16} /> Back to homepage <ArrowUpRight size={13} />
          </a>
        </aside>

        <main className="explore-content">
          <Outlet />
        </main>
      </div>

      <ExploreFooter />
    </div>
  );
}
