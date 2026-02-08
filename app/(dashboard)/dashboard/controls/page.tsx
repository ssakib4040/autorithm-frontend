"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  CubeIcon,
  Square3Stack3DIcon,
  ClockIcon,
  CheckCircleIcon,
  AdjustmentsHorizontalIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "archived";
  blocksCount: number;
  lastModified: string;
  createdAt: string;
  environment: "development" | "staging" | "production";
}

export default function ControlsProjectList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showProjectMenu, setShowProjectMenu] = useState<string | null>(null);

  // Mock data - replace with actual API call
  const projects: Project[] = [
    {
      id: "proj_1",
      name: "Main Application",
      description: "Primary production application configuration",
      status: "active",
      blocksCount: 24,
      lastModified: "2 hours ago",
      createdAt: "2024-01-15",
      environment: "production",
    },
    {
      id: "proj_2",
      name: "Mobile App Config",
      description: "Mobile application settings and parameters",
      status: "active",
      blocksCount: 18,
      lastModified: "1 day ago",
      createdAt: "2024-02-01",
      environment: "production",
    },
    {
      id: "proj_3",
      name: "Beta Features",
      description: "Experimental features configuration",
      status: "active",
      blocksCount: 12,
      lastModified: "3 days ago",
      createdAt: "2024-02-05",
      environment: "staging",
    },
    {
      id: "proj_4",
      name: "Development Testing",
      description: "Development environment configuration",
      status: "active",
      blocksCount: 8,
      lastModified: "5 days ago",
      createdAt: "2024-01-20",
      environment: "development",
    },
    {
      id: "proj_5",
      name: "Legacy System",
      description: "Old system configuration (archived)",
      status: "archived",
      blocksCount: 32,
      lastModified: "2 weeks ago",
      createdAt: "2023-12-01",
      environment: "production",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    totalBlocks: projects.reduce((sum, p) => sum + p.blocksCount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "inactive":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      case "archived":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "production":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "staging":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "development":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Project Controls
          </h1>
          <p className="text-zinc-400 text-sm">
            Manage configuration structures for your projects
          </p>
        </div>
        <Link
          href="/dashboard/controls/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-600/25"
        >
          <PlusIcon className="h-5 w-5" />
          New Project
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <CubeIcon className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">
            Total Projects
          </p>
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-xs text-zinc-500 mt-2">All configurations</p>
        </div>

        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <CheckCircleIcon className="h-6 w-6 text-green-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">
            Active Projects
          </p>
          <p className="text-3xl font-bold text-white">{stats.active}</p>
          <p className="text-xs text-zinc-500 mt-2">Currently in use</p>
        </div>

        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Square3Stack3DIcon className="h-6 w-6 text-purple-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">Total Blocks</p>
          <p className="text-3xl font-bold text-white">{stats.totalBlocks}</p>
          <p className="text-xs text-zinc-500 mt-2">Across all projects</p>
        </div>

        <div className="bg-linear-to-br from-zinc-900 to-zinc-900/50 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <ClockIcon className="h-6 w-6 text-amber-400" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-medium mb-1">Last Update</p>
          <p className="text-xl font-bold text-white">2 hours ago</p>
          <p className="text-xs text-zinc-500 mt-2">Most recent change</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "inactive", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filterStatus === status
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-700/50"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="flex items-center justify-center py-32">
          <div className="text-center max-w-md">
            <div className="relative mx-auto mb-8">
              <div className="h-24 w-24 rounded-3xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-zinc-700/50 flex items-center justify-center mx-auto backdrop-blur-xl">
                <CubeIcon className="h-12 w-12 text-zinc-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {searchQuery || filterStatus !== "all"
                ? "No Projects Found"
                : "No Projects Yet"}
            </h2>
            <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
              {searchQuery || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Create your first project to get started with configuration management"}
            </p>
            {!searchQuery && filterStatus === "all" && (
              <Link
                href="/dashboard/controls/new"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-xl shadow-blue-600/25"
              >
                <PlusIcon className="h-5 w-5" />
                Create First Project
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-zinc-700/50 transition-all"
            >
              <div className="p-6">
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-zinc-500 font-mono">
                        {project.id}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowProjectMenu(
                          showProjectMenu === project.id ? null : project.id,
                        )
                      }
                      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>
                    {showProjectMenu === project.id && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-10 py-2">
                        <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2">
                          <PencilIcon className="h-4 w-4" />
                          Edit Details
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2">
                          <DocumentDuplicateIcon className="h-4 w-4" />
                          Duplicate
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2">
                          <ArchiveBoxIcon className="h-4 w-4" />
                          Archive
                        </button>
                        <div className="my-2 h-px bg-zinc-800"></div>
                        <button className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2">
                          <TrashIcon className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-sm text-zinc-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Project Meta */}
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                      project.status,
                    )}`}
                  >
                    {project.status}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-medium border ${getEnvironmentColor(
                      project.environment,
                    )}`}
                  >
                    {project.environment}
                  </span>
                </div>

                {/* Project Stats */}
                <div className="flex items-center justify-between py-3 px-4 bg-zinc-950/50 rounded-xl mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">
                      {project.blocksCount}
                    </p>
                    <p className="text-xs text-zinc-500">Blocks</p>
                  </div>
                  <div className="h-8 w-px bg-zinc-800"></div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-zinc-300">
                      {project.lastModified}
                    </p>
                    <p className="text-xs text-zinc-500">Last modified</p>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/dashboard/config/${project.id}`}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 hover:border-blue-500/40 rounded-xl text-blue-400 font-medium transition-all group"
                >
                  <span className="text-sm">Configure Project</span>
                  <ChevronRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
