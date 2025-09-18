/**
 * Source Types
 * Source and citation types for AI tool results
 *
 * IMPORTANT: Sources in the AI SDK v5 use native source parts (source-url, source-document),
 * NOT custom data parts. This module provides utilities to convert our extended
 * SprinterSource format to the native AI SDK source parts.
 */

import { z } from "zod";
import type {
  SourceUrlUIPart,
  SourceDocumentUIPart,
  ProviderMetadata,
  JSONValue
} from "ai";

/**
 * Extended source schema for Sprinter tools
 *
 * This is our internal representation that includes additional metadata
 * beyond what the native AI SDK source parts support. When streaming,
 * these are converted to native SourceUrlUIPart or SourceDocumentUIPart
 * with extended properties stored in providerMetadata.
 *
 * @example
 * ```typescript
 * const source: SprinterSource = {
 *   sourceType: 'url',
 *   title: 'Example Document',
 *   url: 'https://example.com/doc.pdf',
 *   snippet: 'Relevant excerpt from the document...',
 *   pageNumber: 42,
 *   score: 0.95
 * };
 * ```
 */
export const SprinterSourceBaseZ = z.object({
  /** Maps to sourceId in AI SDK v5 source parts (assigned at stream time) */
  id: z.string().optional(),
  /** Source type discriminator - determines native part type */
  sourceType: z.enum(["url", "document"]).default("url"),
  /** Maps to title in native source parts */
  title: z.string(),
  /** Maps to url in SourceUrlUIPart (required for url type) */
  url: z.url().optional(),

  // Extended properties stored in providerMetadata
  /** Page number reference within the source */
  pageNumber: z.number().int().optional(),
  /** Relevant text snippet from the source */
  snippet: z.string().optional(),
  /** Relevance score (0-1) */
  score: z.number().min(0).max(1).optional(),
  /** Source kind/category */
  kind: z.string().optional(),
  /** Thumbnail image URL */
  thumbnailUrl: z.string().url().optional(),
  /** Source label */
  label: z.string().optional(),
  /** Source quote */
  quote: z.string().optional(),
  /** Source description */
  description: z.string().optional(),
  /** Source order */
  order: z.number().int().optional(),
  /** Original stream index (for stable ordering) */
  streamIndex: z.number().int().optional(),

  // For SourceDocumentUIPart compatibility
  /** MIME type for document sources */
  mediaType: z.string().optional(),
  /** Filename for document sources */
  filename: z.string().optional(),

  /** Additional metadata - stored in metadata */
  metadata: z.record(z.string(), z.unknown()).optional(),
  /** Provider metadata passthrough */
  providerMetadata: z.unknown().optional(),
  /** Raw source part passthrough */
  raw: z.unknown().optional()
});

export const SprinterSourceZ = SprinterSourceBaseZ;
export type SprinterSource = z.infer<typeof SprinterSourceZ>;

/**
 * Provider metadata entry for extended source properties
 * Stored directly in providerMetadata in native source parts (flat structure)
 */
export type SprinterProviderMetadataEntry = {
  snippet?: string;
  pageNumber?: number;
  score?: number;
  kind?: string;
  thumbnailUrl?: string;
  label?: string;
  quote?: string;
  description?: string;
  sourceMetadata?: JSONValue;
};

export type SprinterProviderMetadata = ProviderMetadata;

/**
 * Helper to convert unknown values to JSONValue for providerMetadata
 */
function toJSONValue(value: unknown): JSONValue | undefined {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  )
    return value as JSONValue;
  if (Array.isArray(value)) {
    const arr = value
      .map(v => toJSONValue(v))
      .filter((v): v is JSONValue => v !== undefined);
    return arr as JSONValue;
  }
  if (typeof value === "object") {
    const obj: Record<string, JSONValue> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const jv = toJSONValue(v);
      if (jv !== undefined) obj[k] = jv;
    }
    return obj as JSONValue;
  }
  return undefined;
}

