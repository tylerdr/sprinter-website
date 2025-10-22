import { test, expect } from '@playwright/test';

test.describe('Homepage Visual Validation', () => {
  test('Homepage - Light Mode', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    
    // Ensure light mode
    await page.evaluate(() => {
      document.documentElement.classList.remove('dark');
    });
    
    await page.waitForTimeout(1000);
    
    // Full page screenshot
    await page.screenshot({ 
      path: 'homepage-light-mode-full.png',
      fullPage: true 
    });
    
    console.log('✅ Light mode screenshot saved');
  });

  test('Homepage - Dark Mode', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    
    // Ensure dark mode
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    
    await page.waitForTimeout(1000);
    
    // Full page screenshot
    await page.screenshot({ 
      path: 'homepage-dark-mode-full.png',
      fullPage: true 
    });
    
    console.log('✅ Dark mode screenshot saved');
  });

  test('Homepage - Hero Section Analysis', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.waitForLoadState('networkidle');
    
    // Check hero content
    const heroHeadline = await page.locator('h1, [class*="gradient-text"]').first().textContent();
    console.log('Hero headline:', heroHeadline);
    
    // Check CTAs
    const ctas = await page.locator('a[href*="contact"], button').allTextContents();
    console.log('CTAs found:', ctas.slice(0, 5));
    
    // Check trust indicators
    const trustStats = await page.locator('[class*="stat"]').allTextContents();
    console.log('Trust stats:', trustStats.slice(0, 8));
  });
});
