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
    await expect(page.locator('text=Work With Us')).toBeVisible();
    await expect(page.locator('text=Explore AI Labs')).toBeVisible();
  });

  test('should display human-centered section', async ({ page }) => {
    await page.goto('/');
    
    // Check human-centered section exists
    const humanSection = page.locator('section, div').filter({ has: page.locator('text=/Human|People|Purpose/')});
    await expect(humanSection.first()).toBeVisible();
  });

  test('should display recent wins', async ({ page }) => {
    await page.goto('/');
    
    // Check recent wins section - look for heading or section
    const recentWinsHeading = page.locator('h2, h3').filter({ hasText: /Recent|Wins|Results/ });
    await expect(recentWinsHeading.first()).toBeVisible();
    
    // Check at least one win card
    const winCards = page.locator('[data-testid="win-card"], article, .rounded-xl').filter({ hasText: /AI|system|deployed/ });
    const count = await winCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display services preview', async ({ page }) => {
    await page.goto('/');
    
    // Check services section - look for heading
    const servicesHeading = page.locator('h2, h3').filter({ hasText: /How We Help|Services|Solutions/ });
    await expect(servicesHeading.first()).toBeVisible();
    
    // Check service cards
    await expect(page.locator('text=Discovery Workshop')).toBeVisible();
    await expect(page.locator('text=AI Sprint')).toBeVisible();
    await expect(page.locator('text=Transformation')).toBeVisible();
  });

  test('should display interactive demo', async ({ page }) => {
    await page.goto('/');
    
    // Check interactive demo section - look for heading
    const demoHeading = page.locator('h2, h3').filter({ hasText: /AI in Action|Demo|Try/ });
    await expect(demoHeading.first()).toBeVisible();
    
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
    
    // Check metrics are displayed - look for metric section
    const metricsSection = page.locator('section, div').filter({ has: page.locator('text=/\$\d+M|\d+K\+|\d+\+/')});
    await expect(metricsSection.first()).toBeVisible();
    
    // Check for key metric text
    await expect(page.locator('text=/Revenue|Hours|Jobs|People/')).toBeVisible();
  });
});