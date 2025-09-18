/**
 * Unit tests for agent-loader.ts
 * Testing database interactions and data transformations
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAgents, getAgentBySlug, getAgentWithTools, getAgentsByTenant, updateAgent, createAgent } from '../agent-loader';
import type { Agent, AgentWithTools } from '../types';

// Mock Supabase client
const mockSupabaseClient = {
  from: vi.fn(),
};

// Mock the createClient function
vi.mock('@/utils/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue(mockSupabaseClient),
}));

// Mock React cache
vi.mock('react', () => ({
  cache: (fn: Function) => fn,
}));

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

// Mock statuses
vi.mock('@/lib/statuses', () => ({
  getStatusSlugById: vi.fn().mockResolvedValue('active'),
}));

describe('Agent Loader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAgents', () => {
    it('should fetch all active agents', async () => {
      const mockAgents = [
        {
          id: 'agent-1',
          slug: 'test-agent',
          name: 'Test Agent',
          description: 'Test description',
          model: 'gpt-4',
          provider: 'openai',
          system_prompt: 'You are a test agent',
          temperature: 0.7,
          max_tokens: 1000,
          max_tool_calls: 5,
          tools: ['tool1', 'tool2'],
          icon: '🤖',
          badge: 'test',
          status: 'active',
          is_active: true,
          is_system_agent: false,
          metadata: { test: true },
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z',
        },
      ];

      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({
          data: mockAgents,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);

      const result = await getAgents();

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('ai_agents');
      expect(mockQuery.select).toHaveBeenCalledWith('*');
      expect(mockQuery.eq).toHaveBeenCalledWith('is_active', true);
      expect(mockQuery.order).toHaveBeenCalledWith('name');
      
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        id: 'agent-1',
        slug: 'test-agent',
        name: 'Test Agent',
        temperature: 0.7,
        maxTokens: 1000,
        maxToolCalls: 5,
      });
    });

    it('should handle database errors gracefully', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Database error'),
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);

      const result = await getAgents();

      expect(result).toEqual([]);
    });

    it('should use default values for missing fields', async () => {
      const mockAgents = [
        {
          id: 'agent-2',
          slug: 'minimal-agent',
          name: 'Minimal Agent',
          model: 'gpt-3.5',
          provider: 'openai',
        },
      ];

      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({
          data: mockAgents,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);

      const result = await getAgents();

      expect(result[0]).toMatchObject({
        temperature: 0.7,
        maxTokens: null,
        maxToolCalls: 5,
        tools: [],
        icon: null,
        badge: null,
        status: 'active',
        isActive: true,
        isSystemAgent: false,
      });
    });
  });

  describe('getAgentBySlug', () => {
    it('should fetch a single agent by slug', async () => {
      const mockAgent = {
        id: 'agent-1',
        slug: 'test-agent',
        name: 'Test Agent',
        description: 'Test description',
        model: 'gpt-4',
        provider: 'openai',
        system_prompt: 'You are a test agent',
        temperature: 0.8,
        max_tokens: 2000,
        max_tool_calls: 10,
        tools: ['tool1'],
        icon: '🎯',
        badge: null,
        status: 'active',
        is_active: true,
        is_system_agent: true,
        metadata: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: mockAgent,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentBySlug('test-agent');

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('ai_agents');
      expect(mockQuery.select).toHaveBeenCalledWith('*');
      expect(mockQuery.eq).toHaveBeenCalledWith('slug', 'test-agent');
      expect(mockQuery.eq).toHaveBeenCalledWith('is_active', true);
      expect(mockQuery.single).toHaveBeenCalled();
      
      expect(result).toMatchObject({
        id: 'agent-1',
        slug: 'test-agent',
        name: 'Test Agent',
        temperature: 0.8,
        maxTokens: 2000,
        maxToolCalls: 10,
      });
    });

    it('should return null when agent not found', async () => {
      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Not found'),
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentBySlug('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getAgentWithTools', () => {
    it('should fetch agent with its tools', async () => {
      const mockAgentData = {
        id: 'agent-1',
        slug: 'test-agent',
        name: 'Test Agent',
        description: 'Test description',
        model: 'gpt-4',
        provider: 'openai',
        system_prompt: 'You are a test agent',
        temperature: 0.7,
        max_tokens: 1000,
        max_tool_calls: 5,
        tools: ['tool1'],
        icon: '🤖',
        badge: null,
        status: 'active',
        is_active: true,
        is_system_agent: false,
        metadata: {},
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
        agent_tools: [
          {
            tool: {
              id: 'tool-1',
              slug: 'test-tool',
              name: 'Test Tool',
              description: 'Test tool description',
              input_schema: { type: 'object' },
              output_schema: { type: 'object' },
              execution_mode: 'server',
              is_active: true,
              is_system_tool: false,
              metadata: {},
              status: 'active',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            },
          },
        ],
      };

      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-1');

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('ai_agents');
      expect(mockQuery.select).toHaveBeenCalledWith(expect.stringContaining('agent_tools'));
      expect(mockQuery.eq).toHaveBeenCalledWith('id', 'agent-1');
      expect(mockQuery.eq).toHaveBeenCalledWith('is_active', true);
      
      expect(result).not.toBeNull();
      expect(result?.availableTools).toHaveLength(1);
      expect(result?.availableTools[0]).toMatchObject({
        id: 'tool-1',
        slug: 'test-tool',
        name: 'Test Tool',
      });
    });

    it('should filter out inactive tools', async () => {
      const mockAgentData = {
        id: 'agent-1',
        slug: 'test-agent',
        name: 'Test Agent',
        model: 'gpt-4',
        provider: 'openai',
        agent_tools: [
          {
            tool: {
              id: 'tool-1',
              slug: 'active-tool',
              name: 'Active Tool',
              is_active: true,
              status: 'active',
            },
          },
          {
            tool: {
              id: 'tool-2',
              slug: 'inactive-tool',
              name: 'Inactive Tool',
              is_active: false,
              status: 'inactive',
            },
          },
        ],
      };

      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-1');

      expect(result?.availableTools).toHaveLength(1);
      expect(result?.availableTools[0].slug).toBe('active-tool');
    });
  });

  describe('getAgentsByTenant', () => {
    it('should fetch agents for a specific tenant', async () => {
      const mockAgents = [
        {
          id: 'agent-1',
          slug: 'tenant-agent',
          name: 'Tenant Agent',
          model: 'gpt-4',
          provider: 'openai',
          tenant_id: 123,
        },
      ];

      const mockQuery = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockResolvedValue({
          data: mockAgents,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentsByTenant(123);

      expect(mockQuery.eq).toHaveBeenCalledWith('tenant_id', 123);
      expect(mockQuery.eq).toHaveBeenCalledWith('is_active', true);
      expect(result).toHaveLength(1);
    });
  });

  describe('updateAgent', () => {
    it('should update an agent successfully', async () => {
      const updates = {
        name: 'Updated Agent',
        temperature: 0.9,
      };

      const updatedAgent = {
        id: 'agent-1',
        slug: 'test-agent',
        name: 'Updated Agent',
        model: 'gpt-4',
        provider: 'openai',
        temperature: 0.9,
      };

      const mockQuery = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: updatedAgent,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);

      const result = await updateAgent('agent-1', updates);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('ai_agents');
      expect(mockQuery.update).toHaveBeenCalledWith(updates);
      expect(mockQuery.eq).toHaveBeenCalledWith('id', 'agent-1');
      expect(result).toMatchObject({
        name: 'Updated Agent',
        temperature: 0.9,
      });
    });

    it('should return null on update error', async () => {
      const mockQuery = {
        update: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Update failed'),
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);

      const result = await updateAgent('agent-1', { name: 'Failed Update' });

      expect(result).toBeNull();
    });
  });

  describe('createAgent', () => {
    it('should create a new agent successfully', async () => {
      const newAgent = {
        slug: 'new-agent',
        name: 'New Agent',
        description: 'New agent description',
        model: 'gpt-4',
        provider: 'openai',
        temperature: 0.7,
        max_tokens: 1000,
        max_tool_calls: 5,
        tools: ['tool1'],
        icon: '🆕',
        badge: 'new',
        metadata: { isNew: true },
      };

      const createdAgent = {
        id: 'generated-id',
        ...newAgent,
        is_active: true,
        is_system_agent: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      };

      const mockQuery = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: createdAgent,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);

      const result = await createAgent(newAgent);

      expect(mockSupabaseClient.from).toHaveBeenCalledWith('ai_agents');
      expect(mockQuery.insert).toHaveBeenCalled();
      expect(result).toMatchObject({
        id: 'generated-id',
        slug: 'new-agent',
        name: 'New Agent',
      });
    });

    it('should handle creation errors', async () => {
      const mockQuery = {
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Duplicate slug'),
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);

      const result = await createAgent({
        slug: 'duplicate',
        name: 'Duplicate Agent',
        model: 'gpt-4',
        provider: 'openai',
      });

      expect(result).toBeNull();
    });
  });
});