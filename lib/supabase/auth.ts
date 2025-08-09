import { createClient } from '@/lib/supabase/client'
import type { Provider } from '@supabase/supabase-js'

export interface AuthError {
  message: string
  status?: number
}

export interface SignUpData {
  email: string
  password: string
  metadata?: Record<string, unknown>
}

export interface SignInData {
  email: string
  password: string
}

export async function signUp({ email, password, metadata }: SignUpData) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    return { error: { message: error.message, status: error.status } }
  }

  return { data }
}

export async function signIn({ email, password }: SignInData) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: { message: error.message, status: error.status } }
  }

  return { data }
}

export async function signInWithOAuth(provider: Provider) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })

  if (error) {
    return { error: { message: error.message } }
  }

  return { data }
}

export async function signOut() {
  const supabase = createClient()
  
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: { message: error.message } }
  }

  return { success: true }
}

export async function resetPassword(email: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })

  if (error) {
    return { error: { message: error.message } }
  }

  return { data }
}

export async function updatePassword(password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: { message: error.message } }
  }

  return { data }
}

export async function getSession() {
  const supabase = createClient()
  
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    return { error: { message: error.message } }
  }

  return { session }
}

export async function getUser() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    return { error: { message: error.message } }
  }

  return { user }
}

export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
  const supabase = createClient()
  
  return supabase.auth.onAuthStateChange(callback)
}