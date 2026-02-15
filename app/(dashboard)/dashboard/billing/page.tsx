"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Billing() {
  const invoices = [
    {
      id: "INV-001",
      date: "2024-02-10",
      amount: 49.99,
      status: "paid",
      product: "Lead Enrichment Workflow",
    },
    {
      id: "INV-002",
      date: "2024-01-28",
      amount: 29.99,
      status: "paid",
      product: "Email Marketing Automation",
    },
    {
      id: "INV-003",
      date: "2024-01-15",
      amount: 39.99,
      status: "paid",
      product: "Social Media Scheduler",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Billing & Invoices
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Payment history and invoices
        </p>
      </div>

      {/* Billing Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Total Spent
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              $119.97
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Active Subscriptions
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              3
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
              Last Payment
            </p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">
              $49.99
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Recent Invoices
        </h3>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {invoice.product}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {invoice.id} • {new Date(invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        ${invoice.amount}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
