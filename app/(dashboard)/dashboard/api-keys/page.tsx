"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Eye, KeyRound, Plus, ShieldCheck, Sparkles, Trash2 } from "lucide-react";

export default function APIKeys() {
  const apiKeys = [
    {
      id: 1,
      name: "Production Key",
      key: "sk_live_51234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Testing Key",
      key: "sk_test_abcdef1234567890",
      created: "2024-01-10",
      lastUsed: "5 days ago",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-cyan-50/50 to-blue-50/70 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-blue-400/15 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Integration Access
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              API Keys
            </h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Create and manage API credentials for secure automation integrations.
            </p>
          </div>

          <Button className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Create New Key
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="border-blue-200 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-900/40">
                <KeyRound className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Total Keys</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{apiKeys.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2.5 dark:bg-emerald-900/40">
                <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Active</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-violet-50/60 dark:border-violet-900/40 dark:bg-violet-950/20">
          <CardContent className="p-5">
            <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Rotation Policy</p>
            <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">Every 90 days</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Recommended for production security.</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id}>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{apiKey.name}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Created {apiKey.created}</p>
                  </div>
                  <Badge variant="outline" className="capitalize text-emerald-700 dark:text-emerald-300">
                    {apiKey.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 font-mono text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <span>••••••••••••••••{apiKey.key.slice(-8)}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Last used: {apiKey.lastUsed}</span>
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg text-red-600 dark:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
