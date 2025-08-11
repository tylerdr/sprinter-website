"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  RefreshCw,
  Database,
  FileText,
  Globe,
  Brain,
  MessageCircle,
  Zap,
  GitBranch,
  CheckCircle,
  Mail,
  Save,
  FileBarChart,
  Plus,
  Trash2,
  Move,
  Activity,
} from "lucide-react";

// Define block types and their properties
interface BlockType {
  id: string;
  name: string;
  category: 'input' | 'processing' | 'decision' | 'output';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  description: string;
  mockOutput?: string;
}

const BLOCK_TYPES: BlockType[] = [
  // Input blocks
  {
    id: 'api-call',
    name: 'API Call',
    category: 'input',
    icon: Globe,
    color: 'from-blue-500 to-cyan-600',
    description: 'Fetch data from external APIs',
    mockOutput: 'Retrieved 150 customer records from CRM API'
  },
  {
    id: 'database-query',
    name: 'Database Query',
    category: 'input',
    icon: Database,
    color: 'from-blue-500 to-cyan-600',
    description: 'Query internal databases',
    mockOutput: 'Found 1,247 transactions in the last 30 days'
  },
  {
    id: 'file-read',
    name: 'File Read',
    category: 'input',
    icon: FileText,
    color: 'from-blue-500 to-cyan-600',
    description: 'Read files and documents',
    mockOutput: 'Processed 15-page quarterly report'
  },
  
  // Processing blocks
  {
    id: 'extract-data',
    name: 'Extract Data',
    category: 'processing',
    icon: Brain,
    color: 'from-purple-500 to-pink-600',
    description: 'Extract structured data from text',
    mockOutput: 'Extracted 45 key metrics and 12 action items'
  },
  {
    id: 'summarize',
    name: 'Summarize',
    category: 'processing',
    icon: MessageCircle,
    color: 'from-purple-500 to-pink-600',
    description: 'Generate concise summaries',
    mockOutput: 'Created 200-word executive summary'
  },
  {
    id: 'analyze-sentiment',
    name: 'Analyze Sentiment',
    category: 'processing',
    icon: Activity,
    color: 'from-purple-500 to-pink-600',
    description: 'Analyze emotional tone and sentiment',
    mockOutput: '73% positive sentiment, trending upward'
  },

  // Decision blocks
  {
    id: 'if-then',
    name: 'If/Then Logic',
    category: 'decision',
    icon: GitBranch,
    color: 'from-green-500 to-teal-600',
    description: 'Conditional branching logic',
    mockOutput: 'Condition met: Revenue > $10K, proceeding to Path A'
  },
  {
    id: 'threshold-check',
    name: 'Threshold Check',
    category: 'decision',
    icon: Zap,
    color: 'from-green-500 to-teal-600',
    description: 'Check if values meet criteria',
    mockOutput: 'Alert triggered: Customer satisfaction below 80%'
  },
  {
    id: 'pattern-match',
    name: 'Pattern Match',
    category: 'decision',
    icon: CheckCircle,
    color: 'from-green-500 to-teal-600',
    description: 'Identify patterns in data',
    mockOutput: 'Detected anomaly: 40% spike in error rates'
  },

  // Output blocks
  {
    id: 'send-email',
    name: 'Send Email',
    category: 'output',
    icon: Mail,
    color: 'from-orange-500 to-red-600',
    description: 'Send notifications and alerts',
    mockOutput: 'Email sent to stakeholder@company.com'
  },
  {
    id: 'update-database',
    name: 'Update Database',
    category: 'output',
    icon: Save,
    color: 'from-orange-500 to-red-600',
    description: 'Save results to database',
    mockOutput: 'Updated 150 customer records with new insights'
  },
  {
    id: 'create-report',
    name: 'Create Report',
    category: 'output',
    icon: FileBarChart,
    color: 'from-orange-500 to-red-600',
    description: 'Generate detailed reports',
    mockOutput: 'Generated 5-page performance report with visualizations'
  }
];

interface WorkflowBlock {
  id: string;
  type: BlockType;
  position: { x: number; y: number };
  connections: string[];
}

