import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { LanguageModel } from "ai";

// llms.txt-style model registry with provider-qualified IDs
export const MODEL_REGISTRY = {
  // Anthropic models
  "anthropic:claude-3-5-sonnet": anthropic("claude-3-5-sonnet-20241022"),
  "anthropic:claude-3-5-haiku": anthropic("claude-3-5-haiku-20241022"),
  "anthropic:claude-3-opus": anthropic("claude-3-opus-20240229"),
  "anthropic:claude-4-sonnet": anthropic("claude-4-sonnet-20250101"), // Assuming latest version

  // OpenAI models
  "openai:gpt-5": openai("gpt-5"),
  "openai:gpt-5-mini": openai("gpt-5-mini"),
  "openai:gpt-4.1": openai("gpt-4.1"),
  "openai:gpt-4.1-mini": openai("gpt-4.1-mini"),

  // Google models
  "google:gemini-2.5-pro": google("gemini-2.5-pro"),
  "google:gemini-2.5-flash": google("gemini-2.5-flash"),
  "google:gemini-2.5-flash-lite": google("gemini-2.5-flash-lite"),
  "google:gemini-2.0-flash": google("gemini-2.0-flash"),

  // Short aliases for common models
  "gpt-4": openai("gpt-4.1"),
  "gpt-5": openai("gpt-5"),
  "gpt-5-mini": openai("gpt-5-mini"),
  "gpt-4o": openai("gpt-4.1"),
  "gpt-4o-mini": openai("gpt-4.1-mini"),
  "claude-4-sonnet": anthropic("claude-sonnet-4-20250514"),
  gemini: google("gemini-2.5-pro"),
  "gemini-flash": google("gemini-2.5-flash"),
  "gemini-flash-lite": google("gemini-2.5-flash-lite")
} as const;

// Model capabilities and metadata
export const MODEL_METADATA = {
  "anthropic:claude-4-sonnet": {
    maxOutputTokens: 8192,
    contextWindow: 200000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: true,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "quality" as const,
    description: "Best for complex tasks",
    cost: { input: 0.003, output: 0.015 }
  },
  "openai:gpt-4o": {
    maxOutputTokens: 16384,
    contextWindow: 128000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: false,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "quality" as const,
    description: "Latest GPT-4 Omni model",
    cost: { input: 0.005, output: 0.015 }
  },
  "openai:gpt-4.1": {
    maxOutputTokens: 8192,
    contextWindow: 8192,
    supportsFunctions: true,
    supportsVision: false,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: false,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "balanced" as const,
    description: "Standard GPT-4 model",
    cost: { input: 0.03, output: 0.06 }
  },
  "openai:gpt-5": {
    maxOutputTokens: 16384,
    contextWindow: 1000000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: false,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "quality" as const,
    description: "Latest OpenAI flagship model",
    cost: { input: 0.0025, output: 0.01 }
  },
  "openai:gpt-5-mini": {
    maxOutputTokens: 16384,
    contextWindow: 128000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: false,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "balanced" as const,
    description: "Smaller, faster GPT-5 variant",
    cost: { input: 0.00015, output: 0.0006 }
  },
  "openai:gpt-4.1-mini": {
    maxOutputTokens: 16384,
    contextWindow: 1000000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: false,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "quality" as const,
    description: "Enhanced GPT-4o with better performance",
    cost: { input: 0.005, output: 0.015 }
  },
  "openai:o4-mini": {
    maxOutputTokens: 16384,
    contextWindow: 128000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: false,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "balanced" as const,
    description: "Advanced reasoning model",
    cost: { input: 0.003, output: 0.012 }
  },
  "google:gemini-2.0-flash": {
    maxOutputTokens: 8192,
    contextWindow: 1000000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: true,
    supportsVideo: true,
    supportsFiles: true,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "fast" as const,
    description: "Fast multimodal model",
    cost: { input: 0.00001, output: 0.00004 }
  },
  "google:gemini-2.5-pro": {
    maxOutputTokens: 8192,
    contextWindow: 1000000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: true,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "quality" as const,
    description: "Most capable Gemini model",
    cost: { input: 0.00125, output: 0.005 }
  },
  "google:gemini-2.5-flash": {
    maxOutputTokens: 8192,
    contextWindow: 1000000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: false,
    supportsVideo: false,
    supportsFiles: false,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "balanced" as const,
    description: "Latest fast multimodal model",
    cost: { input: 0.00003, output: 0.00015 }
  },
  "google:gemini-2.5-flash-lite": {
    maxOutputTokens: 8192,
    contextWindow: 1000000,
    supportsFunctions: true,
    supportsVision: true,
    supportsAudio: true,
    supportsVideo: true,
    supportsFiles: true,
    supportsCode: false,
    supportsWebSearch: false,
    speed: "fast" as const,
    description: "Fastest Gemini 2.5 model",
    cost: { input: 0.000005, output: 0.00002 }
  }
};

