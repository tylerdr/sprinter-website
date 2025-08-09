"use client";

import SketchStudio from "@/components/labs/SketchStudio";
import { LabWrapper } from "@/components/labs/lab-wrapper";

export function SketchStudioClient() {
  const howItWorks = (
    <>
      <h3>How Sketch Studio Works</h3>
      <p>
        Draw rough sketches and watch AI transform them into stunning artwork. 
        Our AI understands your creative intent and enhances your drawings with 
        professional styling, colors, and details.
      </p>
      <h4>The Process</h4>
      <ol>
        <li><strong>Draw Your Idea:</strong> Use the canvas to sketch your concept. Don&apos;t worry about perfection—AI understands rough drawings!</li>
        <li><strong>Add Details:</strong> Optionally describe your vision and choose an art style to guide the AI transformation.</li>
        <li><strong>Generate Art:</strong> Click transform and watch AI turn your sketch into professional artwork in seconds.</li>
      </ol>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Logo Design</h4>
        <p className="text-sm text-muted-foreground">
          Sketch a rough logo concept and generate professional variations
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Character Design</h4>
        <p className="text-sm text-muted-foreground">
          Draw character outlines and transform them into detailed illustrations
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Product Mockups</h4>
        <p className="text-sm text-muted-foreground">
          Sketch product ideas and create polished concept art
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">UI/UX Wireframes</h4>
        <p className="text-sm text-muted-foreground">
          Convert hand-drawn wireframes into high-fidelity designs
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• Powered by DALL-E 3 and Stable Diffusion</li>
        <li>• Real-time canvas drawing with pressure sensitivity</li>
        <li>• Multiple art style presets</li>
        <li>• Export in PNG, SVG, or PSD formats</li>
        <li>• Batch processing for multiple variations</li>
        <li>• History and version control</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="AI Sketch Studio"
      description="Transform your rough sketches into stunning artwork with AI"
      slug="sketch-studio"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Bring AI-powered design tools to your creative team"
    >
      <SketchStudio />
    </LabWrapper>
  );
}