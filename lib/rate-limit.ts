import { NextRequest, NextResponse } from 'next/server'

interface RateLimitOptions {
  interval: number // Time window in milliseconds
  uniqueTokenPerInterval: number // Max number of unique tokens per interval
}

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

// In-memory store (consider using Redis in production)
const rateLimitStore: RateLimitStore = {}

export function rateLimit(options: RateLimitOptions = {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 10 // 10 requests per minute
}) {
  return async function rateLimitMiddleware(
    request: NextRequest,
    handler: (req: NextRequest) => Promise<NextResponse>
  ): Promise<NextResponse> {
    // Get identifier (IP address or user ID)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const identifier = `${request.nextUrl.pathname}:${ip}`
    
    const now = Date.now()
    const limit = options.uniqueTokenPerInterval
    const interval = options.interval
    
    // Get or create rate limit record
    if (!rateLimitStore[identifier] || rateLimitStore[identifier].resetTime < now) {
      rateLimitStore[identifier] = {
        count: 0,
        resetTime: now + interval
      }
    }
    
    const record = rateLimitStore[identifier]
    
    // Check if rate limit exceeded
    if (record.count >= limit) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000)
      
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: `Rate limit exceeded. Please try again in ${retryAfter} seconds.`
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': record.resetTime.toString(),
            'Retry-After': retryAfter.toString()
          }
        }
      )
    }
    
    // Increment counter
    record.count++
    
    // Process request
    const response = await handler(request)
    
    // Add rate limit headers to response
    const headers = new Headers(response.headers)
    headers.set('X-RateLimit-Limit', limit.toString())
    headers.set('X-RateLimit-Remaining', (limit - record.count).toString())
    headers.set('X-RateLimit-Reset', record.resetTime.toString())
    
    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    })
  }
}

// Cleanup old entries periodically to prevent memory leak
setInterval(() => {
  const now = Date.now()
  for (const key in rateLimitStore) {
    if (rateLimitStore[key].resetTime < now) {
      delete rateLimitStore[key]
    }
  }
}, 5 * 60 * 1000) // Clean up every 5 minutes

// Helper function for API routes
export function withRateLimit(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options?: RateLimitOptions
) {
  const limiter = rateLimit(options)
  return (req: NextRequest) => limiter(req, handler)
}