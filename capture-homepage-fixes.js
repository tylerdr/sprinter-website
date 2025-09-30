const { chromium } = require('playwright');

async function captureHomepage() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  // Test both light and dark modes
  for (const colorScheme of ['light', 'dark']) {
    const page = await context.newPage({ colorScheme });

    console.log(`📸 Capturing homepage in ${colorScheme} mode...`);
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for animations to settle
    await page.waitForTimeout(2000);

    // Capture full page
    await page.screenshot({
      path: `homepage-fixed-${colorScheme}.png`,
      fullPage: true
    });

    console.log(`✅ Saved homepage-fixed-${colorScheme}.png`);
  }

  await browser.close();
  console.log('✅ Screenshot capture complete!');
}

captureHomepage().catch(console.error);