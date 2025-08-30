import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://sprinter-website.vercel.app';
test.use({ baseURL: PRODUCTION_URL });

test.describe('Navigation Detailed Check', () => {
  test('desktop navigation pricing link check', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    // Check all navigation links
    const navLinks = page.locator('nav a, header a');
    const linkCount = await navLinks.count();
    console.log(`Found ${linkCount} navigation links`);
    
    const linkTexts: string[] = [];
    for (let i = 0; i < Math.min(linkCount, 15); i++) {
      const text = await navLinks.nth(i).textContent();
      if (text && text.trim()) {
        linkTexts.push(text.trim());
      }
    }
    console.log('Navigation link texts:', linkTexts);
    
    // Look for pricing specifically
    const pricingLinks = page.locator('a:has-text("Pricing")');
    const pricingCount = await pricingLinks.count();
    console.log(`Pricing links found: ${pricingCount}`);
    
    // Check dropdown menus for pricing
    const dropdownTriggers = page.locator('button[aria-haspopup], [data-radix-collection-item] button');
    const dropdownCount = await dropdownTriggers.count();
    console.log(`Dropdown triggers found: ${dropdownCount}`);
    
    if (dropdownCount > 0) {
      for (let i = 0; i < Math.min(dropdownCount, 3); i++) {
        const trigger = dropdownTriggers.nth(i);
        const triggerText = await trigger.textContent();
        console.log(`Checking dropdown: ${triggerText}`);
        
        await trigger.hover();
        await page.waitForTimeout(300);
        
        const dropdownPricing = page.locator('[role="menu"] a:has-text("Pricing"), [data-radix-collection-item] a:has-text("Pricing")');
        const dropdownPricingCount = await dropdownPricing.count();
        if (dropdownPricingCount > 0) {
          console.log(`✓ Found pricing in ${triggerText} dropdown`);
        }
      }
    }
  });

  test('mobile navigation detailed check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Find mobile menu button
    const menuButtons = page.locator('button[aria-label*="menu"], button[aria-expanded], button:has(svg)');
    const buttonCount = await menuButtons.count();
    console.log(`Mobile menu button candidates: ${buttonCount}`);
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = menuButtons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const isVisible = await button.isVisible();
      console.log(`Button ${i}: aria-label="${ariaLabel}", visible=${isVisible}`);
    }
    
    const visibleMenuButton = menuButtons.filter({ hasText: '' }).last();
    if (await visibleMenuButton.count() > 0) {
      await visibleMenuButton.click();
      await page.waitForTimeout(500);
      
      // Check what mobile menu content appears
      const mobileMenus = page.locator('[class*="mobile"], [class*="menu"], nav > div');
      const menuCount = await mobileMenus.count();
      console.log(`Mobile menu containers found after click: ${menuCount}`);
      
      if (menuCount > 0) {
        const firstMenu = mobileMenus.first();
        const isVisible = await firstMenu.isVisible();
        console.log(`First mobile menu visible: ${isVisible}`);
        
        if (isVisible) {
          const menuLinks = firstMenu.locator('a');
          const linkCount = await menuLinks.count();
          console.log(`Links in mobile menu: ${linkCount}`);
          
          const linkTexts: string[] = [];
          for (let i = 0; i < Math.min(linkCount, 10); i++) {
            const text = await menuLinks.nth(i).textContent();
            if (text && text.trim()) {
              linkTexts.push(text.trim());
            }
          }
          console.log('Mobile menu links:', linkTexts);
          
          // Check specifically for pricing
          const mobilePricing = menuLinks.filter({ hasText: 'Pricing' });
          const mobilePricingCount = await mobilePricing.count();
          console.log(`Mobile pricing links: ${mobilePricingCount}`);
        }
      }
    }
  });

  test('authentication flow detailed check', async ({ page }) => {
    await page.goto('/auth/signin');
    
    // Check page title and basic elements
    const title = await page.title();
    console.log('Signin page title:', title);
    
    // Check for form elements
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    console.log(`Form inputs found: ${inputCount}`);
    
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    console.log(`Buttons found: ${buttonCount}`);
    
    // Check specifically for demo button
    const demoButton = page.locator('button:has-text("Demo"), button:has-text("Try Demo")');
    const demoCount = await demoButton.count();
    console.log(`Demo buttons found: ${demoCount}`);
    
    if (demoCount > 0) {
      const buttonText = await demoButton.first().textContent();
      console.log(`Demo button text: "${buttonText}"`);
      
      // Test clicking demo button
      const responsePromise = page.waitForResponse(response => 
        response.url().includes('/api'), { timeout: 5000 }
      ).catch(() => null);
      
      await demoButton.first().click();
      const response = await responsePromise;
      
      if (response) {
        console.log(`✓ API call made to: ${response.url()}`);
        console.log(`Response status: ${response.status()}`);
      } else {
        console.log('⚠ No API response within timeout (expected if demo disabled)');
      }
    }
    
    // Check for links
    const links = page.locator('a');
    const linkCount = await links.count();
    console.log(`Links found: ${linkCount}`);
    
    const linkTexts: string[] = [];
    for (let i = 0; i < Math.min(linkCount, 8); i++) {
      const text = await links.nth(i).textContent();
      if (text && text.trim()) {
        linkTexts.push(text.trim());
      }
    }
    console.log('Auth page links:', linkTexts);
  });
});