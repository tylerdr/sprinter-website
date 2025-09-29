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
    console.log('Navigating to local site...');
    await page.goto('http://localhost:3004', {
      waitUntil: 'networkidle'
    });

    console.log('✅ Successfully loaded local site');

    // Take full page screenshot
    await page.screenshot({
      path: 'local-full-page.png',
      fullPage: true
    });

    // Take hero section specific screenshot
    const heroSection = await page.locator('section').first();
    if (await heroSection.count() > 0) {
      await heroSection.screenshot({ path: 'local-hero-section.png' });
    }

    // Look for main headline
    const headlineSelectors = [
      'h1:has-text("AI Operating Partner")',
      'text="AI Operating Partner"',
      'h1',
      '[class*="hero"] h1',
      '[class*="title"]'
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

    // Get all hero content
    const heroContent = await page.locator('section').first().textContent();
    console.log('Hero content preview:', heroContent.slice(0, 200));

    // Look for specific elements
    const elementChecks = [];
    const textPatterns = [
      'AI Operating Partner',
      'Sprinter',
      'Transform',
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
        if (count > 0) {
          console.log(`✅ Found "${pattern}" - visible: ${isVisible}`);
        }
      } catch (e) {
        elementChecks.push({
          pattern,
          found: false,
          visible: false,
          error: e.message
        });
      }
    }

    // Check for background/animation elements
    const backgroundCheck = await page.evaluate(() => {
      const heroSection = document.querySelector('section');
      if (!heroSection) return { found: false };

      const computed = window.getComputedStyle(heroSection);
      const canvases = heroSection.querySelectorAll('canvas');
      const videos = heroSection.querySelectorAll('video');

      return {
        found: true,
        backgroundColor: computed.backgroundColor,
        backgroundImage: computed.backgroundImage,
        hasCanvas: canvases.length > 0,
        canvasCount: canvases.length,
        hasVideo: videos.length > 0,
        videoCount: videos.length,
        classNames: heroSection.className,
        childElementCount: heroSection.children.length,
        canvasDetails: Array.from(canvases).map(canvas => ({
          width: canvas.width,
          height: canvas.height,
          className: canvas.className
        }))
      };
    });

    console.log('Background check:', backgroundCheck);

    // Get detailed HTML structure
    const heroHTML = await page.locator('section').first().innerHTML();

    // Save detailed results
    const results = {
      timestamp: new Date().toISOString(),
      url: page.url(),
      status: 'success',
      headline: {
        found: headlineFound,
        text: headlineText
      },
      heroContent: heroContent.slice(0, 1000),
      elementChecks,
      backgroundCheck,
      consoleLogs: consoleLogs.slice(0, 10), // Limit logs
      errors,
      heroHTML: heroHTML.slice(0, 2000) // First 2000 chars of HTML
    };

    fs.writeFileSync('local-hero-analysis.json', JSON.stringify(results, null, 2));

    console.log('\n=== LOCAL ANALYSIS COMPLETE ===');
    console.log(`Headline found: ${headlineFound}`);
    console.log(`Headline text: "${headlineText}"`);
    console.log(`Console errors: ${errors.length}`);
    console.log(`Background elements: Canvas(${backgroundCheck.canvasCount || 0}), Video(${backgroundCheck.videoCount || 0})`);

  } catch (error) {
    console.error('Error during local analysis:', error);
  } finally {
    await browser.close();
  }
})();