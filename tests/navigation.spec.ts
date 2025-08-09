import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through main pages', async ({ page }) => {
    await page.goto('/');
    
    // Check homepage loads
    await expect(page).toHaveTitle(/Sprinter AI/);
    await expect(page.locator('h1')).toContainText('Build at the pace of AI');
    
    // Navigate to About
    await page.click('text=About');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('h1')).toContainText('AI That Helps People');
    
    // Navigate to Services
    await page.click('text=Services');
    await expect(page).toHaveURL('/services');
    await expect(page.locator('h1')).toContainText('Choose Your AI Journey');
    
    // Navigate to Case Studies
    await page.click('text=Case Studies');
    await expect(page).toHaveURL('/case-studies');
    await expect(page.locator('h1')).toContainText('Case Studies');
    
    // Navigate to AI Labs
    await page.click('text=AI Labs');
    await expect(page).toHaveURL('/labs');
    await expect(page.locator('h1')).toContainText('AI Labs');
    
    // Navigate to Blog
    await page.click('text=Insights');
    await expect(page).toHaveURL('/blog');
    await expect(page.locator('h1')).toContainText('AI Insights');
    
    // Navigate to Contact
    await page.click('text=Work With Us');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('h1')).toContainText('Work With Us');
  });

  test('should handle 404 page', async ({ page }) => {
    await page.goto('/non-existent-page');
    await expect(page.locator('h1')).toContainText('404');
    await expect(page.locator('text=Page Not Found')).toBeVisible();
    
    // Check navigation back to home works
    await page.click('text=Back to Homepage');
    await expect(page).toHaveURL('/');
  });

  test('footer links should work', async ({ page }) => {
    await page.goto('/');
    
    // Check Privacy Policy
    await page.click('footer >> text=Privacy Policy');
    await expect(page).toHaveURL('/privacy');
    await expect(page.locator('h1')).toContainText('Privacy Policy');
    
    // Check Terms of Service
    await page.goto('/');
    await page.click('footer >> text=Terms of Service');
    await expect(page).toHaveURL('/terms');
    await expect(page.locator('h1')).toContainText('Terms of Service');
  });

  test('external links should open in new tab', async ({ page, context }) => {
    await page.goto('/');
    
    // Check GitHub link
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('footer >> [aria-label*="GitHub"]')
    ]);
    expect(newPage.url()).toContain('github.com');
    await newPage.close();
  });
});