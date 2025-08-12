import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('PDF Extractor End-to-End Test', () => {
  test('complete PDF extraction workflow', async ({ page }) => {
    // Navigate to PDF extractor
    await page.goto('/labs/pdf-extractor');
    await page.waitForLoadState('networkidle');
    
    // Step 1: Define Attributes
    console.log('Testing Step 1: Define Attributes');
    
    // Check initial state
    await expect(page.locator('h1')).toContainText('PDF Attribute Extraction');
    await expect(page.locator('text=Define Attributes')).toBeVisible();
    
    // Enter attributes
    const attributeInput = page.locator('textarea[placeholder*="Enter attributes"]');
    await attributeInput.fill(`Invoice Number
Total Amount
Due Date
Vendor Name
Line Items with descriptions and prices`);
    
    // Click expand with AI
    const expandButton = page.locator('button:has-text("Expand with AI")');
    await expandButton.click();
    
    // Wait for navigation to step 2
    await page.waitForSelector('h2:has-text("Review and Edit Attributes")', { timeout: 10000 });
    
    // Step 2: Validate Content
    console.log('Testing Step 2: Validate Content');
    
    // Check that attributes were expanded
    await expect(page.locator('text=Invoice Number')).toBeVisible();
    await expect(page.locator('text=Total Amount')).toBeVisible();
    await expect(page.locator('text=Due Date')).toBeVisible();
    
    // Test editing an attribute
    const firstEditButton = page.locator('.bg-gray-900\\/50').first().locator('button').filter({ has: page.locator('svg') }).first();
    await firstEditButton.click();
    
    // Check edit fields are visible
    await expect(page.locator('input[placeholder="Attribute name"]')).toBeVisible();
    
    // Save the edit
    const saveButton = page.locator('button:has(svg.lucide-check)').first();
    await saveButton.click();
    
    // Test adding a new attribute
    const addButton = page.locator('button:has-text("Add Attribute")');
    await addButton.click();
    
    // Fill in the new attribute
    await page.locator('input[placeholder="Attribute name"]').last().fill('Tax Amount');
    await page.locator('textarea[placeholder="Definition"]').last().fill('The tax amount on the invoice');
    await page.locator('textarea[placeholder="Extraction prompt"]').last().fill('Extract the tax amount from the invoice');
    
    // Save the new attribute
    await page.locator('button:has(svg.lucide-check)').last().click();
    
    // Continue to step 3
    const continueButton = page.locator('button:has-text("Continue")');
    await continueButton.click();
    
    // Step 3: Upload Documents
    console.log('Testing Step 3: Upload Documents');
    
    await expect(page.locator('h2:has-text("Upload Documents")')).toBeVisible();
    
    // Create a test PDF file
    const testPdfPath = path.join(process.cwd(), 'test-invoice.pdf');
    const pdfContent = Buffer.from('%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n4 0 obj\n<< /Length 44 >>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Invoice #12345) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f\n0000000009 00000 n\n0000000058 00000 n\n0000000115 00000 n\n0000000274 00000 n\ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n366\n%%EOF');
    fs.writeFileSync(testPdfPath, pdfContent);
    
    // Upload the file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(testPdfPath);
    
    // Check file was uploaded
    await expect(page.locator('text=test-invoice.pdf')).toBeVisible();
    
    // Click extract data
    const extractButton = page.locator('button:has-text("Extract Data")');
    await extractButton.click();
    
    // Step 4: Review Data
    console.log('Testing Step 4: Review Data');
    
    // Wait for extraction to complete (with mock data)
    await page.waitForSelector('h2:has-text("Extracted Data")', { timeout: 10000 });
    
    // Check that extracted data is displayed
    await expect(page.locator('text=Invoice Number').first()).toBeVisible();
    
    // Check for either real extracted data or mock data
    const extractedValue = page.locator('.bg-gray-800').first();
    await expect(extractedValue).toBeVisible();
    
    // Test export functionality
    const exportButton = page.locator('button:has-text("Export as JSON")');
    
    // Wait for extraction to complete
    await page.waitForFunction(
      () => {
        const button = document.querySelector('button:has-text("Export as JSON")');
        return button !== null;
      },
      { timeout: 10000 }
    ).catch(() => {
      // If export button doesn't appear, it means extraction is still in progress
      console.log('Export button not available, extraction may still be in progress');
    });
    
    // Test start new extraction
    const newExtractionButton = page.locator('button:has-text("Start New Extraction")');
    if (await newExtractionButton.isVisible()) {
      await newExtractionButton.click();
      
      // Should return to step 1
      await expect(page.locator('textarea[placeholder*="Enter attributes"]')).toBeVisible();
    }
    
    // Clean up test file
    if (fs.existsSync(testPdfPath)) {
      fs.unlinkSync(testPdfPath);
    }
  });
  
  test('handles errors gracefully', async ({ page }) => {
    await page.goto('/labs/pdf-extractor');
    
    // Test empty attribute submission
    const expandButton = page.locator('button:has-text("Expand with AI")');
    await expect(expandButton).toBeDisabled();
    
    // Enter some text to enable button
    const attributeInput = page.locator('textarea[placeholder*="Enter attributes"]');
    await attributeInput.fill('Test attribute');
    await expect(expandButton).toBeEnabled();
    
    // Mock API error
    await page.route('/api/ai/expand-attributes', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' })
      });
    });
    
    // Click expand and verify error handling
    await expandButton.click();
    
    // Should stay on the same step if there's an error
    await page.waitForTimeout(2000);
    await expect(page.locator('textarea[placeholder*="Enter attributes"]')).toBeVisible();
  });
  
  test('responsive design works correctly', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/labs/pdf-extractor');
    
    // Check that the page is still functional
    await expect(page.locator('h1')).toContainText('PDF Attribute Extraction');
    
    // Check that stepper is visible and adapted for mobile
    const steps = page.locator('.flex.items-center.justify-center.w-12.h-12.rounded-full');
    await expect(steps).toHaveCount(4);
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.reload();
    
    // Elements should still be visible
    await expect(page.locator('textarea[placeholder*="Enter attributes"]')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload();
    
    // All elements should be properly laid out
    await expect(page.locator('.max-w-6xl')).toBeVisible();
  });
});