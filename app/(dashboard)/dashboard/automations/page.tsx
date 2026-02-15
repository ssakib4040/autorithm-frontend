"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Automations() {
  const automations = [
    {
      id: 1,
      name: "Lead Enrichment Workflow",
      status: "active",
      lastRun: "2 hours ago",
      executions: 142,
    },
    {
      id: 2,
      name: "Email Marketing Pipeline",
      status: "active",
      lastRun: "30 minutes ago",
      executions: 89,
    },
    {
      id: 3,
      name: "Social Media Scheduler",
      status: "paused",
      lastRun: "1 day ago",
      executions: 56,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          My Automations
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your purchased automation workflows
        </p>
      </div>

      {automations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Zap className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400 text-center mb-4">
              No automations yet
            </p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {automations.map((automation) => (
            <Card key={automation.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {automation.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span>Last run: {automation.lastRun}</span>
                      <span>•</span>
                      <span>{automation.executions} executions</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        automation.status === "active" ? "default" : "outline"
                      }
                    >
                      {automation.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
