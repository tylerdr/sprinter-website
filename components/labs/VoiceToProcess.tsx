"use client";

import { useState } from "react";
import { Mic, MicOff, Play, Square, ArrowRight, Clock, Users, AlertTriangle } from "lucide-react";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  stakeholder: string;
  duration: string;
  type: 'start' | 'process' | 'decision' | 'end';
}

interface ProcessMap {
  title: string;
  description: string;
  steps: ProcessStep[];
  optimizations: string[];
  automationOpportunities: string[];
}

export default function VoiceToProcess() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processMap, setProcessMap] = useState<ProcessMap | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setTranscription("");
    setProcessMap(null);
    
    // Simulate voice recording
    setTimeout(() => {
      setTranscription("When a customer places an order on our website, the order first goes to our sales team who reviews it for accuracy. Then it gets forwarded to inventory management to check stock levels. If items are available, the warehouse team picks and packs the order. After packing, it goes to shipping where we generate labels and schedule pickup. The customer gets a tracking number via email once the package is picked up by the carrier.");
      setIsRecording(false);
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const generateProcessMap = async () => {
    if (!transcription) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    // Mock process map generation
    const mockProcessMap: ProcessMap = {
      title: "E-commerce Order Fulfillment Process",
      description: "Customer order processing workflow from placement to delivery",
      steps: [
        {
          id: "1",
          title: "Order Placement",
          description: "Customer submits order through website",
          stakeholder: "Customer",
          duration: "1 min",
          type: "start"
        },
        {
          id: "2", 
          title: "Order Review",
          description: "Sales team reviews order for accuracy and completeness",
          stakeholder: "Sales Team",
          duration: "15 min",
          type: "process"
        },
        {
          id: "3",
          title: "Inventory Check",
          description: "Verify stock availability for ordered items",
          stakeholder: "Inventory Mgmt",
          duration: "5 min",
          type: "decision"
        },
        {
          id: "4",
          title: "Pick & Pack",
          description: "Retrieve items from warehouse and prepare for shipping",
          stakeholder: "Warehouse Team",
          duration: "30 min",
          type: "process"
        },
        {
          id: "5",
          title: "Shipping Setup",
          description: "Generate labels and schedule carrier pickup",
          stakeholder: "Shipping Dept",
          duration: "10 min",
          type: "process"
        },
        {
          id: "6",
          title: "Customer Notification",
          description: "Send tracking information to customer",
          stakeholder: "System",
          duration: "Instant",
          type: "end"
        }
      ],
      optimizations: [
        "Reduce order review time by implementing automated validation rules",
        "Integrate real-time inventory with website to prevent out-of-stock orders",
        "Batch similar orders for more efficient picking routes",
        "Use predictive analytics to pre-position popular items"
      ],
      automationOpportunities: [
        "Automate order validation using business rules engine",
        "Implement real-time inventory synchronization",
        "Add automated reorder triggers for low-stock items",
        "Use AI for optimal packaging and shipping route selection"
      ]
    };
    
    setProcessMap(mockProcessMap);
    setIsProcessing(false);
  };

  const reset = () => {
    setTranscription("");
    setProcessMap(null);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'start':
        return <Play className="w-4 h-4" />;
      case 'decision':
        return <AlertTriangle className="w-4 h-4" />;
      case 'end':
        return <Square className="w-4 h-4" />;
      default:
        return <ArrowRight className="w-4 h-4" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'decision':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'end':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Voice Input Section */}
      <div className="bg-card/20 border border-border/30 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Describe Your Process</h3>
        
        {!transcription ? (
          <div className="text-center">
            <div className="mb-6">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 flex items-center justify-center transition-all ${
                  isRecording 
                    ? 'bg-red-500 border-red-400 animate-pulse' 
                    : 'bg-brand-gradient border-brand hover:scale-105'
                }`}
              >
                {isRecording ? (
                  <MicOff className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                ) : (
                  <Mic className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                )}
              </button>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base mb-2">
              {isRecording ? "Listening... Describe your workflow" : "Click to start recording"}
            </p>
            {isRecording && (
              <div className="text-xs text-muted-foreground">
                Example: &quot;When a customer places an order, first we review it, then check inventory...&quot;
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-card/30 border border-border/20 rounded-lg">
              <h4 className="font-medium mb-2 text-sm sm:text-base">Transcription:</h4>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{transcription}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="px-4 py-2 text-sm border border-border/20 rounded-lg hover:bg-card/30 transition-colors min-h-[40px]"
              >
                Try Again
              </button>
              <button
                onClick={generateProcessMap}
                disabled={isProcessing}
                className="px-6 py-2 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm min-h-[40px] flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Process Map"
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Processing Animation */}
      {isProcessing && (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-3 text-muted-foreground">
            <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
            <span className="text-sm sm:text-base">AI is mapping your process...</span>
          </div>
          <div className="mt-4 space-y-2 text-xs sm:text-sm text-muted-foreground">
            <p>🎯 Identifying process steps and stakeholders</p>
            <p>📊 Analyzing workflow efficiency and bottlenecks</p>
            <p>🔧 Generating optimization recommendations</p>
          </div>
        </div>
      )}

      {/* Process Map Results */}
      {processMap && !isProcessing && (
        <div className="space-y-6">
          <div className="p-4 sm:p-6 bg-brand-10 border border-brand-30 rounded-xl">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">{processMap.title}</h3>
            <p className="text-muted-foreground text-sm sm:text-base">{processMap.description}</p>
          </div>

          {/* Process Steps */}
          <div className="bg-card/20 border border-border/30 rounded-xl p-6">
            <h4 className="font-semibold mb-4 text-sm sm:text-base">Process Flow</h4>
            <div className="space-y-4">
              {processMap.steps.map((step, index) => (
                <div key={step.id} className="flex gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center ${getStepColor(step.type)}`}>
                    {getStepIcon(step.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm sm:text-base">{step.title}</h5>
                        <p className="text-muted-foreground text-xs sm:text-sm mt-1 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1 text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{step.stakeholder}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                    </div>
                    {index < processMap.steps.length - 1 && (
                      <div className="ml-4 mt-2 mb-2">
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-4 sm:p-6 bg-card/20 border border-border/30 rounded-xl">
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Process Optimizations</h4>
              <ul className="space-y-3">
                {processMap.optimizations.map((opt, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-green-500 font-bold">•</span>
                    <span className="text-muted-foreground leading-relaxed">{opt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 sm:p-6 bg-card/20 border border-border/30 rounded-xl">
              <h4 className="font-semibold mb-4 text-sm sm:text-base">Automation Opportunities</h4>
              <ul className="space-y-3">
                {processMap.automationOpportunities.map((auto, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-brand font-bold">•</span>
                    <span className="text-muted-foreground leading-relaxed">{auto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}