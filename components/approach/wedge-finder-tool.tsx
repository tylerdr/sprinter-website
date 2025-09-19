"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Users,
  Clock,
  AlertTriangle,
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

const wedgeRecommendations: Record<string, any> = {
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
  // Default fallback
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
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);

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
    // Simple logic to determine recommendation
    const key = `${answers.department}-${answers.volume}-${answers.time}`;
    const recommendation = wedgeRecommendations[key] || wedgeRecommendations.default;

    // Add calculated savings based on answers
    const volumeMultiplier = answers.volume === "very-high" ? 4 : answers.volume === "high" ? 2 : 1;
    const timeMultiplier = answers.time === "painful" ? 3 : answers.time === "slow" ? 2 : 1;
    const monthlySavings = 5000 * volumeMultiplier * timeMultiplier;

    setAnswers({
      ...answers,
      recommendation: recommendation.primary,
      documents: recommendation.documents,
      metrics: recommendation.metrics,
      acceptanceCriteria: recommendation.acceptanceCriteria,
      monthlySavings: monthlySavings.toString(),
    });

    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-8">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Your Perfect Wedge Identified!</h1>
              <p className="text-xl text-muted-foreground">
                Based on your answers, here's where we recommend starting:
              </p>
            </div>

            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">
                {answers.recommendation}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Document Types
                  </h3>
                  <ul className="space-y-2">
                    {(Array.isArray(answers.documents) ? answers.documents : [answers.documents].filter(Boolean)).map((doc) => (
                      <li key={doc} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    Expected Metrics
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Touchless Rate:</span>
                      <span className="font-bold text-green-500">{answers.metrics?.touchless}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Saved:</span>
                      <span className="font-bold text-blue-500">{answers.metrics?.timeSaved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ROI Timeline:</span>
                      <span className="font-bold text-purple-500">{answers.metrics?.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-3">Acceptance Criteria for Success</h3>
                <div className="bg-muted/20 rounded-lg p-4">
                  <ul className="space-y-2">
                    {(answers.acceptanceCriteria as string[])?.map((criteria: string) => (
                      <li key={criteria} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-6 border">
                <h3 className="font-semibold mb-2">Estimated Monthly Savings</h3>
                <p className="text-3xl font-bold gradient-text">${answers.monthlySavings}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on your volume and current processing time
                </p>
              </div>
            </Card>

            {/* Email Capture */}
            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4">Get Your Detailed Wedge Report</h3>
              <p className="text-muted-foreground mb-6">
                We'll send you a comprehensive report with implementation steps, timeline, and ROI projections.
              </p>

              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button>
                  <Mail className="mr-2 w-4 h-4" />
                  Send Report
                </Button>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 w-4 h-4" />
                  Download PDF
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                  Book 2-Week Sprint →
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Your Perfect AI Wedge</h1>
            <p className="text-muted-foreground">
              Answer 5 quick questions to identify your ideal starting point
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
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
              <Card className="p-8">
                <h2 className="text-xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ""}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer flex items-center gap-3"
                      >
                        <span className="text-2xl">{option.icon}</span>
                        <span>{option.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!answers[questions[currentQuestion].id]}
                  >
                    {currentQuestion === questions.length - 1 ? "Get Results" : "Next"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}