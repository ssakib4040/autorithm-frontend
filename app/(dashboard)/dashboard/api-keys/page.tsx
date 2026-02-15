"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Trash2, Plus, Eye } from "lucide-react";

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
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          API Keys
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Manage your API credentials for integrations
        </p>
      </div>

      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Key
        </Button>
      </div>

      <div className="space-y-3">
        {apiKeys.map((apiKey) => (
          <Card key={apiKey.id}>
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {apiKey.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      Created {apiKey.created}
                    </p>
                  </div>
                  <Badge variant="outline">{apiKey.status}</Badge>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 font-mono text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                  <span>••••••••••••••••{apiKey.key.slice(-8)}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Last used: {apiKey.lastUsed}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
