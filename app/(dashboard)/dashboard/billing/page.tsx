"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CreditCard, Download, Receipt, Sparkles } from "lucide-react";

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

  const totalSpent = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const lastPayment = invoices[0]?.amount ?? 0;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-emerald-50/60 to-cyan-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-emerald-400/15 blur-3xl" />

        <div className="relative">
          <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Payments
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Billing & Invoices
          </h1>
          <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Review payment history, track invoice records, and download receipts.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2.5 dark:bg-emerald-900/40">
                <Receipt className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Total Spent</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">${totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-900/40">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Invoices</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-violet-50/60 dark:border-violet-900/40 dark:bg-violet-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-violet-100 p-2.5 dark:bg-violet-900/40">
                <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Last Payment</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">${lastPayment.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Invoices</h2>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {invoice.product}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {invoice.id} • {new Date(invoice.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        ${invoice.amount.toFixed(2)}
                      </p>
                      <Badge variant="outline" className="mt-1 text-[11px] capitalize text-emerald-700 dark:text-emerald-300">
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="icon" className="rounded-lg" aria-label={`Download ${invoice.id}`}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
