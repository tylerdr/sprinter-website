import type { Metadata } from "next"
import { Palette } from "lucide-react"
import { generateMetadata as createSEOMetadata } from "@/lib/seo"
import { SEO } from "@/lib/constants"
import SketchStudio from "@/components/labs/SketchStudio"

export const metadata: Metadata = createSEOMetadata({
  title: "AI Sketch Studio - Transform Drawings with AI | SprinterHQ",
  description: "Draw rough sketches and watch AI transform them into polished artwork. Experience the magic of AI-enhanced creativity and digital art generation.",
  keywords: "AI art generation, sketch to art, AI drawing, digital art creation, AI sketch enhancement, creative AI tools, AI artwork",
  canonical: `${SEO.siteUrl}/labs/sketch-studio`,
  ogTitle: "AI Sketch Studio - Turn Sketches into Art",
  ogDescription: "Interactive AI art tool: Transform your rough sketches into polished digital artwork with AI enhancement.",
})

export default function SketchStudioPage() {

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
            <Palette className="w-5 h-5 text-orange-400" />
            <span className="text-sm font-medium text-orange-400">AI Art Generation</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI Sketch <span className="gradient-text">Studio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Draw rough sketches and watch AI transform them into stunning artwork
          </p>
        </div>

        <SketchStudio />

        <div className="mt-12 p-6 rounded-xl bg-card/5 border border-border/10">
          <h3 className="text-lg font-semibold mb-3">How it works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">1</span>
              </div>
              <h4 className="font-medium mb-2">Draw Your Idea</h4>
              <p className="text-sm text-muted-foreground">
                Use the canvas to sketch your concept. Don&apos;t worry about perfection—AI understands rough drawings!
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">2</span>
              </div>
              <h4 className="font-medium mb-2">Add Details</h4>
              <p className="text-sm text-muted-foreground">
                Optionally describe your vision and choose an art style to guide the AI transformation.
              </p>
            </div>
            <div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-3">
                <span className="text-lg font-bold">3</span>
              </div>
              <h4 className="font-medium mb-2">Generate Art</h4>
              <p className="text-sm text-muted-foreground">
                Click transform and watch AI turn your sketch into professional artwork in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}