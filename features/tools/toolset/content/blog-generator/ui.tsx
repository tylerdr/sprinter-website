/**
 * Blog Generator UI Components
 */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input as InputField } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ToolUI } from "@/features/tools/types";
import {
  blogGeneratorInputSchema as Input,
  blogGeneratorOutputSchema as Output
} from "./tool";
import { z } from "zod";
import { Copy, Clock, FileText, CheckCircle } from "lucide-react";

type InputType = z.infer<typeof Input>;
type OutputType = z.infer<typeof Output>;

export const Result: React.FC<{ data: OutputType }> = ({ data: result }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{result.title}</CardTitle>
            <Button size="icon" variant="ghost" onClick={handleCopy}>
              {copied ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {result.wordCount} words
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {result.readingTime} min read
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Excerpt</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {result.excerpt}
              </p>
            </div>
            <div>
              <Label>Content</Label>
              <div className="mt-2 p-4 bg-muted/50 rounded-lg max-h-96 overflow-y-auto">
                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                  {result.content}
                </div>
              </div>
            </div>
            <div>
              <Label>SEO Meta Description</Label>
              <p className="text-sm text-muted-foreground mt-1">
                {result.seoMetaDescription}
              </p>
            </div>
            <div>
              <Label>Keywords</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {result.keywords.map((keyword, i) => (
                  <Badge key={i} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const Loading: React.FC = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="font-medium">Generating blog post...</p>
      </div>
    </CardContent>
  </Card>
);

export const Error: React.FC<{ message: string }> = ({ message }) => (
  <Alert variant="destructive">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

export const InputForm: React.FC<{
  onSubmit: (data: InputType) => void;
  isLoading?: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<Partial<InputType>>({
    targetLength: "medium",
    audience: "general",
    includeStats: true,
    includeCTA: true,
    tone: "informative",
    keywords: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic) {
      onSubmit(formData as InputType);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="topic">Topic</Label>
        <InputField
          id="topic"
          value={formData.topic || ""}
          onChange={e =>
            setFormData(prev => ({ ...prev, topic: e.target.value }))
          }
          placeholder="Enter blog topic..."
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <Label htmlFor="keywords">Keywords (comma-separated)</Label>
        <InputField
          id="keywords"
          value={formData.keywords?.join(", ") || ""}
          onChange={e =>
            setFormData(prev => ({
              ...prev,
              keywords: e.target.value
                .split(",")
                .map(k => k.trim())
                .filter(Boolean)
            }))
          }
          placeholder="mortgage, rates, financing"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="targetLength">Length</Label>
          <Select
            value={formData.targetLength}
            onValueChange={value =>
              setFormData(prev => ({ ...prev, targetLength: value as any }))
            }
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (500 words)</SelectItem>
              <SelectItem value="medium">Medium (1000 words)</SelectItem>
              <SelectItem value="long">Long (1500 words)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="audience">Audience</Label>
          <Select
            value={formData.audience}
            onValueChange={value =>
              setFormData(prev => ({ ...prev, audience: value as any }))
            }
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="first-time-buyers">
                First-time Buyers
              </SelectItem>
              <SelectItem value="investors">Investors</SelectItem>
              <SelectItem value="refinancers">Refinancers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading || !formData.topic}
        className="w-full"
      >
        {isLoading ? "Generating..." : "Generate Blog Post"}
      </Button>
    </form>
  );
};

const ui: ToolUI<typeof Input, typeof Output> = {
  Result,
  Loading,
  Error,
  InputForm
};

export default ui;
