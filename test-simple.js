const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newContext({ viewport: { width: 1920, height: 1080 } }).then(c => c.newPage());

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Scroll to services
  await page.evaluate(() => window.scrollTo(0, 3500));
  await page.waitForTimeout(2000);

  await page.screenshot({ path: 'services-test.png' });
  console.log('✓ Services screenshot saved');

  await browser.close();
})();