import { chromium } from 'playwright';

async function auditSite() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const baseUrl = 'http://localhost:3004';
  const visitedUrls = new Set<string>();
  const brokenLinks: Array<{ from: string; to: string; status: number }> = [];
  const errors: Array<{ url: string; error: string }> = [];

  // List of important pages to check
  const pagesToCheck = [
    '/',
    '/labs',
    '/operating-partner',
    '/solutions/ap-automation',
    '/industries',
    '/resources',
    '/contact',
    '/ai-assessment',
    '/case-studies',
    '/blog',
    '/tools',
    '/use-cases',
    '/governance',
    '/partnership',
    '/services',
    '/pe-services',
    '/insights',
    // All restored Labs
    '/labs/voice-chat',
    '/labs/voice-to-process',
    '/labs/sketch-studio',
    '/labs/vibe-coding',
    '/labs/storyboarding',
    '/labs/component-studio',
    '/labs/tiny-town',
    '/labs/cards-against-ai',
    '/labs/ai-telestrations',
    '/labs/story-adventure',
    '/labs/future-scenarios',
    '/labs/quiz-generator',
    '/labs/portfolio-ai-blueprint',
    '/labs/lead-gen-visualizer',
    '/labs/ai-elements-demo',
  ];

  // Function to check a single page
  async function checkPage(url: string) {
    if (visitedUrls.has(url)) return;
    visitedUrls.add(url);

    try {
      console.log(`Checking: ${url}`);
      const response = await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000
      });

      if (!response) {
        errors.push({ url, error: 'No response received' });
        return;
      }

      const status = response.status();
      if (status >= 400) {
        brokenLinks.push({ from: 'direct', to: url, status });
      }

      // Check for console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push({ url, error: msg.text() });
        }
      });

      // Find all links on the page
      const links = await page.$$eval('a[href]', anchors =>
        anchors.map(a => a.getAttribute('href')).filter(Boolean)
      );

      // Check internal links
      for (const link of links) {
        if (!link) continue;

        // Skip external links, anchors, and special protocols
        if (link.startsWith('http') && !link.includes('localhost:3004')) continue;
        if (link.startsWith('#')) continue;
        if (link.startsWith('mailto:')) continue;
        if (link.startsWith('tel:')) continue;

        const fullUrl = link.startsWith('/')
          ? `${baseUrl}${link}`
          : new URL(link, url).toString();

        // Only check if we haven't visited it yet
        if (!visitedUrls.has(fullUrl) && fullUrl.startsWith(baseUrl)) {
          try {
            const linkResponse = await page.request.head(fullUrl).catch(() => null);
            if (!linkResponse || linkResponse.status() >= 400) {
              const status = linkResponse ? linkResponse.status() : 0;
              brokenLinks.push({ from: url, to: fullUrl, status });
            }
          } catch (e) {
            // Silent fail for HEAD requests
          }
        }
      }

      // Check for missing images
      const images = await page.$$eval('img', imgs =>
        imgs.map(img => ({ src: img.src, alt: img.alt }))
      );

      for (const img of images) {
        if (img.src && !img.src.startsWith('data:')) {
          try {
            const imgResponse = await page.request.head(img.src).catch(() => null);
            if (!imgResponse || imgResponse.status() >= 400) {
              errors.push({
                url,
                error: `Missing image: ${img.src} (alt: ${img.alt || 'no alt text'})`
              });
            }
          } catch (e) {
            // Silent fail for image checks
          }
        }
      }

    } catch (error) {
      errors.push({
        url,
        error: error instanceof Error ? error.message : String(error)
      });
    }
  }

  // Check all pages
  for (const pageUrl of pagesToCheck) {
    await checkPage(`${baseUrl}${pageUrl}`);
  }

  // Generate report
  console.log('\n=== SITE AUDIT REPORT ===\n');

  console.log(`Total pages checked: ${visitedUrls.size}`);
  console.log(`Broken links found: ${brokenLinks.length}`);
  console.log(`Errors found: ${errors.length}\n`);

  if (brokenLinks.length > 0) {
    console.log('BROKEN LINKS:');
    for (const link of brokenLinks) {
      console.log(`  - ${link.from} → ${link.to} (Status: ${link.status})`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.log('ERRORS:');
    const uniqueErrors = new Map<string, string[]>();
    for (const error of errors) {
      if (!uniqueErrors.has(error.error)) {
        uniqueErrors.set(error.error, []);
      }
      uniqueErrors.get(error.error)!.push(error.url);
    }

    for (const [errorMsg, urls] of uniqueErrors.entries()) {
      console.log(`  - ${errorMsg}`);
      if (urls.length <= 3) {
        for (const url of urls) {
          console.log(`    on: ${url}`);
        }
      } else {
        console.log(`    on: ${urls[0]} and ${urls.length - 1} other pages`);
      }
    }
  }

  await browser.close();

  // Return exit code based on findings
  const hasIssues = brokenLinks.length > 0 || errors.length > 0;
  process.exit(hasIssues ? 1 : 0);
}

auditSite().catch(console.error);