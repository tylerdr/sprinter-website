import { test, expect } from '@playwright/test';

test.describe('AI Labs', () => {
  test('should display all lab demos', async ({ page }) => {
    await page.goto('/labs');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('AI Labs');
    
    // Check all 4 lab cards are displayed
    await expect(page.locator('text=Agent Simulator')).toBeVisible();
    await expect(page.locator('text=Workflow Designer')).toBeVisible();
    await expect(page.locator('text=Ideation Lab')).toBeVisible();
    await expect(page.locator('text=AI Sketch Studio')).toBeVisible();
  });

  test('Agent Simulator should work', async ({ page }) => {
    await page.goto('/labs/agent-simulator');
    
    // Check page loads
    await expect(page.locator('h1')).toContainText('Agent Simulator');
    
    // Check simulator interface exists
    await expect(page.locator('text=Define Mission')).toBeVisible();
    await expect(page.locator('textarea[placeholder*="Define the mission"]')).toBeVisible();
    
    // Test running an example
    await page.click('text=Run Example');
    
    // Wait for simulation to start
    await expect(page.locator('text=Processing')).toBeVisible();
    
    // Wait for simulation to complete (should show results)
    await expect(page.locator('text=Mission Complete')).toBeVisible({ timeout: 30000 });
  });

  test('Workflow Designer should load', async ({ page }) => {
    await page.goto('/labs/workflow-tool');
    
    // Check page loads without 404
    await expect(page.locator('h1')).toContainText('Workflow');
    await expect(page.locator('text=404')).not.toBeVisible();
  });

  test('Ideation Lab should load', async ({ page }) => {
    await page.goto('/labs/ideation');
    
    // Check page loads without 404
    await expect(page.locator('h1')).toContainText('Ideation Lab');
    await expect(page.locator('text=404')).not.toBeVisible();
    
    // Check game interface exists
    await expect(page.locator('text=Start Challenge')).toBeVisible();
  });

  test('AI Sketch Studio should load', async ({ page }) => {
    await page.goto('/labs/sketch-studio');
    
    // Check page loads without 404
    await expect(page.locator('h1')).toContainText('AI Sketch Studio');
    await expect(page.locator('text=404')).not.toBeVisible();
    
    // Check canvas or coming soon message
    const canvas = page.locator('canvas');
    const drawButton = page.locator('text=Draw');
    const isImplemented = await canvas.isVisible().catch(() => false) || await drawButton.isVisible().catch(() => false);
    
    if (!isImplemented) {
      // If not implemented, should show how it works
      await expect(page.locator('text=How it works')).toBeVisible();
    }
  });
});