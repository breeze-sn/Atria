import React from 'react';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import App from '../src/App.jsx';

beforeEach(() => {
  window.history.replaceState({}, '', '/explore/community');
});

afterEach(() => {
  cleanup();
  window.history.replaceState({}, '', '/');
});

describe('Community contributions page', () => {
  it('browses palette, token, and component contributions with source attribution', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Made to be shared.' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quiet Morning' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quiet Interface' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Grounded Button' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quiet Morning' }).tagName).toBe('H2');
    expect(screen.getByRole('heading', { name: 'Variants' }).tagName).toBe('H3');
    expect(screen.getByRole('img', { name: 'button preview: Continue' })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /view source/i })).toHaveLength(3);
    expect(screen.getAllByText('By Atria Community · @breeze-sn')).toHaveLength(3);
    expect(screen.queryByText(/@@breeze-sn/)).not.toBeInTheDocument();
    expect(screen.getByText('#263B35')).toBeInTheDocument();
    expect(screen.getByText('type.body')).toBeInTheDocument();
  });

  it('filters the library by contribution type', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Palettes' }));
    expect(screen.getByRole('heading', { name: 'Quiet Morning' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Quiet Interface' })).not.toBeInTheDocument();
    expect(screen.getByText('1 resource')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Components' }));
    expect(screen.getByRole('heading', { name: 'Grounded Button' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Quiet Morning' })).not.toBeInTheDocument();
  });

  it('provides a navigable Community entry in the Explore sidebar', () => {
    render(<App />);
    const sidebar = screen.getByRole('complementary', { name: 'Explore sections' });
    expect(within(sidebar).getByRole('link', { name: 'Community 05' })).toHaveAttribute(
      'href',
      '/explore/community',
    );
  });
});
