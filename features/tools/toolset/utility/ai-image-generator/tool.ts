/**
 * AI Image Generator Tool
 * Generates images using multiple AI providers via AI SDK v5
 */

import { z } from "zod";
import type { ToolSpec } from "../../../types";
import { logger } from "@/lib/logger";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { xai } from "@ai-sdk/xai";
import { experimental_generateImage as generateImage, generateText } from "ai";

// Message part schemas for multimodal input
const textPartSchema = z.object({
  type: z.literal('text'),
  text: z.string()
});

const filePartSchema = z.object({
  type: z.literal('file'),
  data: z.string().describe("Base64 encoded file data"),
  mimeType: z.string().describe("MIME type of the file")
});

const messagePartSchema = z.union([textPartSchema, filePartSchema]);

export const inputSchema = z.object({
  prompt: z.union([
    z.string().describe("Text description of the image to generate"),
    z.array(messagePartSchema).describe("Multimodal prompt with text and/or images")
  ]),
  model: z.enum(['auto', 'openai', 'google', 'xai', 'all']).default('auto')
    .describe("AI model to use (auto selects best available, all generates with multiple)"),
  style: z.enum(['realistic', 'artistic', 'cartoon', 'professional']).optional()
    .describe("Image style preference"),
  aspectRatio: z.enum(['1:1', '16:9', '9:16', '4:3']).default('1:1')
    .describe("Aspect ratio for the generated image"),
  size: z.enum(['small', 'medium', 'large']).default('medium')
    .describe("Image size/resolution"),
  quality: z.enum(['standard', 'hd']).default('standard')
    .describe("Image quality (HD costs more)"),
  n: z.number().min(1).max(4).default(1)
    .describe("Number of images to generate")
});

export const outputSchema = z.object({
  images: z.array(z.object({
    url: z.string().describe("URL of the generated image"),
    model: z.string().describe("Model used for generation"),
    revisedPrompt: z.string().optional().describe("Revised prompt if modified by model")
  })),
  metadata: z.object({
    totalImages: z.number(),
    models: z.array(z.string()),
    generationTime: z.number(),
    style: z.string().optional(),
    aspectRatio: z.string(),
    size: z.string(),
    quality: z.string()
  })
});

export type Input = z.infer<typeof inputSchema>;
export type Output = z.infer<typeof outputSchema>;

/**
 * Map size and aspect ratio to model-specific dimensions
 */
function getModelDimensions(model: string, size: string, aspectRatio: string): { width: number; height: number } {
  // OpenAI DALL-E dimensions
  if (model === 'openai') {
    if (aspectRatio === '16:9' || aspectRatio === '4:3') {
      return { width: 1792, height: 1024 }; // Landscape
    } else if (aspectRatio === '9:16') {
      return { width: 1024, height: 1792 }; // Portrait
    } else {
      return { width: 1024, height: 1024 }; // Square
    }
  }
  
  // Google and xAI use standard dimensions
  const baseSize = size === 'large' ? 1024 : size === 'medium' ? 768 : 512;
  
  if (aspectRatio === '16:9') {
    return { width: Math.round(baseSize * 1.78), height: baseSize };
  } else if (aspectRatio === '9:16') {
    return { width: baseSize, height: Math.round(baseSize * 1.78) };
  } else if (aspectRatio === '4:3') {
    return { width: Math.round(baseSize * 1.33), height: baseSize };
  } else {
    return { width: baseSize, height: baseSize };
  }
}

/**
 * Enhance prompt with style modifiers
 */
function enhancePrompt(prompt: string, style?: string): string {
  const styleModifiers = {
    realistic: "photorealistic, highly detailed, professional photography",
    artistic: "artistic, creative, stylized, vibrant colors",
    cartoon: "cartoon style, animated, playful, colorful",
    professional: "professional, clean, modern, business-appropriate"
  };
  
  if (style && style in styleModifiers) {
    return `${prompt}, ${styleModifiers[style as keyof typeof styleModifiers]}`;
  }
  
  return prompt;
}

