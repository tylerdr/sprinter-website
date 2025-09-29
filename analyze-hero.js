const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Collect console logs
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({
      type: msg.type(),
      text: msg.text(),
      location: msg.location()
    });
  });

  // Collect errors
  const errors = [];
  page.on('pageerror', error => {
    errors.push(error.toString());
  });

  try {
    console.log('Navigating to the site...');
    await page.goto('https://sprinter-website-git-feature-specsprint-upgrades-sprinter.vercel.app', {
      waitUntil: 'networkidle'
    });

    // Take full page screenshot
    console.log('Taking full page screenshot...');
    await page.screenshot({
      path: 'full-page-screenshot.png',
      fullPage: true
    });

    // Take hero section specific screenshot
    console.log('Taking hero section screenshot...');
    const heroSection = await page.locator('section').first();
    if (await heroSection.count() > 0) {
      await heroSection.screenshot({ path: 'hero-section-screenshot.png' });
    }

    // Check for the main headline
    console.log('Checking for headline text...');
    const headlineSelectors = [
      'h1:has-text("AI Operating Partner")',
      'text="AI Operating Partner"',
      '[data-testid*="headline"]',
      '.hero h1',
      'section h1'
    ];

    let headlineFound = false;
    let headlineText = '';
    for (const selector of headlineSelectors) {
      try {
        const element = page.locator(selector);
        if (await element.count() > 0) {
          headlineFound = true;
          headlineText = await element.first().textContent();
          console.log(`Found headline with selector "${selector}": "${headlineText}"`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    // Get all text content from the hero section
    console.log('Getting hero section content...');
    let heroContent = '';
    try {
      const heroElement = await page.locator('section').first();
      if (await heroElement.count() > 0) {
        heroContent = await heroElement.textContent();
      }
    } catch (e) {
      console.log('Could not get hero content:', e.message);
    }

    // Check for specific elements and their visibility
    console.log('Checking element visibility...');
    const elementChecks = [];

    // Check for various text patterns
    const textPatterns = [
      'AI Operating Partner',
      'Sprinter',
      'Transform your business',
      'Get Started',
      'Contact'
    ];

    for (const pattern of textPatterns) {
      try {
        const element = page.locator(`text="${pattern}"`);
        const count = await element.count();
        const isVisible = count > 0 ? await element.first().isVisible() : false;
        elementChecks.push({
          pattern,
          found: count > 0,
          visible: isVisible,
          count
        });
      } catch (e) {
        elementChecks.push({
          pattern,
          found: false,
          visible: false,
          error: e.message
        });
      }
    }

    // Get the HTML of the hero section
    console.log('Getting hero HTML...');
    let heroHTML = '';
    try {
      const heroElement = await page.locator('section').first();
      if (await heroElement.count() > 0) {
        heroHTML = await heroElement.innerHTML();
      }
    } catch (e) {
      console.log('Could not get hero HTML:', e.message);
    }

    // Check computed styles of potential headline elements
    console.log('Checking styles...');
    const styleChecks = [];
    const potentialHeadlines = await page.locator('h1, [class*="text"], [class*="title"], [class*="headline"]').all();

    for (let i = 0; i < Math.min(potentialHeadlines.length, 5); i++) {
      try {
        const element = potentialHeadlines[i];
        const styles = await element.evaluate(el => {
          const computed = window.getComputedStyle(el);
          return {
            display: computed.display,
            visibility: computed.visibility,
            opacity: computed.opacity,
            color: computed.color,
            fontSize: computed.fontSize,
            position: computed.position,
            zIndex: computed.zIndex,
            transform: computed.transform,
            textContent: el.textContent?.slice(0, 100)
          };
        });
        styleChecks.push({ index: i, styles });
      } catch (e) {
        styleChecks.push({ index: i, error: e.message });
      }
    }

    // Check for background elements and animations
    console.log('Checking background and animations...');
    const backgroundCheck = await page.evaluate(() => {
      const heroSection = document.querySelector('section');
      if (!heroSection) return { found: false };

      const computed = window.getComputedStyle(heroSection);
      return {
        found: true,
        backgroundColor: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        hasCanvas: !!heroSection.querySelector('canvas'),
        hasVideo: !!heroSection.querySelector('video'),
        classNames: heroSection.className,
        childElementCount: heroSection.children.length
      };
    });

    // Compile results
    const results = {
      timestamp: new Date().toISOString(),
      url: page.url(),
      headline: {
        found: headlineFound,
        text: headlineText
      },
      heroContent: heroContent.slice(0, 500), // First 500 characters
      elementChecks,
      styleChecks,
      backgroundCheck,
      consoleLogs,
      errors,
      screenshots: {
        fullPage: 'full-page-screenshot.png',
        heroSection: 'hero-section-screenshot.png'
      }
    };

    // Save results to file
    fs.writeFileSync('hero-analysis-results.json', JSON.stringify(results, null, 2));

    console.log('\n=== ANALYSIS COMPLETE ===');
    console.log('Screenshots saved: full-page-screenshot.png, hero-section-screenshot.png');
    console.log('Detailed results saved: hero-analysis-results.json');

    // Print summary
    console.log('\n=== SUMMARY ===');
    console.log(`Headline found: ${headlineFound}`);
    console.log(`Headline text: "${headlineText}"`);
    console.log(`Console errors: ${errors.length}`);
    console.log(`Hero content length: ${heroContent.length} characters`);

    if (errors.length > 0) {
      console.log('\nErrors found:');
      errors.forEach(error => console.log(`  - ${error}`));
    }

  } catch (error) {
    console.error('Error during analysis:', error);
  } finally {
    await browser.close();
  }
})();