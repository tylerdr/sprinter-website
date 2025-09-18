/**
 * Blog Generator Tool
 * Generates blog content for mortgage topics
 */

import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";
import { getModel } from "@/lib/ai-utils";
import { generateText } from "ai";
import { logger } from "@/lib/logger";

// Input schema
export const blogGeneratorInputSchema = z.object({
  topic: z.string().describe("Main topic for the blog post"),
  keywords: z.array(z.string()).describe("SEO keywords to include"),
  targetLength: z
    .enum(["short", "medium", "long"])
    .default("medium")
    .describe("Target length of the blog post"),
  audience: z
    .enum(["first-time-buyers", "investors", "refinancers", "general"])
    .default("general")
    .describe("Target audience"),
  includeStats: z
    .boolean()
    .default(true)
    .describe("Include statistics and data"),
  includeCTA: z.boolean().default(true).describe("Include call-to-action"),
  tone: z
    .enum(["educational", "persuasive", "informative", "conversational"])
    .default("informative")
    .describe("Writing tone")
});

// Output schema
export const blogGeneratorOutputSchema = z.object({
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  keywords: z.array(z.string()),
  wordCount: z.number(),
  readingTime: z.number(),
  seoMetaDescription: z.string(),
  suggestedImages: z.array(z.string()),
  relatedTopics: z.array(z.string())
});

// Type definitions
export type BlogGeneratorInput = z.infer<typeof blogGeneratorInputSchema>;
export type BlogGeneratorOutput = z.infer<typeof blogGeneratorOutputSchema>;

// Export schemas for UI
export const Input = blogGeneratorInputSchema;
export const Output = blogGeneratorOutputSchema;

/**
 * Main tool implementation
 */
const tool: ToolSpec<typeof Input, typeof Output> = {
  slug: "blog-generator",
  name: "Blog Generator",
  description: "Generate blog content for mortgage topics",
  category: "content",
  executionMode: "server",
  version: "1.0.0",
  inputSchema: Input,
  outputSchema: Output,

  async execute(input) {
    try {
      logger.info("Generating blog post", {
        topic: input.topic,
        targetLength: input.targetLength,
        audience: input.audience
      });

      const wordTargets = {
        short: 500,
        medium: 1000,
        long: 1500
      };

      const targetWords = wordTargets[input.targetLength];

      // Generate content with AI
      const model = getModel({ fast: false });
      const systemPrompt = `You are a mortgage industry expert writing blog content.
Target audience: ${input.audience}
Tone: ${input.tone}
Target length: ${targetWords} words
Include keywords: ${input.keywords.join(", ")}
${input.includeStats ? "Include relevant statistics and data." : ""}
${input.includeCTA ? "End with a clear call-to-action." : ""}`;

      const result = await generateText({
        model,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: `Write a blog post about: ${input.topic}`
          }
        ],
        temperature: 0.7
      });

      const content = result.text || "";
      const wordCount = content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / 200); // Average reading speed

      // Generate title
      const titleResult = await generateText({
        model,
        messages: [
          {
            role: "user",
            content: `Generate a compelling blog title for this topic: ${input.topic}`
          }
        ],
        temperature: 0.7
      });

      const title = titleResult.text || `Essential Guide to ${input.topic}`;

      // Generate excerpt
      const excerpt = content.substring(0, 200).replace(/\s+\S*$/, "...");

      // Generate SEO meta description
      const metaDescription = `Learn about ${input.topic} in the mortgage industry. ${excerpt.substring(0, 100)}`;

      // Suggest images
      const suggestedImages = [
        "Hero image with title overlay",
        "Infographic explaining key concepts",
        "Chart or graph showing relevant data",
        "Professional working with clients"
      ];

      // Related topics
      const relatedTopics = [
        "Understanding mortgage rates",
        "First-time buyer programs",
        "Refinancing strategies",
        "Credit score improvement tips"
      ].filter(t => t !== input.topic);

      const output: BlogGeneratorOutput = {
        title,
        content,
        excerpt,
        keywords: input.keywords,
        wordCount,
        readingTime,
        seoMetaDescription: metaDescription,
        suggestedImages,
        relatedTopics
      };

      logger.info("Blog post generated successfully", {
        title,
        wordCount,
        readingTime
      });

      return output;
    } catch (error) {
      logger.error("Error generating blog post", { error });
      throw new Error(
        `Failed to generate blog post: ${error instanceof Error ? error?.message : "Unknown error"}`
      );
    }
  }
};

export default tool;
