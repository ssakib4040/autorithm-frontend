import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Layers, Plus, Download, Upload, Settings, Clock } from "lucide-react";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Configuration Presets
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Save and load configuration presets for different use cases
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Preset
          </Button>
        </div>
      </div>

      {/* Presets Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {presets.map((preset) => (
          <Card
            key={preset.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center">
                  <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {preset.category}
                </Badge>
              </div>
              <CardTitle className="text-lg">{preset.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {preset.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-zinc-600 dark:text-zinc-400">
                  {preset.workflows} workflows
                </span>
                <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{preset.lastUsed}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm" className="flex-1">
                  <Settings className="mr-1 h-3 w-3" />
                  Load
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for New Users */}
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
            <Layers className="h-8 w-8 text-zinc-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
            Create Your First Preset
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center max-w-sm mb-4">
            Save your current configuration as a preset to quickly switch
            between different workflow setups
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Preset
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
