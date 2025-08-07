import Link from "next/link"
import { Zap, Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                SprinterHQ
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Building the future with autonomous AI agents. One intelligent sprint at a time.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/labs" className="text-gray-400 hover:text-white text-sm transition-colors">
                  AI Labs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">AI Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/labs/agent-simulator" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Agent Simulator
                </Link>
              </li>
              <li>
                <Link href="/labs/workflow-tool" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Workflow Designer
                </Link>
              </li>
              <li>
                <Link href="/labs/ideation" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Ideation Lab
                </Link>
              </li>
              <li>
                <Link href="/labs/sketch-studio" className="text-gray-400 hover:text-white text-sm transition-colors">
                  AI Sketch Studio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/SprinterHQ" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/SprinterHQ" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/company/sprinterhq" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:hello@sprinter.ai" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <Link 
              href="/contact" 
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Start Building
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SprinterHQ. All rights reserved. | 
            <Link href="/privacy" className="ml-2 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}