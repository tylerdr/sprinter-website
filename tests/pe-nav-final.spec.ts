import { test, expect } from '@playwright/test';

test.describe('PE Navigation Testing', () => {
  test('capture all dropdown menus', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(3000);
    
    // Homepage screenshot
    await page.screenshot({ path: 'test-results/homepage-with-navigation.png', fullPage: false });
    
    // Test Solutions dropdown using simpler selector
    const solutionsButton = page.locator('button').filter({ hasText: 'Solutions' }).first();
    await solutionsButton.hover();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/solutions-mega-menu.png', fullPage: false });
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);
    
    // Test PE Tools dropdown
    const peToolsButton = page.locator('button').filter({ hasText: 'PE Tools' }).first();
    await peToolsButton.hover();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/pe-tools-mega-menu.png', fullPage: false });
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);
    
    // Test AI Labs dropdown
    const aiLabsButton = page.locator('button').filter({ hasText: 'AI Labs' }).first();
    await aiLabsButton.hover();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/ai-labs-mega-menu.png', fullPage: false });
    
    // Move mouse away
    await page.mouse.move(0, 0);
    await page.waitForTimeout(500);
    
    // Test Resources dropdown
    const resourcesButton = page.locator('button').filter({ hasText: 'Resources' }).first();
    await resourcesButton.hover();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: 'test-results/resources-mega-menu.png', fullPage: false });
    
    console.log('All dropdown menus captured successfully');
  });

  test('test mobile view at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ path: 'test-results/mobile-navigation-closed.png', fullPage: false });
    
    // Find and click the mobile menu button
    const menuButton = page.locator('button').filter({ hasText: /open|menu/i }).or(
      page.locator('button[aria-label*="menu"]')
    );
    
    await menuButton.click();
    await page.waitForTimeout(1000);
    
    await page.screenshot({ path: 'test-results/mobile-navigation-open.png', fullPage: false });
    
    console.log('Mobile navigation captured successfully');
  });
  
  test('verify navigation links work', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Test CTA button
    const ctaButton = page.locator('text=Start Free Assessment').first();
    await ctaButton.click();
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveURL('/ai-assessment');
    await page.screenshot({ path: 'test-results/cta-destination.png', fullPage: false });
    
    console.log('Navigation links verified successfully');
  });
});