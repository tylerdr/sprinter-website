import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('should display blog posts', async ({ page }) => {
    await page.goto('/blog');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('AI Insights');
    
    // Check featured post exists (just check that articles exist)
    const featuredPost = page.locator('article').first();
    await expect(featuredPost).toBeVisible();
    
    // Check categories are displayed
    await expect(page.locator('text=Categories')).toBeVisible();
    await expect(page.locator('button:has-text("All")')).toBeVisible();
    
    // Check newsletter section converted to "Coming Soon"
    await expect(page.locator('text=Stay Updated')).toBeVisible();
    await expect(page.locator('a:has-text("Get Notified")')).toBeVisible();
  });

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog');
    
    // Click on first blog post
    const firstPost = page.locator('article').first();
    const postTitle = await firstPost.locator('h2').textContent();
    await firstPost.locator('text=Read More').click();
    
    // Check individual post page loads
    await expect(page.locator('h1')).toContainText(postTitle || '');
    await expect(page.locator('text=Back to Blog')).toBeVisible();
    
    // Check post metadata - look for date in time element only
    await expect(page.locator('time').first()).toBeVisible();
    await expect(page.locator('text=min read')).toBeVisible();
    
    // Check CTA at end of post
    await expect(page.locator('text=Ready to implement these strategies?')).toBeVisible();
    await expect(page.locator('text=Schedule a Strategy Call')).toBeVisible();
  });

  test('should show related articles', async ({ page }) => {
    await page.goto('/blog/building-50-production-ai-systems');
    
    // Check related articles section exists
    await expect(page.locator('text=Related Articles')).toBeVisible();
    
    // Check related articles section
    await expect(page.locator('text=Related Articles')).toBeVisible();
    const relatedLinks = page.locator('a[href^="/blog/"]').filter({ hasText: /What|Building|10-Day/ });
    const count = await relatedLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('new AI Agent blog post should exist', async ({ page }) => {
    await page.goto('/blog/what-is-an-ai-agent');
    
    // Check the new post loads correctly
    await expect(page.locator('h1')).toContainText('What Exactly Is an AI Agent');
    await expect(page.locator('text=The Confusion Around \'AI Agents\'')).toBeVisible();
    await expect(page.locator('text=Getting Started with AI Agents')).toBeVisible();
  });
});