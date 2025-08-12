import { test, expect } from '@playwright/test';

test.describe('PDF Attribute Extraction Lab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/labs/pdf-extractor');
  });

  test('should load the PDF extractor page', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check main heading
    await expect(page.locator('h1')).toContainText('PDF Attribute Extraction');
    await expect(page.locator('text=Extract structured data from unstructured documents')).toBeVisible();
  });

  test('should show the 4-step process indicators', async ({ page }) => {
    // Check for step indicators (icons are shown, not text in the stepper)
    // The steps use icons: FileText, CheckCircle2, Upload, Eye
    const stepIcons = page.locator('.flex.justify-between .flex.items-center.justify-center');
    await expect(stepIcons).toHaveCount(4);
    
    // First step should be active (blue/purple gradient)
    const firstStep = stepIcons.first();
    await expect(firstStep).toHaveClass(/from-blue-500/);
  });

  test('should allow entering attributes in step 1', async ({ page }) => {
    const textarea = page.locator('textarea[placeholder*="Enter attributes"]');
    await expect(textarea).toBeVisible();
    
    await textarea.fill('Invoice number\nTotal amount\nDue date');
    await expect(textarea).toHaveValue('Invoice number\nTotal amount\nDue date');
    
    const expandButton = page.locator('button:has-text("Expand with AI")');
    await expect(expandButton).toBeVisible();
    await expect(expandButton).toBeEnabled();
  });

  test('should navigate between steps', async ({ page }) => {
    // Fill in attributes
    await page.locator('textarea[placeholder*="Enter attributes"]').fill('Test attribute');
    
    // Mock the API response for expanding attributes
    await page.route('/api/ai/expand-attributes', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test Attribute',
            definition: 'Test definition',
            prompt: 'Extract test attribute',
            type: 'text'
          }
        ])
      });
    });
    
    // Click expand button
    await page.locator('button:has-text("Expand with AI")').click();
    
    // Should move to step 2
    await expect(page.locator('h2:has-text("Review and Edit Attributes")')).toBeVisible();
    
    // Should show the expanded attribute
    await expect(page.locator('text=Test Attribute')).toBeVisible();
    
    // Continue to step 3
    await page.locator('button:has-text("Continue")').click();
    await expect(page.locator('h2:has-text("Upload Documents")')).toBeVisible();
  });

  test('should allow editing attributes in step 2', async ({ page }) => {
    // Setup and navigate to step 2
    await page.locator('textarea[placeholder*="Enter attributes"]').fill('Test');
    await page.route('/api/ai/expand-attributes', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: '1',
            name: 'Test',
            definition: 'Test def',
            prompt: 'Extract test',
            type: 'text'
          }
        ])
      });
    });
    await page.locator('button:has-text("Expand with AI")').click();
    
    // Click edit button
    await page.locator('button[aria-label*="Edit"]').first().click();
    
    // Edit fields should be visible
    await expect(page.locator('input[placeholder="Attribute name"]')).toBeVisible();
    await expect(page.locator('textarea[placeholder="Definition"]')).toBeVisible();
  });

  test('should show file upload area in step 3', async ({ page }) => {
    // Navigate to step 3
    await page.locator('textarea[placeholder*="Enter attributes"]').fill('Test');
    await page.route('/api/ai/expand-attributes', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: '1', name: 'Test', definition: 'Test', prompt: 'Test', type: 'text' }])
      });
    });
    await page.locator('button:has-text("Expand with AI")').click();
    await page.locator('button:has-text("Continue")').click();
    
    // Check upload area
    await expect(page.locator('text=Click to upload')).toBeVisible();
    await expect(page.locator('text=PDF, Images, or Slide Decks')).toBeVisible();
  });
});

