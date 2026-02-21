export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Mobile Sticky CTA Skeleton */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t-2 border-zinc-200 dark:border-zinc-800 p-4 z-50 shadow-2xl">
        <div className="flex items-center justify-between gap-4 animate-pulse">
          <div className="flex-1">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-24 mb-2"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32"></div>
          </div>
          <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-28"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 pb-24 lg:pb-8">
        {/* Back Button Skeleton */}
        <div className="mb-8 -ml-4">
          <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md w-40 animate-pulse"></div>
        </div>

        {/* 2 COLUMN GRID */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT COLUMN - Product Details */}
          <div className="space-y-10 animate-pulse">
            {/* Hero Section with Wishlist Button */}
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 relative">
              {/* Wishlist Button Skeleton */}
              <div className="absolute top-4 right-4">
                <div className="w-11 h-11 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
              </div>

              {/* Category Badge */}
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-24 mb-4"></div>

              {/* Product Name + Platform Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-64"></div>
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20"></div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
              </div>
            </div>

            {/* How It Works Section */}
            <div>
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-48 mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="shrink-0 w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features Section */}
            <div>
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-40 mb-4"></div>
              <ul className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0 mt-0.5"></div>
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Details Section */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-48 mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-24 mb-2"></div>
                  <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-32"></div>
                </div>
                <div>
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-24 mb-2"></div>
                  <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-28"></div>
                </div>
                <div className="col-span-2">
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-40 mb-2"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                </div>
                <div className="col-span-2">
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-32 mb-2"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div>
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-24 mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Sticky CTA Card */}
          <div className="lg:sticky lg:top-4 h-fit space-y-6">
            {/* Main CTA Card */}
            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 animate-pulse">
              {/* Discount Badge */}
              <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full w-48 mb-4"></div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-2">
                <div className="h-14 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-32"></div>
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-20 mb-2"></div>
              </div>

              {/* Time Left */}
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-32 mb-3"></div>

              {/* Details */}
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-40"></div>
              </div>

              {/* Buy Button */}
              <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full mb-4"></div>

              {/* Platform Switcher */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-40 mb-2"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-32"></div>
              </div>
            </div>

            {/* What's Included Card */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 animate-pulse">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-40 mb-4"></div>
              <ul className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0 mt-0.5"></div>
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
