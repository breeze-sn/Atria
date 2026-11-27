import React, { createContext, useContext, useState, useEffect } from 'react';

export const THEME_STORAGE_KEY = 'atria:theme-preview-v2';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [previewTheme, setPreviewThemeState] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') {
          return stored;
        }
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  const setPreviewTheme = (themeOrFn) => {
    setPreviewThemeState((prev) => {
      const next = typeof themeOrFn === 'function' ? themeOrFn(prev) : themeOrFn;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(THEME_STORAGE_KEY, next);
        }
        if (typeof document !== 'undefined' && document.documentElement) {
          document.documentElement.setAttribute('data-theme', next);
        }
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('data-theme', previewTheme);
    }

    const handleStorage = (e) => {
      if (e.key === THEME_STORAGE_KEY && (e.newValue === 'light' || e.newValue === 'dark')) {
        setPreviewThemeState(e.newValue);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorage);
      return () => window.removeEventListener('storage', handleStorage);
    }
  }, [previewTheme]);

  const value = {
    _isProvider: true,
    previewTheme,
    setPreviewTheme,
    isDark: previewTheme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemePreview() {
  const context = useContext(ThemeContext);

  const [localTheme, setLocalTheme] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
      }
    } catch {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    if (!context?._isProvider && typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.setAttribute('data-theme', localTheme);
    }
  }, [context, localTheme]);

  // If rendered inside a ThemeProvider, use the provider context
  if (context && context._isProvider) {
    return context;
  }

  // Fallback for standalone components rendered without ThemeProvider
  const setPreviewTheme = (themeOrFn) => {
    setLocalTheme((prev) => {
      const next = typeof themeOrFn === 'function' ? themeOrFn(prev) : themeOrFn;
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(THEME_STORAGE_KEY, next);
        }
        if (typeof document !== 'undefined' && document.documentElement) {
          document.documentElement.setAttribute('data-theme', next);
        }
      } catch {
        // ignore
      }
      return next;
    });
  };

  return {
    _isProvider: false,
    previewTheme: localTheme,
    setPreviewTheme,
    isDark: localTheme === 'dark',
  };
}
