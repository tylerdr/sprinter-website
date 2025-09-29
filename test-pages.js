const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function testPages() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--disable-web-security', '--allow-running-insecure-content']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  const baseUrl = 'http://localhost:3005';
  const pages = ['/blog', '/case-studies', '/about', '/use-cases'];

  const results = {
    timestamp: new Date().toISOString(),
    pages: {}
  };

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, 'page-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  for (const pagePath of pages) {
    console.log(`Testing page: ${pagePath}`);
    const pageKey = pagePath.replace('/', '').replace(/\//g, '-') || 'home';
    results.pages[pageKey] = {
      path: pagePath,
      darkMode: {},
      lightMode: {},
      issues: []
    };

    try {
      // Navigate to page
      await page.goto(`${baseUrl}${pagePath}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      // Wait for page to load completely
      await page.waitForTimeout(2000);

      // Test in dark mode first (should be default)
      console.log(`  Testing ${pagePath} in dark mode...`);

      // Force dark mode by setting data-theme attribute
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      });

      await page.waitForTimeout(1000); // Wait for theme to apply

      // Take dark mode screenshot
      const darkScreenshot = path.join(screenshotsDir, `${pageKey}-dark.png`);
      await page.screenshot({
        path: darkScreenshot,
        fullPage: true,
        timeout: 10000
      });

      // Analyze dark mode
      const darkAnalysis = await analyzePage(page, 'dark');
      results.pages[pageKey].darkMode = {
        screenshot: darkScreenshot,
        ...darkAnalysis
      };

      // Switch to light mode
      console.log(`  Testing ${pagePath} in light mode...`);

      // Toggle to light mode
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      });

      await page.waitForTimeout(1000); // Wait for theme to apply

      // Take light mode screenshot
      const lightScreenshot = path.join(screenshotsDir, `${pageKey}-light.png`);
      await page.screenshot({
        path: lightScreenshot,
        fullPage: true,
        timeout: 10000
      });

      // Analyze light mode
      const lightAnalysis = await analyzePage(page, 'light');
      results.pages[pageKey].lightMode = {
        screenshot: lightScreenshot,
        ...lightAnalysis
      };

    } catch (error) {
      console.error(`Error testing ${pagePath}:`, error.message);
      results.pages[pageKey].issues.push({
        type: 'navigation_error',
        message: error.message
      });
    }
  }

  await browser.close();

  // Save results
  const resultsPath = path.join(__dirname, 'page-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  return results;
}

async function analyzePage(page, theme) {
  const analysis = {
    theme,
    elements: {},
    contrast_issues: [],
    visual_issues: []
  };

  try {
    // Check for article cards
    const articleCards = await page.locator('article, [class*="card"], .blog-card, .case-study-card').count();
    analysis.elements.articleCards = articleCards;

    // Check text elements
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
    analysis.elements.headings = headings;

    const links = await page.locator('a').count();
    analysis.elements.links = links;

    const images = await page.locator('img').count();
    analysis.elements.images = images;

    // Check for potential contrast issues by examining computed styles
    const textElements = await page.locator('p, span, div, h1, h2, h3, h4, h5, h6, a').all();
    let lowContrastCount = 0;

    for (let i = 0; i < Math.min(textElements.length, 20); i++) { // Sample first 20 elements
      try {
        const element = textElements[i];
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            fontSize: computed.fontSize,
            tagName: el.tagName.toLowerCase()
          };
        });

        // Basic contrast check (simplified)
        if (styles.color && styles.color.includes('rgb')) {
          const colorMatch = styles.color.match(/rgb\\((\\d+),\\s*(\\d+),\\s*(\\d+)\\)/);
          if (colorMatch) {
            const [, r, g, b] = colorMatch.map(Number);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;

            if ((theme === 'dark' && brightness > 200) || (theme === 'light' && brightness < 50)) {
              lowContrastCount++;
            }
          }
        }
      } catch (e) {
        // Skip elements that can't be analyzed
      }
    }

    if (lowContrastCount > 0) {
      analysis.contrast_issues.push({
        type: 'potential_low_contrast',
        count: lowContrastCount,
        message: `Found ${lowContrastCount} elements with potential contrast issues in ${theme} mode`
      });
    }

    // Check for missing images or broken elements
    const brokenImages = await page.locator('img[src=""], img:not([src])').count();
    if (brokenImages > 0) {
      analysis.visual_issues.push({
        type: 'broken_images',
        count: brokenImages,
        message: `Found ${brokenImages} images with missing or empty src attributes`
      });
    }

    // Check page title
    analysis.pageTitle = await page.title();

  } catch (error) {
    analysis.analysisError = error.message;
  }

  return analysis;
}

// Run the test
testPages().then(results => {
  console.log('\\nPage testing complete!');
  console.log('\\nSummary:');

  Object.entries(results.pages).forEach(([pageKey, pageData]) => {
    console.log(`\\n${pageData.path}:`);
    console.log(`  Dark mode: ${pageData.darkMode.elements?.articleCards || 0} cards, ${pageData.darkMode.elements?.headings || 0} headings`);
    console.log(`  Light mode: ${pageData.lightMode.elements?.articleCards || 0} cards, ${pageData.lightMode.elements?.headings || 0} headings`);

    if (pageData.darkMode.contrast_issues?.length > 0) {
      console.log(`  Dark mode issues: ${pageData.darkMode.contrast_issues.length}`);
    }
    if (pageData.lightMode.contrast_issues?.length > 0) {
      console.log(`  Light mode issues: ${pageData.lightMode.contrast_issues.length}`);
    }
    if (pageData.issues?.length > 0) {
      console.log(`  Navigation issues: ${pageData.issues.length}`);
    }
  });

  console.log(`\\nResults saved to: page-test-results.json`);
  console.log(`Screenshots saved to: page-screenshots/`);

}).catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});