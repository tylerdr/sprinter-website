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
    question: "What makes you different from McKinsey or BCG AI practices?",
    answer: "They sell strategy decks. We ship production systems. In 10 days. We're practitioners who've built 50+ production AI systems, not consultants with vendor partnerships. We have zero conflicts of interest—no commissions from recommending specific tools. And we guarantee results: if we don't deliver measurable ROI, we work free until you see it."
  },
  {
    id: "2",
    question: "What's your guarantee exactly?",
    answer: "Three guarantees: (1) Our free assessment identifies at least $500K in AI opportunities—or it's completely free. (2) If we don't ship your AI system to production in 10 days, we continue at no charge until we do. (3) If you don't see measurable ROI within 90 days on any retainer, we work free until you do. Zero risk."
  },
  {
    id: "3",
    question: "What if our systems don't have APIs?",
    answer: "That's actually 70% of our deployments. Our No-API Advantage™ approach uses document intelligence, screen automation, and smart workflows to automate legacy systems that were never designed for integration. You don't need to replace anything—we work with what you have."
  },
  {
    id: "4",
    question: "How does the 10-day sprint work?",
    answer: "Days 1-2: Problem definition and reality check. Days 3-4: Data architecture and model design. Days 5-6: Core system build. Days 7-8: Integration and UX. Days 9-10: Testing, deployment, and training. You get a production system with full documentation—not a proof-of-concept that stalls."
  },
  {
    id: "5",
    question: "What ROI should we expect?",
    answer: "Our clients average 250% ROI within 60 days. Specific examples: $3.2M annual savings from AP automation, $4.8M EBITDA improvement from quote intelligence, $8.2M collection acceleration from revenue cycle AI. We'll project your specific ROI during the free assessment."
  },
  {
    id: "6",
    question: "Why do you only take 3 new retainer clients per quarter?",
    answer: "Quality over quantity. Our senior practitioners work directly on every engagement—no junior consultants learning on your dime. We maintain this capacity constraint to ensure every client gets our A-team. If you want to secure a slot, book your assessment soon."
  },
  {
    id: "7",
    question: "How do wins compound across our portfolio?",
    answer: "We call it the Portfolio Multiplier Effect™. The playbook from your first portco accelerates the second by 50%. The third by 70%. You build a portfolio-wide AI knowledge base with proven templates, best practices, and trained internal champions who can extend the work independently."
  },
  {
    id: "8",
    question: "What about data security?",
    answer: "Your data stays in your environment. We don't train models on your data. Full encryption, audit trails, and role-based access. We work within your compliance requirements—HIPAA, GDPR, SOC 2, whatever you need. Security isn't negotiable."
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