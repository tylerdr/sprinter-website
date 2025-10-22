import { createClient } from "@/lib/supabase/server";
import type { UIMessage } from "ai";

export interface ChatThread {
  id: string;
  tenant_id: number; // bigint in database
  agent_id?: string;
  title?: string;
  metadata?: Record<string, any>;
  created_by?: string; // Mapped from user_id for backwards compatibility
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  chat_id: string;
  role: "system" | "user" | "assistant";
  parts: any[]; // Array of message parts
  token_count?: number;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface ChatToolEvent {
  id: string;
  chat_id?: string; // Optional for standalone tool usage
  message_id?: string;
  tool_id?: string;
  tool_call_id?: string;
  tool_slug: string;
  input?: any;
  output?: any;
  data?: any;
  state?: string;
  status_id?: number; // References statuses table
  error?: string;
  duration_ms?: number;
  metadata?: Record<string, any>;
  created_at: string;
  completed_at?: string;
}

// Adapter interface for legacy queries table
export interface LegacyQuery {
  id: bigint;
  query_text: string;
  filters?: any;
  created_at: string;
  updated_at: string;
  user_id?: string;
  response_text?: string;
  messages?: any[];
  chat_id?: string;
  tenant_id?: bigint;
  is_public?: boolean;
}

export class ChatService {
  constructor() {}

  // Chat thread operations
  async createChat(params: {
    id?: string; // Allow specifying ID
    tenantId: number; // bigint
    agentId?: string;
    title?: string;
    createdBy?: string;
    metadata?: Record<string, any>;
    workspaceId?: string;
  }): Promise<ChatThread> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_chats")
      .insert({
        id: params.id, // Use provided ID if available
        tenant_id: params.tenantId,
        agent_id: params.agentId,
        created_by: params.createdBy,
        title: params.title,
        metadata: params.metadata || {},
        workspace_id: params.workspaceId
      })
      .select()
      .single();

    if (error) throw error;

    // Convert null to undefined for optional fields in ChatThread
    return {
      ...data,
      agent_id: data.agent_id ?? undefined,
      title: data.title ?? undefined,
      metadata: data.metadata ?? undefined,
      created_by: data.created_by ?? undefined
    } as ChatThread;
  }

