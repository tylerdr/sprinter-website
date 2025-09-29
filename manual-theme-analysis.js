const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3005';
const RESULTS_DIR = './detailed-theme-analysis';

if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

async function detailedThemeAnalysis() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage']
  });

  const analysis = {
    timestamp: new Date().toISOString(),
    pages: {},
    summary: {
      totalIssues: 0,
      criticalIssues: [],
      warnings: [],
      recommendations: []
    }
  };

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Specific tests for each lab page
    const labTests = [
      {
        url: '/labs',
        name: 'Labs Overview',
        specificTests: ['navigation', 'cards', 'buttons', 'filters']
      },
      {
        url: '/labs/agent-simulator',
        name: 'Agent Simulator',
        specificTests: ['canvas_area', 'control_panels', 'progress_indicators', 'input_fields']
      },
      {
        url: '/labs/workflow-tool',
        name: 'Workflow Tool',
        specificTests: ['drawing_canvas', 'toolbars', 'modals', 'node_elements']
      },
      {
        url: '/labs/ideation',
        name: 'Ideation Lab',
        specificTests: ['interactive_elements', 'cards', 'forms']
      },
      {
        url: '/labs/sketch-studio',
        name: 'Sketch Studio',
        specificTests: ['canvas', 'drawing_tools', 'color_pickers', 'controls']
      }
    ];

    for (const labTest of labTests) {
      console.log(`\n=== Analyzing ${labTest.name} ===`);

      try {
        // Navigate to page
        await page.goto(BASE_URL + labTest.url, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        const pageAnalysis = {
          url: labTest.url,
          name: labTest.name,
          themes: {},
          issues: [],
          warnings: []
        };

        // Test both themes
        for (const targetTheme of ['dark', 'light']) {
          console.log(`  Testing ${targetTheme} theme...`);

          // Set theme properly using next-themes
          await page.evaluate((theme) => {
            // Use next-themes setTheme function if available
            if (window.__NEXT_THEMES__) {
              window.__NEXT_THEMES__.setTheme(theme);
            } else {
              // Fallback method
              localStorage.setItem('theme', theme);
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
              document.documentElement.style.colorScheme = theme;
            }
          }, targetTheme);

          // Wait for theme to apply
          await page.waitForTimeout(1500);

          // Verify theme was applied
          const appliedTheme = await page.evaluate(() => {
            return {
              htmlClass: document.documentElement.className,
              isDark: document.documentElement.classList.contains('dark'),
              isLight: document.documentElement.classList.contains('light'),
              colorScheme: document.documentElement.style.colorScheme
            };
          });

          console.log(`  Theme applied: ${JSON.stringify(appliedTheme)}`);

          // Take screenshot
          const screenshot = path.join(RESULTS_DIR, `${labTest.url.replace(/\//g, '_')}_${targetTheme}_detailed.png`);
          await page.screenshot({
            path: screenshot,
            fullPage: true,
            animations: 'disabled'
          });

          // Detailed analysis for this theme
          const themeAnalysis = await analyzeSpecificElements(page, labTest.specificTests, targetTheme);
          pageAnalysis.themes[targetTheme] = {
            appliedTheme,
            screenshot,
            ...themeAnalysis
          };

          // Check for contrast issues
          const contrastIssues = await checkContrast(page);
          if (contrastIssues.length > 0) {
            pageAnalysis.issues.push(...contrastIssues.map(issue => `${targetTheme}: ${issue}`));
          }
        }

        analysis.pages[labTest.url] = pageAnalysis;

      } catch (error) {
        console.log(`  Error analyzing ${labTest.name}: ${error.message}`);
        analysis.pages[labTest.url] = {
          error: error.message
        };
      }
    }

    // Generate summary
    let totalIssues = 0;
    for (const [url, pageData] of Object.entries(analysis.pages)) {
      if (pageData.issues) {
        totalIssues += pageData.issues.length;

        // Identify critical issues
        const criticalKeywords = ['invisible', 'contrast', 'canvas', 'unreadable'];
        const critical = pageData.issues.filter(issue =>
          criticalKeywords.some(keyword => issue.toLowerCase().includes(keyword))
        );

        if (critical.length > 0) {
          analysis.summary.criticalIssues.push({
            page: url,
            issues: critical
          });
        }
      }
    }

    analysis.summary.totalIssues = totalIssues;

    // Add recommendations
    if (analysis.summary.criticalIssues.length > 0) {
      analysis.summary.recommendations.push(
        'Address canvas visibility issues in sketch-studio and workflow-tool',
        'Review color contrast ratios for interactive elements',
        'Test drawing/painting functionality in both themes'
      );
    }

  } finally {
    await browser.close();
  }

  // Save detailed results
  const resultsFile = path.join(RESULTS_DIR, 'detailed-analysis.json');
  fs.writeFileSync(resultsFile, JSON.stringify(analysis, null, 2));

  console.log(`\n=== DETAILED ANALYSIS COMPLETE ===`);
  console.log(`Results saved to: ${resultsFile}`);
  console.log(`Total issues found: ${analysis.summary.totalIssues}`);
  console.log(`Critical issues: ${analysis.summary.criticalIssues.length}`);

  if (analysis.summary.criticalIssues.length > 0) {
    console.log('\nCRITICAL ISSUES:');
    analysis.summary.criticalIssues.forEach(({ page, issues }) => {
      console.log(`  ${page}:`);
      issues.forEach(issue => console.log(`    - ${issue}`));
    });
  }

  return analysis;
}

