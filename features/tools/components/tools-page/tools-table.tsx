// Server component by default
import Link from "next/link";
import {
  MoreHorizontal,
  Calculator,
  FileText,
  Sparkles,
  FileSearch,
  PenTool,
  Filter,
  Database,
  Settings,
  Search as SearchIcon,
  Zap
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import ToolsFilterControls from "@/features/tools/components/tools-page/tools-filter-controls";
import ToolsViewControls from "@/features/tools/components/tools-page/tools-view-controls";
import CategorySection from "@/features/tools/components/tools-page/category-section";
import ShowcaseCard from "@/features/tools/components/tools-page/showcase-card";

interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  aiEnabled?: boolean;
  requiresAuth?: boolean;
  executionMode?: string;
  isActive?: boolean;
}

interface ToolsTableProps {
  tools: Tool[];
  searchParams?: {
    search?: string;
    category?: string;
    view?: string;
    sort?: string;
  };
}

const categoryIcons: Record<string, React.ReactNode> = {
  calculator: <Calculator className="h-5 w-5 text-blue-600" />,
  calculators: <Calculator className="h-5 w-5 text-blue-600" />,
  search: <SearchIcon className="h-5 w-5 text-purple-600" />,
  documents: <FileText className="h-5 w-5 text-green-600" />,
  "content generation": <PenTool className="h-5 w-5 text-orange-600" />,
  analysis: <Sparkles className="h-5 w-5 text-pink-600" />,
  eligibility: <FileSearch className="h-5 w-5 text-indigo-600" />,
  guidelines: <FileText className="h-5 w-5 text-teal-600" />,
  utility: <Settings className="h-5 w-5 text-gray-600" />,
  data: <Database className="h-5 w-5 text-cyan-600" />,
  optimization: <Zap className="h-5 w-5 text-yellow-600" />
};

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{tool.name}</CardTitle>
            {tool.aiEnabled && (
              <Badge variant="secondary" className="ml-2">
                <Sparkles className="h-3 w-3 mr-1" />
                AI
              </Badge>
            )}
          </div>
          <CardDescription className="line-clamp-2">
            {tool.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Badge variant="outline">
              {tool.requiresAuth ? "Pro" : "Free to use"}
            </Badge>
            <span className="text-sm text-primary hover:underline">
              Use Tool →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function ToolsTable({ tools, searchParams }: ToolsTableProps) {
  const search = searchParams?.search?.toLowerCase() || "";
  const selectedCategory = searchParams?.category || "all";
  const view = searchParams?.view || "grouped";
  const sort = searchParams?.sort || "name";

  let filteredTools = tools.filter(tool => {
    const matchesSearch =
      !search ||
      tool.name.toLowerCase().includes(search) ||
      tool.description.toLowerCase().includes(search) ||
      tool.category.toLowerCase().includes(search);
    const matchesCategory =
      selectedCategory === "all" ||
      tool.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  filteredTools = [...filteredTools].sort((a, b) => {
    switch (sort) {
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "category":
        return (
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
        );
      case "popular":
        return (
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
        );
      case "name":
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const groupedTools = filteredTools.reduce(
    (acc, tool) => {
      const category = tool.category;
      if (!acc[category]) acc[category] = [];
      acc[category].push(tool);
      return acc;
    },
    {} as Record<string, Tool[]>
  );

  const categories = Array.from(
    new Set(tools.map(tool => tool.category))
  ).sort();

  return (
    <div className="space-y-6">
      <ToolsFilterControls
        categories={categories}
        initialSearch={searchParams?.search || ""}
        initialCategory={selectedCategory}
        initialSort={sort}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-lg font-medium">
            {filteredTools.length}{" "}
            {filteredTools.length === 1 ? "tool" : "tools"}
          </p>
          {search && (
            <p className="text-sm text-muted-foreground">matching "{search}"</p>
          )}
        </div>
        <ToolsViewControls initialView={view} />
      </div>

      {view === "showcase" && (
        <div className="space-y-12">
          {Object.entries(groupedTools).map(([category, categoryTools]) => (
            <div key={category} className="space-y-6">
              <div className="flex items-center gap-3">
                {categoryIcons[category.toLowerCase()] || (
                  <Filter className="h-6 w-6" />
                )}
                <h2 className="text-2xl font-bold">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h2>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {categoryTools.length}
                </Badge>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.map(tool => (
                  <ShowcaseCard
                    key={tool.id}
                    tool={tool}
                    categoryIcon={categoryIcons[tool.category.toLowerCase()]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {view === "grouped" && (
        <div className="space-y-8">
          {Object.entries(groupedTools).map(([category, categoryTools]) => (
            <CategorySection
              key={category}
              title={category.charAt(0).toUpperCase() + category.slice(1)}
              count={categoryTools.length}
              icon={
                categoryIcons[category.toLowerCase()] || (
                  <Filter className="h-5 w-5" />
                )
              }
            >
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoryTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </CategorySection>
          ))}
        </div>
      )}

      {view === "table" && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>AI Enabled</TableHead>
                <TableHead>Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTools.map(tool => (
                <TableRow
                  key={tool.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      {categoryIcons[tool.category.toLowerCase()] || (
                        <Filter className="h-4 w-4" />
                      )}
                      <span>{tool.name}</span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground line-clamp-1">
                      {tool.description}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{tool.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {tool.aiEnabled ? (
                      <Badge variant="secondary">
                        <Sparkles className="h-3 w-3" />
                      </Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={tool.requiresAuth ? "default" : "secondary"}
                    >
                      {tool.requiresAuth ? "Pro" : "Free"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/tools/${tool.slug}`}>Open Tool</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Copy Link</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
