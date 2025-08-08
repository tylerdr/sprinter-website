import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check hero content
    await expect(page.locator('h1')).toContainText('Move at the Pace of AI');
    await expect(page.locator('text=We build AI that handles repetitive tasks')).toBeVisible();
    
    // Check established badge
    await expect(page.locator('text=Human-Centered AI Since 2018')).toBeVisible();
    
    // Check hero CTAs
    await expect(page.locator('text=Start a Project')).toBeVisible();
    await expect(page.locator('text=See Our Work')).toBeVisible();
  });

  test('should display human-centered section', async ({ page }) => {
    await page.goto('/');
    
    // Check human-centered messaging
    await expect(page.locator('text=AI Should Work for People')).toBeVisible();
    
    // Check benefits
    await expect(page.locator('text=Jobs Created, Not Lost')).toBeVisible();
    await expect(page.locator('text=Abundance for All')).toBeVisible();
    await expect(page.locator('text=Human-First Design')).toBeVisible();
    await expect(page.locator('text=Purposeful Innovation')).toBeVisible();
  });

  test('should display recent wins', async ({ page }) => {
    await page.goto('/');
    
    // Check recent wins section
    await expect(page.locator('text=Recent Wins')).toBeVisible();
    
    // Check at least one win card
    const winCards = page.locator('[data-testid="win-card"], article, .rounded-xl').filter({ hasText: /AI|system|deployed/ });
    const count = await winCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display services preview', async ({ page }) => {
    await page.goto('/');
    
    // Check services section
    await expect(page.locator('text=How We Help')).toBeVisible();
    
    // Check service cards
    await expect(page.locator('text=Discovery Workshop')).toBeVisible();
    await expect(page.locator('text=AI Sprint')).toBeVisible();
    await expect(page.locator('text=Transformation')).toBeVisible();
  });

  test('should display interactive demo', async ({ page }) => {
    await page.goto('/');
    
    // Check interactive demo section
    await expect(page.locator('text=See AI in Action')).toBeVisible();
    
    // Check demo options
    await expect(page.locator('text=Multi-Agent')).toBeVisible();
    await expect(page.locator('text=Workflow')).toBeVisible();
    await expect(page.locator('text=Computer Vision')).toBeVisible();
  });

  test('should display trust signals with client names', async ({ page }) => {
    await page.goto('/');
    
    // Check trust signals section
    await expect(page.locator('text=Trusted by Industry Leaders')).toBeVisible();
    
    // Check client names are displayed
    await expect(page.locator('text=Vero Capital')).toBeVisible();
    await expect(page.locator('text=Wells Fargo')).toBeVisible();
    await expect(page.locator('text=Accenture')).toBeVisible();
    await expect(page.locator('text=Broadlume')).toBeVisible();
    
    // Check testimonials
    const testimonials = page.locator('text=reduced our loan processing time');
    await expect(testimonials).toBeVisible();
  });

  test('should display company metrics', async ({ page }) => {
    await page.goto('/');
    
    // Check metrics are displayed
    await expect(page.locator('text=$10M+')).toBeVisible();
    await expect(page.locator('text=Revenue Generated')).toBeVisible();
    
    await expect(page.locator('text=100K+')).toBeVisible();
    await expect(page.locator('text=Hours Reclaimed')).toBeVisible();
    
    await expect(page.locator('text=50+')).toBeVisible();
    await expect(page.locator('text=Jobs Created')).toBeVisible();
    
    await expect(page.locator('text=0')).toBeVisible();
    await expect(page.locator('text=People Replaced')).toBeVisible();
  });
});