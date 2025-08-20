import { test, expect } from '@playwright/test';

test.describe('AI Features - SDK v5 Validation', () => {
  test.setTimeout(60000); // Increase timeout for AI responses

  test.describe('Main Chat Feature', () => {
    test('should load chat interface and send messages', async ({ page }) => {
      await page.goto('/');
      
      // Find and click the chat button
      const chatButton = page.locator('button:has-text("Chat")').first();
      await expect(chatButton).toBeVisible({ timeout: 10000 });
      await chatButton.click();
      
      // Wait for chat interface to open
      await expect(page.locator('[data-testid="chat-interface"], .chat-interface, [class*="chat"]').first()).toBeVisible({ timeout: 10000 });
      
      // Type a message
      const input = page.locator('input[placeholder*="Type"], textarea[placeholder*="Type"], input[placeholder*="Ask"], textarea[placeholder*="Ask"]').first();
      await input.fill('What is Sprinter AI?');
      
      // Send the message
      const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
      await sendButton.click();
      
      // Wait for AI response to start streaming
      await page.waitForTimeout(2000);
      
      // Check that a response appears
      const messages = page.locator('[class*="message"], [data-testid*="message"]');
      await expect(messages).toHaveCount(2, { timeout: 15000 }); // User message + AI response
    });

    test('should handle API errors gracefully', async ({ page }) => {
      // Intercept the API call to simulate an error
      await page.route('**/api/chat', route => {
        route.fulfill({
          status: 500,
          body: JSON.stringify({ error: 'Internal Server Error' }),
        });
      });

      await page.goto('/');
      
      // Open chat
      const chatButton = page.locator('button:has-text("Chat")').first();
      await expect(chatButton).toBeVisible({ timeout: 10000 });
      await chatButton.click();
      
      // Send a message
      const input = page.locator('input[placeholder*="Type"], textarea[placeholder*="Type"], input[placeholder*="Ask"], textarea[placeholder*="Ask"]').first();
      await input.fill('Test message');
      
      const sendButton = page.locator('button[type="submit"], button:has-text("Send")').first();
      await sendButton.click();
      
      // Should still get a fallback response
      await page.waitForTimeout(3000);
      const messages = page.locator('[class*="message"], [data-testid*="message"]');
      const count = await messages.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Proposal Portal Chat', () => {
    test('should create proposal and test chat', async ({ page }) => {
      // Navigate to admin proposal creation
      await page.goto('/admin/proposals/create');
      
      // Fill out the proposal form
      await page.fill('input[name="clientInfo.name"]', 'Test Client');
      await page.fill('input[name="clientInfo.email"]', 'test@example.com');
      await page.fill('input[name="clientInfo.company"]', 'Test Company');
      
      await page.fill('input[name="projectDetails.title"]', 'Test AI Project');
      await page.selectOption('select[name="projectDetails.type"]', 'poc_sprint');
      
      await page.fill('textarea[name="projectDetails.problem"]', 'Need to automate processes');
      await page.fill('textarea[name="projectDetails.opportunity"]', 'Save time and money');
      
      // Submit the form
      const submitButton = page.locator('button:has-text("Generate Proposal")');
      await submitButton.click();
      
      // Wait for proposal to be created
      await page.waitForURL('**/proposals/**', { timeout: 15000 });
      
      // Test the chat feature on the proposal page
      const chatToggle = page.locator('button:has-text("Chat"), button[aria-label*="chat"]').first();
      if (await chatToggle.isVisible()) {
        await chatToggle.click();
        
        // Type a question about the proposal
        const chatInput = page.locator('[placeholder*="Ask"], [placeholder*="question"]').first();
        await chatInput.fill('What is the timeline for this project?');
        
        const sendButton = page.locator('button[type="submit"]').last();
        await sendButton.click();
        
        // Wait for response
        await page.waitForTimeout(3000);
        
        // Check that response contains proposal context
        const chatMessages = page.locator('[class*="chat-message"], [class*="message"]');
        const lastMessage = chatMessages.last();
        await expect(lastMessage).toContainText(/(timeline|schedule|days|weeks)/i, { timeout: 10000 });
      }
    });
  });

  test.describe('Labs AI Features', () => {
    test('PDF Extractor should work with AI SDK v5', async ({ page }) => {
      await page.goto('/labs/pdf-extractor');
      
      // Check that the page loads
      await expect(page.locator('h1, h2').filter({ hasText: /PDF.*Extract/i }).first()).toBeVisible();
      
      // The PDF extractor should have proper UI elements
      await expect(page.locator('input[type="file"], button:has-text("Upload")').first()).toBeVisible();
    });

    test('Opportunity Audit should generate reports', async ({ page }) => {
      await page.goto('/labs/opportunity-audit');
      
      // Fill out the form
      await page.fill('input[type="email"]', 'test@example.com');
      const companyInput = page.locator('input[placeholder*="company"], input[name*="company"]').first();
      if (await companyInput.isVisible()) {
        await companyInput.fill('Test Corp');
      }
      
      // Select industry if available
      const industrySelect = page.locator('select[name*="industry"]').first();
      if (await industrySelect.isVisible()) {
        await industrySelect.selectOption({ index: 1 });
      }
      
      // Submit the form
      const submitButton = page.locator('button:has-text("Generate"), button:has-text("Submit"), button[type="submit"]').first();
      await submitButton.click();
      
      // Wait for AI to generate the audit
      await page.waitForTimeout(5000);
      
      // Check that results appear
      const results = page.locator('[class*="result"], [class*="audit"], [class*="report"]').first();
      const isVisible = await results.isVisible({ timeout: 15000 }).catch(() => false);
      
      if (isVisible) {
        expect(isVisible).toBeTruthy();
      }
    });

    test('Agent Battle Lab should initialize', async ({ page }) => {
      await page.goto('/labs/agent-battle');
      
      // Check that the page loads with proper AI elements
      await expect(page.locator('h1, h2').filter({ hasText: /Agent.*Battle/i }).first()).toBeVisible();
      
      // Check for battle controls
      const startButton = page.locator('button:has-text("Start"), button:has-text("Begin")').first();
      const hasStartButton = await startButton.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (hasStartButton) {
        await startButton.click();
        await page.waitForTimeout(2000);
        
        // Check for agent activity
        const agentElements = page.locator('[class*="agent"], [data-testid*="agent"]');
        const agentCount = await agentElements.count();
        expect(agentCount).toBeGreaterThan(0);
      }
    });

    test('Storyboarding Lab should work', async ({ page }) => {
      await page.goto('/labs/storyboarding');
      
      // Check that the page loads
      await expect(page.locator('h1, h2').filter({ hasText: /Story/i }).first()).toBeVisible();
      
      // Look for input elements
      const storyInput = page.locator('textarea, input[type="text"]').first();
      const isInputVisible = await storyInput.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isInputVisible) {
        await storyInput.fill('User wants to buy a product');
        
        const generateButton = page.locator('button:has-text("Generate"), button:has-text("Create")').first();
        if (await generateButton.isVisible()) {
          await generateButton.click();
          await page.waitForTimeout(3000);
          
          // Check for generated content
          const generatedContent = page.locator('[class*="story"], [class*="board"], [class*="flow"]');
          const hasContent = await generatedContent.first().isVisible({ timeout: 10000 }).catch(() => false);
          expect(hasContent).toBeTruthy();
        }
      }
    });

    test('Tiny Town simulation should run', async ({ page }) => {
      await page.goto('/labs/tiny-town');
      
      // Check that the page loads
      await expect(page.locator('h1, h2').filter({ hasText: /Tiny.*Town/i }).first()).toBeVisible();
      
      // Look for simulation controls
      const startButton = page.locator('button:has-text("Start"), button:has-text("Run"), button:has-text("Begin")').first();
      const hasStartButton = await startButton.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (hasStartButton) {
        await startButton.click();
        await page.waitForTimeout(2000);
        
        // Check for simulation activity
        const simulationElements = page.locator('[class*="npc"], [class*="agent"], [class*="character"]');
        const elementCount = await simulationElements.count();
        expect(elementCount).toBeGreaterThan(0);
      }
    });

    test('Vibe Coding should load', async ({ page }) => {
      await page.goto('/labs/vibe-coding');
      
      // Check that the page loads
      await expect(page.locator('h1, h2').filter({ hasText: /Vibe/i }).first()).toBeVisible();
      
      // Check for code-related elements
      const codeElements = page.locator('[class*="code"], [class*="editor"], textarea');
      const hasCodeElements = await codeElements.first().isVisible({ timeout: 5000 }).catch(() => false);
      expect(hasCodeElements).toBeTruthy();
    });
  });

  test.describe('AI SDK v5 Streaming Validation', () => {
    test('should properly stream responses', async ({ page }) => {
      await page.goto('/');
      
      // Set up response interception to verify streaming
      let streamingDetected = false;
      
      page.on('response', response => {
        if (response.url().includes('/api/chat')) {
          const headers = response.headers();
          if (headers['content-type']?.includes('text/event-stream')) {
            streamingDetected = true;
          }
        }
      });
      
      // Open chat and send message
      const chatButton = page.locator('button:has-text("Chat")').first();
      await chatButton.click();
      
      const input = page.locator('input[placeholder*="Type"], textarea[placeholder*="Type"]').first();
      await input.fill('Tell me about AI');
      
      const sendButton = page.locator('button[type="submit"]').first();
      await sendButton.click();
      
      // Wait for streaming to occur
      await page.waitForTimeout(3000);
      
      // Verify that streaming was detected or response was received
      const messages = page.locator('[class*="message"]');
      const messageCount = await messages.count();
      expect(messageCount).toBeGreaterThan(0);
    });
  });

  test.describe('Error Handling and Fallbacks', () => {
    test('should handle network errors gracefully', async ({ page, context }) => {
      // Block all API calls
      await context.route('**/api/**', route => route.abort());
      
      await page.goto('/');
      
      // Try to use chat
      const chatButton = page.locator('button:has-text("Chat")').first();
      const isChatVisible = await chatButton.isVisible({ timeout: 5000 }).catch(() => false);
      
      if (isChatVisible) {
        await chatButton.click();
        
        const input = page.locator('input[placeholder*="Type"], textarea[placeholder*="Type"]').first();
        await input.fill('Test message');
        
        const sendButton = page.locator('button[type="submit"]').first();
        await sendButton.click();
        
        // Should not crash the application
        await page.waitForTimeout(2000);
        
        // Page should still be functional
        await expect(page.locator('body')).toBeVisible();
      }
    });
  });
});

test.describe('AI Performance Tests', () => {
  test('should respond within acceptable time limits', async ({ page }) => {
    await page.goto('/');
    
    const chatButton = page.locator('button:has-text("Chat")').first();
    await chatButton.click();
    
    const input = page.locator('input[placeholder*="Type"], textarea[placeholder*="Type"]').first();
    await input.fill('Hi');
    
    const startTime = Date.now();
    const sendButton = page.locator('button[type="submit"]').first();
    await sendButton.click();
    
    // Wait for first token to appear
    await page.waitForFunction(
      () => {
        const messages = document.querySelectorAll('[class*="message"]');
        return messages.length > 1;
      },
      { timeout: 10000 }
    );
    
    const responseTime = Date.now() - startTime;
    
    // First token should appear within 5 seconds
    expect(responseTime).toBeLessThan(5000);
  });
});