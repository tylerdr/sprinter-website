const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('\n=== HOMEPAGE ISSUE DETECTION ===\n');

  try {
    // Navigate to homepage
    await page.goto('http://localhost:3007', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Check for console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Console error:', msg.text());
      }
    });

    // Test 1: Check if scrolling works
    console.log('📍 Testing scroll functionality...');
    const scrollableSections = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const issues = [];

      // Check for overflow hidden issues
      sections.forEach((section, idx) => {
        const styles = window.getComputedStyle(section);
        if (styles.overflow === 'hidden' && section.scrollHeight > section.clientHeight) {
          issues.push(`Section ${idx}: Content overflows but overflow:hidden is set`);
        }
      });

      // Check main scroll
      const bodyScrollable = document.body.scrollHeight > window.innerHeight;

      return {
        bodyScrollable,
        issues
      };
    });

    console.log('  Body scrollable:', scrollableSections.bodyScrollable ? '✅' : '❌');
    if (scrollableSections.issues.length > 0) {
      scrollableSections.issues.forEach(issue => console.log('  ❌', issue));
    }

    // Test 2: Check animations
    console.log('\n📍 Checking animations...');
    const animationIssues = await page.evaluate(() => {
      const issues = [];
      const elementsWithAnimation = document.querySelectorAll('[style*="transform"], [style*="opacity"], [class*="animate"]');

      elementsWithAnimation.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          issues.push(`Element with animation has zero dimensions: ${el.className}`);
        }
      });

      return issues;
    });

    if (animationIssues.length > 0) {
      animationIssues.forEach(issue => console.log('  ❌', issue));
    } else {
      console.log('  ✅ Animations appear to be working');
    }

    // Test 3: Check for Bento grid content
    console.log('\n📍 Checking Bento/Service grid content...');
    const bentoContent = await page.evaluate(() => {
      const codeBlocks = document.querySelectorAll('pre, code:not(span code)');
      const issues = [];

      codeBlocks.forEach((block) => {
        const text = block.textContent;
        if (text && text.length > 50) {
          const parent = block.closest('section');
          const sectionClass = parent ? parent.className : 'unknown';
          issues.push(`Code block found in section: ${sectionClass.substring(0, 50)}...`);
        }
      });

      // Check for MagicBento or ServicesBento
      const hasBento = document.querySelector('[class*="bento"], [class*="grid"]');

      return {
        hasBento: !!hasBento,
        codeBlockIssues: issues
      };
    });

    console.log('  Has bento/grid:', bentoContent.hasBento ? '✅' : '⚠️');
    if (bentoContent.codeBlockIssues.length > 0) {
      bentoContent.codeBlockIssues.forEach(issue => console.log('  ❌', issue));
    }

    // Test 4: Check hero section
    console.log('\n📍 Checking Hero section...');
    const heroIssues = await page.evaluate(() => {
      const issues = [];

      // Check headline visibility
      const headlines = document.querySelectorAll('h1, [class*="text-7xl"], [class*="text-6xl"]');
      if (headlines.length === 0) {
        issues.push('No main headline found');
      }

      // Check CTA buttons
      const ctaButtons = document.querySelectorAll('a[href*="/labs"], a[href*="/contact"], button');
      if (ctaButtons.length < 2) {
        issues.push('Missing CTA buttons in hero');
      }

      // Check for broken links
      const links = document.querySelectorAll('a[href]');
      const brokenLinks = [];
      links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('undefined')) {
          brokenLinks.push(href);
        }
      });

      return {
        issues,
        brokenLinks,
        headlineCount: headlines.length,
        ctaCount: ctaButtons.length
      };
    });

    console.log('  Headlines found:', heroIssues.headlineCount);
    console.log('  CTA buttons found:', heroIssues.ctaCount);
    if (heroIssues.issues.length > 0) {
      heroIssues.issues.forEach(issue => console.log('  ❌', issue));
    }
    if (heroIssues.brokenLinks.length > 0) {
      console.log('  ❌ Broken links:', heroIssues.brokenLinks);
    }

    // Test 5: Check section visibility and content
    console.log('\n📍 Checking section visibility...');
    const sectionVisibility = await page.evaluate(() => {
      const sections = document.querySelectorAll('section');
      const issues = [];

      sections.forEach((section, idx) => {
        const rect = section.getBoundingClientRect();
        const styles = window.getComputedStyle(section);

        if (styles.display === 'none') {
          issues.push(`Section ${idx} is hidden (display: none)`);
        }

        if (styles.opacity === '0') {
          issues.push(`Section ${idx} has opacity: 0`);
        }

        if (rect.height < 50) {
          const text = section.textContent?.substring(0, 50) || '';
          issues.push(`Section ${idx} has very small height: ${rect.height}px - ${text}...`);
        }
      });

      return {
        totalSections: sections.length,
        issues
      };
    });

    console.log('  Total sections found:', sectionVisibility.totalSections);
    if (sectionVisibility.issues.length > 0) {
      sectionVisibility.issues.forEach(issue => console.log('  ⚠️', issue));
    }

    // Test 6: Check mobile responsiveness
    console.log('\n📍 Checking mobile responsiveness...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    const mobileIssues = await page.evaluate(() => {
      const issues = [];
      const viewportWidth = window.innerWidth;

      const elements = document.querySelectorAll('*');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > viewportWidth + 5) {
          issues.push(`Element overflows viewport: ${el.tagName}.${el.className?.substring(0, 30)}`);
        }
      });

      return issues.slice(0, 5); // Limit to first 5
    });

    if (mobileIssues.length > 0) {
      console.log('  ❌ Mobile overflow issues:');
      mobileIssues.forEach(issue => console.log('    -', issue));
    } else {
      console.log('  ✅ No mobile overflow detected');
    }

    // Take screenshots
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.screenshot({ path: 'homepage-current-desktop.png', fullPage: false });
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({ path: 'homepage-current-mobile.png', fullPage: false });

    console.log('\n📸 Screenshots saved: homepage-current-desktop.png, homepage-current-mobile.png');

  } catch (error) {
    console.error('Error during testing:', error);
  }

  await browser.close();
  console.log('\n=== TEST COMPLETE ===\n');
})();