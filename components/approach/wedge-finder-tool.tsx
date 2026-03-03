"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Clock,
  CheckCircle2,
  Download,
  Mail
} from "lucide-react";

const questions = [
  {
    id: "department",
    question: "Which department experiences the most document-related pain?",
    options: [
      { value: "finance", label: "Finance/Accounting", icon: "💰" },
      { value: "operations", label: "Operations", icon: "⚙️" },
      { value: "sales", label: "Sales/Customer Service", icon: "📞" },
      { value: "hr", label: "Human Resources", icon: "👥" },
      { value: "logistics", label: "Logistics/Supply Chain", icon: "🚚" },
    ],
  },
  {
    id: "volume",
    question: "How many documents does this team process monthly?",
    options: [
      { value: "low", label: "< 100", icon: "📄" },
      { value: "medium", label: "100-500", icon: "📚" },
      { value: "high", label: "500-2,000", icon: "📦" },
      { value: "very-high", label: "2,000+", icon: "🏢" },
    ],
  },
  {
    id: "time",
    question: "Average time spent per document today?",
    options: [
      { value: "quick", label: "< 5 minutes", icon: "⚡" },
      { value: "moderate", label: "5-15 minutes", icon: "⏱️" },
      { value: "slow", label: "15-30 minutes", icon: "🐌" },
      { value: "painful", label: "30+ minutes", icon: "😫" },
    ],
  },
  {
    id: "errors",
    question: "How often do errors or rework occur?",
    options: [
      { value: "rare", label: "Rarely (< 5%)", icon: "✨" },
      { value: "occasional", label: "Sometimes (5-15%)", icon: "⚠️" },
      { value: "frequent", label: "Often (15-30%)", icon: "🔄" },
      { value: "constant", label: "Very Often (30%+)", icon: "🆘" },
    ],
  },
  {
    id: "systems",
    question: "What's your primary system situation?",
    options: [
      { value: "modern", label: "Cloud ERP with APIs", icon: "☁️" },
      { value: "hybrid", label: "Mix of modern and legacy", icon: "🔗" },
      { value: "desktop", label: "Desktop software (QuickBooks, etc)", icon: "🖥️" },
      { value: "manual", label: "Mostly spreadsheets/manual", icon: "📊" },
    ],
  },
];

const wedgeRecommendations: Record<string, { primary: string; documents: string[]; metrics: { touchless: string; timeSaved: string; roi: string }; acceptanceCriteria: string[] }> = {
  "finance-high-slow": {
    primary: "Invoice Processing Automation",
    documents: ["Invoices", "Purchase Orders", "Receipts"],
    metrics: { touchless: "65%", timeSaved: "85%", roi: "4 months" },
    acceptanceCriteria: [
      "≥60% touchless processing rate",
      "< 2 minute average processing time",
      "< 5% error rate on extraction",
      "Full audit trail for compliance",
    ],
  },
  "operations-high-moderate": {
    primary: "Work Order Digitization",
    documents: ["Work Orders", "Job Tickets", "Service Requests"],
    metrics: { touchless: "70%", timeSaved: "75%", roi: "3 months" },
    acceptanceCriteria: [
      "Automatic routing to correct team",
      "Priority flagging based on SLA",
      "Mobile-friendly review interface",
      "Integration with scheduling system",
    ],
  },
  "logistics-very-high-slow": {
    primary: "Bill of Lading Reconciliation",
    documents: ["BOLs", "Freight Bills", "Delivery Notes"],
    metrics: { touchless: "55%", timeSaved: "80%", roi: "2 months" },
    acceptanceCriteria: [
      "3-way match automation",
      "Discrepancy flagging",
      "Carrier performance tracking",
      "Exception queue for disputes",
    ],
  },
  default: {
    primary: "Document Intelligence Quick Win",
    documents: ["Your highest-volume document type"],
    metrics: { touchless: "60%", timeSaved: "70%", roi: "3-4 months" },
    acceptanceCriteria: [
      "Automated data extraction",
      "Validation against business rules",
      "Human-in-the-loop for exceptions",
      "Complete audit trail",
    ],
  },
};

