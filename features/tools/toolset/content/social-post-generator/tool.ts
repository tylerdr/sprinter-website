/**
 * Social Post Generator Tool
 * Generates social media posts for mortgage marketing
 */

import { z } from "zod";
import { ToolSpec } from "@/features/tools/types";
import { getModel } from "@/lib/ai-utils";
import { generateText } from "ai";
import { logger } from "@/lib/logger";

// Input schema
export const socialPostGeneratorInputSchema = z.object({
  platform: z
    .enum(["linkedin", "facebook", "twitter", "instagram"])
    .describe("Target social media platform"),
  topic: z
    .enum([
      "market-update",
      "rate-alert",
      "educational",
      "success-story",
      "tips",
      "promotion",
      "holiday"
    ])
    .describe("Type of content to generate"),
  tone: z
    .enum(["professional", "friendly", "urgent", "educational"])
    .default("professional")
    .describe("Tone of the post"),
  includeHashtags: z
    .boolean()
    .default(true)
    .describe("Include relevant hashtags"),
  includeEmojis: z
    .boolean()
    .default(true)
    .describe("Include emojis in the post"),
  customMessage: z
    .string()
    .optional()
    .describe("Custom message or context to include"),
  callToAction: z
    .string()
    .optional()
    .describe("Specific call-to-action to include"),
  currentRates: z
    .object({
      thirtyYear: z.number().optional(),
      fifteenYear: z.number().optional(),
      fiveArmYear: z.number().optional()
    })
    .optional()
    .describe("Current mortgage rates for rate alerts")
});

// Output schema
export const socialPostGeneratorOutputSchema = z.object({
  content: z.string(),
  hashtags: z.array(z.string()),
  characterCount: z.number(),
  platformOptimized: z.boolean(),
  suggestedImages: z.array(z.string()),
  postingTips: z.array(z.string()),
  alternativeVersions: z
    .array(
      z.object({
        content: z.string(),
        tone: z.string()
      })
    )
    .optional()
});

// Type definitions
export type SocialPostGeneratorInput = z.infer<
  typeof socialPostGeneratorInputSchema
>;
export type SocialPostGeneratorOutput = z.infer<
  typeof socialPostGeneratorOutputSchema
>;

// Export schemas for UI
export const Input = socialPostGeneratorInputSchema;
export const Output = socialPostGeneratorOutputSchema;

/**
 * Platform-specific constraints
 */
const PLATFORM_LIMITS = {
  twitter: { chars: 280, hashtags: 3 },
  linkedin: { chars: 3000, hashtags: 5 },
  facebook: { chars: 63206, hashtags: 5 },
  instagram: { chars: 2200, hashtags: 30 }
};

/**
 * Topic templates
 */
const TOPIC_TEMPLATES = {
  "market-update": {
    professional:
      "Market Update: Latest trends and insights for homebuyers and investors.",
    friendly:
      "Hey everyone! Let's talk about what's happening in the housing market.",
    urgent: "BREAKING: Important market changes affecting mortgage rates NOW.",
    educational:
      "Understanding Today's Market: Key factors shaping mortgage rates."
  },
  "rate-alert": {
    professional:
      "Rate Alert: Current mortgage rates and what they mean for you.",
    friendly: "Good news on rates! Here's what you need to know.",
    urgent: "RATE DROP ALERT! Act now before rates change again.",
    educational: "Rate Analysis: How current rates compare historically."
  },
  educational: {
    professional: "Mortgage Tip: Essential knowledge for homebuyers.",
    friendly: "Did you know? Here's a helpful mortgage tip!",
    urgent: "Don't make this common mortgage mistake!",
    educational: "Mortgage 101: Building your homebuying knowledge."
  },
  "success-story": {
    professional: "Client Success: Another dream home secured.",
    friendly: "Celebrating another happy homeowner! 🏡",
    urgent: "Just closed! See how we helped this family.",
    educational: "Case Study: How proper planning leads to success."
  },
  tips: {
    professional: "Pro Tip: Optimize your mortgage application.",
    friendly: "Quick tip to save on your mortgage!",
    urgent: "Must-know tip before applying for a mortgage!",
    educational: "Expert Advice: Navigating the mortgage process."
  },
  promotion: {
    professional: "Special Offer: Exclusive rates for qualified buyers.",
    friendly: "Special deal alert! Let's get you into your dream home.",
    urgent: "LIMITED TIME: Special financing available NOW!",
    educational: "Program Spotlight: New opportunities for homebuyers."
  },
  holiday: {
    professional: "Season's Greetings from our mortgage team.",
    friendly: "Happy Holidays! Wishing you joy and prosperity.",
    urgent: "Holiday Special: End the year in your new home!",
    educational: "Holiday Homebuying: What to know this season."
  }
};

