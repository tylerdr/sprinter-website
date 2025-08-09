"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { LabLayout } from "@/components/labs/LabLayout";
import { 
  Building2, 
  Users, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Zap,
  Brain,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Info,
  Download,
  Share2,
  Sparkles,
  Factory,
  Coffee,
  ShoppingCart,
  Briefcase,
  Heart,
  Car,
  Home,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// NPC types
const NPC_TYPES = [
  { id: "customer", name: "Customer", icon: ShoppingCart, color: "text-blue-500" },
  { id: "barista", name: "Barista", icon: Coffee, color: "text-brown-500" },
  { id: "manager", name: "Manager", icon: Briefcase, color: "text-purple-500" },
  { id: "delivery", name: "Delivery", icon: Car, color: "text-green-500" },
  { id: "maintenance", name: "Maintenance", icon: Settings, color: "text-orange-500" },
];

// Building types
const BUILDING_TYPES = [
  { id: "cafe", name: "Café", icon: Coffee },
  { id: "store", name: "Store", icon: ShoppingCart },
  { id: "office", name: "Office", icon: Building2 },
  { id: "warehouse", name: "Warehouse", icon: Factory },
  { id: "residence", name: "Residence", icon: Home },
];

// Simulation scenarios
const SCENARIOS = [
  {
    id: "coffee-rush",
    name: "Morning Coffee Rush",
    description: "Optimize a café during peak morning hours",
    npcs: 15,
    buildings: ["cafe"],
    objectives: ["Serve 50 customers", "Maintain <2 min wait time", "Keep satisfaction >80%"],
  },
  {
    id: "retail-logistics",
    name: "Retail Supply Chain",
    description: "Manage inventory and deliveries for a retail store",
    npcs: 20,
    buildings: ["store", "warehouse"],
    objectives: ["Process 100 orders", "Optimize delivery routes", "Minimize stockouts"],
  },
  {
    id: "office-operations",
    name: "Office Building Operations",
    description: "Coordinate services in a multi-tenant office building",
    npcs: 30,
    buildings: ["office", "cafe"],
    objectives: ["Handle 50 service requests", "Coordinate maintenance", "Manage visitor flow"],
  },
];

interface NPC {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  state: string;
  goal: string;
  satisfaction: number;
  waitTime: number;
  path: { x: number; y: number }[];
}

interface Building {
  id: string;
  type: string;
  name: string;
  position: { x: number; y: number };
  capacity: number;
  occupancy: number;
  queue: string[];
}

interface SimulationState {
  npcs: NPC[];
  buildings: Building[];
  time: number;
  metrics: {
    customersServed: number;
    avgWaitTime: number;
    avgSatisfaction: number;
    efficiency: number;
  };
  events: {
    timestamp: number;
    type: string;
    message: string;
    npcId?: string;
  }[];
}

export default function TinyTownPage() {
  const [scenario, setScenario] = useState(SCENARIOS[0]);
  const [simulation, setSimulation] = useState<SimulationState | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showPaths, setShowPaths] = useState(true);
  const [showMetrics, setShowMetrics] = useState(true);
  const [selectedNPC, setSelectedNPC] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [email, setEmail] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize simulation
  const initSimulation = () => {
    const buildings: Building[] = scenario.buildings.map((type, index) => ({
      id: `building-${index}`,
      type,
      name: BUILDING_TYPES.find(b => b.id === type)?.name || type,
      position: { 
        x: 100 + (index * 200), 
        y: 300 
      },
      capacity: 10,
      occupancy: 0,
      queue: [],
    }));

    const npcs: NPC[] = Array.from({ length: scenario.npcs }, (_, i) => {
      const type = NPC_TYPES[Math.floor(Math.random() * NPC_TYPES.length)];
      return {
        id: `npc-${i}`,
        type: type.id,
        name: `${type.name} ${i + 1}`,
        position: { 
          x: Math.random() * 600 + 50, 
          y: Math.random() * 400 + 50 
        },
        state: "idle",
        goal: "wander",
        satisfaction: 100,
        waitTime: 0,
        path: [],
      };
    });

    setSimulation({
      npcs,
      buildings,
      time: 0,
      metrics: {
        customersServed: 0,
        avgWaitTime: 0,
        avgSatisfaction: 100,
        efficiency: 100,
      },
      events: [{
        timestamp: 0,
        type: "system",
        message: "Simulation initialized",
      }],
    });
  };

  // Simulation loop
  const updateSimulation = () => {
    if (!simulation || !isRunning) return;

    setSimulation(prev => {
      if (!prev) return null;

      const newNPCs = prev.npcs.map(npc => {
        // Simple AI behavior
        const newNPC = { ...npc };
        
        // Update position towards goal
        if (npc.path.length > 0) {
          const target = npc.path[0];
          const dx = target.x - npc.position.x;
          const dy = target.y - npc.position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 5) {
            newNPC.path = npc.path.slice(1);
          } else {
            const moveSpeed = 2 * speed;
            newNPC.position = {
              x: npc.position.x + (dx / distance) * moveSpeed,
              y: npc.position.y + (dy / distance) * moveSpeed,
            };
          }
        } else {
          // Generate new goal
          if (Math.random() < 0.02) {
            const building = prev.buildings[Math.floor(Math.random() * prev.buildings.length)];
            newNPC.path = [{
              x: building.position.x + Math.random() * 50 - 25,
              y: building.position.y + Math.random() * 50 - 25,
            }];
            newNPC.goal = `Visit ${building.name}`;
            newNPC.state = "moving";
          }
        }

        // Update satisfaction
        if (npc.state === "waiting") {
          newNPC.waitTime += 0.1 * speed;
          newNPC.satisfaction = Math.max(0, npc.satisfaction - 0.5 * speed);
        } else {
          newNPC.satisfaction = Math.min(100, npc.satisfaction + 0.1 * speed);
        }

        return newNPC;
      });

      // Update metrics
      const avgSatisfaction = newNPCs.reduce((sum, npc) => sum + npc.satisfaction, 0) / newNPCs.length;
      const avgWaitTime = newNPCs.reduce((sum, npc) => sum + npc.waitTime, 0) / newNPCs.length;

      // Generate events
      const newEvents = [...prev.events];
      if (Math.random() < 0.01 * speed) {
        const randomNPC = newNPCs[Math.floor(Math.random() * newNPCs.length)];
        newEvents.push({
          timestamp: prev.time,
          type: "interaction",
          message: `${randomNPC.name} completed ${randomNPC.goal}`,
          npcId: randomNPC.id,
        });
      }

      return {
        ...prev,
        npcs: newNPCs,
        time: prev.time + 0.1 * speed,
        metrics: {
          ...prev.metrics,
          avgSatisfaction,
          avgWaitTime,
          efficiency: 100 - avgWaitTime * 2,
        },
        events: newEvents.slice(-10), // Keep last 10 events
      };
    });
  };

  // Canvas rendering
  useEffect(() => {
    if (!canvasRef.current || !simulation) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw buildings
    simulation.buildings.forEach(building => {
      ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
      ctx.fillRect(building.position.x - 40, building.position.y - 40, 80, 80);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.8)";
      ctx.strokeRect(building.position.x - 40, building.position.y - 40, 80, 80);
      
      // Building label
      ctx.fillStyle = "#1f2937";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(building.name, building.position.x, building.position.y + 55);
    });

    // Draw NPC paths
    if (showPaths) {
      simulation.npcs.forEach(npc => {
        if (npc.path.length > 0) {
          ctx.strokeStyle = "rgba(156, 163, 175, 0.3)";
          ctx.beginPath();
          ctx.moveTo(npc.position.x, npc.position.y);
          npc.path.forEach(point => {
            ctx.lineTo(point.x, point.y);
          });
          ctx.stroke();
        }
      });
    }

    // Draw NPCs
    simulation.npcs.forEach(npc => {
      const npcType = NPC_TYPES.find(t => t.id === npc.type);
      
      // NPC circle
      ctx.fillStyle = npc.id === selectedNPC ? "rgba(251, 191, 36, 0.3)" : 
                      npc.satisfaction > 75 ? "rgba(34, 197, 94, 0.3)" :
                      npc.satisfaction > 50 ? "rgba(251, 191, 36, 0.3)" :
                      "rgba(239, 68, 68, 0.3)";
      ctx.beginPath();
      ctx.arc(npc.position.x, npc.position.y, 12, 0, Math.PI * 2);
      ctx.fill();
      
      // NPC icon (simplified)
      ctx.fillStyle = "#1f2937";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(npc.type[0].toUpperCase(), npc.position.x, npc.position.y + 3);
    });
  }, [simulation, showPaths, selectedNPC]);

  // Animation loop
  useEffect(() => {
    if (isRunning) {
      const animate = () => {
        updateSimulation();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, speed]);

  return (
    <LabLayout
      title="Tiny Town"
      description="Walk-the-factory simulation with AI agents"
      category="agents"
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <Badge variant="outline" className="mb-4">
            <Factory className="w-3 h-3 mr-1" />
            AI Simulation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Tiny <span className="gradient-text">Town</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch AI agents navigate a simulated world. NPCs make decisions, 
            interact with environments, and optimize workflows in real-time.
          </p>
        </div>

        {/* Simulation Container */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Canvas */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Simulation World</CardTitle>
                  <div className="flex gap-2">
                    {!simulation ? (
                      <Button onClick={initSimulation}>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Initialize
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant={isRunning ? "destructive" : "default"}
                          onClick={() => setIsRunning(!isRunning)}
                        >
                          {isRunning ? (
                            <>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 mr-2" />
                              Start
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={initSimulation}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted/20 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={700}
                    height={500}
                    className="w-full border rounded-lg"
                  />
                  
                  {/* Overlay controls */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="flex items-center gap-2 bg-background/90 backdrop-blur px-3 py-1.5 rounded-lg">
                      <Switch
                        checked={showPaths}
                        onCheckedChange={setShowPaths}
                        id="show-paths"
                      />
                      <Label htmlFor="show-paths" className="text-xs">Show Paths</Label>
                    </div>
                    <div className="flex items-center gap-2 bg-background/90 backdrop-blur px-3 py-1.5 rounded-lg">
                      <Switch
                        checked={showMetrics}
                        onCheckedChange={setShowMetrics}
                        id="show-metrics"
                      />
                      <Label htmlFor="show-metrics" className="text-xs">Show Metrics</Label>
                    </div>
                  </div>

                  {/* Speed control */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-background/90 backdrop-blur p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Label className="text-xs">Speed</Label>
                        <Slider
                          value={[speed]}
                          onValueChange={([v]) => setSpeed(v)}
                          min={0.5}
                          max={3}
                          step={0.5}
                          className="flex-1"
                        />
                        <span className="text-xs font-mono w-8">{speed}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics overlay */}
                  {showMetrics && simulation && (
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur p-3 rounded-lg space-y-2">
                      <div className="text-xs">
                        <div className="font-semibold">Time: {simulation.time.toFixed(1)}s</div>
                        <div>NPCs: {simulation.npcs.length}</div>
                        <div>Avg Satisfaction: {simulation.metrics.avgSatisfaction.toFixed(0)}%</div>
                        <div>Avg Wait: {simulation.metrics.avgWaitTime.toFixed(1)}s</div>
                        <div>Efficiency: {simulation.metrics.efficiency.toFixed(0)}%</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Event Log */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Event Log</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {simulation?.events.map((event, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <Badge variant="outline" className="shrink-0">
                        {event.timestamp.toFixed(1)}s
                      </Badge>
                      <span className="text-muted-foreground">{event.message}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            {/* Scenario Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Scenario</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={scenario.id}
                  onValueChange={(id) => {
                    const s = SCENARIOS.find(sc => sc.id === id);
                    if (s) setScenario(s);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCENARIOS.map(s => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {scenario.description}
                </p>
                <div className="space-y-1">
                  <h4 className="text-xs font-semibold">Objectives:</h4>
                  {scenario.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-xs">
                      <ChevronRight className="w-3 h-3" />
                      {obj}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* NPC Details */}
            {selectedNPC && simulation && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">NPC Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const npc = simulation.npcs.find(n => n.id === selectedNPC);
                    if (!npc) return null;
                    return (
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-semibold">Name:</span> {npc.name}
                        </div>
                        <div>
                          <span className="font-semibold">State:</span> {npc.state}
                        </div>
                        <div>
                          <span className="font-semibold">Goal:</span> {npc.goal}
                        </div>
                        <div>
                          <span className="font-semibold">Satisfaction:</span>
                          <Progress value={npc.satisfaction} className="mt-1" />
                        </div>
                        <div>
                          <span className="font-semibold">Wait Time:</span> {npc.waitTime.toFixed(1)}s
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Export */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Export Results</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setShowExport(true)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Simulation Data
                </Button>
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
                <h3 className="text-lg font-semibold mb-4">Export Simulation Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download the complete simulation data including NPC behaviors, metrics, and insights.
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
                  <Button onClick={() => {
                    console.log("Exporting for:", email);
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
    </LabLayout>
  );
}