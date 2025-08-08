import { test, expect } from '@playwright/test';

test.describe('Case Studies', () => {
  test('should display case studies list', async ({ page }) => {
    await page.goto('/case-studies');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Real Results');
    
    // Check multiple case studies are displayed
    const caseStudies = page.locator('article');
    await expect(caseStudies).toHaveCount(7);
    
    // Check case study cards have required elements
    const firstCard = caseStudies.first();
    await expect(firstCard.locator('h3')).toBeVisible();
    await expect(firstCard.locator('text=Challenge')).toBeVisible();
    await expect(firstCard.locator('text=Solution')).toBeVisible();
    await expect(firstCard.locator('text=Results')).toBeVisible();
  });

  test('should navigate to individual case study', async ({ page }) => {
    await page.goto('/case-studies');
    
    // Click on MortgageQ case study
    await page.click('text=MortgageQ');
    
    // Check individual case study page loads
    await expect(page).toHaveURL(/\/case-studies\/.+/);
    await expect(page.locator('h1')).toContainText('MortgageQ');
    
    // Check testimonial wording is fixed
    await expect(page.locator('text=closing loans 300% faster')).toBeVisible();
    expect(await page.locator('text=closing time increase').count()).toBe(0);
    
    // Check CTA section at bottom
    await expect(page.locator('text=Ready to achieve similar results?')).toBeVisible();
    await expect(page.locator('text=Schedule a Strategy Call')).toBeVisible();
    await expect(page.locator('text=View More Case Studies')).toBeVisible();
  });

  test('should display metrics correctly', async ({ page }) => {
    await page.goto('/case-studies/ai-mortgage-assistant');
    
    // Check results metrics are displayed
    await expect(page.locator('text=95%')).toBeVisible();
    await expect(page.locator('text=300%')).toBeVisible();
    await expect(page.locator('text=50+')).toBeVisible();
    await expect(page.locator('text=$2.4M')).toBeVisible();
    
    // Check metrics have labels
    await expect(page.locator('text=Faster loan closings')).toBeVisible();
  });
});