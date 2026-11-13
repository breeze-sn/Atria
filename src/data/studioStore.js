import { useCallback, useEffect, useState } from 'react';

const defaults = {
  foundations: {
    colours: [
      { id: 'ink', name: 'Ink', value: '#171717' },
      { id: 'stone', name: 'Stone', value: '#55534F' },
      { id: 'ash', name: 'Ash', value: '#99958D' },
      { id: 'mist', name: 'Mist', value: '#D5D1C8' },
      { id: 'paper', name: 'Paper', value: '#EEECE7' },
    ],
    spacing: [4, 8, 12, 16, 24, 32, 48, 64],
    typography: [
      { name: 'Display', size: 40, weight: 600, lineHeight: 1.1 },
      { name: 'Heading', size: 28, weight: 600, lineHeight: 1.2 },
      { name: 'Title', size: 20, weight: 600, lineHeight: 1.3 },
      { name: 'Body', size: 14, weight: 400, lineHeight: 1.6 },
      { name: 'Label', size: 12, weight: 500, lineHeight: 1.4 },
      { name: 'Caption', size: 11, weight: 400, lineHeight: 1.4 },
    ],
  },
  tokens: [
    { id: 't1', name: 'color.text.primary', value: '#171717', type: 'color', description: 'Primary text and icon colour', group: 'Primitive' },
    { id: 't2', name: 'color.text.secondary', value: '#55534F', type: 'color', description: 'Supporting text', group: 'Semantic' },
    { id: 't3', name: 'color.surface.canvas', value: '#EEECE7', type: 'color', description: 'Main canvas background', group: 'Semantic' },
    { id: 't4', name: 'space.1', value: '4px', type: 'dimension', description: 'Base spacing unit', group: 'Primitive' },
    { id: 't5', name: 'space.2', value: '8px', type: 'dimension', description: 'Compact spacing', group: 'Primitive' },
    { id: 't6', name: 'space.4', value: '16px', type: 'dimension', description: 'Default spacing', group: 'Primitive' },
    { id: 't7', name: 'radius.small', value: '4px', type: 'dimension', description: 'Small corner radius', group: 'Primitive' },
    { id: 't8', name: 'font.body', value: '14px', type: 'dimension', description: 'Default body size', group: 'Semantic' },
  ],
};

export function useStudioData(collection) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('atria:' + collection);
      return saved ? JSON.parse(saved) : defaults[collection];
    } catch {
      return defaults[collection];
    }
  });

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'atria:' + collection && event.newValue) {
        try { setData(JSON.parse(event.newValue)); } catch { /* ignore invalid storage */ }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [collection]);

  const save = useCallback((next) => {
    setData((current) => {
      const value = typeof next === 'function' ? next(current) : next;
      try { localStorage.setItem('atria:' + collection, JSON.stringify(value)); } catch { /* storage unavailable */ }
      return value;
    });
  }, [collection]);

  const reset = useCallback(() => {
    try { localStorage.removeItem('atria:' + collection); } catch { /* ignore */ }
    setData(defaults[collection]);
  }, [collection]);

  return [data, save, reset];
}
