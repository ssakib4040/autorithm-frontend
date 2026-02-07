import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Filters from "./partials/Filters";

import { productsApi } from "@/utils/api";
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
      <section className="relative overflow-hidden bg-linear-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            Premium Workflows
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Automation Kits
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Production-ready n8n & Make workflows engineered for reliability.
            Deploy professional automation systems in minutes, not weeks.
          </p>
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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-xl transition-all duration-300"
                    >
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge
                            variant="secondary"
                            className={
                              product.tool === "n8n"
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            }
                          >
                            {product.tool}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-sm line-clamp-2">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                            ${product.price}
                          </span>
                        </div>
                        <Button asChild className="w-full" variant="outline">
                          <Link
                            href={`/products/${product.slug}?tool=${product.tool}`}
                          >
                            View Details
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardContent>
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
