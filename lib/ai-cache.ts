/**
 * AI Response Caching System
 * Provides in-memory and localStorage caching for AI API responses
 * to reduce costs and improve performance
 */

import { createHash } from 'crypto';
import { useState, useEffect } from 'react';

interface CacheEntry {
  response: string;
  timestamp: number;
  expiresAt: number;
  usageCount: number;
  metadata?: Record<string, any>;
}

interface CacheStats {
  hits: number;
  misses: number;
  totalRequests: number;
  totalSaved: number; // Estimated API calls saved
  cacheSize: number;
}

class AIResponseCache {
  private memoryCache = new Map<string, CacheEntry>();
  private maxMemorySize = 100; // Maximum entries in memory
  private defaultTTL = 30 * 60 * 1000; // 30 minutes default TTL
  private maxTTL = 24 * 60 * 60 * 1000; // 24 hours max TTL
  private stats: CacheStats = {
    hits: 0,
    misses: 0,
    totalRequests: 0,
    totalSaved: 0,
    cacheSize: 0
  };

  constructor() {
    this.loadStatsFromStorage();
    this.cleanupExpiredEntries();
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

    // Check memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && Date.now() < memoryEntry.expiresAt) {
      memoryEntry.usageCount++;
      this.stats.hits++;
      this.stats.totalSaved++;
      return memoryEntry.response;
    }

