"use client";

import WorkflowTool from "@/components/labs/WorkflowTool";
import { LabWrapper } from "@/components/labs/lab-wrapper";

export function WorkflowToolClient() {
  const howItWorks = (
    <>
      <h3>How Workflow Designer Works</h3>
      <p>
        Map out your business workflow step by step, and our AI will analyze
        each stage to identify opportunities for automation and augmentation. 
        We'll show you exactly where AI agents can streamline operations, 
        reduce errors, and accelerate your processes.
      </p>
      <h4>Key Features</h4>
      <ul>
        <li><strong>Visual Process Mapping:</strong> Drag and drop to build your workflow</li>
        <li><strong>AI Analysis:</strong> Get automation recommendations for each step</li>
        <li><strong>ROI Projections:</strong> See potential time and cost savings</li>
        <li><strong>Export Options:</strong> Download your workflow as PDF or JSON</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Customer Onboarding</h4>
        <p className="text-sm text-muted-foreground">
          Automate verification, document processing, and account setup
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Invoice Processing</h4>
        <p className="text-sm text-muted-foreground">
          Extract data, validate, match POs, and trigger payments automatically
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Content Creation Pipeline</h4>
        <p className="text-sm text-muted-foreground">
          Research, draft, review, publish, and distribute content with AI
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• Built with React Flow for smooth visual editing</li>
        <li>• AI analysis powered by GPT-4 and Claude</li>
        <li>• Real-time collaboration support</li>
        <li>• Export to BPMN 2.0 standard format</li>
        <li>• Integration with Zapier, Make, and n8n</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="Workflow Designer"
      description="Map your business processes and discover AI automation opportunities"
      slug="workflow-tool"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Get your personalized AI transformation roadmap"
    >
      <WorkflowTool />
    </LabWrapper>
  );
}