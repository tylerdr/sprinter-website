import { test, expect, devices } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('should be mobile responsive', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check mobile menu exists (hamburger)
    const mobileMenu = page.locator('[aria-label*="menu"], [aria-label*="Menu"], button:has(svg)').first();
    await expect(mobileMenu).toBeVisible();
    
    // Check hero text scales down on mobile
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    
    // Check cards stack vertically on mobile
    const cards = page.locator('.grid > *').first();
    const box = await cards.boundingBox();
    if (box) {
      expect(box.width).toBeLessThan(400); // Cards should be narrow on mobile
    }
    
    await context.close();
  });

  test('should be tablet responsive', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();
    
    await page.goto('/services');
    
    // Check services cards layout
    const serviceCards = page.locator('.grid').first();
    await expect(serviceCards).toBeVisible();
    
    // Check CTA buttons are still accessible
    const ctaButton = page.locator('text=Book Workshop');
    await expect(ctaButton).toBeVisible();
    
    await context.close();
  });

  test('should handle landscape orientation', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 812, height: 375 }, // iPhone X landscape
    });
    const page = await context.newPage();
    
    await page.goto('/');
    
    // Check content is still visible and not cut off
    const hero = page.locator('h1');
    await expect(hero).toBeVisible();
    await expect(hero).toBeInViewport();
    
    await context.close();
  });

  test('should have touch-friendly buttons', async ({ browser }) => {
    const context = await browser.newContext({
      ...devices['iPhone 12'],
    });
    const page = await context.newPage();
    
    await page.goto('/contact');
    
    // Check button sizes are touch-friendly (min 44px)
    const submitButton = page.locator('button:has-text("Send Message")');
    const box = await submitButton.boundingBox();
    if (box) {
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
    
    await context.close();
  });
});