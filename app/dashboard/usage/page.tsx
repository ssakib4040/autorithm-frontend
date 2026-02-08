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
  BarChart3,
  TrendingUp,
  Activity,
  Zap,
  Clock,
  Calendar,
  Download,
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Usage Analytics
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Monitor workflow performance and resource consumption
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            This Month
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Total Executions
            </CardTitle>
            <Activity className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              3,483
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Success Rate
            </CardTitle>
            <Zap className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              98.7%
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +2.3% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Avg Execution Time
            </CardTitle>
            <Clock className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              2.4s
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              -0.3s faster than avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Active Workflows
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              12
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              8 running now
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Workflows */}
      <Card>
        <CardHeader>
          <CardTitle>Top Workflows by Executions</CardTitle>
          <CardDescription>
            Most frequently executed workflows this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topWorkflows.map((workflow, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 font-bold text-sm">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {workflow.name}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-zinc-600 dark:text-zinc-400">
                        {workflow.executions.toLocaleString()} executions
                      </span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        {workflow.success}% success
                      </span>
                    </div>
                  </div>
                </div>
                <div className="h-2 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${workflow.success}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Execution Trends</CardTitle>
          <CardDescription>
            Workflow executions over the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-zinc-400 mx-auto mb-3" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Chart visualization coming soon
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
