"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Clock,
  Shield,
  RotateCcw,
  Download,
  AlertTriangle,
} from "lucide-react";

export default function BackupRestorePage() {
  const [enableScheduled, setEnableScheduled] = useState(true);
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState("02:00");

  const backups = [
    {
      id: "1",
      timestamp: "2026-02-01 14:30:00",
      size: "2.4 MB",
    },
    {
      id: "2",
      timestamp: "2026-01-31 14:30:00",
      size: "2.3 MB",
    },
    {
      id: "3",
      timestamp: "2026-01-30 14:30:00",
      size: "2.2 MB",
    },
    {
      id: "4",
      timestamp: "2026-01-29 14:30:00",
      size: "2.1 MB",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Backup & Restore
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Protect your workflows and configurations with automated backups.
          Restore any previous state with confidence.
        </p>
      </div>

      {/* Instant Backup Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle>Instant Backup</CardTitle>
              <CardDescription>
                Create a snapshot of your current configuration
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            Create a snapshot of your current configuration and all workflow
            data. Perfect before making major changes.
          </p>
          <Button className="w-full" size="lg">
            <Shield className="mr-2 h-4 w-4" />
            Create Backup Now
          </Button>
        </CardContent>
      </Card>

      {/* Scheduled Backups Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <CardTitle>Scheduled Backups</CardTitle>
              <CardDescription>
                Automatically backup at specified intervals
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                Enable Scheduled Backups
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Automatically backup at specified intervals
              </p>
            </div>
            <button
              onClick={() => setEnableScheduled(!enableScheduled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enableScheduled ? "bg-blue-600" : "bg-zinc-300 dark:bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enableScheduled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Schedule Settings */}
          {enableScheduled && (
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time (24h format)</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              <Button variant="outline" className="w-full">
                Save Schedule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Restore Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950/20 flex items-center justify-center">
              <RotateCcw className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <CardTitle>Restore</CardTitle>
              <CardDescription>
                Restore a previous backup of your configuration
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Warning Alert */}
          <Alert
            variant="default"
            className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/20"
          >
            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            <AlertDescription className="text-orange-900 dark:text-orange-100">
              <span className="font-semibold">Restore with care:</span>{" "}
              Restoring a backup will replace your current configuration. Your
              existing setup will be preserved in a new automatic backup before
              restoration.
            </AlertDescription>
          </Alert>

          {/* Backup List */}
          <div className="space-y-3">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Download className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {backup.timestamp}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {backup.size}
                    </p>
                  </div>
                </div>
                <Button size="sm">Restore</Button>
              </div>
            ))}

            {backups.length === 0 && (
              <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
                <Download className="h-10 w-10 text-zinc-400 mx-auto mb-3" />
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No backups available
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
