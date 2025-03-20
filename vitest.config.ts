import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',    // To run tests in a browser-like environment
    globals: true,           // To use global variables like window, document, etc.
  },
});