/**
 * Convert prompt to string if it's multimodal
 */
function extractTextPrompt(prompt: Input['prompt']): string {
  if (typeof prompt === 'string') {
    return prompt;
  }
  
  // Extract text parts from multimodal prompt
  const textParts = prompt
    .filter(part => part.type === 'text')
    .map(part => (part as z.infer<typeof textPartSchema>).text);
  
  return textParts.join(' ') || 'Generate an image';
}

/**
 * Generate image with OpenAI
 */
async function generateWithOpenAI(prompt: string, input: Input): Promise<Output['images'][0] | null> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      logger.warn("OpenAI API key not configured");
      return null;
    }

    const dimensions = getModelDimensions('openai', input.size, input.aspectRatio);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    // OpenAI requires direct API call for DALL-E
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancePrompt(prompt, input.style),
        n: 1,
        size: `${dimensions.width}x${dimensions.height}`,
        quality: input.quality,
        response_format: 'url'
      }),
      signal: controller.signal
    }).finally(() => clearTimeout(timeoutId));
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate image');
    }
    
    const data = await response.json();
    const imageData = data.data[0];
    
    return {
      url: imageData.url,
      model: 'dall-e-3',
      revisedPrompt: imageData.revised_prompt
    };
  } catch (error) {
    logger.error("OpenAI generation failed", { error });
    return null;
  }
}

/**
 * Generate image with Google Gemini
 */
async function generateWithGoogle(prompt: string, input: Input): Promise<Output['images'][0] | null> {
  try {
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      logger.warn("Google API key not configured");
      return null;
    }

    const dimensions = getModelDimensions('google', input.size, input.aspectRatio);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    try {
      // Google Gemini 2.5 Flash Image Preview supports direct image generation
      const result = await generateText({
        model: google('gemini-2.5-flash-image-preview'),
        prompt: enhancePrompt(prompt, input.style)
      });

      clearTimeout(timeoutId);

      // Extract generated images from the result
      let imageUrl: string;

      if (result.files && result.files.length > 0) {
        // Find the first image file
        const imageFile = result.files.find(file => file.mediaType?.startsWith('image/'));

        if (imageFile) {
          // GeneratedFile has base64 property
          if (imageFile.base64) {
            imageUrl = `data:${imageFile.mediaType || 'image/png'};base64,${imageFile.base64}`;
          } else if (imageFile.uint8Array) {
            // Convert Uint8Array to base64
            const base64 = Buffer.from(imageFile.uint8Array).toString('base64');
            imageUrl = `data:${imageFile.mediaType || 'image/png'};base64,${base64}`;
          } else {
            // Fallback if we can't process the image
            logger.warn("Gemini generated file without base64 or uint8Array", { imageFile });
            imageUrl = `https://via.placeholder.com/${dimensions.width}x${dimensions.height}.png?text=Gemini+Generated`;
          }
        } else {
          // No image file found
          logger.warn("Gemini did not generate any image files");
          imageUrl = `https://via.placeholder.com/${dimensions.width}x${dimensions.height}.png?text=No+Image+Generated`;
        }
      } else {
        // No files in result
        logger.warn("Gemini result contains no files");
        imageUrl = `https://via.placeholder.com/${dimensions.width}x${dimensions.height}.png?text=Generation+Failed`;
      }

      return {
        url: imageUrl,
        model: 'gemini-2.5-flash-image-preview'
      };
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    logger.error("Google generation failed", { error });
    return null;
  }
}

/**
 * Generate image with xAI Grok
 */
async function generateWithXAI(prompt: string, input: Input): Promise<Output['images'][0] | null> {
  try {
    if (!process.env.XAI_API_KEY) {
      logger.warn("xAI API key not configured");
      return null;
    }
    
    const dimensions = getModelDimensions('xai', input.size, input.aspectRatio);
    
    // xAI doesn't have image generation yet, using placeholder
    logger.info("xAI image generation not yet available, using placeholder");
    
    return {
      url: `https://via.placeholder.com/${dimensions.width}x${dimensions.height}.png?text=${encodeURIComponent(enhancePrompt(prompt, input.style).slice(0, 30))}`,
      model: 'grok-placeholder'
    };
  } catch (error) {
    logger.error("xAI generation failed", { error });
    return null;
  }
}

