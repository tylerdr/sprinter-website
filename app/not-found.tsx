import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-300 mb-8">
            Looks like this page took an unexpected detour into the AI void. 
            Don&apos;t worry, we&apos;ll help you find your way back.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
          >
            <Search className="w-4 h-4" />
            Get Help
          </Link>
        </div>

        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold mb-3">Popular Pages</h3>
          <div className="grid grid-cols-2 gap-3 text-left">
            <Link
              href="/services"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 rotate-180" />
              <span className="text-sm">Services</span>
            </Link>
            <Link
              href="/case-studies"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 rotate-180" />
              <span className="text-sm">Case Studies</span>
            </Link>
            <Link
              href="/labs"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 rotate-180" />
              <span className="text-sm">AI Labs</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3 rotate-180" />
              <span className="text-sm">About Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}