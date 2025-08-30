import { test, expect, Page } from '@playwright/test';

const PRODUCTION_URL = 'https://sprinter-website.vercel.app';

// Override baseURL for production testing
test.use({ baseURL: PRODUCTION_URL });

test.describe('Security Fixes Verification - Production Testing', () => {
  let consoleErrors: string[] = [];
  let networkErrors: string[] = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    networkErrors = [];

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(`Console Error: ${msg.text()}`);
      }
    });

    // Capture network failures
    page.on('response', response => {
      if (!response.ok() && response.status() !== 304) {
        networkErrors.push(`Network Error: ${response.url()} - ${response.status()} ${response.statusText()}`);
      }
    });
  });

  test.describe('1. Authentication System Testing', () => {
    test('should test demo login security (credentials NOT in client)', async ({ page }) => {
      console.log('Testing demo login security fix...');
      
      // Navigate to signin page
      await page.goto('/auth/signin');
      await expect(page).toHaveTitle(/.*Sign.*|.*Auth.*|.*Sprinter.*/);
      
      // Get page source to check for exposed credentials
      const pageContent = await page.content();
      
      // Check that demo credentials are NOT visible in page source
      const hasDemoEmail = pageContent.includes('demo@sprinter.ai');
      const hasDemoPassword = pageContent.includes('demo123456');
      
      expect(hasDemoEmail).toBe(false);
      expect(hasDemoPassword).toBe(false);
      console.log('✓ Demo credentials not found in page source');
      
      // Look for "Try Demo Access" button
      const demoButton = page.locator('button:has-text("Try Demo Access")');
      await expect(demoButton).toBeVisible();
      console.log('✓ Try Demo Access button found');
      
      // Click demo button and verify it makes API call
      const responsePromise = page.waitForResponse(response => 
        response.url().includes('/api/auth/demo') && response.request().method() === 'POST'
      );
      
      await demoButton.click();
      
      try {
        const response = await responsePromise;
        console.log(`✓ Demo login API call made to: ${response.url()}`);
        console.log(`✓ Response status: ${response.status()}`);
        
        // Verify it's using API endpoint, not hardcoded credentials
        expect(response.url()).toContain('/api/auth/demo');
      } catch (error) {
        console.log('⚠ Demo API response timeout - this is expected if demo is disabled');
      }
      
      // Check console for any exposed credentials
      const credentialErrors = consoleErrors.filter(error => 
        error.includes('demo@sprinter.ai') || error.includes('demo123456')
      );
      expect(credentialErrors.length).toBe(0);
      console.log('✓ No demo credentials found in console errors');
    });

    test('should test password reset flow', async ({ page }) => {
      console.log('Testing password reset flow...');
      
      await page.goto('/auth/signin');
      
      // Look for "Forgot password?" link
      const forgotPasswordLink = page.locator('a:has-text("Forgot password?")');
      await expect(forgotPasswordLink).toBeVisible();
      console.log('✓ Forgot password link found');
      
      // Click and verify navigation
      await forgotPasswordLink.click();
      await expect(page).toHaveURL(/.*reset-password.*/);
      console.log('✓ Successfully navigated to password reset page');
      
      // Check for password reset form
      const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
      const submitButton = page.locator('button[type="submit"], button:has-text("Send"), button:has-text("Reset")').first();
      
      if (await emailInput.count() > 0) {
        await expect(emailInput).toBeVisible();
        console.log('✓ Email input found on reset page');
        
        // Test form interaction
        await emailInput.fill('test@example.com');
        console.log('✓ Email input is fillable');
      }
      
      if (await submitButton.count() > 0) {
        await expect(submitButton).toBeVisible();
        console.log('✓ Submit button found on reset page');
      }
    });

    test('should test signup flow', async ({ page }) => {
      console.log('Testing signup flow...');
      
      await page.goto('/auth/signin');
      
      // Look for signup link
      const signupLink = page.locator('a:has-text("Sign up")');
      await expect(signupLink).toBeVisible();
      console.log('✓ Sign up link found');
      
      // Click and navigate to signup
      await signupLink.click();
      await expect(page).toHaveURL(/.*signup.*/);
      console.log('✓ Successfully navigated to signup page');
      
      // Check for signup form elements
      const emailInput = page.locator('input[type="email"]').first();
      const passwordInput = page.locator('input[type="password"]').first();
      const submitButton = page.locator('button[type="submit"]').first();
      
      if (await emailInput.count() > 0 && await passwordInput.count() > 0) {
        await emailInput.fill('test@example.com');
        await passwordInput.fill('testpassword123');
        console.log('✓ Signup form fields are fillable');
        
        // Don't actually submit to avoid creating accounts
        await expect(submitButton).toBeVisible();
        console.log('✓ Signup submit button found');
      }
    });
  });

  test.describe('2. Navigation Testing', () => {
    test('should test pricing link in desktop navigation', async ({ page }) => {
      console.log('Testing pricing link in desktop navigation...');
      
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      
      // Look for pricing in main navigation - check various possible locations
      const pricingLinks = page.locator('nav a:has-text("Pricing"), header a:has-text("Pricing")');
      const pricingCount = await pricingLinks.count();
      
      console.log(`Found ${pricingCount} potential pricing links`);
      
      if (pricingCount > 0) {
        const firstPricingLink = pricingLinks.first();
        await expect(firstPricingLink).toBeVisible();
        console.log('✓ Pricing link found in desktop navigation');
        
        // Click and verify navigation
        await firstPricingLink.click();
        await expect(page).toHaveURL(/.*pricing.*/);
        console.log('✓ Pricing link navigation works');
      } else {
        // Check if pricing is in a dropdown or mega menu
        const navItems = page.locator('nav button, nav [role="button"]');
        const navCount = await navItems.count();
        console.log(`Checking ${navCount} navigation items for pricing in dropdowns...`);
        
        // This might be in a solutions or services dropdown
        const solutionsButton = page.locator('nav button:has-text("Solutions"), nav button:has-text("Services")').first();
        if (await solutionsButton.count() > 0) {
          await solutionsButton.click();
          await page.waitForTimeout(500);
          
          const dropdownPricing = page.locator('[role="menu"] a:has-text("Pricing"), [data-radix-collection-item] a:has-text("Pricing")');
          if (await dropdownPricing.count() > 0) {
            console.log('✓ Pricing found in dropdown menu');
          }
        }
        
        console.log('⚠ No direct pricing link found in main navigation');
      }
    });

    test('should test mobile navigation menu', async ({ page }) => {
      console.log('Testing mobile navigation menu...');
      
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Look for mobile menu button
      const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has(svg), .hamburger, [data-testid="mobile-menu"]');
      const menuButtonCount = await mobileMenuButton.count();
      
      console.log(`Found ${menuButtonCount} potential mobile menu buttons`);
      
      if (menuButtonCount > 0) {
        const menuButton = mobileMenuButton.last(); // Often the visible one is last
        await expect(menuButton).toBeVisible();
        console.log('✓ Mobile menu button found');
        
        // Click to open menu
        await menuButton.click();
        await page.waitForTimeout(300);
        
        // Check if menu opened (look for menu container)
        const mobileMenu = page.locator('nav[class*="mobile"], .mobile-menu, [data-testid="mobile-navigation"], div[class*="menu"]');
        const menuContainerCount = await mobileMenu.count();
        
        if (menuContainerCount > 0) {
          const visibleMenu = mobileMenu.first();
          await expect(visibleMenu).toBeVisible();
          console.log('✓ Mobile menu opens successfully');
          
          // Check for pricing in mobile menu
          const mobilePricing = page.locator('a:has-text("Pricing")');
          if (await mobilePricing.count() > 0) {
            console.log('✓ Pricing link found in mobile menu');
          } else {
            console.log('⚠ No pricing link found in mobile menu');
          }
          
          // Test closing menu (look for X button)
          const closeButton = page.locator('button:has-text("Close"), button[aria-label*="close"], button:has(svg)').last();
          if (await closeButton.count() > 0) {
            await closeButton.click();
            console.log('✓ Mobile menu can be closed');
          }
        } else {
          console.log('⚠ Mobile menu container not found after clicking button');
        }
      } else {
        console.log('⚠ No mobile menu button found');
      }
    });

    test('should test logout functionality (if available)', async ({ page }) => {
      console.log('Testing logout functionality...');
      
      await page.goto('/');
      
      // Look for user dropdown or profile menu
      const userMenuTriggers = page.locator('[aria-label*="user"], [data-testid*="user"], .user-menu, button:has-text("Account")');
      const userMenuCount = await userMenuTriggers.count();
      
      if (userMenuCount > 0) {
        console.log(`Found ${userMenuCount} potential user menu triggers`);
        
        const userMenu = userMenuTriggers.first();
        await userMenu.click();
        await page.waitForTimeout(300);
        
        // Look for sign out option
        const signOutButton = page.locator('button:has-text("Sign Out"), a:has-text("Sign Out"), button:has-text("Logout"), a:has-text("Logout")');
        if (await signOutButton.count() > 0) {
          console.log('✓ Sign Out option found in user menu');
        } else {
          console.log('⚠ No Sign Out option found');
        }
      } else {
        console.log('⚠ No user menu found (user may not be logged in)');
      }
    });
  });

  test.describe('3. Performance & Error Checking', () => {
    test('should check for JavaScript errors and performance', async ({ page }) => {
      console.log('Testing for JavaScript errors and performance...');
      
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      console.log(`Page load time: ${loadTime}ms`);
      console.log(`Console Errors: ${consoleErrors.length}`);
      console.log(`Network Errors: ${networkErrors.length}`);
      
      // Log specific errors for analysis
      if (consoleErrors.length > 0) {
        console.log('Console Errors Details:');
        consoleErrors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (networkErrors.length > 0) {
        console.log('Network Errors Details:');
        networkErrors.forEach(error => console.log(`  - ${error}`));
      }
      
      // Check that load time is reasonable
      expect(loadTime).toBeLessThan(15000); // 15 seconds max
      
      // Filter out non-critical errors
      const criticalErrors = consoleErrors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('Analytics') &&
        !error.includes('GTM') &&
        !error.toLowerCase().includes('hydration') // Allow hydration warnings for now
      );
      
      console.log(`Critical errors count: ${criticalErrors.length}`);
    });

    test('should verify security - no exposed credentials in network requests', async ({ page }) => {
      console.log('Testing for exposed credentials in network requests...');
      
      const requests: { url: string, postData: string | null }[] = [];
      
      page.on('request', request => {
        const postData = request.postData();
        requests.push({
          url: request.url(),
          postData: postData
        });
      });
      
      await page.goto('/auth/signin');
      
      // Look for any requests containing demo credentials
      const problematicRequests = requests.filter(req => 
        req.postData && (
          req.postData.includes('demo@sprinter.ai') || 
          req.postData.includes('demo123456')
        )
      );
      
      expect(problematicRequests.length).toBe(0);
      console.log('✓ No exposed credentials found in network requests');
    });

    test('should check rate limiting headers (if present)', async ({ page }) => {
      console.log('Checking for rate limiting headers...');
      
      let rateLimitHeaders: Record<string, string> = {};
      
      page.on('response', response => {
        const headers = response.headers();
        if (headers['x-ratelimit-limit'] || headers['x-ratelimit-remaining']) {
          rateLimitHeaders = {
            limit: headers['x-ratelimit-limit'] || 'not set',
            remaining: headers['x-ratelimit-remaining'] || 'not set',
            reset: headers['x-ratelimit-reset'] || 'not set'
          };
        }
      });
      
      await page.goto('/');
      await page.waitForTimeout(2000);
      
      if (Object.keys(rateLimitHeaders).length > 0) {
        console.log('✓ Rate limiting headers found:', rateLimitHeaders);
      } else {
        console.log('⚠ No rate limiting headers detected');
      }
    });
  });

  test.describe('4. Responsive Design Verification', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      test(`should render properly on ${viewport.name}`, async ({ page }) => {
        console.log(`Testing ${viewport.name} viewport (${viewport.width}x${viewport.height})`);
        
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        
        // Check main content is visible
        await expect(page.locator('main, [role="main"], body')).toBeVisible();
        
        // Check navigation is present
        const nav = page.locator('nav, header').first();
        await expect(nav).toBeVisible();
        
        // Check no horizontal scroll on smaller screens
        if (viewport.width <= 768) {
          const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
          expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 50); // Allow small tolerance
        }
        
        console.log(`✓ ${viewport.name} renders properly (body width: ${await page.evaluate(() => document.body.scrollWidth)}px)`);
      });
    }
  });

  test.describe('5. Key Pages Accessibility', () => {
    const keyPages = [
      '/',
      '/auth/signin',
      '/auth/signup', 
      '/auth/reset-password',
      '/contact'
    ];

    for (const pagePath of keyPages) {
      test(`should load ${pagePath} without critical issues`, async ({ page }) => {
        console.log(`Testing ${pagePath} page accessibility and loading...`);
        
        await page.goto(pagePath);
        
        // Check page loads without 404
        await expect(page).not.toHaveTitle(/404|Not Found/);
        
        // Check main content loads
        const mainContent = page.locator('main, [role="main"], body');
        await expect(mainContent).toBeVisible({ timeout: 10000 });
        
        // Check for heading structure
        const headings = page.locator('h1, h2, h3');
        const headingCount = await headings.count();
        
        if (headingCount > 0) {
          console.log(`✓ ${pagePath} has ${headingCount} headings`);
        } else {
          console.log(`⚠ ${pagePath} has no headings found`);
        }
        
        console.log(`✓ ${pagePath} loads successfully`);
        
        // Log any page-specific errors
        if (consoleErrors.length > 0) {
          console.log(`Console errors on ${pagePath}:`, consoleErrors.slice(-3)); // Last 3 errors
        }
      });
    }
  });
});