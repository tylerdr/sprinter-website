import type { Metadata } from "next";
import { RoiCalculatorClient } from "./client";

export const metadata: Metadata = {
  title: "AI ROI Calculator - Calculate Your Automation Savings | Sprinter AI Labs",
  description: "Interactive ROI calculator to estimate potential savings from AI automation. Calculate breakeven timeline, productivity gains, and annual cost savings for your team.",
  keywords: "AI ROI calculator, automation savings, AI investment return, productivity calculator, cost benefit analysis, AI transformation ROI",
  openGraph: {
    title: "AI ROI Calculator - See Your Automation Savings",
    description: "Calculate how much your team could save with AI automation. Interactive tool showing breakeven timeline and productivity gains.",
  },
};

export default function RoiCalculatorPage() {
  return <RoiCalculatorClient />;
}