import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  // During build, return a mock client if env vars are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
      // Return a mock client for build time
      return {
        auth: {
          getUser: async () => ({ data: { user: null }, error: null }),
          signIn: async () => ({ data: null, error: new Error('Supabase not configured') }),
          signOut: async () => ({ error: null }),
        },
        from: () => ({
          select: () => ({
            eq: () => ({
              single: async () => ({ data: null, error: null }),
            }),
          }),
          insert: async () => ({ data: null, error: null }),
          update: async () => ({ data: null, error: null }),
          delete: async () => ({ data: null, error: null }),
        }),
      } as any
    }
    
    // In development or on client, throw error
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.'
    )
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}