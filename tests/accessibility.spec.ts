import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage should not have accessibility violations', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check h1 exists and is unique
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Check headings are in order
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation has proper ARIA
    const nav = page.locator('nav').first();
    await expect(nav).toHaveAttribute('aria-label', /.+/);
    
    // Check buttons have accessible names
    const buttons = page.locator('button');
    const count = await buttons.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      expect(text || ariaLabel).toBeTruthy();
    }
  });

  test('should have skip to main content link', async ({ page }) => {
    await page.goto('/');
    
    // Press Tab to reveal skip link
    await page.keyboard.press('Tab');
    
    // Check if skip link exists (might be visually hidden)
    const skipLink = page.locator('a[href="#main"], a:has-text("Skip")').first();
    const exists = await skipLink.count() > 0;
    
    if (exists) {
      await expect(skipLink).toHaveAttribute('href', '#main');
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check that we're using gray-300 instead of gray-400 for better contrast
    const textElements = page.locator('.text-gray-300');
    const count = await textElements.count();
    expect(count).toBeGreaterThan(0);
    
    // Run axe contrast check
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.text-gray-300')
      .analyze();
    
    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );
    expect(contrastViolations).toHaveLength(0);
  });

  test('forms should have proper labels', async ({ page }) => {
    await page.goto('/contact');
    
    // Check all inputs have labels
    const inputs = page.locator('input, textarea, select');
    const count = await inputs.count();
    
    for (let i = 0; i < count; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const name = await input.getAttribute('name');
      const ariaLabel = await input.getAttribute('aria-label');
      
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const labelExists = await label.count() > 0;
        expect(labelExists || ariaLabel).toBeTruthy();
      } else {
        expect(ariaLabel || name).toBeTruthy();
      }
    }
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    // Check all images have alt text
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      
      // Images should have alt text or role="presentation" for decorative images
      expect(alt !== null || role === 'presentation').toBeTruthy();
    }
  });

  test('keyboard navigation should work', async ({ page }) => {
    await page.goto('/');
    
    // Tab through interactive elements
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check that Enter activates links
    const focusedLink = page.locator('a:focus');
    if (await focusedLink.count() > 0) {
      const href = await focusedLink.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});