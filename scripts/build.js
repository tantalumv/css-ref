// Build script for Node.js environments (GitHub Actions)
// Plain JavaScript - no TypeScript stripping needed
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

try {
  console.log('Building bundle.js with esbuild...');
  execSync(
    `npx esbuild src/main.ts --bundle --outfile=dist/bundle.js --target=es2020 --minify --format=esm`,
    { stdio: 'inherit', cwd: rootDir }
  );

  console.log('Building bundle.css with esbuild...');
  execSync(
    `npx esbuild src/styles/index.css --bundle --outfile=dist/bundle.css --minify`,
    { stdio: 'inherit', cwd: rootDir }
  );

  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
