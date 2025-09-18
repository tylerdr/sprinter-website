/**
 * Social Post Generator UI Components
 */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  Hash,
  Image,
  Clock,
  AlertCircle,
  CheckCircle,
  Sparkles,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  socialPostGeneratorInputSchema,
  socialPostGeneratorOutputSchema
} from "./tool";
import { z } from "zod";

type InputType = z.infer<typeof socialPostGeneratorInputSchema>;
type OutputType = z.infer<typeof socialPostGeneratorOutputSchema>;

/**
 * Result display component
 */
export const Result: React.FC<{ data: OutputType }> = ({ data }) => {
  const [copied, setCopied] = React.useState(false);
  const [copiedHashtags, setCopiedHashtags] = React.useState(false);

  const handleCopy = (text: string, type: "content" | "hashtags") => {
    navigator.clipboard.writeText(text);
    if (type === "content") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopiedHashtags(true);
      setTimeout(() => setCopiedHashtags(false), 2000);
    }
  };

  const getPlatformColor = (charCount: number, platform?: string) => {
    if (!platform) return "";
    const limits: Record<string, number> = {
      twitter: 280,
      linkedin: 3000,
      facebook: 63206,
      instagram: 2200
    };
    const limit = limits[platform] || 1000;
    const percentage = (charCount / limit) * 100;

    if (percentage > 95) return "text-red-600";
    if (percentage > 80) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">
      {/* Main Post Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Generated Post</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={data.platformOptimized ? "default" : "secondary"}>
                {data.platformOptimized ? "Platform Optimized" : "Generic"}
              </Badge>
              <span
                className={`text-sm font-medium ${getPlatformColor(data.characterCount)}`}
              >
                {data.characterCount} characters
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Textarea
                value={data.content}
                readOnly
                className="min-h-[120px] pr-12"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(data.content, "content")}
              >
                {copied ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Hashtags */}
            {data.hashtags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1">
                    <Hash className="h-4 w-4" />
                    Hashtags
                  </Label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      handleCopy(data.hashtags.join(" "), "hashtags")
                    }
                  >
                    {copiedHashtags ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy All
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {data.hashtags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Tabs */}
      <Tabs defaultValue="images" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="images">Image Suggestions</TabsTrigger>
          <TabsTrigger value="tips">Posting Tips</TabsTrigger>
          <TabsTrigger value="alternatives">Alternative Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Image className="h-4 w-4" />
                Suggested Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.suggestedImages.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-sm">{suggestion}</span>
                  </li>
                ))}
              </ul>
              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Use high-quality, relevant images to increase engagement by up
                  to 2.3x
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Posting Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {data.postingTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alternatives" className="space-y-4">
          {data.alternativeVersions && data.alternativeVersions.length > 0 ? (
            data.alternativeVersions.map((alt, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base capitalize">
                      {alt.tone} Version
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(alt.content, "content")}
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{alt.content}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">
                  No alternative versions available
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

/**
 * Loading component
 */
export const Loading: React.FC = () => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center space-x-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <div>
          <p className="font-medium">Generating Social Post...</p>
          <p className="text-sm text-muted-foreground">
            Crafting engaging content for your audience
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

/**
 * Error component
 */
export const Error: React.FC<{ message: string }> = ({ message }) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>
      <div className="font-semibold">Generation Failed</div>
      <p className="mt-1">{message}</p>
    </AlertDescription>
  </Alert>
);

/**
 * Input form component
 */
export const InputForm: React.FC<{
  onSubmit: (data: InputType) => void;
  isLoading?: boolean;
}> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<Partial<InputType>>({
    platform: "linkedin",
    topic: "market-update",
    tone: "professional",
    includeHashtags: false,
    includeEmojis: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as InputType);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Select
            value={formData.platform}
            onValueChange={value =>
              setFormData((prev: Partial<InputType>) => ({
                ...prev,
                platform: value as any
              }))
            }
            disabled={isLoading}
          >
            <SelectTrigger id="platform">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="topic">Topic</Label>
          <Select
            value={formData.topic}
            onValueChange={value =>
              setFormData((prev: Partial<InputType>) => ({
                ...prev,
                topic: value as any
              }))
            }
            disabled={isLoading}
          >
            <SelectTrigger id="topic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="market-update">Market Update</SelectItem>
              <SelectItem value="rate-alert">Rate Alert</SelectItem>
              <SelectItem value="educational">Educational</SelectItem>
              <SelectItem value="success-story">Success Story</SelectItem>
              <SelectItem value="tips">Tips</SelectItem>
              <SelectItem value="promotion">Promotion</SelectItem>
              <SelectItem value="holiday">Holiday</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="tone">Tone</Label>
        <Select
          value={formData.tone}
          onValueChange={value =>
            setFormData((prev: Partial<InputType>) => ({
              ...prev,
              tone: value as any
            }))
          }
          disabled={isLoading}
        >
          <SelectTrigger id="tone">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="friendly">Friendly</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="educational">Educational</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.topic === "rate-alert" && (
        <div className="space-y-2">
          <Label>Current Rates (Optional)</Label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="thirtyYear" className="text-xs">
                30-Year
              </Label>
              <Input
                id="thirtyYear"
                type="number"
                step="0.01"
                placeholder="6.75"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev: Partial<InputType>) => ({
                    ...prev,
                    currentRates: {
                      ...prev.currentRates,
                      thirtyYear: parseFloat(e.target.value)
                    }
                  }))
                }
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="fifteenYear" className="text-xs">
                15-Year
              </Label>
              <Input
                id="fifteenYear"
                type="number"
                step="0.01"
                placeholder="6.25"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev: Partial<InputType>) => ({
                    ...prev,
                    currentRates: {
                      ...prev.currentRates,
                      fifteenYear: parseFloat(e.target.value)
                    }
                  }))
                }
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="fiveArm" className="text-xs">
                5/1 ARM
              </Label>
              <Input
                id="fiveArm"
                type="number"
                step="0.01"
                placeholder="6.00"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData((prev: Partial<InputType>) => ({
                    ...prev,
                    currentRates: {
                      ...prev.currentRates,
                      fiveArmYear: parseFloat(e.target.value)
                    }
                  }))
                }
                disabled={isLoading}
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="customMessage">Custom Message (Optional)</Label>
        <Textarea
          id="customMessage"
          placeholder="Add any specific message or context..."
          value={formData.customMessage || ""}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData((prev: Partial<InputType>) => ({
              ...prev,
              customMessage: e.target.value
            }))
          }
          disabled={isLoading}
        />
      </div>

      <div>
        <Label htmlFor="cta">Call to Action (Optional)</Label>
        <Input
          id="cta"
          placeholder="e.g., Call today for a free consultation!"
          value={formData.callToAction || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData((prev: Partial<InputType>) => ({
              ...prev,
              callToAction: e.target.value
            }))
          }
          disabled={isLoading}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="hashtags" className="text-sm">
            Include Hashtags
          </Label>
          <Switch
            id="hashtags"
            checked={formData.includeHashtags}
            onCheckedChange={checked =>
              setFormData((prev: Partial<InputType>) => ({
                ...prev,
                includeHashtags: checked
              }))
            }
            disabled={isLoading}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="emojis" className="text-sm">
            Include Emojis
          </Label>
          <Switch
            id="emojis"
            checked={formData.includeEmojis}
            onCheckedChange={checked =>
              setFormData((prev: Partial<InputType>) => ({
                ...prev,
                includeEmojis: checked
              }))
            }
            disabled={isLoading}
          />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        <Share2 className="h-4 w-4 mr-2" />
        {isLoading ? "Generating..." : "Generate Post"}
      </Button>
    </form>
  );
};

/**
 * Export the complete UI implementation
 */
const ui: ToolUI<
  typeof socialPostGeneratorInputSchema,
  typeof socialPostGeneratorOutputSchema
> = {
  Result,
  Loading,
  Error,
  InputForm
};

export default ui;
