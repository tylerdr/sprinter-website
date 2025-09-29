const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function analyzeSite() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const sitemap = {
    baseUrl: 'http://localhost:3001',
    pages: [],
    errors: [],
    screenshots: []
  };

  const screenshotsDir = './screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  async function visitPage(url, pageName, parentCategory = null) {
    try {
      console.log(`Visiting: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${pageName.replace(/[^a-zA-Z0-9]/g, '_')}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      // Get page title and meta description
      const title = await page.title();
      const metaDescription = await page.getAttribute('meta[name="description"]', 'content').catch(() => null);

      // Check for any visible error messages or 404 indicators
      const hasError = await page.locator('text=/error|404|not found/i').first().isVisible().catch(() => false);

      const pageInfo = {
        url,
        name: pageName,
        category: parentCategory,
        title,
        metaDescription,
        hasError,
        screenshotPath
      };

      sitemap.pages.push(pageInfo);
      sitemap.screenshots.push(screenshotPath);

      if (hasError) {
        sitemap.errors.push({ url, error: 'Page appears to have error content' });
      }

      return pageInfo;
    } catch (error) {
      console.error(`Error visiting ${url}:`, error.message);
      sitemap.errors.push({ url, error: error.message });
      return null;
    }
  }

  // Start with homepage
  await visitPage('http://localhost:3001', 'homepage');

  // Get navigation links from homepage
  const navLinks = await page.locator('nav a, header a').all();
  const discoveredLinks = new Set();

  for (const link of navLinks) {
    try {
      const href = await link.getAttribute('href');
      const text = await link.textContent();

      if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        let fullUrl = href.startsWith('http') ? href : `http://localhost:3001${href}`;
        if (!discoveredLinks.has(fullUrl)) {
          discoveredLinks.add(fullUrl);
          console.log(`Found nav link: ${text} -> ${fullUrl}`);
        }
      }
    } catch (e) {
      console.log('Could not process nav link:', e.message);
    }
  }

  // Visit discovered navigation links
  for (const url of discoveredLinks) {
    if (url.includes('localhost:3001')) {
      const pathSegments = new URL(url).pathname.split('/').filter(Boolean);
      const pageName = pathSegments.length > 0 ? pathSegments.join('-') : 'root';
      const category = pathSegments[0] || 'main';
      await visitPage(url, pageName, category);

      // Small delay to avoid overwhelming the server
      await page.waitForTimeout(1000);
    }
  }

  // Explore labs pages specifically
  const labsUrls = [
    '/labs',
    '/labs/agent-simulator',
    '/labs/workflow-tool',
    '/labs/ideation',
    '/labs/sketch-studio'
  ];

  for (const labPath of labsUrls) {
    const url = `http://localhost:3001${labPath}`;
    if (!sitemap.pages.some(p => p.url === url)) {
      await visitPage(url, labPath.replace('/', '').replace('/', '-'), 'labs');
      await page.waitForTimeout(1000);
    }
  }

  // Explore use cases
  try {
    await page.goto('http://localhost:3001/use-cases');
    const useCaseLinks = await page.locator('a[href*="/use-cases/"]').all();

    for (const link of useCaseLinks) {
      try {
        const href = await link.getAttribute('href');
        if (href && href.startsWith('/use-cases/')) {
          const url = `http://localhost:3001${href}`;
          if (!sitemap.pages.some(p => p.url === url)) {
            const pageName = href.replace('/', '').replace(/\//g, '-');
            await visitPage(url, pageName, 'use-cases');
            await page.waitForTimeout(1000);
          }
        }
      } catch (e) {
        console.log('Could not process use case link:', e.message);
      }
    }
  } catch (e) {
    console.log('Could not explore use cases:', e.message);
  }

  // Check for common pages
  const commonPages = [
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/login',
    '/register',
    '/services',
    '/solutions',
    '/blog',
    '/case-studies',
    '/team'
  ];

  for (const pagePath of commonPages) {
    const url = `http://localhost:3001${pagePath}`;
    if (!sitemap.pages.some(p => p.url === url)) {
      await visitPage(url, pagePath.substring(1), 'utility');
      await page.waitForTimeout(1000);
    }
  }

  // Save sitemap data
  fs.writeFileSync('./sitemap-analysis.json', JSON.stringify(sitemap, null, 2));

  console.log(`\nSitemap Analysis Complete!`);
  console.log(`Total pages analyzed: ${sitemap.pages.length}`);
  console.log(`Screenshots taken: ${sitemap.screenshots.length}`);
  console.log(`Errors encountered: ${sitemap.errors.length}`);

  await browser.close();
  return sitemap;
}

analyzeSite().catch(console.error);