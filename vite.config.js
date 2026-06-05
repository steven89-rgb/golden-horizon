import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Golden Horizon Research website. base is relative so the build can be
// served from any path (static host, subdirectory, or preview).
export default defineConfig({
  plugins: [react()],
  base: './',
  // Output to build/ so static hosts that default to a "build" publish
  // directory (e.g. Render) pick it up without extra configuration.
  build: {
    outDir: 'build',
  },
});
