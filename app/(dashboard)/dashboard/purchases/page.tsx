"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  DollarSign,
  Download,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Purchases() {
  const [searchQuery, setSearchQuery] = useState("");

  const purchases = [
    {
      id: 1,
      productName: "AI Lead Enrichment Workflow",
      tool: "n8n",
      category: "CRM",
      price: 29.99,
      date: "2024-02-10",
      downloadUrl: "#",
    },
    {
      id: 2,
      productName: "Email Marketing Automation",
      tool: "Make",
      category: "Marketing",
      price: 19.99,
      date: "2024-01-28",
      downloadUrl: "#",
    },
    {
      id: 3,
      productName: "Social Media Scheduler",
      tool: "n8n",
      category: "Social Media",
      price: 24.99,
      date: "2024-01-15",
      downloadUrl: "#",
    },
    {
      id: 4,
      productName: "Invoice Generator Pro",
      tool: "Make",
      category: "Finance",
      price: 34.99,
      date: "2024-01-05",
      downloadUrl: "#",
    },
  ];

  const totalSpent = purchases.reduce((sum, purchase) => sum + purchase.price, 0);

  const filteredPurchases = purchases.filter((purchase) =>
    purchase.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const latestPurchase = purchases.length > 0 ? purchases[0] : null;

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-blue-50/70 to-cyan-50/70 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-8 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Purchase Center
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              My Purchases
            </h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Manage purchased templates, revisit details, and access downloads quickly.
            </p>
          </div>

          <Button asChild className="rounded-xl">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Store
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-200 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-900/40">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Templates Owned
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {purchases.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-100 p-2.5 dark:bg-emerald-900/40">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Total Invested
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  ${totalSpent.toFixed(2)}
                </p>
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
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Latest Purchase
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {latestPurchase
                    ? new Date(latestPurchase.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <Input
              type="text"
              placeholder="Search purchased templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 rounded-xl border-zinc-200 bg-zinc-50 pl-10 dark:border-zinc-800 dark:bg-zinc-900"
            />
          </div>
        </CardContent>
      </Card>

      {filteredPurchases.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
              <ShoppingBag className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              No purchases found
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {searchQuery
                ? "Try adjusting your search terms."
                : "Start building your automation library."}
            </p>
            <Button asChild className="mt-5 rounded-xl">
              <Link href="/products">Explore Templates</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {filteredPurchases.map((purchase) => (
            <Link
              key={purchase.id}
              href={`/dashboard/purchases/${purchase.id}`}
              className="block"
            >
              <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:hover:border-blue-800">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-violet-600 text-white">
                        <Package className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {purchase.productName}
                        </h3>
                        <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                          <Badge variant="outline" className="text-[11px]">
                            {purchase.tool}
                          </Badge>
                          <Badge variant="secondary" className="text-[11px]">
                            {purchase.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-zinc-200 pt-3 dark:border-zinc-800">
                    <div>
                      <p className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Purchased
                      </p>
                      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {new Date(purchase.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Price
                      </p>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        ${purchase.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-blue-400">
                    <span className="font-medium">View downloads & details</span>
                    <Download className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      )}

      <Card className="border-zinc-200 dark:border-zinc-800">
        <CardContent className="flex items-center justify-between gap-3 p-4">
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            Keep your library fresh with new releases each week.
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-lg">
            <Link href="/products">Discover New Templates</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
