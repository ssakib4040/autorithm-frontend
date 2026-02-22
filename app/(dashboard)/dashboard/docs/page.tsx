import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  Code,
  ExternalLink,
  FileText,
  Sparkles,
  Video,
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
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-sky-50/60 to-emerald-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-8 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative">
          <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Learning Hub
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Documentation
          </h1>
          <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Learn setup patterns, integration architecture, and optimization techniques.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[{
          title: "Video Tutorials",
          desc: "Step-by-step walkthroughs",
          icon: Video,
          tone: "bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400",
          cta: "Watch Now",
        }, {
          title: "API Reference",
          desc: "Endpoints and payload formats",
          icon: Code,
          tone: "bg-purple-100 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400",
          cta: "View Docs",
        }, {
          title: "Knowledge Base",
          desc: "FAQs and troubleshooting",
          icon: BookOpen,
          tone: "bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400",
          cta: "Browse",
        }].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <div className={cn("mb-4 flex h-11 w-11 items-center justify-center rounded-lg", item.tone)}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</h3>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                <Button variant="outline" size="sm" className="mt-4 w-full rounded-lg">
                  {item.cta}
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="space-y-4">
        {categories.map((category) => {
          const Icon = category.icon;
          const styles = categoryStyles[category.color as keyof typeof categoryStyles];
          return (
            <Card key={category.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", styles.iconBg)}>
                    <Icon className={cn("h-5 w-5", styles.iconText)} />
                  </div>
                  <div>
                    <CardTitle>{category.title}</CardTitle>
                    <CardDescription>{category.articles.length} articles</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.articles.map((article) => (
                    <button
                      key={article.title}
                      className="flex w-full items-center justify-between rounded-lg border border-zinc-200 p-3 text-left hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-zinc-400" />
                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{article.title}</span>
                      </div>
                      <Badge variant="secondary" className="text-[11px]">{article.readTime}</Badge>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
