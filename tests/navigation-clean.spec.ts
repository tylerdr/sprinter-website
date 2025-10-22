import { test, expect } from '@playwright/test';

test('Take clean navigation screenshots', async ({ page }) => {
  // Desktop view
  await page.setViewportSize({ width: 1440, height: 900 });

  // Go to the site and wait for it to fully load
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

  // Wait a bit more to ensure everything is loaded
  await page.waitForTimeout(2000);

  // Take full page screenshot
  await page.screenshot({
    path: 'test-results/desktop-full-page.png',
    fullPage: true
  });

  // Take just the top portion (navigation area)
  await page.screenshot({
    path: 'test-results/desktop-navigation-area.png',
    clip: { x: 0, y: 0, width: 1440, height: 200 }
  });

  // Mobile view
  await page.setViewportSize({ width: 375, height: 667 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take mobile screenshot
  await page.screenshot({
    path: 'test-results/mobile-full-page.png',
    fullPage: true
  });

  // Take just the top portion (mobile navigation)
  await page.screenshot({
    path: 'test-results/mobile-navigation-area.png',
    clip: { x: 0, y: 0, width: 375, height: 100 }
  });
});