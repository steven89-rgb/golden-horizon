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
  // Accept the proxied preview hostname (Claude Code on the web serves the
  // dev/preview server through a generated host that Vite would otherwise block).
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
});
