"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Download,
  FileJson,
  FileText,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import {
  downloadJSON,
  downloadCSV,
  downloadMarkdown,
  generateHTML,
  type ExportFormat,
} from "@/features/tools/lib/export-utils";

export interface ToolExportButtonProps {
  data: any;
  filename?: string;
  title?: string;
  formats?: ExportFormat[];
  customFormatters?: {
    [key in ExportFormat]?: (data: any) => void | string | Blob | Promise<void | string | Blob>;
  };
  className?: string;
  generatedByName?: string | null;
  generatedByEmail?: string | null;
  eventId?: string;
}

const formatIcons = {
  json: FileJson,
  csv: FileSpreadsheet,
  markdown: FileText,
  pdf: Printer,
};

const formatLabels = {
  json: "Export as JSON",
  csv: "Export as CSV",
  markdown: "Export as Markdown",
  pdf: "Export as PDF",
};


export function ToolExportButton({
  data,
  filename = "tool-export",
  title = "Tool Result",
  formats = ["json", "csv", "markdown", "pdf"],
  customFormatters = {},
  className,
  generatedByName,
  generatedByEmail,
  eventId,
}: ToolExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  // Extract tool slug from current path if we're on a tool page
  const toolSlug = typeof window !== 'undefined'
    ? window.location.pathname.match(/\/tools\/([^\/]+)/)?.[1] ?? null
    : null;

  const handleExport = async (format: ExportFormat) => {
    setIsExporting(true);

    try {
      // Generate filename with timestamp
      const timestamp = new Date().toISOString().split('T')[0];
      const baseFilename = `${filename}-${timestamp}`;

      // Use custom formatter if provided
      if (customFormatters[format]) {
        const content = await customFormatters[format]!(data);

        if (content === undefined) {
          return;
        }

        // Handle different content types
        if (content instanceof Blob) {
          // Direct blob download (e.g., custom PDF)
          const url = URL.createObjectURL(content);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${baseFilename}.${format === 'markdown' ? 'md' : format}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          // String/Buffer content
          const ext = format === 'markdown' ? 'md' : format;
          const mimeType = format === 'json' ? 'application/json' :
                          format === 'csv' ? 'text/csv' :
                          format === 'pdf' ? 'application/pdf' :
                          'text/plain';

          if (typeof window !== 'undefined') {
            const blob = new Blob([content], { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${baseFilename}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }
      } else {
        // Use default formatters
        switch (format) {
          case 'json':
            downloadJSON(data, `${baseFilename}.json`);
            break;
          case 'csv':
            downloadCSV(data, `${baseFilename}.csv`);
            break;
          case 'markdown':
            downloadMarkdown(data, `${baseFilename}.md`, title);
            break;
          case 'pdf':
            // Use Browserless PDF API with URL-based approach if eventId and toolSlug are available
            const pdfUrl = eventId && toolSlug
              ? `${window.location.origin}/tools/${toolSlug}/runs/${eventId}`
              : null;

            const response = await fetch('/api/export/pdf', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                ...(pdfUrl
                  ? { url: pdfUrl, waitForSelector: '[data-tool-result="panel"]' }
                  : { html: generateHTML(data, title, { name: generatedByName, email: generatedByEmail }) }),
                fileName: `${baseFilename}.pdf`,
              }),
            });

            if (!response.ok) {
              throw new Error(await response.text());
            }

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${baseFilename}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 10_000);
            break;
        }
      }
    } catch (error) {
      console.error(`Export failed for format ${format}:`, error);
    } finally {
      setIsExporting(false);
    }
  };

  // If only one format, show a simple button
  if (formats.length === 1) {
    const format = formats[0];
    const Icon = formatIcons[format];

    return (
      <Button
        onClick={() => handleExport(format)}
        disabled={isExporting}
        size="sm"
        variant="outline"
        className={className}
      >
        <Icon className="w-4 h-4 mr-2" />
        {isExporting ? "Exporting..." : formatLabels[format]}
      </Button>
    );
  }

  // Multiple formats - show dropdown
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isExporting}
          size="sm"
          variant="outline"
          className={className}
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? "Exporting..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {formats.map((format) => {
          const Icon = formatIcons[format];
          return (
            <DropdownMenuItem
              key={format}
              onClick={() => handleExport(format)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {formatLabels[format]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
