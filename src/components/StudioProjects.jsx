import React, { useEffect, useRef, useState } from 'react';
import { X } from '@phosphor-icons/react';

// Project list shown as a dialog: create, open, rename, duplicate and delete.
export default function StudioProjects({ workspace, error, onCreate, onOpen, onRename, onDuplicate, onDelete, onClose }) {
  const [renaming, setRenaming] = useState(null);
  const [draft, setDraft] = useState('');
  const [deleting, setDeleting] = useState(null);
  const dialog = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeButton.current?.focus();
    return () => previous?.focus();
  }, []);

  // A row that switches mode removes the focused button, so keep focus inside.
  useEffect(() => {
    if (!dialog.current.contains(document.activeElement)) closeButton.current?.focus();
  });

  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (renaming || deleting) { setRenaming(null); setDeleting(null); } else onClose();
    }
    if (event.key !== 'Tab') return;
    const controls = [...dialog.current.querySelectorAll('button:not(:disabled),input')];
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };

  const submitRename = (event) => {
    event.preventDefault();
    onRename(renaming, draft);
    setRenaming(null);
  };

  return <div className="builder-modal-bg" onClick={onClose}>
    <section className="builder-modal builder-projects" role="dialog" aria-modal="true" aria-labelledby="builder-projects-title" ref={dialog} onClick={(e) => e.stopPropagation()} onKeyDown={onKeyDown}>
      <header>
        <div><small>SAVED IN THIS BROWSER</small><h2 id="builder-projects-title">Your projects</h2></div>
        <button ref={closeButton} onClick={onClose} aria-label="Close projects"><X size={17} /></button>
      </header>
      <p>Creating or switching projects saves the open one first.</p>
      {error && <p role="alert">{error}</p>}
      <ul>
        {workspace.projects.map((project) => {
          const current = project.id === workspace.activeId;
          return <li key={project.id}>
            {renaming === project.id
              ? <form onSubmit={submitRename}>
                <input autoFocus aria-label="Project name" value={draft} onChange={(e) => setDraft(e.target.value)} />
                <button type="submit">Save name</button>
                <button type="button" onClick={() => setRenaming(null)}>Cancel</button>
              </form>
              : deleting === project.id
                ? <div role="group" aria-label={'Confirm delete ' + project.name}>
                  <span>Delete <b>{project.name}</b>? Its components and tokens are removed from this browser. This cannot be undone.</span>
                  <button autoFocus onClick={() => setDeleting(null)}>Cancel</button>
                  <button className="destructive" onClick={() => { onDelete(project.id); setDeleting(null); }}>Delete project</button>
                </div>
                : <>
                  <span><b>{project.name}</b><small>{project.items.length} components{current ? ' · open now' : ''}</small></span>
                  <button disabled={current} aria-label={'Open ' + project.name} onClick={() => onOpen(project.id)}>Open</button>
                  <button aria-label={'Rename ' + project.name} onClick={() => { setDeleting(null); setDraft(project.name); setRenaming(project.id); }}>Rename</button>
                  <button aria-label={'Duplicate ' + project.name} onClick={() => onDuplicate(project.id)}>Duplicate</button>
                  <button className="destructive" aria-label={'Delete ' + project.name} onClick={() => { setRenaming(null); setDeleting(project.id); }}>Delete</button>
                </>}
          </li>;
        })}
      </ul>
      <footer><button onClick={onCreate}>New project</button></footer>
    </section>
  </div>;
}
