// Local-first storage for Studio projects. Every project keeps its own name,
// components and tokens inside one versioned localStorage entry.

export const PROJECTS_KEY = 'atria:builder:projects';
export const BACKUP_KEY = 'atria:builder:projects:backup';
export const DEFAULT_NAME = 'Untitled design system';

// Keys written before projects existed. They are read once for migration and
// never changed or removed.
const LEGACY_KEYS = {
  items: 'atria:builder:elements',
  tokens: 'atria:builder:tokens',
  name: 'atria:builder:name',
};

const copy = (value) => JSON.parse(JSON.stringify(value));
const cleanName = (name) => String(name ?? '').trim() || DEFAULT_NAME;

let sequence = 0;
const newId = () => 'project-' + Date.now().toString(36) + '-' + (sequence += 1) + Math.random().toString(36).slice(2, 6);

export function makeProject(name, items, tokens, id = newId()) {
  return { id, name: cleanName(name), items: copy(items), tokens: copy(tokens) };
}

// "Name", then "Name 2", "Name 3"... so the project list never shows two alike.
export function uniqueName(projects, base) {
  const taken = new Set(projects.map((p) => p.name));
  let name = base;
  for (let n = 2; taken.has(name); n += 1) name = base + ' ' + n;
  return name;
}

const isProject = (value) =>
  Boolean(value) && typeof value.id === 'string' && Array.isArray(value.items) && Array.isArray(value.tokens);

const readJson = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
};

function readStored() {
  const stored = readJson(PROJECTS_KEY);
  if (!Array.isArray(stored?.projects)) return null;
  const projects = stored.projects.filter(isProject);
  if (!projects.length) return null;
  const activeId = projects.some((p) => p.id === stored.activeId) ? stored.activeId : projects[0].id;
  return { activeId, projects };
}

// Returns the saved projects. Without any, the first project is built from the
// old single-workspace keys, falling back to the given defaults.
export function loadWorkspace({ items, tokens }) {
  const stored = readStored();
  if (stored) return stored;
  const legacyItems = readJson(LEGACY_KEYS.items);
  const legacyTokens = readJson(LEGACY_KEYS.tokens);
  const first = makeProject(
    readJson(LEGACY_KEYS.name),
    Array.isArray(legacyItems) ? legacyItems : items,
    Array.isArray(legacyTokens) ? legacyTokens : tokens,
    'project-default',
  );
  return { activeId: first.id, projects: [first] };
}

// Applies a change on top of what is in storage right now, so edits made to other
// projects (for example in a second tab) are kept. Throws if storage is full or
// unavailable.
export function updateWorkspace(fallback, change) {
  const next = change(readStored() ?? fallback);
  const raw = localStorage.getItem(PROJECTS_KEY);
  if (raw) {
    const stored = readJson(PROJECTS_KEY);
    const readable = Array.isArray(stored?.projects) && stored.projects.every(isProject);
    // Keep a copy of anything we could not read before writing over it.
    if (!readable) localStorage.setItem(BACKUP_KEY, raw);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify({ version: 1, ...next }));
  return next;
}

export function putProject(workspace, project) {
  const exists = workspace.projects.some((p) => p.id === project.id);
  return {
    activeId: project.id,
    projects: exists
      ? workspace.projects.map((p) => (p.id === project.id ? project : p))
      : [...workspace.projects, project],
  };
}

export function addProject(workspace, project) {
  return { activeId: workspace.activeId, projects: [...workspace.projects, project] };
}

export function openProject(workspace, id) {
  return workspace.projects.some((p) => p.id === id) ? { ...workspace, activeId: id } : workspace;
}

export function renameProject(workspace, id, name) {
  return { ...workspace, projects: workspace.projects.map((p) => (p.id === id ? { ...p, name: cleanName(name) } : p)) };
}

export function duplicateProject(workspace, id) {
  const source = workspace.projects.find((p) => p.id === id);
  if (!source) return workspace;
  return addProject(workspace, makeProject(uniqueName(workspace.projects, source.name + ' copy'), source.items, source.tokens));
}

// Deleting the last project leaves a fresh one built by makeBlank.
export function deleteProject(workspace, id, makeBlank) {
  const index = workspace.projects.findIndex((p) => p.id === id);
  if (index === -1) return workspace;
  let projects = workspace.projects.filter((p) => p.id !== id);
  if (!projects.length) projects = [makeBlank()];
  const activeId = workspace.activeId === id ? projects[Math.min(index, projects.length - 1)].id : workspace.activeId;
  return { activeId, projects };
}
