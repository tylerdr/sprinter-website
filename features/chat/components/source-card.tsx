import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, FileText, Book, Globe } from "lucide-react";
import { type SprinterSource } from "@/features/tools/types";

interface SourcesProps {
  source: SprinterSource;
  onClick: (source: SprinterSource) => void;
}

function getMetadataString(
  metadata: Record<string, unknown> | undefined,
  key: string
): string | undefined {
  const value = metadata?.[key];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
}

function getMetadataNumber(
  metadata: Record<string, unknown> | undefined,
  key: string
): number | undefined {
  const value = metadata?.[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return undefined;
}

export function SourceCard({ source, onClick }: SourcesProps) {
  if (!source) return null;
  const metadata = source.metadata;
  const typeLabel = getMetadataString(metadata, "type") || source.kind;
  const icon =
    typeLabel === "document" ? (
      <FileText className="h-4 w-4" />
    ) : typeLabel === "guideline" ? (
      <Book className="h-4 w-4" />
    ) : (
      <Globe className="h-4 w-4" />
    );

  const badgeLabel =
    getMetadataString(metadata, "number") ||
    (Number.isFinite(source.order) ? String(source.order) : undefined);
  const description = source.description || source.snippet;
  const sourceLabel = getMetadataString(metadata, "source");
  const pageNumber =
    source.pageNumber ?? getMetadataNumber(metadata, "pageNumber");

  const handleClick = () => {
    if (source.url) {
      window.open(source.url, "_blank");
    } else {
      onClick(source);
    }
  };

  return (
    <Card
      key={source.id}
      className="p-3 hover:bg-accent/50 transition-colors cursor-pointer"
      onClick={handleClick}
      data-source
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-muted-foreground">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="text-sm font-medium line-clamp-1">
                {badgeLabel && (
                  <Badge variant="secondary" className="mr-2 text-xs">
                    {badgeLabel}
                  </Badge>
                )}
                {source.title || "Untitled Source"}
              </h4>
              {description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1">
                {sourceLabel && (
                  <span className="text-xs text-muted-foreground">
                    {sourceLabel}
                  </span>
                )}
                {pageNumber !== undefined && (
                  <span className="text-xs text-muted-foreground">
                    • Page {pageNumber}
                  </span>
                )}
              </div>
            </div>
            {source.url && (
              <ExternalLink className="h-3 w-3 text-muted-foreground shrink-0" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
