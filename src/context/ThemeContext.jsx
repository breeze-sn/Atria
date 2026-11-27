import React, { createContext, useContext } from 'react';

export const THEME_STORAGE_KEY = 'atria:theme-preview-v2';
export const ThemeContext = createContext(null);

// Atria is intentionally dark-only. The palette is fixed across every route.
const fixedTheme = {
  _isProvider: true,
  previewTheme: 'dark',
  setPreviewTheme: () => {},
  isDark: true,
};

export function ThemeProvider({ children }) {
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    }
  }, []);

  return <ThemeContext.Provider value={fixedTheme}>{children}</ThemeContext.Provider>;
}

export function useThemePreview() {
  const context = useContext(ThemeContext);
  return context || fixedTheme;
}
