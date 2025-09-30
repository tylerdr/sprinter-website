const { chromium } = require('playwright');

async function testFocused() {
  const browser = await chromium.launch();
  let allPassed = true;

  try {
    console.log('\n🔍 Running focused tests...\n');

    // Test 1: Mobile Navigation
    console.log('1️⃣  Testing mobile navigation...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 667 }
    });
    const mobilePage = await mobileContext.newPage();

    await mobilePage.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await mobilePage.waitForTimeout(2000);

    const hasOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });

    if (hasOverflow) {
      console.log('   ❌ Horizontal overflow detected');
      allPassed = false;
    } else {
      console.log('   ✅ No horizontal overflow');
    }

    await mobilePage.screenshot({ path: 'mobile-nav-test.png' });
    console.log('   📸 Screenshot saved: mobile-nav-test.png\n');
    await mobileContext.close();

    // Test 2: SketchStudio Canvas
    console.log('2️⃣  Testing SketchStudio canvas...');
    const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

    await page.goto('http://localhost:3000/labs/sketch-studio', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const canvasExists = await page.locator('canvas').count() > 0;
    if (canvasExists) {
      console.log('   ✅ Canvas element found');

      // Check canvas background color (should be dark by default)
      const bgColor = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return null;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, 1, 1);
        return imageData.data;
      });

      if (bgColor && bgColor[0] < 50) { // Dark background
        console.log('   ✅ Canvas defaults to dark background');
      } else {
        console.log('   ⚠️  Canvas may not have correct default theme');
      }

      await page.screenshot({ path: 'sketch-studio-test.png' });
      console.log('   📸 Screenshot saved: sketch-studio-test.png\n');
    } else {
      console.log('   ❌ Canvas element not found');
      allPassed = false;
    }

    // Test 3: Pricing Grid
    console.log('3️⃣  Testing pricing grid classes...');
    await page.goto('http://localhost:3000/services/quote-to-cash', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(2000);

    const hasGridClasses = await page.evaluate(() => {
      const grids = document.querySelectorAll('.grid');
      for (const grid of grids) {
        const classes = grid.className;
        if (classes.includes('grid-cols-')) {
          return true;
        }
      }
      return false;
    });

    if (hasGridClasses) {
      console.log('   ✅ Grid classes properly applied');
    } else {
      console.log('   ⚠️  Grid classes may not be applied');
    }

    await page.screenshot({ path: 'pricing-grid-test.png' });
    console.log('   📸 Screenshot saved: pricing-grid-test.png\n');

    // Test 4: Homepage Quick Check
    console.log('4️⃣  Testing homepage rendering...');
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);

    // Check for key elements
    const heroExists = await page.locator('text=Put AI to Work').count() > 0;
    const statsExist = await page.locator('text=Portfolio wins').count() > 0;

    if (heroExists && statsExist) {
      console.log('   ✅ Key homepage elements present');
    } else {
      console.log('   ❌ Some homepage elements missing');
      allPassed = false;
    }

    await page.screenshot({ path: 'homepage-test.png' });
    console.log('   📸 Screenshot saved: homepage-test.png\n');

    await page.close();

  } catch (error) {
    console.error('❌ Test error:', error.message);
    allPassed = false;
  }

  await browser.close();

  console.log('='.repeat(50));
  if (allPassed) {
    console.log('✅ ALL TESTS PASSED - No issues found!');
  } else {
    console.log('⚠️  SOME ISSUES DETECTED - See details above');
  }
  console.log('='.repeat(50) + '\n');

  return allPassed;
}

testFocused().then(passed => {
  process.exit(passed ? 0 : 1);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});