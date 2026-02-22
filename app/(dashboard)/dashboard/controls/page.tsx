"use client";

import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Clock, Layers3, Plus, Search, SlidersHorizontal, Sparkles } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "archived";
  blocksCount: number;
  lastModified: string;
  environment: "development" | "staging" | "production";
}

export default function ControlsProjectList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const projects: Project[] = [
    { id: "proj_1", name: "Main Application", description: "Primary production app configuration", status: "active", blocksCount: 24, lastModified: "2 hours ago", environment: "production" },
    { id: "proj_2", name: "Mobile App Config", description: "Mobile settings and runtime variables", status: "active", blocksCount: 18, lastModified: "1 day ago", environment: "production" },
    { id: "proj_3", name: "Beta Features", description: "Experimental features configuration", status: "active", blocksCount: 12, lastModified: "3 days ago", environment: "staging" },
    { id: "proj_4", name: "Development Testing", description: "Development environment setup", status: "active", blocksCount: 8, lastModified: "5 days ago", environment: "development" },
    { id: "proj_5", name: "Legacy System", description: "Archived older configuration", status: "archived", blocksCount: 32, lastModified: "2 weeks ago", environment: "production" },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: projects.length,
    active: projects.filter((p) => p.status === "active").length,
    totalBlocks: projects.reduce((sum, p) => sum + p.blocksCount, 0),
  };

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-violet-50/50 to-blue-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-violet-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Config Manager
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Project Controls</h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Manage structured configuration blocks across projects.</p>
          </div>
          <Button asChild className="rounded-xl">
            <Link href="/dashboard/controls/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Total Projects</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.total}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Active Projects</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.active}</p></CardContent></Card>
        <Card><CardContent className="p-5"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Total Blocks</p><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{stats.totalBlocks}</p></CardContent></Card>
      </section>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search projects..." className="h-10 rounded-xl pl-9" />
            </div>
            <div className="flex gap-2">
              {["all", "active", "inactive", "archived"].map((status) => (
                <Button key={status} size="sm" variant={filterStatus === status ? "default" : "outline"} onClick={() => setFilterStatus(status)} className="rounded-lg capitalize">
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {filteredProjects.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-sm text-zinc-600 dark:text-zinc-400">No projects found for the current search/filter.</CardContent></Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link key={project.id} href={`/dashboard/controls/${project.id}`}>
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:shadow-md">
                <CardContent className="p-5">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950/20">
                      <SlidersHorizontal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <Badge variant="outline" className="capitalize">{project.status}</Badge>
                  </div>

                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{project.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">{project.description}</p>

                  <div className="mt-4 space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="inline-flex items-center gap-1.5"><Layers3 className="h-3.5 w-3.5" />{project.blocksCount} blocks</div>
                    <div className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{project.lastModified}</div>
                    <div className="inline-flex items-center gap-1.5"><Sparkles className="h-3.5 w-3.5" />{project.environment}</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}
