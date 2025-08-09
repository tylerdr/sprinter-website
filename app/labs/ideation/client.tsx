"use client";

import IdeationLab from "@/components/labs/IdeationLab";
import { LabWrapper } from "@/components/labs/lab-wrapper";

export function IdeationLabClient() {
  const howItWorks = (
    <>
      <h3>How Ideation Lab Works</h3>
      <p>
        Play creative AI-powered games designed to spark innovation and test 
        your entrepreneurial thinking. Each game challenges you to think 
        differently while AI provides intelligent suggestions, critiques, 
        and enhancements to your ideas.
      </p>
      <h4>Available Games</h4>
      <ul>
        <li><strong>Brainstorm Race:</strong> Generate as many ideas as possible in 60 seconds</li>
        <li><strong>Concept Battle:</strong> Compete against AI to create the best business idea</li>
        <li><strong>Startup Scattergories:</strong> Fill categories with unique startup concepts</li>
        <li><strong>Pivot Challenge:</strong> Transform failed ideas into successful ones</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Product Innovation Workshop</h4>
        <p className="text-sm text-muted-foreground">
          Use brainstorm race to generate 50+ product features in minutes
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Startup Ideation Session</h4>
        <p className="text-sm text-muted-foreground">
          Play concept battle to validate and refine your business ideas
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Team Building Exercise</h4>
        <p className="text-sm text-muted-foreground">
          Compete in startup scattergories for creative team collaboration
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• Real-time AI suggestions using GPT-4</li>
        <li>• Gamification mechanics for engagement</li>
        <li>• Score tracking and leaderboards</li>
        <li>• Export ideas to CSV or JSON</li>
        <li>• Multiplayer support coming soon</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="Ideation Lab"
      description="Play creative AI games to spark innovation"
      slug="ideation"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Bring AI-powered ideation to your team"
    >
      <IdeationLab />
    </LabWrapper>
  );
}