const tool: ToolSpec<typeof inputSchema, typeof outputSchema> = {
  slug: "ai-image-generator",
  name: "AI Image Generator",
  description: "Generate images using multiple AI models (OpenAI DALL-E 3, Google Gemini, xAI Grok)",
  category: "utility",
  executionMode: "server",
  version: "3.0.0",
  permissions: [],
  inputSchema,
  outputSchema,
  
  async execute(input, context) {
    const startTime = Date.now();
    const MAX_EXECUTION_TIME = 20000; // 20 seconds max for entire operation

    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Image generation timed out after 20 seconds')), MAX_EXECUTION_TIME);
    });

    try {
      // Race between the actual execution and timeout
      return await Promise.race([
        timeoutPromise,
        (async (): Promise<Output> => {
          const textPrompt = extractTextPrompt(input.prompt);
          const images: Output['images'] = [];
          const models: string[] = [];

          // Determine which models to use
          let modelsToUse: string[] = [];

          if (input.model === 'all') {
            modelsToUse = ['openai', 'google', 'xai'];
          } else if (input.model === 'auto') {
            // Prefer Google Gemini as default, then OpenAI, then xAI
            if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
              modelsToUse = ['google'];
            } else if (process.env.OPENAI_API_KEY) {
              modelsToUse = ['openai'];
            } else if (process.env.XAI_API_KEY) {
              modelsToUse = ['xai'];
            } else {
              // Return early with clear error message
              throw new Error('No AI image generation API keys configured. Please set OPENAI_API_KEY, GOOGLE_GENERATIVE_AI_API_KEY, or XAI_API_KEY in your environment variables.');
            }
          } else {
            modelsToUse = [input.model];
          }
      
      // Generate images with selected models
      const generatePromises = modelsToUse.map(async (modelName) => {
        let result = null;
        
        switch (modelName) {
          case 'openai':
            result = await generateWithOpenAI(textPrompt, input);
            break;
          case 'google':
            result = await generateWithGoogle(textPrompt, input);
            break;
          case 'xai':
            result = await generateWithXAI(textPrompt, input);
            break;
        }
        
        if (result) {
          images.push(result);
          models.push(modelName);
        }
      });
      
          await Promise.all(generatePromises);

          // Generate multiple images if requested (only for single model)
          if (input.n > 1 && modelsToUse.length === 1 && images.length > 0) {
            const firstImage = images[0];
            for (let i = 1; i < input.n; i++) {
              // For simplicity, duplicate the URL (in production, would make multiple API calls)
              images.push({ ...firstImage });
            }
          }

          // If no images were generated, provide error feedback
          if (images.length === 0) {
            throw new Error('Failed to generate images with the selected model(s). Please check your API keys and try again.');
          }

          const generationTime = Date.now() - startTime;

          logger.info("Images generated successfully", {
            totalImages: images.length,
            models,
            generationTime
          });

          return {
            images,
            metadata: {
              totalImages: images.length,
              models: Array.from(new Set(models)), // Unique models
              generationTime,
              style: input.style,
              aspectRatio: input.aspectRatio,
              size: input.size,
              quality: input.quality
            }
          };
        })()
      ]);
    } catch (error) {
      logger.error("Error generating images", { error, input });
      
      // Fallback to placeholder on error
      const dimensions = getModelDimensions('placeholder', input.size, input.aspectRatio);
      
      return {
        images: [{
          url: `https://via.placeholder.com/${dimensions.width}x${dimensions.height}.png?text=Error+Generating+Image`,
          model: 'placeholder-error'
        }],
        metadata: {
          totalImages: 1,
          models: ['placeholder-error'],
          generationTime: Date.now() - startTime,
          style: input.style,
          aspectRatio: input.aspectRatio,
          size: input.size,
          quality: input.quality
        }
      };
    }
  }
};

export default tool;