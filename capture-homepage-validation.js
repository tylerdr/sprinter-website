const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Navigate to homepage
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 60000 });

  // Wait for page to be fully loaded
  await page.waitForTimeout(3000);

  console.log('Capturing light mode sections...');

  // Capture hero section
  await page.screenshot({
    path: 'hero-light.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Scroll to trust indicators and capture viewport
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'trust-indicators-light.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Scroll to AI capabilities and capture viewport
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'ai-capabilities-light.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Scroll to services section
  await page.evaluate(() => window.scrollTo(0, 3500));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'services-light.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  console.log('Capturing dark mode sections...');

  // Toggle to dark mode
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Try to find and click theme toggle
  try {
    const themeButton = await page.locator('[aria-label*="Toggle theme"]').first();
    if (await themeButton.count() > 0) {
      await themeButton.click();
      await page.waitForTimeout(1000);
    } else {
      console.log('Theme toggle not found, using keyboard shortcut');
      await page.keyboard.press('d'); // Sometimes sites use 'd' for dark mode
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    console.log('Could not toggle theme:', e.message);
  }

  // Capture hero section in dark mode
  await page.screenshot({
    path: 'hero-dark.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Scroll to trust indicators and capture
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'trust-indicators-dark.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Scroll to AI capabilities and capture
  await page.evaluate(() => window.scrollTo(0, 2000));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'ai-capabilities-dark.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  // Scroll to services section
  await page.evaluate(() => window.scrollTo(0, 3500));
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: 'services-dark.png',
    clip: { x: 0, y: 0, width: 1920, height: 1080 }
  });

  console.log('Screenshots captured successfully!');
  console.log('Files created:');
  console.log('  - hero-light.png / hero-dark.png');
  console.log('  - trust-indicators-light.png / trust-indicators-dark.png');
  console.log('  - ai-capabilities-light.png / ai-capabilities-dark.png');
  console.log('  - services-light.png / services-dark.png');

  await browser.close();
})();