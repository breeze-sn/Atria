// Builds the React module shown in Studio's export dialog.

const RESERVED = new Set([
  'Array', 'Boolean', 'Date', 'Error', 'Function', 'JSON', 'Map', 'Math', 'Number', 'Object',
  'Promise', 'React', 'RegExp', 'Set', 'String', 'Symbol', 'WeakMap', 'WeakSet',
]);

// "primary button" -> "PrimaryButton". Always returns a valid, non-reserved identifier.
export function toComponentName(label, fallback = 'Component') {
  const words = String(label ?? '')
    .normalize('NFKD')
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  let name = words.map((w) => w[0].toUpperCase() + w.slice(1)).join('');
  if (!name) name = fallback;
  if (/^[0-9]/.test(name)) name = fallback + name;
  if (RESERVED.has(name)) name += 'Component';
  return name;
}

// Gives every layer its own name: Card, Card2, Card3...
export function uniqueComponentNames(items) {
  const used = new Set();
  return items.map((item) => {
    const base = toComponentName(item.name || item.type, toComponentName(item.type));
    let name = base;
    for (let n = 2; used.has(name.toLowerCase()); n += 1) name = base + n;
    used.add(name.toLowerCase());
    return name;
  });
}

const num = (value, fallback) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
};
const str = (value, fallback) => (typeof value === 'string' && value ? value : fallback);
const lit = (value) => JSON.stringify(String(value ?? ''));

function styleFor(item) {
  return {
    fontFamily: 'Inter, Manrope, system-ui, sans-serif',
    fontSize: num(item.size, 14),
    color: str(item.color, '#242420'),
    background: str(item.bg, '#FFFFFF'),
    border: '1px solid ' + str(item.border, '#E3E1DB'),
    borderRadius: num(item.radius, 8),
    padding: num(item.padding, 12) + 'px 16px',
  };
}

function styleBlock(style, indent) {
  const pad = ' '.repeat(indent);
  const rows = Object.entries(style).map(([k, v]) => `${pad}  ${k}: ${JSON.stringify(v)},`);
  return `{{\n${rows.join('\n')}\n${pad}}}`;
}

function markup(item, style) {
  const text = `{${lit(item.text)}}`;
  const s = (indent) => `style=${styleBlock(style, indent)}`;
  switch (item.type) {
    case 'Button':
      return `<button type="button" ${s(6)}>${text}</button>`;
    case 'Text field':
      return `<label style={{ display: "grid", gap: 7, width: 250 }}>\n      <span>{${lit(item.name)}}</span>\n      <input readOnly placeholder={${lit(item.text)}} ${s(8)} />\n    </label>`;
    case 'Checkbox':
      return `<label>\n      <input type="checkbox" defaultChecked /> ${text}\n    </label>`;
    case 'Switch':
      return `<label>\n      <input type="checkbox" role="switch" defaultChecked /> ${text}\n    </label>`;
    case 'Badge':
      return `<span ${s(6)}>${text}</span>`;
    case 'Alert':
      return `<div role="status" ${s(6)}>\n      <strong>{${lit(item.name)}}</strong>\n      <p>${text}</p>\n    </div>`;
    case 'Card':
      return `<article ${s(6)}>\n      <strong>${text}</strong>\n    </article>`;
    case 'Navbar':
      return `<nav ${s(6)}>\n      <strong>Brand</strong>\n    </nav>`;
    case 'Sidebar':
      return `<aside ${s(6)}>\n      <strong>${text}</strong>\n    </aside>`;
    default:
      return `<div ${s(6)}>${text}</div>`;
  }
}

// Returns a complete module that can be saved as a .jsx file.
export function buildReactExport(items) {
  const list = Array.isArray(items) ? items : [];
  const header = "import React from 'react';\n";
  if (list.length === 0) return header + '\n// No components on the canvas yet.\nexport {};\n';

  const names = uniqueComponentNames(list);
  const body = list.map((item, i) => {
    const jsx = markup(item, styleFor(item));
    return `export function ${names[i]}() {\n  return (\n    ${jsx}\n  );\n}\n`;
  });
  return header + '\n' + body.join('\n');
}
