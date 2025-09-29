const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();

  // Navigate to homepage
  await page.goto('http://localhost:3001');
  await page.waitForLoadState('networkidle');

  // Light mode screenshot - hero section only
  console.log('📸 Capturing light mode hero section...');
  const hero = await page.locator('section[aria-label="Private Equity AI Hero"]');
  await hero.screenshot({
    path: 'homepage-hero-light.png',
    scale: 'css' // Smaller file size
  });

  // Toggle to dark mode
  console.log('🌙 Switching to dark mode...');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForTimeout(500);

  // Dark mode screenshot - hero section only
  console.log('📸 Capturing dark mode hero section...');
  await hero.screenshot({
    path: 'homepage-hero-dark.png',
    scale: 'css'
  });

  // Capture trust indicators section
  console.log('📸 Capturing trust indicators...');
  await page.screenshot({
    path: 'homepage-trust-dark.png',
    clip: { x: 0, y: 600, width: 1280, height: 400 }
  });

  // Capture services section
  console.log('📸 Capturing services section...');
  await page.evaluate(() => {
    window.scrollTo(0, 1800);
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: 'homepage-services-dark.png',
    clip: { x: 0, y: 0, width: 1280, height: 600 }
  });

  console.log('✅ Visual check complete!');
  console.log('📁 Screenshots saved:');
  console.log('   - homepage-hero-light.png');
  console.log('   - homepage-hero-dark.png');
  console.log('   - homepage-trust-dark.png');
  console.log('   - homepage-services-dark.png');

  await browser.close();
})();