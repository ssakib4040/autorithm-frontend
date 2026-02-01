"use client";

import { useState } from "react";
import {
  ClockIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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
      <div className="border-b border-zinc-800/50 pb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Backup & Restore</h1>
        <p className="text-zinc-400 text-sm">
          Protect your workflows and configurations with automated backups.
          Restore any previous state with confidence.
        </p>
      </div>

      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <ShieldCheckIcon className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Instant Backup</h2>
        </div>

        <p className="text-sm text-zinc-400 mb-6">
          Create a snapshot of your current configuration and all workflow data.
          Perfect before making major changes.
        </p>

        <button className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-600/20">
          Create Backup Now
        </button>
      </div>

      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <ClockIcon className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Scheduled Backups
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
            <div>
              <p className="text-sm font-medium text-white">
                Enable Scheduled Backups
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Automatically backup at specified intervals
              </p>
            </div>
            <button
              onClick={() => setEnableScheduled(!enableScheduled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enableScheduled ? "bg-blue-600" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enableScheduled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {enableScheduled && (
            <>
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Frequency
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Time (24h)
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <ArrowPathIcon className="h-5 w-5 text-amber-400" />
          </div>
          <h2 className="text-lg font-semibold text-white">Restore</h2>
        </div>

        <div className="flex items-start gap-3 p-4 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <div className="h-5 w-5 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-xs text-white font-bold">!</span>
          </div>
          <div>
            <p className="text-sm font-medium text-amber-200">
              Restore with care
            </p>
            <p className="text-xs text-amber-300/70 mt-1">
              Restoring a backup will replace your current configuration. Your
              existing setup will be preserved in a new automatic backup before
              restoration.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {backups.map((backup) => (
            <div
              key={backup.id}
              className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800/30 rounded-xl hover:border-zinc-700/50 transition-all"
            >
              <div>
                <p className="text-sm font-medium text-white">
                  {backup.timestamp}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">{backup.size}</p>
              </div>
              <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-500 transition-colors">
                Restore
              </button>
            </div>
          ))}
        </div>

        {backups.length === 0 && (
          <div className="text-center py-8">
            <p className="text-sm text-zinc-500">No backups available</p>
          </div>
        )}
      </div>
    </div>
  );
}
