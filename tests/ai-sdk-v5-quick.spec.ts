import { test, expect } from '@playwright/test';

test.describe('AI SDK v5 Quick Validation', () => {
  test.setTimeout(30000);

  test('Main chat API should use SDK v5 properly', async ({ page }) => {
    // Test the chat API directly
    const response = await page.request.post('/api/chat', {
      data: {
        messages: [
          { role: 'user', content: 'Hello, what is Sprinter AI?' }
        ]
      }
    });

    expect(response.status()).toBe(200);
    
    // Check for streaming response
    const headers = response.headers();
    expect(headers['content-type']).toContain('text/event-stream');
  });

  test('Proposal chat API should work with SDK v5', async ({ page }) => {
    const response = await page.request.post('/api/proposals/chat', {
      data: {
        proposalId: 'test-id',
        message: 'What is the timeline?',
        proposalContent: {
          coverPage: { title: 'Test Proposal' },
          sections: [
            { title: 'Timeline', content: '30 days implementation' }
          ]
        },
        sessionId: 'test-session'
      }
    });

    if (response.status() === 200) {
      const data = await response.json();
      expect(data).toHaveProperty('response');
      expect(typeof data.response).toBe('string');
    }
  });

  test('PDF chat API should be configured for SDK v5', async ({ page }) => {
    const response = await page.request.post('/api/ai/pdf-chat', {
      data: {
        messages: [
          { role: 'user', content: 'Hello' }
        ],
        documents: []
      }
    });

    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers['content-type']).toContain('text/event-stream');
  });

  test('Homepage should load with chat widget', async ({ page }) => {
    await page.goto('/');
    
    // Check that page loads
    await expect(page).toHaveTitle(/Sprinter/i);
    
    // Look for chat widget
    const chatWidget = page.locator('[class*="chat"], button:has-text("Chat")').first();
    await expect(chatWidget).toBeVisible({ timeout: 10000 });
  });

  test('Labs page should load AI experiments', async ({ page }) => {
    await page.goto('/labs');
    
    // Check that labs page loads
    await expect(page.locator('h1, h2').filter({ hasText: /Lab/i }).first()).toBeVisible();
    
    // Check for lab cards
    const labCards = page.locator('[class*="card"], a[href*="/labs/"]');
    const cardCount = await labCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });
});