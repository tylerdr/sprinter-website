const { chromium } = require('playwright');

async function analyzeLocalSite() {
  const browser = await chromium.launch();
  const context = await browser.newContext();

  try {
    // Test AI Sprint page
    console.log('Analyzing AI Sprint page...');
    const page = await context.newPage();

    // Set viewport for desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Navigate to AI Sprint page
    await page.goto('http://localhost:3001/ai-sprint', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    // Wait for page to fully load
    await page.waitForTimeout(3000);

    // Take full page screenshot
    console.log('Taking desktop screenshot...');
    await page.screenshot({
      path: '/home/sprinter/sprinter-website/ai-sprint-desktop-local.png',
      fullPage: true
    });

    // Analyze page elements
    console.log('Analyzing page elements...');

    // Check for forms
    const forms = await page.locator('form').count();
    console.log(`Forms found: ${forms}`);

    // Check for buttons
    const buttons = await page.locator('button, [role="button"], input[type="submit"], a[class*="button"]').count();
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

    // Check for navigation
    const navItems = await page.locator('nav a, header a').count();
    console.log(`Navigation links: ${navItems}`);

    // Check for CTAs
    const ctaButtons = await page.locator('button:has-text("Book"), button:has-text("Start"), button:has-text("Get")').count();
    console.log(`CTA buttons: ${ctaButtons}`);

    // Test mobile responsiveness
    console.log('Testing mobile responsiveness...');
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: '/home/sprinter/sprinter-website/ai-sprint-mobile-local.png',
      fullPage: true
    });

    // Check if navigation menu is accessible on mobile
    const mobileMenuButton = await page.locator('[aria-label*="menu"], .menu-toggle, [data-menu], button[class*="menu"]').count();
    console.log(`Mobile menu buttons found: ${mobileMenuButton}`);

    // Test tablet view
    console.log('Testing tablet view...');
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad size
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: '/home/sprinter/sprinter-website/ai-sprint-tablet-local.png',
      fullPage: true
    });

    // Check for accessibility features
    console.log('Checking accessibility...');
    const ariaLabels = await page.locator('[aria-label]').count();
    console.log(`Elements with aria-label: ${ariaLabels}`);

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    console.log(`Headings found: ${headings}`);

    // Test form interactions
    console.log('Testing form elements...');
    const submitButtons = await page.locator('button[type="submit"]').count();
    console.log(`Submit buttons: ${submitButtons}`);

    // Check for external links
    const externalLinks = await page.locator('a[href^="http"]:not([href*="localhost"])').count();
    console.log(`External links: ${externalLinks}`);

    // Console error tracking
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Reload to capture any console errors
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    if (consoleErrors.length > 0) {
      console.log('Console errors detected:');
      consoleErrors.forEach(error => console.log(`  - ${error}`));
    } else {
      console.log('No console errors detected');
    }

    // Test sitemap
    console.log('Testing sitemap...');
    await page.goto('http://localhost:3001/sitemap.xml', {
      waitUntil: 'networkidle',
      timeout: 30000
    });

    const sitemapContent = await page.content();
    console.log('Sitemap status: Available');

    // Extract URLs from sitemap
    const urlMatches = sitemapContent.match(/<loc>(.*?)<\/loc>/g);
    if (urlMatches) {
      console.log(`URLs in sitemap: ${urlMatches.length}`);
      console.log('Sample URLs:');
      urlMatches.slice(0, 10).forEach(url => {
        const cleanUrl = url.replace(/<\/?loc>/g, '');
        console.log(`  - ${cleanUrl}`);
      });
    }

    console.log('Analysis complete!');

  } catch (error) {
    console.error('Error during analysis:', error.message);
  } finally {
    await browser.close();
  }
}

analyzeLocalSite().catch(console.error);