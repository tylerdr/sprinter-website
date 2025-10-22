"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Eye, EyeOff, Download, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

export interface ExtractedAttribute {
  name: string;
  value: string | number | boolean | null;
  confidence: number;
  category: string;
  source?: {
    page: number;
    section: string;
  };
  description?: string;
  unit?: string;
}

interface AttributeDisplayProps {
  attributes: ExtractedAttribute[];
  isBlurred?: boolean;
  onToggleBlur?: () => void;
  onExport?: () => void;
  className?: string;
  title?: string;
  showExportButton?: boolean;
}

const getConfidenceColor = (confidence: number): string => {
  if (confidence >= 0.8) return "text-green-600 bg-green-50 border-green-200";
  if (confidence >= 0.6) return "text-yellow-600 bg-yellow-50 border-yellow-200";
  return "text-red-600 bg-red-50 border-red-200";
};

const getConfidenceLabel = (confidence: number): string => {
  if (confidence >= 0.9) return "Very High";
  if (confidence >= 0.8) return "High";
  if (confidence >= 0.6) return "Medium";
  if (confidence >= 0.4) return "Low";
  return "Very Low";
};

const formatValue = (value: any, unit?: string): string => {
  if (value === null || value === undefined) return "N/A";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") {
    const formatted = value.toLocaleString();
    return unit ? `${formatted} ${unit}` : formatted;
  }
  return String(value);
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

export function AttributeDisplay({
  attributes,
  isBlurred = false,
  onToggleBlur,
  onExport,
  className,
  title = "Extracted Attributes",
  showExportButton = true
}: AttributeDisplayProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [copiedAttribute, setCopiedAttribute] = useState<string | null>(null);

  // Group attributes by category
  const attributesByCategory = attributes.reduce((acc, attr) => {
    if (!acc[attr.category]) {
      acc[attr.category] = [];
    }
    acc[attr.category].push(attr);
    return acc;
  }, {} as Record<string, ExtractedAttribute[]>);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCopyAttribute = async (attribute: ExtractedAttribute) => {
    const text = `${attribute.name}: ${formatValue(attribute.value, attribute.unit)}`;
    await copyToClipboard(text);
    setCopiedAttribute(attribute.name);
    setTimeout(() => setCopiedAttribute(null), 2000);
  };

  const handleCopyAll = async () => {
    const text = attributes
      .map(attr => `${attr.name}: ${formatValue(attr.value, attr.unit)}`)
      .join('\n');
    await copyToClipboard(text);
  };

  if (attributes.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No attributes extracted yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2">
            {onToggleBlur && (
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleBlur}
                className="gap-2"
              >
                {isBlurred ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {isBlurred ? "Show Data" : "Hide Data"}
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyAll}
              className="gap-2"
            >
              <Copy className="w-4 h-4" />
              Copy All
            </Button>
            {showExportButton && onExport && (
              <Button
                variant="default"
                size="sm"
                onClick={onExport}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </Button>
            )}
          </div>
        </div>
        
        {/* Summary stats */}
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>Total: {attributes.length}</span>
          <span>
            Avg Confidence: {Math.round((attributes.reduce((sum, attr) => sum + attr.confidence, 0) / attributes.length) * 100)}%
          </span>
          <span>Categories: {Object.keys(attributesByCategory).length}</span>
        </div>
      </CardHeader>

      <CardContent className={cn("space-y-4", isBlurred && "blur-sm select-none")}>
        {Object.entries(attributesByCategory).map(([category, categoryAttributes]) => (
          <Collapsible
            key={category}
            open={expandedCategories.has(category)}
            onOpenChange={() => toggleCategory(category)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto hover:bg-muted/50"
              >
                <div className="flex items-center gap-3 py-3">
                  {expandedCategories.has(category) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <span className="font-medium capitalize">{category.replace('_', ' ')}</span>
                  <Badge variant="secondary" className="text-xs">
                    {categoryAttributes.length}
                  </Badge>
                </div>
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent className="space-y-2 pb-2">
              {categoryAttributes.map((attribute, index) => (
                <Card key={index} className="border-l-4 border-l-muted">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{attribute.name}</span>
                          {attribute.source && (
                            <Badge variant="outline" className="text-xs">
                              Page {attribute.source.page}
                            </Badge>
                          )}
                        </div>

                        <div className="text-lg font-semibold text-foreground">
                          {formatValue(attribute.value, attribute.unit)}
                        </div>

                        {attribute.description && (
                          <p className="text-sm text-muted-foreground">
                            {attribute.description}
                          </p>
                        )}

                        {/* Confidence indicator */}
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Confidence</span>
                            <span className={cn("font-medium", getConfidenceColor(attribute.confidence))}>
                              {getConfidenceLabel(attribute.confidence)} ({Math.round(attribute.confidence * 100)}%)
                            </span>
                          </div>
                          <Progress 
                            value={attribute.confidence * 100} 
                            className="h-1"
                          />
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyAttribute(attribute)}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        disabled={isBlurred}
                      >
                        {copiedAttribute === attribute.name ? (
                          <span className="text-xs text-green-600">Copied!</span>
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}

        {isBlurred && onToggleBlur && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <Button onClick={onToggleBlur} size="lg" className="gap-2">
              <Eye className="w-5 h-5" />
              Unlock Full Data
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}