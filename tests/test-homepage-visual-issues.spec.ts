import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Issues Review', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Wait for any animations to settle
    await page.waitForTimeout(2000);
  });

  test('Capture full page screenshot - light mode', async ({ page }) => {
    // Take full page screenshot in light mode
    await page.screenshot({
      path: 'homepage-full-page-light.png',
      fullPage: true
    });

    console.log('✓ Full page screenshot captured (light mode)');
  });

  test('Capture full page screenshot - dark mode', async ({ page }) => {
    // Toggle to dark mode
    const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button[aria-label*="Theme"]').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(1000);
    }

    // Take full page screenshot in dark mode
    await page.screenshot({
      path: 'homepage-full-page-dark.png',
      fullPage: true
    });

    console.log('✓ Full page screenshot captured (dark mode)');
  });

  test('Issue 1: Bento area with bg-black', async ({ page }) => {
    // Look for elements with bg-black class that might look bad
    const bentoArea = page.locator('.bg-black, [class*="bg-black"]').first();

    if (await bentoArea.isVisible()) {
      await bentoArea.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await bentoArea.screenshot({
        path: 'issue-1-bento-bg-black.png'
      });

      console.log('✓ Bento area with bg-black captured');
    } else {
      console.log('! Bento area with bg-black not found');
    }
  });

  test('Issue 2: Timeline section positioning', async ({ page }) => {
    // Look for timeline section
    const timelineSection = page.locator('text="Timeline"').first();
    const timelineParent = timelineSection.locator('..').locator('..').locator('..');

    if (await timelineSection.isVisible()) {
      await timelineSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      await timelineParent.screenshot({
        path: 'issue-2-timeline-section.png'
      });

      console.log('✓ Timeline section captured');
    } else {
      console.log('! Timeline section not found');
    }
  });

  test('Issue 3: Empty "Until Proven Results" section', async ({ page }) => {
    // Look for "Until Proven Results" text
    const resultsSection = page.locator('text="Until Proven Results"').first();

    if (await resultsSection.isVisible()) {
      await resultsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const parentSection = resultsSection.locator('..').locator('..').locator('..');
      await parentSection.screenshot({
        path: 'issue-3-until-proven-results.png'
      });

      console.log('✓ Until Proven Results section captured');
    } else {
      console.log('! Until Proven Results section not found');
    }
  });

  test('Issue 4: Trusted Partners/Industry Experience/What Clients Say spacing', async ({ page }) => {
    // Look for these sections
    const trustedPartners = page.locator('text="Trusted Partners"').first();
    const industryExp = page.locator('text="Industry Experience"').first();
    const clientsSay = page.locator('text="What Clients Say"').first();

    // Capture the area containing these sections
    if (await trustedPartners.isVisible()) {
      await trustedPartners.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      // Get the parent container that likely contains all three sections
      const container = trustedPartners.locator('..').locator('..').locator('..').locator('..');
      await container.screenshot({
        path: 'issue-4-spacing-sections.png'
      });

      console.log('✓ Trusted Partners/Industry Experience/What Clients Say spacing captured');
    } else {
      console.log('! Trusted Partners section not found');
    }
  });

  test('Issue 5: Redundant "Client Success Stories" header', async ({ page }) => {
    // Look for "Client Success Stories" headers
    const successStoriesHeaders = page.locator('text="Client Success Stories"');
    const count = await successStoriesHeaders.count();

    if (count > 0) {
      console.log(`Found ${count} "Client Success Stories" headers`);

      for (let i = 0; i < count; i++) {
        const header = successStoriesHeaders.nth(i);
        await header.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const parentSection = header.locator('..').locator('..').locator('..');
        await parentSection.screenshot({
          path: `issue-5-redundant-header-${i + 1}.png`
        });
      }

      console.log('✓ Client Success Stories headers captured');
    } else {
      console.log('! Client Success Stories headers not found');
    }
  });

  test('Issue 6: Broken testimonials section', async ({ page }) => {
    // Look for testimonials section
    const testimonialsSection = page.locator('[data-testid="testimonials"], .testimonials, text="testimonial"').first();

    if (await testimonialsSection.isVisible()) {
      await testimonialsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const parentSection = testimonialsSection.locator('..').locator('..').locator('..');
      await parentSection.screenshot({
        path: 'issue-6-broken-testimonials.png'
      });

      console.log('✓ Broken testimonials section captured');
    } else {
      // Alternative search for testimonials
      const altTestimonials = page.locator('text*="testimonial"').first();
      if (await altTestimonials.isVisible()) {
        await altTestimonials.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const parentSection = altTestimonials.locator('..').locator('..').locator('..');
        await parentSection.screenshot({
          path: 'issue-6-broken-testimonials-alt.png'
        });

        console.log('✓ Testimonials section captured (alternative)');
      } else {
        console.log('! Testimonials section not found');
      }
    }
  });

  test('Issue 7: AI Providers & Tech Stack section', async ({ page }) => {
    // Look for AI Providers & Tech Stack section
    const aiProvidersSection = page.locator('text="AI Providers"').first();
    const techStackSection = page.locator('text="Tech Stack"').first();

    if (await aiProvidersSection.isVisible()) {
      await aiProvidersSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const parentSection = aiProvidersSection.locator('..').locator('..').locator('..');
      await parentSection.screenshot({
        path: 'issue-7-ai-providers-tech-stack.png'
      });

      console.log('✓ AI Providers & Tech Stack section captured');
    } else if (await techStackSection.isVisible()) {
      await techStackSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);

      const parentSection = techStackSection.locator('..').locator('..').locator('..');
      await parentSection.screenshot({
        path: 'issue-7-tech-stack-alt.png'
      });

      console.log('✓ Tech Stack section captured (alternative)');
    } else {
      console.log('! AI Providers & Tech Stack section not found');
    }
  });

  test('Additional issue detection', async ({ page }) => {
    // Look for common visual issues
    const issues = [];

    // Check for empty sections
    const emptySections = page.locator('section:empty, div:empty').first();
    if (await emptySections.isVisible()) {
      issues.push('Empty sections detected');
    }

    // Check for overlapping content
    const overflowHidden = page.locator('[style*="overflow: hidden"]');
    if (await overflowHidden.count() > 0) {
      issues.push('Potential overflow issues detected');
    }

    // Check for missing images
    const brokenImages = page.locator('img[alt=""]');
    if (await brokenImages.count() > 0) {
      issues.push('Images with missing alt text detected');
    }

    console.log('Additional issues detected:', issues);
  });
});

test.describe('Navigation and Interactive Elements', () => {
  test('Check theme toggle functionality', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Find theme toggle
    const themeToggle = page.locator('[data-testid="theme-toggle"], button[aria-label*="theme"], button[aria-label*="Theme"]').first();

    if (await themeToggle.isVisible()) {
      // Take before screenshot
      await page.screenshot({
        path: 'theme-toggle-before.png',
        fullPage: false
      });

      // Click toggle
      await themeToggle.click();
      await page.waitForTimeout(1000);

      // Take after screenshot
      await page.screenshot({
        path: 'theme-toggle-after.png',
        fullPage: false
      });

      console.log('✓ Theme toggle functionality captured');
    } else {
      console.log('! Theme toggle not found');
    }
  });

  test('Check navigation responsiveness', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'navigation-mobile.png',
      fullPage: false
    });

    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'navigation-desktop.png',
      fullPage: false
    });

    console.log('✓ Navigation responsiveness captured');
  });
});