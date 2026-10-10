import { test, expect, Page } from '@playwright/test';

async function  skipAdIfPresent(page: Page) {
  const skipAdsButton = page.getByRole('button', { name: /skip ads?/i }).first();
  if (await skipAdsButton.isVisible({ timeout: 8_000 }).catch(() => false)) {
    await skipAdsButton.click();
  }
}

test.describe('YouTube Valorant playback', () => {
  test.describe.configure({ retries: 1 });

  test('plays the third Valorant video from 15 to 45 seconds with audio', async ({ page }) => {
    await page.goto('https://www.youtube.com/', { waitUntil: 'domcontentloaded' });

    const searchBox = page.getByRole('combobox', { name: /search/i });
    await expect(searchBox).toBeVisible({ timeout: 20_000 });
    await searchBox.fill('Valorant');
    await searchBox.press('Enter');

    await expect(page).toHaveURL(/youtube\.com\/results\?search_query=Valorant/i, {
      timeout: 20_000,
    });

    const videoLinks = page.locator('a#video-title[href*="/watch?v="]');
    await expect(videoLinks.nth(2)).toBeVisible({ timeout: 20_000 });

    const thirdVideo = videoLinks.nth(2);
    const title = (await thirdVideo.innerText()).trim();
    const href = await thirdVideo.getAttribute('href');
    expect(title).not.toBe('');
    expect(href).toMatch(/\/watch\?v=/);

    await thirdVideo.click();
    await expect(page).toHaveURL(/youtube\.com\/watch\?v=/i, { timeout: 20_000 });

    const video = page.locator('video').first();
    await expect(video).toBeVisible({ timeout: 20_000 });
    await skipAdIfPresent(page);
    await video.evaluate((element) => (element as HTMLVideoElement).play());

    await expect
      .poll(() => video.evaluate((element) => (element as HTMLVideoElement).duration), {
        timeout: 60_000,
      })
      .toBeGreaterThan(45);

    const unmuteButton = page.getByRole('button', { name: /unmute/i }).first();
    if (await unmuteButton.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await unmuteButton.click();
    }

    await video.evaluate((element) => {
      const media = element as HTMLVideoElement;
      media.currentTime = 15;
      media.muted = false;
    });

    await video.evaluate((element) => (element as HTMLVideoElement).play());
    await expect
      .poll(() => video.evaluate((element) => (element as HTMLVideoElement).currentTime), {
        timeout: 20_000,
      })
      .toBeGreaterThanOrEqual(15);

    await video.evaluate((element) => {
      const media = element as HTMLVideoElement;
      media.currentTime = 45;
      media.pause();
    });

    await expect
      .poll(() => video.evaluate((element) => (element as HTMLVideoElement).currentTime), {
        timeout: 5_000,
      })
      .toBeGreaterThanOrEqual(45);
    await expect
      .poll(() => video.evaluate((element) => (element as HTMLVideoElement).muted), {
        timeout: 5_000,
      })
      .toBe(false);
  });
});