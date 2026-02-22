import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Filters from "./partials/Filters";

import { productsApi } from "@/features/api";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tools = ["All", "n8n", "Make"];

interface ProductsPageProps {
  searchParams: Promise<{
    tool?: string;
    category?: string;
    priceRange?: string;
    page?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Products - Autorithm",
  description: "Explore our premium automation workflows for n8n and Make.com",
};

export default async function Products({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const selectedTool = params.tool || "All";
  const selectedCategory = params.category || "All";
  const priceRange = params.priceRange || "All";
  const page = parseInt(params.page || "1", 10);

  const apiParams: Record<string, string | number> = { page, limit: 12 };

  if (selectedTool !== "All") apiParams.tool = selectedTool;
  if (selectedCategory !== "All") apiParams.category = selectedCategory;

  if (priceRange === "0-150") {
    apiParams.maxPrice = 150;
  } else if (priceRange === "150-200") {
    apiParams.minPrice = 150;
    apiParams.maxPrice = 200;
  } else if (priceRange === "200+") {
    apiParams.minPrice = 200;
  }

  let products: Product[] = [];
  let totalPages = 1;

  try {
    const data = await productsApi.getAll(apiParams);
    products = data.products || [];
    totalPages = data.totalPages || 1;
  } catch {
    products = [];
    totalPages = 1;
  }

  const buildQueryString = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams();
    const current = {
      tool: selectedTool,
      category: selectedCategory,
      priceRange,
      page: page.toString(),
    };
    const merged = { ...current, ...updates };

    Object.entries(merged).forEach(([key, value]) => {
      if (value && value !== "All" && value !== "1") {
        newParams.set(key, value);
      }
    });

    const query = newParams.toString();
    return query ? `?${query}` : "";
  };

  const hasActiveFilters =
    selectedTool !== "All" || selectedCategory !== "All" || priceRange !== "All";

  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-24 bg-linear-to-br from-zinc-50 via-white to-cyan-50/70 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.12),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#71717a12_1px,transparent_1px),linear-gradient(to_bottom,#71717a12_1px,transparent_1px)] bg-size-[28px_28px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Badge className="mb-5 bg-white/90 text-zinc-800 border-zinc-200 dark:bg-zinc-900/90 dark:text-zinc-100 dark:border-zinc-800">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Curated Automation Catalog
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-5">
              High-Performance Workflows
              <span className="block text-zinc-500 dark:text-zinc-400">Built for Real Production Teams</span>
            </h1>

            <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
              Browse deploy-ready automation systems for n8n and Make. Every product is designed for faster setup,
              cleaner operations, and measurable outcomes.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Star className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Available Templates</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{products.length} on this page</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Delivery</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Instant digital access</p>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Outcome</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Production-ready builds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-10 border-y border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 p-4 sm:p-5">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                  Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => {
                    const isActive = selectedTool === tool;
                    return (
                      <Button
                        key={tool}
                        asChild
                        size="sm"
                        variant={isActive ? "default" : "outline"}
                        className={isActive ? "shadow-sm" : "bg-white dark:bg-zinc-950"}
                      >
                        <Link href={`/products${buildQueryString({ tool, page: "1" })}`}>
                          {tool === "All" ? "All Platforms" : tool}
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Filters
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                selectedTool={selectedTool}
                page={page}
              />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<ProductGridSkeleton />}>
        <section className="py-14 sm:py-16 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length === 0 ? (
              <Card className="text-center py-12 rounded-2xl">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <Layers className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg">No products found with the selected filters.</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/products">Clear Filters</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Showing <strong className="text-zinc-900 dark:text-zinc-100">{products.length}</strong>{" "}
                    {products.length === 1 ? "template" : "templates"}
                    {hasActiveFilters && " with active filters"}
                  </p>

                  {hasActiveFilters && (
                    <Button asChild variant="ghost" size="sm" className="w-fit">
                      <Link href="/products">Clear all filters</Link>
                    </Button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 mb-12">
                  {products.map((product) => {
                    const isN8N = product.tool === "n8n";
                    return (
                      <Card
                        key={product.id}
                        className="group flex flex-col h-full rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <Link href={`/products/${product.slug}?tool=${product.tool}`} className="flex flex-col h-full">
                          <CardHeader className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge
                                variant="outline"
                                className={
                                  isN8N
                                    ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/40"
                                    : "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/40"
                                }
                              >
                                <Zap className="h-3 w-3 mr-1" />
                                {product.tool}
                              </Badge>
                              <Badge variant="secondary" className="truncate max-w-[160px]">
                                {product.category}
                              </Badge>
                            </div>

                            <CardTitle className="text-xl leading-tight text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {product.name}
                            </CardTitle>
                            <CardDescription className="mt-2 text-sm line-clamp-3 leading-relaxed text-zinc-600 dark:text-zinc-400">
                              {product.description}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="pt-0">
                            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex items-center justify-between gap-3">
                              <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">One-time payment</p>
                                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">${product.price}</p>
                              </div>

                              <Button
                                variant="outline"
                                size="sm"
                                className="group-hover:bg-zinc-900 group-hover:text-white group-hover:border-zinc-900 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 dark:group-hover:border-zinc-100 transition-all"
                              >
                                View
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </CardContent>
                        </Link>
                      </Card>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Button asChild variant="outline" size="lg" disabled={page === 1} className="w-full sm:w-auto">
                      {page > 1 ? (
                        <Link href={`/products${buildQueryString({ page: (page - 1).toString() })}`}>
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Previous
                        </Link>
                      ) : (
                        <span className="opacity-50">
                          <ChevronLeft className="mr-2 h-4 w-4" />
                          Previous
                        </span>
                      )}
                    </Button>

                    <div className="px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-600 dark:text-zinc-300">
                      Page <strong className="text-zinc-900 dark:text-zinc-100">{page}</strong> of {totalPages}
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      disabled={page === totalPages}
                      className="w-full sm:w-auto"
                    >
                      {page < totalPages ? (
                        <Link href={`/products${buildQueryString({ page: (page + 1).toString() })}`}>
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      ) : (
                        <span className="opacity-50">
                          Next
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </Suspense>
    </>
  );
}

function ProductGridSkeleton() {
  return (
    <section className="py-14 sm:py-16 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 mb-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-24"></div>
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20"></div>
                </div>
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5"></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
