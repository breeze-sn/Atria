import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import Tokens from '../src/pages/Tokens';

describe('Token import panel', () => {
  beforeEach(() => localStorage.clear());

  it('previews first and only applies after confirmation, without overwriting', () => {
    render(<Tokens />);
    const before = screen.getAllByLabelText('Token name').length;
    const json = '[{"name":"color.imported","value":"#abcdef","type":"color"},{"name":"space.1","value":"99px","type":"dimension"}]';
    fireEvent.change(screen.getByLabelText('Token JSON to import'), { target: { value: json } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview import' }));
    expect(screen.getByText('1 of 2 tokens can be imported.')).toBeInTheDocument();
    expect(screen.getAllByLabelText('Token name').length).toBe(before);

    fireEvent.click(screen.getByRole('button', { name: 'Import 1 token' }));
    expect(screen.getAllByLabelText('Token name').length).toBe(before + 1);
    const space = screen.getAllByLabelText('Token name').find((i) => i.value === 'space.1');
    expect(space.closest('article').querySelector('[aria-label="Token value"]').value).toBe('4px');
  }, 10000);

  it('shows a clear error for invalid JSON', () => {
    render(<Tokens />);
    fireEvent.change(screen.getByLabelText('Token JSON to import'), { target: { value: '{oops' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preview import' }));
    expect(screen.getByRole('alert')).toHaveTextContent('not valid JSON');
  });
});
