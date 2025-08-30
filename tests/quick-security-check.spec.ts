import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://sprinter-website.vercel.app';
test.use({ baseURL: PRODUCTION_URL });

test.describe('Quick Security & Navigation Check', () => {
  test('demo credentials security check', async ({ page }) => {
    await page.goto('/auth/signin');
    
    const pageContent = await page.content();
    const hasDemoEmail = pageContent.includes('demo@sprinter.ai');
    const hasDemoPassword = pageContent.includes('demo123456');
    
    console.log('Demo email in source:', hasDemoEmail);
    console.log('Demo password in source:', hasDemoPassword);
    
    expect(hasDemoEmail).toBe(false);
    expect(hasDemoPassword).toBe(false);
    
    const demoButton = page.locator('button:has-text("Try Demo Access")');
    await expect(demoButton).toBeVisible();
    console.log('✓ Demo button found');
  });

  test('password reset link check', async ({ page }) => {
    await page.goto('/auth/signin');
    
    const forgotLink = page.locator('a[href*="reset"], a:has-text("Forgot")');
    const linkCount = await forgotLink.count();
    console.log('Forgot password links found:', linkCount);
    
    if (linkCount > 0) {
      await forgotLink.first().click();
      await page.waitForURL('**/reset-password**', { timeout: 5000 });
      console.log('✓ Reset password navigation works');
    }
  });

  test('mobile navigation check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const menuButton = page.locator('button[aria-label*="menu"], button:has(svg)').last();
    if (await menuButton.count() > 0) {
      await menuButton.click();
      await page.waitForTimeout(500);
      console.log('✓ Mobile menu clicked');
      
      const menuVisible = page.locator('[class*="menu"], nav').first();
      if (await menuVisible.isVisible()) {
        console.log('✓ Mobile menu opened');
      }
    }
  });

  test('signup flow check', async ({ page }) => {
    await page.goto('/auth/signin');
    
    const signupLink = page.locator('a:has-text("Sign up")');
    if (await signupLink.count() > 0) {
      await signupLink.click();
      await expect(page).toHaveURL(/.*signup.*/);
      console.log('✓ Signup navigation works');
    }
  });
});