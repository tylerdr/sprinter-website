"use client";

import { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  NodeChange,
  EdgeChange,
  Connection,
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LabLayout } from "@/components/labs/LabLayout";
import { 
  GitBranch, 
  Users, 
  MessageSquare, 
  Zap, 
  Download, 
  Share2,
  Plus,
  Trash2,
  Edit,
  Save,
  RefreshCw,
  Sparkles,
  Target,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Layers,
  Image as ImageIcon,
  Type,
  Box,
  Smartphone,
  Monitor
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateUserJourney, analyzeJourney, exportJourney } from "./actions";

// Node types
const NODE_TYPES = {
  start: { label: "Start", icon: Target, color: "bg-green-500" },
  action: { label: "Action", icon: Zap, color: "bg-blue-500" },
  decision: { label: "Decision", icon: GitBranch, color: "bg-yellow-500" },
  screen: { label: "Screen", icon: Monitor, color: "bg-purple-500" },
  touchpoint: { label: "Touchpoint", icon: Users, color: "bg-pink-500" },
  end: { label: "End", icon: CheckCircle2, color: "bg-red-500" },
};

// Journey templates
const JOURNEY_TEMPLATES = [
  {
    id: "e-commerce",
    name: "E-commerce Purchase",
    description: "Customer journey from discovery to purchase",
    nodes: [
      { id: "1", type: "start", position: { x: 100, y: 100 }, data: { label: "Homepage Visit" } },
      { id: "2", type: "screen", position: { x: 300, y: 100 }, data: { label: "Product Browse" } },
      { id: "3", type: "decision", position: { x: 500, y: 100 }, data: { label: "Add to Cart?" } },
      { id: "4", type: "action", position: { x: 700, y: 50 }, data: { label: "Checkout" } },
      { id: "5", type: "screen", position: { x: 700, y: 150 }, data: { label: "Continue Shopping" } },
      { id: "6", type: "end", position: { x: 900, y: 50 }, data: { label: "Order Complete" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e3-4", source: "3", target: "4", label: "Yes" },
      { id: "e3-5", source: "3", target: "5", label: "No" },
      { id: "e4-6", source: "4", target: "6" },
      { id: "e5-2", source: "5", target: "2" },
    ],
  },
  {
    id: "onboarding",
    name: "User Onboarding",
    description: "New user signup and activation flow",
    nodes: [
      { id: "1", type: "start", position: { x: 100, y: 100 }, data: { label: "Landing Page" } },
      { id: "2", type: "action", position: { x: 300, y: 100 }, data: { label: "Sign Up" } },
      { id: "3", type: "touchpoint", position: { x: 500, y: 100 }, data: { label: "Email Verification" } },
      { id: "4", type: "screen", position: { x: 700, y: 100 }, data: { label: "Profile Setup" } },
      { id: "5", type: "screen", position: { x: 900, y: 100 }, data: { label: "Tutorial" } },
      { id: "6", type: "end", position: { x: 1100, y: 100 }, data: { label: "Dashboard" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e3-4", source: "3", target: "4" },
      { id: "e4-5", source: "4", target: "5" },
      { id: "e5-6", source: "5", target: "6" },
    ],
  },
];

// Custom Node Component
function CustomNode({ data, type }: { data: { label: string; description?: string }; type: string }) {
  const nodeType = NODE_TYPES[type as keyof typeof NODE_TYPES];
  const Icon = nodeType?.icon || Box;

  return (
    <div className={cn(
      "px-4 py-2 rounded-lg border-2 bg-background",
      "min-w-[120px] text-center",
      "hover:shadow-lg transition-shadow"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center",
        nodeType?.color || "bg-gray-500"
      )}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="text-xs font-medium">{data.label}</div>
      {data.description && (
        <div className="text-xs text-muted-foreground mt-1">{data.description}</div>
      )}
    </div>
  );
}

const nodeTypes = {
  start: CustomNode,
  action: CustomNode,
  decision: CustomNode,
  screen: CustomNode,
  touchpoint: CustomNode,
  end: CustomNode,
};

// ConstrUX Wireframe Component
interface WireframeElement {
  id: string;
  type: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  content: string;
}

function ConstrUXPanel({ selectedNode }: { selectedNode: Node | null }) {
  const [wireframeElements, setWireframeElements] = useState<WireframeElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const addWireframeElement = (type: string) => {
    const newElement = {
      id: `element-${Date.now()}`,
      type,
      position: { x: 50, y: 50 },
      size: { width: 200, height: 100 },
      content: type === "text" ? "Lorem ipsum" : "",
    };
    setWireframeElements([...wireframeElements, newElement]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">ConstrUX Wireframe</CardTitle>
        <CardDescription>Design the screen for: {selectedNode?.data.label || "Select a node"}</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedNode ? (
          <div className="space-y-4">
            {/* Element Toolbar */}
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => addWireframeElement("box")}>
                <Box className="w-4 h-4 mr-1" />
                Box
              </Button>
              <Button size="sm" variant="outline" onClick={() => addWireframeElement("text")}>
                <Type className="w-4 h-4 mr-1" />
                Text
              </Button>
              <Button size="sm" variant="outline" onClick={() => addWireframeElement("image")}>
                <ImageIcon className="w-4 h-4 mr-1" />
                Image
              </Button>
              <Button size="sm" variant="outline" onClick={() => addWireframeElement("button")}>
                <Zap className="w-4 h-4 mr-1" />
                Button
              </Button>
            </div>

            {/* Wireframe Canvas */}
            <div className="relative bg-muted/20 border-2 border-dashed rounded-lg h-64 overflow-hidden">
              {wireframeElements.map(element => (
                <div
                  key={element.id}
                  className={cn(
                    "absolute border-2 rounded cursor-move",
                    selectedElement === element.id ? "border-blue-500" : "border-gray-300",
                    element.type === "button" && "bg-primary text-primary-foreground",
                    element.type === "image" && "bg-muted",
                    element.type === "text" && "p-2"
                  )}
                  style={{
                    left: element.position.x,
                    top: element.position.y,
                    width: element.size.width,
                    height: element.type === "text" ? "auto" : element.size.height,
                  }}
                  onClick={() => setSelectedElement(element.id)}
                >
                  {element.type === "text" && element.content}
                  {element.type === "button" && "Button"}
                  {element.type === "image" && (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Properties Panel */}
            {selectedElement && (
              <div className="space-y-2">
                <Label className="text-xs">Element Properties</Label>
                <Input
                  placeholder="Width"
                  type="number"
                  className="h-8"
                  value={wireframeElements.find(e => e.id === selectedElement)?.size.width}
                  onChange={(e) => {
                    setWireframeElements(elements =>
                      elements.map(el =>
                        el.id === selectedElement
                          ? { ...el, size: { ...el.size, width: parseInt(e.target.value) } }
                          : el
                      )
                    );
                  }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Select a screen node to design its wireframe
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function StoryboardingFlow() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [journeyName, setJourneyName] = useState("My User Journey");
  const [showExport, setShowExport] = useState(false);
  const [email, setEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const reactFlowInstance = useReactFlow();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({
      ...params,
      markerEnd: { type: MarkerType.ArrowClosed },
    }, eds)),
    []
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const loadTemplate = (templateId: string) => {
    const template = JOURNEY_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setNodes(template.nodes);
      setEdges(template.edges.map(edge => ({
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed },
      })));
      setSelectedTemplate(templateId);
      setJourneyName(template.name);
    }
  };

  const addNode = (type: keyof typeof NODE_TYPES) => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type,
      position: { x: Math.random() * 500 + 100, y: Math.random() * 300 + 100 },
      data: { label: `New ${NODE_TYPES[type].label}` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const deleteNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
      setSelectedNode(null);
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt) return;
    
    setIsGenerating(true);
    try {
      const result = await generateUserJourney(aiPrompt);
      setNodes(result.nodes);
      setEdges(result.edges.map(edge => ({
        ...edge,
        markerEnd: { type: MarkerType.ArrowClosed },
      })));
      setJourneyName(result.name || "AI Generated Journey");
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          <GitBranch className="w-3 h-3 mr-1" />
          Visual Journey Mapping
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Storyboarding & <span className="gradient-text">ConstrUX</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Map user journeys visually, design wireframes for each screen, 
          and simulate the complete experience flow.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Control Panel */}
        <div className="space-y-4">
          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {JOURNEY_TEMPLATES.map(template => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => loadTemplate(template.id)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Generation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">AI Journey Generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder="Describe the user journey (e.g., 'User signs up for newsletter and receives welcome email')"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                rows={3}
              />
              <Button
                className="w-full"
                onClick={generateWithAI}
                disabled={!aiPrompt || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Journey
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Add Nodes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Add Elements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(NODE_TYPES).map(([type, config]) => (
                  <Button
                    key={type}
                    variant="outline"
                    size="sm"
                    onClick={() => addNode(type as keyof typeof NODE_TYPES)}
                  >
                    <config.icon className="w-4 h-4 mr-1" />
                    {config.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Node Properties */}
          {selectedNode && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Node Properties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={selectedNode.data.label}
                    onChange={(e) => {
                      setNodes((nds) =>
                        nds.map((n) =>
                          n.id === selectedNode.id
                            ? { ...n, data: { ...n.data, label: e.target.value } }
                            : n
                        )
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="text-xs">Description</Label>
                  <Textarea
                    value={selectedNode.data.description || ""}
                    onChange={(e) => {
                      setNodes((nds) =>
                        nds.map((n) =>
                          n.id === selectedNode.id
                            ? { ...n, data: { ...n.data, description: e.target.value } }
                            : n
                        )
                      );
                    }}
                    rows={2}
                  />
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full"
                  onClick={deleteNode}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Node
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Flow Canvas */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{journeyName}</CardTitle>
                  <CardDescription>Drag to pan, scroll to zoom, click to select</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowExport(true)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNodes([]);
                      setEdges([]);
                      setSelectedNode(null);
                    }}
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] border rounded-lg">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onNodeClick={onNodeClick}
                  nodeTypes={nodeTypes}
                  fitView
                >
                  <Background />
                  <Controls />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ConstrUX Panel */}
        <div className="space-y-4">
          <ConstrUXPanel selectedNode={selectedNode} />
          
          {/* Journey Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Journey Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Steps</span>
                  <span className="font-medium">{nodes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Decisions</span>
                  <span className="font-medium">
                    {nodes.filter(n => n.type === "decision").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Touchpoints</span>
                  <span className="font-medium">
                    {nodes.filter(n => n.type === "touchpoint").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Complexity</span>
                  <Badge variant={edges.length > 10 ? "destructive" : edges.length > 5 ? "secondary" : "default"}>
                    {edges.length > 10 ? "High" : edges.length > 5 ? "Medium" : "Low"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {showExport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowExport(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4">Export Journey</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the complete journey map with wireframes and analytics.
              </p>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowExport(false)}>
                  Cancel
                </Button>
                <Button onClick={async () => {
                  await exportJourney({ nodes, edges, name: journeyName }, email);
                  setShowExport(false);
                }}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StoryboardingPage() {
  return (
    <LabLayout
      title="Storyboarding"
      description="Visual journey mapping and wireframing"
      category="creative"
    >
      <ReactFlowProvider>
        <StoryboardingFlow />
      </ReactFlowProvider>
    </LabLayout>
  );
}