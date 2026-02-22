"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  Clock3,
  Download,
  LogIn,
  Settings,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export default function ActivityLog() {
  const activities = [
    {
      id: 1,
      action: "Purchased",
      resource: "Lead Enrichment Workflow",
      type: "purchase",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      action: "Viewed",
      resource: "Email Marketing Template",
      type: "view",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      action: "Started",
      resource: "Getting Started Guide",
      type: "tutorial",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      action: "Downloaded",
      resource: "API Documentation PDF",
      type: "download",
      timestamp: "2 days ago",
    },
    {
      id: 5,
      action: "Logged in",
      resource: "Dashboard",
      type: "login",
      timestamp: "3 days ago",
    },
  ];

  const getActivityConfig = (type: string) => {
    switch (type) {
      case "purchase":
        return {
          icon: ShoppingBag,
          tone: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20",
          badgeTone: "text-emerald-700 dark:text-emerald-300",
        };
      case "view":
        return {
          icon: Activity,
          tone: "border-blue-200 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20",
          badgeTone: "text-blue-700 dark:text-blue-300",
        };
      case "tutorial":
        return {
          icon: Settings,
          tone: "border-violet-200 bg-violet-50/60 dark:border-violet-900/40 dark:bg-violet-950/20",
          badgeTone: "text-violet-700 dark:text-violet-300",
        };
      case "download":
        return {
          icon: Download,
          tone: "border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20",
          badgeTone: "text-amber-700 dark:text-amber-300",
        };
      case "login":
        return {
          icon: LogIn,
          tone: "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/70",
          badgeTone: "text-zinc-600 dark:text-zinc-300",
        };
      default:
        return {
          icon: Activity,
          tone: "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/70",
          badgeTone: "text-zinc-600 dark:text-zinc-300",
        };
    }
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-sky-50/60 to-violet-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-blue-400/15 blur-3xl" />

        <div className="relative">
          <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Timeline
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Activity Log
          </h1>
          <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A chronological view of your interactions across templates, downloads, and account access.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        {activities.map((activity) => {
          const config = getActivityConfig(activity.type);
          const Icon = config.icon;

          return (
            <Card key={activity.id} className={config.tone}>
              <CardContent className="p-4 sm:p-5">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/60 bg-white/70 dark:border-zinc-700 dark:bg-zinc-900">
                    <Icon className="h-4.5 w-4.5 text-zinc-700 dark:text-zinc-300" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {activity.action} <span className="font-semibold">&quot;{activity.resource}&quot;</span>
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                      <Clock3 className="h-3.5 w-3.5" />
                      {activity.timestamp}
                    </p>
                  </div>

                  <Badge variant="outline" className={`text-[11px] capitalize ${config.badgeTone}`}>
                    {activity.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