test.describe('PDF Document Chat Lab', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/labs/pdf-chat');
  });

  test('should load the PDF chat page', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    await expect(page.locator('h1')).toContainText('PDF Document Chat');
    await expect(page.locator('text=Upload PDFs and chat with your documents')).toBeVisible();
  });

  test('should show upload prompt when no documents', async ({ page }) => {
    await expect(page.locator('text=No documents uploaded yet')).toBeVisible();
    await expect(page.locator('button:has-text("Upload Documents")')).toBeVisible();
  });

  test('should have disabled input when no documents uploaded', async ({ page }) => {
    const input = page.locator('input[placeholder*="Upload documents to start"]');
    await expect(input).toBeVisible();
    await expect(input).toBeDisabled();
  });

  test('should show file upload button', async ({ page }) => {
    const uploadButton = page.locator('button[aria-label*="Upload"]').or(page.locator('button:has(svg.lucide-paperclip)'));
    await expect(uploadButton).toBeVisible();
    await expect(uploadButton).toBeEnabled();
  });

  test('should enable chat after file upload simulation', async ({ page }) => {
    // Simulate file upload by mocking the file input
    const fileInput = page.locator('input[type="file"]');
    
    // Create a test file
    const buffer = Buffer.from('test pdf content');
    const fileName = 'test.pdf';
    
    // Set files on the input
    await fileInput.setInputFiles({
      name: fileName,
      mimeType: 'application/pdf',
      buffer: buffer
    });
    
    // Check if document appears in the UI
    await expect(page.locator(`text=${fileName}`)).toBeVisible();
    
    // Input should now be enabled
    const chatInput = page.locator('input[placeholder*="Ask about your documents"]');
    await expect(chatInput).toBeEnabled();
  });

  test('should show bot welcome state after upload', async ({ page }) => {
    // Upload a file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles({
      name: 'test.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('test content')
    });
    
    // Should show ready state
    await expect(page.locator('text=Documents ready!')).toBeVisible();
    await expect(page.locator('text=Ask me anything about your uploaded documents')).toBeVisible();
  });

  test('should allow removing uploaded documents', async ({ page }) => {
    // Upload a file
    const fileInput = page.locator('input[type="file"]');
    const fileName = 'test.pdf';
    
    await fileInput.setInputFiles({
      name: fileName,
      mimeType: 'application/pdf',
      buffer: Buffer.from('test content')
    });
    
    // Document should be visible
    await expect(page.locator(`text=${fileName}`)).toBeVisible();
    
    // Click remove button
    await page.locator('button:has(svg.lucide-x)').first().click();
    
    // Document should be removed
    await expect(page.locator(`text=${fileName}`)).not.toBeVisible();
    await expect(page.locator('text=No documents uploaded yet')).toBeVisible();
  });
});

test.describe('PDF Labs Integration', () => {
  test('should list both PDF labs on the main labs page', async ({ page }) => {
    await page.goto('/labs');
    
    // Check for PDF Attribute Extraction
    await expect(page.locator('text=PDF Attribute Extraction')).toBeVisible();
    await expect(page.locator('text=Define attributes, upload PDFs')).toBeVisible();
    
    // Check for PDF Document Chat
    await expect(page.locator('text=PDF Document Chat')).toBeVisible();
    await expect(page.locator('text=Upload PDFs and have intelligent conversations')).toBeVisible();
  });

  test('should navigate to PDF extractor from labs index', async ({ page }) => {
    await page.goto('/labs');
    await page.locator('a[href="/labs/pdf-extractor"]').click();
    await expect(page).toHaveURL('/labs/pdf-extractor');
    await expect(page.locator('h1')).toContainText('PDF Attribute Extraction');
  });

  test('should navigate to PDF chat from labs index', async ({ page }) => {
    await page.goto('/labs');
    await page.locator('a[href="/labs/pdf-chat"]').click();
    await expect(page).toHaveURL('/labs/pdf-chat');
    await expect(page.locator('h1')).toContainText('PDF Document Chat');
  });

  test('PDF extractor should be marked as featured', async ({ page }) => {
    await page.goto('/labs');
    
    // The PDF extractor should be in the featured section
    const featuredSection = page.locator('text=FEATURED EXPERIENCES').locator('..');
    await expect(featuredSection.locator('text=PDF Attribute Extraction')).toBeVisible();
  });
});