/**
 * Convert SprinterSource to AI SDK native source UI parts.
 *
 * This function transforms our extended source format to the native
 * AI SDK source parts that can be streamed to the client.
 *
 * Mapping:
 * - sourceType='url' -> SourceUrlUIPart with type='source-url'
 * - sourceType='document' -> SourceDocumentUIPart with type='source-document'
 * - Extended properties -> providerMetadata.sprinter
 *
 * Note: sourceId is left empty and assigned at stream time to ensure
 * sequential ordering across parallel tool executions.
 *
 * @param sources - Array of SprinterSource objects
 * @returns Array of native AI SDK source parts
 *
 * @example
 * ```typescript
 * const sources: SprinterSource[] = [...];
 * const nativeParts = toAISdkSources(sources);
 * // Stream the native parts
 * for (const part of nativeParts) {
 *   writer.write({ type: part.type, value: part });
 * }
 * ```
 */
export function toAISdkSources(
  sources: SprinterSource[] = []
): Array<SourceUrlUIPart | SourceDocumentUIPart> {
  return sources.flatMap((s): Array<SourceUrlUIPart | SourceDocumentUIPart> => {
    // Determine native part type based on sourceType
    const sourceType = s.sourceType || (s.url ? "url" : "document");

    // Build provider metadata for extended properties
    // Store under a flat 'sprinter' namespace to match ProviderMetadata type
    const sprinterMeta: Record<string, JSONValue> = {};
    if (s.snippet !== undefined) sprinterMeta.snippet = s.snippet;
    if (s.pageNumber !== undefined) sprinterMeta.pageNumber = s.pageNumber;
    if (s.score !== undefined) sprinterMeta.score = s.score;
    if (s.kind !== undefined) sprinterMeta.kind = s.kind;
    if (s.thumbnailUrl !== undefined)
      sprinterMeta.thumbnailUrl = s.thumbnailUrl;
    if (s.label !== undefined) sprinterMeta.label = s.label;
    if (s.quote !== undefined) sprinterMeta.quote = s.quote;
    if (s.description !== undefined) sprinterMeta.description = s.description;

    // Store metadata separately to avoid confusion with providerMetadata
    if (s.metadata !== undefined) {
      const jv = toJSONValue(s.metadata);
      if (jv !== undefined) sprinterMeta.sourceMetadata = jv;
    }

    const hasProviderMetadata = Object.keys(sprinterMeta).length > 0;
    const providerMetadata: SprinterProviderMetadata = hasProviderMetadata
      ? { sprinter: sprinterMeta }
      : {};

    // Convert to native source part based on type
    if (sourceType === "document") {
      const part: SourceDocumentUIPart = {
        type: "source-document",
        sourceId: "", // Assigned at stream time
        mediaType: s.mediaType || "application/pdf",
        title: s.title,
        ...(s.filename ? { filename: s.filename } : {}),
        ...(hasProviderMetadata ? { providerMetadata } : {})
      };
      return [part];
    } else if (sourceType === "url" && s.url) {
      const part: SourceUrlUIPart = {
        type: "source-url",
        sourceId: "", // Assigned at stream time
        url: s.url,
        title: s.title,
        ...(hasProviderMetadata ? { providerMetadata } : {})
      };
      return [part];
    }

    // Skip invalid sources
    return [];
  });
}

/**
 * Extract SprinterSource array from tool results
 */
export function sourcesFromToolResult<T = unknown>(
  result: { sources?: SprinterSource[] } | undefined
): SprinterSource[] {
  if (!result) return [];
  const anyResult = result as { sources?: SprinterSource[] };
  return Array.isArray(anyResult.sources) ? anyResult.sources : [];
}

/**
 * Build native AI SDK source parts from tool results
 * Convenience function that combines extraction and conversion
 */
export function buildSourceUIParts<T = unknown>(
  result: { sources?: SprinterSource[] } | undefined
): Array<SourceUrlUIPart | SourceDocumentUIPart> {
  return toAISdkSources(sourcesFromToolResult(result));
}

/**
 * Zod helper for tool authors to add sources to their output schema
 *
 * @example
 * ```typescript
 * const outputSchema = withSources(
 *   z.object({
 *     answer: z.string(),
 *     confidence: z.number()
 *   })
 * );
 * ```
 */
export const withSources = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    sources: z.array(SprinterSourceZ).optional().default([])
  });
