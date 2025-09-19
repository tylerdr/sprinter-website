const { chromium } = require('playwright');

async function analyzePage() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  // Set viewport for desktop view
  const page = await context.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  try {
    console.log('Navigating to AI Sprint page...');
    await page.goto('https://sprinter-website-git-feature-specsprint-upgrades-sprinter.vercel.app/ai-sprint', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    // Take full page screenshot
    console.log('Taking full page screenshot...');
    await page.screenshot({
      path: '/home/sprinter/sprinter-website/ai-sprint-desktop.png',
      fullPage: true
    });

    // Analyze page elements
    console.log('Analyzing page elements...');

    // Check for forms
    const forms = await page.locator('form').count();
    console.log(`Forms found: ${forms}`);

    // Check for buttons
    const buttons = await page.locator('button, [role="button"], input[type="submit"]').count();
    console.log(`Buttons found: ${buttons}`);

    // Check for links
    const links = await page.locator('a[href]').count();
    console.log(`Links found: ${links}`);

    // Check for images
    const images = await page.locator('img').count();
    console.log(`Images found: ${images}`);

    // Check for any error messages or broken elements
    const errorElements = await page.locator('[class*="error"], .error, [data-error], [aria-invalid="true"]').count();
    console.log(`Potential error elements: ${errorElements}`);

    // Get page title
    const title = await page.title();
    console.log(`Page title: ${title}`);

    // Check for meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    console.log(`Meta description: ${metaDescription || 'Not found'}`);

    // Check console errors
    let consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Test mobile responsiveness
    console.log('Testing mobile view...');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: '/home/sprinter/sprinter-website/ai-sprint-mobile.png',
      fullPage: true
    });

    // Check if navigation menu is accessible on mobile
    const mobileMenuButton = await page.locator('[aria-label*="menu"], .menu-toggle, [data-menu], button[class*="menu"]').count();
    console.log(`Mobile menu buttons found: ${mobileMenuButton}`);

    console.log('Page analysis complete for AI Sprint');

  } catch (error) {
    console.error('Error analyzing AI Sprint page:', error.message);
  }

  // Now analyze sitemap
  try {
    console.log('Fetching sitemap...');
    await page.goto('https://sprinter-website-git-feature-specsprint-upgrades-sprinter.vercel.app/sitemap.xml', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Get sitemap content
    const sitemapContent = await page.content();
    console.log('Sitemap fetched successfully');

    // Save sitemap content
    const fs = require('fs');
    fs.writeFileSync('/home/sprinter/sprinter-website/sitemap-content.xml', sitemapContent);

  } catch (error) {
    console.error('Error fetching sitemap:', error.message);
  }

  await browser.close();
}

analyzePage().catch(console.error);