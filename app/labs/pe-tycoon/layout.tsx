import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PE Tycoon - Private Equity Simulation Game | Sprinter AI Labs",
  description: "Master private equity with AI-powered simulation. Build portfolios, execute value creation, navigate market cycles. The most realistic PE game ever built.",
};

export default function PETycoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}