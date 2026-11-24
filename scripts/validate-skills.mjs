#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const skillsDir = path.join(root, 'skills');
const pkgPath = path.join(root, 'package.json');

function parseFrontmatter(source, filePath) {
  const lines = source.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') {
    throw new Error(`${filePath}: frontmatter must start with "---"`);
  }
  const end = lines.findIndex((line, i) => i > 0 && line.trim() === '---');
  if (end === -1) {
    throw new Error(`${filePath}: frontmatter is not closed with "---"`);
  }
  const fields = {};
  for (let i = 1; i < end; i++) {
    const line = lines[i];
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    fields[key] = value;
  }
  return fields;
}

function checkPackedFiles(expectedRelativePath) {
  let packOutput;
  try {
    packOutput = execSync('npm pack --dry-run --json', {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, npm_config_loglevel: 'silent' },
    });
  } catch (e) {
    throw new Error(`Failed to run npm pack --dry-run: ${e.stderr || e.message}`);
  }
  const parsed = JSON.parse(packOutput);
  const files = (Array.isArray(parsed) ? parsed[0] : Object.values(parsed)[0])?.files?.map((f) => f.path) ?? [];
  if (!files.includes(expectedRelativePath)) {
    throw new Error(
      `File "${expectedRelativePath}" is missing from the npm pack output. ` +
        `Packed files: ${files.join(', ')}`
    );
  }
}

async function main() {
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  const packageVersion = pkg.version;

  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skillDirs = entries.filter((e) => e.isDirectory());
  if (skillDirs.length === 0) {
    throw new Error('No skill directories found under skills/');
  }

  let hasError = false;
  for (const dir of skillDirs) {
    const skillFile = path.join(skillsDir, dir.name, 'SKILL.md');
    if (!existsSync(skillFile)) {
      console.error(`x ${skillFile} not found`);
      hasError = true;
      continue;
    }

    const source = await readFile(skillFile, 'utf8');
    let fm;
    try {
      fm = parseFrontmatter(source, skillFile);
    } catch (e) {
      console.error(`x ${e.message}`);
      hasError = true;
      continue;
    }

    for (const field of ['name', 'description', 'version']) {
      if (!fm[field] || !String(fm[field]).trim()) {
        console.error(`x ${skillFile}: missing required field "${field}"`);
        hasError = true;
      }
    }

    if (fm.name && fm.name !== dir.name) {
      console.error(
        `x ${skillFile}: name "${fm.name}" does not match directory "${dir.name}"`
      );
      hasError = true;
    }

    if (fm.version && fm.version !== packageVersion) {
      console.error(
        `x ${skillFile}: version "${fm.version}" does not match package.json "${packageVersion}". ` +
          `Repo policy: skill version must match the package version.`
      );
      hasError = true;
    }

    const relative = path.relative(root, skillFile).split(path.sep).join('/');
    try {
      checkPackedFiles(relative);
      console.log(`ok ${relative}`);
    } catch (e) {
      console.error(`x ${e.message}`);
      hasError = true;
    }
  }

  if (hasError) {
    console.error('\nSkill validation failed.');
    process.exit(1);
  }
  console.log('\nAll skills passed validation.');
}

main().catch((e) => {
  console.error(`Unexpected error: ${e.message}`);
  process.exit(1);
});
