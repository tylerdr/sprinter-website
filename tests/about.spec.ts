import { test, expect } from '@playwright/test';

test.describe('About', () => {
  test('should display company information', async ({ page }) => {
    await page.goto('/about');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('AI That Helps People');
    
    // Check founder note exists
    await expect(page.locator('text=A Note from Our Founder')).toBeVisible();
    
    // Check founder signature was added
    await expect(page.locator('text=— Alex Chen')).toBeVisible();
    await expect(page.locator('text=Founder & CEO, Sprinter AI')).toBeVisible();
    
    // Check philosophy statement
    await expect(page.locator('text=Our philosophy: Build technology that helps people')).toBeVisible();
  });

  test('should display outdated industries messaging', async ({ page }) => {
    await page.goto('/about');
    
    // Check new industries messaging was added
    await expect(page.locator('text=overlooked by Silicon Valley')).toBeVisible();
    await expect(page.locator('text=manufacturing, healthcare, traditional finance, construction')).toBeVisible();
    await expect(page.locator('text=untapped potential')).toBeVisible();
    await expect(page.locator('text=leapfrog straight to cutting-edge automation')).toBeVisible();
  });

  test('should display values', async ({ page }) => {
    await page.goto('/about');
    
    // Check values section
    await expect(page.locator('text=Our Values')).toBeVisible();
    
    // Check specific values
    await expect(page.locator('text=Move at the Pace of AI')).toBeVisible();
    await expect(page.locator('text=Human-Centered Design')).toBeVisible();
    await expect(page.locator('text=Create Abundance')).toBeVisible();
    await expect(page.locator('text=Purposeful Innovation')).toBeVisible();
  });

  test('should display timeline', async ({ page }) => {
    await page.goto('/about');
    
    // Check timeline section
    await expect(page.locator('text=Our Journey')).toBeVisible();
    
    // Check timeline events
    await expect(page.locator('text=2018')).toBeVisible();
    await expect(page.locator('text=2019')).toBeVisible();
    await expect(page.locator('text=2020')).toBeVisible();
    await expect(page.locator('text=2021')).toBeVisible();
    await expect(page.locator('text=2023')).toBeVisible();
    await expect(page.locator('text=2024')).toBeVisible();
  });

  test('should display metrics', async ({ page }) => {
    await page.goto('/about');
    
    // Check metrics
    await expect(page.locator('text=$10M+')).toBeVisible();
    await expect(page.locator('text=Client Revenue Generated')).toBeVisible();
    
    await expect(page.locator('text=50+')).toBeVisible();
    await expect(page.locator('text=AI Products Deployed')).toBeVisible();
    
    await expect(page.locator('text=100%')).toBeVisible();
    await expect(page.locator('text=Client Satisfaction')).toBeVisible();
  });

  test('should have working CTAs', async ({ page }) => {
    await page.goto('/about');
    
    // Check CTA section
    await expect(page.locator('text=Ready to Build AI That Empowers People?')).toBeVisible();
    
    // Click Start Your Journey
    await page.click('text=Start Your Journey');
    
    // Should navigate to contact
    await expect(page).toHaveURL('/contact');
  });
});