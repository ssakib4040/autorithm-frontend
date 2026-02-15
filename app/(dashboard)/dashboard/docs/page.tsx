import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ExternalLink,
  Video,
  FileText,
  Code,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocsPage() {
  const categoryStyles = {
    blue: {
      iconBg: "bg-blue-100 dark:bg-blue-950/20",
      iconText: "text-blue-600 dark:text-blue-400",
    },
    purple: {
      iconBg: "bg-purple-100 dark:bg-purple-950/20",
      iconText: "text-purple-600 dark:text-purple-400",
    },
    emerald: {
      iconBg: "bg-emerald-100 dark:bg-emerald-950/20",
      iconText: "text-emerald-600 dark:text-emerald-400",
    },
  } as const;

  const categories = [
    {
      title: "Getting Started",
      icon: Zap,
      color: "blue",
      articles: [
        { title: "Quick Start Guide", readTime: "5 min" },
        { title: "First Workflow Setup", readTime: "10 min" },
        { title: "Understanding Presets", readTime: "8 min" },
      ],
    },
    {
      title: "Configuration",
      icon: Code,
      color: "purple",
      articles: [
        { title: "Advanced Block Types", readTime: "15 min" },
        { title: "Environment Variables", readTime: "12 min" },
        { title: "API Integration", readTime: "20 min" },
      ],
    },
    {
      title: "Best Practices",
      icon: FileText,
      color: "emerald",
      articles: [
        { title: "Workflow Optimization", readTime: "10 min" },
        { title: "Error Handling", readTime: "8 min" },
        { title: "Backup Strategies", readTime: "12 min" },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Documentation
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Learn how to configure and optimize your workflows
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center mb-4">
              <Video className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
              Video Tutorials
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Step-by-step video guides
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Watch Now
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-950/20 flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
              API Reference
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Complete API documentation
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Docs
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="pt-6">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-950/20 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
              Knowledge Base
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              FAQs and troubleshooting
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Browse
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Documentation Categories */}
      <div className="space-y-6">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const styles =
            categoryStyles[category.color as keyof typeof categoryStyles];
          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      styles?.iconBg,
                    )}
                  >
                    <Icon className={cn("h-5 w-5", styles?.iconText)} />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>
                      {category.articles.length} articles
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <button
                      key={articleIndex}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                          {article.title}
                        </span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {article.readTime}
                      </Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