/**
 * Generate hashtags based on topic and platform
 */
function generateHashtags(topic: string, platform: string): string[] {
  const baseHashtags = [
    "#Mortgage",
    "#HomeLoans",
    "#RealEstate",
    "#HomeBuying",
    "#MortgageRates"
  ];

  const topicHashtags: Record<string, string[]> = {
    "market-update": ["#MarketUpdate", "#HousingMarket", "#RealEstateNews"],
    "rate-alert": ["#RateAlert", "#MortgageRates", "#RateUpdate"],
    educational: ["#MortgageTips", "#HomeBuyingTips", "#FinancialLiteracy"],
    "success-story": ["#ClientSuccess", "#HappyHomeowners", "#DreamHome"],
    tips: ["#MortgageAdvice", "#ProTips", "#SmartBuying"],
    promotion: ["#SpecialOffer", "#LimitedTime", "#ExclusiveRates"],
    holiday: ["#HappyHolidays", "#SeasonOfGiving", "#NewYearNewHome"]
  };

  const hashtags = [...baseHashtags, ...(topicHashtags[topic] || [])];
  const limit =
    PLATFORM_LIMITS[platform as keyof typeof PLATFORM_LIMITS].hashtags;

  return hashtags.slice(0, limit);
}

/**
 * Generate suggested images based on topic
 */
function generateImageSuggestions(topic: string): string[] {
  const suggestions: Record<string, string[]> = {
    "market-update": [
      "Graph showing market trends",
      "City skyline with overlay statistics",
      "Professional headshot with market data"
    ],
    "rate-alert": [
      "Rate comparison chart",
      "Calculator and documents",
      "Digital display showing rates"
    ],
    educational: [
      "Infographic with tips",
      "House keys and checklist",
      "Professional explaining to clients"
    ],
    "success-story": [
      "Happy family in front of new home",
      "Sold sign",
      "Keys being handed over"
    ],
    tips: [
      "Checklist graphic",
      "Light bulb with house icon",
      "Step-by-step visual guide"
    ],
    promotion: [
      "Special offer banner",
      "Limited time clock graphic",
      "Promotional badge design"
    ],
    holiday: [
      "Holiday-themed house decoration",
      "Seasonal greeting card design",
      "Festive real estate imagery"
    ]
  };

  return (
    suggestions[topic] || [
      "Professional mortgage imagery",
      "House and key visual"
    ]
  );
}

/**
 * Add emojis to content based on tone and topic
 */
function addEmojis(content: string, topic: string, tone: string): string {
  const emojiMap: Record<string, string[]> = {
    "market-update": ["📊", "📈", "🏠", "💰"],
    "rate-alert": ["🚨", "📉", "⏰", "💵"],
    educational: ["💡", "📚", "🎓", "✅"],
    "success-story": ["🎉", "🏡", "🔑", "😊"],
    tips: ["💡", "👍", "📝", "🎯"],
    promotion: ["🎁", "⭐", "🔥", "💥"],
    holiday: ["🎄", "🎁", "❄️", "🎊"]
  };

  const emojis = emojiMap[topic] || ["🏠", "💰"];

  // Add emojis strategically based on tone
  if (tone === "friendly" || tone === "urgent") {
    // More emojis for friendly/urgent tone
    return `${emojis[0]} ${content} ${emojis.slice(1, 3).join(" ")}`;
  } else {
    // Fewer emojis for professional/educational tone
    return `${content} ${emojis[0]}`;
  }
}

