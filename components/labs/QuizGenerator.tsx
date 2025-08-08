"use client";

import { useState } from "react";
import { Upload, FileText, Settings, Brain, Download, Eye, EyeOff, RotateCcw, CheckCircle } from "lucide-react";

interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

interface QuizConfig {
  questionType: 'multiple-choice' | 'true-false' | 'short-answer' | 'mixed';
  numberOfQuestions: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

const sampleQuiz: QuizQuestion[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What is the primary goal of artificial intelligence?',
    options: [
      'To replace human workers entirely',
      'To create machines that can think and learn like humans',
      'To make computers faster',
      'To reduce manufacturing costs'
    ],
    correctAnswer: 1,
    explanation: 'AI aims to create systems that can perform tasks that typically require human intelligence, such as learning, reasoning, and problem-solving.'
  },
  {
    id: '2',
    type: 'true-false',
    question: 'Machine learning is a subset of artificial intelligence.',
    correctAnswer: 'true',
    explanation: 'Machine learning is indeed a subset of AI that focuses on algorithms that can learn and improve from data without being explicitly programmed.'
  },
  {
    id: '3',
    type: 'multiple-choice',
    question: 'Which of the following is NOT a common type of machine learning?',
    options: [
      'Supervised learning',
      'Unsupervised learning',
      'Reinforcement learning',
      'Emotional learning'
    ],
    correctAnswer: 3,
    explanation: 'Emotional learning is not a recognized category of machine learning. The three main types are supervised, unsupervised, and reinforcement learning.'
  },
  {
    id: '4',
    type: 'short-answer',
    question: 'Name one potential ethical concern related to AI development.',
    correctAnswer: 'Bias in algorithms, job displacement, privacy concerns, or autonomous weapons',
    explanation: 'Common ethical concerns include algorithmic bias, potential job displacement, privacy and surveillance issues, and the development of autonomous weapons systems.'
  },
  {
    id: '5',
    type: 'true-false',
    question: 'Deep learning networks require large amounts of data to train effectively.',
    correctAnswer: 'true',
    explanation: 'Deep learning models typically require substantial amounts of training data to learn complex patterns and achieve good performance.'
  }
];

