import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Download, Layers, Plus, Settings, Sparkles, Upload } from "lucide-react";

export default function PresetsPage() {
  const presets = [
    {
      id: 1,
      name: "E-commerce Automation",
      description: "Complete setup for online store automation",
      workflows: 8,
      lastUsed: "2 days ago",
      category: "Production",
    },
    {
      id: 2,
      name: "Social Media Manager",
      description: "Multi-platform social media scheduling",
      workflows: 5,
      lastUsed: "1 week ago",
      category: "Marketing",
    },
    {
      id: 3,
      name: "Customer Support Flow",
      description: "Automated ticket routing and responses",
      workflows: 12,
      lastUsed: "3 days ago",
      category: "Support",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-violet-50/60 to-blue-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-10 -top-8 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Configuration Library
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Presets</h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Save and apply reusable workflow configurations across projects.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button size="sm" className="rounded-lg">
              <Plus className="mr-2 h-4 w-4" />
              New Preset
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {presets.map((preset) => (
          <Card key={preset.id} className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/20">
                  <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <Badge variant="secondary" className="text-[11px]">{preset.category}</Badge>
              </div>
              <CardTitle className="text-base">{preset.name}</CardTitle>
              <CardDescription className="line-clamp-2">{preset.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>{preset.workflows} workflows</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {preset.lastUsed}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1 rounded-lg">
                  <Settings className="mr-1 h-3.5 w-3.5" />
                  Load
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
            <Layers className="h-7 w-7 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Create Your First Preset</h3>
          <p className="mt-1 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
            Capture your current setup so you can switch configurations without rebuilding from scratch.
          </p>
          <Button className="mt-4 rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            Create Preset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
