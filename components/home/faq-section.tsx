"use client";

import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    id: "1",
    question: "How is this different from traditional consulting?",
    answer: "You get specialists who ship production systems in 10 days, not consultants who deliver PowerPoints in 45. Your choice of custom or off-the-shelf. Your repeatable playbooks. Your measurable ROI. No drama, just results."
  },
  {
    id: "2",
    question: "What if our portfolio companies don't have APIs?",
    answer: "No API? No problem. You get automation that works with your legacy systems. 70%+ of deployments need zero API access. Your old systems become automated using document intelligence, screen automation, and smart workflows. You don't need to replace anything."
  },
  {
    id: "3",
    question: "How do you ensure adoption across our portfolio companies?",
    answer: "You build WITH your operators, never for them. Your team gets hands-on training, complete documentation, and change management support. Your internal champions learn to identify and implement new opportunities independently. You own the capability."
  },
  {
    id: "4",
    question: "What's included in a 10-day sprint?",
    answer: "Day 1-3: Your discovery, process mapping, and opportunity assessment. Day 4-7: Your production system built and tested with your real data. Day 8-10: Your deployment with monitoring, training, and handover. You get a working production system with full documentation and support."
  },
  {
    id: "5",
    question: "How do we measure ROI?",
    answer: "You establish clear KPIs upfront: your time saved, your accuracy improvements, your cost reduction, your process acceleration. You track these metrics in real-time across all your deployments. Typical results: 20+ hours/week saved per team, 42% faster quote cycles, 60%+ touchless processing."
  },
  {
    id: "6",
    question: "Can this work with our existing tech stack?",
    answer: "Yes. You keep your current tools—Salesforce, SAP, Microsoft, custom systems. You don't replace anything. You enhance what you have. Your AI integrates additively. You choose: cloud, on-premise, or hybrid. Your infrastructure, your way."
  },
  {
    id: "7",
    question: "What about data security and compliance?",
    answer: "You stay compliant. Your data stays in your environment. You get full audit trails, encryption at rest and in transit, role-based access controls. Your HIPAA/GDPR requirements are met. Your security standards drive every decision."
  },
  {
    id: "8",
    question: "How do we scale across our portfolio?",
    answer: "You start with one high-impact use case. You prove value. You templatize and deploy across sister companies. Your 2nd deployment is 50% faster. Your 3rd is 70% faster. You maintain a portfolio-wide knowledge base. Your wins compound."
  }
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <section className="py-24 sm:py-28 relative overflow-hidden bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about partnering with Sprinter.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
              >
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
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}