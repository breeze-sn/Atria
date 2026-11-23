import { validateContributionFiles } from './communityValidation.js';

const contributionModules = import.meta.glob('../../community/{palettes,tokens,components}/*.json', {
  eager: true,
  import: 'default',
});

const files = Object.entries(contributionModules).map(([file, data]) => ({ file, data }));
const validationErrors = validateContributionFiles(files);
const invalidFiles = new Set(validationErrors.map(({ file }) => file));

export const communityContributions = files
  .filter(({ file }) => !invalidFiles.has(file))
  .map(({ file, data }) => ({ ...data, file }));

export { validationErrors as communityValidationErrors };
