import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Golden Horizon Research website. base is relative so the build can be
// served from any path (static host, subdirectory, or preview).
export default defineConfig({
  plugins: [react()],
  base: './',
});
