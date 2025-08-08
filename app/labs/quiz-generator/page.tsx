import type { Metadata } from "next";
import { FileQuestion } from "lucide-react";
import { generateMetadata as createSEOMetadata } from "@/lib/seo";
import { SEO } from "@/lib/constants";
import QuizGenerator from "@/components/labs/QuizGenerator";

export const metadata: Metadata = createSEOMetadata({
  title: "PDF Quiz Generator - AI-Powered Quiz Creation | Sprinter AI",
  description:
    "Upload PDFs and automatically generate customized quizzes with multiple choice, true/false, and short answer questions. Perfect for education and training.",
  keywords:
    "AI quiz generator, PDF quiz creation, educational AI, quiz maker, automatic question generation, assessment tool",
  canonical: `${SEO.siteUrl}/labs/quiz-generator`,
  ogTitle: "PDF Quiz Generator - Create Quizzes from Any Document",
  ogDescription:
    "Upload PDFs and generate customized quizzes automatically with AI-powered question creation.",
});

export default function QuizGeneratorPage() {
  return (
    <div className="min-h-screen py-16 sm:py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-full bg-brand-10 border border-brand-30 mb-4 sm:mb-6">
            <FileQuestion className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
            <span className="text-xs sm:text-sm font-medium text-brand">
              Interactive Demo
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            PDF Quiz <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">
            Upload any PDF and automatically generate customized quizzes with 
            multiple question types and difficulty levels
          </p>
        </div>

        <QuizGenerator />

        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-base sm:text-lg font-semibold mb-3">
            How it works
          </h3>
          <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
            Upload any PDF document and our AI will analyze the content to generate 
            comprehensive quizzes. Choose from multiple choice, true/false, short answer, 
            or mixed question types. Set the difficulty level and number of questions 
            to match your learning objectives.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Perfect for educators creating assessments, students testing their knowledge, 
            or training programs that need automated quiz generation from course materials. 
            Export quizzes in multiple formats for use in various learning management systems.
          </p>
        </div>
      </div>
    </div>
  );
}