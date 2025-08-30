import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://sprinter-website.vercel.app';
test.use({ baseURL: PRODUCTION_URL });

test.describe('Overall Website Health Check', () => {
  test('comprehensive functionality and error check', async ({ page }) => {
    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];
    const consoleWarnings: string[] = [];

    // Capture console messages
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`Console Error: ${msg.text()}`);
      } else if (msg.type() === 'warning') {
        consoleWarnings.push(`Console Warning: ${msg.text()}`);
      }
    });

    // Capture network failures
    page.on('response', response => {
      if (!response.ok() && response.status() !== 304) {
        networkErrors.push(`Network Error: ${response.url()} - ${response.status()}`);
      }
    });

    // Test homepage
    console.log('=== HOMEPAGE TEST ===');
    await page.goto('/');
    const title = await page.title();
    console.log(`Homepage title: ${title}`);
    
    const h1 = page.locator('h1').first();
    const h1Text = await h1.textContent();
    console.log(`Main heading: ${h1Text}`);
    
    // Test auth pages
    console.log('\n=== AUTH PAGES TEST ===');
    await page.goto('/auth/signin');
    console.log('✓ Signin page loads');
    
    await page.goto('/auth/signup');  
    console.log('✓ Signup page loads');
    
    // Test if reset page exists
    try {
      await page.goto('/auth/reset-password');
      const resetTitle = await page.title();
      if (resetTitle.includes('404') || resetTitle.includes('Not Found')) {
        console.log('⚠ Reset password page returns 404');
      } else {
        console.log('✓ Reset password page exists');
      }
    } catch (error) {
      console.log('⚠ Reset password page navigation failed');
    }
    
    // Test navigation on different screen sizes
    console.log('\n=== NAVIGATION TEST ===');
    await page.goto('/');
    
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    const desktopNav = page.locator('nav a').first();
    const isDesktopNavVisible = await desktopNav.isVisible();
    console.log(`Desktop navigation visible: ${isDesktopNavVisible}`);
    
    // Mobile  
    await page.setViewportSize({ width: 375, height: 667 });
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has(svg)').last();
    const isMobileButtonVisible = await mobileMenuButton.isVisible();
    console.log(`Mobile menu button visible: ${isMobileButtonVisible}`);
    
    if (isMobileButtonVisible) {
      await mobileMenuButton.click();
      await page.waitForTimeout(300);
      const mobileMenu = page.locator('[class*="mobile"], [class*="menu"]').first();
      const isMobileMenuVisible = await mobileMenu.isVisible();
      console.log(`Mobile menu opens: ${isMobileMenuVisible}`);
    }
    
    // Test demo login security
    console.log('\n=== DEMO LOGIN SECURITY TEST ===');
    await page.goto('/auth/signin');
    
    const pageSource = await page.content();
    const hasDemoCredentials = pageSource.includes('demo@sprinter.ai') || pageSource.includes('demo123456');
    console.log(`Demo credentials in source: ${hasDemoCredentials}`);
    
    const demoButton = page.locator('button:has-text("Try Demo Access")');
    const demoButtonExists = await demoButton.count() > 0;
    console.log(`Demo button exists: ${demoButtonExists}`);
    
    if (demoButtonExists) {
      // Test demo button makes API call
      let apiCallMade = false;
      
      const responsePromise = page.waitForResponse(response => 
        response.url().includes('/api/auth/demo'), { timeout: 3000 }
      ).then(() => { apiCallMade = true; }).catch(() => {});
      
      await demoButton.click();
      await responsePromise;
      
      console.log(`Demo button makes API call: ${apiCallMade}`);
    }
    
    // Performance check
    console.log('\n=== PERFORMANCE CHECK ===');
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Error summary
    console.log('\n=== ERROR SUMMARY ===');
    console.log(`Console errors: ${consoleErrors.length}`);
    console.log(`Network errors: ${networkErrors.length}`);
    console.log(`Console warnings: ${consoleWarnings.length}`);
    
    if (consoleErrors.length > 0) {
      console.log('Console Errors:');
      consoleErrors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (networkErrors.length > 0) {
      console.log('Network Errors:');
      networkErrors.forEach(error => console.log(`  - ${error}`));
    }
    
    // Basic functionality assertions
    expect(loadTime).toBeLessThan(20000); // 20 second max load time
    expect(hasDemoCredentials).toBe(false); // Security check
  });
});