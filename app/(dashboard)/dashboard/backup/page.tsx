"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Archive,
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface Backup {
  id: string;
  timestamp: string;
  date: string;
  size: string;
  type: "manual" | "scheduled" | "auto";
  status: "completed" | "in-progress" | "failed";
  itemsCount: number;
}

export default function BackupRestorePage() {
  const [enableScheduled, setEnableScheduled] = useState(true);
  const [frequency, setFrequency] = useState("daily");
  const [time, setTime] = useState("02:00");
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  const backups: Backup[] = [
    { id: "backup_1", timestamp: "2 hours ago", date: "2026-02-08 14:30:00", size: "2.4 MB", type: "manual", status: "completed", itemsCount: 124 },
    { id: "backup_2", timestamp: "1 day ago", date: "2026-02-07 02:00:00", size: "2.3 MB", type: "scheduled", status: "completed", itemsCount: 122 },
    { id: "backup_3", timestamp: "2 days ago", date: "2026-02-06 02:00:00", size: "2.2 MB", type: "scheduled", status: "completed", itemsCount: 120 },
  ];

  const stats = {
    totalBackups: backups.length,
    totalSize: "11.0 MB",
    lastBackup: "2 hours ago",
    nextScheduled: enableScheduled ? `Tomorrow at ${time}` : "Not scheduled",
  };

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    setTimeout(() => setIsCreatingBackup(false), 1500);
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-emerald-50/60 to-cyan-50/50 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Data Safety
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Backup & Restore</h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Protect configuration data with snapshots and scheduled backups.</p>
          </div>
          <Button onClick={handleCreateBackup} disabled={isCreatingBackup} className="rounded-xl">
            {isCreatingBackup ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            {isCreatingBackup ? "Creating..." : "Create Backup"}
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Total Backups</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.totalBackups}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Storage Used</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.totalSize}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Last Backup</p><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{stats.lastBackup}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Next Scheduled</p><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{stats.nextScheduled}</p></CardContent></Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-5 space-y-3">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Available Backups</h3>
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{backup.id}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{backup.timestamp} • {backup.size} • {backup.itemsCount} items</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="capitalize">{backup.type}</Badge>
                  <Badge variant="outline" className="capitalize text-emerald-700 dark:text-emerald-300">{backup.status}</Badge>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" aria-label="Download backup">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" aria-label="Restore backup">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-4">
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Schedule</h3>
            <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Enable Backups</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Automatic snapshots</p>
              </div>
              <button
                onClick={() => setEnableScheduled((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${enableScheduled ? "bg-emerald-600" : "bg-zinc-400 dark:bg-zinc-700"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${enableScheduled ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>

            <div>
              <label className="mb-1 block text-xs text-zinc-500 dark:text-zinc-400">Frequency</label>
              <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs text-zinc-500 dark:text-zinc-400">Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-900" />
            </div>

            <Button variant="outline" className="w-full rounded-lg">Save Schedule</Button>
          </CardContent>
        </Card>
      </section>

      <Card className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <CardContent className="p-4 flex items-center gap-2 text-sm text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="h-4 w-4" />
          <Archive className="h-4 w-4" />
          <Clock className="h-4 w-4" />
          <CalendarDays className="h-4 w-4" />
          Backup integrity checks are currently healthy.
        </CardContent>
      </Card>
    </div>
  );
}
