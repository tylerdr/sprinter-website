import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const supabase = await createClient()
  
  // Use getClaims to prevent unexpected logouts
  const { data, error } = await supabase.auth.getClaims()
  
  if (error || !data) {
    redirect('/auth/signin')
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/auth/signin')
  }
  
  return { user, claims: data }
}

export async function getAuthUser() {
  const supabase = await createClient()
  
  // Use getClaims to validate session
  const { data: claims } = await supabase.auth.getClaims()
  
  if (!claims) {
    return null
  }
  
  const { data: { user } } = await supabase.auth.getUser()
  
  return user
}