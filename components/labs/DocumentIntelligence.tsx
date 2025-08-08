"use client";

import { useState } from "react";
import { Upload, FileText, Search, Brain, MessageCircle, Eye, Download } from "lucide-react";

interface DocumentAnalysis {
  fileName: string;
  fileSize: string;
  summary: string;
  keyPoints: string[];
  entities: Array<{
    type: string;
    value: string;
    confidence: number;
  }>;
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export default function DocumentIntelligence() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'entities' | 'qa'>('summary');
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setAnalysis(null);
    }
  };

  const analyzeDocument = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Mock analysis results
    const mockAnalysis: DocumentAnalysis = {
      fileName: file.name,
      fileSize: `${(file.size / 1024).toFixed(1)}KB`,
      summary: "This document appears to be a quarterly business report detailing company performance, financial metrics, and strategic initiatives. The report covers Q3 2024 results with focus on revenue growth, market expansion, and operational efficiency improvements. Key themes include digital transformation initiatives, customer acquisition strategies, and sustainability goals.",
      keyPoints: [
        "Revenue increased by 23% year-over-year to $4.2M",
        "Customer acquisition costs reduced by 15% through AI-driven marketing",
        "Launched 3 new product features based on user feedback",
        "Expanded operations to 2 new geographic markets", 
        "Achieved carbon neutral status for office operations",
        "Employee satisfaction scores improved to 4.6/5",
        "R&D investment increased to 18% of total revenue"
      ],
      entities: [
        { type: "Organization", value: "TechCorp Industries", confidence: 95 },
        { type: "Person", value: "Sarah Chen (CEO)", confidence: 92 },
        { type: "Date", value: "Q3 2024", confidence: 98 },
        { type: "Money", value: "$4.2M", confidence: 96 },
        { type: "Location", value: "Austin, TX", confidence: 89 },
        { type: "Percentage", value: "23%", confidence: 94 }
      ],
      questions: [
        {
          question: "What was the revenue growth rate?",
          answer: "Revenue increased by 23% year-over-year, reaching $4.2M in Q3 2024."
        },
        {
          question: "How many new markets did they expand to?",
          answer: "The company expanded operations to 2 new geographic markets during the quarter."
        },
        {
          question: "What percentage of revenue is invested in R&D?",
          answer: "R&D investment was increased to 18% of total revenue, showing the company's commitment to innovation."
        }
      ]
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const askQuestion = async () => {
    if (!question.trim() || !analysis) return;

    setIsAsking(true);
    
    // Simulate AI question answering
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newQA = {
      question: question,
      answer: `Based on the document analysis, here's what I found: The document contains relevant information about ${question.toLowerCase()}. This appears to be covered in section 2-3 of the report, with specific metrics and strategic implications discussed in detail.`
    };
    
    setAnalysis({
      ...analysis,
      questions: [...analysis.questions, newQA]
    });
    setQuestion("");
    setIsAsking(false);
  };

  const resetDocument = () => {
    setFile(null);
    setAnalysis(null);
    setActiveTab('summary');
    setQuestion("");
  };

  const getEntityColor = (type: string) => {
    const colors = {
      'Organization': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Person': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Date': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Money': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Location': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Percentage': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card/5 border border-border/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        {!file ? (
          <div className="text-center">
            <div className="border-2 border-dashed border-border/20 rounded-xl p-8 sm:p-12 hover:border-brand/30 transition-colors">
              <Upload className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Upload Your Document
              </h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Support for PDF, Word, and text files up to 25MB
              </p>
              <label className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer text-sm sm:text-base min-h-[44px]">
                <FileText className="w-4 h-4" />
                Choose Document
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-brand" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{file.name}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)}KB • {file.type || 'Unknown format'}
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={resetDocument}
                  className="px-4 py-2 text-sm border border-border/20 rounded-lg hover:bg-card/10 transition-colors min-h-[40px]"
                >
                  Change File
                </button>
                <button
                  onClick={analyzeDocument}
                  disabled={isAnalyzing}
                  className="px-6 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm min-h-[40px] flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      Analyze Document
                    </>
                  )}
                </button>
              </div>
            </div>

            {isAnalyzing && (
              <div className="text-center py-12">
                <div className="inline-flex items-center gap-3 text-muted-foreground">
                  <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                  <span className="text-sm sm:text-base">AI is analyzing your document...</span>
                </div>
                <div className="mt-4 space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <p>📄 Extracting text and structure</p>
                  <p>🧠 Identifying key concepts and entities</p>
                  <p>📝 Generating insights and summaries</p>
                </div>
              </div>
            )}

            {analysis && !isAnalyzing && (
              <div className="space-y-6">
                {/* Tabs */}
                <div className="flex gap-1 p-1 bg-card/10 rounded-lg">
                  <button
                    onClick={() => setActiveTab('summary')}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'summary' 
                        ? 'bg-brand-gradient text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab('entities')}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'entities' 
                        ? 'bg-brand-gradient text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Search className="w-4 h-4 inline mr-2" />
                    Entities
                  </button>
                  <button
                    onClick={() => setActiveTab('qa')}
                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === 'qa' 
                        ? 'bg-brand-gradient text-primary-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    Q&A
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'summary' && (
                  <div className="space-y-6">
                    <div className="p-4 sm:p-6 bg-brand-10 border border-brand-30 rounded-xl">
                      <h4 className="font-semibold mb-3 text-sm sm:text-base">Document Summary</h4>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                        {analysis.summary}
                      </p>
                    </div>

                    <div className="p-4 sm:p-6 bg-card/5 border border-border/10 rounded-xl">
                      <h4 className="font-semibold mb-4 text-sm sm:text-base">Key Points</h4>
                      <ul className="space-y-3">
                        {analysis.keyPoints.map((point, index) => (
                          <li key={index} className="flex gap-2 text-sm">
                            <span className="text-brand font-bold">•</span>
                            <span className="text-muted-foreground leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'entities' && (
                  <div className="space-y-6">
                    <div className="p-4 sm:p-6 bg-card/5 border border-border/10 rounded-xl">
                      <h4 className="font-semibold mb-4 text-sm sm:text-base">Extracted Entities</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {analysis.entities.map((entity, index) => (
                          <div key={index} className={`p-3 border rounded-lg ${getEntityColor(entity.type)}`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className="text-xs font-medium uppercase">{entity.type}</span>
                              <span className="text-xs opacity-70">{entity.confidence}%</span>
                            </div>
                            <div className="font-medium text-sm">{entity.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'qa' && (
                  <div className="space-y-6">
                    <div className="p-4 sm:p-6 bg-card/5 border border-border/10 rounded-xl">
                      <h4 className="font-semibold mb-4 text-sm sm:text-base">Ask Questions</h4>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="Ask a question about the document..."
                          className="flex-1 p-3 bg-card/10 border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
                          onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
                        />
                        <button
                          onClick={askQuestion}
                          disabled={!question.trim() || isAsking}
                          className="px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm flex items-center gap-2"
                        >
                          {isAsking ? (
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          ) : (
                            <Search className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {analysis.questions.map((qa, index) => (
                        <div key={index} className="p-4 sm:p-6 bg-card/5 border border-border/10 rounded-xl">
                          <div className="mb-3">
                            <div className="font-medium text-sm sm:text-base mb-2">Q: {qa.question}</div>
                            <div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                              A: {qa.answer}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}