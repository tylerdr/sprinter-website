"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Image as ImageIcon,
  Download,
  Loader2,
  Info,
  Sparkles,
  AlertCircle,
  Copy,
  ExternalLink
} from "lucide-react";
import type { z } from "zod";
import type { inputSchema, outputSchema } from "./tool";

type Input = z.infer<typeof inputSchema>;
type Output = z.infer<typeof outputSchema>;

// AI Image Display Component
function AIImage({
  src,
  alt,
  className = ""
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-auto rounded-lg shadow-lg"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setError("Failed to load image");
        }}
        style={{ display: isLoading || error ? "none" : "block" }}
      />
    </div>
  );
}

// Result Component
export function Result({ data }: { data: Output }) {
  const { images, metadata } = data;
  const [copied, setCopied] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState(0);

  // Get the current image
  const currentImage = images[selectedImage];
  const imageUrl = currentImage?.url || "";
  const provider = currentImage?.model || "unknown";
  const revisedPrompt = currentImage?.revisedPrompt;

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-generated-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInNewTab = () => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-700">
              <Sparkles className="h-5 w-5" />
              Image Generated Successfully
            </div>
            <Badge variant={provider === "openai" ? "default" : "secondary"}>
              {provider === "openai" ? "DALL-E 3" : "Placeholder"}
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Generated Image */}
      <Card>
        <CardHeader className="sr-only">
          <CardTitle>Generated Image</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {/* Image selector if multiple images */}
          {images.length > 1 && (
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative min-w-[100px] h-[100px] rounded-lg overflow-hidden border-2 ${
                    selectedImage === idx
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`Generated ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                    {img.model}
                  </div>
                </button>
              ))}
            </div>
          )}

          <AIImage src={imageUrl} alt="AI Generated Image" className="mb-4" />

          {/* Action Buttons */}
          <div className="flex gap-2 mb-4">
            <Button onClick={handleDownload} size="sm" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              onClick={handleCopyUrl}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy URL"}
            </Button>
            <Button
              onClick={handleOpenInNewTab}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open
            </Button>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-600">Model:</span>
              <span className="ml-2 font-medium capitalize">{provider}</span>
            </div>
            <div>
              <span className="text-gray-600">Total Images:</span>
              <span className="ml-2 font-medium">{metadata.totalImages}</span>
            </div>
            <div>
              <span className="text-gray-600">Quality:</span>
              <span className="ml-2 font-medium capitalize">
                {(metadata as any).quality || "standard"}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Aspect Ratio:</span>
              <span className="ml-2 font-medium">{metadata.aspectRatio}</span>
            </div>
            <div>
              <span className="text-gray-600">Size:</span>
              <span className="ml-2 font-medium capitalize">
                {metadata.size}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Generation Time:</span>
              <span className="ml-2 font-medium">
                {(metadata.generationTime / 1000).toFixed(2)}s
              </span>
            </div>
          </div>

          {/* Prompts */}
          {revisedPrompt && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 mb-1 font-medium">
                  Enhanced Prompt:
                </p>
                <p className="text-sm">{revisedPrompt}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Alert */}
      {provider === "openai" && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Image Hosting</AlertTitle>
          <AlertDescription>
            DALL-E generated images are temporarily hosted by OpenAI. Download
            the image to save it permanently.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Loading Component
export function Loading() {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <Sparkles className="h-6 w-6 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-900">
                Generating your image...
              </p>
              <p className="text-xs text-gray-500 mt-1">
                This may take 5-15 seconds
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Error Component
export function Error({ error }: { error: Error }) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Generation Failed</AlertTitle>
      <AlertDescription>
        {error?.message}
        {error?.message.includes("API key") && (
          <p className="mt-2 text-xs">
            Please ensure your OpenAI API key is configured correctly.
          </p>
        )}
      </AlertDescription>
    </Alert>
  );
}

// Input Form Component
export function InputForm({ onSubmit }: { onSubmit: (data: Input) => void }) {
  const [formData, setFormData] = React.useState<Partial<Input>>({
    model: "auto",
    aspectRatio: "1:1",
    size: "medium",
    quality: "standard",
    n: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.prompt) {
      onSubmit(formData as Input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1">
          Image Description *
        </label>
        <textarea
          value={typeof formData.prompt === "string" ? formData.prompt : ""}
          onChange={e =>
            setFormData({
              ...formData,
              prompt: e.target.value
            })
          }
          className="w-full border rounded px-3 py-2 min-h-[100px]"
          placeholder="Describe the image you want to generate..."
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Be specific and descriptive for best results
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">AI Model</label>
          <select
            value={formData.model}
            onChange={e =>
              setFormData({
                ...formData,
                model: e.target.value as any
              })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="auto">Auto (Best Available)</option>
            <option value="openai">OpenAI DALL-E 3</option>
            <option value="google">Google Gemini</option>
            <option value="xai">xAI Grok</option>
            <option value="all">All Models (Compare)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Style</label>
          <select
            value={formData.style || ""}
            onChange={e =>
              setFormData({
                ...formData,
                style: (e.target.value as any) || undefined
              })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Default</option>
            <option value="realistic">Realistic</option>
            <option value="artistic">Artistic</option>
            <option value="cartoon">Cartoon</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Aspect Ratio</label>
          <select
            value={formData.aspectRatio}
            onChange={e =>
              setFormData({
                ...formData,
                aspectRatio: e.target.value as any
              })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="1:1">1:1 (Square)</option>
            <option value="16:9">16:9 (Landscape)</option>
            <option value="9:16">9:16 (Portrait)</option>
            <option value="4:3">4:3 (Standard)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quality</label>
          <select
            value={(formData as any).quality || "standard"}
            onChange={e =>
              setFormData({
                ...formData,
                quality: e.target.value as "standard" | "hd"
              } as any)
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="standard">Standard</option>
            <option value="hd">HD (Higher Cost)</option>
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-xs text-blue-700">
            <p className="font-medium mb-1">Pricing Information:</p>
            <ul className="space-y-1">
              <li>• Standard quality: $0.040 per image</li>
              <li>• HD quality: $0.080 per image</li>
              <li>
                • Images are generated at 1024x1024, 1792x1024, or 1024x1792
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Sparkles className="h-4 w-4" />
        Generate Image
      </button>
    </form>
  );
}

// Export all components
export default {
  Result,
  Loading,
  Error,
  InputForm
};