/**
 * Main tool implementation
 */
const tool: ToolSpec<typeof Input, typeof Output> = {
  slug: "social-post-generator",
  name: "Social Post Generator",
  description: "Generate social media posts for mortgage marketing",
  category: "content",
  executionMode: "server",
  version: "1.0.0",
  inputSchema: Input,
  outputSchema: Output,

  async execute(input) {
    try {
      logger.info("Generating social post", {
        platform: input.platform,
        topic: input.topic,
        tone: input.tone
      });

      // Get platform constraints
      const platformLimit = PLATFORM_LIMITS[input.platform];

      // Build prompt
      const template = TOPIC_TEMPLATES[input.topic][input.tone];
      let prompt = `Generate a ${input.tone} social media post for ${input.platform} about ${input.topic.replace("-", " ")}.

Platform character limit: ${platformLimit.chars}
Starting template: ${template}`;

      if (input.customMessage) {
        prompt += `\nInclude this message: ${input.customMessage}`;
      }

      if (input.callToAction) {
        prompt += `\nCall to action: ${input.callToAction}`;
      }

      if (input.currentRates && input.topic === "rate-alert") {
        prompt += `\nCurrent rates: 30-year: ${input.currentRates.thirtyYear}%, 15-year: ${input.currentRates.fifteenYear}%`;
      }

      // Generate content with AI
      const model = getModel();
      const result = await generateText({
        model,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      });

      let content = result.text || template;

      // Ensure content fits platform limits
      if (content.length > platformLimit.chars) {
        content = content.substring(0, platformLimit.chars - 3) + "...";
      }

      // Add emojis if requested
      if (input.includeEmojis) {
        content = addEmojis(content, input.topic, input.tone);
      }

      // Generate hashtags
      const hashtags = input.includeHashtags
        ? generateHashtags(input.topic, input.platform)
        : [];

      // Generate posting tips based on platform
      const postingTips = [
        `Best time to post on ${input.platform}: ${
          input.platform === "linkedin"
            ? "7-9 AM or 5-6 PM on weekdays"
            : input.platform === "twitter"
              ? "9 AM or 7-9 PM"
              : input.platform === "facebook"
                ? "1-4 PM"
                : "11 AM - 1 PM or 7-9 PM"
        }`,
        `Engage with comments within the first hour`,
        input.platform === "linkedin"
          ? "Tag relevant professionals and companies"
          : input.platform === "instagram"
            ? "Use location tags for local visibility"
            : "Monitor and respond to engagement quickly"
      ];

      // Generate alternative versions
      const alternativeVersions = [];
      const alternativeTones = [
        "professional",
        "friendly",
        "educational"
      ].filter(t => t !== input.tone);

      for (const altTone of alternativeTones.slice(0, 2)) {
        const altTemplate =
          TOPIC_TEMPLATES[input.topic][
            altTone as keyof (typeof TOPIC_TEMPLATES)["market-update"]
          ];
        let altContent = altTemplate;

        if (input.customMessage) {
          altContent += ` ${input.customMessage}`;
        }

        if (input.includeEmojis) {
          altContent = addEmojis(altContent, input.topic, altTone);
        }

        alternativeVersions.push({
          content: altContent,
          tone: altTone
        });
      }

      const output: SocialPostGeneratorOutput = {
        content,
        hashtags,
        characterCount: content.length,
        platformOptimized: true,
        suggestedImages: generateImageSuggestions(input.topic),
        postingTips,
        alternativeVersions
      };

      logger.info("Social post generated successfully", {
        platform: input.platform,
        characterCount: output.characterCount,
        hashtagCount: hashtags.length
      });

      return output;
    } catch (error) {
      logger.error("Error generating social post", { error });
      throw new Error(
        `Failed to generate social post: ${error instanceof Error ? error?.message : "Unknown error"}`
      );
    }
  }
};

export default tool;
