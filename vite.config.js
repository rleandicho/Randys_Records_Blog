import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A relative `base` works at any Pages path, e.g. https://rleandicho.github.io/Randys_Records_Blog/
// Change it to '/' if you move to a custom domain.
export default defineConfig({
  plugins: [react()],
  base: './',
});
