const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DIMENSION_PATTERN = /^(?:0|(?:\d+\.?\d*|\.\d+)(?:px|rem|em|%|vh|vw|pt))$/i;
const TOKEN_GROUPS = ['colors', 'typography', 'spacing', 'radius', 'other'];
const OTHER_TOKEN_TYPES = ['shadow', 'border', 'opacity', 'duration', 'elevation', 'other'];
const COMPONENT_PREVIEW_KINDS = ['button', 'card', 'badge'];
const GITHUB_USERNAME_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9]|-(?=[A-Za-z0-9])){0,38}$/;

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function rejectUnknownFields(value, allowedFields, path, errors) {
  Object.keys(value).forEach((field) => {
    if (!allowedFields.includes(field)) errors.push(`${path}.${field} is not a supported field.`);
  });
}

function addStringError(errors, value, path, label = path) {
  if (!isNonEmptyString(value)) errors.push(`${label} must be a non-empty string.`);
}

function validateUrl(value, path, errors) {
  if (!isNonEmptyString(value)) {
    errors.push(`${path} must be a non-empty http or https URL.`);
    return;
  }

  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      errors.push(`${path} must use http or https.`);
    }
  } catch {
    errors.push(`${path} must be a valid http or https URL.`);
  }
}

function validateContributor(contributor, errors) {
  if (!isRecord(contributor)) {
    errors.push('contributor must be an object with a name or GitHub handle.');
    return;
  }

  rejectUnknownFields(contributor, ['name', 'github'], 'contributor', errors);
  const hasName = isNonEmptyString(contributor.name);
  const hasGithub = isNonEmptyString(contributor.github);
  if (contributor.name !== undefined && !hasName) {
    errors.push('contributor.name must be a non-empty string when provided.');
  }
  if (contributor.github !== undefined && !hasGithub) {
    errors.push('contributor.github must be a non-empty string when provided.');
  } else if (hasGithub && !GITHUB_USERNAME_PATTERN.test(contributor.github)) {
    errors.push(
      'contributor.github must be a valid GitHub username without @ (1-39 letters, numbers, or single hyphens).',
    );
  }
  if (!hasName && !hasGithub) {
    errors.push('contributor must include a name or GitHub handle.');
  }
}

function validatePalette(data, errors) {
  if (!Array.isArray(data.colors)) {
    errors.push('colors must be an array with at least two named colours.');
    return;
  }
  if (data.colors.length < 2) errors.push('colors must be an array with at least two named colours.');

  data.colors.forEach((color, index) => {
    const path = `colors[${index}]`;
    if (!isRecord(color)) {
      errors.push(`${path} must be an object.`);
      return;
    }
    rejectUnknownFields(color, ['name', 'hex', 'notes'], path, errors);
    addStringError(errors, color.name, `${path}.name`);
    if (!isNonEmptyString(color.hex) || !HEX_COLOR_PATTERN.test(color.hex.trim())) {
      errors.push(`${path}.hex must be a HEX colour such as #AABBCC or #ABC.`);
    }
    if (color.notes !== undefined && typeof color.notes !== 'string') {
      errors.push(`${path}.notes must be a string when provided.`);
    }
  });

  if (data.usageNotes !== undefined && typeof data.usageNotes !== 'string') {
    errors.push('usageNotes must be a string when provided.');
  }
}

