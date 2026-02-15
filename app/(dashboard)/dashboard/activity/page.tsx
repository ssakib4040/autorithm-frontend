"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShoppingBag, LogIn, Settings, Download } from "lucide-react";

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return ShoppingBag;
      case "view":
        return Activity;
      case "tutorial":
        return Settings;
      case "download":
        return Download;
      case "login":
        return LogIn;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "purchase":
        return "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900";
      case "view":
        return "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900";
      case "tutorial":
        return "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900";
      case "download":
        return "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900";
      case "login":
        return "bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-900";
      default:
        return "bg-zinc-50 dark:bg-zinc-950/20 border-zinc-200 dark:border-zinc-900";
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Activity Log
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Track all your actions and interactions
        </p>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => {
          const IconComponent = getActivityIcon(activity.type);
          return (
            <Card key={activity.id} className={getActivityColor(activity.type)}>
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-white/50 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <IconComponent className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {activity.action} &quot;{activity.resource}&quot;
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {activity.timestamp}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
