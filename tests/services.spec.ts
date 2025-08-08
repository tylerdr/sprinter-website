import { test, expect } from '@playwright/test';

test.describe('Services', () => {
  test('should display all service offerings', async ({ page }) => {
    await page.goto('/services');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Choose Your AI Journey');
    
    // Check all 4 services are displayed
    await expect(page.locator('text=AI Discovery Workshop')).toBeVisible();
    await expect(page.locator('text=AI Sprint')).toBeVisible();
    await expect(page.locator('text=Enterprise AI Transformation')).toBeVisible();
    await expect(page.locator('text=Venture Partnership')).toBeVisible();
    
    // Check most popular badge
    await expect(page.locator('text=MOST POPULAR')).toBeVisible();
    
    // Check pricing is displayed
    await expect(page.locator('text=$5,000')).toBeVisible();
    await expect(page.locator('text=$25,000 - $75,000')).toBeVisible();
    await expect(page.locator('text=$150,000+')).toBeVisible();
    await expect(page.locator('text=Equity-based')).toBeVisible();
  });

  test('should display PE-focused section', async ({ page }) => {
    await page.goto('/services');
    
    // Check PE section exists
    await expect(page.locator('text=For Private Equity & Investment Firms')).toBeVisible();
    
    // Check PE-specific messaging
    await expect(page.locator('text=Transform multiple portfolio companies')).toBeVisible();
    await expect(page.locator('text=AI SWAT team')).toBeVisible();
    await expect(page.locator('text=10x')).toBeVisible();
    await expect(page.locator('text=Leverage across portfolio')).toBeVisible();
    
    // Check quote about traditional companies
    await expect(page.locator('text=Traditional companies in your portfolio')).toBeVisible();
    
    // Check PE-specific CTA
    await expect(page.locator('text=Discuss Portfolio Opportunities')).toBeVisible();
  });

  test('should display process steps', async ({ page }) => {
    await page.goto('/services');
    
    // Check process section
    await expect(page.locator('text=Our Process')).toBeVisible();
    
    // Check all 4 steps
    await expect(page.locator('text=Discovery')).toBeVisible();
    await expect(page.locator('text=Prototype')).toBeVisible();
    await expect(page.locator('text=Deploy')).toBeVisible();
    await expect(page.locator('text=Optimize')).toBeVisible();
  });

  test('should display differentiators', async ({ page }) => {
    await page.goto('/services');
    
    // Check differentiators
    await expect(page.locator('text=We Ship, Not Slide')).toBeVisible();
    await expect(page.locator('text=Real Engineers')).toBeVisible();
    await expect(page.locator('text=ROI Focused')).toBeVisible();
  });

  test('should have working CTAs', async ({ page }) => {
    await page.goto('/services');
    
    // Click on a service CTA
    await page.click('text=Book Workshop');
    
    // Should navigate to contact page
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Work With Us');
  });
});