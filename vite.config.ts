/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const viteConfig = defineConfig({
  server: {
    host: '127.0.0.1',
  },
  plugins: [react()],
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);