  async getChat(chatId: string): Promise<ChatThread | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_chats")
      .select("*")
      .eq("id", chatId)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; // Not found
      throw error;
    }

    if (!data) return null;

    // Convert null to undefined for optional fields
    return {
      ...data,
      agent_id: data.agent_id ?? undefined,
      title: data.title ?? undefined,
      metadata: data.metadata ?? undefined,
      created_by: data.created_by ?? undefined
    } as ChatThread;
  }

  async listChats(params: {
    tenantId?: number; // bigint
    createdBy?: string;
    agentId?: string;
    limit?: number;
    offset?: number;
  }): Promise<ChatThread[]> {
    const supabase = await createClient();

    let query = supabase
      .from("ai_chats")
      .select("*")
      .order("created_at", { ascending: false });

    if (params.tenantId) {
      query = query.eq("tenant_id", params.tenantId);
    }
    if (params.createdBy) {
      query = query.eq("created_by", params.createdBy);
    }
    if (params.agentId) {
      query = query.eq("agent_id", params.agentId);
    }
    if (params.limit) {
      query = query.limit(params.limit);
    }
    if (params.offset) {
      query = query.range(
        params.offset,
        params.offset + (params.limit || 10) - 1
      );
    }

    const { data, error } = await query;
    if (error) throw error;

    // Convert null to undefined for optional fields in each chat
    return (data || []).map((chat: any) => ({
      ...chat,
      agent_id: chat.agent_id ?? undefined,
      title: chat.title ?? undefined,
      metadata: chat.metadata ?? undefined,
      created_by: chat.created_by ?? undefined
    })) as ChatThread[];
  }

  async updateChat(
    chatId: string,
    updates: {
      title?: string;
      metadata?: Record<string, any>;
    }
  ): Promise<ChatThread> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_chats")
      .update(updates)
      .eq("id", chatId)
      .select()
      .single();

    if (error) throw error;

    // Convert null to undefined for optional fields in ChatThread
    return {
      ...data,
      agent_id: data.agent_id ?? undefined,
      title: data.title ?? undefined,
      metadata: data.metadata ?? undefined,
      created_by: data.created_by ?? undefined
    } as ChatThread;
  }

  async deleteChat(chatId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase.from("ai_chats").delete().eq("id", chatId);

    if (error) throw error;
  }

  /**
   * Find or create a chat for a specific agent and user
   * Used for persistent agent chats like Conventional Guidelines
   */
  async findOrCreateChat(params: {
    agentSlug: string;
    tenantId: number;
    userId: string;
    title?: string;
  }): Promise<string> {
    const supabase = await createClient();

    // Look up the agent by slug to get its UUID
    const { data: agent, error: agentError } = await supabase
      .from("ai_agents")
      .select("id, name")
      .eq("slug", params.agentSlug)
      .single();

    if (agentError || !agent) {
      throw new Error(`Agent not found with slug: ${params.agentSlug}`);
    }

    // First, try to find an existing active chat for this agent and user
    const { data: existingChat } = await supabase
      .from("ai_chats")
      .select("id")
      .eq("tenant_id", params.tenantId)
      .eq("created_by", params.userId)
      .eq("agent_id", agent.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingChat?.id) {
      return existingChat.id;
    }

    // No existing chat found, create a new one
    const newChat = await this.createChat({
      tenantId: params.tenantId,
      agentId: agent.id,
      title: params.title || `${agent.name} Chat`,
      createdBy: params.userId,
      metadata: {
        agentSlug: params.agentSlug,
        persistent: true
      }
    });

    return newChat.id;
  }

  // Message operations
  async saveMessage(params: {
    chatId: string;
    role: "system" | "user" | "assistant";
    message: UIMessage;
    agentId?: string;
    tokenCount?: number;
  }): Promise<ChatMessage> {
    const supabase = await createClient();

    // Validate role to prevent undefined errors
    if (
      !params.role ||
      !["system", "user", "assistant"].includes(params.role)
    ) {
      throw new Error(`Unsupported role: ${params.role}`);
    }

    const { data, error } = await supabase
      .from("ai_messages")
      .insert({
        chat_id: params.chatId,
        role: params.role,
        parts: (params.message as any).parts || [],
        token_count: params.tokenCount,
        metadata: (params.message as any).metadata || null
      })
      .select()
      .single();

    if (error) throw error;

    return data as ChatMessage;
  }

  async getMessages(chatId: string, limit = 100): Promise<ChatMessage[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_messages")
      .select("*")
      .eq("chat_id", chatId)
      .order("created_at", { ascending: true })
      .limit(limit);

    if (error) throw error;

    return (data || []) as ChatMessage[];
  }

  async saveMessages(
    messages: Array<{
      chatId: string;
      role: "system" | "user" | "assistant";
      message: UIMessage;
      tokenCount?: number;
    }>
  ): Promise<ChatMessage[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_messages")
      .insert(
        messages.map(m => ({
          chat_id: m.chatId,
          role: m.role,
          parts: (m.message as any).parts || [],
          token_count: m.tokenCount,
          metadata: (m.message as any).metadata || null
        }))
      )
      .select();

    if (error) throw error;

    return (data || []) as ChatMessage[];
  }

  // Tool event operations
  async logToolEvent(params: {
    chatId?: string; // Optional for standalone tool usage
    messageId?: string;
    toolId?: string;
    toolCallId?: string;
    toolSlug: string;
    input?: any;
    data?: any;
    state?: string;
    statusId?: number; // References statuses table
    error?: string;
    metadata?: Record<string, any>;
  }): Promise<ChatToolEvent> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("ai_tool_events")
      .insert({
        chat_id: params.chatId,
        message_id: params.messageId,
        tool_id: params.toolId,
        tool_call_id: params.toolCallId,
        tool_slug: params.toolSlug,
        input: params.input,
        data: params.data,
        state: params.state,
        status_id: params.statusId,
        error: params.error,
        metadata: params.metadata
      })
      .select()
      .single();

    if (error) throw error;

    // Return tool event with proper type casting
    return {
      ...data,
      message_id: data.message_id ?? undefined,
      tool_id: data.tool_id ?? undefined,
      tool_call_id: data.tool_call_id ?? undefined,
      input: data.input ?? undefined,
      output: data.output ?? undefined,
      data: data.data ?? undefined,
      state: data.state ?? undefined,
      status_id: data.status_id ?? undefined,
      error: data.error ?? undefined,
      duration_ms: data.duration_ms ?? undefined,
      metadata: data.metadata ?? undefined,
      completed_at: data.completed_at ?? undefined
    } as ChatToolEvent;
  }

  async updateToolEvent(
    eventId: string,
    updates: {
      output?: any;
      data?: any;
      state?: string;
      error?: string;
      statusId?: number; // References statuses table
      completedAt?: string;
      durationMs?: number;
    }
  ): Promise<ChatToolEvent> {
    const supabase = await createClient();

    const updateData: any = { ...updates };
    if (updates.completedAt) {
      updateData.completed_at = updates.completedAt;
      delete updateData.completedAt;
    }
    if (updates.durationMs !== undefined) {
      updateData.duration_ms = updates.durationMs;
      delete updateData.durationMs;
    }
    if (updates.statusId !== undefined) {
      updateData.status_id = updates.statusId;
      delete updateData.statusId;
    }

    const { data, error } = await supabase
      .from("ai_tool_events")
      .update(updateData)
      .eq("id", eventId)
      .select()
      .single();

    if (error) throw error;

    // Return tool event with proper type casting
    return {
      ...data,
      message_id: data.message_id ?? undefined,
      tool_id: data.tool_id ?? undefined,
      tool_call_id: data.tool_call_id ?? undefined,
      input: data.input ?? undefined,
      output: data.output ?? undefined,
      data: data.data ?? undefined,
      state: data.state ?? undefined,
      status_id: data.status_id ?? undefined,
      error: data.error ?? undefined,
      duration_ms: data.duration_ms ?? undefined,
      metadata: data.metadata ?? undefined,
      completed_at: data.completed_at ?? undefined
    } as ChatToolEvent;
  }

  async getToolEvents(chatId?: string): Promise<ChatToolEvent[]> {
    const supabase = await createClient();

    let query = supabase
      .from("ai_tool_events")
      .select("*")
      .order("created_at", { ascending: true });

    if (chatId) {
      query = query.eq("chat_id", chatId);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Convert each tool event with proper type casting
    return (data || []).map((event: any) => ({
      id: event.id,
      chat_id: event.chat_id ?? undefined,
      message_id: event.message_id ?? undefined,
      tool_id: event.tool_id ?? undefined,
      tool_call_id: event.tool_call_id ?? undefined,
      tool_slug: event.tool_slug,
      input: event.input ?? undefined,
      output: event.output ?? undefined,
      data: event.data ?? undefined,
      state: event.state ?? undefined,
      status_id: event.status_id ?? undefined,
      error: event.error ?? undefined,
      duration_ms: event.duration_ms ?? undefined,
      metadata: event.metadata ?? undefined,
      created_at: event.created_at || new Date().toISOString(),
      completed_at: event.completed_at ?? undefined
    })) as ChatToolEvent[];
  }

  // Adapter methods for queries table compatibility
  async getOrCreateChatFromQuery(
    queryId: bigint,
    tenantId: bigint,
    userId?: string
  ): Promise<ChatThread> {
    const supabase = await createClient();

    // Check if we already have a chat for this query
    const { data: query } = await supabase
      .from("queries")
      .select("chat_id")
      .eq("id", Number(queryId))
      .single();

    if (query?.chat_id) {
      const chat = await this.getChat(query.chat_id);
      if (chat) return chat;
    }

    // Create new chat
    const chat = await this.createChat({
      tenantId: Number(tenantId),
      createdBy: userId,
      metadata: { queryId: queryId.toString() }
    });

    // Update query with chat_id
    await supabase
      .from("queries")
      .update({ chat_id: chat.id })
      .eq("id", Number(queryId));

    return chat;
  }

  // Convert legacy query messages to chat messages
  async migrateQueryMessages(queryId: bigint, chatId: string): Promise<void> {
    const supabase = await createClient();

    const { data: query } = await supabase
      .from("queries")
      .select("messages")
      .eq("id", Number(queryId))
      .single();

    if (!query?.messages || !Array.isArray(query.messages)) return;

    const messages = query.messages.map((msg: any) => ({
      chat_id: chatId,
      role: msg.role || "user",
      parts: msg.parts || [{ type: "text", text: msg.content || "" }]
    }));

    if (messages.length > 0) {
      await supabase.from("ai_messages").insert(messages);
    }
  }

  // Helper to convert UIMessages for persistence
  async persistChatSession(params: {
    chatId: string;
    messages: UIMessage[];
    agentId?: string;
  }): Promise<void> {
    const supabase = await createClient();

    // Save UIMessages directly
    const messagesToSave = params.messages.map(msg => ({
      chat_id: params.chatId,
      role: msg.role as "system" | "user" | "assistant",
      parts: (msg as any).parts || [],
      metadata: (msg as any).metadata || null
    }));

    if (messagesToSave.length > 0) {
      const { error } = await supabase
        .from("ai_messages")
        .insert(messagesToSave);

      if (error) throw error;
    }

    // Update chat metadata with last activity
    if (params.agentId) {
      const { error } = await supabase
        .from("ai_chats")
        .update({
          agent_id: params.agentId,
          updated_at: new Date().toISOString()
        })
        .eq("id", params.chatId);

      if (error) throw error;
    }
  }

  // Helper to restore chat session
  async restoreChatSession(chatId: string): Promise<{
    chat: ChatThread | null;
    messages: UIMessage[];
  }> {
    const chat = await this.getChat(chatId);
    const messages = await this.getMessages(chatId);

    return {
      chat,
      messages: messages.map(
        m =>
          ({
            id: crypto.randomUUID(),
            role: m.role,
            parts: m.parts || []
          }) as UIMessage
      )
    };
  }
}

// Export singleton instance
export const chatService = new ChatService();
