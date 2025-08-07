"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Palette, Download, RefreshCw, Wand2, Upload, Sparkles, Eraser, Undo } from "lucide-react"

const styleOptions = [
  "Photorealistic",
  "Anime/Manga",
  "Oil Painting",
  "Watercolor",
  "Pencil Sketch",
  "Digital Art",
  "3D Render",
  "Pixel Art",
]

const examplePrompts = [
  "A futuristic city at sunset",
  "A magical forest with glowing trees",
  "A steampunk robot",
  "An underwater castle",
]

export default function SketchStudioPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("Photorealistic")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [brushSize, setBrushSize] = useState(5)

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    ctx.lineWidth = brushSize
    ctx.lineCap = "round"
    ctx.strokeStyle = "#ffffff"
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    ctx.fillStyle = "#1a1a1a"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setGeneratedImage(null)
  }

  const generateImage = async () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // In production, this would call an AI image generation API
    // For demo, we'll show a placeholder message
    setGeneratedImage("/api/placeholder/600/400")
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
            <Palette className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">AI Art Generation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Sketch <span className="gradient-text">Studio</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Draw rough sketches and watch AI transform them into stunning artwork
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Canvas</h2>
                <div className="flex gap-2">
                  <button
                    onClick={clearCanvas}
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    <Eraser className="w-4 h-4" />
                    Clear
                  </button>
                  <button
                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
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
                  className="w-full border border-white/20 rounded-lg cursor-crosshair bg-gray-900"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                
                {generatedImage && (
                  <div className="absolute inset-0 bg-black/80 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                      <p className="text-lg font-semibold mb-2">AI Image Generated!</p>
                      <p className="text-sm text-gray-400 mb-4">
                        In production, your transformed artwork would appear here
                      </p>
                      <button
                        onClick={() => setGeneratedImage(null)}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
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
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Description (Optional)</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you're drawing..."
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-orange-500 focus:outline-none h-24 resize-none text-sm"
              />
              
              <div className="flex flex-wrap gap-2 mt-3">
                {examplePrompts.map((example) => (
                  <button
                    key={example}
                    onClick={() => setPrompt(example)}
                    className="text-xs px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4">Art Style</h3>
              <div className="grid grid-cols-2 gap-2">
                {styleOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setStyle(option)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      style === option
                        ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                        : "bg-white/10 hover:bg-white/20"
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
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              <button className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload
              </button>
              <button className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <h3 className="text-lg font-semibold mb-3">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Draw Your Idea</h4>
              <p className="text-sm text-gray-400">
                Use the canvas to sketch your concept. Don't worry about perfection—AI understands rough drawings!
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">Add Details</h4>
              <p className="text-sm text-gray-400">
                Optionally describe your vision and choose an art style to guide the AI transformation.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2">Generate Art</h4>
              <p className="text-sm text-gray-400">
                Click transform and watch AI turn your sketch into professional artwork in seconds.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}