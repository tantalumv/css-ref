// Build script for Node.js environments (GitHub Actions)
// Plain JavaScript - no TypeScript stripping needed
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash } from 'crypto';
import { readFileSync, writeFileSync, renameSync, copyFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

function computeContentHash(filePath) {
  const content = readFileSync(filePath);
  return createHash('sha256').update(content).digest('hex').substring(0, 8);
}

function cleanOldBundles() {
  const distDir = join(rootDir, 'dist');
  if (!existsSync(distDir)) return;
  const files = readdirSync(distDir);
  for (const file of files) {
    if (file.match(/^bundle\.[a-f0-9]{8}\.(js|css)$/) || file === 'bundle.js' || file === 'bundle.css') {
      unlinkSync(join(distDir, file));
    }
  }
}

function buildWithHash(input, outputBase, ext) {
  const tempFile = join(rootDir, 'dist', `temp-${outputBase}${ext}`);

  let cmd;
  if (ext === '.js') {
    cmd = `npx esbuild src/main.ts --bundle --outfile=${tempFile} --target=es2020 --minify --format=esm`;
  } else {
    cmd = `npx esbuild src/styles/index.css --bundle --outfile=${tempFile} --minify`;
  }
  
  execSync(cmd, { stdio: 'inherit', cwd: rootDir });
  
  const hash = computeContentHash(tempFile);
  const hashedFile = join(rootDir, 'dist', `${outputBase}.${hash}${ext}`);
  renameSync(tempFile, hashedFile);
  
  return { hash, filename: `${outputBase}.${hash}${ext}` };
}

try {
  cleanOldBundles();
  
  console.log('Building bundle.js with esbuild...');
  const jsResult = buildWithHash('src/main.ts', 'bundle', '.js');
  console.log(`Created: ${jsResult.filename}`);

  console.log('Building bundle.css with esbuild...');
  const cssResult = buildWithHash('src/styles/index.css', 'bundle', '.css');
  console.log(`Created: ${cssResult.filename}`);

  const manifest = {
    'bundle.js': jsResult.filename,
    'bundle.css': cssResult.filename
  };
  writeFileSync(join(rootDir, 'dist', 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Created manifest.json');

  // Update index.html with hashed filenames
  console.log('Updating index.html with hashed filenames...');
  let indexHtml = readFileSync(join(rootDir, 'index.html'), 'utf8');
  
  // Replace bundle.js and bundle.css in script/link tags
  // We use regex to match both hashed and unhashed names for idempotency
  indexHtml = indexHtml.replace(/dist\/bundle(\.[a-f0-9]+)?\.js/g, `dist/${jsResult.filename}`);
  indexHtml = indexHtml.replace(/dist\/bundle(\.[a-f0-9]+)?\.css/g, `dist/${cssResult.filename}`);
  
  writeFileSync(join(rootDir, 'index.html'), indexHtml);
  console.log('Updated index.html');

  // Update sw.js with hashed filenames
  console.log('Updating sw.js with hashed filenames...');
  let swJs = readFileSync(join(rootDir, 'public/sw.js'), 'utf8');
  swJs = swJs.replace(/'\/dist\/bundle\.js'/g, `'\/dist\/${jsResult.filename}'`);
  swJs = swJs.replace(/'\/dist\/bundle\.css'/g, `'\/dist\/${cssResult.filename}'`);
  writeFileSync(join(rootDir, 'dist/sw.js'), swJs);
  console.log('Updated sw.js in dist/');

  console.log('Copying _headers...');
  execSync(
    `cp public/_headers dist/`,
    { stdio: 'inherit', cwd: rootDir }
  );

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
