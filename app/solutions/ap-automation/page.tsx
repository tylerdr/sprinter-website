import type { Metadata } from "next";
import { APHero } from "@/components/solutions/ap-automation/hero";
import { HowItWorks } from "@/components/solutions/ap-automation/how-it-works";
import { AcceptanceCriteria } from "@/components/solutions/ap-automation/acceptance-criteria";
import { ERPSupport } from "@/components/solutions/ap-automation/erp-support";
import { Results } from "@/components/solutions/ap-automation/results";
import { DownloadBrief } from "@/components/solutions/ap-automation/download-brief";

export const metadata: Metadata = {
  title: "AP & Expense Automation for QBO/Sage | Sprinter AI",
  description: "60% touchless invoices in 2-3 sprints. Works with QBO, Sage, and upload-only ERPs. Clear acceptance criteria, full audit trail, exception SLA <48h.",
  keywords: "AP automation, expense automation, QuickBooks automation, Sage automation, invoice processing, touchless invoices, ERP automation, sprint-based AI",
};

export default function APAutomationPage() {
  return (
    <>
      <APHero />
      <HowItWorks />
      <AcceptanceCriteria />
      <ERPSupport />
      <Results />
      <DownloadBrief />
    </>
  );
}