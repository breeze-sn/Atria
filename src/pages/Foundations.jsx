import React from 'react';

const tasks = [
  {
    number: '01',
    title: 'Colour system',
    description: 'Create and organise palettes, including neutral, brand, and feedback colours.',
    details: ['Define colour values and meaningful names', 'Add light and dark theme previews', 'Show accessible foreground and background pairings'],
    output: 'A reusable colour foundation with clear usage guidance.',
  },
  {
    number: '02',
    title: 'Typography',
    description: 'Build a type scale that documents how text should appear across products.',
    details: ['Set font families, weights, sizes, and line heights', 'Preview headings, body text, labels, and captions', 'Document intended usage for each text style'],
    output: 'A consistent, previewable typography scale.',
  },
  {
    number: '03',
    title: 'Spacing & layout',
    description: 'Define the spatial rules that keep layouts predictable and consistent.',
    details: ['Create spacing and sizing scales', 'Document grid, container, and breakpoint conventions', 'Include radius and elevation only where the system needs them'],
    output: 'A documented set of layout and spacing foundations.',
  },
];

export default function Foundations() {
  return (
    <div className="studio-page">
      <div className="section-index">[ STUDIO / 01 — IMPLEMENTATION BRIEF ]</div>
      <div className="studio-page-heading">
        <div><span className="studio-status">PLACEHOLDER · READY FOR CONTRIBUTION</span><h2>Design Foundations</h2></div>
        <span className="studio-page-count">01 / 03</span>
      </div>
      <p className="studio-page-intro">The source of truth for the visual rules behind a design system. Build the foundations here before using them in tokens and components.</p>

      <section className="studio-brief">
        <span className="studio-kicker">WHAT TO BUILD</span>
        <h3>Turn design decisions into a usable system.</h3>
        <p>Developers should be able to add, edit, preview, and organise foundation values. Keep the interface visual and make every value understandable without needing to inspect the source code.</p>
      </section>

      <div className="studio-task-list">
        {tasks.map((task) => (
          <article className="studio-task" key={task.number}>
            <div className="studio-task-number">{task.number}</div>
            <div className="studio-task-content">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className="studio-kicker">IMPLEMENTATION CHECKLIST</span>
              <ul>{task.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
              <div className="studio-expected"><strong>Expected result</strong><span>{task.output}</span></div>
            </div>
          </article>
        ))}
      </div>

      <section className="studio-dev-note">
        <span className="studio-kicker">DEVELOPER NOTES</span>
        <ol>
          <li>Start with a clear data structure for each foundation type; avoid hard-coding values into the UI.</li>
          <li>Build reusable preview and editing patterns so new foundation types can be added without duplicating the page.</li>
          <li>Plan for validation, empty states, responsive layouts, and accessible colour contrast.</li>
          <li>Connect saved foundations to the token workflow when persistence is introduced.</li>
        </ol>
      </section>
    </div>
  );
}
