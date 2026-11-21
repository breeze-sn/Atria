import React, { useState } from 'react';
import { ArrowUpRight, Palette, Coin, PuzzlePiece, WarningCircle } from '@phosphor-icons/react';
import { communityContributions, communityValidationErrors } from '../data/communityContributions.js';

const filters = [
  { value: 'all', label: 'All contributions' },
  { value: 'palette', label: 'Palettes' },
  { value: 'tokens', label: 'Token sets' },
  { value: 'component', label: 'Components' },
];

const tokenGroups = [
  { key: 'colors', label: 'Colours' },
  { key: 'typography', label: 'Typography' },
  { key: 'spacing', label: 'Spacing' },
  { key: 'radius', label: 'Border radius' },
  { key: 'other', label: 'Other' },
];

const typeLabels = {
  palette: 'COLOUR PALETTE',
  tokens: 'DESIGN TOKEN SET',
  component: 'COMPONENT DESIGN',
};

function contributorLabel(contributor) {
  if (contributor.name && contributor.github) return `${contributor.name} · @${contributor.github}`;
  if (contributor.github) return `@${contributor.github}`;
  return contributor.name;
}

function ContributionAttribution({ contribution }) {
  return (
    <div className="community-attribution">
      <span>By {contributorLabel(contribution.contributor)}</span>
      <a href={contribution.sourceUrl} target="_blank" rel="noreferrer">
        View source <ArrowUpRight size={13} aria-hidden="true" />
      </a>
    </div>
  );
}

function PaletteContent({ contribution }) {
  return (
    <>
      <ul className="community-swatches" aria-label={`${contribution.name} colour swatches`}>
        {contribution.colors.map((color) => (
          <li key={color.name}>
            <span
              className="community-swatch"
              style={{ backgroundColor: color.hex }}
              aria-hidden="true"
            />
            <strong>{color.name}</strong>
            <code>{color.hex.toUpperCase()}</code>
            {color.notes && <small>{color.notes}</small>}
          </li>
        ))}
      </ul>
      {contribution.usageNotes && <p className="community-usage-notes">{contribution.usageNotes}</p>}
    </>
  );
}

function formatTokenValue(group, token) {
  if (group === 'typography') {
    return `${token.fontFamily} · ${token.fontSize} · ${token.fontWeight} · ${token.lineHeight}`;
  }
  if (group === 'other') return `${token.type}: ${token.value}`;
  return token.value;
}

function TokenContent({ contribution }) {
  return (
    <div className="community-token-groups">
      {tokenGroups.map(({ key, label }) => {
        const tokens = contribution.tokens[key] || [];
        if (!tokens.length) return null;
        return (
          <section className="community-token-group" key={key} aria-label={label}>
            <h3>{label}</h3>
            <ul>
              {tokens.map((token) => (
                <li key={token.name}>
                  <code>{token.name}</code>
                  <span>{formatTokenValue(key, token)}</span>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function ComponentPreview({ preview }) {
  const style = {
    backgroundColor: preview.background,
    color: preview.foreground,
  };

  return (
    <div className={`community-preview community-preview-${preview.kind}`} role="img" aria-label={`${preview.kind} preview: ${preview.label}`}>
      <span style={style}>{preview.label}</span>
    </div>
  );
}

function ComponentContent({ contribution }) {
  return (
    <>
      <ComponentPreview preview={contribution.preview} />
      {['variants', 'states'].map((key) => (
        <section className="community-component-list" key={key}>
          <h3>{key === 'variants' ? 'Variants' : 'States'}</h3>
          <ul>
            {contribution[key].map((item) => (
              <li key={item.name}>
                <strong>{item.name}</strong>
                <span>{item.description}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {contribution.references?.length > 0 && (
        <div className="community-references">
          {contribution.references.map((reference) => (
            <a href={reference.url} key={reference.url} target="_blank" rel="noreferrer">
              {reference.label} <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </>
  );
}

function ContributionCard({ contribution }) {
  const Icon = contribution.type === 'palette'
    ? Palette
    : contribution.type === 'tokens'
      ? Coin
      : PuzzlePiece;

  return (
    <article className="community-card">
      <div className="community-card-kicker">
        <span><Icon size={14} aria-hidden="true" /> {typeLabels[contribution.type]}</span>
      </div>
      <h2>{contribution.name}</h2>
      <p className="community-card-description">{contribution.description}</p>
      {contribution.type === 'palette' && <PaletteContent contribution={contribution} />}
      {contribution.type === 'tokens' && <TokenContent contribution={contribution} />}
      {contribution.type === 'component' && <ComponentContent contribution={contribution} />}
      <ContributionAttribution contribution={contribution} />
    </article>
  );
}

function ValidationNotice() {
  if (!communityValidationErrors.length) return null;

  return (
    <div className="community-validation" role="alert">
      <div className="community-validation-heading">
        <WarningCircle size={18} aria-hidden="true" />
        <strong>Some community contributions need attention</strong>
      </div>
      <p>Invalid entries are hidden until their data is corrected.</p>
      <ul>
        {communityValidationErrors.flatMap(({ file, errors }) =>
          errors.map((error) => <li key={`${file}:${error}`}><code>{file}</code> — {error}</li>),
        )}
      </ul>
    </div>
  );
}

export default function Community() {
  const [activeFilter, setActiveFilter] = useState('all');
  const visibleContributions = activeFilter === 'all'
    ? communityContributions
    : communityContributions.filter((contribution) => contribution.type === activeFilter);

  return (
    <div className="community-page">
      <div className="section-index">[ EXPLORE / COMMUNITY ]</div>
      <div className="community-heading">
        <div>
          <span className="studio-status">COMMUNITY LIBRARY</span>
          <h1>Made to be shared.</h1>
        </div>
        <a
          className="community-submit-link"
          href="https://github.com/breeze-sn/Atria/blob/main/docs/contributing/community-contributions.md"
          target="_blank"
          rel="noreferrer"
        >
          Contribute a resource <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
      <p className="community-intro">
        Browse community-created colour palettes, design token sets, and component ideas.
        Contributions are stored as reviewed files in the repository—no account or sync required.
      </p>

      <ValidationNotice />

      <div className="community-filter-row">
        <div className="community-filters" role="group" aria-label="Filter community contributions">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter.value}
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        <span className="community-result-count" aria-live="polite">
          {visibleContributions.length} {visibleContributions.length === 1 ? 'resource' : 'resources'}
        </span>
      </div>

      {visibleContributions.length ? (
        <div className="community-grid">
          {visibleContributions.map((contribution) => (
            <ContributionCard key={contribution.id} contribution={contribution} />
          ))}
        </div>
      ) : (
        <p className="community-empty" role="status">No contributions in this category yet.</p>
      )}

      <p className="community-review-note">
        Contributions are reviewed before they are added. See the submission guide for the data format,
        validation command, and review process.
      </p>
    </div>
  );
}