function validateTokenEntries(group, entries, errors) {
  if (!Array.isArray(entries)) {
    errors.push(`tokens.${group} must be an array when provided.`);
    return;
  }

  entries.forEach((token, index) => {
    const path = `tokens.${group}[${index}]`;
    if (!isRecord(token)) {
      errors.push(`${path} must be an object.`);
      return;
    }
    const tokenFields = group === 'typography'
      ? ['name', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'description']
      : group === 'other'
        ? ['name', 'type', 'value', 'description']
        : ['name', 'value', 'description'];
    rejectUnknownFields(token, tokenFields, path, errors);
    addStringError(errors, token.name, `${path}.name`);

    if (group === 'colors') {
      if (!isNonEmptyString(token.value) || !HEX_COLOR_PATTERN.test(token.value.trim())) {
        errors.push(`${path}.value must be a HEX colour such as #AABBCC or #ABC.`);
      }
    } else if (group === 'typography') {
      addStringError(errors, token.fontFamily, `${path}.fontFamily`);
      if (!isNonEmptyString(token.fontSize) || !DIMENSION_PATTERN.test(token.fontSize.trim())) {
        errors.push(`${path}.fontSize must be a CSS size such as 14px or 1rem.`);
      }
      if (!Number.isInteger(token.fontWeight) || token.fontWeight < 1 || token.fontWeight > 1000) {
        errors.push(`${path}.fontWeight must be an integer from 1 to 1000.`);
      }
      if (typeof token.lineHeight !== 'number' || !Number.isFinite(token.lineHeight) || token.lineHeight <= 0) {
        errors.push(`${path}.lineHeight must be a positive number.`);
      }
    } else if (group === 'spacing' || group === 'radius') {
      if (!isNonEmptyString(token.value) || !DIMENSION_PATTERN.test(token.value.trim())) {
        errors.push(`${path}.value must be a non-negative CSS dimension such as 8px or 1rem.`);
      }
    } else {
      if (!OTHER_TOKEN_TYPES.includes(token.type)) {
        errors.push(`${path}.type must be one of: ${OTHER_TOKEN_TYPES.join(', ')}.`);
      }
      if (
        !(isNonEmptyString(token.value) || (typeof token.value === 'number' && Number.isFinite(token.value)))
      ) {
        errors.push(`${path}.value must be a non-empty string or finite number.`);
      }
    }

    if (token.description !== undefined && typeof token.description !== 'string') {
      errors.push(`${path}.description must be a string when provided.`);
    }
  });
}

function validateTokens(data, errors) {
  if (!isRecord(data.tokens)) {
    errors.push('tokens must be an object containing supported token categories.');
    return;
  }

  Object.keys(data.tokens).forEach((group) => {
    if (!TOKEN_GROUPS.includes(group)) {
      errors.push(`tokens.${group} is not supported. Use: ${TOKEN_GROUPS.join(', ')}.`);
    }
  });

  const tokenNames = new Set();
  TOKEN_GROUPS.forEach((group) => {
    if (data.tokens[group] !== undefined) {
      validateTokenEntries(group, data.tokens[group], errors);
      if (Array.isArray(data.tokens[group])) {
        data.tokens[group].forEach((token, index) => {
          if (!isRecord(token) || !isNonEmptyString(token.name)) return;
          const normalizedName = token.name.trim().toLowerCase();
          if (tokenNames.has(normalizedName)) {
            errors.push(`tokens.${group}[${index}].name must be unique within the token set.`);
          }
          tokenNames.add(normalizedName);
        });
      }
    }
  });

  const tokenCount = TOKEN_GROUPS.reduce((count, group) => {
    const entries = data.tokens[group];
    return count + (Array.isArray(entries) ? entries.length : 0);
  }, 0);
  if (tokenCount === 0) errors.push('tokens must contain at least one token.');
}

