import { test, expect } from '@playwright/test';

test.describe('PE Navigation Testing', () => {
  test('should display PE-focused navigation with dropdown menus', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Take screenshot of homepage with PE navigation
    await page.screenshot({ path: 'test-results/homepage-with-pe-nav.png', fullPage: true });
    
    // Check that PE-specific navigation items exist
    await expect(page.locator('text=Solutions')).toBeVisible();
    await expect(page.locator('text=PE Tools')).toBeVisible();
    await expect(page.locator('text=AI Labs')).toBeVisible();
    await expect(page.locator('text=Resources')).toBeVisible();
    await expect(page.locator('text=Partnership')).toBeVisible();
    
    // Check for CTA button
    await expect(page.locator('text=Start Free Assessment')).toBeVisible();
  });

  test('should show Solutions dropdown menu on hover', async ({ page }) => {
    await page.goto('/');
    
    // Hover over Solutions to trigger dropdown
    await page.hover('text=Solutions');
    await page.waitForTimeout(500); // Wait for animation
    
    // Take screenshot of Solutions dropdown
    await page.screenshot({ path: 'test-results/solutions-dropdown.png', fullPage: true });
    
    // Check Solutions dropdown items are visible
    await expect(page.locator('text=Portfolio AI Assessment')).toBeVisible();
    await expect(page.locator('text=5-Day AI Sprint')).toBeVisible();
    await expect(page.locator('text=AI Partnership')).toBeVisible();
    await expect(page.locator('text=Deal Flow Analyzer')).toBeVisible();
    
    // Check for badges
    await expect(page.locator('text=Free')).toBeVisible();
    await expect(page.locator('text=Popular')).toBeVisible();
    
    // Check bottom CTA in dropdown
    await expect(page.locator('text=Compare All Solutions')).toBeVisible();
  });

  test('should show PE Tools dropdown menu on hover', async ({ page }) => {
    await page.goto('/');
    
    // Hover over PE Tools to trigger dropdown
    await page.hover('text=PE Tools');
    await page.waitForTimeout(500); // Wait for animation
    
    // Take screenshot of PE Tools dropdown
    await page.screenshot({ path: 'test-results/pe-tools-dropdown.png', fullPage: true });
    
    // Check PE Tools dropdown items are visible
    await expect(page.locator('text=PE Tycoon')).toBeVisible();
    await expect(page.locator('text=Deal Flow Analyzer')).toBeVisible();
    await expect(page.locator('text=Portfolio Health Check')).toBeVisible();
    await expect(page.locator('text=Opportunity Audit')).toBeVisible();
    await expect(page.locator('text=Industry Blueprint')).toBeVisible();
    await expect(page.locator('text=PDF Extractor')).toBeVisible();
  });

  test('should show AI Labs dropdown menu on hover', async ({ page }) => {
    await page.goto('/');
    
    // Hover over AI Labs to trigger dropdown
    await page.hover('text=AI Labs');
    await page.waitForTimeout(500); // Wait for animation
    
    // Take screenshot of AI Labs dropdown
    await page.screenshot({ path: 'test-results/ai-labs-dropdown.png', fullPage: true });
    
    // Check AI Labs dropdown items are visible
    await expect(page.locator('text=Agent Battle Arena')).toBeVisible();
    await expect(page.locator('text=Document Intelligence')).toBeVisible();
    await expect(page.locator('text=AI Playbook Generator')).toBeVisible();
    await expect(page.locator('text=Storyboarding Studio')).toBeVisible();
    await expect(page.locator('text=All Labs →')).toBeVisible();
  });

  test('should show Resources dropdown menu on hover', async ({ page }) => {
    await page.goto('/');
    
    // Hover over Resources to trigger dropdown
    await page.hover('text=Resources');
    await page.waitForTimeout(500); // Wait for animation
    
    // Take screenshot of Resources dropdown
    await page.screenshot({ path: 'test-results/resources-dropdown.png', fullPage: true });
    
    // Check Resources dropdown items are visible
    await expect(page.locator('text=Case Studies')).toBeVisible();
    await expect(page.locator('text=Use Cases')).toBeVisible();
    await expect(page.locator('text=Insights')).toBeVisible();
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('should test mobile navigation at 375px width', async ({ page }) => {
    // Set mobile viewport (iPhone size)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Take screenshot of mobile homepage
    await page.screenshot({ path: 'test-results/mobile-homepage.png', fullPage: true });
    
    // Check that desktop navigation is hidden
    await expect(page.locator('.lg\\:flex').first()).toBeHidden();
    
    // Check that mobile menu button is visible
    await expect(page.locator('button[aria-label*="menu"]')).toBeVisible();
    
    // Click mobile menu button
    await page.click('button[aria-label*="menu"]');
    await page.waitForTimeout(300); // Wait for animation
    
    // Take screenshot of opened mobile menu
    await page.screenshot({ path: 'test-results/mobile-menu-open.png', fullPage: true });
    
    // Check mobile menu sections are visible
    await expect(page.locator('text=Solutions').nth(1)).toBeVisible(); // Second instance in mobile menu
    await expect(page.locator('text=PE Tools').nth(1)).toBeVisible(); // Second instance in mobile menu
    
    // Check mobile-specific layout
    await expect(page.locator('text=Portfolio AI Assessment')).toBeVisible();
    await expect(page.locator('text=PE Tycoon')).toBeVisible();
    await expect(page.locator('text=Deal Flow Analyzer')).toBeVisible();
    
    // Check mobile CTA button
    await expect(page.locator('text=Start Free Assessment').nth(1)).toBeVisible(); // Second instance in mobile menu
  });

  test('should navigate to PE Tools pages correctly', async ({ page }) => {
    await page.goto('/');
    
    // Hover over PE Tools and click on PE Tycoon
    await page.hover('text=PE Tools');
    await page.waitForTimeout(500);
    await page.click('text=PE Tycoon');
    
    // Check we navigated to PE Tycoon page
    await expect(page).toHaveURL('/labs/pe-tycoon');
    await page.screenshot({ path: 'test-results/pe-tycoon-page.png', fullPage: true });
    
    // Go back and test another PE tool
    await page.goto('/');
    await page.hover('text=PE Tools');
    await page.waitForTimeout(500);
    await page.click('text=Deal Flow Analyzer');
    
    // Check we navigated to Deal Flow Analyzer
    await expect(page).toHaveURL('/labs/deal-flow-analyzer');
    await page.screenshot({ path: 'test-results/deal-flow-analyzer-page.png', fullPage: true });
  });

  test('should navigate to Solutions pages correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test AI Assessment navigation
    await page.hover('text=Solutions');
    await page.waitForTimeout(500);
    await page.click('text=Portfolio AI Assessment');
    
    await expect(page).toHaveURL('/ai-assessment');
    await page.screenshot({ path: 'test-results/ai-assessment-page.png', fullPage: true });
    
    // Test AI Sprint navigation
    await page.goto('/');
    await page.hover('text=Solutions');
    await page.waitForTimeout(500);
    await page.click('text=5-Day AI Sprint');
    
    await expect(page).toHaveURL('/ai-sprint');
    await page.screenshot({ path: 'test-results/ai-sprint-page.png', fullPage: true });
  });

  test('should test CTA button functionality', async ({ page }) => {
    await page.goto('/');
    
    // Click the main CTA button
    await page.click('text=Start Free Assessment');
    
    // Should navigate to assessment page
    await expect(page).toHaveURL('/ai-assessment');
    await page.screenshot({ path: 'test-results/cta-navigation.png', fullPage: true });
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    await page.goto('/');
    
    // Check ARIA attributes
    const nav = page.locator('nav').first();
    await expect(nav).toHaveAttribute('role', 'navigation');
    
    // Check mobile menu accessibility
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileButton = page.locator('button[aria-label*="menu"]');
    await expect(mobileButton).toHaveAttribute('aria-expanded', 'false');
    
    await mobileButton.click();
    await expect(mobileButton).toHaveAttribute('aria-expanded', 'true');
  });
});