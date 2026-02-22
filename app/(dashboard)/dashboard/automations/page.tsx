"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, PauseCircle, PlayCircle, Sparkles, Zap } from "lucide-react";

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
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-blue-50/60 to-violet-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-violet-400/15 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Runtime Overview
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              My Automations
            </h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Review workflow status, execution cadence, and recent runtime behavior.
            </p>
          </div>

          <Button asChild className="rounded-xl">
            <Link href="/products">
              <Zap className="mr-2 h-4 w-4" />
              Browse More Templates
            </Link>
          </Button>
        </div>
      </section>

      {automations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <Zap className="mb-4 h-10 w-10 text-zinc-400 dark:text-zinc-500" />
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">No automations yet</h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Start by purchasing a template from the marketplace.</p>
            <Button asChild className="mt-5 rounded-xl">
              <Link href="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-3">
          {automations.map((automation) => (
            <Card key={automation.id}>
              <CardContent className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{automation.name}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Last run: {automation.lastRun} • {automation.executions} executions
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        automation.status === "active"
                          ? "text-emerald-700 dark:text-emerald-300"
                          : "text-amber-700 dark:text-amber-300"
                      }
                    >
                      {automation.status === "active" ? (
                        <PlayCircle className="mr-1 h-3.5 w-3.5" />
                      ) : (
                        <PauseCircle className="mr-1 h-3.5 w-3.5" />
                      )}
                      {automation.status}
                    </Badge>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
