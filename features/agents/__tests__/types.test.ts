/**
 * Unit tests for agent types
 * Testing type definitions and type guards
 */

import { describe, it, expect } from 'vitest';
import type {
  AgentAIConfig,
  AgentUIConfig,
  AgentConfig,
  AgentContext,
  AgentExecutionResult,
  DatabaseAgent,
  AgentToolRelation,
  Agent,
  AgentWithTools,
  Tool
} from '../types';

describe('Agent Types', () => {
  describe('AgentAIConfig', () => {
    it('should accept valid AI configuration', () => {
      const validConfig: AgentAIConfig = {
        temperature: 0.7,
        max_tokens: 1000,
        max_tool_calls: 5,
        top_p: 0.9,
        frequency_penalty: 0.5,
        presence_penalty: 0.3,
        custom_field: 'allowed'
      };

      expect(validConfig.temperature).toBe(0.7);
      expect(validConfig.max_tokens).toBe(1000);
      expect(validConfig.max_tool_calls).toBe(5);
    });

    it('should allow partial configuration', () => {
      const partialConfig: AgentAIConfig = {
        temperature: 0.5
      };

      expect(partialConfig.temperature).toBe(0.5);
      expect(partialConfig.max_tokens).toBeUndefined();
    });

    it('should allow custom fields', () => {
      const configWithCustom: AgentAIConfig = {
        temperature: 0.7,
        custom_provider_field: 'value',
        another_custom: 123
      };

      expect(configWithCustom.custom_provider_field).toBe('value');
      expect(configWithCustom.another_custom).toBe(123);
    });
  });

  describe('AgentConfig', () => {
    it('should have required fields', () => {
      const agent: AgentConfig = {
        id: 'test-id',
        slug: 'test-slug',
        name: 'Test Agent',
        model: 'gpt-4',
        provider: 'openai' as any
      };

      expect(agent.id).toBe('test-id');
      expect(agent.slug).toBe('test-slug');
      expect(agent.name).toBe('Test Agent');
    });

    it('should accept optional fields', () => {
      const agent: AgentConfig = {
        id: 'test-id',
        slug: 'test-slug',
        name: 'Test Agent',
        description: 'A test agent',
        category: 'specialist',
        model: 'gpt-4',
        temperature: 0.8,
        maxOutputTokens: 2000,
        providerOptions: { stream: true },
        tools: ['tool1', 'tool2'],
        systemPrompt: 'You are a helpful assistant',
        maxSteps: 10,
        isActive: true,
        tenantId: 123,
        icon: '🤖',
        metadata: {
          suggestedPrompts: ['Hello', 'How are you?'],
          customField: 'value'
        },
        provider: 'openai' as any
      };

      expect(agent.description).toBe('A test agent');
      expect(agent.category).toBe('specialist');
      expect(agent.tools).toHaveLength(2);
      expect(agent.metadata?.suggestedPrompts).toHaveLength(2);
    });
  });

  describe('AgentContext', () => {
    it('should have required messages array', () => {
      const context: AgentContext = {
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi there!' }
        ]
      };

      expect(context.messages).toHaveLength(2);
    });

    it('should accept optional context fields', () => {
      const context: AgentContext = {
        messages: [],
        variables: { key: 'value' },
        tenantId: 123,
        userId: 'user-123',
        sessionId: 'session-456',
        metadata: { custom: true }
      };

      expect(context.variables?.key).toBe('value');
      expect(context.tenantId).toBe(123);
      expect(context.userId).toBe('user-123');
    });
  });

  describe('AgentExecutionResult', () => {
    it('should handle successful execution', () => {
      const result: AgentExecutionResult = {
        agentId: 'agent-123',
        success: true,
        response: 'Task completed successfully',
        toolResults: [{ tool: 'calculator', result: 42 }],
        duration: 1500
      };

      expect(result.success).toBe(true);
      expect(result.response).toBeDefined();
      expect(result.toolResults).toHaveLength(1);
      expect(result.error).toBeUndefined();
    });

    it('should handle failed execution', () => {
      const result: AgentExecutionResult = {
        agentId: 'agent-123',
        success: false,
        error: 'Something went wrong',
        duration: 500
      };

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.response).toBeUndefined();
    });
  });

  describe('DatabaseAgent', () => {
    it('should match database schema', () => {
      const dbAgent: DatabaseAgent = {
        id: 'uuid-123',
        slug: 'test-agent',
        name: 'Test Agent',
        description: 'A test agent',
        provider: 'openai',
        model: 'gpt-4',
        system_prompt: 'You are helpful',
        status_id: 1,
        is_active: true,
        tags: ['tag1', 'tag2'],
        ai_config: {
          temperature: 0.7,
          max_tokens: 1000
        },
        ui_config: {
          icon: '🤖',
          theme: 'dark'
        },
        metadata: { custom: true },
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      expect(dbAgent.id).toBe('uuid-123');
      expect(dbAgent.tags).toHaveLength(2);
      expect(dbAgent.ai_config).toBeDefined();
    });

    it('should allow null values for optional fields', () => {
      const dbAgent: DatabaseAgent = {
        id: 'uuid-123',
        slug: 'minimal',
        name: 'Minimal Agent',
        description: null,
        provider: 'anthropic',
        model: 'claude-3',
        system_prompt: null,
        status_id: null,
        is_active: null,
        tags: null,
        ai_config: null,
        ui_config: null,
        metadata: null,
        created_at: null,
        updated_at: null
      };

      expect(dbAgent.description).toBeNull();
      expect(dbAgent.system_prompt).toBeNull();
    });
  });

  describe('Agent', () => {
    it('should have all required fields', () => {
      const agent: Agent = {
        id: 'agent-123',
        slug: 'test-agent',
        name: 'Test Agent',
        description: 'Description',
        model: 'gpt-4',
        provider: 'openai',
        systemPrompt: 'System prompt',
        temperature: 0.7,
        maxTokens: 1000,
        maxToolCalls: 5,
        tools: ['tool1'],
        icon: '🤖',
        badge: 'pro',
        status: 'active',
        isActive: true,
        isSystemAgent: false,
        metadata: {},
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      };

      expect(agent.id).toBe('agent-123');
      expect(agent.isActive).toBe(true);
      expect(agent.isSystemAgent).toBe(false);
    });

    it('should allow null values for optional fields', () => {
      const agent: Agent = {
        id: 'agent-123',
        slug: 'test-agent',
        name: 'Test Agent',
        description: null,
        model: 'gpt-4',
        provider: 'openai',
        systemPrompt: null,
        temperature: 0.7,
        maxTokens: null,
        maxToolCalls: 5,
        tools: [],
        icon: null,
        badge: null,
        status: 'active',
        isActive: true,
        isSystemAgent: false,
        metadata: {},
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      };

      expect(agent.description).toBeNull();
      expect(agent.systemPrompt).toBeNull();
      expect(agent.icon).toBeNull();
    });
  });

  describe('AgentWithTools', () => {
    it('should extend Agent with availableTools', () => {
      const agentWithTools: AgentWithTools = {
        id: 'agent-123',
        slug: 'test-agent',
        name: 'Test Agent',
        description: null,
        model: 'gpt-4',
        provider: 'openai',
        systemPrompt: 'System prompt',
        temperature: 0.7,
        maxTokens: 1000,
        maxToolCalls: 5,
        tools: ['tool1'],
        icon: '🤖',
        badge: null,
        status: 'active',
        isActive: true,
        isSystemAgent: false,
        metadata: {},
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        availableTools: [
          {
            id: 'tool-1',
            slug: 'calculator',
            name: 'Calculator',
            description: 'Performs calculations',
            inputSchema: { type: 'object' },
            outputSchema: { type: 'object' },
            executionMode: 'server',
            isActive: true,
            isSystemTool: false,
            metadata: {},
            status: 'active',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z'
          }
        ]
      };

      expect(agentWithTools.availableTools).toHaveLength(1);
      expect(agentWithTools.availableTools[0].slug).toBe('calculator');
    });
  });

  describe('Tool', () => {
    it('should have all required fields', () => {
      const tool: Tool = {
        id: 'tool-123',
        slug: 'test-tool',
        name: 'Test Tool',
        description: 'A test tool',
        inputSchema: {
          type: 'object',
          properties: {
            input: { type: 'string' }
          }
        },
        outputSchema: {
          type: 'object',
          properties: {
            output: { type: 'string' }
          }
        },
        executionMode: 'server',
        isActive: true,
        isSystemTool: false,
        metadata: { version: '1.0' },
        status: 'active',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      };

      expect(tool.id).toBe('tool-123');
      expect(tool.executionMode).toBe('server');
      expect(tool.isSystemTool).toBe(false);
    });

    it('should allow null description', () => {
      const tool: Tool = {
        id: 'tool-123',
        slug: 'test-tool',
        name: 'Test Tool',
        description: null,
        inputSchema: {},
        outputSchema: {},
        executionMode: 'client',
        isActive: true,
        isSystemTool: true,
        metadata: {},
        status: 'beta',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
      };

      expect(tool.description).toBeNull();
      expect(tool.executionMode).toBe('client');
    });
  });

  describe('AgentToolRelation', () => {
    it('should represent agent-tool relationship', () => {
      const relation: AgentToolRelation = {
        agent_id: 'agent-123',
        tool_id: 'tool-456',
        is_enabled: true,
        config: { priority: 1 },
        metadata: { addedBy: 'admin' },
        created_at: '2024-01-01T00:00:00Z'
      };

      expect(relation.agent_id).toBe('agent-123');
      expect(relation.tool_id).toBe('tool-456');
      expect(relation.is_enabled).toBe(true);
    });

    it('should allow null values for optional fields', () => {
      const relation: AgentToolRelation = {
        agent_id: 'agent-123',
        tool_id: 'tool-456',
        is_enabled: null,
        config: null,
        metadata: null,
        created_at: null
      };

      expect(relation.is_enabled).toBeNull();
      expect(relation.config).toBeNull();
    });
  });
});