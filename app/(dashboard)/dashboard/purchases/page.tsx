"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Download,
  Package,
  Calendar,
  DollarSign,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Purchases() {
  const [searchQuery, setSearchQuery] = useState("");

  // Placeholder data - would be fetched from API in production
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

  const totalSpent = purchases.reduce((sum, p) => sum + p.price, 0);
  const filteredPurchases = purchases.filter((p) =>
    p.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            My Purchases
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Access and manage your automation templates
          </p>
        </div>
        <Button asChild>
          <Link href="/products">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Browse Store
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total Templates
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {purchases.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Invested
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  ${totalSpent.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Latest Purchase
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {purchases.length > 0
                    ? new Date(purchases[0].date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
        </CardContent>
      </Card>

      {/* Purchases List */}
      <div>
        {filteredPurchases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                <ShoppingBag className="h-8 w-8 text-zinc-400 dark:text-zinc-600" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                No purchases found
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center mb-6">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Start building your automation library"}
              </p>
              <Button asChild>
                <Link href="/products">Explore Templates</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPurchases.map((purchase) => (
              <Link
                key={purchase.id}
                href={`/dashboard/purchases/${purchase.id}`}
                className="block"
              >
                <Card className="hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
                          <Package className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                            {purchase.productName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {purchase.tool}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {purchase.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="space-y-1">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Purchased on
                        </p>
                        <p className="text-sm font-medium text-zinc-900 dark:text-white">
                          {new Date(purchase.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Price
                        </p>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          ${purchase.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="flex items-center justify-between text-sm text-blue-600 dark:text-blue-400">
                        <span className="font-medium">
                          View downloads & details
                        </span>
                        <Download className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
