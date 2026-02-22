"use client";

import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Compass,
  DollarSign,
  Package,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Overview() {
  const stats = [
    {
      title: "Templates Owned",
      value: "8",
      subtitle: "5 n8n • 3 Make",
      icon: Package,
      tone: "from-blue-500/10 to-cyan-500/5 border-blue-200 dark:border-blue-900/40",
      iconTone: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Hours Saved",
      value: "47",
      subtitle: "This month",
      icon: Clock,
      tone: "from-emerald-500/10 to-teal-500/5 border-emerald-200 dark:border-emerald-900/40",
      iconTone: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Wishlist Items",
      value: "7",
      subtitle: "Ready to review",
      icon: Star,
      tone: "from-violet-500/10 to-fuchsia-500/5 border-violet-200 dark:border-violet-900/40",
      iconTone: "text-violet-600 dark:text-violet-400",
    },
    {
      title: "Reviews Given",
      value: "5",
      subtitle: "Community impact",
      icon: TrendingUp,
      tone: "from-amber-500/10 to-orange-500/5 border-amber-200 dark:border-amber-900/40",
      iconTone: "text-amber-600 dark:text-amber-400",
    },
  ];

  const recentPurchases = [
    {
      id: 1,
      name: "Lead Enrichment Pipeline",
      tool: "n8n",
      price: 49.99,
      date: "2 days ago",
      category: "CRM",
    },
    {
      id: 2,
      name: "Email Sequence Automator",
      tool: "Make",
      price: 39.99,
      date: "1 week ago",
      category: "Email Marketing",
    },
    {
      id: 3,
      name: "Social Media Scheduler Pro",
      tool: "n8n",
      price: 59.99,
      date: "2 weeks ago",
      category: "Social Media",
    },
  ];

  const trendingTemplates = [
    {
      id: 1,
      name: "AI-Powered Lead Scorer",
      tool: "n8n",
      price: 79.99,
      rating: 4.8,
      reviews: 23,
      tag: "Popular",
    },
    {
      id: 2,
      name: "Multi-Channel Customer Sync",
      tool: "Make",
      price: 69.99,
      rating: 4.9,
      reviews: 18,
      tag: "Trending",
    },
    {
      id: 3,
      name: "Invoice Generator & Sender",
      tool: "n8n",
      price: 39.99,
      rating: 4.7,
      reviews: 31,
      tag: "Top Rated",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-cyan-50/60 to-blue-50/70 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge className="mb-3 bg-white/90 text-zinc-700 border-zinc-200 dark:bg-zinc-950 dark:text-zinc-300 dark:border-zinc-800">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Dashboard Snapshot
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Automation momentum is building
            </h1>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
              You are actively expanding your automation library and shipping faster workflows.
              Keep this pace to compound output each week.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="default" className="rounded-xl">
              <Link href="/products">
                Browse Templates
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/dashboard/purchases">View Purchases</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className={`border bg-linear-to-br ${stat.tone} dark:from-transparent dark:to-transparent`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {stat.title}
                    </p>
                    <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                      {stat.subtitle}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/60 bg-white/70 p-2 dark:border-zinc-700 dark:bg-zinc-900">
                    <Icon className={`h-4.5 w-4.5 ${stat.iconTone}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-cyan-50 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-zinc-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-blue-700 dark:text-blue-300">
                  n8n Portfolio
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">5 Templates</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Workflow stack focused on lead, CRM, and ops automations.</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <Button asChild className="mt-5 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/products?tool=n8n">
                Browse n8n Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-violet-200 bg-linear-to-br from-violet-50 to-fuchsia-50 dark:border-violet-900/40 dark:from-violet-950/20 dark:to-zinc-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-violet-700 dark:text-violet-300">
                  Make Portfolio
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900 dark:text-zinc-100">3 Templates</p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Great for fast integrations and multi-app process orchestrations.</p>
              </div>
              <Compass className="h-8 w-8 text-violet-600 dark:text-violet-400" />
            </div>
            <Button asChild className="mt-5 w-full rounded-xl bg-violet-600 hover:bg-violet-700 text-white">
              <Link href="/products?tool=Make">
                Browse Make Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Recent Purchases</h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/purchases">
                  View all
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="space-y-3">
              {recentPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-zinc-200 p-3.5 dark:border-zinc-800"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {purchase.name}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="text-[11px]">
                        {purchase.tool}
                      </Badge>
                      <Badge variant="secondary" className="text-[11px]">
                        {purchase.category}
                      </Badge>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">{purchase.date}</span>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    ${purchase.price}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">Quick Actions</h3>
            <div className="space-y-2.5">
              <Button asChild variant="outline" className="h-10 w-full justify-start rounded-xl">
                <Link href="/products">
                  <Package className="mr-2 h-4 w-4" />
                  Browse Templates
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-10 w-full justify-start rounded-xl">
                <Link href="/dashboard/wishlist">
                  <Star className="mr-2 h-4 w-4" />
                  Open Wishlist
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-10 w-full justify-start rounded-xl">
                <Link href="/dashboard/reviews">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Manage Reviews
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-10 w-full justify-start rounded-xl">
                <Link href="/contact">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Trending Templates</h3>
          <Button asChild variant="ghost" size="sm">
            <Link href="/products">
              Explore more
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {trendingTemplates.map((template) => (
            <Card key={template.id} className="h-full">
              <CardContent className="p-5">
                <div className="mb-3 flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/20 dark:text-amber-300"
                  >
                    {template.tag}
                  </Badge>
                  <Badge variant="outline">{template.tool}</Badge>
                </div>

                <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {template.name}
                </h4>

                <div className="mb-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < Math.floor(template.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300 dark:text-zinc-700",
                      )}
                    />
                  ))}
                  <span className="ml-1 text-xs text-zinc-500 dark:text-zinc-400">
                    ({template.reviews})
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {template.price}
                    </span>
                  </div>
                  <Button asChild size="sm" className="rounded-lg">
                    <Link href="/products">Buy</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
