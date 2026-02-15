"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Activity,
  TrendingUp,
  Package,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Overview() {
  const stats = [
    {
      title: "Active Workflows",
      value: "12",
      icon: Activity,
      color: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Executions",
      value: "1,284",
      icon: Zap,
      color: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Success Rate",
      value: "98.5%",
      icon: TrendingUp,
      color: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Products Owned",
      value: "5",
      icon: Package,
      color: "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      name: "AI Lead Enrichment",
      status: "success",
      time: "2 minutes ago",
    },
    {
      id: 2,
      name: "Social Media Scheduler",
      status: "success",
      time: "15 minutes ago",
    },
    {
      id: 3,
      name: "Email Campaign Automator",
      status: "warning",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Welcome back
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Here&apos;s what&apos;s happening with your workflows
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg border transition-colors hover:bg-opacity-75",
                stat.color,
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                    {stat.title}
                  </p>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {stat.value}
                  </div>
                </div>
                <Icon className={cn("h-5 w-5", stat.iconColor)} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/usage">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 rounded-md border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="flex items-center gap-3">
                    {activity.status === "success" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-600 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                        {activity.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Quick Start</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-sm h-9"
            >
              <Link href="/dashboard/config/demo-project">
                <Zap className="mr-2 h-4 w-4" />
                Configure
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-sm h-9"
            >
              <Link href="/dashboard/presets">
                <Package className="mr-2 h-4 w-4" />
                Presets
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-sm h-9"
            >
              <Link href="/dashboard/settings">
                <Activity className="mr-2 h-4 w-4" />
                Backup
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start text-sm h-9"
            >
              <Link href="/products">
                <ArrowRight className="mr-2 h-4 w-4" />
                Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
