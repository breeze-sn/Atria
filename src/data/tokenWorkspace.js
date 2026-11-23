export const DEFAULT_COLLECTION = 'Primitive';
export const BUILT_IN_COLLECTIONS = [DEFAULT_COLLECTION, 'Semantic'];

const keyFor = name => name.trim().toLowerCase();
const collectionName = value => typeof value === 'string' ? value.trim() : '';

export function restoreTokenWorkspace(saved, starterTokens) {
  const legacy = Array.isArray(saved);
  const storedTokens = legacy ? saved : saved?.tokens;
  const validTokens = Array.isArray(storedTokens)
    ? storedTokens.filter(token => token && typeof token.id === 'string' && typeof token.name === 'string')
    : starterTokens;
  const tokens = legacy
    ? [...starterTokens.filter(token => !validTokens.some(savedToken =>
      savedToken.id === token.id || savedToken.name === token.name)), ...validTokens]
    : validTokens;
  const collections = new Map(BUILT_IN_COLLECTIONS.map(name => [keyFor(name), name]));
  const addName = value => {
    const name = collectionName(value) || DEFAULT_COLLECTION;
    const key = keyFor(name);
    if (!collections.has(key)) collections.set(key, name);
    return collections.get(key);
  };
  if (Array.isArray(saved?.collections)) saved.collections.forEach(addName);
  const normalizedTokens = tokens.map(token => ({ ...token, group: addName(token.group) }));
  return { tokens: normalizedTokens, collections: [...collections.values()] };
}

export function validateCollectionName(name, collections, original = null) {
  const cleaned = collectionName(name);
  if (!cleaned) return 'Enter a collection name.';
  if (cleaned.length > 60) return 'Use 60 characters or fewer.';
  if (collections.some(existing => existing !== original && keyFor(existing) === keyFor(cleaned))) {
    return 'A collection with this name already exists.';
  }
  return '';
}

export function changeCollection(workspace, original, replacement) {
  if (original === null) {
    return { ...workspace, collections: [...workspace.collections, replacement] };
  }
  const destination = replacement ?? DEFAULT_COLLECTION;
  return {
    collections: replacement
      ? workspace.collections.map(name => name === original ? replacement : name)
      : workspace.collections.filter(name => name !== original),
    tokens: workspace.tokens.map(token => token.group === original ? { ...token, group: destination } : token),
  };
}
