"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  aiEnabled?: boolean;
}

interface ShowcaseCardProps {
  tool: Tool;
  categoryIcon?: React.ReactNode;
}

export function ShowcaseCard({ tool, categoryIcon }: ShowcaseCardProps) {
  const [imageError, setImageError] = useState(false);

  // Generate a consistent gradient based on the tool name
  const getGradientClass = () => {
    const gradients = [
      "from-purple-400 to-pink-600",
      "from-blue-400 to-cyan-600",
      "from-green-400 to-teal-600",
      "from-orange-400 to-red-600",
      "from-indigo-400 to-purple-600",
      "from-pink-400 to-rose-600",
      "from-cyan-400 to-blue-600",
      "from-teal-400 to-green-600"
    ];
    const index = tool.name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="group cursor-pointer">
      <Link href={`/tools/${tool.slug}`}>
        <div className="relative aspect-video mb-4 overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          {/* {!imageError ? (
            <img
              src={`/tool-screenshots/${tool.slug}.png`}
              alt={`${tool.name} preview`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : ( */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getGradientClass()} opacity-10 dark:opacity-20`}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 dark:bg-black/20 blur-xl rounded-full" />
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  {categoryIcon ? (
                    <div className="scale-150">{categoryIcon}</div>
                  ) : tool.aiEnabled ? (
                    <Sparkles className="h-8 w-8 text-primary" />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {tool.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 text-center max-w-[80%]">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 line-clamp-1">
                  {tool.category}
                </p>
              </div>
            </div>
          </div>
          {/* )} */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            {tool.aiEnabled && <Sparkles className="h-4 w-4 text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tool.description}
          </p>
        </div>
        <Badge variant="outline" className="mt-2">
          {tool.category}
        </Badge>
      </Link>
    </div>
  );
}

export default ShowcaseCard;