function validateNamedDescriptions(value, path, errors) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${path} must be an array with at least one entry.`);
    return;
  }

  value.forEach((item, index) => {
    const itemPath = `${path}[${index}]`;
    if (!isRecord(item)) {
      errors.push(`${itemPath} must be an object.`);
      return;
    }
    rejectUnknownFields(item, ['name', 'description'], itemPath, errors);
    addStringError(errors, item.name, `${itemPath}.name`);
    addStringError(errors, item.description, `${itemPath}.description`);
  });
}

function validateComponent(data, errors) {
  if (!isRecord(data.preview)) {
    errors.push('preview must be an object describing a safe visual preview.');
  } else {
    rejectUnknownFields(data.preview, ['kind', 'label', 'background', 'foreground'], 'preview', errors);
    if (!COMPONENT_PREVIEW_KINDS.includes(data.preview.kind)) {
      errors.push(`preview.kind must be one of: ${COMPONENT_PREVIEW_KINDS.join(', ')}.`);
    }
    addStringError(errors, data.preview.label, 'preview.label');
    ['background', 'foreground'].forEach((field) => {
      const value = data.preview[field];
      if (!isNonEmptyString(value) || !HEX_COLOR_PATTERN.test(value.trim())) {
        errors.push(`preview.${field} must be a HEX colour such as #AABBCC or #ABC.`);
      }
    });
  }

  validateNamedDescriptions(data.variants, 'variants', errors);
  validateNamedDescriptions(data.states, 'states', errors);

  if (data.references !== undefined) {
    if (!Array.isArray(data.references)) {
      errors.push('references must be an array when provided.');
    } else {
      data.references.forEach((reference, index) => {
        const path = `references[${index}]`;
        if (!isRecord(reference)) {
          errors.push(`${path} must be an object.`);
          return;
        }
        rejectUnknownFields(reference, ['label', 'url'], path, errors);
        addStringError(errors, reference.label, `${path}.label`);
        validateUrl(reference.url, `${path}.url`, errors);
      });
    }
  }
}

function expectedTypeForFile(file) {
  const folder = file.replace(/\\/g, '/').split('/').slice(-2, -1)[0];
  return {
    palettes: 'palette',
    tokens: 'tokens',
    components: 'component',
  }[folder];
}

export function validateContribution(data, expectedType) {
  const errors = [];
  if (!isRecord(data)) return ['contribution must be a JSON object.'];

  const allowedTypes = ['palette', 'tokens', 'component'];
  if (!allowedTypes.includes(data.type)) {
    errors.push(`type must be one of: ${allowedTypes.join(', ')}.`);
  } else if (expectedType && data.type !== expectedType) {
    errors.push(`type must be "${expectedType}" for this contribution folder.`);
  }

  const specificFields = data.type === 'palette'
    ? ['colors', 'usageNotes']
    : data.type === 'tokens'
      ? ['tokens']
      : data.type === 'component'
        ? ['preview', 'variants', 'states', 'references']
        : [];
  rejectUnknownFields(
    data,
    ['type', 'id', 'name', 'description', 'contributor', 'sourceUrl', ...specificFields],
    'contribution',
    errors,
  );
  addStringError(errors, data.id, 'id');
  if (isNonEmptyString(data.id) && !SLUG_PATTERN.test(data.id)) {
    errors.push('id must be a simple slug using letters, numbers, and single dashes.');
  }
  addStringError(errors, data.name, 'name');
  addStringError(errors, data.description, 'description');
  validateContributor(data.contributor, errors);
  validateUrl(data.sourceUrl, 'sourceUrl', errors);

  if (data.type === 'palette') validatePalette(data, errors);
  if (data.type === 'tokens') validateTokens(data, errors);
  if (data.type === 'component') validateComponent(data, errors);

  return errors;
}

export function validateContributionFiles(entries) {
  const checked = entries.map(({ file, data }) => ({
    file,
    data,
    errors: validateContribution(data, expectedTypeForFile(file)),
  }));
  const filesById = new Map();

  checked.forEach((entry) => {
    const id = isRecord(entry.data) && isNonEmptyString(entry.data.id) ? entry.data.id : '';
    if (!id) return;
    const matchingFiles = filesById.get(id.toLowerCase()) || [];
    matchingFiles.push(entry.file);
    filesById.set(id.toLowerCase(), matchingFiles);

    const fileName = entry.file.replace(/\\/g, '/').split('/').pop();
    if (fileName !== `${id}.json`) {
      entry.errors.push(`filename must match the contribution id ("${id}.json").`);
    }
  });

  filesById.forEach((files, id) => {
    if (files.length < 2) return;
    files.forEach((file) => {
      const entry = checked.find((item) => item.file === file);
      entry.errors.push(`id "${id}" is duplicated in: ${files.join(', ')}.`);
    });
  });

  return checked.filter((entry) => entry.errors.length > 0);
}
