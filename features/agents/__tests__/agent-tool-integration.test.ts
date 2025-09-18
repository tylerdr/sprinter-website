/**
 * Integration tests for agent-tool relationships
 * Testing the integration between agents and their tools
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAgentWithTools } from '../agent-loader';
import type { AgentWithTools, Tool } from '../types';

// Mock the entire registry module
vi.mock('../registry', () => ({
  agentRegistry: {
    getAgent: vi.fn(),
    getAllAgents: vi.fn(),
    registerAgent: vi.fn(),
    loadFromDatabase: vi.fn(),
  }
}));

// Mock tool registry
vi.mock('@/features/tools/registry', () => ({
  toolRegistry: {
    getTool: vi.fn(),
    getAllTools: vi.fn(),
    registerTool: vi.fn(),
  }
}));

// Mock Supabase client
const mockSupabaseClient = {
  from: vi.fn(),
};

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue(mockSupabaseClient),
}));

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

describe('Agent-Tool Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Agent with Tools Loading', () => {
    it('should load agent with all associated tools', async () => {
      const mockAgentData = {
        id: 'agent-123',
        slug: 'multi-tool-agent',
        name: 'Multi-Tool Agent',
        description: 'Agent with multiple tools',
        model: 'gpt-4',
        provider: 'openai',
        system_prompt: 'You have access to multiple tools',
        temperature: 0.7,
        max_tokens: 2000,
        max_tool_calls: 10,
        tools: ['calculator', 'web-search', 'database'],
        icon: '🛠️',
        badge: 'pro',
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
              slug: 'calculator',
              name: 'Calculator',
              description: 'Performs mathematical calculations',
              input_schema: {
                type: 'object',
                properties: {
                  expression: { type: 'string' }
                }
              },
              output_schema: {
                type: 'object',
                properties: {
                  result: { type: 'number' }
                }
              },
              execution_mode: 'server',
              is_active: true,
              is_system_tool: false,
              metadata: { version: '1.0' },
              status: 'active',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            }
          },
          {
            tool: {
              id: 'tool-2',
              slug: 'web-search',
              name: 'Web Search',
              description: 'Searches the web for information',
              input_schema: {
                type: 'object',
                properties: {
                  query: { type: 'string' }
                }
              },
              output_schema: {
                type: 'object',
                properties: {
                  results: { type: 'array' }
                }
              },
              execution_mode: 'server',
              is_active: true,
              is_system_tool: false,
              metadata: { api: 'google' },
              status: 'active',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            }
          },
          {
            tool: {
              id: 'tool-3',
              slug: 'database',
              name: 'Database Query',
              description: 'Queries the database',
              input_schema: {
                type: 'object',
                properties: {
                  sql: { type: 'string' }
                }
              },
              output_schema: {
                type: 'object',
                properties: {
                  rows: { type: 'array' }
                }
              },
              execution_mode: 'server',
              is_active: true,
              is_system_tool: true,
              metadata: { readonly: true },
              status: 'active',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-01T00:00:00Z',
            }
          }
        ]
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-123');

      expect(result).not.toBeNull();
      expect(result?.id).toBe('agent-123');
      expect(result?.availableTools).toHaveLength(3);
      
      // Verify tool details
      const tools = result?.availableTools || [];
      expect(tools[0].slug).toBe('calculator');
      expect(tools[1].slug).toBe('web-search');
      expect(tools[2].slug).toBe('database');
      
      // Verify tool properties
      expect(tools[0].executionMode).toBe('server');
      expect(tools[2].isSystemTool).toBe(true);
    });

    it('should handle agent with no tools', async () => {
      const mockAgentData = {
        id: 'agent-456',
        slug: 'no-tools-agent',
        name: 'No Tools Agent',
        model: 'gpt-3.5',
        provider: 'openai',
        agent_tools: []
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-456');

      expect(result).not.toBeNull();
      expect(result?.availableTools).toHaveLength(0);
    });

    it('should filter out inactive tools from agent', async () => {
      const mockAgentData = {
        id: 'agent-789',
        slug: 'mixed-tools-agent',
        name: 'Mixed Tools Agent',
        model: 'gpt-4',
        provider: 'openai',
        agent_tools: [
          {
            tool: {
              id: 'tool-active',
              slug: 'active-tool',
              name: 'Active Tool',
              is_active: true,
              status: 'active',
              execution_mode: 'server',
            }
          },
          {
            tool: {
              id: 'tool-inactive',
              slug: 'inactive-tool',
              name: 'Inactive Tool',
              is_active: false,
              status: 'inactive',
              execution_mode: 'server',
            }
          },
          {
            tool: {
              id: 'tool-disabled',
              slug: 'disabled-tool',
              name: 'Disabled Tool',
              is_active: true,
              status: 'disabled',
              execution_mode: 'server',
            }
          }
        ]
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-789');

      expect(result?.availableTools).toHaveLength(1);
      expect(result?.availableTools[0].slug).toBe('active-tool');
    });
  });

  describe('Tool Execution Modes', () => {
    it('should properly handle different execution modes', async () => {
      const mockAgentData = {
        id: 'agent-exec',
        slug: 'execution-test-agent',
        name: 'Execution Test Agent',
        model: 'gpt-4',
        provider: 'openai',
        agent_tools: [
          {
            tool: {
              id: 'server-tool',
              slug: 'server-tool',
              name: 'Server Tool',
              execution_mode: 'server',
              is_active: true,
              status: 'active',
            }
          },
          {
            tool: {
              id: 'client-tool',
              slug: 'client-tool',
              name: 'Client Tool',
              execution_mode: 'client',
              is_active: true,
              status: 'active',
            }
          },
          {
            tool: {
              id: 'hybrid-tool',
              slug: 'hybrid-tool',
              name: 'Hybrid Tool',
              execution_mode: 'hybrid',
              is_active: true,
              status: 'active',
            }
          }
        ]
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-exec');

      const tools = result?.availableTools || [];
      expect(tools).toHaveLength(3);
      
      const serverTool = tools.find(t => t.slug === 'server-tool');
      const clientTool = tools.find(t => t.slug === 'client-tool');
      const hybridTool = tools.find(t => t.slug === 'hybrid-tool');
      
      expect(serverTool?.executionMode).toBe('server');
      expect(clientTool?.executionMode).toBe('client');
      expect(hybridTool?.executionMode).toBe('hybrid');
    });
  });

  describe('Tool Metadata and Configuration', () => {
    it('should preserve tool metadata and configuration', async () => {
      const mockAgentData = {
        id: 'agent-meta',
        slug: 'metadata-test-agent',
        name: 'Metadata Test Agent',
        model: 'gpt-4',
        provider: 'openai',
        agent_tools: [
          {
            tool: {
              id: 'meta-tool',
              slug: 'meta-tool',
              name: 'Metadata Tool',
              description: 'Tool with rich metadata',
              input_schema: {
                type: 'object',
                properties: {
                  param1: { type: 'string', required: true },
                  param2: { type: 'number', default: 10 }
                }
              },
              output_schema: {
                type: 'object',
                properties: {
                  success: { type: 'boolean' },
                  data: { type: 'object' }
                }
              },
              execution_mode: 'server',
              is_active: true,
              is_system_tool: false,
              metadata: {
                version: '2.0',
                author: 'test-author',
                tags: ['test', 'metadata'],
                config: {
                  timeout: 5000,
                  retries: 3
                }
              },
              status: 'active',
              created_at: '2024-01-01T00:00:00Z',
              updated_at: '2024-01-02T00:00:00Z',
            }
          }
        ]
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-meta');

      const tool = result?.availableTools[0];
      expect(tool?.metadata).toEqual({
        version: '2.0',
        author: 'test-author',
        tags: ['test', 'metadata'],
        config: {
          timeout: 5000,
          retries: 3
        }
      });
      
      expect(tool?.inputSchema).toHaveProperty('properties.param1');
      expect(tool?.outputSchema).toHaveProperty('properties.success');
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: null,
          error: new Error('Database connection failed'),
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('error-agent');

      expect(result).toBeNull();
    });

    it('should handle malformed tool data', async () => {
      const mockAgentData = {
        id: 'agent-malformed',
        slug: 'malformed-agent',
        name: 'Malformed Agent',
        model: 'gpt-4',
        provider: 'openai',
        agent_tools: [
          {
            tool: null // Malformed tool data
          },
          {
            // Missing tool property
          },
          {
            tool: {
              // Missing required fields
              name: 'Incomplete Tool'
            }
          }
        ]
      };

      const mockQuery = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: mockAgentData,
          error: null,
        }),
      };

      mockSupabaseClient.from.mockReturnValue(mockQuery);
      mockQuery.eq.mockReturnThis();

      const result = await getAgentWithTools('agent-malformed');

      // Should handle gracefully and return agent without crashing
      expect(result).not.toBeNull();
      expect(result?.id).toBe('agent-malformed');
    });
  });
});