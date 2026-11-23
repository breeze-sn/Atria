import { DEFAULT_COLLECTION } from './tokenWorkspace.js';

const NAME_PATTERN = /^[a-z0-9][a-z0-9._-]*$/i;
export const TOKEN_TYPES = ['color', 'dimension', 'font', 'number', 'string'];

function toEntries(data) {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object' && Array.isArray(data.tokens)) return data.tokens;
  if (data && typeof data === 'object') {
    return Object.entries(data).map(([name, v]) => (v && typeof v === 'object' ? { name, ...v } : { name, value: v }));
  }
  return null;
}

/**
 * Parse JSON text into a review list. Nothing is applied here.
 * Each row is { name, value, type, description, group, status, error } where status is
 * 'new', 'duplicate' (name already exists, will not overwrite) or 'invalid'.
 */
export function parseTokenImport(text, existingTokens = []) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { fileError: 'This is not valid JSON.', rows: [] };
  }
  const entries = toEntries(data);
  if (!entries) return { fileError: 'Expected an array of tokens or an object keyed by token name.', rows: [] };
  if (!entries.length) return { fileError: 'The file contains no tokens.', rows: [] };

  const existing = new Set(existingTokens.map((t) => t.name.trim().toLowerCase()));
  const seen = new Set();
  const rows = entries.map((entry, index) => {
    const item = entry && typeof entry === 'object' && !Array.isArray(entry) ? entry : {};
    const name = typeof item.name === 'string' ? item.name.trim() : '';
    const value = item.value === undefined || item.value === null ? '' : String(item.value).trim();
    const type = item.type === undefined ? 'string' : item.type;
    const row = {
      name,
      value,
      type,
      description: typeof item.description === 'string' ? item.description : '',
      group: typeof item.group === 'string' && item.group.trim() ? item.group.trim() : DEFAULT_COLLECTION,
      status: 'new',
      error: '',
      index,
    };
    if (!name) row.error = 'Missing token name.';
    else if (!NAME_PATTERN.test(name)) row.error = 'Name may only use letters, numbers, dots, dashes and underscores.';
    else if (!value) row.error = 'Missing token value.';
    else if (!TOKEN_TYPES.includes(type)) row.error = 'Unsupported type "' + type + '". Use ' + TOKEN_TYPES.join(', ') + '.';
    if (row.error) {
      row.status = 'invalid';
      return row;
    }
    const key = name.toLowerCase();
    if (existing.has(key)) {
      row.status = 'duplicate';
      row.error = 'A token with this name already exists, so it will be skipped.';
    } else if (seen.has(key)) {
      row.status = 'duplicate';
      row.error = 'Repeated in this file, so only the first one is imported.';
    }
    seen.add(key);
    return row;
  });
  return { fileError: '', rows };
}

/** Turn the importable rows of a review list into token objects. */
export function rowsToTokens(rows, makeId) {
  return rows
    .filter((r) => r.status === 'new')
    .map(({ name, value, type, description, group }) => ({ id: makeId(), name, value, type, description, group }));
}