const categoryColors = {
  input: 'border-info/30 bg-info/10',
  processing: 'border-primary/30 bg-primary/10',
  decision: 'border-success/30 bg-success/10',
  output: 'border-warning/30 bg-warning/10'
};

const categoryNames = {
  input: 'Input Blocks',
  processing: 'Processing Blocks', 
  decision: 'Decision Blocks',
  output: 'Output Blocks'
};

export default function AgentPlayground() {
  const [workflowBlocks, setWorkflowBlocks] = useState<WorkflowBlock[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationResults, setSimulationResults] = useState<string[]>([]);
  const [draggedBlock, setDraggedBlock] = useState<BlockType | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const playgroundRef = useRef<HTMLDivElement>(null);

  const addBlock = useCallback((blockType: BlockType, position?: { x: number; y: number }) => {
    const newBlock: WorkflowBlock = {
      id: `${blockType.id}-${Date.now()}`,
      type: blockType,
      position: position || { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      connections: []
    };
    setWorkflowBlocks(prev => [...prev, newBlock]);
  }, []);

  const removeBlock = useCallback((blockId: string) => {
    setWorkflowBlocks(prev => prev.filter(block => block.id !== blockId));
  }, []);

  // Note: moveBlock functionality could be implemented for dragging blocks within canvas
  // const moveBlock = useCallback((blockId: string, newPosition: { x: number; y: number }) => {
  //   setWorkflowBlocks(prev => 
  //     prev.map(block => 
  //       block.id === blockId ? { ...block, position: newPosition } : block
  //     )
  //   );
  // }, []);

  const handleDragStart = (blockType: BlockType) => {
    setDraggedBlock(blockType);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedBlock || !playgroundRef.current) return;

    const rect = playgroundRef.current.getBoundingClientRect();
    const position = {
      x: e.clientX - rect.left - 50,
      y: e.clientY - rect.top - 50
    };

    addBlock(draggedBlock, position);
    setDraggedBlock(null);
  };

  const runSimulation = async () => {
    if (workflowBlocks.length === 0) return;

    setIsRunning(true);
    setSimulationResults([]);

    // Simulate processing each block in sequence
    for (let i = 0; i < workflowBlocks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const block = workflowBlocks[i];
      const result = `${block.type.name}: ${block.type.mockOutput}`;
      
      setSimulationResults(prev => [...prev, result]);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setSimulationResults(prev => [...prev, "🎉 Workflow completed successfully! All blocks executed in sequence."]);
    setIsRunning(false);
  };

  const resetPlayground = () => {
    setWorkflowBlocks([]);
    setSimulationResults([]);
    setSelectedBlock(null);
    setIsRunning(false);
  };

  const createExampleWorkflow = () => {
    const exampleBlocks: WorkflowBlock[] = [
      {
        id: 'example-1',
        type: BLOCK_TYPES.find(b => b.id === 'database-query')!,
        position: { x: 50, y: 100 },
        connections: ['example-2']
      },
      {
        id: 'example-2', 
        type: BLOCK_TYPES.find(b => b.id === 'analyze-sentiment')!,
        position: { x: 250, y: 100 },
        connections: ['example-3']
      },
      {
        id: 'example-3',
        type: BLOCK_TYPES.find(b => b.id === 'threshold-check')!,
        position: { x: 450, y: 100 },
        connections: ['example-4']
      },
      {
        id: 'example-4',
        type: BLOCK_TYPES.find(b => b.id === 'send-email')!,
        position: { x: 650, y: 100 },
        connections: []
      }
    ];
    setWorkflowBlocks(exampleBlocks);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 sm:mb-8"
      >
        <div className="p-4 sm:p-6 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Block Library */}
            <div className="lg:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Block Library</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag blocks to the workspace to build your agent workflow
              </p>
              
              {(Object.keys(categoryNames) as Array<keyof typeof categoryNames>).map(category => (
                <div key={category} className="mb-4">
                  <h4 className="text-sm font-medium mb-2 capitalize text-muted-foreground">
                    {categoryNames[category]}
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {BLOCK_TYPES.filter(block => block.category === category).map(blockType => (
                      <div
                        key={blockType.id}
                        draggable
                        onDragStart={() => handleDragStart(blockType)}
                        className={`p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all hover:scale-105 ${categoryColors[category]}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${blockType.color}`}>
                            <blockType.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm">{blockType.name}</h5>
                            <p className="text-xs text-muted-foreground truncate">
                              {blockType.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Workflow Canvas */}
            <div className="lg:w-2/3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Workflow Canvas</h3>
                <div className="flex gap-2">
                  <button
                    onClick={createExampleWorkflow}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-3 py-2 text-xs bg-card/30 text-foreground font-medium rounded-lg hover:bg-card/40 transition-colors touch-manipulation"
                  >
                    <Plus className="w-3 h-3" />
                    Example
                  </button>
                  <button
                    onClick={resetPlayground}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-3 py-2 text-xs bg-card/30 text-foreground font-medium rounded-lg hover:bg-card/40 transition-colors touch-manipulation"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Clear
                  </button>
                </div>
              </div>

              <div
                ref={playgroundRef}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="relative h-96 rounded-xl border-2 border-dashed border-border/20 bg-card/20 backdrop-blur-sm p-4 overflow-hidden"
              >
                {workflowBlocks.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Move className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Drag blocks here to build your workflow</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      {workflowBlocks.map((block, index) => {
                        if (index === workflowBlocks.length - 1) return null;
                        const nextBlock = workflowBlocks[index + 1];
                        if (!nextBlock) return null;

                        return (
                          <line
                            key={`${block.id}-${nextBlock.id}`}
                            x1={block.position.x + 50}
                            y1={block.position.y + 30}
                            x2={nextBlock.position.x + 50} 
                            y2={nextBlock.position.y + 30}
                            stroke="rgb(99 102 241 / 0.3)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                        );
                      })}
                    </svg>

                    {/* Workflow blocks */}
                    {workflowBlocks.map((block, index) => (
                      <motion.div
                        key={block.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ 
                          left: block.position.x,
                          top: block.position.y
                        }}
                        className={`absolute w-24 h-16 rounded-lg border-2 ${categoryColors[block.type.category]} cursor-move transition-all hover:scale-105 ${selectedBlock === block.id ? 'ring-2 ring-info' : ''}`}
                        onClick={() => setSelectedBlock(selectedBlock === block.id ? null : block.id)}
                      >
                        <div className="p-2 h-full flex flex-col items-center justify-center">
                          <div className={`p-1 rounded bg-gradient-to-br ${block.type.color} mb-1`}>
                            <block.type.icon className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-medium text-center leading-tight">
                            {block.type.name}
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBlock(block.id);
                          }}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>

                        {/* Block number indicator */}
                        <div className="absolute -top-2 -left-2 w-5 h-5 bg-info text-primary-foreground text-xs rounded-full flex items-center justify-center font-medium">
                          {index + 1}
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={runSimulation}
                  disabled={isRunning || workflowBlocks.length === 0}
                  className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 touch-manipulation min-h-[44px] text-sm sm:text-base"
                >
                  {isRunning ? (
                    <>
                      <Activity className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                      Running Simulation...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      Run Simulation ({workflowBlocks.length} blocks)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Simulation Results */}
      <AnimatePresence>
        {simulationResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 sm:p-6 rounded-xl border border-success-30 bg-success-10"
          >
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-success flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Simulation Results
            </h3>
            <div className="space-y-3">
              {simulationResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-card/20 border border-border/30"
                >
                  <div className="w-6 h-6 bg-success text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-foreground/90 flex-1">{result}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Block Details */}
      <AnimatePresence>
        {selectedBlock && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 sm:p-6 rounded-xl bg-card/30 border border-border/20"
          >
            {(() => {
              const block = workflowBlocks.find(b => b.id === selectedBlock);
              if (!block) return null;
              
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${block.type.color}`}>
                      <block.type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{block.type.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {block.type.category} Block
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {block.type.description}
                  </p>
                  <div className="p-3 rounded-lg bg-card/20 border border-border/30">
                    <h4 className="text-sm font-medium mb-2">Sample Output:</h4>
                    <p className="text-xs font-mono text-muted-foreground">
                      {block.type.mockOutput}
                    </p>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}