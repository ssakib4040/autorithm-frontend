"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight, Package } from "lucide-react";
import Link from "next/link";

export default function Purchases() {
  // Placeholder data - would be fetched from API in production
  const purchases = [
    {
      id: 1,
      productName: "AI Lead Enrichment Workflow",
      price: 29.99,
      date: "2024-02-10",
      status: "active",
    },
    {
      id: 2,
      productName: "Email Marketing Automation",
      price: 19.99,
      date: "2024-01-28",
      status: "active",
    },
    {
      id: 3,
      productName: "Social Media Scheduler",
      price: 24.99,
      date: "2024-01-15",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          My Purchases
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          View and manage your purchased automation workflows
        </p>
      </div>

      {/* Purchases List */}
      <div>
        {purchases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-12">
              <ShoppingBag className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
              <p className="text-zinc-600 dark:text-zinc-400 text-center mb-4">
                You haven&apos;t purchased any products yet
              </p>
              <Button asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {purchases.map((purchase) => (
              <Card key={purchase.id}>
                <CardContent className="flex items-center justify-between p-5">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center">
                      <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                        {purchase.productName}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        Purchased on{" "}
                        {new Date(purchase.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        ${purchase.price.toFixed(2)}
                      </p>
                      <Badge variant="outline" className="text-xs mt-1">
                        {purchase.status}
                      </Badge>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/products">
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
