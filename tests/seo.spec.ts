import { test, expect } from '@playwright/test';

test.describe('SEO and Meta Tags', () => {
  test('should have proper meta tags on homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/Sprinter AI.*Build at the pace of AI/);
    
    // Check meta description
    const description = await page.getAttribute('meta[name="description"]', 'content');
    expect(description).toContain('AI consulting');
    
    // Check Open Graph tags
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    expect(ogTitle).toBeTruthy();
    
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    expect(ogImage).toContain('/api/og');
  });

  test('should generate dynamic OG images', async ({ page }) => {
    // Test OG image API endpoint
    const response = await page.goto('/api/og?title=Test&description=Test%20Description');
    expect(response?.status()).toBe(200);
    
    const contentType = response?.headers()['content-type'];
    expect(contentType).toContain('image/png');
  });

  test('should have unique meta tags per page', async ({ page }) => {
    // Check About page
    await page.goto('/about');
    const aboutTitle = await page.title();
    expect(aboutTitle).toContain('About');
    
    // Check Services page
    await page.goto('/services');
    const servicesTitle = await page.title();
    expect(servicesTitle).toContain('Services');
    
    // Check Blog page
    await page.goto('/blog');
    const blogTitle = await page.title();
    expect(blogTitle).toContain('Blog');
    
    // Ensure titles are different
    expect(aboutTitle).not.toBe(servicesTitle);
    expect(servicesTitle).not.toBe(blogTitle);
  });

  test('should have structured data', async ({ page }) => {
    await page.goto('/');
    
    // Check for Organization schema
    const scripts = await page.locator('script[type="application/ld+json"]').all();
    expect(scripts.length).toBeGreaterThan(0);
    
    // Get content of first structured data script
    const firstScript = scripts[0];
    const content = await firstScript.textContent();
    expect(content).toContain('Organization');
    expect(content).toContain('Sprinter AI');
  });

  test('should have proper canonical URLs', async ({ page }) => {
    await page.goto('/about');
    
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    expect(canonical).toContain('/about');
  });

  test('should have robots meta tag', async ({ page }) => {
    await page.goto('/');
    
    const robots = await page.getAttribute('meta[name="robots"]', 'content');
    expect(robots).toContain('index');
    expect(robots).toContain('follow');
  });
});