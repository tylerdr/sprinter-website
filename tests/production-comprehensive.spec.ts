import { test, expect, Page } from '@playwright/test';

const PRODUCTION_URL = 'https://sprinter-website.vercel.app';

// Override baseURL for production testing
test.use({ baseURL: PRODUCTION_URL });

test.describe('Sprinter AI Production Website - Comprehensive Testing', () => {
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

  test.describe('1. Homepage Testing', () => {
    test('should load homepage and render properly', async ({ page }) => {
      await page.goto('/');
      
      // Check page loads
      await expect(page).toHaveTitle(/Sprinter/);
      
      // Check hero section loads
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
      
      // Check for main CTAs
      const ctaButtons = page.locator('a[href*="contact"], button:has-text("Get Started"), a:has-text("Get Started")');
      await expect(ctaButtons.first()).toBeVisible({ timeout: 5000 });
      
      console.log('Console Errors on Homepage:', consoleErrors);
      console.log('Network Errors on Homepage:', networkErrors);
    });

    test('should have working chat widget', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Look for chat widget or chat trigger
      const chatElements = page.locator('[data-testid="chat"], .chat-widget, button:has-text("Chat"), [class*="chat"]');
      const chatCount = await chatElements.count();
      
      if (chatCount > 0) {
        await expect(chatElements.first()).toBeVisible();
        console.log('Chat widget found and visible');
      } else {
        console.log('No chat widget found on homepage');
      }
    });
  });

  test.describe('2. Navigation Testing', () => {
    test('should test main navigation links', async ({ page }) => {
      await page.goto('/');
      
      const navLinks = [
        { text: 'About', expectedUrl: '/about' },
        { text: 'Services', expectedUrl: '/services' },
        { text: 'Pricing', expectedUrl: '/pricing' },
        { text: 'Labs', expectedUrl: '/labs' },
        { text: 'Insights', expectedUrl: '/insights' },
        { text: 'Contact', expectedUrl: '/contact' }
      ];
      
      for (const link of navLinks) {
        const navElement = page.locator(`nav a:has-text("${link.text}"), header a:has-text("${link.text}")`).first();
        if (await navElement.count() > 0) {
          await navElement.click();
          await page.waitForURL(`**${link.expectedUrl}**`, { timeout: 10000 });
          await expect(page).toHaveURL(new RegExp(link.expectedUrl));
          console.log(`✓ Navigation to ${link.text} works`);
          await page.goBack();
        } else {
          console.log(`⚠ Navigation link for ${link.text} not found`);
        }
      }
    });

    test('should test mobile navigation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // Look for mobile menu trigger
      const mobileMenuTrigger = page.locator('button[aria-label*="menu"], button:has-text("Menu"), .hamburger, [data-testid="mobile-menu"]');
      
      if (await mobileMenuTrigger.count() > 0) {
        await mobileMenuTrigger.first().click();
        
        // Check if mobile menu opens
        const mobileMenu = page.locator('nav[class*="mobile"], .mobile-menu, [data-testid="mobile-navigation"]');
        await expect(mobileMenu.first()).toBeVisible({ timeout: 3000 });
        console.log('✓ Mobile navigation opens');
      } else {
        console.log('⚠ Mobile menu trigger not found');
      }
    });

    test('should return to homepage when logo is clicked', async ({ page }) => {
      await page.goto('/about');
      
      const logo = page.locator('a[href="/"], img[alt*="Sprinter"], .logo').first();
      if (await logo.count() > 0) {
        await logo.click();
        await expect(page).toHaveURL(PRODUCTION_URL + '/');
        console.log('✓ Logo click returns to homepage');
      }
    });
  });

  test.describe('3. Key Pages Testing', () => {
    const keyPages = [
      '/about',
      '/services', 
      '/pricing',
      '/contact',
      '/insights',
      '/use-cases'
    ];

    for (const pagePath of keyPages) {
      test(`should load ${pagePath} page`, async ({ page }) => {
        await page.goto(pagePath);
        
        // Check page loads without 404
        await expect(page).not.toHaveTitle(/404/);
        await expect(page).not.toHaveTitle(/Not Found/);
        
        // Check main content loads
        await expect(page.locator('main, [role="main"], .main-content')).toBeVisible({ timeout: 10000 });
        
        // Check for any critical content
        await expect(page.locator('h1, h2').first()).toBeVisible({ timeout: 5000 });
        
        console.log(`✓ ${pagePath} page loads successfully`);
        console.log(`Console Errors on ${pagePath}:`, consoleErrors);
        console.log(`Network Errors on ${pagePath}:`, networkErrors);
      });
    }
  });

  test.describe('4. Labs Section Testing', () => {
    test('should load main labs page', async ({ page }) => {
      await page.goto('/labs');
      
      await expect(page.locator('h1, h2').first()).toBeVisible();
      
      // Check for lab cards/links
      const labLinks = page.locator('a[href*="/labs/"], .lab-card, [data-testid="lab"]');
      const labCount = await labLinks.count();
      console.log(`Found ${labCount} lab items on labs page`);
      
      expect(labCount).toBeGreaterThan(0);
    });

    const labDemos = [
      '/labs/agent-simulator',
      '/labs/workflow-tool',
      '/labs/sketch-studio', 
      '/labs/ai-playbook'
    ];

    for (const labPath of labDemos) {
      test(`should test ${labPath} demo`, async ({ page }) => {
        await page.goto(labPath);
        
        // Check demo loads
        await expect(page).not.toHaveTitle(/404/);
        await expect(page.locator('main, [role="main"]')).toBeVisible({ timeout: 10000 });
        
        // Look for interactive elements
        const interactiveElements = page.locator('button, input, textarea, [contenteditable], .interactive');
        const interactiveCount = await interactiveElements.count();
        
        console.log(`✓ ${labPath} loads with ${interactiveCount} interactive elements`);
        console.log(`Console Errors on ${labPath}:`, consoleErrors);
        
        // Try to interact with first interactive element if it exists
        if (interactiveCount > 0) {
          const firstInteractive = interactiveElements.first();
          const tagName = await firstInteractive.evaluate(el => el.tagName.toLowerCase());
          
          if (tagName === 'button') {
            await firstInteractive.click();
            console.log(`✓ Clicked first button in ${labPath}`);
          } else if (tagName === 'input' || tagName === 'textarea') {
            await firstInteractive.fill('Test input');
            console.log(`✓ Filled first input in ${labPath}`);
          }
        }
      });
    }
  });

  test.describe('5. Forms and Interactive Elements', () => {
    test('should test contact form', async ({ page }) => {
      await page.goto('/contact');
      
      // Look for form elements
      const form = page.locator('form').first();
      const nameInput = page.locator('input[name*="name"], input[placeholder*="name"]').first();
      const emailInput = page.locator('input[type="email"], input[name*="email"]').first();
      const messageInput = page.locator('textarea, input[name*="message"]').first();
      const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
      
      if (await form.count() > 0) {
        console.log('✓ Contact form found');
        
        // Test form filling
        if (await nameInput.count() > 0) {
          await nameInput.fill('Test User');
          console.log('✓ Name field fillable');
        }
        
        if (await emailInput.count() > 0) {
          await emailInput.fill('test@example.com');
          console.log('✓ Email field fillable');
        }
        
        if (await messageInput.count() > 0) {
          await messageInput.fill('This is a test message');
          console.log('✓ Message field fillable');
        }
        
        // Don't actually submit to avoid spam
        if (await submitButton.count() > 0) {
          console.log('✓ Submit button found');
        }
      } else {
        console.log('⚠ No contact form found');
      }
    });

    test('should test newsletter signup', async ({ page }) => {
      await page.goto('/');
      
      // Look for newsletter signup
      const newsletterInputs = page.locator('input[placeholder*="email"], input[name*="newsletter"], input[name*="subscribe"]');
      const newsletterCount = await newsletterInputs.count();
      
      if (newsletterCount > 0) {
        await newsletterInputs.first().fill('test@example.com');
        console.log('✓ Newsletter signup field found and fillable');
      } else {
        console.log('⚠ No newsletter signup found');
      }
    });
  });

  test.describe('6. Responsive Design Testing', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    for (const viewport of viewports) {
      test(`should render properly on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        
        // Check main content is visible
        await expect(page.locator('main, [role="main"]')).toBeVisible();
        
        // Check navigation adapts
        const nav = page.locator('nav, header nav').first();
        await expect(nav).toBeVisible();
        
        // Check no horizontal scroll on mobile
        if (viewport.width <= 768) {
          const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
          expect(bodyWidth).toBeLessThanOrEqual(viewport.width + 20); // Allow small tolerance
        }
        
        console.log(`✓ ${viewport.name} viewport renders properly`);
      });
    }
  });

  test.describe('7. Performance and Error Checking', () => {
    test('should check for missing images and assets', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // Check for broken images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
        
        if (naturalWidth === 0 && src) {
          console.log(`⚠ Potentially broken image: ${src}`);
        }
      }
      
      console.log(`Checked ${Math.min(imageCount, 10)} images for broken links`);
    });

    test('should check page load performance', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      console.log(`Homepage load time: ${loadTime}ms`);
      
      // Check if load time is reasonable (less than 10 seconds)
      expect(loadTime).toBeLessThan(10000);
    });
  });
});