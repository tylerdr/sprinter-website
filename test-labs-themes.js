const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Test configuration
const BASE_URL = 'http://localhost:3005';
const TEST_PAGES = [
  '/labs',
  '/labs/agent-simulator',
  '/labs/workflow-tool',
  '/labs/ideation',
  '/labs/sketch-studio'
];

const RESULTS_DIR = './labs-theme-results';

// Ensure results directory exists
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

async function runThemeTests() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const results = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    screenshots: {},
    issues: [],
    analysis: {}
  };

  try {
    const page = await browser.newPage();

    for (const url of TEST_PAGES) {
      console.log(`\n=== Testing ${url} ===`);

      try {
        // Navigate to page
        await page.goto(BASE_URL + url, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        console.log(`✓ Loaded ${url}`);

        // Test Dark Mode (should be default)
        await page.waitForTimeout(2000);

        // Check current theme
        const isDarkMode = await page.evaluate(() => {
          return document.documentElement.classList.contains('dark') ||
                 document.body.classList.contains('dark');
        });

        console.log(`Current theme: ${isDarkMode ? 'dark' : 'light'}`);

        // Take dark mode screenshot
        const darkScreenshot = path.join(RESULTS_DIR, `${url.replace(/\//g, '_')}_dark.png`);
        await page.screenshot({
          path: darkScreenshot,
          fullPage: true,
          animations: 'disabled'
        });
        results.screenshots[`${url}_dark`] = darkScreenshot;
        console.log(`✓ Dark mode screenshot: ${darkScreenshot}`);

        // Try to find and click theme toggle
        let themeToggled = false;
        const themeToggleSelectors = [
          'button[aria-label*="theme"]',
          '[data-testid*="theme"]',
          '.theme-toggle',
          'button[aria-label*="Toggle theme"]',
          'button[aria-label*="Switch theme"]',
          '[class*="theme-toggle"]',
          '[class*="palette"]',
          'button:has-text("Theme")',
          'button[aria-label*="Open theme studio"]'
        ];

        for (const selector of themeToggleSelectors) {
          try {
            const toggle = page.locator(selector).first();
            if (await toggle.isVisible({ timeout: 1000 })) {
              console.log(`Found theme toggle: ${selector}`);
              await toggle.click();
              await page.waitForTimeout(1500); // Wait for theme transition
              themeToggled = true;
              break;
            }
          } catch (e) {
            // Continue to next selector
          }
        }

        if (!themeToggled) {
          console.log('⚠️ No theme toggle found, trying localStorage manipulation');
          // Fallback: manually toggle theme via localStorage
          await page.evaluate(() => {
            const currentTheme = localStorage.getItem('theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(newTheme);
            document.documentElement.style.colorScheme = newTheme;
          });
          await page.waitForTimeout(1000);
          themeToggled = true;
        }

        // Check theme after toggle
        const isNowDarkMode = await page.evaluate(() => {
          return document.documentElement.classList.contains('dark') ||
                 document.body.classList.contains('dark');
        });

        console.log(`Theme after toggle: ${isNowDarkMode ? 'dark' : 'light'}`);

        // Take light mode screenshot
        const lightScreenshot = path.join(RESULTS_DIR, `${url.replace(/\//g, '_')}_light.png`);
        await page.screenshot({
          path: lightScreenshot,
          fullPage: true,
          animations: 'disabled'
        });
        results.screenshots[`${url}_light`] = lightScreenshot;
        console.log(`✓ Light mode screenshot: ${lightScreenshot}`);

        // Analyze potential theme issues
        const analysis = await analyzeThemeIssues(page, url);
        results.analysis[url] = analysis;

        if (analysis.issues.length > 0) {
          results.issues.push(...analysis.issues.map(issue => `${url}: ${issue}`));
        }

      } catch (error) {
        const errorMsg = `Failed to test ${url}: ${error.message}`;
        console.log(`✗ ${errorMsg}`);
        results.issues.push(errorMsg);
      }
    }

  } finally {
    await browser.close();
  }

  // Save results
  const resultsPath = path.join(RESULTS_DIR, 'theme-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  console.log(`\n=== RESULTS SUMMARY ===`);
  console.log(`Results saved to: ${resultsPath}`);
  console.log(`Screenshots saved to: ${RESULTS_DIR}`);
  console.log(`Total issues found: ${results.issues.length}`);
  console.log(`Total screenshots: ${Object.keys(results.screenshots).length}`);

  if (results.issues.length > 0) {
    console.log(`\n=== ISSUES FOUND ===`);
    results.issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });
  }

  return results;
}

async function analyzeThemeIssues(page, url) {
  const analysis = {
    elements: {},
    issues: [],
    warnings: []
  };

  try {
    // Check for common problematic elements
    const elementsToCheck = [
      { name: 'Canvas Elements', selector: 'canvas' },
      { name: 'Input Fields', selector: 'input, textarea' },
      { name: 'Buttons', selector: 'button' },
      { name: 'Code Blocks', selector: 'code, pre' },
      { name: 'Modal/Popup Elements', selector: '.modal, .popup, .dialog, [role="dialog"]' },
      { name: 'Cards/Panels', selector: '.card, [class*="card"], .panel' },
      { name: 'Progress Bars', selector: '.progress, [class*="progress"]' }
    ];

    for (const elementType of elementsToCheck) {
      const elements = await page.locator(elementType.selector).all();

      if (elements.length > 0) {
        analysis.elements[elementType.name] = elements.length;

        // Check visibility and contrast for first few elements
        for (let i = 0; i < Math.min(elements.length, 3); i++) {
          try {
            const element = elements[i];
            if (await element.isVisible()) {
              const styles = await element.evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                  backgroundColor: computed.backgroundColor,
                  color: computed.color,
                  opacity: computed.opacity,
                  visibility: computed.visibility,
                  display: computed.display
                };
              });

              // Check for potential issues
              if (styles.opacity === '0' || styles.visibility === 'hidden') {
                analysis.issues.push(`${elementType.name} element hidden (opacity: ${styles.opacity}, visibility: ${styles.visibility})`);
              }

              if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' && styles.color === 'rgba(0, 0, 0, 0)') {
                analysis.issues.push(`${elementType.name} element may be invisible (transparent background and text)`);
              }
            }
          } catch (e) {
            // Element might not be accessible
          }
        }
      }
    }

    // Check for JavaScript errors
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });

    // Wait a moment for any errors to surface
    await page.waitForTimeout(2000);

    if (logs.length > 0) {
      analysis.issues.push(`Console errors: ${logs.join(', ')}`);
    }

  } catch (error) {
    analysis.issues.push(`Analysis error: ${error.message}`);
  }

  return analysis;
}

// Run the tests
runThemeTests().catch(console.error);