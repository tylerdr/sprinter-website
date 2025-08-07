"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Briefcase, Building2, Users, Cpu, TrendingUp, Clock } from "lucide-react"
import { industries, roles, useCases, mcpServers } from "@/lib/use-cases-data"

export default function UseCasesPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 mb-6">
            <Briefcase className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium text-green-400">AI Implementation Hub</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            AI <span className="gradient-text">Use Cases</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover how AI transforms every industry and role. Real implementations with proven ROI.
          </p>
        </motion.div>

        {/* Featured Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8">Featured Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.slice(0, 6).map((useCase, index) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={`/use-cases/${useCase.id}`}
                  className="group block h-full p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-3 ${
                        useCase.difficulty === "Easy" 
                          ? "bg-green-500/20 text-green-400"
                          : useCase.difficulty === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {useCase.difficulty}
                      </span>
                      <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
                        {useCase.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">{useCase.roi}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">{useCase.timeToValue}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {useCase.industry.slice(0, 2).map((ind) => (
                      <span key={ind} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400">
                        {industries.find(i => i.id === ind)?.name}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:text-blue-300">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Browse by Industry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Browse by Industry</h2>
            <Link href="/use-cases/industries" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All Industries →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                href={`/use-cases/industries/${industry.id}`}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center"
              >
                <div className="text-3xl mb-2">{industry.icon}</div>
                <h3 className="text-sm font-medium group-hover:gradient-text transition-all">
                  {industry.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {industry.useCases.length} use cases
                </p>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Browse by Role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Browse by Role</h2>
            <Link href="/use-cases/roles" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All Roles →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.slice(0, 6).map((role) => (
              <Link
                key={role.id}
                href={`/use-cases/roles/${role.id}`}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium group-hover:gradient-text transition-all">
                      {role.title}
                    </h3>
                    <p className="text-xs text-gray-500">{role.department}</p>
                  </div>
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {role.description}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="w-3 h-3 text-green-400" />
                  <span className="text-green-400">{role.avgTimeSaved} saved</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* MCP Servers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">MCP Servers & Integrations</h2>
            <Link href="/use-cases/mcp-servers" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
              View All MCP Servers →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mcpServers.slice(0, 6).map((server) => (
              <Link
                key={server.id}
                href={`/use-cases/mcp-servers/${server.id}`}
                className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium group-hover:gradient-text transition-all">
                    {server.name}
                  </h3>
                  <Cpu className="w-5 h-5 text-gray-500" />
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  {server.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {server.capabilities.slice(0, 2).map((cap) => (
                    <span key={cap} className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-500">
                      {cap}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-white/10"
        >
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{useCases.length}+</div>
            <p className="text-sm text-gray-400">Use Cases</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{industries.length}</div>
            <p className="text-sm text-gray-400">Industries</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">{roles.length}+</div>
            <p className="text-sm text-gray-400">Roles</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">300%</div>
            <p className="text-sm text-gray-400">Average ROI</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to implement <span className="gradient-text">your use case</span>?
          </h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            We've helped 50+ companies implement these exact use cases. 
            Let's discuss your specific needs and build a custom solution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Get Implementation Plan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}