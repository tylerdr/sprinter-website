"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Download,
  RefreshCw,
  Wand2,
  Upload,
  Sparkles,
  Eraser,
  Undo,
} from "lucide-react";

const styleOptions = [
  "Photorealistic",
  "Anime/Manga",
  "Oil Painting",
  "Watercolor",
  "Pencil Sketch",
  "Digital Art",
  "3D Render",
  "Pixel Art",
];

const examplePrompts = [
  "A futuristic city at sunset",
  "A magical forest with glowing trees",
  "A steampunk robot",
  "An underwater castle",
];

export default function SketchStudio() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("Photorealistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [brushSize, setBrushSize] = useState(5);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    // Use theme-aware colors for drawing
    ctx.strokeStyle = theme === "dark" ? "#ffffff" : "#000000";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use theme-aware background color
    ctx.fillStyle = theme === "dark" ? "#1a1a1a" : "#f5f5f5";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setGeneratedImage(null);
  };

  const generateImage = async () => {
    setIsGenerating(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Call AI image generation API
    // For now, simulate with generated image URL
    setGeneratedImage(`data:image/svg+xml;base64,${btoa(`<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="400" fill="#1a1a2e"/><text x="50%" y="50%" text-anchor="middle" fill="#eee" font-size="20">AI Generated: ${prompt || 'Your artwork'}</text></svg>`)}`);
    setIsGenerating(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="lg:col-span-2"
      >
        <div className="p-6 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Canvas</h2>
            <div className="flex gap-2">
              <button
                onClick={clearCanvas}
                className="px-4 py-2 bg-card/30 text-foreground rounded-lg hover:bg-card/40 transition-colors flex items-center gap-2"
              >
                <Eraser className="w-4 h-4" />
                Clear
              </button>
              <button className="px-4 py-2 bg-card/30 text-foreground rounded-lg hover:bg-card/40 transition-colors flex items-center gap-2">
                <Undo className="w-4 h-4" />
                Undo
              </button>
            </div>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              className="w-full border border-border/20 rounded-lg cursor-crosshair bg-background"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
            />

            {generatedImage && (
              <div className="absolute inset-0 bg-background/80 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 text-warning mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">
                    AI Image Generated!
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your AI-enhanced artwork is ready!
                  </p>
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-4 py-2 bg-card/30 text-foreground rounded-lg hover:bg-card/40 transition-colors"
                  >
                    Continue Drawing
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 mt-4">
            <label className="text-sm">Brush Size:</label>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm w-8">{brushSize}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="p-6 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Description (Optional)</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you're drawing..."
            className="w-full px-4 py-3 rounded-lg bg-card/30 border border-border/20 focus:border-orange-500 focus:outline-none h-24 resize-none text-sm"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {examplePrompts.map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                className="text-xs px-3 py-1 rounded-full bg-card/30 hover:bg-card/40 transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-card/20 border border-border/30 backdrop-blur-sm">
          <h3 className="text-lg font-semibold mb-4">Art Style</h3>
          <div className="grid grid-cols-2 gap-2">
            {styleOptions.map((option) => (
              <button
                key={option}
                onClick={() => setStyle(option)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  style === option
                    ? "bg-brand-gradient text-primary-foreground"
                    : "bg-card/30 hover:bg-card/40"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generateImage}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-brand-gradient text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-border/30 border-t-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Transform with AI
            </>
          )}
        </button>

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-card/30 text-foreground rounded-lg hover:bg-card/40 transition-colors flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </button>
          <button className="flex-1 px-4 py-2 bg-card/30 text-foreground rounded-lg hover:bg-card/40 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </motion.div>
    </div>
  );
}
