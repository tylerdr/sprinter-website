/**
 * Server-side AI Response Caching System
 * Provides in-memory caching for AI API responses on the server
 */

import { createHash } from 'crypto';

interface CacheEntry {
  response: string;
  timestamp: number;
  expiresAt: number;
  usageCount: number;
  metadata?: Record<string, any>;
}

class ServerAICache {
  private cache = new Map<string, CacheEntry>();
  private maxSize = 500; // Maximum entries in memory
  private defaultTTL = 30 * 60 * 1000; // 30 minutes default TTL
  private maxTTL = 24 * 60 * 60 * 1000; // 24 hours max TTL
  private stats = {
    hits: 0,
    misses: 0,
    totalRequests: 0,
    totalSaved: 0
  };

  constructor() {
    // Clean up expired entries every 5 minutes
    setInterval(() => {
      this.cleanupExpiredEntries();
    }, 5 * 60 * 1000);
  }

  /**
   * Generate a cache key from request parameters
   */
  private generateKey(prompt: string, options: Record<string, any> = {}): string {
    const normalizedPrompt = prompt.trim().toLowerCase();
    const optionsString = JSON.stringify(options, Object.keys(options).sort());
    return createHash('sha256').update(normalizedPrompt + optionsString).digest('hex').substring(0, 16);
  }

  /**
   * Get cached response if available and not expired
   */
  async get(prompt: string, options: Record<string, any> = {}): Promise<string | null> {
    const key = this.generateKey(prompt, options);
    this.stats.totalRequests++;

    const entry = this.cache.get(key);
    if (entry && Date.now() < entry.expiresAt) {
      entry.usageCount++;
      this.stats.hits++;
      this.stats.totalSaved++;
      return entry.response;
    }

    if (entry && Date.now() >= entry.expiresAt) {
      // Remove expired entry
      this.cache.delete(key);
    }

    this.stats.misses++;
    return null;
  }

  /**
   * Store response in cache
   */
  async set(
    prompt: string,
    response: string,
    options: Record<string, any> = {},
    ttl?: number,
    metadata?: Record<string, any>
  ): Promise<void> {
    const key = this.generateKey(prompt, options);
    const actualTTL = Math.min(ttl || this.defaultTTL, this.maxTTL);
    const entry: CacheEntry = {
      response,
      timestamp: Date.now(),
      expiresAt: Date.now() + actualTTL,
      usageCount: 0,
      metadata
    };

    this.cache.set(key, entry);
    this.enforceMemoryLimit();
  }

  /**
   * Enforce memory cache size limit
   */
  private enforceMemoryLimit(): void {
    if (this.cache.size <= this.maxSize) return;

    // Remove least recently used entries
    const entries = Array.from(this.cache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toRemove = entries.slice(0, entries.length - this.maxSize);
    toRemove.forEach(([key]) => this.cache.delete(key));
  }

  /**
   * Clean up expired entries
   */
  private cleanupExpiredEntries(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now >= entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const hitRate = this.stats.totalRequests > 0
      ? (this.stats.hits / this.stats.totalRequests) * 100
      : 0;

    return {
      ...this.stats,
      hitRate: Math.round(hitRate * 100) / 100,
      cacheSize: this.cache.size
    };
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
    this.stats = {
      hits: 0,
      misses: 0,
      totalRequests: 0,
      totalSaved: 0
    };
  }
}

// Create singleton instance
export const serverAICache = new ServerAICache();

/**
 * Wrapper function for AI API calls with server-side caching
 */
export async function cachedServerAIRequest<T = string>(
  prompt: string,
  apiCall: () => Promise<T>,
  options: {
    ttl?: number;
    cacheKey?: Record<string, any>;
    metadata?: Record<string, any>;
    skipCache?: boolean;
  } = {}
): Promise<T> {
  const { ttl, cacheKey = {}, metadata, skipCache = false } = options;

  if (skipCache) {
    return await apiCall();
  }

  // Try to get from cache
  const cached = await serverAICache.get(prompt, cacheKey);
  if (cached !== null) {
    return cached as T;
  }

  // Make API call
  const response = await apiCall();

  // Cache the response (only if it's a string)
  if (typeof response === 'string') {
    await serverAICache.set(prompt, response, cacheKey, ttl, metadata);
  }

  return response;
}