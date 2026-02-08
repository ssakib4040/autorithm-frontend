"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

export default function EditProductPage() {
  // Mock data - in production, this would come from API/database
  const [keyFeatures, setKeyFeatures] = useState([
    "Automated company research via public APIs and AI analysis",
    "Contact enrichment with job titles and social profiles",
    "Lead scoring based on configurable criteria",
  ]);
  const [howItWorks, setHowItWorks] = useState([
    {
      title: "Lead Capture",
      description:
        "New leads from forms, ads, or CRM triggers enter the workflow",
    },
    {
      title: "Company Research",
      description:
        "AI gathers firmographic data, funding info, and tech stack details",
    },
  ]);
  const [apis, setApis] = useState([
    "OpenAI GPT-4",
    "Clearbit API",
    "HubSpot API",
  ]);
  const [requirements, setRequirements] = useState([
    "You have API access to your CRM",
    "You have an OpenAI or similar AI API key",
  ]);
  const [whatsIncluded, setWhatsIncluded] = useState([
    "Complete n8n workflow (JSON export)",
    "AI prompt templates for lead enrichment",
    "30 days of implementation support",
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Edit Product
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Update your automation workflow details
          </p>
        </div>
      </div>

      <form className="space-y-6">
        {/* Basic Information */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                defaultValue="AI Lead Enrichment System"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Description *
              </label>
              <textarea
                rows={4}
                required
                defaultValue="Transform raw leads into actionable prospects with AI-powered research. Automatically enrich company data, find decision-makers, score leads based on your ICP, and sync everything to your CRM—so your sales team focuses on qualified opportunities."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-zinc-500 mt-1">
                Describe what your automation does and the value it provides
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Tool *
                </label>
                <select
                  required
                  defaultValue="n8n"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select tool</option>
                  <option value="n8n">n8n</option>
                  <option value="Make">Make</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Category *
                </label>
                <select
                  required
                  defaultValue="CRM"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select category</option>
                  <option value="CRM">CRM</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Operations">Operations</option>
                  <option value="Support">Support</option>
                  <option value="Analytics">Analytics</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  defaultValue="149.00"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Slug *
                </label>
                <input
                  type="text"
                  required
                  defaultValue="ai-lead-enrichment-system"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Status *
                </label>
                <select
                  required
                  defaultValue="active"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Key Features</h2>
            <button
              type="button"
              onClick={() => setKeyFeatures([...keyFeatures, ""])}
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              Add Feature
            </button>
          </div>
          <div className="space-y-3">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => {
                    const updated = [...keyFeatures];
                    updated[index] = e.target.value;
                    setKeyFeatures(updated);
                  }}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Automated company research via public APIs..."
                />
                {keyFeatures.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setKeyFeatures(keyFeatures.filter((_, i) => i !== index))
                    }
                    className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">How It Works</h2>
            <button
              type="button"
              onClick={() =>
                setHowItWorks([...howItWorks, { title: "", description: "" }])
              }
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              Add Step
            </button>
          </div>
          <div className="space-y-4">
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-400">
                    Step {index + 1}
                  </span>
                  {howItWorks.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        setHowItWorks(howItWorks.filter((_, i) => i !== index))
                      }
                      className="text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const updated = [...howItWorks];
                    updated[index].title = e.target.value;
                    setHowItWorks(updated);
                  }}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Step title (e.g., Lead Capture)"
                />
                <textarea
                  rows={2}
                  value={step.description}
                  onChange={(e) => {
                    const updated = [...howItWorks];
                    updated[index].description = e.target.value;
                    setHowItWorks(updated);
                  }}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Step description..."
                />
              </div>
            ))}
          </div>
        </div>

        {/* Technical Details */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Technical Details
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Complexity
                </label>
                <select
                  defaultValue="Intermediate"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Setup Time
                </label>
                <input
                  type="text"
                  defaultValue="2-4 hours"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                APIs Required
              </label>
              <div className="space-y-3">
                {apis.map((api, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={api}
                      onChange={(e) => {
                        const updated = [...apis];
                        updated[index] = e.target.value;
                        setApis(updated);
                      }}
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="OpenAI GPT-4"
                    />
                    {apis.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setApis(apis.filter((_, i) => i !== index))
                        }
                        className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setApis([...apis, ""])}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  + Add API
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Requirements
              </label>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={req}
                      onChange={(e) => {
                        const updated = [...requirements];
                        updated[index] = e.target.value;
                        setRequirements(updated);
                      }}
                      className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                      placeholder="You have API access to your CRM"
                    />
                    {requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          setRequirements(
                            requirements.filter((_, i) => i !== index),
                          )
                        }
                        className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setRequirements([...requirements, ""])}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  + Add Requirement
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included */}
        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              What&apos;s Included
            </h2>
            <button
              type="button"
              onClick={() => setWhatsIncluded([...whatsIncluded, ""])}
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <PlusIcon className="h-4 w-4" />
              Add Item
            </button>
          </div>
          <div className="space-y-3">
            {whatsIncluded.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updated = [...whatsIncluded];
                    updated[index] = e.target.value;
                    setWhatsIncluded(updated);
                  }}
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Complete n8n workflow (JSON export)"
                />
                {whatsIncluded.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setWhatsIncluded(
                        whatsIncluded.filter((_, i) => i !== index),
                      )
                    }
                    className="p-2.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex gap-3">
            <InformationCircleIcon className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-blue-300">
                Changes will be saved immediately. Make sure to review all
                fields before saving.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
