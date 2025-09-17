import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';
import { google } from '@ai-sdk/google';
import {
  streamText,
  generateText,
  convertToModelMessages,
  UIMessage,
  Tool
} from 'ai';
import { 
  AgentConfig, 
  AgentContext, 
  AgentResponse,
  Thread,
  Message,
  ToolCall
} from './types';
import { getAgentById, getAgentForContext } from './registry';
import { getTools } from '../tools';
import { createClient } from '@/lib/supabase/client';

export class AgentManager {
  private context: AgentContext;
  private agent: AgentConfig;
  private tools: Map<string, Tool>;
  private supabase: any;

  constructor(context: AgentContext) {
    this.context = context;
    this.agent = getAgentById(context.agentId) || getAgentForContext({
      isAdmin: context.isAdmin,
      pageSection: context.pageContext?.section,
      userIntent: undefined
    });
    this.tools = this.loadToolsForAgent();
    this.supabase = createClient();
  }

  private loadToolsForAgent(): Map<string, Tool> {
    const agentTools = getTools({
      isAdmin: this.context.isAdmin,
      capabilities: this.agent.capabilities,
      agentId: this.agent.id
    });
    
    return new Map(agentTools.map((tool: any) => [(tool as any).name || 'unknown', tool]));
  }

  private getModel() {
    const modelString = this.agent.model;
    
    if (modelString.startsWith('gpt')) {
      return openai(modelString);
    } else if (modelString.startsWith('claude')) {
      return anthropic(modelString);
    } else if (modelString.includes('gemini')) {
      return google(modelString);
    }
    
    // Default fallback
    return openai('gpt-4o-mini');
  }

  async streamResponse(messages: UIMessage[]) {
    try {
      // Load conversation history if threadId exists
      const history = await this.loadThreadHistory();
      
      // Build system prompt with context
      const systemPrompt = this.buildSystemPrompt();
      
      // Convert tools to AI SDK format
      const tools: Record<string, Tool> = {};
      this.tools.forEach((tool, name) => {
        tools[name] = tool;
      });

      // Convert history to UIMessage format
      const historyUIMessages: UIMessage[] = history.map(msg => ({
        id: msg.id,
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
        parts: [],
        data: msg.toolCalls
      }));

      // Stream the response
      const result = streamText({
        model: this.getModel(),
        system: systemPrompt,
        messages: convertToModelMessages([...historyUIMessages, ...messages]),
        tools,
        temperature: this.agent.temperature || 0.7,
      });

      // Save to thread
      this.saveToThread(messages, result);
      
      return result;
    } catch (error) {
      console.error('Agent stream error:', error);
      throw error;
    }
  }

  async generateResponse(prompt: string): Promise<AgentResponse> {
    try {
      const systemPrompt = this.buildSystemPrompt();
      
      // Convert tools to AI SDK format
      const tools: Record<string, Tool> = {};
      this.tools.forEach((tool, name) => {
        tools[name] = tool;
      });

      const result = await generateText({
        model: this.getModel(),
        system: systemPrompt,
        prompt,
        tools,
        temperature: this.agent.temperature || 0.7,
      });

      // Extract tool calls if any
      const toolCalls: ToolCall[] = [];
      if (result.toolCalls && result.toolCalls.length > 0) {
        for (const call of result.toolCalls) {
          toolCalls.push({
            id: call.toolCallId,
            name: call.toolName,
            arguments: (call as any).args || (call as any).arguments,
            result: (call as any).result,
          });
        }
      }

      return {
        message: result.text,
        toolCalls,
        metadata: {
          model: this.agent.model,
          agentId: this.agent.id,
          usage: result.usage,
        }
      };
    } catch (error) {
      console.error('Agent generate error:', error);
      throw error;
    }
  }

  private buildSystemPrompt(): string {
    let prompt = this.agent.systemPrompt;
    
    // Add context information
    if (this.context.pageContext) {
      prompt += `\n\nCurrent page context:
- URL: ${this.context.pageContext.url}
- Title: ${this.context.pageContext.title}
- Section: ${this.context.pageContext.section || 'general'}`;
    }
    
    if (this.context.userProfile) {
      prompt += `\n\nUser profile:
- Email: ${this.context.userProfile.email}
- Role: ${this.context.userProfile.role}`;
    }
    
    // Add available tools
    if (this.tools.size > 0) {
      prompt += `\n\nAvailable tools: ${Array.from(this.tools.keys()).join(', ')}`;
    }
    
    return prompt;
  }

  private async loadThreadHistory(): Promise<Message[]> {
    if (!this.context.threadId) return [];
    
    try {
      const { data, error } = await this.supabase
        .from('messages')
        .select('*')
        .eq('thread_id', this.context.threadId)
        .order('created_at', { ascending: true })
        .limit(50);
      
      if (error) throw error;
      
      return data?.map((msg: any) => ({
        id: msg.id,
        role: msg.role,
        content: msg.content,
        toolCalls: msg.tool_calls,
        timestamp: new Date(msg.created_at),
        metadata: msg.metadata
      })) || [];
    } catch (error) {
      console.error('Failed to load thread history:', error);
      return [];
    }
  }

  private async saveToThread(messages: UIMessage[], result: any) {
    if (!this.context.threadId) return;
    
    try {
      // Save messages to database
      for (const msg of messages) {
        await this.supabase
          .from('messages')
          .insert({
            thread_id: this.context.threadId,
            role: msg.role,
            content: (msg as any).content || JSON.stringify(msg.parts || []),
            created_at: new Date().toISOString()
          });
      }
      
      // Update thread activity
      await this.supabase
        .from('threads')
        .update({
          updated_at: new Date().toISOString(),
          last_agent_id: this.agent.id
        })
        .eq('id', this.context.threadId);
    } catch (error) {
      console.error('Failed to save to thread:', error);
    }
  }

  // Agent handoff capability
  async handoffTo(targetAgentId: string, reason: string): Promise<AgentManager> {
    const newContext = {
      ...this.context,
      agentId: targetAgentId,
      memory: {
        ...this.context.memory,
        shortTerm: [
          ...(this.context.memory?.shortTerm || []),
          {
            id: Date.now().toString(),
            role: 'system' as const,
            content: `Handoff from ${this.agent.name} to new agent. Reason: ${reason}`,
            timestamp: new Date()
          }
        ]
      }
    };
    
    return new AgentManager(newContext);
  }

  // Multi-agent collaboration
  async consultAgent(agentId: string, query: string): Promise<string> {
    const consultantManager = new AgentManager({
      ...this.context,
      agentId,
      threadId: `consult-${Date.now()}`
    });
    
    const response = await consultantManager.generateResponse(query);
    return response.message;
  }

  // Get agent info
  getAgentInfo() {
    return {
      id: this.agent.id,
      name: this.agent.name,
      description: this.agent.description,
      capabilities: this.agent.capabilities,
      avatar: this.agent.avatar,
    };
  }
}