/**
 * Entity Resolution Utilities for Tools
 *
 * Provides intelligent resolution of human-friendly inputs (names, slugs) to database IDs.
 * Handles disambiguation, fuzzy matching, and caching for optimal performance.
 */

import { createClient } from "@/lib/supabase/server";
import { logger } from "@/lib/logger";

// Custom error types for clean error handling
export class EntityNotFoundError extends Error {
  constructor(entityType: string, identifier: string) {
    super(`${entityType} not found: ${identifier}`);
    this.name = 'EntityNotFoundError';
  }
}

export class AmbiguousEntityError extends Error {
  public options: Array<{ id: any; name: string; metadata?: any }>;

  constructor(entityType: string, identifier: string, options: Array<{ id: any; name: string; metadata?: any }>) {
    super(`Multiple ${entityType}s found for: ${identifier}`);
    this.name = 'AmbiguousEntityError';
    this.options = options;
  }
}

// Resolution result types
export type ResolutionResult<T> =
  | { status: 'resolved'; id: T; name?: string; metadata?: any }
  | { status: 'not_found'; query: string }
  | { status: 'ambiguous'; query: string; options: Array<{ id: T; name: string; metadata?: any }> };

// Input types for flexible resolution
export type LenderInput = string | number | {
  id?: number;
  name?: string;
};

export type ProgramInput = string | number | {
  id?: number;
  name?: string;
  lenderId?: number;
  lenderName?: string;
};

export type QualifierInput = string | number | {
  id?: number;
  key?: string;
  name?: string;
  category?: string;
};

