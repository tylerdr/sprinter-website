"use server";

import { z } from "zod";
import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { createClient } from "@/lib/supabase/server";

// Component generation schema
export const ComponentRequestSchema = z.object({
  prompt: z.string().min(10, "Description too short"),
  framework: z.enum(["react", "vue", "svelte", "html"]).default("react"),
  style: z.enum(["minimal", "gradient", "dark", "glassmorphism", "neubrutalism", "corporate"]).default("minimal"),
  responsive: z.boolean().default(true),
  typescript: z.boolean().default(false),
  creativity: z.number().min(0).max(1).default(0.5),
});

export type ComponentRequest = z.infer<typeof ComponentRequestSchema>;

// Generate UI component code
export async function generateUIComponent(request: ComponentRequest) {
  const { prompt, framework, style, responsive, typescript, creativity } = request;

  // Build the generation prompt
  const systemPrompt = `You are an expert UI developer specializing in ${framework} components.
Generate production-ready, accessible, and performant code.
Style preference: ${style}
${responsive ? "Make it fully responsive." : ""}
${typescript ? "Use TypeScript." : ""}
Creativity level: ${creativity * 100}% (${creativity < 0.3 ? "conservative" : creativity > 0.7 ? "experimental" : "balanced"})`;

  const userPrompt = `Create a ${framework} component based on this description:
${prompt}

Requirements:
1. Use modern best practices
2. Include proper accessibility attributes
3. Add hover states and transitions
4. Use semantic HTML
5. Include inline styles or CSS-in-JS (no external CSS files)
6. Make it visually appealing with the ${style} aesthetic

Return ONLY the component code, no explanations.`;

  try {
    // Use different models based on creativity level
    const model = creativity > 0.7 ? anthropic("claude-3-opus-20240229") : openai("gpt-5");
    
    const response = await generateText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature: 0.3 + (creativity * 0.7), // Scale temperature with creativity
    });

    // Generate v0 URL (mock - would integrate with real v0 API)
    const v0Url = await generateV0Url(prompt, framework);

    return {
      code: response.text,
      framework,
      style,
      v0Url,
      metadata: {
        model: creativity > 0.7 ? "claude-3-opus" : "gpt-5",
        temperature: 0.3 + (creativity * 0.7),
        timestamp: Date.now(),
      },
    };
  } catch (error) {
    console.error("Component generation failed:", error);
    
    // Fallback to a simple component
    return {
      code: generateFallbackComponent(framework, prompt),
      framework,
      style,
      v0Url: null,
      metadata: {
        model: "fallback",
        temperature: 0,
        timestamp: Date.now(),
      },
    };
  }
}

// Generate v0 platform URL (would integrate with actual v0 API)
async function generateV0Url(prompt: string, framework: string): Promise<string | null> {
  // This would make an actual API call to v0
  // For now, return a mock URL
  const encodedPrompt = encodeURIComponent(prompt.slice(0, 100));
  return `https://v0.dev/t/${encodedPrompt}-${framework}`;
}

