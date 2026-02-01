"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function ConfigPage() {
  const [mode, setMode] = useState("basic");
  const [enableProcessing, setEnableProcessing] = useState(true);
  const [safeMode, setSafeMode] = useState(true);
  const [strategy, setStrategy] = useState("balanced");
  const [threshold, setThreshold] = useState(65);
  const [maxItems, setMaxItems] = useState(1000);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "deduplication",
    "enrichment",
  ]);

  const features = [
    { id: "deduplication", label: "Deduplication" },
    { id: "enrichment", label: "Enrichment" },
    { id: "scoring", label: "Scoring" },
    { id: "validation", label: "Validation" },
    { id: "transformation", label: "Transformation" },
  ];

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId],
    );
  };

  const requestsUsed = 340000;
  const requestsTotal = 1000000;
  const usagePercent = (requestsUsed / requestsTotal) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Workflow Configuration
        </h1>
        <p className="text-zinc-400">
          Configure how your automation workflows process data and interact with
          external systems. These settings control behavior across all active
          workflows.
        </p>
      </div>

      {/* General Settings */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-6">
          General Settings
        </h2>

        <div className="space-y-6">
          {/* Mode Dropdown */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Mode
            </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="basic">Basic</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Toggle Switches */}
          <div className="flex items-center justify-between py-3 border-b border-zinc-800">
            <div>
              <p className="text-sm font-medium text-white">
                Enable Processing
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Allow workflows to process incoming data
              </p>
            </div>
            <button
              onClick={() => setEnableProcessing(!enableProcessing)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                enableProcessing ? "bg-blue-600" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  enableProcessing ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-white">Safe Mode</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Enable additional validation and safety checks
              </p>
            </div>
            <button
              onClick={() => setSafeMode(!safeMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                safeMode ? "bg-blue-600" : "bg-zinc-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  safeMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Processing Rules */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-6">
          Processing Rules
        </h2>

        <div className="space-y-6">
          {/* Strategy Dropdown */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Strategy
            </label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="balanced">Balanced</option>
              <option value="aggressive">Aggressive</option>
              <option value="custom">Custom</option>
            </select>
            <p className="text-xs text-zinc-500 mt-2">
              Balanced offers optimal speed and reliability
            </p>
          </div>

          {/* Threshold Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-zinc-300">
                Threshold
              </label>
              <span className="text-sm font-semibold text-blue-400">
                {threshold}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(37, 99, 235) ${threshold}%, rgb(39, 39, 42) ${threshold}%, rgb(39, 39, 42) 100%)`,
              }}
            />
            <p className="text-xs text-zinc-500 mt-2">
              Minimum confidence level for processing items
            </p>
          </div>

          {/* Multi-select Features */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-3">
              Features
            </label>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature) => {
                const isSelected = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-blue-600/20 border-blue-500 text-blue-300"
                        : "bg-zinc-950 border-zinc-700 text-zinc-400 hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded border-2 flex items-center justify-center ${
                          isSelected
                            ? "bg-blue-600 border-blue-600"
                            : "border-zinc-600"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                      {feature.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Limits */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-6">Limits</h2>

        <div className="space-y-6">
          {/* Max Items Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Max Items Per Run
            </label>
            <input
              type="number"
              value={maxItems}
              onChange={(e) => setMaxItems(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-700 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="1000"
            />
            <p className="text-xs text-zinc-500 mt-2">
              Maximum number of items to process in a single workflow execution
            </p>
          </div>

          {/* Usage Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-zinc-300">
                Requests Used
              </label>
              <span className="text-sm font-mono text-zinc-400">
                {requestsUsed.toLocaleString()} /{" "}
                {requestsTotal.toLocaleString()}
              </span>
            </div>
            <div className="relative w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                style={{ width: `${usagePercent}%` }}
              ></div>
            </div>
            <p className="text-xs text-zinc-500 mt-2">
              {(100 - usagePercent).toFixed(1)}% remaining in current billing
              period
            </p>
          </div>
        </div>
      </section>

      {/* Advanced */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800/50 transition-colors"
        >
          <h2 className="text-lg font-semibold text-white">
            Advanced Configuration
          </h2>
          {advancedOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-zinc-400" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-zinc-400" />
          )}
        </button>

        {advancedOpen && (
          <div className="px-6 pb-6 border-t border-zinc-800">
            <div className="mt-6 space-y-4">
              {/* Warning */}
              <div className="flex gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-200">
                    Advanced users only
                  </p>
                  <p className="text-xs text-amber-300/70 mt-1">
                    Modifying these settings may affect workflow stability.
                    Ensure you understand the implications before making
                    changes.
                  </p>
                </div>
              </div>

              {/* Code Editor */}
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Custom Configuration (JSON)
                </label>
                <textarea
                  className="w-full h-64 px-4 py-3 rounded-lg bg-zinc-950 border border-zinc-700 text-zinc-300 font-mono text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter custom JSON configuration..."
                  defaultValue={`{
  "apiVersion": "v2",
  "timeout": 30000,
  "retryStrategy": {
    "maxAttempts": 3,
    "backoff": "exponential"
  },
  "webhooks": {
    "enabled": true,
    "endpoints": []
  },
  "errorHandling": {
    "failOnError": false,
    "continueOnPartialFailure": true
  }
}`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">
                  Validate & Save
                </button>
                <button className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium transition-colors">
                  Reset to Default
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-6">
        <p className="text-sm text-zinc-500">Changes are saved automatically</p>
        <button className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors shadow-lg shadow-blue-600/20">
          Apply Configuration
        </button>
      </div>
    </div>
  );
}
