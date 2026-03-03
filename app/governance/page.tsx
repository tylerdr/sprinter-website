import type { Metadata } from "next";
import { GovernanceHero } from "@/components/governance/hero";
import { SecurityFeatures } from "@/components/governance/security-features";
import { ComplianceSection } from "@/components/governance/compliance";
import { AuditTrail } from "@/components/governance/audit-trail";
import { GovernanceDownload } from "@/components/governance/download";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Governance & Security for PE AI Initiatives | Sprinter AI",
  description: "Enterprise-grade security, vendor neutrality, and complete audit trails. Fee-offset documentation and LP-defensible governance for your AI operating initiatives.",
  keywords: "AI governance, PE compliance, security audit, vendor neutrality, fee offset, LP reporting, SOC2, data privacy",
};

export default function GovernancePage() {
  return (
    <div className="spr-theme spr-page">
      <GovernanceHero />
      <SecurityFeatures />
      <ComplianceSection />
      <AuditTrail />
      <GovernanceDownload />
    </div>
  );
}