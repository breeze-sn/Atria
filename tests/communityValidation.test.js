import { describe, expect, it } from 'vitest';
import palette from '../community/palettes/quiet-morning.json';
import tokenSet from '../community/tokens/quiet-interface.json';
import component from '../community/components/grounded-button.json';
import { validateContribution, validateContributionFiles } from '../src/data/communityValidation.js';

describe('community contribution validation', () => {
  it('accepts each documented contribution type and matching folder', () => {
    const entries = [
      { file: 'community/palettes/quiet-morning.json', data: palette },
      { file: 'community/tokens/quiet-interface.json', data: tokenSet },
      { file: 'community/components/grounded-button.json', data: component },
    ];

    expect(validateContributionFiles(entries)).toEqual([]);
  });

  it('reports useful field errors for malformed fields and unsupported keys', () => {
    const invalidPalette = {
      ...palette,
      contributor: {},
      sourceUrl: 'javascript:alert(1)',
      colors: [{ name: 'Broken', hex: '#12' }],
      unexpected: true,
    };

    expect(validateContribution(invalidPalette)).toEqual(expect.arrayContaining([
      'contributor must include a name or GitHub handle.',
      'sourceUrl must use http or https.',
      'colors[0].hex must be a HEX colour such as #AABBCC or #ABC.',
      'contribution.unexpected is not a supported field.',
    ]));
  });

  it('accepts valid GitHub usernames and rejects prefixes or invalid characters', () => {
    const validHandle = { ...palette, contributor: { github: 'Atria-Community' } };
    const prefixedHandle = { ...palette, contributor: { github: '@Atria-Community' } };
    const invalidCharacters = { ...palette, contributor: { github: 'Atria_Community' } };
    const handleError =
      'contributor.github must be a valid GitHub username without @ (1-39 letters, numbers, or single hyphens).';

    expect(validateContribution(validHandle)).toEqual([]);
    expect(validateContribution(prefixedHandle)).toContain(handleError);
    expect(validateContribution(invalidCharacters)).toContain(handleError);
  });

  it('checks component preview colours, states, and token dimensions', () => {
    const invalidComponent = {
      ...component,
      preview: { ...component.preview, background: 'green' },
      states: [],
    };
    const invalidTokens = {
      ...tokenSet,
      tokens: { ...tokenSet.tokens, spacing: [{ name: 'space.bad', value: 'wide' }] },
    };

    expect(validateContribution(invalidComponent)).toEqual(expect.arrayContaining([
      'preview.background must be a HEX colour such as #AABBCC or #ABC.',
      'states must be an array with at least one entry.',
    ]));
    expect(validateContribution(invalidTokens)).toContain(
      'tokens.spacing[0].value must be a non-negative CSS dimension such as 8px or 1rem.',
    );
  });

  it('rejects folder/type mismatches and duplicate contribution IDs', () => {
    const entries = [
      { file: 'community/palettes/quiet-morning.json', data: palette },
      { file: 'community/components/another-name.json', data: { ...component, id: palette.id } },
      { file: 'community/tokens/wrong-folder.json', data: palette },
    ];
    const errors = validateContributionFiles(entries);

    expect(errors).toHaveLength(3);
    expect(errors.find((entry) => entry.file.endsWith('wrong-folder.json')).errors).toContain(
      'type must be "tokens" for this contribution folder.',
    );
    expect(errors.find((entry) => entry.file.endsWith('quiet-morning.json')).errors).toContain(
      'id "quiet-morning" is duplicated in: community/palettes/quiet-morning.json, community/components/another-name.json, community/tokens/wrong-folder.json.',
    );
  });
});
