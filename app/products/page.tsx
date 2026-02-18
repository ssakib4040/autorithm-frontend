import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Zap,
  Star,
  Download,
  TrendingUp,
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

  // Build API params
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
    console.log("Fetched products data:", data);
    products = data.products || [];
    totalPages = data.totalPages || 1;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  // Helper to build query string
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

  return (
    <>
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              <Zap className="h-3 w-3 mr-1" />
              Premium Automation Templates
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 max-w-4xl">
              Build Faster with{" "}
              <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ready-Made
              </span>{" "}
              Workflows
            </h1>
            <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8">
              Production-ready automation templates for n8n & Make.com. Skip the
              setup, deploy professional workflows in minutes.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Star className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>
                  <strong className="text-zinc-900 dark:text-white">
                    {products.length}+
                  </strong>{" "}
                  Templates
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Download className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span>
                  <strong className="text-zinc-900 dark:text-white">
                    Instant
                  </strong>{" "}
                  Access
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span>
                  <strong className="text-zinc-900 dark:text-white">
                    Production
                  </strong>{" "}
                  Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-16 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tool Filter */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <Button
                    key={tool}
                    asChild
                    variant={selectedTool === tool ? "default" : "outline"}
                    size="sm"
                  >
                    <Link
                      href={`/products${buildQueryString({ tool, page: "1" })}`}
                    >
                      {tool}
                    </Link>
                  </Button>
                ))}
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
      </section>

      {/* Products Grid */}
      <Suspense fallback={<ProductGridSkeleton />}>
        <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {products.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent className="pt-6">
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    No products found with the selected filters.
                  </p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/products">Clear Filters</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Showing{" "}
                    <strong className="text-zinc-900 dark:text-white">
                      {products.length}
                    </strong>{" "}
                    {products.length === 1 ? "template" : "templates"}
                    {(selectedTool !== "All" ||
                      selectedCategory !== "All" ||
                      priceRange !== "All") && (
                      <span>
                        {" "}
                        with active filters
                        <Button
                          asChild
                          variant="link"
                          size="sm"
                          className="ml-2 h-auto p-0"
                        >
                          <Link href="/products">Clear all</Link>
                        </Button>
                      </span>
                    )}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="group h-full hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col cursor-pointer"
                    >
                      <Link
                        href={`/products/${product.slug}?tool=${product.tool}`}
                        className="flex flex-col h-full"
                      >
                        <CardHeader className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              variant="secondary"
                              className={
                                product.tool === "n8n"
                                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                                  : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                              }
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              {product.tool}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs bg-white dark:bg-zinc-900"
                            >
                              {product.category}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                            {product.name}
                          </CardTitle>
                          <CardDescription className="text-sm line-clamp-3 leading-relaxed">
                            {product.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                  One-time payment
                                </p>
                                <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                                  ${product.price}
                                </span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                              >
                                View
                                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      disabled={page === 1}
                      className="w-full sm:w-auto"
                    >
                      {page > 1 ? (
                        <Link
                          href={`/products${buildQueryString({ page: (page - 1).toString() })}`}
                        >
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

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        Page
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-base px-3 py-1"
                      >
                        {page}
                      </Badge>
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        of {totalPages}
                      </span>
                    </div>

                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      disabled={page === totalPages}
                      className="w-full sm:w-auto"
                    >
                      {page < totalPages ? (
                        <Link
                          href={`/products${buildQueryString({ page: (page + 1).toString() })}`}
                        >
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
    <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-16"></div>
                  <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20"></div>
                </div>
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-2"></div>
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
