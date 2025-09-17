export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: string
          key: string
          url: string
          alt_text: string | null
          title: string | null
          description: string | null
          section: string | null
          page: string | null
          width: number | null
          height: number | null
          mime_type: string | null
          size_bytes: number | null
          metadata: Json | null
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          url: string
          alt_text?: string | null
          title?: string | null
          description?: string | null
          section?: string | null
          page?: string | null
          width?: number | null
          height?: number | null
          mime_type?: string | null
          size_bytes?: number | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          url?: string
          alt_text?: string | null
          title?: string | null
          description?: string | null
          section?: string | null
          page?: string | null
          width?: number | null
          height?: number | null
          mime_type?: string | null
          size_bytes?: number | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      content_blocks: {
        Row: {
          id: string
          key: string
          content: string
          content_type: string
          section: string | null
          page: string | null
          language: string
          metadata: Json | null
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          content: string
          content_type?: string
          section?: string | null
          page?: string | null
          language?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          content?: string
          content_type?: string
          section?: string | null
          page?: string | null
          language?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      articles: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string | null
          content: string
          excerpt: string | null
          category: string
          tags: string[] | null
          author_name: string | null
          author_email: string | null
          author_avatar: string | null
          featured_image: string | null
          status: string
          published_at: string | null
          reading_time: number | null
          view_count: number
          metadata: Json | null
          created_at: string
          updated_at: string
          created_by: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          subtitle?: string | null
          content: string
          excerpt?: string | null
          category: string
          tags?: string[] | null
          author_name?: string | null
          author_email?: string | null
          author_avatar?: string | null
          featured_image?: string | null
          status?: string
          published_at?: string | null
          reading_time?: number | null
          view_count?: number
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          subtitle?: string | null
          content?: string
          excerpt?: string | null
          category?: string
          tags?: string[] | null
          author_name?: string | null
          author_email?: string | null
          author_avatar?: string | null
          featured_image?: string | null
          status?: string
          published_at?: string | null
          reading_time?: number | null
          view_count?: number
          metadata?: Json | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          updated_by?: string | null
        }
      }
      site_config: {
        Row: {
          id: string
          key: string
          value: Json
          description: string | null
          category: string | null
          is_public: boolean
          created_at: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          key: string
          value: Json
          description?: string | null
          category?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          description?: string | null
          category?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
          updated_by?: string | null
        }
      }
      navigation_items: {
        Row: {
          id: string
          label: string
          href: string
          description: string | null
          parent_id: string | null
          position: number
          section: string
          is_active: boolean
          icon: string | null
          badge_text: string | null
          badge_color: string | null
          target: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          href: string
          description?: string | null
          parent_id?: string | null
          position?: number
          section: string
          is_active?: boolean
          icon?: string | null
          badge_text?: string | null
          badge_color?: string | null
          target?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          href?: string
          description?: string | null
          parent_id?: string | null
          position?: number
          section?: string
          is_active?: boolean
          icon?: string | null
          badge_text?: string | null
          badge_color?: string | null
          target?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      media_library: {
        Row: {
          id: string
          filename: string
          original_name: string | null
          file_path: string
          url: string
          mime_type: string | null
          size_bytes: number | null
          width: number | null
          height: number | null
          duration: number | null
          folder: string | null
          tags: string[] | null
          metadata: Json | null
          uploaded_at: string
          uploaded_by: string | null
        }
        Insert: {
          id?: string
          filename: string
          original_name?: string | null
          file_path: string
          url: string
          mime_type?: string | null
          size_bytes?: number | null
          width?: number | null
          height?: number | null
          duration?: number | null
          folder?: string | null
          tags?: string[] | null
          metadata?: Json | null
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Update: {
          id?: string
          filename?: string
          original_name?: string | null
          file_path?: string
          url?: string
          mime_type?: string | null
          size_bytes?: number | null
          width?: number | null
          height?: number | null
          duration?: number | null
          folder?: string | null
          tags?: string[] | null
          metadata?: Json | null
          uploaded_at?: string
          uploaded_by?: string | null
        }
      }
      admin_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: string
          permissions: Json | null
          last_login: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          permissions?: Json | null
          last_login?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: string
          permissions?: Json | null
          last_login?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          table_name: string
          record_id: string
          action: string
          old_data: Json | null
          new_data: Json | null
          user_id: string | null
          user_email: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          table_name: string
          record_id: string
          action: string
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          user_email?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          table_name?: string
          record_id?: string
          action?: string
          old_data?: Json | null
          new_data?: Json | null
          user_id?: string | null
          user_email?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}