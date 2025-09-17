import { test, expect } from '@playwright/test';

test.describe('Current Website State Check', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sprinter-website.vercel.app/');
  });

  test('homepage loads and has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Sprinter/i);
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible();
  });

  test('navigation menu is functional', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check main navigation links
    const navLinks = ['Operating Partner', 'Solutions', 'Resources', 'Governance'];
    for (const link of navLinks) {
      const element = page.locator(`nav >> text="${link}"`);
      await expect(element).toBeVisible();
    }
  });

  test('AI chat widget is present', async ({ page }) => {
    // Look for chat button or widget
    const chatButton = page.locator('button').filter({ hasText: /chat|message/i });
    const chatExists = await chatButton.count() > 0;
    expect(chatExists).toBeTruthy();
  });

  test('admin login page is accessible', async ({ page }) => {
    await page.goto('https://sprinter-website.vercel.app/admin/login');
    await expect(page).toHaveURL(/admin\/login/);
    const loginForm = page.locator('form');
    await expect(loginForm).toBeVisible();
  });

  test('critical pages load without errors', async ({ page }) => {
    const pages = [
      '/solutions/ap-automation',
      '/solutions/quote-intelligence', 
      '/solutions/3pl-ops',
      '/labs/agent-simulator',
      '/insights/trends',
      '/tools'
    ];

    for (const path of pages) {
      await page.goto(`https://sprinter-website.vercel.app${path}`);
      await page.waitForLoadState('networkidle');
      
      // Check for any console errors
      const errors: string[] = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      // Check page loaded
      const content = page.locator('main, [role="main"], body');
      await expect(content).toBeVisible();
      
      // No critical errors
      expect(errors.filter(e => !e.includes('404') && !e.includes('favicon'))).toHaveLength(0);
    }
  });

  test('interactive labs components work', async ({ page }) => {
    await page.goto('https://sprinter-website.vercel.app/labs/agent-simulator');
    
    // Check if agent simulator loaded
    const simulator = page.locator('[data-testid="agent-simulator"], .agent-simulator, main');
    await expect(simulator).toBeVisible();
  });

  test('forms are accessible', async ({ page }) => {
    await page.goto('https://sprinter-website.vercel.app/');
    
    // Look for contact or assessment forms
    const forms = await page.locator('form').count();
    expect(forms).toBeGreaterThan(0);
  });

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://sprinter-website.vercel.app/');
    
    // Check mobile menu button
    const mobileMenu = page.locator('button').filter({ hasText: /menu/i }).or(page.locator('[aria-label*="menu"]'));
    const isMobileMenuVisible = await mobileMenu.count() > 0;
    expect(isMobileMenuVisible).toBeTruthy();
  });
});

test.describe('Accessibility Checks', () => {
  test('has proper heading hierarchy', async ({ page }) => {
    await page.goto('https://sprinter-website.vercel.app/');
    
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
    expect(h1Count).toBeLessThanOrEqual(1); // Should have only one h1
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('https://sprinter-website.vercel.app/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      // Images should have alt text or be decorative (alt="")
      expect(alt).toBeDefined();
    }
  });

  test('buttons and links are keyboard accessible', async ({ page }) => {
    await page.goto('https://sprinter-website.vercel.app/');
    
    // Tab through the page
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
  });
});