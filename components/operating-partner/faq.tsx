"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who pays—the GP or portfolio companies?",
    answer: "Flexible. Most funds start with GP budget for pilots, then portco-direct for rollout. We provide fee-offset documentation for either model.",
  },
  {
    question: "What if our ERP is ancient or has no API?",
    answer: "That's our specialty. Upload-only Sage? We ship CSV specs + automations. Desktop-only app? We build an agentic middle layer. No rewires needed.",
  },
  {
    question: "How is this different from hiring consultants?",
    answer: "We're operators, not advisors. We ship working software in 30-45 days with acceptance criteria. One throat to choke, not a vendor parade.",
  },
  {
    question: "What's the minimum commitment?",
    answer: "One pilot (30-45 days). No annual contracts until you see results. After success, most funds move to quarterly bench arrangements.",
  },
  {
    question: "How do you handle security and compliance?",
    answer: "Least-privilege access, redacted documents, full audit logs. We bring a complete governance pack on day 1 that your counsel will approve.",
  },
  {
    question: "Can you work across our entire portfolio?",
    answer: "Yes. We create replicable playbooks from each pilot. Your second implementation is 50% faster, third is 70% faster.",
  },
  {
    question: "What if we miss the acceptance criteria?",
    answer: "We work another sprint at our cost to close the gap. We only succeed when you hit the metrics.",
  },
  {
    question: "Do you require specific tech stacks?",
    answer: "No. We work with QBO, Sage, NetSuite, SAP, custom ERPs, even Excel-based workflows. No API? No problem.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">
            Clear answers to the questions OPs actually ask
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">Have a specific question?</p>
          <p className="text-lg">
            Email{" "}
            <a href="mailto:ops@sprinter.ai" className="text-blue-400 hover:underline">
              ops@sprinter.ai
            </a>
            {" "}or book the workshop to discuss live.
          </p>
        </motion.div>
      </div>
    </section>
  );
}