import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Studio from '../src/pages/Studio.jsx';
import { BACKUP_KEY, PROJECTS_KEY, loadWorkspace, updateWorkspace } from '../src/data/studioProjects.js';

const open = () => render(<MemoryRouter><Studio /></MemoryRouter>);
const reload = () => { cleanup(); open(); };
const click = (name, scope = screen) => fireEvent.click(scope.getByRole('button', { name, exact: true }));
const showProjects = () => { click('Projects'); return within(screen.getByRole('dialog', { name: 'Your projects' })); };
const nameInput = () => screen.getByLabelText('Design system name');
const stored = () => JSON.parse(localStorage.getItem(PROJECTS_KEY));
const named = (name) => stored().projects.find((p) => p.name === name);
const retitle = (value) => fireEvent.change(nameInput(), { target: { value } });

beforeEach(() => localStorage.clear());
afterEach(() => { cleanup(); vi.restoreAllMocks(); localStorage.clear(); });

describe('Studio projects', () => {
  it('creates a clean project and keeps each project separate across reloads', () => {
    open();
    retitle('Alpha');
    click('New project', showProjects());
    expect(screen.getByText('Your canvas is empty')).toBeInTheDocument();
    retitle('Beta');
    click('Save');
    reload();
    expect(nameInput()).toHaveValue('Beta');
    expect(named('Alpha').items).toHaveLength(3);
    expect(named('Beta').items).toHaveLength(0);
    expect(named('Beta').tokens.length).toBeGreaterThan(0);

    click('Open Alpha', showProjects());
    expect(nameInput()).toHaveValue('Alpha');
    expect(screen.getByText('3 COMPONENTS')).toBeInTheDocument();
    reload();
    expect(nameInput()).toHaveValue('Alpha');
  });

  it('numbers new projects and copies so names stay distinct', () => {
    open();
    click('New project', showProjects());
    const dialog = showProjects();
    click('Duplicate Untitled design system', dialog);
    click('Duplicate Untitled design system', dialog);
    expect(stored().projects.map((p) => p.name)).toEqual([
      'Untitled design system',
      'Untitled design system 2',
      'Untitled design system copy',
      'Untitled design system copy 2',
    ]);
  });

  it('keeps token edits inside their own project', () => {
    open();
    retitle('Alpha');
    click('Tokens', within(screen.getByRole('navigation', { name: 'Library tools' })));
    fireEvent.change(screen.getByLabelText('space.1'), { target: { value: '6px' } });
    click('New project', showProjects());
    click('Tokens', within(screen.getByRole('navigation', { name: 'Library tools' })));
    expect(screen.getByLabelText('space.1')).toHaveValue('4px');
    click('Open Alpha', showProjects());
    expect(screen.getByLabelText('space.1')).toHaveValue('6px');
  });

  it('migrates the old single workspace without touching the old keys', () => {
    const items = [{ id: 'x1', type: 'Button', name: 'Old button', text: 'Hi', bg: '#000000', color: '#ffffff', border: '#000000', radius: 4, padding: 8, size: 12 }];
    localStorage.setItem('atria:builder:elements', JSON.stringify(items));
    localStorage.setItem('atria:builder:name', JSON.stringify('Legacy system'));
    open();
    expect(nameInput()).toHaveValue('Legacy system');
    expect(screen.getByLabelText('Layer name')).toHaveValue('Old button');
    click('New project', showProjects());
    expect(named('Legacy system').items).toEqual(items);
    expect(JSON.parse(localStorage.getItem('atria:builder:elements'))).toEqual(items);
  });

  it('renames and duplicates into an independent copy', () => {
    open();
    let dialog = showProjects();
    click('Rename Untitled design system', dialog);
    fireEvent.change(dialog.getByLabelText('Project name'), { target: { value: 'Alpha' } });
    click('Save name', dialog);
    expect(nameInput()).toHaveValue('Alpha');
    click('Duplicate Alpha', dialog);
    click('Open Alpha copy', dialog);
    fireEvent.change(screen.getByLabelText('Layer name'), { target: { value: 'Only in copy' } });
    click('Save');
    expect(named('Alpha copy').items[0].name).toBe('Only in copy');
    expect(named('Alpha').items[0].name).toBe('Primary button');
  });

  it('deletes only after confirmation and leaves other projects alone', () => {
    open();
    retitle('Alpha');
    click('New project', showProjects());
    retitle('Beta');
    click('Save');
    const alpha = named('Alpha');
    const dialog = showProjects();
    click('Delete Beta', dialog);
    click('Cancel', dialog);
    expect(stored().projects).toHaveLength(2);
    click('Delete Beta', dialog);
    click('Delete project', dialog);
    expect(stored().projects).toEqual([alpha]);
    expect(nameInput()).toHaveValue('Alpha');

    click('Delete Alpha', dialog);
    click('Delete project', dialog);
    expect(stored().projects).toHaveLength(1);
    expect(stored().projects[0].items).toEqual([]);
    expect(nameInput()).toHaveValue('Untitled design system');
  });

  it('closes on Escape and returns focus to the Projects button', () => {
    open();
    const trigger = screen.getByRole('button', { name: 'Projects', exact: true });
    trigger.focus();
    showProjects();
    const close = screen.getByRole('button', { name: 'Close projects' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(close, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('keeps the open project on screen when storage refuses the write', () => {
    open();
    retitle('Unsaved');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('full'); });
    const dialog = showProjects();
    click('New project', dialog);
    expect(dialog.getByRole('alert')).toHaveTextContent('Could not save');
    expect(nameInput()).toHaveValue('Unsaved');
  });
});

describe('project storage', () => {
  const defaults = { items: [], tokens: [] };

  it('backs up unreadable data before replacing it', () => {
    localStorage.setItem(PROJECTS_KEY, '{broken');
    const workspace = loadWorkspace(defaults);
    updateWorkspace(workspace, (current) => current);
    expect(localStorage.getItem(BACKUP_KEY)).toBe('{broken');
    expect(stored().projects).toHaveLength(1);
  });

  it('keeps projects written by another tab', () => {
    const workspace = updateWorkspace(loadWorkspace(defaults), (current) => current);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify({ ...workspace, projects: [...workspace.projects, { id: 'other', name: 'Other tab', items: [], tokens: [] }] }));
    updateWorkspace(workspace, (current) => current);
    expect(named('Other tab')).toBeDefined();
  });
});
