import type { Metadata } from "next";
import { Calculator, TrendingUp, Target } from "lucide-react";
import RoiCalculator from "@/components/labs/RoiCalculator";

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
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
              <Calculator className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            AI <span className="gradient-text">ROI Calculator</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-2 sm:px-0 leading-relaxed">
            Discover how much your team could save with AI automation. Calculate your potential 
            return on investment, breakeven timeline, and productivity gains.
          </p>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card/20 border border-border/30 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Real-Time Calculations</h3>
            <p className="text-sm text-muted-foreground">
              See instant updates as you adjust your team size, rates, and automation parameters.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card/20 border border-border/30 rounded-xl backdrop-blur-sm">
            <Target className="w-8 h-8 text-brand mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Accurate Projections</h3>
            <p className="text-sm text-muted-foreground">
              Based on real client data showing 70-90% reduction in repetitive task time.
            </p>
          </div>
          
          <div className="text-center p-6 bg-card/20 border border-border/30 rounded-xl backdrop-blur-sm">
            <Calculator className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Comprehensive Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Full cost-benefit breakdown including implementation costs and breakeven timeline.
            </p>
          </div>
        </div>

        {/* Calculator Component */}
        <RoiCalculator />

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl border border-brand-30 bg-brand-10 max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            Ready to Turn These Projections Into Reality?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed px-2 sm:px-0">
            Our AI specialists can help you identify the best automation opportunities 
            and build solutions that deliver measurable results. Get started with a 
            free consultation to discuss your specific use case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity touch-manipulation min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
            >
              Schedule Free Consultation
            </a>
            <a
              href="/labs"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border/20 rounded-lg hover:bg-card/30 transition-colors touch-manipulation min-h-[44px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-start)] focus:ring-offset-2 focus:ring-offset-background"
            >
              Explore More AI Tools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}