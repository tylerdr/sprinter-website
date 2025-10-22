"use client";

import { ExternalLink, FileText, Quote, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Citation {
  id: string;
  source: string;
  page?: number;
  paragraph?: number;
  section?: string;
  text: string;
  confidence: number;
  url?: string;
  documentName?: string;
}

interface CitationProps {
  citation: Citation;
  onViewSource?: (citation: Citation) => void;
  showConfidence?: boolean;
  showFullText?: boolean;
  className?: string;
  variant?: "default" | "compact" | "inline";
}

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.9) return "text-green-600 bg-green-50 border-green-200";
  if (confidence >= 0.7) return "text-blue-600 bg-blue-50 border-blue-200";
  if (confidence >= 0.5) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-600 bg-red-50 border-red-200";
};

export function Citation({
  citation,
  onViewSource,
  showConfidence = true,
  showFullText = false,
  className,
  variant = "default"
}: CitationProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(citation.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatLocation = (): string => {
    const parts = [];
    if (citation.page) parts.push(`Page ${citation.page}`);
    if (citation.paragraph) parts.push(`¶${citation.paragraph}`);
    if (citation.section) parts.push(citation.section);
    return parts.join(', ');
  };

  if (variant === "inline") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onViewSource?.(citation)}
              className={cn(
                "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs bg-brand/10 text-brand hover:bg-brand/20 transition-colors",
                className
              )}
            >
              <Quote className="w-3 h-3" />
              [{citation.id}]
            </button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-1">
              <p className="font-medium">{citation.source}</p>
              <p className="text-xs text-muted-foreground">{formatLocation()}</p>
              <p className="text-xs italic">"{citation.text.slice(0, 100)}..."</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}>
        <FileText className="w-3 h-3" />
        <span className="font-medium">{citation.source}</span>
        {formatLocation() && (
          <>
            <span>•</span>
            <span>{formatLocation()}</span>
          </>
        )}
        {showConfidence && (
          <>
            <span>•</span>
            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
              {Math.round(citation.confidence * 100)}%
            </Badge>
          </>
        )}
        {onViewSource && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewSource(citation)}
            className="h-5 px-1"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        )}
      </div>
    );
  }

  // Default variant - full card
  return (
    <Card className={cn("border-l-4 border-l-brand/50", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm">{citation.source}</span>
                {citation.documentName && citation.documentName !== citation.source && (
                  <Badge variant="outline" className="text-xs">
                    {citation.documentName}
                  </Badge>
                )}
              </div>
              
              {formatLocation() && (
                <p className="text-xs text-muted-foreground ml-6">
                  {formatLocation()}
                </p>
              )}
            </div>

            <div className="flex items-center gap-1">
              {showConfidence && (
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs", getConfidenceColor(citation.confidence))}
                >
                  {Math.round(citation.confidence * 100)}%
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-7 px-2"
                disabled={copied}
              >
                {copied ? (
                  <span className="text-xs text-green-600">Copied!</span>
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </Button>

              {onViewSource && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewSource(citation)}
                  className="h-7 px-2"
                >
                  <ExternalLink className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>

          {/* Quote */}
          <div className="relative">
            <Quote className="absolute -left-1 -top-1 w-4 h-4 text-muted-foreground/50" />
            <blockquote className="pl-6 italic text-sm text-muted-foreground border-l-2 border-muted">
              {showFullText 
                ? citation.text 
                : citation.text.length > 150 
                  ? `${citation.text.slice(0, 150)}...`
                  : citation.text
              }
            </blockquote>
          </div>

          {/* Show more/less for long text */}
          {!showFullText && citation.text.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-brand"
              onClick={() => {/* Toggle show full text */}}
            >
              Show full text
            </Button>
          )}

          {/* URL link if available */}
          {citation.url && (
            <div className="pt-2 border-t">
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-brand hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                View source document
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface CitationListProps {
  citations: Citation[];
  onViewSource?: (citation: Citation) => void;
  className?: string;
  title?: string;
  variant?: "default" | "compact";
  showConfidence?: boolean;
}

export function CitationList({
  citations,
  onViewSource,
  className,
  title = "Sources",
  variant = "compact",
  showConfidence = true
}: CitationListProps) {
  if (citations.length === 0) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <FileText className="w-4 h-4" />
        {title} ({citations.length})
      </h4>
      
      <div className="space-y-2">
        {citations.map((citation, index) => (
          <Citation
            key={citation.id || index}
            citation={citation}
            onViewSource={onViewSource}
            variant={variant}
            showConfidence={showConfidence}
          />
        ))}
      </div>
    </div>
  );
}

// Inline citations for embedding within text
export function InlineCitation({ 
  citation, 
  onViewSource 
}: { 
  citation: Citation; 
  onViewSource?: (citation: Citation) => void; 
}) {
  return (
    <Citation
      citation={citation}
      onViewSource={onViewSource}
      variant="inline"
      showConfidence={false}
      className="mx-1"
    />
  );
}