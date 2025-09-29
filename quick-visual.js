const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 }
  });

  console.log('🌐 Loading homepage...');
  await page.goto('http://localhost:3001', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Light mode
  console.log('☀️  Capturing light mode...');
  await page.screenshot({
    path: 'hero-light-mode.png',
    fullPage: false // Only capture viewport
  });

  // Dark mode
  console.log('🌙 Switching to dark mode...');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: 'hero-dark-mode.png',
    fullPage: false
  });

  // Scroll down to see more sections in dark mode
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'trust-section-dark.png',
    fullPage: false
  });

  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'capabilities-dark.png',
    fullPage: false
  });

  console.log('✅ Screenshots captured!');
  await browser.close();
})();