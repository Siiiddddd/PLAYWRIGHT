import { test, expect , Page } from '@playwright/test';

async function handleRobotCheck(page: Page) {
  const robotText = page.locator('text=/are you a robot|unusual traffic|We\'re sorry|verify you are human/i');
  if (await robotText.isVisible({ timeout: 5000 }).catch(() => false)) {
    const continueButton = page.getByRole('button', {
      name: /Continue|Verify|I am not a robot|I'm not a robot|Submit/i,
    }).first();
    if (await continueButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await continueButton.click();
      await page.waitForLoadState('domcontentloaded');
      return;
    }

    const checkbox = page.locator('input[type="checkbox"][name*="robot"], input[type="checkbox"][aria-label*="robot"]');
    if (await checkbox.isVisible({ timeout: 5000 }).catch(() => false)) {
      await checkbox.check();
      await page.waitForLoadState('domcontentloaded');
      return;
    }

    throw new Error('Google robot check detected. Manual verification is required to continue.');
  }
}

test('google to youtube search and capture first Valorant result', async ({ browser }) => {
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1536, height: 1080 },
  });
  const page = await context.newPage();

  await page.goto('https://www.google.com/ncr', { waitUntil: 'domcontentloaded' });
  await handleRobotCheck(page);

  const consentButton = page.getByRole('button', {
    name: /I agree|Accept all|Agree|AGREE|Accept cookies/i,
  }).first();
  if (await consentButton.isVisible({ timeout: 5000 }).catch(() => false)) {
    await consentButton.click();
  }

  const googleSearch = page.locator('[name="q"], textarea[name="q"], input[type="search"]');
  await expect(googleSearch.first()).toBeVisible({ timeout: 15000 });
  await googleSearch.first().fill('youtube');
  await googleSearch.first().press('Enter');

  await handleRobotCheck(page);

  const youtubeResult = page.locator('a[href^="https://www.youtube.com/"]', {
    hasText: /YouTube/i,
  }).first();
  await expect(youtubeResult).toBeVisible({ timeout: 15000 });
  await youtubeResult.click();

  await expect(page).toHaveURL(/youtube\.com/, { timeout: 15000 });
  await handleRobotCheck(page);

  const ytSearchInput = page.locator('input#search, input[aria-label="Search"], input[aria-label="Search on YouTube"]');
  await expect(ytSearchInput.first()).toBeVisible({ timeout: 15000 });
  await ytSearchInput.first().fill('Valorant');
  await ytSearchInput.first().press('Enter');

  await expect(page).toHaveURL(/(search_query=Valorant|search\?q=Valorant|query=Valorant)/, {
    timeout: 15000,
  });

  const firstResult = page.locator('ytd-video-renderer #video-title').first();
  await expect(firstResult).toBeVisible({ timeout: 15000 });

  const firstTitle = (await firstResult.textContent())?.trim() ?? '';
  const firstHref = await firstResult.getAttribute('href');
  const firstUrl = firstHref?.startsWith('http')
    ? firstHref
    : firstHref
    ? `https://www.youtube.com${firstHref}`
    : '';

  console.log('First Valorant video title:', firstTitle);
  console.log('First Valorant video URL:', firstUrl);

  expect(firstTitle.length).toBeGreaterThan(0);
  expect(firstUrl).toContain('youtube.com/watch');

  await context.close();
});
