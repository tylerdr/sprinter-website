"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
// PDF viewer components not yet implemented
// import PdfViewer from "@/app/(admin)/admin/components/pdf-viewer/PdfViewer";
// import { PdfFocusProvider } from "@/app/(admin)/admin/components/pdf-viewer/context/pdf";

export interface PdfSourceDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback when dialog open state changes */
  onOpenChange: (open: boolean) => void;
  /** Title to display in the dialog header */
  title: string;
  /** URL of the PDF to display */
  url: string;
  /** Unique identifier for the PDF file */
  fileId: string;
  /** Current page number (0-indexed) */
  pageNumber: number;
  /** Callback when page number changes */
  setPageNumber: (pageNumber: number) => void;
}

/**
 * Consolidated PDF dialog component for displaying PDF sources
 * Used by both inline citations and tool result UIs
 */
export function PdfSourceDialog({
  open,
  onOpenChange,
  title,
  url,
  fileId,
  pageNumber,
  setPageNumber
}: PdfSourceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {/* PDF viewer not yet implemented
        <PdfFocusProvider> */}
          <div className="h-[80vh]">
            <iframe
              src={url}
              className="w-full h-full border-0"
              title={title}
            />
            {/* <PdfViewer
              file={{ id: fileId, url }}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            /> */}
          </div>
        {/* </PdfFocusProvider> */}
      </DialogContent>
    </Dialog>
  );
}
