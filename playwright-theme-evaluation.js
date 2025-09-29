const { chromium } = require('playwright');

async function evaluateHomepage() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  try {
    console.log('🌐 Navigating to homepage...');
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle' });

    // Wait for page to fully load
    await page.waitForTimeout(2000);

    console.log('📸 Taking screenshot in dark mode (default)...');
    await page.screenshot({
      path: '/home/sprinter/sprinter-website/homepage-dark-mode.png',
      fullPage: true
    });

    // Look for theme toggle button
    console.log('🔍 Looking for theme toggle button...');
    const themeToggleSelectors = [
      '[data-testid="theme-toggle"]',
      'button[aria-label*="theme" i]',
      'button[aria-label*="dark" i]',
      'button[aria-label*="light" i]',
      'button:has(svg):has([fill="currentColor"])', // Common icon pattern
      '.theme-toggle',
      '[data-theme-toggle]',
      'button:has(svg[data-testid="sun-icon"])',
      'button:has(svg[data-testid="moon-icon"])'
    ];

    let themeToggle = null;
    for (const selector of themeToggleSelectors) {
      try {
        themeToggle = await page.locator(selector).first();
        if (await themeToggle.isVisible()) {
          console.log(`✅ Found theme toggle with selector: ${selector}`);
          break;
        }
      } catch (e) {
        // Continue to next selector
      }
    }

    if (!themeToggle || !await themeToggle.isVisible()) {
      // Try to find any button in the header/nav area that might be the theme toggle
      console.log('🔍 Searching for theme toggle in navigation area...');
      const navButtons = await page.locator('nav button, header button, .nav button').all();

      for (const button of navButtons) {
        try {
          const text = await button.textContent();
          const ariaLabel = await button.getAttribute('aria-label');
          if ((text && (text.toLowerCase().includes('theme') || text.toLowerCase().includes('dark') || text.toLowerCase().includes('light'))) ||
              (ariaLabel && (ariaLabel.toLowerCase().includes('theme') || ariaLabel.toLowerCase().includes('dark') || ariaLabel.toLowerCase().includes('light')))) {
            themeToggle = button;
            console.log('✅ Found theme toggle by content analysis');
            break;
          }
        } catch (e) {
          // Continue to next button
        }
      }
    }

    if (themeToggle && await themeToggle.isVisible()) {
      console.log('🌞 Clicking theme toggle to switch to light mode...');
      await themeToggle.click();

      // Wait for theme transition
      await page.waitForTimeout(1000);

      console.log('📸 Taking screenshot in light mode...');
      await page.screenshot({
        path: '/home/sprinter/sprinter-website/homepage-light-mode.png',
        fullPage: true
      });
    } else {
      console.log('⚠️ Could not find theme toggle button');
      // Try to manually add light theme class or attribute
      await page.evaluate(() => {
        // Try different approaches to enable light theme
        if (document.documentElement) {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
          document.documentElement.setAttribute('data-theme', 'light');
        }
        if (document.body) {
          document.body.classList.remove('dark');
          document.body.classList.add('light');
        }
      });

      await page.waitForTimeout(1000);

      console.log('📸 Taking screenshot in forced light mode...');
      await page.screenshot({
        path: '/home/sprinter/sprinter-website/homepage-light-mode.png',
        fullPage: true
      });
    }

    // Analyze visual elements and potential issues
    console.log('🔍 Analyzing visual elements...');

    const analysis = await page.evaluate(() => {
      const issues = [];

      // Check for elements with potential contrast issues
      const allElements = document.querySelectorAll('*');

      allElements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const color = styles.color;
        const tagName = el.tagName.toLowerCase();

        // Check for transparent or very light backgrounds with light text
        if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
          if (color && (color.includes('rgb(255') || color.includes('white') || color.includes('#fff'))) {
            if (el.textContent && el.textContent.trim().length > 0) {
              issues.push({
                type: 'contrast',
                element: tagName,
                issue: 'Light text on transparent background',
                selector: el.className ? `.${el.className.split(' ')[0]}` : tagName
              });
            }
          }
        }

        // Check buttons for visibility
        if (tagName === 'button' && el.textContent && el.textContent.trim().length > 0) {
          const opacity = styles.opacity;
          if (parseFloat(opacity) < 0.6) {
            issues.push({
              type: 'visibility',
              element: 'button',
              issue: 'Button has low opacity',
              text: el.textContent.trim(),
              selector: el.className ? `.${el.className.split(' ')[0]}` : 'button'
            });
          }
        }
      });

      // Check for form elements
      const formElements = document.querySelectorAll('input, textarea, select');
      formElements.forEach(el => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const borderColor = styles.borderColor;

        if (bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)') {
          issues.push({
            type: 'form',
            element: el.tagName.toLowerCase(),
            issue: 'Form element has transparent background',
            selector: el.className ? `.${el.className.split(' ')[0]}` : el.tagName.toLowerCase()
          });
        }
      });

      return {
        issues,
        totalElements: allElements.length,
        formElements: formElements.length,
        themeClass: document.documentElement.className,
        themeAttribute: document.documentElement.getAttribute('data-theme')
      };
    });

    console.log('📋 Analysis complete:', analysis);

  } catch (error) {
    console.error('❌ Error during evaluation:', error);
  } finally {
    await browser.close();
  }
}

evaluateHomepage().catch(console.error);