"use client";

import ComponentStudio from "@/components/labs/ComponentStudio";
import { LabWrapper } from "@/components/labs/lab-wrapper";

export function ComponentStudioClient() {
  const howItWorks = (
    <>
      <h3>How Component Studio Works</h3>
      <p>
        Generate production-ready React components instantly with AI. Just describe 
        what you need and watch as AI creates fully-styled, responsive components 
        with real-time preview and syntax highlighting.
      </p>
      <h4>Key Features</h4>
      <ul>
        <li><strong>Natural Language Input:</strong> Describe components in plain English</li>
        <li><strong>Live Preview:</strong> See components render in real-time</li>
        <li><strong>Multiple Frameworks:</strong> React, Vue, Angular, and more</li>
        <li><strong>Style Options:</strong> Tailwind, CSS-in-JS, or plain CSS</li>
        <li><strong>Export Ready:</strong> Copy code directly to your project</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Dashboard Components</h4>
        <p className="text-sm text-muted-foreground">
          &ldquo;Create a stats card with animated numbers and gradient background&rdquo;
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Form Elements</h4>
        <p className="text-sm text-muted-foreground">
          &ldquo;Build a multi-step form with validation and progress indicator&rdquo;
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Data Visualization</h4>
        <p className="text-sm text-muted-foreground">
          &ldquo;Generate a responsive chart component with real-time updates&rdquo;
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Navigation</h4>
        <p className="text-sm text-muted-foreground">
          &ldquo;Design a mobile-responsive navbar with dropdown menus&rdquo;
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• AI-powered by GPT-4 and Claude 3</li>
        <li>• Real-time component compilation</li>
        <li>• TypeScript support with type inference</li>
        <li>• Accessibility (WCAG 2.1) compliant code</li>
        <li>• Component library integration (MUI, Ant Design, shadcn)</li>
        <li>• Git-friendly code formatting</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="Component Studio"
      description="Generate production-ready React components with AI"
      slug="component-studio"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Accelerate your development with AI-powered components"
    >
      <ComponentStudio />
    </LabWrapper>
  );
}