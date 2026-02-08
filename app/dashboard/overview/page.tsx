"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  TrendingUp,
  Package,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

export default function Overview() {
  const stats = [
    {
      title: "Active Workflows",
      value: "12",
      change: "+2 this week",
      icon: Activity,
      trend: "up",
      color: "blue",
    },
    {
      title: "Total Executions",
      value: "1,284",
      change: "+18% from last month",
      icon: Zap,
      trend: "up",
      color: "emerald",
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+2.3% improvement",
      icon: TrendingUp,
      trend: "up",
      color: "purple",
    },
    {
      title: "Products Owned",
      value: "5",
      change: "3 active licenses",
      icon: Package,
      trend: "neutral",
      color: "orange",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      name: "AI Lead Enrichment",
      status: "success",
      time: "2 minutes ago",
      executions: 42,
    },
    {
      id: 2,
      name: "Social Media Scheduler",
      status: "success",
      time: "15 minutes ago",
      executions: 28,
    },
    {
      id: 3,
      name: "Email Campaign Automator",
      status: "warning",
      time: "1 hour ago",
      executions: 15,
    },
    {
      id: 4,
      name: "Customer Support Router",
      status: "success",
      time: "3 hours ago",
      executions: 67,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Monitor your automation workflows and system performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {stat.title}
                </CardTitle>
                <div
                  className={`h-10 w-10 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-950/20 flex items-center justify-center`}
                >
                  <Icon
                    className={`h-5 w-5 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  {stat.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                  )}
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest workflow executions and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {activity.status === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        {activity.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-zinc-400" />
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.executions} runs
                  </Badge>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/dashboard/usage">
                View All Activity
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts for workflow management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              asChild
              variant="default"
              className="w-full justify-start"
              size="lg"
            >
              <Link href="/dashboard/config/demo-project">
                <Zap className="mr-2 h-4 w-4" />
                Configure Workflows
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Link href="/dashboard/presets">
                <Package className="mr-2 h-4 w-4" />
                Manage Presets
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Link href="/dashboard/settings">
                <Activity className="mr-2 h-4 w-4" />
                Backup & Restore
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start"
              size="lg"
            >
              <Link href="/products">
                <ArrowUpRight className="mr-2 h-4 w-4" />
                Browse Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current health and performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900">
              <div>
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100">
                  API Status
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  All systems operational
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
              <div>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Uptime
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  99.98% this month
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900">
              <div>
                <p className="text-sm font-medium text-purple-900 dark:text-purple-100">
                  Response Time
                </p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  Average 120ms
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
