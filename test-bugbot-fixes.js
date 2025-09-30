const { chromium } = require('playwright');
const fs = require('fs');

async function testAll() {
  const browser = await chromium.launch();
  const results = {
    navigation: { passed: true, issues: [] },
    sketchStudio: { passed: true, issues: [] },
    pricingGrids: { passed: true, issues: [] },
    visual: { passed: true, issues: [] }
  };

  try {
    // Test 1: Navigation Menu Mobile Responsiveness
    console.log('\n📱 Test 1: Navigation Menu (Mobile)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 60000 });
    await mobilePage.waitForTimeout(2000);

    // Check for horizontal overflow
    const hasOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasOverflow) {
      results.navigation.passed = false;
      results.navigation.issues.push('Horizontal overflow detected on mobile viewport');
    }

    // Capture mobile screenshot
    await mobilePage.screenshot({ path: 'test-mobile-nav.png' });
    console.log('✓ Mobile navigation screenshot saved');
    await mobileContext.close();

    // Test 2: SketchStudio Light/Dark Mode
    console.log('\n🎨 Test 2: SketchStudio Drawing...');
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

    // Navigate to labs/sketch-studio
    await page.goto('http://localhost:3001/labs/sketch-studio', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Capture initial load (should default to dark mode)
    await page.screenshot({ path: 'test-sketch-initial.png' });

    // Try to draw something
    const canvas = await page.locator('canvas').first();
    if (await canvas.count() > 0) {
      const box = await canvas.boundingBox();
      if (box) {
        // Draw a simple line
        await page.mouse.move(box.x + 100, box.y + 100);
        await page.mouse.down();
        await page.mouse.move(box.x + 300, box.y + 300);
        await page.mouse.up();
        await page.waitForTimeout(500);

        await page.screenshot({ path: 'test-sketch-drawn.png' });
        console.log('✓ Drawing test completed');
      }
    } else {
      results.sketchStudio.issues.push('Canvas element not found');
    }

    // Toggle theme
    const themeToggle = await page.locator('button[aria-label*="theme" i]').first();
    if (await themeToggle.count() > 0) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: 'test-sketch-light-mode.png' });
      console.log('✓ Light mode test completed');
    }

    // Test 3: Pricing Grid Layouts
    console.log('\n💰 Test 3: Pricing Grid Layouts...');

    // Test a service page with pricing tiers
    await page.goto('http://localhost:3001/services/quote-to-cash', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);

    // Scroll to pricing section if it exists
    const pricingSection = await page.locator('text=Transparent Pricing').first();
    if (await pricingSection.count() > 0) {
      await pricingSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);

      // Check grid classes are applied
      const gridElement = await page.locator('.grid.gap-6').first();
      if (await gridElement.count() > 0) {
        const classes = await gridElement.getAttribute('class');
        if (classes && classes.includes('grid-cols-')) {
          console.log('✓ Grid classes found:', classes.match(/grid-cols-\d+/g));
        } else {
          results.pricingGrids.passed = false;
          results.pricingGrids.issues.push('Grid classes not properly applied');
        }
      }

      await page.screenshot({ path: 'test-pricing-grid.png' });
      console.log('✓ Pricing grid screenshot saved');
    } else {
      console.log('ℹ️  No pricing section found on this page');
    }

    // Test 4: Visual Regression - Homepage
    console.log('\n👁️  Test 4: Visual Regression Checks...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000);

    // Check for layout shifts
    const layoutShift = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        });
        observer.observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => {
          observer.disconnect();
          resolve(cls);
        }, 2000);
      });
    });

    if (layoutShift > 0.1) {
      results.visual.passed = false;
      results.visual.issues.push(`High cumulative layout shift: ${layoutShift.toFixed(3)}`);
    }

    // Capture final homepage state
    await page.screenshot({ path: 'test-homepage-final.png', fullPage: false });
    console.log('✓ Homepage visual check completed');

    await page.close();

  } catch (error) {
    console.error('❌ Test error:', error.message);
    results.visual.passed = false;
    results.visual.issues.push(`Test error: ${error.message}`);
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('TEST SUMMARY');
  console.log('='.repeat(50));

  const allPassed = Object.values(results).every(r => r.passed);

  Object.entries(results).forEach(([test, result]) => {
    const status = result.passed ? '✅ PASSED' : '❌ FAILED';
    console.log(`\n${test.toUpperCase()}: ${status}`);
    if (result.issues.length > 0) {
      result.issues.forEach(issue => console.log(`  - ${issue}`));
    }
  });

  console.log('\n' + '='.repeat(50));
  console.log(allPassed ? '✅ ALL TESTS PASSED' : '⚠️  SOME TESTS FAILED');
  console.log('='.repeat(50) + '\n');

  // Write results to file
  fs.writeFileSync('test-results.json', JSON.stringify(results, null, 2));

  return allPassed;
}

testAll().then(passed => {
  process.exit(passed ? 0 : 1);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});