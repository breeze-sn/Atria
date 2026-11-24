import React from 'react';
import { Sun, Moon } from '@phosphor-icons/react';

export default function ThemePreviewToggle({
  mode,
  onChange,
  label = 'Preview theme',
}) {
  const isLight = mode === 'light';
  const isDark = mode === 'dark';

  return (
    <div
      role="group"
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        border: isDark ? '1px solid #38383e' : '1px solid var(--line, #deddd8)',
        borderRadius: 4,
        background: isDark ? '#1c1c1f' : '#ffffff',
        padding: 2,
        gap: 2,
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <button
        type="button"
        aria-pressed={isLight}
        aria-label="Light theme preview"
        onClick={() => onChange('light')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '5px 9px',
          border: 0,
          borderRadius: 3,
          background: isLight ? (isDark ? '#2e2e34' : '#242420') : 'transparent',
          color: isLight ? '#ffffff' : (isDark ? '#a1a1aa' : '#6f6d67'),
          fontSize: 10,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.15s ease, color 0.15s ease',
          outlineOffset: 2,
        }}
      >
        <Sun size={13} weight={isLight ? 'bold' : 'regular'} />
        <span>Light</span>
      </button>

      <button
        type="button"
        aria-pressed={isDark}
        aria-label="Dark theme preview"
        onClick={() => onChange('dark')}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '5px 9px',
          border: 0,
          borderRadius: 3,
          background: isDark ? '#ffffff' : 'transparent',
          color: isDark ? '#141416' : '#6f6d67',
          fontSize: 10,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.15s ease, color 0.15s ease',
          outlineOffset: 2,
        }}
      >
        <Moon size={13} weight={isDark ? 'bold' : 'regular'} />
        <span>Dark</span>
      </button>
    </div>
  );
}
