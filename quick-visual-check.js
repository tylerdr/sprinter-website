const { chromium } = require('playwright');

async function captureVisualIssues() {
  console.log('Starting visual issues capture...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to homepage...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });

    console.log('Waiting for page to load...');
    await page.waitForTimeout(3000);

    // 1. Full page screenshot - light mode
    console.log('Taking full page screenshot (light mode)...');
    await page.screenshot({
      path: 'homepage-full-light.png',
      fullPage: true
    });

    // 2. Check for theme toggle and switch to dark mode
    console.log('Looking for theme toggle...');
    const themeToggle = page.locator('button[aria-label*="theme"], button[aria-label*="Theme"], [data-testid="theme-toggle"]').first();

    if (await themeToggle.isVisible()) {
      console.log('Clicking theme toggle...');
      await themeToggle.click();
      await page.waitForTimeout(2000);

      // Full page screenshot - dark mode
      console.log('Taking full page screenshot (dark mode)...');
      await page.screenshot({
        path: 'homepage-full-dark.png',
        fullPage: true
      });
    } else {
      console.log('Theme toggle not found');
    }

    // 3. Look for bento area with bg-black
    console.log('Looking for bento area with bg-black...');
    const bentoElements = await page.locator('.bg-black, [class*="bg-black"]').all();

    for (let i = 0; i < Math.min(bentoElements.length, 3); i++) {
      const element = bentoElements[i];
      if (await element.isVisible()) {
        await element.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        await element.screenshot({
          path: `bento-bg-black-${i + 1}.png`
        });

        console.log(`Captured bento element ${i + 1}`);
      }
    }

    // 4. Look for specific sections mentioned
    const sectionsToCapture = [
      { text: 'Timeline', filename: 'timeline-section.png' },
      { text: 'Until Proven Results', filename: 'until-proven-results.png' },
      { text: 'Trusted Partners', filename: 'trusted-partners.png' },
      { text: 'Client Success Stories', filename: 'client-success-stories.png' },
      { text: 'AI Providers', filename: 'ai-providers.png' },
      { text: 'Tech Stack', filename: 'tech-stack.png' }
    ];

    for (const section of sectionsToCapture) {
      console.log(`Looking for "${section.text}" section...`);
      const sectionElement = page.locator(`text="${section.text}"`).first();

      if (await sectionElement.isVisible()) {
        await sectionElement.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Get the parent container for better context
        const parentContainer = sectionElement.locator('..').locator('..').locator('..');

        await parentContainer.screenshot({
          path: section.filename
        });

        console.log(`✓ Captured ${section.text} section`);
      } else {
        console.log(`! ${section.text} section not found`);
      }
    }

    // 5. Check for testimonials
    console.log('Looking for testimonials...');
    const testimonialSelectors = [
      '[data-testid="testimonials"]',
      '.testimonials',
      'text*="testimonial"',
      'text*="review"',
      'text*="feedback"'
    ];

    for (const selector of testimonialSelectors) {
      const testimonialsElement = page.locator(selector).first();
      if (await testimonialsElement.isVisible()) {
        await testimonialsElement.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        const parentContainer = testimonialsElement.locator('..').locator('..').locator('..');
        await parentContainer.screenshot({
          path: 'testimonials-section.png'
        });

        console.log('✓ Captured testimonials section');
        break;
      }
    }

    // 6. Navigation screenshots at different viewports
    console.log('Capturing navigation at different viewports...');

    // Desktop navigation
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.locator('nav').first().screenshot({
      path: 'navigation-desktop.png'
    });

    // Mobile navigation
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.locator('nav, header').first().screenshot({
      path: 'navigation-mobile.png'
    });

    console.log('✓ All screenshots captured successfully!');

  } catch (error) {
    console.error('Error during capture:', error);
  } finally {
    await browser.close();
  }
}

captureVisualIssues();