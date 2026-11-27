import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import Studio from '../src/pages/Studio.jsx';

beforeEach(() => {
  localStorage.clear();
  render(<MemoryRouter><Studio /></MemoryRouter>);
});
afterEach(() => { cleanup(); localStorage.clear(); });

describe('Studio panel controls', () => {
  it('makes all four library tools reachable through the panel controls', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Library', exact: true }));
    expect(screen.getByRole('button', { name: 'Library', exact: true })).toHaveAttribute('aria-pressed', 'true');
    const tools = screen.getByRole('navigation', { name: 'Library tools' });
    for (const name of ['Add', 'Layers', 'Tokens', 'Palettes']) {
      const button = within(tools).getByRole('button', { name, exact: true });
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(within(tools).getAllByRole('button', { pressed: true })).toHaveLength(1);
    }
  });

  it('dismisses the inspector and restores focus to its panel control', () => {
    const inspector = screen.getByRole('button', { name: 'Inspector', exact: true });
    fireEvent.click(inspector);
    fireEvent.change(screen.getByLabelText('Layer name'), { target: { value: 'Edited layer' } });
    fireEvent.click(screen.getByRole('button', { name: 'Return to canvas' }));
    expect(inspector).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Canvas', exact: true })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Edited layer', { selector: '.builder-canvas-item > button' })).toBeInTheDocument();
  });

  it('returns an added component to the canvas and saves the updated workspace', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Library', exact: true }));
    const library = screen.getByRole('complementary', { name: 'Component library tools' });
    fireEvent.click(within(library).getByRole('button', { name: /^B\s*Button$/ }));
    expect(screen.getByRole('button', { name: 'Canvas', exact: true })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(screen.getByRole('button', { name: 'Save', exact: true }));
    expect(JSON.parse(localStorage.getItem('atria:builder:projects')).projects[0].items).toHaveLength(4);
  });

  it('keeps keyboard focus inside export and restores it after Escape', () => {
    const trigger = screen.getByRole('button', { name: 'Export', exact: true });
    trigger.focus();
    fireEvent.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Export your system' });
    const close = within(dialog).getByRole('button', { name: 'Close export' });
    const download = within(dialog).getByRole('button', { name: 'Download', exact: true });
    expect(close).toHaveFocus();
    fireEvent.keyDown(close, { key: 'Tab', shiftKey: true });
    expect(download).toHaveFocus();
    fireEvent.keyDown(download, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(close, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
