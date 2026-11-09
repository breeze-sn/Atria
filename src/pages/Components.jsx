import React from 'react';

const componentParts = [
  ['Anatomy & API', 'Document the component name, purpose, properties, slots, and composition rules.'],
  ['Variants & states', 'Support visual variants and interaction states such as default, hover, focus, disabled, and loading where relevant.'],
  ['Live preview', 'Render working examples and let contributors change supported properties to explore behaviour.'],
  ['Usage & accessibility', 'Include do/don’t guidance, keyboard behaviour, semantic requirements, and responsive considerations.'],
  ['Share & reuse', 'Make published component entries discoverable, previewable, and reusable by other creators.'],
];

export default function Components() {
  return (
    <div className="studio-page">
      <div className="section-index">[ STUDIO / 03 — IMPLEMENTATION BRIEF ]</div>
      <div className="studio-page-heading">
        <div><span className="studio-status">PLACEHOLDER · READY FOR CONTRIBUTION</span><h2>Component Library</h2></div>
        <span className="studio-page-count">03 / 03</span>
      </div>
      <p className="studio-page-intro">A shared library where creators can publish interface components and others can discover, inspect, preview, and reuse them.</p>

      <section className="studio-brief">
        <span className="studio-kicker">WHAT TO BUILD</span>
        <h3>From an isolated UI element to a reusable contribution.</h3>
        <p>Each component entry should explain what it does, how it behaves, how it can be configured, and how another creator can use it. Treat the live preview and its documentation as equally important.</p>
      </section>

      <div className="studio-component-parts">
        {componentParts.map(([title, description], index) => (
          <article className="studio-component-part" key={title}>
            <span className="studio-task-number">0{index + 1}</span>
            <div><h3>{title}</h3><p>{description}</p></div>
          </article>
        ))}
      </div>

      <section className="studio-dev-note">
        <span className="studio-kicker">DEVELOPER NOTES</span>
        <ol>
          <li>Create a component registry rather than maintaining separate hard-coded cards for every component.</li>
          <li>Give each entry metadata such as name, description, category, creator, version, tags, and preview.</li>
          <li>Keep examples isolated so a preview cannot accidentally affect the surrounding Studio interface.</li>
          <li>Document props and variants alongside usage examples and accessible interaction behaviour.</li>
          <li>Design the publishing flow around the community model: create, preview, publish, discover, and reuse.</li>
        </ol>
      </section>
    </div>
  );
}
