import { z } from "zod";
import type { ToolSpec } from "@/features/tools/types";
import { getModel } from "@/lib/ai-utils";
import { generateText } from "ai";

// Input schema for sales pitch generation
export const inputSchema = z.object({
  // Prospect Information
  prospectName: z.string().describe("Name of the prospect company"),
  contactName: z.string().optional().describe("Name of the contact person"),
  industry: z.string().describe("Industry or sector"),
  companySize: z.string().optional().describe("Company size description"),

  // Product/Service Information
  productName: z.string().describe("Your product/service name"),
  productDescription: z.string().describe("Brief description of your offering"),
  uniqueValueProps: z.array(z.string()).min(1).max(5).describe("Unique value propositions (1-5)"),

  // Context
  pitchType: z.enum([
    "Cold Email",
    "Follow-up Email",
    "LinkedIn Message",
    "Phone Script",
    "Presentation Deck",
    "One-Pager",
    "Demo Script"
  ]).describe("Type of pitch to generate"),

  painPoints: z.array(z.string()).optional().describe("Specific pain points to address"),
  competitors: z.array(z.string()).optional().describe("Known competitors they use"),
  previousInteractions: z.string().optional().describe("Summary of previous interactions"),

  // Customization
  tone: z.enum(["Professional", "Casual", "Friendly", "Executive", "Technical"]).default("Professional").describe("Communication tone"),
  length: z.enum(["Short", "Medium", "Long"]).default("Medium").describe("Desired length"),
  callToAction: z.string().optional().describe("Specific call-to-action"),

  // Additional Context
  successMetrics: z.array(z.string()).optional().describe("Success metrics or ROI data"),
  caseStudies: z.array(z.string()).optional().describe("Relevant case studies to mention"),
  specialOffers: z.string().optional().describe("Any special offers or promotions")
});

// Output schema
export const outputSchema = z.object({
  pitch: z.string().describe("The generated sales pitch"),
  subject: z.string().optional().describe("Subject line (for emails)"),
  alternativeVersions: z.array(z.string()).optional().describe("Alternative pitch variations"),
  talkingPoints: z.array(z.string()).describe("Key talking points"),
  objectionHandlers: z.array(z.object({
    objection: z.string(),
    response: z.string()
  })).describe("Common objections and responses"),
  followUpSuggestions: z.array(z.string()).describe("Follow-up strategy suggestions"),
  personalizationTips: z.array(z.string()).describe("Ways to further personalize"),
  bestPractices: z.array(z.string()).describe("Best practices for this pitch type")
});

type Input = z.infer<typeof inputSchema>;
type Output = z.infer<typeof outputSchema>;

const tool: ToolSpec<typeof inputSchema, typeof outputSchema> = {
  id: "pitch-generator",
  slug: "pitch-generator",
  name: "Sales Pitch Generator",
  description: "Generate personalized sales pitches with AI-powered insights",
  category: "marketing",
  inputSchema,
  outputSchema,
  executionMode: "server",

  async execute(input: Input): Promise<Output> {
    // Generate the main pitch
    const pitch = await generatePitch(input);

    // Generate subject line if needed
    const subject = ["Cold Email", "Follow-up Email"].includes(input.pitchType)
      ? await generateSubjectLine(input)
      : undefined;

    // Generate alternative versions for A/B testing
    const alternativeVersions = input.pitchType === "Cold Email"
      ? await generateAlternatives(input, pitch)
      : undefined;

    // Extract talking points
    const talkingPoints = await extractTalkingPoints(input, pitch);

    // Generate objection handlers
    const objectionHandlers = await generateObjectionHandlers(input);

    // Create follow-up suggestions
    const followUpSuggestions = generateFollowUpSuggestions(input.pitchType);

    // Generate personalization tips
    const personalizationTips = generatePersonalizationTips(input);

    // Get best practices
    const bestPractices = getBestPractices(input.pitchType);

    return {
      pitch,
      subject,
      alternativeVersions,
      talkingPoints,
      objectionHandlers,
      followUpSuggestions,
      personalizationTips,
      bestPractices
    };
  }
};

