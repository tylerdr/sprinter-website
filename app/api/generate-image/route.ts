import { NextResponse, NextRequest } from "next/server";
import { withRateLimit } from '@/lib/rate-limit';

// This endpoint would integrate with Gemini 2.5 Flash Image API
// For demonstration, it returns placeholder images with metadata

async function handlePOST(request: NextRequest) {

  try {
    const { prompt, model, purpose } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // TODO: Integrate with Gemini 2.5 Flash Image API
    // const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     contents: [{
    //       parts: [{
    //         text: `Generate an image: ${prompt}`
    //       }]
    //     }],
    //     generationConfig: {
    //       temperature: 0.8,
    //       topK: 32,
    //       topP: 1,
    //     }
    //   })
    // });

    // Simulate different image types based on the prompt
    const imageUrl = generatePlaceholderImage(prompt, purpose);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      imageUrl,
      metadata: {
        model: model || "gemini-2.5-flash",
        prompt,
        purpose,
        generatedAt: new Date().toISOString(),
        dimensions: {
          width: 1024,
          height: 1024
        },
        format: "png",
        style: detectImageStyle(prompt)
      }
    });

  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}

function generatePlaceholderImage(prompt: string, purpose?: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  // Return different placeholder images based on the prompt content
  if (lowerPrompt.includes("hero") || lowerPrompt.includes("banner")) {
    return "/api/placeholder/1920/1080";
  }
  
  if (lowerPrompt.includes("logo") || lowerPrompt.includes("icon")) {
    return "/api/placeholder/512/512";
  }
  
  if (lowerPrompt.includes("team") || lowerPrompt.includes("person") || lowerPrompt.includes("avatar")) {
    return "/api/placeholder/400/400";
  }
  
  if (lowerPrompt.includes("product") || lowerPrompt.includes("feature")) {
    return "/api/placeholder/800/600";
  }
  
  if (lowerPrompt.includes("chart") || lowerPrompt.includes("graph") || lowerPrompt.includes("data")) {
    return "/api/placeholder/1200/800";
  }
  
  if (purpose === "website_content") {
    return "/api/placeholder/1600/900";
  }
  
  // Default
  return "/api/placeholder/1024/1024";
}

function detectImageStyle(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes("abstract") || lowerPrompt.includes("modern")) {
    return "abstract";
  }
  
  if (lowerPrompt.includes("minimal") || lowerPrompt.includes("clean")) {
    return "minimalist";
  }
  
  if (lowerPrompt.includes("gradient") || lowerPrompt.includes("colorful")) {
    return "gradient";
  }
  
  if (lowerPrompt.includes("tech") || lowerPrompt.includes("futuristic")) {
    return "tech";
  }
  
  if (lowerPrompt.includes("professional") || lowerPrompt.includes("corporate")) {
    return "corporate";
  }
  
  if (lowerPrompt.includes("illustration") || lowerPrompt.includes("cartoon")) {
    return "illustration";
  }
  
  return "modern";
}

// Apply rate limiting with stricter limits for AI endpoints (5 requests per minute)
export const POST = withRateLimit(handlePOST, {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})

// This endpoint could also handle batch image generation
async function handlePUT(request: NextRequest) {
  try {
    const { prompts, purpose } = await request.json();
    
    if (!prompts || !Array.isArray(prompts)) {
      return NextResponse.json(
        { error: "Prompts array is required" },
        { status: 400 }
      );
    }
    
    const images = await Promise.all(
      prompts.map(async (prompt) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return {
          prompt,
          imageUrl: generatePlaceholderImage(prompt, purpose),
          status: "completed"
        };
      })
    );
    
    return NextResponse.json({ images });

  } catch (error) {
    console.error("Batch image generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate images" },
      { status: 500 }
    );
  }
}

// Apply rate limiting to PUT endpoint as well
export const PUT = withRateLimit(handlePUT, {
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 5 // 5 requests per minute
})