"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sources as SourcesContainer,
  SourcesTrigger,
  SourcesContent
} from "@/components/ai-elements/sources";
import { SourceCard } from "./source-card";
import { type SprinterSource } from "../../tools/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
// PDF viewer components not yet implemented
// import PdfViewer from "@/app/(admin)/admin/components/pdf-viewer/PdfViewer";
// import { PdfFocusProvider } from "@/app/(admin)/admin/components/pdf-viewer/context/pdf";
import { BookIcon, ChevronDownIcon } from "lucide-react";

export interface AgentChatSourcesProps {
  sources: SprinterSource[];
  className?: string;
}

/**
 * Renders a collapsible list of sources for a chat message with PDF preview dialog on click.
 */
export function AgentChatSources({
  sources,
  className
}: AgentChatSourcesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);
  const currentUrl = useMemo(() => {
    if (openIndex === null) return null;
    return sources[openIndex]?.url || sources[openIndex]?.metadata?.url || "";
  }, [openIndex]);
  function handleOpen(source: SprinterSource, index: number) {
    const url = source?.url || source?.metadata?.url;
    if (!url) return;
    const page = typeof source.pageNumber === "number" ? source.pageNumber : 1;
    setPageIndex(Math.max(0, page - 1));
    setOpenIndex(index);
  }
  if (!sources || sources.length === 0) return null;

  return (
    <>
      <SourcesContainer className={cn("mt-3", className)}>
        <SourcesTrigger
          className="flex items-center justify-between gap-2 text-muted-foreground w-full"
        >
          <div className="flex items-center gap-2 w-full">
            <BookIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{sources.length} sources</span>
          </div>
          <ChevronDownIcon className="h-4 w-4 text-muted-foreground w-fit" />
        </SourcesTrigger>
        <SourcesContent className="mt-3 ">
          <div className="flex flex-col gap-2">
            {sources.map((source, index) => (
              <SourceCard
                key={source.id ?? String(index)}
                source={source}
                onClick={s => handleOpen(s, index)}
              />
            ))}
          </div>
        </SourcesContent>
      </SourcesContainer>

      {openIndex !== null && typeof currentUrl === "string" && (
        <Dialog
          open={openIndex !== null}
          onOpenChange={open => {
            if (!open) setOpenIndex(null);
          }}
        >
          <DialogContent className="w-[95vw] sm:max-w-5xl">
            <DialogHeader>
              <DialogTitle>{sources[openIndex]?.title}</DialogTitle>
            </DialogHeader>
            {/* PDF Viewer not yet implemented
            <PdfFocusProvider> */}
              <div className="h-[80vh]">
                {/* <PdfViewer
                  file={{
                    id: `source-${openIndex}`,
                    url: currentUrl
                  }}
                  pageNumber={pageIndex}
                  setPageNumber={setPageIndex}
                /> */}
                <iframe
                  src={currentUrl}
                  className="w-full h-full border-0"
                  title={sources[openIndex]?.title}
                />
              </div>
            {/* </PdfFocusProvider> */}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
