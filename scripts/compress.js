/**
 * Compression script for pre-compressing assets
 * Works with both Bun and Node.js
 * Uses Bun's gzip when available (faster), Node zlib for Brotli
 * 
 * Usage:
 *   bun scripts/compress.js
 *   node scripts/compress.js
 */

import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';
import { createGzip, createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const DIST_DIR = join(process.cwd(), 'dist');

// Detect runtime
const isBun = typeof Bun !== 'undefined';

/**
 * Compress file using Brotli (uses Node zlib - works in both Bun and Node)
 */
async function compressBrotli(input, output) {
  const inputStream = createReadStream(input);
  const outputStream = createWriteStream(output);
  await pipeline(inputStream, createBrotliCompress(), outputStream);
  console.log(`✓ Brotli: ${input} → ${output}`);
}

/**
 * Compress file using Gzip
 * Bun: Uses built-in gzip (faster)
 * Node: Uses zlib.createGzip
 */
async function compressGzip(input, output) {
  if (isBun) {
    // Bun's built-in gzip (faster)
    const data = await readFile(input);
    const compressed = Bun.gzipSync(data);
    await writeFile(output, compressed);
    console.log(`✓ Gzip: ${input} → ${output}`);
  } else {
    // Node.js
    const inputStream = createReadStream(input);
    const outputStream = createWriteStream(output);
    await pipeline(inputStream, createGzip(), outputStream);
    console.log(`✓ Gzip (Node): ${input} → ${output}`);
  }
}

async function compressFile(file) {
  const inputPath = join(DIST_DIR, file);
  
  // Only compress JS and CSS files
  if (!file.match(/\.(js|css)$/)) {
    return;
  }

  // Skip already compressed files
  if (file.match(/\.(gz|br)$/)) {
    return;
  }

  // Skip source maps
  if (file.match(/\.map$/)) {
    return;
  }

  await compressBrotli(inputPath, `${inputPath}.br`);
  await compressGzip(inputPath, `${inputPath}.gz`);
}

async function showFileSizes() {
  console.log('\n📊 File sizes:');
  const files = await readdir(DIST_DIR);
  
  for (const file of files.filter(f => f.match(/\.(js|css)$/))) {
    const stats = await stat(join(DIST_DIR, file));
    const gzStats = await stat(join(DIST_DIR, `${file}.gz`)).catch(() => null);
    const brStats = await stat(join(DIST_DIR, `${file}.br`)).catch(() => null);
    
    const original = (stats.size / 1024).toFixed(2);
    const gz = gzStats ? (gzStats.size / 1024).toFixed(2) : 'N/A';
    const br = brStats ? (brStats.size / 1024).toFixed(2) : 'N/A';
    
    const gzReduction = gzStats ? ((1 - gzStats.size / stats.size) * 100).toFixed(1) : 'N/A';
    const brReduction = brStats ? ((1 - brStats.size / stats.size) * 100).toFixed(1) : 'N/A';
    
    console.log(`  ${file}:`);
    console.log(`    Original: ${original} kB`);
    console.log(`    Gzip:     ${gz} kB (-${gzReduction}%)`);
    console.log(`    Brotli:   ${br} kB (-${brReduction}%)`);
  }
}

async function main() {
  console.log(`🗜️  Compressing assets in dist/... (${isBun ? 'Bun' : 'Node.js'})\n`);
  
  try {
    const files = await readdir(DIST_DIR);
    await Promise.all(files.map(file => compressFile(file)));
    console.log('\n✅ Compression complete!');
    
    await showFileSizes();
    
    // Summary
    console.log('\n💡 GitHub Pages will automatically serve compressed files.');
    console.log('   Browsers preferring Brotli will get .br files');
    console.log('   Others will get .gz files');
  } catch (error) {
    console.error('❌ Compression failed:', error.message);
    if (isBun) {
      console.error('\n💡 Try with Node.js: node scripts/compress.js');
    }
    process.exit(1);
  }
}

main();