export function WedgeFinderTool() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState(wedgeRecommendations.default);
  const [monthlySavings, setMonthlySavings] = useState("0");

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const key = `${answers.department}-${answers.volume}-${answers.time}`;
    const recommendation = wedgeRecommendations[key] || wedgeRecommendations.default;

    const volumeMultiplier = answers.volume === "very-high" ? 4 : answers.volume === "high" ? 2 : 1;
    const timeMultiplier = answers.time === "painful" ? 3 : answers.time === "slow" ? 2 : 1;
    const savings = (5000 * volumeMultiplier * timeMultiplier).toLocaleString();

    setResult(recommendation);
    setMonthlySavings(savings);
    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="spr-container py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <CheckCircle2 className="w-16 h-16 text-[color:var(--spr-primary)] mx-auto mb-4" />
              <h1 className="spr-heading-xl mb-2">Your Perfect Wedge Identified!</h1>
              <p className="spr-body-lg">
                Based on your answers, here&apos;s where we recommend starting:
              </p>
            </div>

            <div className="spr-card p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-[color:var(--spr-accent)]">
                {result.primary}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-[color:var(--spr-text)]">
                    <FileText className="w-5 h-5 text-[color:var(--spr-primary)]" />
                    Document Types
                  </h3>
                  <ul className="space-y-2">
                    {result.documents.map((doc) => (
                      <li key={doc} className="flex items-center gap-2 text-[color:var(--spr-text-soft)]">
                        <CheckCircle2 className="w-4 h-4 text-[color:var(--spr-primary)]" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2 text-[color:var(--spr-text)]">
                    <Clock className="w-5 h-5 text-[color:var(--spr-accent)]" />
                    Expected Metrics
                  </h3>
                  <div className="space-y-2 text-[color:var(--spr-text-soft)]">
                    <div className="flex justify-between">
                      <span>Touchless Rate:</span>
                      <span className="font-bold text-[color:var(--spr-primary)]">{result.metrics.touchless}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Saved:</span>
                      <span className="font-bold text-[color:var(--spr-primary)]">{result.metrics.timeSaved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI Timeline:</span>
                      <span className="font-bold text-[color:var(--spr-accent)]">{result.metrics.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-3 text-[color:var(--spr-text)]">Acceptance Criteria for Success</h3>
                <div className="rounded-[var(--spr-radius-sm)] border [border-color:var(--spr-border)] bg-[color:var(--spr-surface)] p-4">
                  <ul className="space-y-2">
                    {result.acceptanceCriteria.map((criteria) => (
                      <li key={criteria} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[color:var(--spr-primary)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-[color:var(--spr-text-soft)]">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-[var(--spr-radius-sm)] border [border-color:var(--spr-border)] bg-[color:rgba(106,167,255,0.12)] p-6">
                <h3 className="font-semibold mb-2 text-[color:var(--spr-text)]">Estimated Monthly Savings</h3>
                <p className="text-3xl font-bold text-[color:var(--spr-primary)]">${monthlySavings}</p>
                <p className="text-sm text-[color:var(--spr-text-muted)] mt-1">
                  Based on your volume and current processing time
                </p>
              </div>
            </div>

            {/* Email Capture */}
            <div className="spr-card p-8">
              <h3 className="text-xl font-semibold mb-4 text-[color:var(--spr-text)]">Get Your Detailed Wedge Report</h3>
              <p className="text-[color:var(--spr-text-muted)] mb-6">
                We&apos;ll send you a comprehensive report with implementation steps, timeline, and ROI projections.
              </p>

              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-[var(--spr-radius-sm)] border [border-color:var(--spr-border)] bg-[color:var(--spr-surface)] px-4 py-2.5 text-sm text-[color:var(--spr-text)] placeholder:text-[color:var(--spr-text-muted)] outline-none focus:border-[color:var(--spr-primary)]"
                />
                <button className="spr-button spr-button-secondary">
                  <Mail className="mr-2 w-4 h-4" />
                  Send Report
                </button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button className="spr-button spr-button-secondary flex-1">
                  <Download className="mr-2 w-4 h-4" />
                  Download PDF
                </button>
                <Link href="/contact" className="spr-button spr-button-primary flex-1">
                  Book 2-Week Sprint
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="spr-container py-20">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h1 className="spr-heading-xl mb-2">Find Your Perfect AI Wedge</h1>
            <p className="spr-body-lg">
              Answer 5 quick questions to identify your ideal starting point
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[color:var(--spr-text-muted)]">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-[color:var(--spr-text)]">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full rounded-full h-2 bg-[color:var(--spr-surface-strong)]">
              <motion.div
                className="h-2 rounded-full"
                style={{ background: "linear-gradient(90deg, var(--spr-primary), var(--spr-accent))" }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="spr-card p-8">
                <h2 className="text-xl font-semibold mb-6 text-[color:var(--spr-text)]">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3" role="radiogroup" aria-label={questions[currentQuestion].question}>
                  {questions[currentQuestion].options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-3 p-3 rounded-[var(--spr-radius-sm)] border cursor-pointer transition-colors ${
                        answers[questions[currentQuestion].id] === option.value
                          ? "[border-color:var(--spr-primary)] bg-[color:rgba(106,167,255,0.12)]"
                          : "[border-color:var(--spr-border)] hover:border-[color:var(--spr-primary)] hover:bg-[color:rgba(106,167,255,0.06)]"
                      }`}
                    >
                      <input
                        type="radio"
                        name={questions[currentQuestion].id}
                        value={option.value}
                        checked={answers[questions[currentQuestion].id] === option.value}
                        onChange={() => handleAnswer(option.value)}
                        className="sr-only"
                      />
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                        answers[questions[currentQuestion].id] === option.value
                          ? "[border-color:var(--spr-primary)]"
                          : "[border-color:var(--spr-border)]"
                      }`}>
                        {answers[questions[currentQuestion].id] === option.value && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--spr-primary)]" />
                        )}
                      </span>
                      <span className="text-2xl">{option.icon}</span>
                      <span className="text-[color:var(--spr-text)]">{option.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className="spr-button spr-button-secondary disabled:opacity-50"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Previous
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                    className="spr-button spr-button-primary disabled:opacity-50"
                  >
                    {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