// Fallback chain for model unavailability
export const MODEL_FALLBACKS: Record<string, string[]> = {
  "anthropic:claude-3-5-sonnet": ["anthropic:claude-3-opus", "openai:gpt-5"],
  "anthropic:claude-3-5-haiku": [
    "openai:gpt-5-mini",
    "google:gemini-2.0-flash"
  ],
  "openai:gpt-5": ["openai:gpt-4o", "anthropic:claude-3-5-sonnet"],
  "openai:gpt-5-mini": ["openai:gpt-4o-mini", "google:gemini-2.0-flash"],
  "openai:gpt-4-turbo": ["openai:gpt-5", "anthropic:claude-3-5-sonnet"],
  "openai:gpt-4": ["openai:gpt-5", "openai:gpt-4o"],
  "openai:gpt-4o": ["openai:gpt-5", "anthropic:claude-3-5-sonnet"],
  "openai:gpt-4o-mini": [
    "openai:gpt-5-mini",
    "anthropic:claude-3-5-haiku",
    "google:gemini-2.0-flash"
  ],
  "openai:o4-mini": [
    "openai:gpt-5-mini",
    "anthropic:claude-3-5-haiku",
    "google:gemini-2.5-flash"
  ],
  "anthropic:claude-4-sonnet": [
    "anthropic:claude-3-5-sonnet",
    "openai:gpt-5",
    "google:gemini-2.5-pro"
  ],
  "google:gemini-2.5-flash-lite": [
    "google:gemini-2.5-flash",
    "google:gemini-2.0-flash",
    "anthropic:claude-3-5-haiku"
  ],
  "google:gemini-1.5-pro": [
    "google:gemini-2.5-pro",
    "anthropic:claude-3-5-sonnet",
    "openai:gpt-5"
  ],
  "google:gemini-2.5-pro": ["openai:gpt-5", "anthropic:claude-3-5-sonnet"],
  "google:gemini-2.0-flash": ["openai:gpt-5-mini"]
};

/**
 * Get a model by ID with fallback support
 * Supports both provider-qualified IDs (e.g., "anthropic:claude-3-5-sonnet")
 * and short aliases (e.g., "claude")
 */
export function getModelById(
  modelId: string,
  options?: {
    allowFallback?: boolean;
    preferredProvider?: "anthropic" | "openai" | "google" | "grok";
  }
): LanguageModel {
  const { allowFallback = true } = options || {};

  // Try direct lookup
  if (modelId in MODEL_REGISTRY) {
    return MODEL_REGISTRY[modelId as keyof typeof MODEL_REGISTRY];
  }

  // Try adding preferred provider prefix
  if (options?.preferredProvider && !modelId.includes(":")) {
    const qualifiedId = `${options.preferredProvider}:${modelId}`;
    if (qualifiedId in MODEL_REGISTRY) {
      return MODEL_REGISTRY[qualifiedId as keyof typeof MODEL_REGISTRY];
    }
  }

  // Try fallbacks if allowed
  if (allowFallback) {
    const fallbacks = MODEL_FALLBACKS[modelId] || [];
    for (const fallbackId of fallbacks) {
      if (fallbackId in MODEL_REGISTRY) {
        console.warn(
          `Model ${modelId} not available, falling back to ${fallbackId}`
        );
        return MODEL_REGISTRY[fallbackId as keyof typeof MODEL_REGISTRY];
      }
    }
  }

  // Default fallback
  console.error(`Model ${modelId} not found, using default`);
  return MODEL_REGISTRY["anthropic:claude-3-5-haiku"];
}

/**
 * Get model metadata
 */
export function getModelMetadata(modelId: string) {
  // Normalize ID by resolving aliases
  const normalizedId = Object.entries(MODEL_REGISTRY).find(
    ([key]) => key === modelId
  )?.[0];

  return (
    MODEL_METADATA[normalizedId as keyof typeof MODEL_METADATA] || {
      maxOutputTokens: 4096,
      contextWindow: 32000,
      supportsFunctions: true,
      supportsVision: false,
      supportsAudio: false,
      supportsVideo: false,
      supportsFiles: false,
      supportsCode: false,
      supportsWebSearch: false,
      speed: "balanced" as const,
      description: "Unknown model",
      cost: { input: 0.001, output: 0.002 }
    }
  );
}

/**
 * Get all available models
 */
export function getAllModels() {
  return Object.keys(MODEL_REGISTRY).map(id => {
    const metadata = getModelMetadata(id);
    const [provider, modelName] = id.includes(":")
      ? id.split(":")
      : ["unknown", id];

    return {
      id,
      name: id
        .replace(":", " ")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, l => l.toUpperCase()),
      provider,
      description: metadata.description || "AI model",
      maxTokens: metadata.contextWindow,
      maxOutputTokens: metadata.maxOutputTokens,
      speed: metadata.speed || "balanced",
      supportsTools: metadata.supportsFunctions,
      supportsImages: metadata.supportsVision,
      supportsAudio: metadata.supportsAudio || false,
      supportsVideo: metadata.supportsVideo || false,
      supportsFiles: metadata.supportsFiles || false,
      supportsCode: metadata.supportsCode || false,
      supportsWebSearch: metadata.supportsWebSearch || false,
      metadata
    };
  });
}

/**
 * Get models by speed tier
 */
export function getModelsBySpeed(speed: "fast" | "balanced" | "quality") {
  return getAllModels().filter(model => model.speed === speed);
}

/**
 * Get models by provider
 */
export function getModelsByProvider(provider: string) {
  return getAllModels().filter(model => model.provider === provider);
}

/**
 * Parse llms.txt content (for dynamic configuration)
 * Format: provider:model-id cost=input,output context=tokens
 */
export function parseLlmsTxt(content: string): typeof MODEL_REGISTRY {
  const lines = content
    .split("\n")
    .filter(line => line.trim() && !line.startsWith("#"));
  const models: any = {};

  for (const line of lines) {
    const [id, ...metadata] = line.split(/\s+/);
    if (id.includes(":")) {
      // Parse metadata like cost=0.001,0.002 context=128000
      const meta: any = {};
      for (const item of metadata) {
        const [key, value] = item.split("=");
        if (key === "cost") {
          const [input, output] = value.split(",").map(Number);
          meta.cost = { input, output };
        } else if (key === "context") {
          meta.contextWindow = Number(value);
        }
      }
      // Store parsed model (would need actual model instance creation)
      models[id] = { id, ...meta };
    }
  }

  return models;
}
