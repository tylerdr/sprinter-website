const { chromium } = require('playwright');
const fs = require('fs');

async function deepExploration() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const additionalPages = [];

  try {
    // Explore use-cases more deeply
    console.log('Exploring use-cases pages...');
    await page.goto('http://localhost:3001/use-cases', { waitUntil: 'networkidle', timeout: 30000 });

    // Look for additional use case links
    const useCaseLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a[href*="/use-cases/"]').forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        if (href && text && href !== '/use-cases' && href !== '/use-cases/industries') {
          links.push({ href, text });
        }
      });
      return [...new Map(links.map(link => [link.href, link])).values()];
    });

    console.log(`Found ${useCaseLinks.length} additional use case links:`);
    useCaseLinks.forEach(link => console.log(`  ${link.text} -> ${link.href}`));

    for (const link of useCaseLinks) {
      try {
        await page.goto(`http://localhost:3001${link.href}`, { timeout: 15000 });
        const title = await page.title();
        additionalPages.push({
          url: `http://localhost:3001${link.href}`,
          path: link.href,
          name: link.text,
          title: title,
          category: 'use-cases',
          subcategory: 'specific'
        });

        const screenshotName = link.href.replace(/\//g, '_').substring(1);
        await page.screenshot({ path: `./deep_${screenshotName}-screenshot.png` });
        console.log(`  Captured: ${link.href}`);
      } catch (error) {
        console.log(`  Error with ${link.href}: ${error.message}`);
        additionalPages.push({
          url: `http://localhost:3001${link.href}`,
          path: link.href,
          name: link.text,
          category: 'use-cases',
          status: 'error',
          error: error.message
        });
      }
    }

    // Explore industries pages
    console.log('\nExploring industries pages...');
    await page.goto('http://localhost:3001/use-cases/industries', { waitUntil: 'networkidle', timeout: 30000 });

    const industryLinks = await page.evaluate(() => {
      const links = [];
      document.querySelectorAll('a[href*="/use-cases/industries/"]').forEach(link => {
        const href = link.getAttribute('href');
        const text = link.textContent?.trim();
        if (href && text) {
          links.push({ href, text });
        }
      });
      return [...new Map(links.map(link => [link.href, link])).values()];
    });

    console.log(`Found ${industryLinks.length} industry links:`);
    industryLinks.forEach(link => console.log(`  ${link.text} -> ${link.href}`));

    for (const link of industryLinks) {
      try {
        await page.goto(`http://localhost:3001${link.href}`, { timeout: 15000 });
        const title = await page.title();
        additionalPages.push({
          url: `http://localhost:3001${link.href}`,
          path: link.href,
          name: link.text,
          title: title,
          category: 'use-cases',
          subcategory: 'industries'
        });

        const screenshotName = link.href.replace(/\//g, '_').substring(1);
        await page.screenshot({ path: `./deep_${screenshotName}-screenshot.png` });
        console.log(`  Captured: ${link.href}`);
      } catch (error) {
        console.log(`  Error with ${link.href}: ${error.message}`);
        additionalPages.push({
          url: `http://localhost:3001${link.href}`,
          path: link.href,
          name: link.text,
          category: 'use-cases',
          subcategory: 'industries',
          status: 'error',
          error: error.message
        });
      }
    }

    // Test some programmatic pages
    const programmaticTests = [
      '/use-cases/automation',
      '/use-cases/customer-service',
      '/use-cases/data-analysis',
      '/use-cases/workflow-optimization',
      '/use-cases/industries/healthcare',
      '/use-cases/industries/finance',
      '/use-cases/industries/manufacturing',
      '/use-cases/industries/retail'
    ];

    console.log('\nTesting programmatic pages...');
    for (const testPath of programmaticTests) {
      try {
        const response = await page.goto(`http://localhost:3001${testPath}`, { timeout: 10000 });
        const title = await page.title();
        const status = response?.status() === 200 ? 'ok' : 'error';

        additionalPages.push({
          url: `http://localhost:3001${testPath}`,
          path: testPath,
          name: testPath.split('/').pop(),
          title: title,
          category: 'use-cases',
          subcategory: testPath.includes('/industries/') ? 'industries' : 'specific',
          status: status
        });

        if (status === 'ok') {
          const screenshotName = testPath.replace(/\//g, '_').substring(1);
          await page.screenshot({ path: `./prog_${screenshotName}-screenshot.png` });
        }
        console.log(`  ${testPath}: ${status}`);
      } catch (error) {
        console.log(`  ${testPath}: error - ${error.message}`);
        additionalPages.push({
          url: `http://localhost:3001${testPath}`,
          path: testPath,
          name: testPath.split('/').pop(),
          category: 'use-cases',
          status: 'error',
          error: error.message
        });
      }
    }

  } catch (error) {
    console.error('Error during deep exploration:', error);
  }

  // Save results
  fs.writeFileSync('./deep-exploration-results.json', JSON.stringify(additionalPages, null, 2));
  console.log(`\nDeep exploration complete! Found ${additionalPages.length} additional pages.`);

  await browser.close();
  return additionalPages;
}

deepExploration().catch(console.error);