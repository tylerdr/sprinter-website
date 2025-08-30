import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'

// Create Redis client - falls back to in-memory if not configured
let redis: Redis | null = null
let ratelimit: Ratelimit | null = null

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  // Configure different rate limits for different endpoints
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 s'), // Default: 10 requests per 10 seconds
    analytics: true,
    prefix: '@upstash/ratelimit',
  })
}

// Specific rate limits for different API categories
const rateLimitConfigs = {
  // AI endpoints - more restrictive
  ai: { requests: 5, window: '60 s' as const },
  // Chat endpoints - moderate
  chat: { requests: 20, window: '60 s' as const },
  // General API - less restrictive
  general: { requests: 30, window: '60 s' as const },
  // Auth endpoints - prevent brute force
  auth: { requests: 5, window: '60 s' as const },
}

export async function rateLimit(
  request: NextRequest,
  category: keyof typeof rateLimitConfigs = 'general'
) {
  // Skip rate limiting if Redis is not configured
  if (!ratelimit || !redis) {
    console.warn('Rate limiting disabled: Redis not configured')
    return { success: true, limit: 0, remaining: 0, reset: 0 }
  }

  try {
    // Get identifier from IP or session
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') ?? 'anonymous'
    const identifier = `${category}:${ip}`

    // Get specific rate limit for this category
    const config = rateLimitConfigs[category]
    const categoryLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(
        config.requests,
        config.window
      ),
      analytics: true,
      prefix: `@upstash/ratelimit/${category}`,
    })

    const { success, limit, remaining, reset } = await categoryLimiter.limit(identifier)

    return { success, limit, remaining, reset }
  } catch (error) {
    console.error('Rate limiting error:', error)
    // Fail open - allow request if rate limiting fails
    return { success: true, limit: 0, remaining: 0, reset: 0 }
  }
}

// Helper function to create rate limit response
export function rateLimitResponse(reset: number) {
  const resetDate = new Date(reset)
  return NextResponse.json(
    {
      error: 'Too many requests',
      message: `Rate limit exceeded. Please try again after ${resetDate.toISOString()}`,
      reset: reset,
    },
    {
      status: 429,
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': reset.toString(),
        'Retry-After': Math.floor((reset - Date.now()) / 1000).toString(),
      },
    }
  )
}