async function generatePitch(input: Input): Promise<string> {
  const systemPrompt = `You are an expert sales professional crafting compelling ${input.pitchType} pitches.
Your tone should be ${input.tone.toLowerCase()} and the length should be ${input.length.toLowerCase()}.`;

  const userPrompt = `Create a ${input.pitchType} for:
Company: ${input.prospectName} (${input.industry})
${input.contactName ? `Contact: ${input.contactName}` : ''}
${input.companySize ? `Size: ${input.companySize}` : ''}

Our Product: ${input.productName}
Description: ${input.productDescription}
Value Props: ${input.uniqueValueProps.join(', ')}

${input.painPoints ? `Pain Points to Address: ${input.painPoints.join(', ')}` : ''}
${input.competitors ? `Competitors They Use: ${input.competitors.join(', ')}` : ''}
${input.previousInteractions ? `Previous Interactions: ${input.previousInteractions}` : ''}
${input.successMetrics ? `Success Metrics: ${input.successMetrics.join(', ')}` : ''}
${input.caseStudies ? `Case Studies: ${input.caseStudies.join(', ')}` : ''}
${input.specialOffers ? `Special Offer: ${input.specialOffers}` : ''}
${input.callToAction ? `CTA: ${input.callToAction}` : 'Include a clear call-to-action'}

Requirements:
- Make it highly personalized and relevant
- Focus on value and benefits, not features
- Use social proof where appropriate
- End with a clear, compelling call-to-action
- Keep it ${input.length.toLowerCase()} in length`;

  const model = getModel("gpt-4o-mini");
  const { text } = await generateText({
    model,
    system: systemPrompt,
    prompt: userPrompt,
    temperature: 0.8,
    maxTokens: 1000
  });

  return text || "Unable to generate pitch";
}

async function generateSubjectLine(input: Input): Promise<string> {
  const prompt = `Generate a compelling email subject line for ${input.prospectName} in ${input.industry}.
Product: ${input.productName}
Type: ${input.pitchType}
Make it attention-grabbing, personalized, and under 60 characters.`;

  const model = getModel("gpt-4o-mini");
  const { text } = await generateText({
    model,
    prompt,
    temperature: 0.9,
    maxTokens: 50
  });

  return text || `${input.productName} for ${input.prospectName}`;
}

async function generateAlternatives(input: Input, originalPitch: string): Promise<string[]> {
  const prompt = `Based on this pitch:
"${originalPitch}"

Generate 2 alternative versions with different approaches:
1. One more direct/aggressive
2. One more consultative/soft

Keep the same core message but vary the style and opening.`;

  const model = getModel("gpt-4o-mini");
  const { text } = await generateText({
    model,
    prompt,
    temperature: 0.85,
    maxTokens: 800
  });

  const content = text || "";
  // Split the response into alternatives
  const alternatives = content.split(/\n\n/).filter(alt => alt.length > 50);

  return alternatives.slice(0, 2);
}

async function extractTalkingPoints(input: Input, pitch: string): Promise<string[]> {
  const prompt = `Extract 5-7 key talking points from this pitch that a salesperson should emphasize:
"${pitch}"

Product: ${input.productName}
Prospect: ${input.prospectName}

Format as a JSON array of strings.`;

  const model = getModel("gpt-4o-mini");
  const { text } = await generateText({
    model,
    prompt: prompt + "\n\nReturn as valid JSON.",
    temperature: 0.7,
    maxTokens: 300
  });

  try {
    const result = JSON.parse(text || "{}");
    return result.talking_points || [
      `How ${input.productName} solves their specific challenges`,
      `ROI and value proposition`,
      `Competitive advantages`,
      `Implementation timeline`,
      `Success stories from similar companies`
    ];
  } catch {
    return [
      `How ${input.productName} solves their specific challenges`,
      `ROI and value proposition`,
      `Competitive advantages`
    ];
  }
}

async function generateObjectionHandlers(input: Input): Promise<Array<{objection: string, response: string}>> {
  const prompt = `For ${input.productName} selling to ${input.prospectName} in ${input.industry},
generate 5 common objections and professional responses.

Consider:
- Price concerns
- Timing issues
- Competition
- Implementation challenges
- Authority/budget questions

Format as JSON with structure: { "objections": [{"objection": "", "response": ""}] }`;

  const model = getModel("gpt-4o-mini");
  const { text } = await generateText({
    model,
    prompt: prompt + "\n\nReturn as valid JSON.",
    temperature: 0.7,
    maxTokens: 600
  });

  try {
    const result = JSON.parse(text || "{}");
    return result.objections || getDefaultObjections(input.productName);
  } catch {
    return getDefaultObjections(input.productName);
  }
}

