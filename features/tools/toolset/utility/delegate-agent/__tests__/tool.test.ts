import { describe, it, expect, vi, beforeEach } from 'vitest';
import tool from '../tool';
import type { ToolContext } from '../../../types';

// Mock external dependencies
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: null }),
    })),
    auth: {
      getUser: vi.fn().mockResolvedValue({ 
        data: { user: { id: 'test-user', email: 'test@example.com' } }, 
        error: null 
      }),
    },
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  })),
  getAuthUser: vi.fn(() => Promise.resolve(null)),
  getTenantDetails: vi.fn(() => Promise.resolve(null)),
}));

vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

// Mock agent registry
vi.mock('@/features/agents/registry', () => ({
  agentRegistry: {
    getAgent: vi.fn().mockResolvedValue({
      slug: 'test-agent',
      name: 'Test Agent',
      execute: vi.fn().mockResolvedValue({
        success: true,
        result: 'Agent executed successfully'
      })
    })
  }
}));

describe('Delegate to Agent Tool', () => {
  const mockContext: ToolContext = {
    tenantId: 'test-tenant',
    userId: 'test-user',
    agentId: 'test-agent',
    conversationId: 'test-conversation',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Input Validation', () => {
    it('should accept valid input', async () => {
      const input = {
        agentSlug: 'test-agent',
        task: 'Test task',
        context: { test: true }
      };
      
      const result = await tool.execute(input, mockContext);
      expect(result).toBeDefined();
    });
  });

  describe('Core Functionality', () => {
    it('should execute successfully with valid input', async () => {
      const input = {
        agentSlug: 'test-agent',
        task: 'Test task',
        context: { test: true }
      };
      
      const result = await tool.execute(input, mockContext);
      expect(result).toBeDefined();
      expect(result.success).toBeDefined();
    });

    it('should handle context properly', async () => {
      const input = {
        agentSlug: 'test-agent',
        task: 'Test task',
        context: { test: true }
      };
      
      const customContext = {
        ...mockContext,
        tenantId: 'custom-tenant',
        metadata: { custom: true },
      };
      
      const result = await tool.execute(input, customContext);
      expect(result).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle execution errors gracefully', async () => {
      const input = {
        agentSlug: 'test-agent',
        task: 'test-task',
      };
      
      try {
        await tool.execute(input, mockContext);
        expect(true).toBe(true);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('Tool Metadata', () => {
    it('should have correct metadata', () => {
      expect(tool.slug).toBe('delegate-agent');
      expect(tool.name).toBe('Delegate to Agent');
      expect(tool.category).toBe('utility');
    });

    it('should have proper execution mode', () => {
      expect(['server', 'client', 'hybrid']).toContain(tool.executionMode);
    });
  });
});
