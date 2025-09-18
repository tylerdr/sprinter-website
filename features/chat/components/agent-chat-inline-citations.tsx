"use client";

import React, { useState, useCallback } from "react";
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardTrigger,
  InlineCitationCardBody,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselItem,
  InlineCitationSource,
  InlineCitationQuote
} from "@/components/ai-elements/inline-citation";
import type { SprinterSource } from "@/features/tools/types";
import { PdfSourceDialog } from "./source-dialog";

export interface AgentChatInlineCitationProps {
  source: SprinterSource;
  label: string;
  index: number; // citation number
  className?: string;
}

export function AgentChatInlineCitation({
  source,
  label,
  index,
  className
}: AgentChatInlineCitationProps) {
  const urls: string[] = [];
  if (typeof source.url === "string") urls.push(source.url);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogUrl, setDialogUrl] = useState<string | undefined>(undefined);
  const [pageIndex, setPageIndex] = useState<number>(0);

  const getDefaultPageIndex = useCallback(() => {
    const p =
      typeof source?.pageNumber === "number"
        ? source.pageNumber
        : typeof source?.metadata?.pageNumber === "number"
          ? (source!.metadata!.pageNumber as number)
          : 1;
    return Math.max(0, (p || 1) - 1);
  }, [source]);

  const isPdfUrl = (u?: string) => (u || "").toLowerCase().includes(".pdf");

  const handleDefaultOpen = useCallback(async () => {
    const candidateUrl = source.url || source.metadata?.url;
    if (!candidateUrl || typeof candidateUrl !== "string") return;

    const isDocument =
      source.sourceType === "document" || isPdfUrl(candidateUrl);
    if (!isDocument) {
      window.open(candidateUrl, "_blank");
      return;
    }

    setDialogUrl(candidateUrl);
    setPageIndex(getDefaultPageIndex());
    setDialogOpen(true);
  }, [
    getDefaultPageIndex,
    source.sourceType,
    source.url,
    source.metadata?.url
  ]);

  const handleTriggerClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await handleDefaultOpen();
  };

  const pageLabel = (() => {
    const p =
      typeof source?.pageNumber === "number"
        ? source.pageNumber
        : typeof source?.metadata?.pageNumber === "number"
          ? (source!.metadata!.pageNumber as number)
          : undefined;
    return typeof p === "number" ? `Page ${p}` : undefined;
  })();

  const thumbUrl =
    (typeof source.thumbnailUrl === "string" && source.thumbnailUrl) ||
    (typeof source.metadata?.thumbnail_url === "string"
      ? (source.metadata!.thumbnail_url as string)
      : undefined);

  return (
    <>
      <InlineCitation
        className={className ? className : "inline align-baseline"}
      >
        <InlineCitationCard openDelay={300} closeDelay={100}>
          <InlineCitationCardTrigger
            sources={urls}
            className="citation-marker text-[10px] h-auto min-h-0 ml-0.5 leading-none font-normal align-baseline !bg-muted/40 dark:!bg-muted/30 !text-foreground/80 !border-border/50"
            data-citation
            variant="secondary"
            onClick={handleTriggerClick}
          >
            {label}
          </InlineCitationCardTrigger>
          <InlineCitationCardBody>
            <InlineCitationCarousel>
              <InlineCitationCarouselContent>
                <InlineCitationCarouselItem>
                  <InlineCitationSource
                    title={source.title || `Source ${index}`}
                    url={source.url}
                    description={
                      source.description || source.snippet || pageLabel
                    }
                  >
                    <div className="mt-2 mx-auto w-full sm:max-w-[180px] h-32 sm:h-[120px] overflow-hidden rounded-md border bg-muted/10">
                      {thumbUrl ? (
                        <img
                          src={thumbUrl}
                          alt={source.title || `Source ${index}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted/30" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 justify-between">
                      {typeof source.score === "number" && (
                        <div className="text-xs text-muted-foreground">
                          Relevance: {Math.round(source.score * 100)}%
                        </div>
                      )}
                      {source.metadata?.source ? (
                        <div className="text-xs text-muted-foreground">
                          Source: {String(source.metadata.source)}
                        </div>
                      ) : null}
                      {pageLabel && (
                        <div className="text-xs text-muted-foreground font-medium">
                          {pageLabel}
                        </div>
                      )}
                    </div>
                  </InlineCitationSource>

                  {source.quote && (
                    <InlineCitationQuote>{source.quote}</InlineCitationQuote>
                  )}
                </InlineCitationCarouselItem>
              </InlineCitationCarouselContent>
            </InlineCitationCarousel>
          </InlineCitationCardBody>
        </InlineCitationCard>
      </InlineCitation>

      {dialogOpen && dialogUrl && (
        <PdfSourceDialog
          open={dialogOpen}
          onOpenChange={open => {
            if (!open) setDialogOpen(false);
          }}
          title={source.title || `Source ${index}`}
          url={dialogUrl}
          fileId={`source-${index}`}
          pageNumber={pageIndex}
          setPageNumber={setPageIndex}
        />
      )}
    </>
  );
}
