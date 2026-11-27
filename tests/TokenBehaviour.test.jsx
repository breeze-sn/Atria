import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Tokens from '../src/pages/Tokens.jsx';

const fixture = [
  { id: 'accent', name: 'color.accent', value: '#112233', type: 'color', description: 'Brand anchor', group: 'Primitive' },
  { id: 'gap', name: 'space.gap', value: '16px', type: 'dimension', description: 'Layout gap', group: 'Semantic' },
];
const saved = () => JSON.parse(localStorage.getItem('atria:tokens'));
const search = text => fireEvent.change(screen.getByPlaceholderText('Find a token...'), { target: { value: text } });
const readBlob = blob => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = () => reject(reader.error);
  reader.readAsText(blob);
});
let originalCreate;
let originalRevoke;

beforeEach(() => {
  vi.spyOn(crypto, 'randomUUID').mockReturnValue('00000000-0000-4000-8000-000000000025');
  localStorage.clear();
  localStorage.setItem('atria:tokens', JSON.stringify({ tokens: fixture, collections: ['Primitive', 'Semantic'] }));
  originalCreate = Object.getOwnPropertyDescriptor(URL, 'createObjectURL');
  originalRevoke = Object.getOwnPropertyDescriptor(URL, 'revokeObjectURL');
});

afterEach(() => {
  vi.restoreAllMocks();
  for (const [key, descriptor] of [['createObjectURL', originalCreate], ['revokeObjectURL', originalRevoke]]) {
    if (descriptor) Object.defineProperty(URL, key, descriptor);
    else delete URL[key];
  }
  localStorage.clear();
});

it('persists a trimmed new token and its chosen collection through a fresh mount', () => {
  const view = render(<Tokens />);
  fireEvent.change(screen.getByLabelText('New token name'), { target: { value: '  space.large  ' } });
  fireEvent.change(screen.getByLabelText('Token type'), { target: { value: 'dimension' } });
  fireEvent.change(screen.getByLabelText('New token value'), { target: { value: '  24px  ' } });
  fireEvent.change(screen.getByLabelText('Token group'), { target: { value: 'Semantic' } });
  fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Large gap' } });
  fireEvent.click(screen.getByRole('button', { name: 'Add', exact: true }));
  const created = saved().tokens.find(token => token.name === 'space.large');
  expect(created).toMatchObject({ value: '24px', group: 'Semantic', type: 'dimension', description: 'Large gap' });
  expect(created.id).toBe('00000000-0000-4000-8000-000000000025');
  expect(saved().tokens).toHaveLength(3);
  view.unmount();
  render(<Tokens />);
  expect(screen.getAllByLabelText('Token name').map(input => input.value)).toContain('space.large');
});

it('persists valid name and value edits while preserving the token identity and its neighbours', () => {
  const view = render(<Tokens />);
  fireEvent.change(screen.getAllByLabelText('Token name')[0], { target: { value: 'color.primary' } });
  fireEvent.change(screen.getAllByLabelText('Token value')[0], { target: { value: '#abcdef' } });
  expect(saved().tokens[0]).toEqual({ ...fixture[0], name: 'color.primary', value: '#abcdef' });
  expect(saved().tokens[1]).toEqual(fixture[1]);
  view.unmount();
  render(<Tokens />);
  expect(screen.getAllByLabelText('Token name')[0]).toHaveValue('color.primary');
  expect(screen.getAllByLabelText('Token value')[0]).toHaveValue('#abcdef');
});

it('removes a selected token from storage and clears its selected-copy state', () => {
  const view = render(<Tokens />);
  fireEvent.click(screen.getByLabelText('Select color.accent'));
  expect(screen.getByRole('button', { name: 'Copy selected CSS (1)' })).toBeEnabled();
  const card = screen.getByDisplayValue('color.accent').closest('article');
  fireEvent.click(within(card).getByTitle('Delete token'));
  expect(saved().tokens).toEqual([fixture[1]]);
  expect(screen.getByRole('button', { name: 'Copy selected CSS (0)' })).toBeDisabled();
  view.unmount();
  render(<Tokens />);
  expect(screen.queryByDisplayValue('color.accent')).not.toBeInTheDocument();
});

it('searches names, values and descriptions case-insensitively and intersects collection filters', () => {
  render(<Tokens />);
  for (const query of ['COLOR.ACCENT', '#112233', 'BRAND ANCHOR']) {
    search(query);
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByDisplayValue('color.accent')).toBeInTheDocument();
  }
  search('16PX');
  expect(screen.getByDisplayValue('space.gap')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Primitive', exact: true }));
  expect(screen.getByText('No matching tokens.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'All tokens', exact: true }));
  expect(screen.getByDisplayValue('space.gap')).toBeInTheDocument();
  search('');
  expect(screen.getAllByRole('article')).toHaveLength(2);
  expect(saved().tokens).toEqual(fixture);
});

function captureDownloads() {
  const blobs = [];
  const downloads = [];
  Object.defineProperty(URL, 'createObjectURL', { configurable: true, value: vi.fn(blob => { blobs.push(blob); return 'blob:token-fixture'; }) });
  Object.defineProperty(URL, 'revokeObjectURL', { configurable: true, value: vi.fn() });
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () { downloads.push(this.download); });
  return { blobs, downloads };
}

it('exports real JSON and CSS blobs for the whole workspace independently of a search filter', async () => {
  const { blobs, downloads } = captureDownloads();
  render(<Tokens />);
  search('Brand anchor');
  fireEvent.click(screen.getByRole('button', { name: 'JSON', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'CSS', exact: true }));
  expect(downloads).toEqual(['atria-tokens.json', 'atria-tokens.css']);
  expect(blobs.map(blob => blob.type)).toEqual(['application/json', 'text/css']);
  const exported = JSON.parse(await readBlob(blobs[0]));
  expect(exported).toEqual(fixture.map(({ id, ...token }) => token));
  const css = await readBlob(blobs[1]);
  expect(css).toContain('--atria-color-accent: #112233;');
  expect(css).toContain('--atria-space-gap: 16px;');
  expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2);
});

it('preserves an intentionally empty workspace and exports an empty collection', async () => {
  localStorage.setItem('atria:tokens', JSON.stringify({ tokens: [], collections: ['Primitive', 'Semantic'] }));
  const { blobs } = captureDownloads();
  const view = render(<Tokens />);
  expect(screen.getByText('No matching tokens.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'JSON', exact: true }));
  fireEvent.click(screen.getByRole('button', { name: 'CSS', exact: true }));
  expect(JSON.parse(await readBlob(blobs[0]))).toEqual([]);
  expect(await readBlob(blobs[1])).not.toContain('--atria-');
  view.unmount();
  render(<Tokens />);
  expect(screen.queryAllByRole('article')).toHaveLength(0);
});
