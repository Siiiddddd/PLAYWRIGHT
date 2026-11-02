import { test, expect } from '@playwright/test';

test('opens YouTube', async ({ page }) => {
  await page.goto('https://www.youtube.com/', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveURL(/youtube\.com/);
  await expect(page.getByRole('combobox', { name: /search/i })).toBeVisible({
    timeout: 20_000,
  });
});