function getDefaultObjections(productName: string): Array<{objection: string, response: string}> {
  return [
    {
      objection: "It's too expensive",
      response: `I understand cost is important. Let's look at the ROI - ${productName} typically pays for itself within 3-6 months through efficiency gains alone.`
    },
    {
      objection: "We're happy with our current solution",
      response: "That's great to hear. Many of our clients felt the same way until they saw how we could enhance what they already have. Would you be open to a brief comparison?"
    },
    {
      objection: "We don't have time to implement",
      response: "Implementation is actually quite streamlined - we handle most of the heavy lifting and can have you up and running in days, not months."
    },
    {
      objection: "I need to think about it",
      response: "Of course, this is an important decision. What specific concerns can I address to help you evaluate if this is right for your team?"
    },
    {
      objection: "I'm not the decision maker",
      response: "I appreciate your transparency. Who else would need to be involved? I'd be happy to provide materials or join a call to address their specific questions."
    }
  ];
}

function generateFollowUpSuggestions(pitchType: string): string[] {
  const suggestions: Record<string, string[]> = {
    "Cold Email": [
      "Send a follow-up after 3 days if no response",
      "Try a different angle focusing on ROI",
      "Share a relevant case study",
      "Offer a brief 15-minute discovery call",
      "Connect on LinkedIn with a personalized message"
    ],
    "Follow-up Email": [
      "Reference the previous conversation",
      "Share new relevant content or insights",
      "Propose specific next steps",
      "Address any concerns mentioned",
      "Offer alternative meeting times"
    ],
    "LinkedIn Message": [
      "Follow up with valuable content",
      "Suggest moving to email or phone",
      "Share a connection's success story",
      "Invite to a webinar or event",
      "Offer a free consultation"
    ],
    "Phone Script": [
      "Send a follow-up email summarizing the call",
      "Share promised resources immediately",
      "Schedule the next call while on the phone",
      "Connect on LinkedIn",
      "Send a calendar invite with agenda"
    ],
    "Presentation Deck": [
      "Send a thank you email with deck attached",
      "Provide additional resources mentioned",
      "Schedule a follow-up meeting",
      "Send a proposal with clear next steps",
      "Share recording if virtual"
    ],
    "One-Pager": [
      "Follow up with a phone call",
      "Offer to answer any questions",
      "Provide a more detailed proposal",
      "Schedule a demo or meeting",
      "Share customer testimonials"
    ],
    "Demo Script": [
      "Send a recap email within 24 hours",
      "Provide trial access if applicable",
      "Schedule implementation planning call",
      "Share ROI calculator or business case",
      "Connect them with a current customer"
    ]
  };

  return suggestions[pitchType] || suggestions["Cold Email"];
}

function generatePersonalizationTips(input: Input): string[] {
  const tips = [];

  tips.push(`Research recent news about ${input.prospectName} and reference it`);

  if (!input.contactName) {
    tips.push("Find and use the contact's actual name for better personalization");
  }

  tips.push(`Look for ${input.prospectName}'s recent social media posts or company updates`);
  tips.push(`Reference specific challenges in the ${input.industry} industry`);

  if (input.competitors && input.competitors.length > 0) {
    tips.push("Research how they're currently using competitor solutions");
  }

  tips.push("Find mutual connections on LinkedIn for warm introductions");
  tips.push("Customize examples to match their specific use case");
  tips.push("Use their company's terminology and language style");

  return tips.slice(0, 5);
}

function getBestPractices(pitchType: string): string[] {
  const practices: Record<string, string[]> = {
    "Cold Email": [
      "Keep subject line under 50 characters",
      "Lead with value, not your product",
      "Keep it under 150 words",
      "Include social proof early",
      "Have one clear CTA"
    ],
    "Follow-up Email": [
      "Reference the previous interaction",
      "Add new value or information",
      "Be persistent but respectful",
      "Vary your approach each time",
      "Know when to stop (typically after 5-7 attempts)"
    ],
    "LinkedIn Message": [
      "Keep it conversational and brief",
      "Reference their profile or recent activity",
      "Don't pitch in the connection request",
      "Focus on starting a conversation",
      "Move to email/phone quickly"
    ],
    "Phone Script": [
      "Have a strong opening 10 seconds",
      "Ask permission to continue",
      "Focus on asking questions",
      "Listen more than you talk",
      "Always confirm next steps"
    ],
    "Presentation Deck": [
      "Start with their problem, not your solution",
      "Use visuals over text",
      "Include customer success stories",
      "Make it interactive",
      "End with clear next steps"
    ],
    "One-Pager": [
      "Lead with a compelling headline",
      "Use bullet points for easy scanning",
      "Include visual elements",
      "Focus on benefits over features",
      "Include clear contact information"
    ],
    "Demo Script": [
      "Customize to their specific use case",
      "Let them drive when possible",
      "Focus on their top 3 priorities",
      "Handle objections in real-time",
      "Always do a technical check first"
    ]
  };

  return practices[pitchType] || practices["Cold Email"];
}

export default tool;