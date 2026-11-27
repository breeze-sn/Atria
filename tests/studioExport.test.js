import { describe, expect, it } from 'vitest';
import { transformWithOxc } from 'vite';
import { buildReactExport, toComponentName, uniqueComponentNames } from '../src/data/studioExport.js';

const item = (over = {}) => ({
  id: 'x', type: 'Button', name: 'Primary button', text: 'Get started',
  bg: '#242420', color: '#FFFFFF', border: '#242420', radius: 8, padding: 12, size: 14, ...over,
});
const compiles = (code) => transformWithOxc(code, 'export.jsx', { lang: 'jsx' });
const declared = (code) => [...code.matchAll(/export function (\w+)\(/g)].map((m) => m[1]);

describe('toComponentName', () => {
  it('turns layer names into PascalCase identifiers', () => {
    expect(toComponentName('Primary button')).toBe('PrimaryButton');
    expect(toComponentName('feature-card_2')).toBe('FeatureCard2');
  });

  it('strips characters that are not valid in identifiers', () => {
    expect(toComponentName('<script>alert(1)</script>')).toBe('ScriptAlert1Script');
    expect(toComponentName('"; drop table')).toBe('DropTable');
  });

  it('never returns an empty, numeric-leading or reserved name', () => {
    expect(toComponentName('')).toBe('Component');
    expect(toComponentName('!!!')).toBe('Component');
    expect(toComponentName('3d card')).toBe('Component3dCard');
    expect(toComponentName('Object')).toBe('ObjectComponent');
    expect(toComponentName('React')).toBe('ReactComponent');
  });
});

describe('uniqueComponentNames', () => {
  it('numbers duplicates, ignoring case', () => {
    const names = uniqueComponentNames([item(), item(), item({ name: 'primary BUTTON' })]);
    expect(names).toEqual(['PrimaryButton', 'PrimaryButton2', 'PrimaryBUTTON3']);
  });

  it('does not collide with a name that already ends in a number', () => {
    const names = uniqueComponentNames([item({ name: 'Card' }), item({ name: 'Card 2' }), item({ name: 'Card' })]);
    expect(new Set(names.map((n) => n.toLowerCase())).size).toBe(3);
  });
});

describe('buildReactExport', () => {
  it('exports a valid empty module for an empty canvas', async () => {
    const code = buildReactExport([]);
    expect(code).toContain("import React from 'react';");
    expect(declared(code)).toEqual([]);
    await expect(compiles(code)).resolves.toBeTruthy();
  });

  it('keeps content and visual properties', async () => {
    const code = buildReactExport([item({ bg: '#112233', radius: 20, padding: 9, size: 18 })]);
    expect(code).toContain('export function PrimaryButton()');
    expect(code).toContain('"Get started"');
    expect(code).toContain('background: "#112233"');
    expect(code).toContain('borderRadius: 20');
    expect(code).toContain('padding: "9px 16px"');
    expect(code).toContain('fontSize: 18');
    await compiles(code);
  });

  it('declares each component once when several share a type', async () => {
    const code = buildReactExport([item({ name: 'Button 1' }), item({ name: 'Button 1' }), item({ name: 'Button 1' })]);
    const names = declared(code);
    expect(names).toHaveLength(3);
    expect(new Set(names).size).toBe(3);
    await compiles(code);
  });

  it('escapes special characters in text so the output stays valid', async () => {
    const nasty = 'Save {now} <b>"quote"</b> & \'tick\' \\ `tpl` ${x}\nline2';
    const code = buildReactExport([item({ text: nasty, name: nasty })]);
    expect(code).not.toContain('<b>"quote"');
    const result = await compiles(code);
    expect(result.code).toContain('Save {now}');
  });

  it('covers every component type with valid JSX', async () => {
    const types = ['Button', 'Text field', 'Checkbox', 'Switch', 'Badge', 'Alert', 'Card', 'Navbar', 'Sidebar', 'Avatar'];
    const code = buildReactExport(types.map((type) => item({ type, name: type + ' a' })));
    expect(declared(code)).toHaveLength(types.length);
    await compiles(code);
  });

  it('falls back to defaults for missing or bad numeric and colour values', async () => {
    const code = buildReactExport([item({ radius: 'abc', padding: undefined, bg: '' })]);
    expect(code).toContain('borderRadius: 8');
    expect(code).toContain('padding: "12px 16px"');
    await compiles(code);
  });
});