export default function QuizGenerator() {
  const [file, setFile] = useState<File | null>(null);
  const [config, setConfig] = useState<QuizConfig>({
    questionType: 'mixed',
    numberOfQuestions: 10,
    difficulty: 'medium'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState<QuizQuestion[] | null>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'json'>('pdf');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setGeneratedQuiz(null);
    }
  };

  const generateQuiz = async () => {
    if (!file && !generatedQuiz) {
      // For demo purposes, allow generating without file
      setIsGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock quiz based on config
      let filteredQuiz = [...sampleQuiz];
      
      // Filter by question type if not mixed
      if (config.questionType !== 'mixed') {
        filteredQuiz = sampleQuiz.filter(q => q.type === config.questionType);
        // If not enough questions of that type, duplicate some
        while (filteredQuiz.length < config.numberOfQuestions) {
          filteredQuiz = [...filteredQuiz, ...filteredQuiz];
        }
      }
      
      // Limit to requested number
      filteredQuiz = filteredQuiz.slice(0, config.numberOfQuestions);
      
      setGeneratedQuiz(filteredQuiz);
      setIsGenerating(false);
      return;
    }

    if (!file) return;
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setGeneratedQuiz(sampleQuiz.slice(0, config.numberOfQuestions));
    setIsGenerating(false);
  };

  const resetGenerator = () => {
    setFile(null);
    setGeneratedQuiz(null);
    setShowAnswers(false);
  };

  const exportQuiz = (format: 'pdf' | 'docx' | 'json') => {
    // Mock export functionality
    const filename = `quiz_${Date.now()}.${format}`;
    console.log(`Exporting quiz as ${filename}`);
    
    // In a real implementation, this would generate and download the file
    const element = document.createElement('a');
    const content = format === 'json' 
      ? JSON.stringify(generatedQuiz, null, 2)
      : `Quiz exported in ${format.toUpperCase()} format`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const renderQuestion = (question: QuizQuestion, index: number) => {
    return (
      <div key={question.id} className="p-4 sm:p-6 bg-card/5 border border-border/10 rounded-xl">
        <div className="flex items-start gap-3 mb-4">
          <span className="flex-shrink-0 w-6 h-6 bg-brand-gradient text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
            {index + 1}
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-brand-10 text-brand rounded-full font-medium capitalize">
                {question.type.replace('-', ' ')}
              </span>
            </div>
            <h4 className="font-semibold text-sm sm:text-base mb-3">
              {question.question}
            </h4>
            
            {question.type === 'multiple-choice' && question.options && (
              <div className="space-y-2 mb-3">
                {question.options.map((option, optionIndex) => (
                  <div 
                    key={optionIndex}
                    className={`p-3 rounded-lg border ${
                      showAnswers && question.correctAnswer === optionIndex 
                        ? 'border-green-500/50 bg-green-500/10' 
                        : 'border-border/20 bg-card/5'
                    }`}
                  >
                    <span className="text-sm">{String.fromCharCode(65 + optionIndex)}. {option}</span>
                    {showAnswers && question.correctAnswer === optionIndex && (
                      <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {question.type === 'true-false' && (
              <div className="flex gap-3 mb-3">
                {['True', 'False'].map((option) => (
                  <div 
                    key={option}
                    className={`p-3 rounded-lg border ${
                      showAnswers && question.correctAnswer.toString().toLowerCase() === option.toLowerCase() 
                        ? 'border-green-500/50 bg-green-500/10' 
                        : 'border-border/20 bg-card/5'
                    }`}
                  >
                    <span className="text-sm">{option}</span>
                    {showAnswers && question.correctAnswer.toString().toLowerCase() === option.toLowerCase() && (
                      <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {question.type === 'short-answer' && showAnswers && (
              <div className="p-3 rounded-lg border border-green-500/50 bg-green-500/10 mb-3">
                <span className="text-sm font-medium">Sample Answer: </span>
                <span className="text-sm">{question.correctAnswer}</span>
              </div>
            )}
            
            {showAnswers && question.explanation && (
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <span className="text-xs font-medium text-blue-400 block mb-1">EXPLANATION</span>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card/5 border border-border/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        {!generatedQuiz ? (
          <div className="space-y-6">
            {/* File Upload */}
            <div className="text-center">
              <div className="border-2 border-dashed border-border/20 rounded-xl p-8 sm:p-12 hover:border-brand/30 transition-colors">
                <Upload className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  Upload PDF Document
                </h3>
                <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                  Upload a PDF file to generate quiz questions from its content
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm sm:text-base min-h-[44px]">
                  <FileText className="w-4 h-4" />
                  Choose PDF File
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {file && (
                  <div className="mt-4 p-3 bg-brand-10 border border-brand-30 rounded-lg">
                    <p className="text-sm text-brand font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)}KB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quiz Configuration */}
            <div className="p-6 bg-card/5 border border-border/10 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-brand" />
                <h3 className="text-lg font-semibold">Quiz Configuration</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Question Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">Question Type</label>
                  <select
                    value={config.questionType}
                    onChange={(e) => setConfig({...config, questionType: e.target.value as any})}
                    className="w-full p-3 bg-card/10 border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                  >
                    <option value="mixed">Mixed</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="short-answer">Short Answer</option>
                  </select>
                </div>

                {/* Number of Questions */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of Questions: {config.numberOfQuestions}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={config.numberOfQuestions}
                    onChange={(e) => setConfig({...config, numberOfQuestions: parseInt(e.target.value)})}
                    className="w-full h-2 bg-card/20 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5</span>
                    <span>20</span>
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <select
                    value={config.difficulty}
                    onChange={(e) => setConfig({...config, difficulty: e.target.value as any})}
                    className="w-full p-3 bg-card/10 border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generateQuiz}
                disabled={isGenerating}
                className="px-8 py-4 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm sm:text-base min-h-[44px] flex items-center gap-3 mx-auto"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating Quiz...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    {file ? 'Generate Quiz from PDF' : 'Try Sample Quiz'}
                  </>
                )}
              </button>
              {!file && (
                <p className="text-xs text-muted-foreground mt-2">
                  No PDF uploaded - will generate a sample AI/Technology quiz
                </p>
              )}
            </div>

            {isGenerating && (
              <div className="text-center py-8">
                <div className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                  <p>📄 Analyzing PDF content and structure</p>
                  <p>🧠 Identifying key concepts and topics</p>
                  <p>❓ Generating {config.numberOfQuestions} {config.questionType} questions</p>
                  <p>✅ Creating answer key and explanations</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Quiz Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-border/10">
              <div>
                <h3 className="text-xl font-bold mb-2">Generated Quiz</h3>
                <p className="text-sm text-muted-foreground">
                  {generatedQuiz.length} questions • {config.difficulty} difficulty
                  {file && ` • Based on "${file.name}"`}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="flex items-center gap-2 px-4 py-2 bg-card/10 border border-border/20 rounded-lg hover:bg-card/20 transition-colors text-sm min-h-[40px]"
                >
                  {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showAnswers ? 'Hide' : 'Show'} Answers
                </button>
                <button
                  onClick={resetGenerator}
                  className="flex items-center gap-2 px-4 py-2 border border-border/20 rounded-lg hover:bg-card/10 transition-colors text-sm min-h-[40px]"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Quiz
                </button>
              </div>
            </div>

            {/* Quiz Questions */}
            <div className="space-y-4">
              {generatedQuiz.map((question, index) => renderQuestion(question, index))}
            </div>

            {/* Export Options */}
            <div className="p-6 bg-brand-10 border border-brand-30 rounded-xl">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-brand" />
                Export Quiz
              </h4>
              <div className="flex flex-wrap gap-3">
                {(['pdf', 'docx', 'json'] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => exportQuiz(format)}
                    className="flex items-center gap-2 px-4 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity text-sm min-h-[40px]"
                  >
                    <Download className="w-4 h-4" />
                    Export as {format.toUpperCase()}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Export includes questions, answer key, and explanations
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}