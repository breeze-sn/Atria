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
import { ThemeProvider, THEME_STORAGE_KEY } from '../src/context/ThemeContext.jsx';

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

describe('DashboardLayout top navbar theme preview toggle', () => {
  it('toggles theme via top navbar and synchronises with nested components', () => {
    renderExplore('/explore/components');

    // Navbar toggle is present and single (no duplicate in content)
    const navbarNav = screen.getByRole('navigation', { name: 'Explore Studio navigation' });
    expect(navbarNav).toBeInTheDocument();
    const navbarToggles = screen.getAllByRole('button', { name: /dark theme preview/i });
    expect(navbarToggles.length).toBe(1);

    // Click dark toggle in navbar
    fireEvent.click(navbarToggles[0]);

    // Explore page updates to dark
    const page = document.querySelector('.explore-page');
    expect(page).toHaveAttribute('data-theme', 'dark');
  });
});

describe('Components theme previews', () => {
  it('toggles between light and dark preview modes', () => {
    renderExplore('/explore/components');
    
    const lightToggle = screen.getByRole('button', { name: /light theme preview/i });
    const darkToggle = screen.getByRole('button', { name: /dark theme preview/i });
    
    expect(lightToggle).toHaveAttribute('aria-pressed', 'true');
    expect(darkToggle).toHaveAttribute('aria-pressed', 'false');

    // Default stage is light
    const page = document.querySelector('.explore-page');
    expect(page).toHaveAttribute('data-theme', 'light');

    // Switch to dark theme
    fireEvent.click(darkToggle);
    expect(lightToggle).toHaveAttribute('aria-pressed', 'false');
    expect(darkToggle).toHaveAttribute('aria-pressed', 'true');
    expect(page).toHaveAttribute('data-theme', 'dark');

    // Switch back to light theme
    fireEvent.click(lightToggle);
    expect(lightToggle).toHaveAttribute('aria-pressed', 'true');
    expect(page).toHaveAttribute('data-theme', 'light');
  });

  it('keeps modal dialog keyboard trapping and closing functional in dark mode', () => {
    renderExplore('/explore/components');
    
    // Switch to dark mode
    fireEvent.click(screen.getByRole('button', { name: /dark theme preview/i }));
    
    // Select modal component from sidebar
    const modalNavBtn = screen.getAllByRole('button', { name: /modal dialog/i })[0];
    fireEvent.click(modalNavBtn);

    const openBtn = screen.getByRole('button', { name: 'Open dialog' });
    openBtn.focus();
    fireEvent.click(openBtn);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.contains(document.activeElement)).toBe(true);

    // Escape closes modal
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(openBtn);
  });

  it('keeps tabs roving tabindex and arrow navigation working in dark mode', () => {
    renderExplore('/explore/components');
    
    // Switch to dark mode
    fireEvent.click(screen.getByRole('button', { name: /dark theme preview/i }));
    
    // Select tabs component from sidebar
    const tabsNavBtn = screen.getAllByRole('button', { name: /tabs/i })[0];
    fireEvent.click(tabsNavBtn);

    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.getAttribute('tabindex'))).toEqual(['0', '-1', '-1']);

    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(document.activeElement).toBe(tabs[1]);
  });
});

