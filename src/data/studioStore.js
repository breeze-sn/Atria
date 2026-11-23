import { useCallback, useEffect, useState } from 'react';
import { restoreTokenWorkspace } from './tokenWorkspace.js';

const defaults = {
  foundations: {
    colours: [
      { id: 'ink', name: 'Ink', value: '#171717' },
      { id: 'stone', name: 'Stone', value: '#55534F' },
      { id: 'ash', name: 'Ash', value: '#99958D' },
      { id: 'mist', name: 'Mist', value: '#D5D1C8' },
      { id: 'paper', name: 'Paper', value: '#EEECE7' },
      { id: 'blue', name: 'Blue', value: '#315FCE' },
      { id: 'teal', name: 'Teal', value: '#238A83' },
      { id: 'green', name: 'Green', value: '#2F7D52' },
      { id: 'amber', name: 'Amber', value: '#C47A22' },
      { id: 'rose', name: 'Rose', value: '#C45B76' },
      { id: 'violet', name: 'Violet', value: '#7656C9' },
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
    { id: 't9', name: 'color.brand.primary', value: '#315FCE', type: 'color', description: 'Primary brand action colour', group: 'Primitive' },
    { id: 't10', name: 'color.feedback.success', value: '#067647', type: 'color', description: 'Success feedback', group: 'Semantic' },
    { id: 't11', name: 'color.feedback.warning', value: '#B54708', type: 'color', description: 'Warning feedback', group: 'Semantic' },
    { id: 't12', name: 'color.feedback.danger', value: '#B42318', type: 'color', description: 'Destructive and error feedback', group: 'Semantic' },
    { id: 't13', name: 'color.surface.subtle', value: '#F7F6F3', type: 'color', description: 'Subtle secondary surface', group: 'Semantic' },
    { id: 't14', name: 'space.3', value: '12px', type: 'dimension', description: 'Small layout gap', group: 'Primitive' },
    { id: 't15', name: 'space.6', value: '24px', type: 'dimension', description: 'Section spacing', group: 'Primitive' },
    { id: 't16', name: 'space.8', value: '32px', type: 'dimension', description: 'Large section spacing', group: 'Primitive' },
    { id: 't17', name: 'radius.medium', value: '8px', type: 'dimension', description: 'Default component radius', group: 'Primitive' },
    { id: 't18', name: 'radius.large', value: '12px', type: 'dimension', description: 'Large surface radius', group: 'Primitive' },
    { id: 't19', name: 'shadow.card', value: '0 4px 16px rgba(0,0,0,.08)', type: 'string', description: 'Subtle card elevation', group: 'Semantic' },
    { id: 't20', name: 'motion.duration.fast', value: '120ms', type: 'dimension', description: 'Fast interface transition', group: 'Primitive' },
  ],
};

function restoreCollection(collection, saved) {
  if (collection === 'tokens') return restoreTokenWorkspace(saved, defaults.tokens);
  return saved ?? defaults[collection];
}

export function useStudioData(collection) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('atria:' + collection);
      if (!saved) return restoreCollection(collection, null);
      const parsed = JSON.parse(saved);
      if (collection === 'foundations' && parsed && typeof parsed === 'object') {
        const savedColours = Array.isArray(parsed.colours) ? parsed.colours : [];
        return {
          ...defaults.foundations,
          ...parsed,
          colours: [
            ...defaults.foundations.colours.filter((item) => !savedColours.some((savedItem) => savedItem.id === item.id || savedItem.name === item.name)),
            ...savedColours,
          ],
        };
      }
      return restoreCollection(collection, parsed);
    } catch {
      return restoreCollection(collection, null);
    }
  });

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === 'atria:' + collection && (event.newValue || collection === 'tokens')) {
        try { setData(restoreCollection(collection, JSON.parse(event.newValue))); } catch { /* ignore invalid storage */ }
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
    setData(restoreCollection(collection, null));
  }, [collection]);

  return [data, save, reset];
}
