import { defineConfig } from 'rolldown';

export default defineConfig({
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    entryFileNames: 'bundle.js',
    format: 'iife',
  },
  css: {
    extract: 'bundle.css',
  },
});