describe('Tokens theme previews', () => {
  it('toggles token cards into dark preview without altering stored token values', () => {
    renderExplore('/explore/tokens');

    const lightToggle = screen.getByRole('button', { name: /light theme preview/i });
    const darkToggle = screen.getByRole('button', { name: /dark theme preview/i });

    // Initial state
    expect(lightToggle).toHaveAttribute('aria-pressed', 'true');
    const container = document.querySelector('.explore-page');
    expect(container).toHaveAttribute('data-theme', 'light');

    // Check a color input value before toggling
    const colorInputs = screen.getAllByLabelText(/token colour/i);
    const initialColors = colorInputs.map((i) => i.value);

    // Switch to dark mode preview
    fireEvent.click(darkToggle);
    expect(container).toHaveAttribute('data-theme', 'dark');

    // Ensure color values did not change
    const afterColors = screen.getAllByLabelText(/token colour/i).map((i) => i.value);
    expect(afterColors).toEqual(initialColors);

    // Ensure color swatches in dark mode have contrast box-shadow
    const firstColorInput = screen.getAllByLabelText(/token colour/i)[0];
    expect(firstColorInput.style.boxShadow).toMatch(/rgba\(255,\s*255,\s*255/);

    // Switch back to light mode preview
    fireEvent.click(lightToggle);
    expect(container).toHaveAttribute('data-theme', 'light');
    expect(firstColorInput.style.boxShadow).toMatch(/rgba\(0,\s*0,\s*0/);
  });

  it('opens token detail dialog in theme-aware mode', () => {
    renderExplore('/explore/tokens');
    
    // Switch to dark mode
    fireEvent.click(screen.getByRole('button', { name: /dark theme preview/i }));

    const openButtons = screen.getAllByRole('button', { name: /open token/i });
    fireEvent.click(openButtons[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(dialog.style.background).toBe('rgb(28, 28, 31)');

    fireEvent.click(screen.getByRole('button', { name: /close token details/i }));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});

describe('Foundations resource detail theme previews', () => {
  it('toggles palette detail preview to dark without mutating custom values', () => {
    renderExplore('/explore/foundations/colour/neutral');

    expect(screen.getByRole('heading', { name: 'Neutral & Minimal' })).toBeInTheDocument();

    const lightToggle = screen.getByRole('button', { name: /light theme preview/i });
    const darkToggle = screen.getByRole('button', { name: /dark theme preview/i });

    // Initial theme
    expect(lightToggle).toHaveAttribute('aria-pressed', 'true');
    const container = document.querySelector('.explore-page');
    expect(container).toHaveAttribute('data-theme', 'light');

    // Switch to dark mode
    fireEvent.click(darkToggle);
    expect(container).toHaveAttribute('data-theme', 'dark');

    // Swatches should have contrast shadow
    const swatches = screen.getAllByLabelText(/colour$/i);
    expect(swatches[0].style.boxShadow).toMatch(/rgba\(255,\s*255,\s*255/);

    // Switch back to light
    fireEvent.click(lightToggle);
    expect(container).toHaveAttribute('data-theme', 'light');
    expect(swatches[0].style.boxShadow).toMatch(/rgba\(0,\s*0,\s*0/);
  });
});

describe('Landing page and Docs top navbar theme preview toggle', () => {
  it('renders single theme preview toggle in landing page navbar and toggles playground and page theme', () => {
    render(<App />);

    // Landing page has single navbar toggle (no duplicate in playground)
    const navbarToggles = screen.getAllByRole('button', { name: /dark theme preview/i });
    expect(navbarToggles.length).toBe(1);

    const main = document.querySelector('main.landing-page');
    expect(main).toHaveAttribute('data-theme', 'light');

    const playground = document.querySelector('.component-preview');
    expect(playground).toHaveAttribute('data-theme', 'light');

    // Click dark toggle in landing navbar
    fireEvent.click(navbarToggles[0]);

    expect(main).toHaveAttribute('data-theme', 'dark');
    expect(playground).toHaveAttribute('data-theme', 'dark');
    expect(screen.getByText(/dark preview/i)).toBeInTheDocument();

    // Toggle back to light
    const lightToggles = screen.getAllByRole('button', { name: /light theme preview/i });
    fireEvent.click(lightToggles[0]);

    expect(main).toHaveAttribute('data-theme', 'light');
    expect(playground).toHaveAttribute('data-theme', 'light');
  });

  it('renders single theme preview toggle in Docs navbar and updates docs theme', () => {
    render(
      <MemoryRouter initialEntries={['/docs']}>
        <Docs />
      </MemoryRouter>
    );

    const darkToggles = screen.getAllByRole('button', { name: /dark theme preview/i });
    expect(darkToggles.length).toBe(1);

    const main = document.querySelector('main.docs-page');
    expect(main).toHaveAttribute('data-theme', 'light');

    fireEvent.click(darkToggles[0]);
    expect(main).toHaveAttribute('data-theme', 'dark');

    const lightToggle = screen.getByRole('button', { name: /light theme preview/i });
    fireEvent.click(lightToggle);
    expect(main).toHaveAttribute('data-theme', 'light');
  });
});

describe('Persistent theme state and visibility across /explore and /studio', () => {
  it('persists selected theme in localStorage and initializes from stored value on mount', () => {
    // 1. Initial render defaults to light
    const { unmount } = render(<App />);
    const darkToggle = screen.getAllByRole('button', { name: /dark theme preview/i })[0];
    fireEvent.click(darkToggle);

    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    unmount();

    // 2. Remount initializes with dark from localStorage
    render(<App />);
    const main = document.querySelector('main.landing-page');
    expect(main).toHaveAttribute('data-theme', 'dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('keeps single theme toggle visible on /explore Overview and adapts workspace styling', () => {
    renderExplore('/explore');

    // Toggle button is visible in top navbar ONLY (no duplicate toggle on Overview)
    const navbarNav = screen.getByRole('navigation', { name: 'Explore Studio navigation' });
    expect(navbarNav).toBeInTheDocument();
    const darkToggles = screen.getAllByRole('button', { name: /dark theme preview/i });
    expect(darkToggles.length).toBe(1);

    const explorePage = document.querySelector('.explore-page');
    expect(explorePage).toHaveAttribute('data-theme', 'light');

    // Toggle to dark from navbar
    fireEvent.click(darkToggles[0]);

    expect(explorePage).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    // Swatches receive dual contrast rim
    const swatch = document.querySelector('.workspace-swatch-colour');
    expect(swatch.style.boxShadow).toMatch(/rgba\(255,\s*255,\s*255/);
  });

  it('renders theme preview toggle in /studio builder topbar and updates studio canvas theme', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/studio']}>
          <Studio />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Studio builder has toggle in topbar
    const studioToggle = screen.getByRole('group', { name: /studio theme preview toggle/i });
    expect(studioToggle).toBeInTheDocument();

    const builder = document.querySelector('.atria-builder');
    expect(builder).toHaveAttribute('data-theme', 'light');

    // Click dark toggle in studio
    const darkBtn = studioToggle.querySelector('button[aria-label="Dark theme preview"]');
    fireEvent.click(darkBtn);

    expect(builder).toHaveAttribute('data-theme', 'dark');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');

    // Click light toggle in studio
    const lightBtn = studioToggle.querySelector('button[aria-label="Light theme preview"]');
    fireEvent.click(lightBtn);

    expect(builder).toHaveAttribute('data-theme', 'light');
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');
  });
});
