const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newContext({ viewport: { width: 1920, height: 1080 } }).then(c => c.newPage());

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  await page.screenshot({ path: 'hero-updated.png' });
  console.log('✓ Hero screenshot saved');

  await browser.close();
})();