/**
 * Database types placeholder
 * TODO: Generate these types from Supabase schema
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];

export interface Database {
  public: {
    Tables: {
      ai_messages: {
        Row: {
          id: string;
          chat_id: string;
          role: string;
          content: any;
          metadata: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          chat_id: string;
          role: string;
          content?: any;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          chat_id?: string;
          role?: string;
          content?: any;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      ai_chats: {
        Row: {
          id: string;
          user_id: string;
          agent_id?: string;
          title?: string;
          metadata?: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          agent_id?: string;
          title?: string;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          agent_id?: string;
          title?: string;
          metadata?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name?: string;
          avatar_url?: string;
          current_tenant_id?: number;
          created_at: string;
          updated_at: string;
        };
      };
      tenants: {
        Row: {
          id: number;
          name: string;
          slug: string;
          settings?: any;
          created_at: string;
          updated_at: string;
        };
      };
      user_tenants: {
        Row: {
          user_id: string;
          tenant_id: number;
          role: string;
          created_at: string;
        };
      };
      ai_agent_tools: {
        Row: {
          agent_id: string;
          tool_id: string;
          created_at: string;
        };
      };
      ai_tools: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description?: string;
          input_schema?: any;
          output_schema?: any;
          execution_mode?: string;
          is_active?: boolean;
          metadata?: any;
          category?: string;
          created_at: string;
          updated_at: string;
        };
      };
      ai_tool_events: {
        Row: {
          id: string;
          tool_id: string;
          user_id: string;
          input?: any;
          output?: any;
          error?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          tool_id?: string | null;
          tool_slug?: string;
          user_id: string;
          input?: any;
          output?: any;
          error?: string | null;
          duration_ms?: number | null;
          metadata?: any;
          chat_id?: string | null;
          message_id?: string | null;
          tool_call_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}