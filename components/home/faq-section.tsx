"use client";

import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import ScrollFloat from "@/components/ScrollFloat";
import { useState } from "react";

const faqs = [
  {
    id: "1",
    question: "How is Sprinter different from traditional consulting?",
    answer: "We ship working AI in production within 10 days, not PowerPoint decks. Our team consists of operators who've built and scaled AI at companies like Wells Fargo and Accenture. We focus on immediate value creation with touchless automation rates of 60%+ and measurable ROI within 30-45 days."
  },
  {
    id: "2",
    question: "What if our portfolio companies don't have APIs?",
    answer: "No API? No problem. We specialize in automation without integration dependencies. Using advanced screen scraping, document processing, and intelligent workflows, we can automate legacy systems that traditional approaches can't touch. Over 70% of our implementations require zero API access."
  },
  {
    id: "3",
    question: "How do you ensure adoption across portfolio companies?",
    answer: "We build WITH your operators, not for them. Every sprint includes hands-on training, documentation, and change management. We establish internal champions who can identify and implement new AI opportunities independently. Our 'train-the-trainer' approach ensures sustainable, scalable adoption."
  },
  {
    id: "4",
    question: "What's included in a 10-day sprint?",
    answer: "Day 1-2: Discovery and process mapping. Day 3-5: Build and test AI prototype with real data. Day 6-8: Deploy to production with monitoring. Day 9-10: Team training and handover. You get a working solution, not a proof of concept, with full documentation and ongoing support."
  },
  {
    id: "5",
    question: "How do you measure ROI?",
    answer: "We establish clear KPIs upfront: time saved, accuracy improvements, cost reduction, and process acceleration. Our portfolio dashboard tracks these metrics in real-time across all deployments. Typical results include 20+ hours/week saved per team, 42% faster quote cycles, and 60%+ touchless processing rates."
  },
  {
    id: "6",
    question: "Can you work with our existing tech stack?",
    answer: "Absolutely. We integrate with your current tools - Salesforce, SAP, Microsoft, custom systems - without requiring replacements. Our approach is additive, enhancing what you have rather than ripping and replacing. We support cloud, on-premise, and hybrid deployments."
  },
  {
    id: "7",
    question: "What about data security and compliance?",
    answer: "Security first, always. We're SOC 2 compliant, support HIPAA/GDPR requirements, and can deploy within your infrastructure. All data stays within your environment. We provide full audit trails, encryption at rest and in transit, and role-based access controls."
  },
  {
    id: "8",
    question: "How do you scale across a portfolio?",
    answer: "Start with one high-impact use case, prove value, then templatize and deploy across sister companies. Our playbook approach means the second deployment is 50% faster, the third is 70% faster. We maintain a portfolio-wide knowledge base of successful automations and best practices."
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <ScrollFloat className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about partnering with Sprinter.
          </p>
        </ScrollFloat>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {faqs.map((faq, index) => (
              <ScrollFloat key={faq.id} delay={index * 0.05}>
                <AccordionItem value={faq.id} className="mb-4">
                  <AccordionPrimitive.Header className="flex">
                    <AccordionPrimitive.Trigger className="flex w-full items-center justify-between p-4 text-left font-medium transition-all hover:bg-muted/50 rounded-lg">
                      <span className="text-base md:text-lg">
                        {faq.question}
                      </span>
                      <PlusIcon
                        className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                          openItems.includes(faq.id) ? "rotate-45" : ""
                        }`}
                      />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </ScrollFloat>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}