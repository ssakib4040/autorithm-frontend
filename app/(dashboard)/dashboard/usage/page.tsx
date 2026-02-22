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
  Activity,
  BarChart3,
  Calendar,
  Clock,
  Download,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function UsagePage() {
  const topWorkflows = [
    { name: "AI Lead Enrichment", executions: 1247, success: 98.5 },
    { name: "Social Media Scheduler", executions: 856, success: 99.2 },
    { name: "Email Campaign Automator", executions: 623, success: 97.8 },
    { name: "Customer Support Router", executions: 445, success: 99.5 },
    { name: "Invoice Generator", executions: 312, success: 100 },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-emerald-50/50 to-cyan-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Performance Insights
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Usage Analytics</h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Monitor execution volume, reliability, and workflow efficiency.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">
              <Calendar className="mr-2 h-4 w-4" />
              This Month
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[{
          title: "Total Executions",
          value: "3,483",
          note: "+12% from last month",
          icon: Activity,
        }, {
          title: "Success Rate",
          value: "98.7%",
          note: "+2.3% improvement",
          icon: Zap,
        }, {
          title: "Avg Runtime",
          value: "2.4s",
          note: "-0.3s faster",
          icon: Clock,
        }, {
          title: "Active Workflows",
          value: "12",
          note: "8 running now",
          icon: BarChart3,
        }].map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-zinc-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{metric.value}</div>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  {metric.note}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Top Workflows by Executions</CardTitle>
          <CardDescription>Most frequently executed workflows this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topWorkflows.map((workflow, index) => (
              <div key={workflow.name} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 p-3.5 dark:border-zinc-800">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-950/20 dark:text-blue-300">#{index + 1}</div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{workflow.name}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{workflow.executions.toLocaleString()} executions • {workflow.success}% success</p>
                  </div>
                </div>
                <div className="h-2 w-28 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div className="h-full bg-blue-500" style={{ width: `${workflow.success}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Execution Trends</CardTitle>
          <CardDescription>Workflow executions over the last 30 days.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-72 items-center justify-center rounded-lg border-2 border-dashed border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="text-center">
              <BarChart3 className="mx-auto mb-3 h-10 w-10 text-zinc-400" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Chart visualization coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