async function analyzeSpecificElements(page, testTypes, theme) {
  const results = {
    elements: {},
    interactions: {},
    issues: []
  };

  for (const testType of testTypes) {
    console.log(`    Testing ${testType}...`);

    try {
      switch (testType) {
        case 'canvas':
        case 'canvas_area':
        case 'drawing_canvas':
          const canvases = await page.locator('canvas').all();
          results.elements.canvases = canvases.length;

          if (canvases.length > 0) {
            const canvas = canvases[0];
            const canvasInfo = await canvas.evaluate(el => ({
              width: el.width,
              height: el.height,
              visible: el.offsetWidth > 0 && el.offsetHeight > 0,
              styles: {
                backgroundColor: getComputedStyle(el).backgroundColor,
                border: getComputedStyle(el).border,
                opacity: getComputedStyle(el).opacity
              }
            }));

            results.interactions.canvas = canvasInfo;

            if (!canvasInfo.visible) {
              results.issues.push(`Canvas not visible in ${theme} mode`);
            }

            if (canvasInfo.styles.backgroundColor === 'rgba(0, 0, 0, 0)' && theme === 'dark') {
              results.issues.push(`Canvas may be invisible in ${theme} mode - transparent background`);
            }

            // Test canvas interaction
            try {
              await canvas.click({ position: { x: 50, y: 50 } });
              await page.waitForTimeout(500);
              results.interactions.canvasClickable = true;
            } catch (e) {
              results.interactions.canvasClickable = false;
              results.issues.push(`Canvas not interactive in ${theme} mode`);
            }
          }
          break;

        case 'control_panels':
        case 'toolbars':
        case 'controls':
          const controlElements = await page.locator('.controls, .control-panel, .toolbar, [class*="control"], [class*="toolbar"]').all();
          results.elements.controls = controlElements.length;

          for (let i = 0; i < Math.min(controlElements.length, 3); i++) {
            const control = controlElements[i];
            if (await control.isVisible()) {
              const styles = await control.evaluate(el => ({
                backgroundColor: getComputedStyle(el).backgroundColor,
                color: getComputedStyle(el).color,
                border: getComputedStyle(el).border
              }));

              if (styles.backgroundColor === 'rgba(0, 0, 0, 0)' && styles.color === 'rgba(0, 0, 0, 0)') {
                results.issues.push(`Control panel may be invisible in ${theme} mode`);
              }
            }
          }
          break;

        case 'input_fields':
        case 'forms':
          const inputs = await page.locator('input, textarea').all();
          results.elements.inputs = inputs.length;

          for (let i = 0; i < Math.min(inputs.length, 5); i++) {
            const input = inputs[i];
            if (await input.isVisible()) {
              const styles = await input.evaluate(el => ({
                backgroundColor: getComputedStyle(el).backgroundColor,
                color: getComputedStyle(el).color,
                borderColor: getComputedStyle(el).borderColor
              }));

              // Check for poor contrast
              if (styles.backgroundColor === styles.color) {
                results.issues.push(`Input field has poor contrast in ${theme} mode`);
              }
            }
          }
          break;

        case 'progress_indicators':
          const progressBars = await page.locator('.progress, [class*="progress"], [role="progressbar"]').all();
          results.elements.progressBars = progressBars.length;
          break;

        case 'modals':
          const modals = await page.locator('.modal, [role="dialog"], .dialog').all();
          results.elements.modals = modals.length;
          break;

        case 'cards':
          const cards = await page.locator('.card, [class*="card"]').all();
          results.elements.cards = cards.length;
          break;

        case 'buttons':
          const buttons = await page.locator('button').all();
          results.elements.buttons = buttons.length;
          break;

        case 'color_pickers':
          const colorPickers = await page.locator('input[type="color"], .color-picker, [class*="color"]').all();
          results.elements.colorPickers = colorPickers.length;
          break;
      }
    } catch (error) {
      results.issues.push(`Error testing ${testType}: ${error.message}`);
    }
  }

  return results;
}

async function checkContrast(page) {
  const issues = [];

  try {
    // Check for common contrast problems
    const contrastChecks = await page.evaluate(() => {
      const issues = [];
      const elements = document.querySelectorAll('button, input, .card, a');

      for (let i = 0; i < Math.min(elements.length, 10); i++) {
        const el = elements[i];
        const styles = getComputedStyle(el);
        const bg = styles.backgroundColor;
        const color = styles.color;

        // Simple check for same colors (poor contrast)
        if (bg === color && bg !== 'rgba(0, 0, 0, 0)') {
          issues.push(`Element has same background and text color: ${bg}`);
        }

        // Check for transparent on transparent
        if (bg === 'rgba(0, 0, 0, 0)' && color === 'rgba(0, 0, 0, 0)') {
          issues.push('Element has transparent background and text');
        }
      }

      return issues;
    });

    issues.push(...contrastChecks);
  } catch (error) {
    issues.push(`Contrast check error: ${error.message}`);
  }

  return issues;
}

// Run the detailed analysis
detailedThemeAnalysis().catch(console.error);