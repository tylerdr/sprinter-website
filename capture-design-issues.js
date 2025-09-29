const { chromium } = require('playwright');
const fs = require('fs').promises;

(async () => {
  const browser = await chromium.launch({ headless: true });

  try {
    // Create screenshots directory
    await fs.mkdir('design-review-screenshots', { recursive: true });

    // Desktop viewport
    const desktopPage = await browser.newPage();
    await desktopPage.setViewportSize({ width: 1920, height: 1080 });

    console.log('Capturing homepage...');
    await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(2000);

    // Full page screenshot
    await desktopPage.screenshot({
      path: 'design-review-screenshots/homepage-full.png',
      fullPage: true
    });

    // Scroll to find bento/testimonials sections
    console.log('Looking for AI Capabilities section...');
    await desktopPage.evaluate(() => {
      const element = document.querySelector('h2');
      const sections = Array.from(document.querySelectorAll('section'));
      for (const section of sections) {
        if (section.textContent.includes('AI Capabilities') ||
            section.textContent.includes('What We Can Build')) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    await desktopPage.waitForTimeout(1500);
    await desktopPage.screenshot({
      path: 'design-review-screenshots/ai-capabilities.png',
      fullPage: false
    });

    // Look for testimonials
    console.log('Looking for testimonials...');
    await desktopPage.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      for (const section of sections) {
        if (section.textContent.includes('portfolio') ||
            section.textContent.includes('testimonial') ||
            section.textContent.includes('What Our')) {
          section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
    await desktopPage.waitForTimeout(1500);
    await desktopPage.screenshot({
      path: 'design-review-screenshots/testimonials.png',
      fullPage: false
    });

    // Mobile viewport
    const mobilePage = await browser.newPage();
    await mobilePage.setViewportSize({ width: 375, height: 812 }); // iPhone X

    console.log('Capturing mobile homepage...');
    await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(2000);
    await mobilePage.screenshot({
      path: 'design-review-screenshots/mobile-homepage.png',
      fullPage: false
    });

    // Tablet viewport
    const tabletPage = await browser.newPage();
    await tabletPage.setViewportSize({ width: 768, height: 1024 }); // iPad

    console.log('Capturing tablet homepage...');
    await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await tabletPage.waitForTimeout(2000);
    await tabletPage.screenshot({
      path: 'design-review-screenshots/tablet-homepage.png',
      fullPage: false
    });

    // Dark mode test
    console.log('Testing dark mode...');
    await desktopPage.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({
      path: 'design-review-screenshots/dark-mode.png',
      fullPage: false
    });

    // Light mode test
    await desktopPage.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    await desktopPage.waitForTimeout(500);
    await desktopPage.screenshot({
      path: 'design-review-screenshots/light-mode.png',
      fullPage: false
    });

    console.log('Screenshots captured successfully!');

  } catch (error) {
    console.error('Error capturing screenshots:', error);
  } finally {
    await browser.close();
  }
})();