// Simple in-memory cache with TTL
const resolutionCache = new Map<string, { data: any; expiry: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCacheKey(type: string, input: any): string {
  return `${type}:${JSON.stringify(input)}`;
}

function getFromCache<T>(key: string): T | null {
  const cached = resolutionCache.get(key);
  if (cached && cached.expiry > Date.now()) {
    return cached.data;
  }
  resolutionCache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  resolutionCache.set(key, {
    data,
    expiry: Date.now() + CACHE_TTL
  });
}

/**
 * Resolve a lender by name, slug, or ID
 */
export async function resolveLender(input: LenderInput): Promise<ResolutionResult<number>> {
  const cacheKey = getCacheKey('lender', input);
  const cached = getFromCache<ResolutionResult<number>>(cacheKey);
  if (cached) return cached;

  try {
    const supabase = await createClient();

    // Handle different input types
    let query: string;
    let isId = false;

    if (typeof input === 'number') {
      // Direct ID provided
      const { data, error } = await supabase
        .from('lenders')
        .select('id, name')
        .eq('id', input)
        .single();

      if (error || !data) {
        return { status: 'not_found', query: String(input) };
      }

      const result: ResolutionResult<number> = {
        status: 'resolved',
        id: data.id,
        name: data.name
      };
      setCache(cacheKey, result);
      return result;
    }

    if (typeof input === 'object') {
      // Object with specific fields
      if (input.id) {
        return resolveLender(input.id);
      }
      query = input.name || '';
    } else {
      query = input;
    }

    if (!query) {
      return { status: 'not_found', query: '' };
    }

    // Try exact match first - check both name and slug (case-insensitive)
    const { data: exactMatch } = await supabase
      .from('lenders')
      .select('id, name, slug')
      .or(`name.ilike.${query},slug.eq.${query.toLowerCase()}`)
      .limit(2);

    if (exactMatch && exactMatch.length === 1) {
      const result: ResolutionResult<number> = {
        status: 'resolved',
        id: exactMatch[0].id,
        name: exactMatch[0].name
      };
      setCache(cacheKey, result);
      return result;
    }

    if (exactMatch && exactMatch.length > 1) {
      const result: ResolutionResult<number> = {
        status: 'ambiguous',
        query,
        options: exactMatch.map(l => ({
          id: l.id,
          name: l.name,
          metadata: {}
        }))
      };
      setCache(cacheKey, result);
      return result;
    }

    // Try partial match on name and slug
    const { data: partialMatch } = await supabase
      .from('lenders')
      .select('id, name, slug')
      .or(`name.ilike.%${query}%,slug.ilike.%${query}%`)
      .limit(10);

    if (!partialMatch || partialMatch.length === 0) {
      return { status: 'not_found', query };
    }

    if (partialMatch.length === 1) {
      const result: ResolutionResult<number> = {
        status: 'resolved',
        id: partialMatch[0].id,
        name: partialMatch[0].name
      };
      setCache(cacheKey, result);
      return result;
    }

    // Multiple partial matches
    const result: ResolutionResult<number> = {
      status: 'ambiguous',
      query,
      options: partialMatch.map(l => ({
        id: l.id,
        name: l.name,
        metadata: {}
      }))
    };
    setCache(cacheKey, result);
    return result;

  } catch (error) {
    logger.error('Error resolving lender', { input, error });
    return { status: 'not_found', query: String(input) };
  }
}

/**
 * Resolve a program by name or ID, optionally scoped to a lender
 */
export async function resolveProgram(
  input: ProgramInput,
  context?: { lenderId?: number; lenderName?: string }
): Promise<ResolutionResult<number>> {
  const cacheKey = getCacheKey('program', { input, context });
  const cached = getFromCache<ResolutionResult<number>>(cacheKey);
  if (cached) return cached;

  try {
    const supabase = await createClient();

    // Handle direct ID
    if (typeof input === 'number') {
      const { data, error } = await supabase
        .from('programs')
        .select('id, name, slug, lender_id, lenders(name)')
        .eq('id', input)
        .single();

      if (error || !data) {
        return { status: 'not_found', query: String(input) };
      }

      const result: ResolutionResult<number> = {
        status: 'resolved',
        id: data.id,
        name: data.name,
        metadata: { lenderId: data.lender_id, lenderName: (data as any).lenders?.name }
      };
      setCache(cacheKey, result);
      return result;
    }

    // Extract query and lender context
    let query: string;
    let lenderId: number | undefined = context?.lenderId;
    let lenderName: string | undefined = context?.lenderName;

    if (typeof input === 'object') {
      if (input.id) {
        return resolveProgram(input.id);
      }
      query = input.name || '';
      lenderId = input.lenderId || lenderId;
      lenderName = input.lenderName || lenderName;
    } else {
      query = input;
    }

    if (!query) {
      return { status: 'not_found', query: '' };
    }

    // Resolve lender if name provided but not ID
    if (lenderName && !lenderId) {
      const lenderResult = await resolveLender(lenderName);
      if (lenderResult.status === 'resolved') {
        lenderId = lenderResult.id;
      }
    }

    // Build query
    let dbQuery = supabase
      .from('programs')
      .select('id, name, slug, lender_id, lenders(name)');

    // Add lender filter if available
    if (lenderId) {
      dbQuery = dbQuery.eq('lender_id', lenderId);
    }

    // Try exact match first - check both name and slug
    const { data: exactMatch } = await dbQuery
      .or(`name.ilike.${query},slug.eq.${query.toLowerCase()}`)
      .limit(2);

    if (exactMatch && exactMatch.length === 1) {
      const result: ResolutionResult<number> = {
        status: 'resolved',
        id: exactMatch[0].id,
        name: exactMatch[0].name,
        metadata: {
          lenderId: exactMatch[0].lender_id,
          lenderName: (exactMatch[0] as any).lenders?.name
        }
      };
      setCache(cacheKey, result);
      return result;
    }

    if (exactMatch && exactMatch.length > 1) {
      const result: ResolutionResult<number> = {
        status: 'ambiguous',
        query,
        options: exactMatch.map(p => ({
          id: p.id,
          name: p.name,
          metadata: {
            lenderId: p.lender_id,
            lenderName: (p as any).lenders?.name
          }
        }))
      };
      setCache(cacheKey, result);
      return result;
    }

    // Try partial match on name and slug
    const { data: partialMatch } = await dbQuery
      .or(`name.ilike.%${query}%,slug.ilike.%${query}%`)
      .limit(10);

    if (!partialMatch || partialMatch.length === 0) {
      return { status: 'not_found', query };
    }

    if (partialMatch.length === 1) {
      const result: ResolutionResult<number> = {
        status: 'resolved',
        id: partialMatch[0].id,
        name: partialMatch[0].name,
        metadata: {
          lenderId: partialMatch[0].lender_id,
          lenderName: (partialMatch[0] as any).lenders?.name
        }
      };
      setCache(cacheKey, result);
      return result;
    }

    // Multiple partial matches
    const result: ResolutionResult<number> = {
      status: 'ambiguous',
      query,
      options: partialMatch.map(p => ({
        id: p.id,
        name: p.name,
        metadata: {
          lenderId: p.lender_id,
          lenderName: (p as any).lenders?.name
        }
      }))
    };
    setCache(cacheKey, result);
    return result;

  } catch (error) {
    logger.error('Error resolving program', { input, context, error });
    return { status: 'not_found', query: String(input) };
  }
}

/**
 * Resolve a qualifier by key, name, or ID
 */
export async function resolveQualifier(input: QualifierInput): Promise<ResolutionResult<number>> {
  const cacheKey = getCacheKey('qualifier', input);
  const cached = getFromCache<ResolutionResult<number>>(cacheKey);
  if (cached) return cached;

  try {
    const supabase = await createClient();

    // Handle direct ID
    if (typeof input === 'number') {
      const { data, error } = await supabase
        .from('qualifiers')
        .select('id, key, name, category')
        .eq('id', input)
        .single();

      if (error || !data) {
        return { status: 'not_found', query: String(input) };
      }

      const result: ResolutionResult<number> = {
        status: 'resolved',
        id: data.id,
        name: data.name,
        metadata: { key: data.key, category: data.category }
      };
      setCache(cacheKey, result);
      return result;
    }

    // Extract query fields
    let slug: string | undefined;
    let name: string | undefined;
    let category: string | undefined;

    if (typeof input === 'object') {
      if (input.id) {
        return resolveQualifier(input.id);
      }
      // Support both 'key' (for backward compat) and 'slug'
      slug = (input as any).slug || input.key;
      name = input.name;
      category = input.category;
    } else {
      // String input could be slug or name
      // Slugs are typically lowercase with dashes, names are Title Case
      if (input.toLowerCase() === input || input.includes('-') || input.includes('_')) {
        slug = input;
      } else {
        name = input;
      }
    }

    // Try exact slug match first (most specific)
    if (slug) {
      const { data } = await supabase
        .from('qualifiers')
        .select('id, slug, name, category')
        .eq('slug', slug.toLowerCase())
        .single();

      if (data) {
        const result: ResolutionResult<number> = {
          status: 'resolved',
          id: data.id,
          name: data.name,
          metadata: { slug: data.slug, category: data.category }
        };
        setCache(cacheKey, result);
        return result;
      }
    }

    // Build query for name matching
    let dbQuery = supabase
      .from('qualifiers')
      .select('id, slug, name, category');

    if (category) {
      dbQuery = dbQuery.eq('category', category);
    }

    const searchTerm = name || slug || '';

    // Try exact name match
    if (searchTerm) {
      const { data: exactMatch } = await dbQuery
        .ilike('name', searchTerm)
        .limit(2);

      if (exactMatch && exactMatch.length === 1) {
        const result: ResolutionResult<number> = {
          status: 'resolved',
          id: exactMatch[0].id,
          name: exactMatch[0].name,
          metadata: { slug: exactMatch[0].slug, category: exactMatch[0].category }
        };
        setCache(cacheKey, result);
        return result;
      }

      if (exactMatch && exactMatch.length > 1) {
        const result: ResolutionResult<number> = {
          status: 'ambiguous',
          query: searchTerm,
          options: exactMatch.map(q => ({
            id: q.id,
            name: q.name,
            metadata: { slug: q.slug, category: q.category }
          }))
        };
        setCache(cacheKey, result);
        return result;
      }
    }

    // Try partial match
    if (searchTerm) {
      const { data: partialMatch } = await dbQuery
        .or(`name.ilike.%${searchTerm}%,slug.ilike.%${searchTerm}%`)
        .limit(10);

      if (!partialMatch || partialMatch.length === 0) {
        return { status: 'not_found', query: searchTerm };
      }

      if (partialMatch.length === 1) {
        const result: ResolutionResult<number> = {
          status: 'resolved',
          id: partialMatch[0].id,
          name: partialMatch[0].name,
          metadata: { slug: partialMatch[0].slug, category: partialMatch[0].category }
        };
        setCache(cacheKey, result);
        return result;
      }

      // Multiple partial matches
      const result: ResolutionResult<number> = {
        status: 'ambiguous',
        query: searchTerm,
        options: partialMatch.map(q => ({
          id: q.id,
          name: q.name,
          metadata: { slug: q.slug, category: q.category }
        }))
      };
      setCache(cacheKey, result);
      return result;
    }

    return { status: 'not_found', query: String(input) };

  } catch (error) {
    logger.error('Error resolving qualifier', { input, error });
    return { status: 'not_found', query: String(input) };
  }
}

/**
 * Resolve multiple qualifiers at once
 */
export async function resolveQualifiers(
  inputs: QualifierInput[]
): Promise<Array<ResolutionResult<number>>> {
  return Promise.all(inputs.map(input => resolveQualifier(input)));
}

/**
 * Helper function to handle resolution results in tools
 */
export async function requireResolved<T>(
  result: ResolutionResult<T>,
  entityType: string
): Promise<T> {
  switch (result.status) {
    case 'resolved':
      return result.id;

    case 'not_found':
      throw new EntityNotFoundError(entityType, result.query);

    case 'ambiguous':
      throw new AmbiguousEntityError(entityType, result.query, result.options);

    default:
      throw new Error(`Unexpected resolution status: ${(result as any).status}`);
  }
}

/**
 * Clear the resolution cache
 */
export function clearResolutionCache(): void {
  resolutionCache.clear();
  logger.info('Resolution cache cleared');
}

/**
 * Resolve document name/slug to ID
 */
export async function resolveDocument(input: string | number): Promise<ResolutionResult<number>> {
  if (typeof input === 'number') {
    return { status: 'resolved', id: input };
  }

  const cacheKey = `document:${input}`;
  const cached = getFromCache<ResolutionResult<number>>(cacheKey);
  if (cached) return cached;

  const supabase = await createClient();

  // Try exact match first (case-insensitive)
  const { data: exact, error } = await supabase
    .from('program_documents')
    .select('id, name')
    .or(`name.ilike.${input},slug.ilike.${input}`)
    .limit(10);

  if (error) {
    logger.error('Failed to resolve document', { input, error });
    return { status: 'not_found', query: input };
  }

  if (!exact || exact.length === 0) {
    return { status: 'not_found', query: input };
  }

  if (exact.length === 1) {
    const result: ResolutionResult<number> = {
      status: 'resolved',
      id: exact[0].id,
      name: exact[0].name
    };
    setCache(cacheKey, result);
    return result;
  }

  // Multiple matches - return ambiguous
  return {
    status: 'ambiguous',
    query: input,
    options: exact.map(d => ({ id: d.id, name: d.name || 'Unnamed Document' }))
  };
}

/**
 * Resolve tenant name/slug to ID
 */
export async function resolveTenant(input: string | number): Promise<ResolutionResult<number>> {
  if (typeof input === 'number') {
    return { status: 'resolved', id: input };
  }

  const cacheKey = `tenant:${input}`;
  const cached = getFromCache<ResolutionResult<number>>(cacheKey);
  if (cached) return cached;

  const supabase = await createClient();

  // Try exact match first (case-insensitive)
  const { data: exact, error } = await supabase
    .from('tenants')
    .select('id, name')
    .or(`name.ilike.${input},slug.ilike.${input}`)
    .limit(10);

  if (error) {
    logger.error('Failed to resolve tenant', { input, error });
    return { status: 'not_found', query: input };
  }

  if (!exact || exact.length === 0) {
    return { status: 'not_found', query: input };
  }

  if (exact.length === 1) {
    const result: ResolutionResult<number> = {
      status: 'resolved',
      id: exact[0].id,
      name: exact[0].name
    };
    setCache(cacheKey, result);
    return result;
  }

  // Multiple matches - return ambiguous
  return {
    status: 'ambiguous',
    query: input,
    options: exact.map(t => ({ id: t.id, name: t.name || 'Unnamed' }))
  };
}