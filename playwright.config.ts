import { defineConfig } from '@playwright/test';

const isCI = Boolean(process.env.CI || process.env.JENKINS_URL);

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  // Jenkins runs one worker to avoid parallel requests against the shared demo site.
  workers: isCI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],
    ['allure-playwright', {
      resultsDir: 'allure-results',
    }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://demowebshop.tricentis.com/',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
