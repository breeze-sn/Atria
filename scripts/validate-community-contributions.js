import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateContributionFiles } from '../src/data/communityValidation.js';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const contributionFolders = ['palettes', 'tokens', 'components'];
const entries = [];
const parseErrors = [];

for (const folder of contributionFolders) {
  const folderPath = path.join(repositoryRoot, 'community', folder);
  let names;

  try {
    names = await readdir(folderPath);
  } catch (error) {
    console.error(`community/${folder}: could not read contribution folder (${error.message}).`);
    process.exitCode = 1;
    continue;
  }

  for (const name of names.filter((fileName) => fileName.endsWith('.json')).sort()) {
    const absolutePath = path.join(folderPath, name);
    const relativePath = path.relative(repositoryRoot, absolutePath).split(path.sep).join('/');
    try {
      entries.push({ file: relativePath, data: JSON.parse(await readFile(absolutePath, 'utf8')) });
    } catch (error) {
      parseErrors.push({ file: relativePath, message: error.message });
    }
  }
}

parseErrors.forEach(({ file, message }) => {
  console.error(`${file}: invalid JSON (${message}).`);
});

const validationErrors = validateContributionFiles(entries);
validationErrors.forEach(({ file, errors }) => {
  errors.forEach((error) => console.error(`${file}: ${error}`));
});

if (parseErrors.length || validationErrors.length || process.exitCode === 1) {
  process.exitCode = 1;
} else {
  console.log(`Validated ${entries.length} community contribution file(s).`);
}
