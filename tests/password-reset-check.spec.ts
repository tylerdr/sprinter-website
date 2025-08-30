import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://sprinter-website.vercel.app';
test.use({ baseURL: PRODUCTION_URL });

test.describe('Password Reset Flow Check', () => {
  test('detailed password reset investigation', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Get all links on the signin page
    const allLinks = page.locator('a');
    const linkCount = await allLinks.count();
    console.log(`Total links on signin page: ${linkCount}`);
    
    const linkDetails: Array<{text: string, href: string}> = [];
    for (let i = 0; i < linkCount; i++) {
      const link = allLinks.nth(i);
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      if (text && href) {
        linkDetails.push({ text: text.trim(), href });
      }
    }
    
    console.log('All links on signin page:');
    linkDetails.forEach(link => {
      console.log(`  "${link.text}" -> ${link.href}`);
    });
    
    // Look for forgot/reset password links
    const forgotLinks = linkDetails.filter(link => 
      link.text.toLowerCase().includes('forgot') || 
      link.text.toLowerCase().includes('reset') ||
      link.href.includes('reset')
    );
    
    console.log(`Forgot/reset password links found: ${forgotLinks.length}`);
    forgotLinks.forEach(link => {
      console.log(`  "${link.text}" -> ${link.href}`);
    });
    
    // Try to find the link by href pattern
    const resetLink = page.locator('a[href*="reset"]');
    const resetLinkCount = await resetLink.count();
    console.log(`Links with "reset" in href: ${resetLinkCount}`);
    
    if (resetLinkCount > 0) {
      await resetLink.first().click();
      await page.waitForURL('**/reset**', { timeout: 5000 });
      console.log('✓ Successfully navigated to reset page');
      
      const currentUrl = page.url();
      console.log(`Current URL after click: ${currentUrl}`);
      
      // Check what's on the reset page
      const title = await page.title();
      console.log(`Reset page title: ${title}`);
      
      const inputs = page.locator('input');
      const inputCount = await inputs.count();
      console.log(`Inputs on reset page: ${inputCount}`);
      
    } else {
      // Try to navigate directly to see if the page exists
      await page.goto('/auth/reset-password');
      const title = await page.title();
      console.log(`Direct navigation to reset page title: ${title}`);
      
      // Check if we get a 404 or if the page loads
      const notFoundIndicators = page.locator(':has-text("404"), :has-text("Not Found"), :has-text("Page not found")');
      const notFoundCount = await notFoundIndicators.count();
      
      if (notFoundCount > 0) {
        console.log('⚠ Reset password page returns 404');
      } else {
        console.log('✓ Reset password page exists when accessed directly');
        
        const inputs = page.locator('input');
        const inputCount = await inputs.count();
        console.log(`Inputs on reset page: ${inputCount}`);
      }
    }
  });

  test('check if reset link is in page source but hidden', async ({ page }) => {
    await page.goto('/auth/signin');
    
    const pageSource = await page.content();
    
    // Search for reset/forgot patterns in source
    const hasResetHref = pageSource.includes('reset-password');
    const hasForgotText = pageSource.toLowerCase().includes('forgot');
    const hasResetText = pageSource.toLowerCase().includes('reset');
    
    console.log('Reset password patterns in source:');
    console.log(`  Has reset-password href: ${hasResetHref}`);
    console.log(`  Has "forgot" text: ${hasForgotText}`);
    console.log(`  Has "reset" text: ${hasResetText}`);
    
    if (hasResetHref || hasForgotText || hasResetText) {
      console.log('✓ Reset password functionality exists in source');
    } else {
      console.log('⚠ No reset password functionality found in source');
    }
  });
});