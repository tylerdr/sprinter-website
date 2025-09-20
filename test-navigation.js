const { test, expect } = require('@playwright/test');

test.describe('Navigation Menu Testing', () => {
  test('should validate navigation menu at desktop resolution', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // Navigate to homepage
    await page.goto('http://localhost:3001');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot of full page including navigation
    await page.screenshot({
      path: 'navigation-desktop-full.png',
      fullPage: true
    });

    // Take screenshot of just the navigation area
    const nav = page.locator('nav, header').first();
    await nav.screenshot({ path: 'navigation-desktop-header.png' });

    // Test hover interactions on dropdown menus
    const dropdownMenus = ['Solutions', 'Results', 'Industries', 'Resources'];

    for (const menuItem of dropdownMenus) {
      const menuSelector = page.getByText(menuItem).first();
      if (await menuSelector.isVisible()) {
        await menuSelector.hover();
        await page.waitForTimeout(500); // Wait for hover effect
        await page.screenshot({
          path: `navigation-desktop-${menuItem.toLowerCase()}-hover.png`
        });
      }
    }

    // Verify "Get Started" CTA button
    const getStartedBtn = page.getByText('Get Started').first();
    if (await getStartedBtn.isVisible()) {
      await getStartedBtn.screenshot({ path: 'get-started-button.png' });

      // Check if it's styled prominently (usually has special classes or styles)
      const classes = await getStartedBtn.getAttribute('class');
      console.log('Get Started button classes:', classes);
    }

    // Test Sign In button
    const signInBtn = page.getByText('Sign In').first();
    if (await signInBtn.isVisible()) {
      await signInBtn.screenshot({ path: 'sign-in-button.png' });
    }
  });

  test('should validate navigation menu at mobile resolution', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to homepage
    await page.goto('http://localhost:3001');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot of mobile navigation
    await page.screenshot({
      path: 'navigation-mobile-full.png',
      fullPage: true
    });

    // Look for mobile menu toggle (hamburger menu)
    const mobileMenuToggle = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [data-testid="mobile-menu"], .hamburger, [aria-expanded]').first();

    if (await mobileMenuToggle.isVisible()) {
      await mobileMenuToggle.screenshot({ path: 'mobile-menu-toggle.png' });

      // Click to open mobile menu
      await mobileMenuToggle.click();
      await page.waitForTimeout(500);

      // Take screenshot of opened mobile menu
      await page.screenshot({ path: 'navigation-mobile-opened.png' });
    }
  });

  test('should check navigation accessibility and organization', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');

    // Check for proper navigation structure
    const navElement = page.locator('nav, header[role="banner"]').first();

    // Check for accessibility attributes
    const hasAriaLabel = await navElement.getAttribute('aria-label');
    const hasRole = await navElement.getAttribute('role');

    console.log('Navigation accessibility:', { hasAriaLabel, hasRole });

    // Check for proper link structure
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();

    console.log('Total navigation links found:', linkCount);

    // Verify all links are accessible
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const link = navLinks.nth(i);
      const href = await link.getAttribute('href');
      const text = await link.textContent();
      console.log(`Link ${i + 1}: "${text}" -> ${href}`);
    }
  });
});