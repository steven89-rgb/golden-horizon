import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Golden Horizon Research website.
// base MUST be absolute ('/') so that deep links and hard refreshes
// (e.g. /shop, /verify, /product/rc12) load /assets/* correctly. With a
// relative base ('./'), those routes resolve assets against the nested path
// (e.g. /product/assets/...) and 404. Render's render.yaml rewrite already
// serves index.html for every route, so '/' is the right choice here.
export default defineConfig({
  plugins: [react()],
  base: '/',
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
