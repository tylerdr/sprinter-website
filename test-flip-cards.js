const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newContext({ viewport: { width: 1920, height: 1080 } }).then(c => c.newPage());

  await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  // Scroll to services section
  await page.evaluate(() => {
    const servicesSection = document.querySelector('section:has(h2)');
    servicesSection?.scrollIntoView({ behavior: 'smooth' });
  });

  await page.waitForTimeout(2000);

  // Find services section and take screenshot
  const servicesSection = await page.locator('text=What You Get').locator('..').locator('..');
  if (await servicesSection.count() > 0) {
    await servicesSection.screenshot({ path: 'services-section-test.png' });
    console.log('✓ Services section screenshot saved');
  }

  // Take full viewport screenshot at services
  await page.screenshot({ path: 'flip-cards-viewport.png' });
  console.log('✓ Viewport screenshot saved');

  await browser.close();
})();