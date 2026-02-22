"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Heart,
  ShoppingBag,
  Sparkles,
  Star,
  Trash2,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Advanced Data Processing Workflow",
      price: 49.99,
      category: "Data",
      tool: "n8n",
      addedDate: "2 days ago",
    },
    {
      id: 2,
      name: "Customer CRM Integration",
      price: 39.99,
      category: "CRM",
      tool: "Make",
      addedDate: "5 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-rose-50/70 to-violet-50/70 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-10 -top-8 h-40 w-40 rounded-full bg-rose-500/15 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Saved for Later
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Wishlist
            </h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              Track templates you are considering and buy when you are ready.
            </p>
          </div>

          <Button asChild className="rounded-xl">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Explore Products
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="border-rose-200 bg-rose-50/60 dark:border-rose-900/40 dark:bg-rose-950/20 sm:col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-rose-100 p-2.5 dark:bg-rose-900/40">
                <Heart className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Saved Items
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  {wishlistItems.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20 sm:col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-blue-100 p-2.5 dark:bg-blue-900/40">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Platforms
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  n8n + Make
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-violet-50/60 dark:border-violet-900/40 dark:bg-violet-950/20 sm:col-span-1">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-violet-100 p-2.5 dark:bg-violet-900/40">
                <Star className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Next Step
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Compare before buying
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
              <Heart className="h-8 w-8 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Your wishlist is empty
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Save interesting workflows to compare and purchase later.
            </p>
            <Button asChild className="mt-5 rounded-xl">
              <Link href="/products">Explore Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-3">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="transition-all hover:border-violet-300 dark:hover:border-violet-800">
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="text-[11px]">
                        {item.tool}
                      </Badge>
                      <Badge variant="secondary" className="text-[11px]">
                        {item.category}
                      </Badge>
                    </div>

                    <h3 className="truncate text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.name}
                    </h3>

                    <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <Clock3 className="h-3.5 w-3.5" />
                      Added {item.addedDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        Price
                      </p>
                      <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <Button asChild size="sm" className="rounded-lg">
                      <Link href="/products">
                        Buy Now
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button variant="outline" size="icon" className="rounded-lg" aria-label="Remove item">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
