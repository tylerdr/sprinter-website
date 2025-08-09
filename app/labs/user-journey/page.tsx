import type { Metadata } from "next";
import { UserJourneyClient } from "./client";

export const metadata: Metadata = {
  title: "User Journey Mapper - Visual Journey Design | Sprinter AI",
  description: "Map and optimize user journeys with AI. Create visual flowcharts of customer experiences, identify pain points, and discover optimization opportunities.",
  keywords: "user journey mapping, customer journey, UX design, journey visualization, customer experience, user flow",
  openGraph: {
    title: "User Journey Mapper - Design Better Customer Experiences",
    description: "AI-powered user journey mapping to visualize, analyze, and optimize customer experiences.",
  },
};

export default function UserJourneyPage() {
  return <UserJourneyClient />;
}