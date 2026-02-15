"use client";

import { useState } from "react";
import {
  ShieldCheckIcon,
  ClockIcon,
  ArrowPathIcon,
  CloudArrowDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArchiveBoxIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  CalendarDaysIcon,
  ServerStackIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

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
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  // Mock data - replace with actual API call
  const backups: Backup[] = [
    {
      id: "backup_1",
      timestamp: "2 hours ago",
      date: "2026-02-08 14:30:00",
      size: "2.4 MB",
      type: "manual",
      status: "completed",
      itemsCount: 124,
    },
    {
      id: "backup_2",
      timestamp: "1 day ago",
      date: "2026-02-07 02:00:00",
      size: "2.3 MB",
      type: "scheduled",
      status: "completed",
      itemsCount: 122,
    },
    {
      id: "backup_3",
      timestamp: "2 days ago",
      date: "2026-02-06 02:00:00",
      size: "2.2 MB",
      type: "scheduled",
      status: "completed",
      itemsCount: 120,
    },
    {
      id: "backup_4",
      timestamp: "3 days ago",
      date: "2026-02-05 15:45:00",
      size: "2.1 MB",
      type: "manual",
      status: "completed",
      itemsCount: 118,
    },
    {
      id: "backup_5",
      timestamp: "4 days ago",
      date: "2026-02-04 02:00:00",
      size: "2.0 MB",
      type: "scheduled",
      status: "completed",
      itemsCount: 115,
    },
  ];

  const stats = {
    totalBackups: backups.length,
    totalSize: "11.0 MB",
    lastBackup: "2 hours ago",
    nextScheduled: enableScheduled ? "Tomorrow at " + time : "Not scheduled",
  };

  const getBackupTypeColor = (type: string) => {
    switch (type) {
      case "manual":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "scheduled":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "auto":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);
    // Simulate backup creation
    setTimeout(() => {
      setIsCreatingBackup(false);
    }, 2000);
  };

  const handleRestore = (backup: Backup) => {
    setSelectedBackup(backup);
    setShowRestoreModal(true);
  };

  const confirmRestore = () => {
    // Handle restore logic here
    setShowRestoreModal(false);
    setSelectedBackup(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Backup & Restore
          </h1>
          <p className="text-zinc-400 text-sm">
            Protect your data with automated backups and restore previous states
          </p>
        </div>
        <Button
          onClick={handleCreateBackup}
          disabled={isCreatingBackup}
          size="lg"
        >
          {isCreatingBackup ? (
            <>
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <ShieldCheckIcon className="h-5 w-5" />
              Create Backup
            </>
          )}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <ArchiveBoxIcon className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">
            Total Backups
          </p>
          <p className="text-3xl font-bold text-white">{stats.totalBackups}</p>
          <p className="text-xs text-zinc-500 mt-2">Available snapshots</p>
        </div>

        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <ServerStackIcon className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">Total Size</p>
          <p className="text-3xl font-bold text-white">{stats.totalSize}</p>
          <p className="text-xs text-zinc-500 mt-2">Storage used</p>
        </div>

        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">Last Backup</p>
          <p className="text-xl font-bold text-white">{stats.lastBackup}</p>
          <p className="text-xs text-zinc-500 mt-2">Most recent</p>
        </div>

        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <ClockIcon className="h-6 w-6 text-amber-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">
            Next Scheduled
          </p>
          <p className="text-base font-bold text-white">
            {stats.nextScheduled}
          </p>
          <p className="text-xs text-zinc-500 mt-2">Auto backup</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Instant Backup Card */}
        <div className="bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <ShieldCheckIcon className="h-7 w-7 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Instant Backup</h3>
              <p className="text-xs text-zinc-400">Create snapshot now</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            Create an immediate backup of your current configuration, workflows,
            and data. Perfect before making major changes.
          </p>
          <Button
            onClick={handleCreateBackup}
            disabled={isCreatingBackup}
            variant="outline"
            className="w-full justify-center"
          >
            {isCreatingBackup ? (
              <>
                <ArrowPathIcon className="h-5 w-5 animate-spin" />
                Creating Backup...
              </>
            ) : (
              <>
                <ShieldCheckIcon className="h-5 w-5" />
                Create Now
              </>
            )}
          </Button>
        </div>

        {/* Scheduled Backups Card */}
        <div className="bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <CalendarDaysIcon className="h-7 w-7 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Scheduled Backups
              </h3>
              <p className="text-xs text-zinc-400">Automatic backups</p>
            </div>
          </div>

          {/* Enable Toggle */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/50 border border-zinc-800 mb-4">
            <div>
              <p className="text-sm font-semibold text-white">Enable</p>
              <p className="text-xs text-zinc-500">Auto backups</p>
            </div>
            <button
              onClick={() => setEnableScheduled(!enableScheduled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all shadow-lg ${
                enableScheduled ? "bg-green-600" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md ${
                  enableScheduled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Schedule Settings */}
          {enableScheduled && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Time (24h)
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>

              <button className="w-full px-4 py-2.5 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 hover:border-green-500/40 rounded-lg text-green-400 font-medium transition-all text-sm">
                Save Schedule
              </button>
            </div>
          )}
        </div>

        {/* Storage Info Card */}
        <div className="bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <ChartBarIcon className="h-7 w-7 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Storage Info</h3>
              <p className="text-xs text-zinc-400">Usage details</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Used Storage</span>
                <span className="text-sm font-bold text-white">
                  11.0 MB / 100 MB
                </span>
              </div>
              <div className="h-2 bg-zinc-800/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-purple-600 to-purple-500"
                  style={{ width: "11%" }}
                ></div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Manual Backups</span>
                <span className="text-xs font-semibold text-zinc-300">
                  2 (4.5 MB)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Scheduled Backups</span>
                <span className="text-xs font-semibold text-zinc-300">
                  3 (6.5 MB)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Average Size</span>
                <span className="text-xs font-semibold text-zinc-300">
                  2.2 MB
                </span>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2.5 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 hover:border-purple-500/40 rounded-lg text-purple-400 font-medium transition-all text-sm">
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl shadow-xl">
        <div className="px-6 py-5 border-b border-zinc-800/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Backup History</h2>
              <p className="text-sm text-zinc-400 mt-1">
                View and restore previous backups
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 text-sm font-medium hover:bg-zinc-800 hover:text-white transition-all">
              <TrashIcon className="h-4 w-4 inline mr-2" />
              Clear Old Backups
            </button>
          </div>
        </div>

        {/* Warning Alert */}
        <div className="mx-6 mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300">
              Restore with Caution
            </p>
            <p className="text-xs text-amber-400/80 mt-1">
              Restoring a backup will replace your current configuration. A new
              automatic backup will be created before restoration.
            </p>
          </div>
        </div>

        <div className="p-6">
          {backups.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-20 w-20 rounded-2xl bg-zinc-800/30 border border-zinc-700/50 flex items-center justify-center mx-auto mb-4">
                <ArchiveBoxIcon className="h-10 w-10 text-zinc-600" />
              </div>
              <p className="text-zinc-500 text-sm">No backups available</p>
            </div>
          ) : (
            <div className="space-y-3">
              {backups.map((backup) => (
                <div
                  key={backup.id}
                  className="group flex items-center justify-between p-5 bg-zinc-950/30 border border-zinc-800/50 rounded-xl hover:bg-zinc-950/50 hover:border-zinc-700/50 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <CloudArrowDownIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-white">
                          {backup.date}
                        </p>
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getBackupTypeColor(
                            backup.type,
                          )}`}
                        >
                          {backup.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-zinc-500">
                        <span>{backup.timestamp}</span>
                        <span>•</span>
                        <span>{backup.size}</span>
                        <span>•</span>
                        <span>{backup.itemsCount} items</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-lg text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition-all">
                      <DocumentDuplicateIcon className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleRestore(backup)}
                      className="ml-2 px-4 py-2 rounded-lg bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 hover:border-green-500/40 text-green-400 font-semibold transition-all text-sm flex items-center gap-2"
                    >
                      <ArrowPathIcon className="h-4 w-4" />
                      Restore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Restore Confirmation Modal */}
      {showRestoreModal && selectedBackup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <ExclamationTriangleIcon className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Confirm Restore
                  </h3>
                  <p className="text-sm text-zinc-400 mt-0.5">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-zinc-300">
                You are about to restore the backup from:
              </p>
              <div className="p-4 rounded-xl bg-zinc-950/50 border border-zinc-800">
                <p className="font-semibold text-white mb-2">
                  {selectedBackup.date}
                </p>
                <div className="text-xs text-zinc-500 space-y-1">
                  <p>Size: {selectedBackup.size}</p>
                  <p>Items: {selectedBackup.itemsCount}</p>
                  <p>Type: {selectedBackup.type}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-xs text-amber-300">
                  Your current configuration will be backed up automatically
                  before restoration.
                </p>
              </div>
            </div>

            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={confirmRestore}
                className="flex-1 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-500 transition-all"
              >
                Confirm Restore
              </button>
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-5 py-3 rounded-xl bg-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-700 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
