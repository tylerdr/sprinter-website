const { chromium } = require('playwright');
const fs = require('fs');

async function quickSiteAnalysis() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const sitemap = {
    baseUrl: 'http://localhost:3001',
    pages: [],
    navigation: {},
    errors: []
  };

  try {
    console.log('Visiting homepage...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle', timeout: 30000 });

    // Take homepage screenshot
    await page.screenshot({ path: './homepage-screenshot.png', fullPage: true });
    console.log('Homepage screenshot saved');

    // Get page title
    const title = await page.title();
    sitemap.pages.push({
      url: 'http://localhost:3001',
      path: '/',
      name: 'Homepage',
      title: title,
      category: 'main'
    });

    // Extract all navigation links
    const navLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('nav a, header a, [role="navigation"] a').forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        if (href && text && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          links.push({ href, text });
        }
      });
      return links;
    });

    console.log(`Found ${navLinks.length} navigation links:`);
    navLinks.forEach(link => {
      console.log(`  ${link.text} -> ${link.href}`);
    });

    // Categorize discovered links
    navLinks.forEach(link => {
      let fullUrl = link.href.startsWith('http') ? link.href : `http://localhost:3001${link.href}`;
      let path = link.href.startsWith('http') ? new URL(link.href).pathname : link.href;

      let category = 'main';
      if (path.startsWith('/labs')) category = 'labs';
      else if (path.startsWith('/use-cases')) category = 'use-cases';
      else if (path.startsWith('/solutions')) category = 'solutions';
      else if (path.startsWith('/auth')) category = 'auth';
      else if (path.startsWith('/downloads')) category = 'downloads';
      else if (['privacy', 'terms', 'governance'].some(p => path.includes(p))) category = 'legal';

      sitemap.pages.push({
        url: fullUrl,
        path: path,
        name: link.text,
        category: category
      });
    });

    // Test specific important pages
    const testPages = [
      '/labs/agent-simulator',
      '/labs/workflow-tool',
      '/labs/ideation',
      '/labs/sketch-studio',
      '/use-cases',
      '/use-cases/industries'
    ];

    for (const testPath of testPages) {
      try {
        console.log(`Testing page: ${testPath}`);
        await page.goto(`http://localhost:3001${testPath}`, { timeout: 15000 });
        const pageTitle = await page.title();

        // Check if page loaded successfully
        const bodyText = await page.textContent('body');
        const hasError = bodyText?.toLowerCase().includes('error') || bodyText?.toLowerCase().includes('404');

        sitemap.pages.push({
          url: `http://localhost:3001${testPath}`,
          path: testPath,
          name: testPath.split('/').pop(),
          title: pageTitle,
          category: testPath.split('/')[1] || 'main',
          status: hasError ? 'error' : 'ok'
        });

        // Take screenshot
        const screenshotName = testPath.replace(/\//g, '_').substring(1) || 'root';
        await page.screenshot({ path: `./${screenshotName}-screenshot.png` });

      } catch (error) {
        sitemap.errors.push({ path: testPath, error: error.message });
        console.log(`Error testing ${testPath}: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('Error during analysis:', error);
    sitemap.errors.push({ general: error.message });
  }

  // Save results
  fs.writeFileSync('./sitemap-results.json', JSON.stringify(sitemap, null, 2));
  console.log('\nAnalysis complete! Results saved to sitemap-results.json');
  console.log(`Total pages found: ${sitemap.pages.length}`);
  console.log(`Errors: ${sitemap.errors.length}`);

  await browser.close();
  return sitemap;
}

quickSiteAnalysis().catch(console.error);