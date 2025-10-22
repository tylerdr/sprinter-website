import type {
  SourceDocumentUIPart,
  SourceUrlUIPart,
  ProviderMetadata
} from "ai";
import type { SprinterSource } from "../../tools/types";

type SourcePart = SourceUrlUIPart | SourceDocumentUIPart;

interface SprinterMetadataEntry {
  snippet?: string;
  pageNumber?: number;
  score?: number;
  kind?: string;
  thumbnailUrl?: string;
  sourceMetadata?: unknown;
  metadata?: unknown; // Keep for backward compat
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function extractSprinterMetadata(
  providerMetadata: ProviderMetadata | undefined
): SprinterMetadataEntry {
  if (!providerMetadata || !isRecord(providerMetadata)) return {};

  // Check if it's nested under 'sprinter' (standard) or flat (legacy)
  const source = isRecord(providerMetadata.sprinter)
    ? (providerMetadata.sprinter as SprinterMetadataEntry & {
        sourceMetadata?: unknown;
      })
    : (providerMetadata as SprinterMetadataEntry & {
        sourceMetadata?: unknown;
      });

  const {
    snippet,
    pageNumber,
    score,
    kind,
    thumbnailUrl,
    sourceMetadata,
    metadata
  } = source;

  return {
    snippet,
    pageNumber,
    score,
    kind,
    thumbnailUrl,
    sourceMetadata: sourceMetadata || metadata, // Use sourceMetadata if available, fall back to metadata
    metadata: metadata // Keep for backward compat
  };
}

export function normalizeSourceParts(
  parts: SourcePart[] = []
): SprinterSource[] {
  const seen = new Set<string>();
  const normalized: SprinterSource[] = [];

  parts.forEach((part, streamIndex) => {
    const sourceId =
      (typeof part.sourceId === "string" && part.sourceId.trim().length > 0
        ? part.sourceId
        : undefined) || String(streamIndex + 1);

    if (seen.has(sourceId)) return;
    seen.add(sourceId);

    const sprinterMeta = extractSprinterMetadata(part.providerMetadata);
    // Use sourceMetadata if available, otherwise fall back to metadata
    const rawMetadata = isRecord(sprinterMeta.sourceMetadata)
      ? (sprinterMeta.sourceMetadata as Record<string, unknown>)
      : isRecord(sprinterMeta.metadata)
        ? (sprinterMeta.metadata as Record<string, unknown>)
        : undefined;

    const orderFromId = Number(sourceId);
    const order =
      Number.isFinite(orderFromId) && orderFromId > 0
        ? orderFromId
        : normalized.length + 1;

    const titleFromMetadata = rawMetadata?.title;
    const descriptionFromMetadata = rawMetadata?.description;
    const quote =
      typeof rawMetadata?.quote === "string" ? rawMetadata.quote : undefined;
    const labelFromMetadata = rawMetadata?.label;

    // Extract label - prefer metadata label, then source, then kind
    let label: string | undefined;
    if (
      typeof labelFromMetadata === "string" &&
      labelFromMetadata.trim().length > 0
    ) {
      label = labelFromMetadata;
    } else if (
      typeof rawMetadata?.source === "string" &&
      rawMetadata.source.length <= 20
    ) {
      label = rawMetadata.source;
    } else if (typeof sprinterMeta.kind === "string") {
      label = sprinterMeta.kind;
    }

    const normalizedEntry: SprinterSource = {
      id: sourceId,
      order,
      streamIndex,
      sourceType: part.type === "source-document" ? "document" : "url",
      title:
        typeof part.title === "string" && part.title.trim().length > 0
          ? part.title
          : typeof titleFromMetadata === "string" &&
              titleFromMetadata.trim().length > 0
            ? titleFromMetadata
            : `Source ${order}`,
      url: part.type === "source-url" ? part.url : undefined,
      description:
        typeof descriptionFromMetadata === "string"
          ? descriptionFromMetadata
          : sprinterMeta.snippet,
      snippet: sprinterMeta.snippet,
      pageNumber:
        typeof sprinterMeta.pageNumber === "number"
          ? sprinterMeta.pageNumber
          : typeof rawMetadata?.pageNumber === "number"
            ? rawMetadata.pageNumber
            : undefined,
      score:
        typeof sprinterMeta.score === "number" ? sprinterMeta.score : undefined,
      kind:
        typeof sprinterMeta.kind === "string" ? sprinterMeta.kind : undefined,
      thumbnailUrl:
        typeof sprinterMeta.thumbnailUrl === "string"
          ? sprinterMeta.thumbnailUrl
          : undefined,
      metadata: rawMetadata,
      quote,
      label,
      raw: part as any // Type casting for compatibility
    };

    normalized.push(normalizedEntry);
  });

  normalized.sort((a, b) => {
    if (a.order === b.order) {
      return (a.streamIndex || 0) - (b.streamIndex || 0);
    }
    return (a.order || 0) - (b.order || 0);
  });

  return normalized;
}
