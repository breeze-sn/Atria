import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, beforeAll } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Components from '../src/pages/Components.jsx';
import Tokens from '../src/pages/Tokens.jsx';
import Foundations from '../src/pages/Foundations.jsx';
import DashboardLayout from '../src/layouts/DashboardLayout.jsx';
import Overview from '../src/pages/Overview.jsx';
import Studio from '../src/pages/Studio.jsx';
import App from '../src/App.jsx';
import Docs from '../src/Docs.jsx';
import { ThemeProvider } from '../src/context/ThemeContext.jsx';

beforeAll(() => {
  Element.prototype.scrollIntoView = () => {};
});

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

function renderExplore(path) {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/explore" element={<DashboardLayout />}>
            <Route path="components" element={<Components />} />
            <Route path="tokens" element={<Tokens />} />
            <Route path="foundations" element={<Foundations />} />
            <Route path="foundations/:categoryId/:resourceId" element={<Foundations />} />
            <Route index element={<Overview />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe('Atria fixed dark appearance', () => {
  it('keeps the landing page dark and does not expose a theme switch', () => {
    render(<App />);
    expect(document.querySelector('main.landing-page')).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    expect(screen.queryByRole('button', { name: /theme preview/i })).not.toBeInTheDocument();
  });

  it('keeps Explore dark without a theme preview control', () => {
    renderExplore('/explore');
    expect(document.querySelector('.explore-page')).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('navigation', { name: 'Explore Studio navigation' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /theme preview/i })).not.toBeInTheDocument();
  });

  it('keeps Docs dark without a theme preview control', () => {
    render(
      <MemoryRouter initialEntries={['/docs']}>
        <ThemeProvider><Docs /></ThemeProvider>
      </MemoryRouter>
    );
    expect(document.querySelector('main.docs-page')).toHaveAttribute('data-theme', 'dark');
    expect(screen.queryByRole('button', { name: /theme preview/i })).not.toBeInTheDocument();
  });

  it('keeps the Studio builder dark without a theme preview control', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/studio']}><Studio /></MemoryRouter>
      </ThemeProvider>
    );
    expect(document.querySelector('.atria-builder')).toHaveAttribute('data-theme', 'dark');
    expect(screen.queryByRole('group', { name: /studio theme preview toggle/i })).not.toBeInTheDocument();
  });
});

describe('Dark-mode component interactions', () => {
  it('keeps the modal dialog keyboard trapping and closing functional', () => {
    renderExplore('/explore/components');
    fireEvent.click(screen.getAllByRole('button', { name: /modal dialog/i })[0]);

    const openButton = screen.getByRole('button', { name: 'Open dialog' });
    openButton.focus();
    fireEvent.click(openButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.contains(document.activeElement)).toBe(true);

    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(openButton);
  });

  it('keeps tabs roving tabindex and arrow navigation functional', () => {
    renderExplore('/explore/components');
    fireEvent.click(screen.getAllByRole('button', { name: /tabs/i })[0]);

    const tabs = screen.getAllByRole('tab');
    expect(tabs.map(tab => tab.getAttribute('tabindex'))).toEqual(['0', '-1', '-1']);
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(tabs[1]);
  });

  it('opens token details in the dark workspace', () => {
    renderExplore('/explore/tokens');
    fireEvent.click(screen.getAllByRole('button', { name: /open token/i })[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /close token details/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('renders a foundations resource detail in the dark workspace', () => {
    renderExplore('/explore/foundations/colour/neutral');
    expect(document.querySelector('.explore-page')).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByRole('heading', { name: 'Neutral & Minimal' })).toBeInTheDocument();
  });
});
