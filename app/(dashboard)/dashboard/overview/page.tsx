"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Package,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function Overview() {
  // Stats specific to n8n/Make template marketplace
  const stats = [
    {
      title: "Templates Owned",
      value: "8",
      subtitle: "5 n8n, 3 Make",
      icon: Package,
      color:
        "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Spent",
      value: "$249.99",
      subtitle: "Lifetime purchases",
      icon: DollarSign,
      color:
        "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Wishlist Items",
      value: "7",
      subtitle: "Saved for later",
      icon: Star,
      color:
        "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Reviews Given",
      value: "5",
      subtitle: "Templates rated",
      icon: TrendingUp,
      color:
        "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
  ];

  // Recently purchased templates
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

  // Trending templates
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
      {/* Welcome Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Welcome back
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Your automation template dashboard
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-4 rounded-lg border transition-colors hover:bg-opacity-75 ${stat.color}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                    {stat.title}
                  </p>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {stat.subtitle}
                  </p>
                </div>
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Browse by Tool */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border-blue-200 dark:border-blue-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  n8n Templates
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  5 templates owned
                </p>
              </div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                5
              </div>
            </div>
            <Button
              asChild
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link href="/products?tool=n8n">
                Browse n8n
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 border-purple-200 dark:border-purple-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-1">
                  Make Templates
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-200">
                  3 templates owned
                </p>
              </div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                3
              </div>
            </div>
            <Button
              asChild
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Link href="/products?tool=Make">
                Browse Make
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Purchases */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Recently Purchased
              </h3>
              <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard/purchases">
                  View all
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="space-y-3">
              {recentPurchases.map((purchase) => (
                <div
                  key={purchase.id}
                  className="flex items-center justify-between p-3 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {purchase.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {purchase.tool}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {purchase.category}
                      </Badge>
                      <Clock className="h-3 w-3 text-zinc-400" />
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {purchase.date}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    ${purchase.price}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start text-sm h-10"
              >
                <Link href="/products">
                  <Package className="mr-2 h-4 w-4" />
                  Browse Templates
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start text-sm h-10"
              >
                <Link href="/dashboard/wishlist">
                  <Star className="mr-2 h-4 w-4" />
                  My Wishlist
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start text-sm h-10"
              >
                <Link href="/contact">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Contact Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Templates */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Trending Templates
        </h3>
        <div className="grid gap-4 md:grid-cols-3">
          {trendingTemplates.map((template) => (
            <Card key={template.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="text-xs font-semibold bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300"
                  >
                    {template.tag}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {template.tool}
                  </Badge>
                </div>
                <h4 className="font-medium text-zinc-900 dark:text-white mb-3">
                  {template.name}
                </h4>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < Math.floor(template.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300 dark:text-zinc-600"
                      }`}
                    />
                  ))}
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
                    ({template.reviews})
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                    ${template.price}
                  </p>
                  <Button asChild size="sm" variant="default">
                    <Link href="/products">Buy Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
