const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });
  const page = await context.newPage();

  // Try multiple potential URLs
  const urls = [
    'https://sprinter-website-git-feature-specsprint-upgrades-sprinter.vercel.app',
    'https://sprinter-website-git-feature-specsprint-upgrades-sprinter.vercel.app/',
    'https://sprinter-ai.vercel.app', // potential main domain
    'https://sprinter.vercel.app', // alternative
  ];

  for (const url of urls) {
    try {
      console.log(`\n=== Trying URL: ${url} ===`);

      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 10000
      });

      console.log(`Status: ${response.status()}`);
      console.log(`Final URL: ${page.url()}`);

      // Check if we're on a login page
      const isLoginPage = await page.locator('text="Log in to Vercel"').count() > 0;
      console.log(`Is login page: ${isLoginPage}`);

      if (!isLoginPage) {
        console.log('✅ Found actual site! Analyzing...');

        // Take screenshot
        await page.screenshot({ path: `site-screenshot-${Date.now()}.png`, fullPage: true });

        // Look for hero content
        const heroTexts = await page.evaluate(() => {
          const selectors = ['h1', 'h2', '[class*="hero"]', '[class*="title"]', '[class*="headline"]'];
          const results = [];

          selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
              if (el.textContent && el.textContent.trim()) {
                results.push({
                  selector,
                  text: el.textContent.trim(),
                  className: el.className,
                  isVisible: el.offsetParent !== null
                });
              }
            });
          });

          return results;
        });

        console.log('Found text elements:', heroTexts);

        // Check for specific content
        const aiPartnerFound = await page.locator('text="AI Operating Partner"').count() > 0;
        const sprinterFound = await page.locator('text="Sprinter"').count() > 0;

        console.log(`AI Operating Partner found: ${aiPartnerFound}`);
        console.log(`Sprinter found: ${sprinterFound}`);

        if (aiPartnerFound || sprinterFound || heroTexts.length > 0) {
          console.log('✅ Site content found!');
          break;
        }
      }

    } catch (error) {
      console.log(`❌ Error with ${url}: ${error.message}`);
    }
  }

  await browser.close();
})();