import { NextResponse } from "next/server";

// This would integrate with Google's Gemini 2.5 Flash Image API
// For now, it's a placeholder that returns mock data

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { company, prospect, pitch } = body;

    // Validate input
    if (!company?.name || !prospect?.name || !prospect?.company || !pitch) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
    //         text: `Generate a personalized marketing visual for:
    //           Company: ${company.name} - ${company.description}
    //           Prospect: ${prospect.name} at ${prospect.company} (${prospect.role})
    //           Pitch: ${pitch}
    //           
    //           Create an image that visually represents how ${company.name} can help ${prospect.company}.`
    //       }]
    //     }],
    //     generationConfig: {
    //       temperature: 0.8,
    //       topK: 32,
    //       topP: 1,
    //     }
    //   })
    // });

    // Generate personalized copy
    const copy = generatePersonalizedCopy(company, prospect, pitch);
    
    // Generate subject lines
    const subjectLines = generateSubjectLines(company, prospect, pitch);

    // Mock response for demo
    return NextResponse.json({
      imageUrl: `/api/placeholder/800/600`, // Would be actual Gemini-generated image URL
      copy,
      subjectLines,
      metadata: {
        generatedAt: new Date().toISOString(),
        model: "gemini-2.5-flash",
        personalizationScore: 0.92
      }
    });

  } catch (error) {
    console.error("Lead gen generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}

function generatePersonalizedCopy(company: any, prospect: any, pitch: string): string {
  const templates = [
    `Hi ${prospect.name},

I noticed ${prospect.company} ${pitch}. This caught my attention because we've helped similar companies in your space achieve remarkable results.

At ${company.name}, we specialize in ${company.description || 'delivering innovative solutions'}. Here's what we've accomplished for companies like yours:

• Reduced operational costs by an average of 35%
• Increased efficiency by 45% within the first quarter
• Scaled operations 3x faster with our AI-powered approach

I'd love to show you exactly how we helped [Similar Company] transform their operations and what specific strategies would work for ${prospect.company}.

Would you be open to a brief 15-minute call next week to explore if this could be valuable for your team?

Best regards,
[Your Name]
${company.name}`,

    `${prospect.name},

Quick question - is ${prospect.company} still ${pitch}?

If so, you might be interested in how ${company.name} recently helped a company in your industry:
• Cut processing time from days to hours
• Eliminated 90% of manual errors
• Saved $2.3M annually in operational costs

The approach we used is particularly effective for companies at ${prospect.company}'s scale.

Worth a quick conversation to see if we could achieve similar results for you?

[Your Name]`,

    `Hi ${prospect.name},

I've been following ${prospect.company}'s growth and noticed you're ${pitch}.

This is exactly where ${company.name} can add the most value. We've developed ${company.description || 'specific solutions'} that address this precise challenge.

In fact, we just wrapped up a project with a similar company where we:
• Delivered ROI in under 45 days
• Improved their core metrics by 40%
• Set them up for sustainable, scalable growth

I have some specific ideas for how this could work at ${prospect.company}.

Open to a brief chat next Tuesday or Wednesday?

Best,
[Your Name]`
  ];

  return templates[Math.floor(Math.random() * templates.length)];
}

function generateSubjectLines(company: any, prospect: any, pitch: string): string[] {
  return [
    `${prospect.name}, quick question about ${prospect.company}'s ${pitch.split(' ')[0]} strategy`,
    `Idea for ${prospect.company}: ${pitch.substring(0, 30)}...`,
    `${prospect.name} - saw you're ${pitch.substring(0, 25)}...`,
    `30% improvement possible at ${prospect.company}?`,
    `${prospect.company} + ${company.name} = accelerated growth`,
    `Quick win for ${prospect.name} at ${prospect.company}`
  ].slice(0, 3);
}