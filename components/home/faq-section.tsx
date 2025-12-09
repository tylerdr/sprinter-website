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
    question: "What makes you different from big consulting firms?",
    answer: "We ship working systems, not strategy decks. Our sprint-based approach gets AI into production in weeks, not months. We're practitioners who build and deploy—not consultants who advise and leave."
  },
  {
    id: "2",
    question: "We're not very 'tech-forward'—can AI still work for us?",
    answer: "Absolutely. Most of our clients say the same thing initially. We specialize in building AI that works with existing systems, messy data, and real-world workflows. You don't need a modern tech stack or clean data to start."
  },
  {
    id: "3",
    question: "How do your sprints work?",
    answer: "Each sprint is 2-4 weeks with a defined scope and deliverable. We build, you validate, we iterate. Working systems in production—not endless planning cycles."
  },
  {
    id: "4",
    question: "How do wins compound across a portfolio?",
    answer: "The playbook from your first implementation makes the second faster. Shared learnings, proven templates, and trained operators who can extend the work independently."
  },
  {
    id: "5",
    question: "How do we get started?",
    answer: "Book a strategy call and we'll discuss your specific situation—where AI could help, what a sprint might look like, and whether we're a good fit. No pressure, no sales pitch."
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