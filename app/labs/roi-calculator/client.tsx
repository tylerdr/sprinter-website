"use client";

import RoiCalculator from "@/components/labs/RoiCalculator";
import { LabWrapper } from "@/components/labs/lab-wrapper";

export function RoiCalculatorClient() {
  const howItWorks = (
    <>
      <h3>How the ROI Calculator Works</h3>
      <p>
        Our AI ROI Calculator helps you understand the financial impact of implementing AI automation
        in your organization. By inputting your team size, average hourly rates, and automation
        potential, you can see projected savings and breakeven timelines.
      </p>
      <h4>Key Calculations</h4>
      <ul>
        <li><strong>Time Savings:</strong> Based on the percentage of repetitive tasks that can be automated</li>
        <li><strong>Cost Reduction:</strong> Annual savings from reduced manual work hours</li>
        <li><strong>Breakeven Analysis:</strong> How quickly your AI investment pays for itself</li>
        <li><strong>Productivity Gains:</strong> Additional capacity for strategic work</li>
      </ul>
      <p>
        These calculations are based on real client data showing 70-90% reduction in time spent
        on repetitive tasks after AI implementation.
      </p>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Small Team (5 people)</h4>
        <p className="text-sm text-muted-foreground">
          Typical savings: $150,000-250,000/year • Breakeven: 2-3 months
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Medium Team (20 people)</h4>
        <p className="text-sm text-muted-foreground">
          Typical savings: $800,000-1,200,000/year • Breakeven: 1-2 months
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Large Organization (100+ people)</h4>
        <p className="text-sm text-muted-foreground">
          Typical savings: $4,000,000-8,000,000/year • Breakeven: 2-4 weeks
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Calculation Methodology</h3>
      <div className="p-4 rounded-lg bg-muted/50">
        <code className="text-sm">
          Annual Savings = (Team Size × Hourly Rate × 2080 hours) × Automation %
        </code>
      </div>
      <ul className="space-y-2 text-sm">
        <li>• Based on standard 2080 work hours per year</li>
        <li>• Conservative estimates (70% automation typical)</li>
        <li>• Includes implementation and maintenance costs</li>
        <li>• Validated against 50+ client implementations</li>
        <li>• Updates in real-time as you adjust parameters</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="AI ROI Calculator"
      description="Calculate your potential savings from AI automation"
      slug="roi-calculator"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Get a custom ROI analysis for your team"
    >
      <RoiCalculator />
    </LabWrapper>
  );
}