// Fallback component generator
function generateFallbackComponent(framework: string, prompt: string): string {
  const componentName = "GeneratedComponent";
  
  switch (framework) {
    case "react":
      return `import React from 'react';

const ${componentName} = () => {
  return (
    <div style={{
      padding: '2rem',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        Generated Component
      </h2>
      <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
        ${prompt.slice(0, 100)}...
      </p>
      <button style={{
        marginTop: '1.5rem',
        padding: '0.75rem 2rem',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '8px',
        background: 'white',
        color: '#667eea',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}>
        Get Started
      </button>
    </div>
  );
};

export default ${componentName};`;

    case "vue":
      return `<template>
  <div class="generated-component">
    <h2>Generated Component</h2>
    <p>{{ description }}</p>
    <button @click="handleClick">Get Started</button>
  </div>
</template>

<script>
export default {
  name: '${componentName}',
  data() {
    return {
      description: '${prompt.slice(0, 100)}...'
    };
  },
  methods: {
    handleClick() {
      console.log('Button clicked');
    }
  }
};
</script>

<style scoped>
.generated-component {
  padding: 2rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
</style>`;

    case "svelte":
      return `<script>
  let description = '${prompt.slice(0, 100)}...';
  
  function handleClick() {
    console.log('Button clicked');
  }
</script>

<div class="generated-component">
  <h2>Generated Component</h2>
  <p>{description}</p>
  <button on:click={handleClick}>Get Started</button>
</div>

<style>
  .generated-component {
    padding: 2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }
</style>`;

    default:
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .generated-component {
      padding: 2rem;
      border-radius: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      font-family: system-ui, -apple-system, sans-serif;
    }
    button {
      margin-top: 1.5rem;
      padding: 0.75rem 2rem;
      font-size: 1rem;
      border: none;
      border-radius: 8px;
      background: white;
      color: #667eea;
      cursor: pointer;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="generated-component">
    <h2>Generated Component</h2>
    <p>${prompt.slice(0, 100)}...</p>
    <button onclick="alert('Button clicked')">Get Started</button>
  </div>
</body>
</html>`;
  }
}

// Analyze design system from existing code
export async function analyzeDesignSystem(codebase: string): Promise<{
  colors: string[];
  fonts: string[];
  spacing: string[];
  components: string[];
  patterns: string[];
}> {
  const prompt = `Analyze this codebase and extract the design system:
${codebase.slice(0, 3000)}

Return ONLY valid JSON:
{
  "colors": ["<hex_color1>", "<hex_color2>"],
  "fonts": ["<font1>", "<font2>"],
  "spacing": ["<spacing1>", "<spacing2>"],
  "components": ["<component1>", "<component2>"],
  "patterns": ["<pattern1>", "<pattern2>"]
}`;

  try {
    const response = await generateText({
      model: openai("gpt-5-mini"),
      prompt,
    });

    return JSON.parse(response.text);
  } catch {
    // Fallback design system
    return {
      colors: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      fonts: ["Inter", "system-ui"],
      spacing: ["0.5rem", "1rem", "1.5rem", "2rem"],
      components: ["Button", "Card", "Input", "Badge"],
      patterns: ["Grid layout", "Flexbox", "CSS Grid"],
    };
  }
}

// Generate component variations
export async function generateVariations(
  originalCode: string,
  variations: number = 3
): Promise<string[]> {
  const results: string[] = [];
  
  for (let i = 0; i < variations; i++) {
    const prompt = `Create a variation of this component with a different style approach:
${originalCode}

Variation ${i + 1}: Make it ${
      i === 0 ? "more minimalist" :
      i === 1 ? "more playful and colorful" :
      "more professional and corporate"
    }

Return ONLY the modified component code.`;

    try {
      const response = await generateText({
        model: openai("gpt-5-mini"),
        prompt,
        temperature: 0.8,
      });
      
      results.push(response.text);
    } catch {
      results.push(originalCode); // Fallback to original
    }
  }
  
  return results;
}

// Export component package
export async function exportComponentPackage(
  component: {
    code: string;
    framework: string;
    style: string;
    prompt: string;
  },
  email: string
) {
  // Save lead
  const supabase = await createClient();
  await supabase.from("leads").insert({
    email,
    source: "vibe-coding",
    metadata: {
      framework: component.framework,
      style: component.style,
      prompt: component.prompt.slice(0, 100),
    },
    created_at: new Date().toISOString(),
  });

  // Generate package files
  const packageFiles = {
    "component.jsx": component.code,
    "README.md": `# Generated Component

## Description
${component.prompt}

## Framework
${component.framework}

## Style
${component.style}

## Usage
\`\`\`jsx
import Component from './component';

function App() {
  return <Component />;
}
\`\`\`

## Customization
Feel free to modify the styles and functionality to match your needs.

Generated with Sprinter AI's Vibe Coding
`,
    "package.json": JSON.stringify({
      name: "generated-component",
      version: "1.0.0",
      main: "component.jsx",
      dependencies: component.framework === "react" ? {
        "react": "^18.0.0",
        "react-dom": "^18.0.0"
      } : {},
    }, null, 2),
  };

  return packageFiles;
}

// Save component to gallery
export async function saveToGallery(
  component: {
    code: string;
    framework: string;
    style: string;
    prompt: string;
  },
  userId?: string
) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("component_gallery")
    .insert({
      code: component.code,
      framework: component.framework,
      style: component.style,
      prompt: component.prompt,
      user_id: userId,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
}