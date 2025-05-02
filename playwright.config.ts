import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/tests',
  reporter:'html',
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot:'on',
    baseURL: 'http://localhost:4209',
    trace:'on'
  },
});