    // Check localStorage cache
    if (typeof window !== 'undefined') {
      try {
        const storageKey = `ai_cache_${key}`;
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const entry: CacheEntry = JSON.parse(stored);
          if (Date.now() < entry.expiresAt) {
            // Move to memory cache for faster access
            this.memoryCache.set(key, entry);
            entry.usageCount++;
            this.stats.hits++;
            this.stats.totalSaved++;
            this.saveStatsToStorage();
            return entry.response;
          } else {
            // Remove expired entry
            localStorage.removeItem(storageKey);
          }
        }
      } catch (error) {
        console.warn('Failed to read from localStorage cache:', error);
      }
    }

    this.stats.misses++;
    this.saveStatsToStorage();
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

    // Store in memory cache
    this.memoryCache.set(key, entry);
    this.enforceMemoryLimit();

    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      try {
        const storageKey = `ai_cache_${key}`;
        localStorage.setItem(storageKey, JSON.stringify(entry));
        this.stats.cacheSize++;
        this.saveStatsToStorage();
      } catch (error) {
        console.warn('Failed to write to localStorage cache:', error);
        // If localStorage is full, try to clean up old entries
        this.cleanupOldStorageEntries();
      }
    }
  }

  /**
   * Enforce memory cache size limit
   */
  private enforceMemoryLimit(): void {
    if (this.memoryCache.size <= this.maxMemorySize) return;

    // Remove least recently used entries
    const entries = Array.from(this.memoryCache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toRemove = entries.slice(0, entries.length - this.maxMemorySize);
    toRemove.forEach(([key]) => this.memoryCache.delete(key));
  }

  /**
   * Clean up expired entries from both memory and localStorage
   */
  private cleanupExpiredEntries(): void {
    const now = Date.now();

    // Clean memory cache
    for (const [key, entry] of this.memoryCache.entries()) {
      if (now >= entry.expiresAt) {
        this.memoryCache.delete(key);
      }
    }

    // Clean localStorage cache
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('ai_cache_')) {
            try {
              const entry: CacheEntry = JSON.parse(localStorage.getItem(key) || '');
              if (now >= entry.expiresAt) {
                keysToRemove.push(key);
              }
            } catch {
              // Invalid entry, remove it
              keysToRemove.push(key);
            }
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        this.stats.cacheSize = Math.max(0, this.stats.cacheSize - keysToRemove.length);
      } catch (error) {
        console.warn('Failed to cleanup localStorage cache:', error);
      }
    }
  }

  /**
   * Clean up old storage entries when storage is full
   */
  private cleanupOldStorageEntries(): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheEntries: Array<{ key: string; timestamp: number }> = [];

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('ai_cache_')) {
          try {
            const entry: CacheEntry = JSON.parse(localStorage.getItem(key) || '');
            cacheEntries.push({ key, timestamp: entry.timestamp });
          } catch {
            // Invalid entry, will be cleaned up
            localStorage.removeItem(key);
          }
        }
      }

      // Remove oldest 25% of entries
      cacheEntries.sort((a, b) => a.timestamp - b.timestamp);
      const toRemove = cacheEntries.slice(0, Math.floor(cacheEntries.length * 0.25));
      toRemove.forEach(({ key }) => localStorage.removeItem(key));

      this.stats.cacheSize = Math.max(0, this.stats.cacheSize - toRemove.length);
    } catch (error) {
      console.warn('Failed to cleanup old storage entries:', error);
    }
  }

  /**
   * Save cache statistics to localStorage
   */
  private saveStatsToStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('ai_cache_stats', JSON.stringify(this.stats));
      } catch (error) {
        console.warn('Failed to save cache stats:', error);
      }
    }
  }

  /**
   * Load cache statistics from localStorage
   */
  private loadStatsFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('ai_cache_stats');
        if (stored) {
          this.stats = { ...this.stats, ...JSON.parse(stored) };
        }
      } catch (error) {
        console.warn('Failed to load cache stats:', error);
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats & { hitRate: number; memorySize: number } {
    const hitRate = this.stats.totalRequests > 0
      ? (this.stats.hits / this.stats.totalRequests) * 100
      : 0;

    return {
      ...this.stats,
      hitRate: Math.round(hitRate * 100) / 100,
      memorySize: this.memoryCache.size
    };
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.memoryCache.clear();

    if (typeof window !== 'undefined') {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('ai_cache_')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
      } catch (error) {
        console.warn('Failed to clear localStorage cache:', error);
      }
    }

    this.stats = {
      hits: 0,
      misses: 0,
      totalRequests: 0,
      totalSaved: 0,
      cacheSize: 0
    };
    this.saveStatsToStorage();
  }

  /**
   * Invalidate cache entries matching a pattern
   */
  invalidate(pattern: string): void {
    const regex = new RegExp(pattern, 'i');

    // Clear from memory
    for (const [key, entry] of this.memoryCache.entries()) {
      if (regex.test(entry.response) || (entry.metadata && JSON.stringify(entry.metadata).match(regex))) {
        this.memoryCache.delete(key);
      }
    }

    // Clear from localStorage
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('ai_cache_')) {
            try {
              const entry: CacheEntry = JSON.parse(localStorage.getItem(key) || '');
              if (regex.test(entry.response) || (entry.metadata && JSON.stringify(entry.metadata).match(regex))) {
                keysToRemove.push(key);
              }
            } catch {
              // Invalid entry, remove it
              keysToRemove.push(key);
            }
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        this.stats.cacheSize = Math.max(0, this.stats.cacheSize - keysToRemove.length);
      } catch (error) {
        console.warn('Failed to invalidate localStorage cache:', error);
      }
    }
  }
}

// Create singleton instance
export const aiCache = new AIResponseCache();

// Cleanup interval (runs every 5 minutes)
if (typeof window !== 'undefined') {
  setInterval(() => {
    aiCache['cleanupExpiredEntries']();
  }, 5 * 60 * 1000);
}

/**
 * Wrapper function for AI API calls with caching
 */
export async function cachedAIRequest<T = string>(
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
  const cached = await aiCache.get(prompt, cacheKey);
  if (cached !== null) {
    return cached as T;
  }

  // Make API call
  const response = await apiCall();

  // Cache the response (only if it's a string)
  if (typeof response === 'string') {
    await aiCache.set(prompt, response, cacheKey, ttl, metadata);
  }

  return response;
}

/**
 * React hook for cache statistics
 */
export function useCacheStats() {
  const [stats, setStats] = useState(aiCache.getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(aiCache.getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return stats;
}