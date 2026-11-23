import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Tokens from '../src/pages/Tokens.jsx';

const nameField = () => screen.getByRole('textbox', { name: 'New collection name' });

function createCollection(name) {
  fireEvent.change(nameField(), { target: { value: name } });
  fireEvent.click(screen.getByRole('button', { name: 'Create collection' }));
}

describe('token collections', () => {
  beforeEach(() => localStorage.clear());

  it('restores existing groups and preserves token values when editing a migrated workspace', () => {
    const legacy = { id: 'legacy', name: 'custom.size', value: '9px', type: 'dimension', group: 'Customer', description: 'Saved token' };
    localStorage.setItem('atria:tokens', JSON.stringify([legacy]));
    render(<Tokens />);

    fireEvent.click(screen.getByRole('button', { name: 'Customer' }));
    const card = screen.getByRole('article');
    expect(within(card).getByLabelText('Token name')).toHaveValue('custom.size');
    expect(within(card).getByLabelText('Token value')).toHaveValue('9px');
    fireEvent.change(within(card).getByLabelText('Token value'), { target: { value: '10px' } });

    const saved = JSON.parse(localStorage.getItem('atria:tokens'));
    expect(saved.collections).toEqual(['Primitive', 'Semantic', 'Customer']);
    expect(saved.tokens.find(token => token.id === 'legacy')).toEqual({ ...legacy, value: '10px' });
  });

  it('moves a token, renames its collection, and keeps the token after collection deletion', () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true);
    try {
      render(<Tokens />);
      createCollection('Campaign');
      expect(screen.getByRole('button', { name: 'Campaign' })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.queryByRole('article')).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'All tokens' }));
      fireEvent.change(screen.getByLabelText('Move space.1 to collection'), { target: { value: 'Campaign' } });
      fireEvent.click(screen.getByRole('button', { name: 'Campaign' }));
      expect(screen.getByRole('article')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Rename collection' }));
      fireEvent.change(screen.getByLabelText('Rename collection'), { target: { value: 'Launch' } });
      fireEvent.click(screen.getByRole('button', { name: 'Save name' }));
      expect(screen.getByRole('button', { name: 'Launch' })).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByLabelText('Move space.1 to collection')).toHaveValue('Launch');

      fireEvent.click(screen.getByRole('button', { name: 'Delete collection' }));
      expect(screen.queryByRole('button', { name: 'Launch' })).not.toBeInTheDocument();
      expect(screen.getByLabelText('Move space.1 to collection')).toHaveValue('Primitive');
      expect(JSON.parse(localStorage.getItem('atria:tokens')).tokens.find(token => token.id === 't4')).toMatchObject({
        name: 'space.1', value: '4px', group: 'Primitive',
      });
    } finally {
      confirm.mockRestore();
    }
  });

  it('persists empty collections and rejects case-insensitive duplicate names', () => {
    const view = render(<Tokens />);
    createCollection('Campaign');
    view.unmount();
    render(<Tokens />);
    expect(screen.getByRole('button', { name: 'Campaign' })).toBeInTheDocument();
    createCollection(' campaign ');
    expect(screen.getByRole('alert')).toHaveTextContent('already exists');
    fireEvent.click(screen.getByRole('button', { name: 'Primitive' }));
    expect(screen.queryByRole('button', { name: 'Delete collection' })).not.toBeInTheDocument();
  });

  it('retains named collections when importing the token JSON format', () => {
    render(<Tokens />);
    fireEvent.change(screen.getByLabelText('Token JSON to import'), {
      target: { value: JSON.stringify([{ name: 'custom.weight', value: '500', type: 'number', group: 'Typography' }]) },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Preview import' }));
    fireEvent.click(screen.getByRole('button', { name: 'Import 1 token' }));
    fireEvent.click(screen.getByRole('button', { name: 'Typography' }));
    expect(screen.getByLabelText('Token name')).toHaveValue('custom.weight');
    expect(screen.getByLabelText('Move custom.weight to collection')).toHaveValue('Typography');
  });
});
