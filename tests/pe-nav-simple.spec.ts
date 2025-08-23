import { test, expect } from '@playwright/test';

test.describe('PE Navigation Screenshots', () => {
  test('capture PE navigation screenshots', async ({ page }) => {
    // Ensure test-results directory exists
    await page.goto('/');
    
    // Wait for navigation to load
    await page.waitForTimeout(2000);
    
    // Take homepage screenshot
    await page.screenshot({ path: 'test-results/pe-navigation-homepage.png', fullPage: false });
    
    // Test Solutions dropdown
    await page.hover('[data-radix-collection-item] button:has-text("Solutions")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/solutions-dropdown.png', fullPage: false });
    
    // Navigate away from dropdown
    await page.click('body', { position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    // Test PE Tools dropdown
    await page.hover('[data-radix-collection-item] button:has-text("PE Tools")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/pe-tools-dropdown.png', fullPage: false });
    
    // Navigate away from dropdown
    await page.click('body', { position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    // Test AI Labs dropdown
    await page.hover('[data-radix-collection-item] button:has-text("AI Labs")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/ai-labs-dropdown.png', fullPage: false });
    
    // Navigate away from dropdown
    await page.click('body', { position: { x: 0, y: 0 } });
    await page.waitForTimeout(500);
    
    // Test Resources dropdown
    await page.hover('[data-radix-collection-item] button:has-text("Resources")');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-results/resources-dropdown.png', fullPage: false });
    
    console.log('Desktop screenshots captured successfully');
  });

  test('capture mobile navigation', async ({ page }) => {
    // Set mobile viewport (iPhone size)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(2000);
    
    // Take mobile homepage screenshot
    await page.screenshot({ path: 'test-results/mobile-homepage.png', fullPage: false });
    
    // Open mobile menu
    await page.click('button[aria-label*="menu"]');
    await page.waitForTimeout(1000);
    
    // Take mobile menu screenshot
    await page.screenshot({ path: 'test-results/mobile-menu-open.png', fullPage: false });
    
    console.log('Mobile screenshots captured successfully');
  });

  test('test navigation functionality', async ({ page }) => {
    await page.goto('/');
    
    // Test Solutions dropdown navigation
    await page.hover('[data-radix-collection-item] button:has-text("Solutions")');
    await page.waitForTimeout(1000);
    await page.click('text=Portfolio AI Assessment');
    
    // Check we navigated correctly
    await expect(page).toHaveURL('/ai-assessment');
    await page.screenshot({ path: 'test-results/ai-assessment-page.png', fullPage: false });
    
    // Go back and test PE Tools
    await page.goto('/');
    await page.hover('[data-radix-collection-item] button:has-text("PE Tools")');
    await page.waitForTimeout(1000);
    await page.click('text=PE Tycoon');
    
    // Check we navigated correctly
    await expect(page).toHaveURL('/labs/pe-tycoon');
    await page.screenshot({ path: 'test-results/pe-tycoon-page.png', fullPage: false });
    
    console.log('Navigation functionality tested successfully');
  });
});