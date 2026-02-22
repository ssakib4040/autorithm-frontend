import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export default function ProductLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="h-8 w-32 bg-zinc-800 rounded-lg"></div>
          <div className="h-4 w-64 bg-zinc-800 rounded mt-2"></div>
        </div>
        <div className="h-10 w-36 bg-zinc-800 rounded-lg"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: ShoppingBagIcon, color: "blue" },
          { icon: ChartBarIcon, color: "emerald" },
          { icon: CurrencyDollarIcon, color: "purple" },
          { icon: ArchiveBoxIcon, color: "orange" },
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 w-24 bg-zinc-800 rounded mb-3"></div>
                <div className="h-7 w-16 bg-zinc-800 rounded"></div>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  stat.color === "blue"
                    ? "bg-blue-500/10"
                    : stat.color === "emerald"
                      ? "bg-emerald-500/10"
                      : stat.color === "purple"
                        ? "bg-purple-500/10"
                        : "bg-orange-500/10"
                }`}
              >
                <stat.icon
                  className={`h-5 w-5 ${
                    stat.color === "blue"
                      ? "text-blue-500/50"
                      : stat.color === "emerald"
                        ? "text-emerald-500/50"
                        : stat.color === "purple"
                          ? "text-purple-500/50"
                          : "text-orange-500/50"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 h-10 bg-zinc-800 rounded-lg"></div>
          <div className="w-full md:w-40 h-10 bg-zinc-800 rounded-lg"></div>
          <div className="w-full md:w-40 h-10 bg-zinc-800 rounded-lg"></div>
        </div>
      </div>

      {/* Mobile Cards Skeleton */}
      <div className="lg:hidden space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-12 w-12 rounded-lg bg-zinc-800"></div>
                <div className="flex-1">
                  <div className="h-4 w-32 bg-zinc-800 rounded mb-2"></div>
                  <div className="h-3 w-20 bg-zinc-800 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-16 bg-zinc-800 rounded-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-3 w-12 bg-zinc-800 rounded mb-2"></div>
                <div className="h-4 w-16 bg-zinc-800 rounded"></div>
              </div>
              <div>
                <div className="h-3 w-12 bg-zinc-800 rounded mb-2"></div>
                <div className="h-4 w-10 bg-zinc-800 rounded"></div>
              </div>
              <div>
                <div className="h-3 w-14 bg-zinc-800 rounded mb-2"></div>
                <div className="h-4 w-12 bg-zinc-800 rounded"></div>
              </div>
            </div>
            <div className="flex gap-2 pt-2 border-t border-zinc-800">
              <div className="flex-1 h-9 bg-zinc-800 rounded-lg"></div>
              <div className="flex-1 h-9 bg-zinc-800 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Skeleton */}
      <div className="hidden lg:block rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Sales
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Revenue
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-zinc-800"></div>
                      <div className="h-4 w-32 bg-zinc-800 rounded"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-24 bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-12 bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 w-16 bg-zinc-800 rounded"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-6 w-16 bg-zinc-800 rounded-full"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-8 w-8 bg-zinc-800 rounded-lg"></div>
                      <div className="h-8 w-8 bg-zinc-800 rounded-lg"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
