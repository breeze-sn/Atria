import React from 'react';

const stages = [
  {
    number: '01',
    title: 'Token structure',
    description: 'Create a predictable token model with names, values, types, and optional descriptions.',
    example: 'colour.text.primary  →  #171717',
  },
  {
    number: '02',
    title: 'Token groups & references',
    description: 'Organise tokens by category and allow semantic tokens to reference primitive values.',
    example: 'button.background  →  colour.brand.primary',
  },
  {
    number: '03',
    title: 'Edit, validate & export',
    description: 'Give contributors a safe way to update values and share them with a codebase.',
    example: 'Export formats  →  CSS variables · JSON',
  },
];

export default function Tokens() {
  return (
    <div className="studio-page">
      <div className="section-index">[ STUDIO / 02 — IMPLEMENTATION BRIEF ]</div>
      <div className="studio-page-heading">
        <div><span className="studio-status">PLACEHOLDER · READY FOR CONTRIBUTION</span><h2>Design Tokens</h2></div>
        <span className="studio-page-count">02 / 03</span>
      </div>
      <p className="studio-page-intro">A structured layer between design foundations and implementation. Tokens should make design decisions reusable, traceable, and ready to export.</p>

      <section className="studio-brief">
        <span className="studio-kicker">WHAT TO BUILD</span>
        <h3>One value. A clear name. Reusable everywhere.</h3>
        <p>Build a token workspace where creators can add, group, edit, search, and export tokens. Keep raw values separate from semantic meaning so a theme can change without rewriting every component.</p>
      </section>

      <div className="studio-task-list">
        {stages.map((stage) => (
          <article className="studio-task" key={stage.number}>
            <div className="studio-task-number">{stage.number}</div>
            <div className="studio-task-content">
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
              <div className="studio-code-example"><code>{stage.example}</code></div>
            </div>
          </article>
        ))}
      </div>

      <section className="studio-dev-note">
        <span className="studio-kicker">DEVELOPER NOTES</span>
        <ol>
          <li>Define a token schema with a stable ID, name, category, value, type, and description.</li>
          <li>Support primitive and semantic tokens, including references between them.</li>
          <li>Validate names, value formats, missing references, and circular references before saving or exporting.</li>
          <li>Provide copy actions and exports for CSS custom properties and structured JSON.</li>
          <li>Keep the data model format-friendly so additional export formats can be added later.</li>
        </ol>
      </section>
    </div>
  );
}
