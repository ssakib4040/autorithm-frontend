import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProductsLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden bg-linear-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-32 mb-4"></div>
          <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-64 mb-4"></div>
          <div className="space-y-2 max-w-3xl">
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
          </div>
        </div>
      </section>

      {/* Filters Section Skeleton */}
      <section className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-16 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Tool Filter Skeleton */}
            <div className="flex-1">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-20 mb-3 animate-pulse"></div>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-md w-16 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Category & Price Filter Skeleton */}
            <div className="flex-1">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-24 mb-3 animate-pulse"></div>
              <div className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full animate-pulse"></div>
            </div>

            <div className="flex-1">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-20 mb-3 animate-pulse"></div>
              <div className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Skeleton */}
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

          {/* Pagination Skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-32 animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-12 animate-pulse"></div>
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full w-12 animate-pulse"></div>
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-12 animate-pulse"></div>
            </div>
            <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-32 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
}
