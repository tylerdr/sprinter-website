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
} from "reactflow";
import "reactflow/dist/style.css";
import { LabWrapper } from "@/components/labs/lab-wrapper";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  GitBranch, 
  Users, 
  Zap, 
  Target,
  CheckCircle2,
  Monitor,
  RefreshCw,
  Download
} from "lucide-react";

// Node types for user journey
const NODE_TYPES = {
  start: { label: "Start", icon: Target, color: "bg-green-500" },
  action: { label: "Action", icon: Zap, color: "bg-blue-500" },
  decision: { label: "Decision", icon: GitBranch, color: "bg-yellow-500" },
  screen: { label: "Screen", icon: Monitor, color: "bg-purple-500" },
  touchpoint: { label: "Touchpoint", icon: Users, color: "bg-pink-500" },
  end: { label: "End", icon: CheckCircle2, color: "bg-red-500" },
};

// Journey templates
const JOURNEY_TEMPLATES = {
  ecommerce: {
    name: "E-commerce Purchase",
    nodes: [
      { id: "1", type: "start", position: { x: 100, y: 200 }, data: { label: "Homepage Visit" } },
      { id: "2", type: "screen", position: { x: 300, y: 200 }, data: { label: "Product Browse" } },
      { id: "3", type: "decision", position: { x: 500, y: 200 }, data: { label: "Add to Cart?" } },
      { id: "4", type: "action", position: { x: 700, y: 150 }, data: { label: "Checkout" } },
      { id: "5", type: "screen", position: { x: 700, y: 250 }, data: { label: "Continue Shopping" } },
      { id: "6", type: "end", position: { x: 900, y: 150 }, data: { label: "Order Complete" } },
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
  onboarding: {
    name: "User Onboarding",
    nodes: [
      { id: "1", type: "start", position: { x: 100, y: 200 }, data: { label: "Landing Page" } },
      { id: "2", type: "action", position: { x: 300, y: 200 }, data: { label: "Sign Up" } },
      { id: "3", type: "touchpoint", position: { x: 500, y: 200 }, data: { label: "Email Verification" } },
      { id: "4", type: "screen", position: { x: 700, y: 200 }, data: { label: "Profile Setup" } },
      { id: "5", type: "screen", position: { x: 900, y: 200 }, data: { label: "Tutorial" } },
      { id: "6", type: "end", position: { x: 1100, y: 200 }, data: { label: "Dashboard" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3" },
      { id: "e3-4", source: "3", target: "4" },
      { id: "e4-5", source: "4", target: "5" },
      { id: "e5-6", source: "5", target: "6" },
    ],
  },
  support: {
    name: "Customer Support",
    nodes: [
      { id: "1", type: "start", position: { x: 100, y: 200 }, data: { label: "Issue Reported" } },
      { id: "2", type: "decision", position: { x: 300, y: 200 }, data: { label: "Self-Service?" } },
      { id: "3", type: "screen", position: { x: 500, y: 150 }, data: { label: "Knowledge Base" } },
      { id: "4", type: "touchpoint", position: { x: 500, y: 250 }, data: { label: "Contact Support" } },
      { id: "5", type: "action", position: { x: 700, y: 250 }, data: { label: "Ticket Created" } },
      { id: "6", type: "end", position: { x: 900, y: 200 }, data: { label: "Issue Resolved" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2" },
      { id: "e2-3", source: "2", target: "3", label: "Yes" },
      { id: "e2-4", source: "2", target: "4", label: "No" },
      { id: "e3-6", source: "3", target: "6" },
      { id: "e4-5", source: "4", target: "5" },
      { id: "e5-6", source: "5", target: "6" },
    ],
  },
};

function UserJourneyMapper() {
  const [nodes, setNodes] = useState<Node[]>(JOURNEY_TEMPLATES.ecommerce.nodes);
  const [edges, setEdges] = useState<Edge[]>(JOURNEY_TEMPLATES.ecommerce.edges);
  const [selectedTemplate, setSelectedTemplate] = useState("ecommerce");

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({
        ...params,
        markerEnd: { type: MarkerType.ArrowClosed },
      }, eds));
    },
    []
  );

  const loadTemplate = (templateKey: string) => {
    const template = JOURNEY_TEMPLATES[templateKey as keyof typeof JOURNEY_TEMPLATES];
    if (template) {
      setNodes(template.nodes);
      setEdges(template.edges);
      setSelectedTemplate(templateKey);
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

  const clearJourney = () => {
    setNodes([]);
    setEdges([]);
  };

  const exportJourney = () => {
    const journeyData = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(journeyData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `user-journey-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="h-full">
      {/* Controls Bar */}
      <div className="absolute top-2 left-2 right-2 z-10 flex flex-wrap gap-2 p-2 bg-background/95 backdrop-blur rounded-lg border">
        <div className="flex gap-1">
          {Object.entries(NODE_TYPES).map(([key, config]) => {
            const Icon = config.icon;
            return (
              <Button
                key={key}
                size="sm"
                variant="outline"
                onClick={() => addNode(key as keyof typeof NODE_TYPES)}
                className="gap-1"
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{config.label}</span>
              </Button>
            );
          })}
        </div>
        <div className="flex gap-1 ml-auto">
          <Button size="sm" variant="outline" onClick={clearJourney}>
            <RefreshCw className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" onClick={exportJourney}>
            <Download className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Template Selector */}
      <div className="absolute bottom-2 left-2 z-10">
        <Card className="p-2">
          <div className="text-xs font-medium mb-1">Templates:</div>
          <div className="flex gap-1">
            {Object.entries(JOURNEY_TEMPLATES).map(([key, template]) => (
              <Button
                key={key}
                size="sm"
                variant={selectedTemplate === key ? "default" : "ghost"}
                onClick={() => loadTemplate(key)}
                className="text-xs"
              >
                {template.name}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Flow Diagram */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-muted/20"
      >
        <Background gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export function UserJourneyClient() {
  const howItWorks = (
    <>
      <h3>How User Journey Mapping Works</h3>
      <p>
        Create visual representations of your customer&apos;s experience across all touchpoints.
        Our AI-powered journey mapper helps you identify pain points, optimize conversions,
        and design better user experiences.
      </p>
      <h4>Key Features</h4>
      <ul>
        <li><strong>Visual Flow Builder:</strong> Drag and drop nodes to map journeys</li>
        <li><strong>Journey Templates:</strong> Start with proven patterns for common scenarios</li>
        <li><strong>Decision Points:</strong> Map branching logic and user choices</li>
        <li><strong>Export & Share:</strong> Download journey maps for presentations</li>
      </ul>
    </>
  );

  const examples = (
    <div className="grid gap-4">
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">E-commerce Checkout</h4>
        <p className="text-sm text-muted-foreground">
          Map the path from product discovery to purchase completion
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">SaaS Onboarding</h4>
        <p className="text-sm text-muted-foreground">
          Design the perfect first-time user experience
        </p>
      </div>
      <div className="p-4 rounded-lg border">
        <h4 className="font-medium mb-2">Support Resolution</h4>
        <p className="text-sm text-muted-foreground">
          Optimize customer support workflows and self-service paths
        </p>
      </div>
    </div>
  );

  const techDetails = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
      <ul className="space-y-2 text-sm">
        <li>• Built with React Flow for smooth interactions</li>
        <li>• Export to JSON, PNG, or Mermaid format</li>
        <li>• AI suggestions for journey optimization</li>
        <li>• Analytics integration to track real user paths</li>
        <li>• Collaborative editing with team members</li>
      </ul>
    </div>
  );

  return (
    <LabWrapper
      title="User Journey Mapper"
      description="Design and optimize customer experiences visually"
      slug="user-journey"
      howItWorks={howItWorks}
      examples={examples}
      techDetails={techDetails}
      ctaText="Map your customer journeys with AI insights"
    >
      <div className="h-[600px] relative">
        <ReactFlowProvider>
          <UserJourneyMapper />
        </ReactFlowProvider>
      </div>
    </LabWrapper>
  );
}