import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Coin,
  PuzzlePiece,
  Sparkle,
} from '@phosphor-icons/react';

const palette = [
  { name: 'INK', value: '#171717' },
  { name: 'STONE', value: '#55534F' },
  { name: 'ASH', value: '#99958D' },
  { name: 'MIST', value: '#D5D1C8' },
  { name: 'PAPER', value: '#EEECE7' },
];

const modules = [
  {
    number: '01',
    title: 'Foundations',
    description: 'Set the visual rules: colour, typography, spacing and layout.',
    meta: 'START WITH THE BASICS',
    path: '/explore/foundations',
    icon: Palette,
  },
  {
    number: '02',
    title: 'Tokens',
    description: 'Bring design decisions together as reusable, named values.',
    meta: 'DESIGN DECISIONS',
    path: '/explore/tokens',
    icon: Coin,
  },
  {
    number: '03',
    title: 'Components',
    description: 'Document interface patterns, variants, states and usage.',
    meta: 'REUSABLE UI',
    path: '/explore/components',
    icon: PuzzlePiece,
  },
];

export default function Overview() {
  return (
    <div className="workspace-overview">
      <div className="workspace-overview-topline">
        <span className="section-index">[ YOUR WORKSPACE ]</span>
        <span className="workspace-live"><span className="live-dot" /> WORKSPACE OVERVIEW</span>
      </div>

      <section className="workspace-welcome">
        <div>
          <span className="studio-status">ATRIA / DESIGN SYSTEM STUDIO</span>
          <h1>Good design<br />starts with a <em>system.</em></h1>
          <p>A considered space to define foundations, organise design tokens, and build a reusable component language.</p>
          <Link className="button button-dark workspace-primary-action" to="/explore/foundations">
            Set up your foundations <ArrowRight size={15} />
          </Link>
        </div>
        <div className="workspace-welcome-note">
          <Sparkle size={18} weight="light" />
          <span>ONE PLACE FOR<br />EVERY DESIGN DECISION</span>
        </div>
      </section>

      <section className="workspace-metrics" aria-label="Workspace summary">
        <article>
          <span>FOUNDATION AREAS</span>
          <strong>03</strong>
          <small>Colour, type & layout</small>
        </article>
        <article>
          <span>WORKSPACE MODULES</span>
          <strong>03</strong>
          <small>Foundations, tokens & UI</small>
        </article>
        <article>
          <span>WORKSPACE STATUS</span>
          <strong className="workspace-status-value">In progress</strong>
          <small>Building the Atria system</small>
        </article>
      </section>

      <section className="workspace-palette">
        <div className="workspace-section-heading">
          <div>
            <span className="studio-kicker">FOUNDATION / COLOUR</span>
            <h2>A neutral starting point.</h2>
          </div>
          <span className="workspace-section-meta">ATRIA / PALETTE 001</span>
        </div>
        <div className="workspace-swatches">
          {palette.map((item) => (
            <div className="workspace-swatch" key={item.name}>
              <span className="workspace-swatch-colour" style={{ background: item.value }} />
              <span>{item.name}</span>
              <code>{item.value}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="workspace-modules">
        <div className="workspace-section-heading">
          <div>
            <span className="studio-kicker">EXPLORE THE STUDIO</span>
            <h2>Your building blocks.</h2>
          </div>
          <span className="workspace-section-meta">03 MODULES</span>
        </div>
        <div className="workspace-module-list">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Link className="workspace-module" to={module.path} key={module.number}>
                <span className="workspace-module-number">{module.number}</span>
                <span className="workspace-module-icon"><Icon size={21} weight="light" /></span>
                <span className="workspace-module-copy">
                  <small>{module.meta}</small>
                  <strong>{module.title}</strong>
                  <span>{module.description}</span>
                </span>
                <ArrowUpRight className="workspace-module-arrow" size={18} />
              </Link>
            );
          })}
        </div>
      </section>

      <div className="workspace-overview-foot">
        <span>ATRIA / A MORE CONSIDERED DESIGN WORKSPACE</span>
        <span>01 — OVERVIEW</span>
      </div>
    </div>
  );
}
