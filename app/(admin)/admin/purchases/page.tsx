"use client";

import Link from "next/link";
import {
  PlusIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  ChartBarIcon,
  ArrowPathIcon,
  UserIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";

const purchases = [
  {
    id: 1001,
    user: "Alice Johnson",
    email: "alice.j@email.com",
    product: "SEO Automation Kit",
    amount: "$49.00",
    date: "2024-03-20",
    status: "Completed",
  },
  {
    id: 1002,
    user: "Bob Smith",
    email: "bob.smith@email.com",
    product: "Social Media Scheduler",
    amount: "$29.00",
    date: "2024-03-21",
    status: "Refunded",
  },
  {
    id: 1003,
    user: "Charlie Brown",
    email: "charlie.b@email.com",
    product: "Email Outreach System",
    amount: "$99.00",
    date: "2024-03-21",
    status: "Pending",
  },
  {
    id: 1004,
    user: "Diana Ross",
    email: "diana.ross@email.com",
    product: "SEO Automation Kit",
    amount: "$49.00",
    date: "2024-03-22",
    status: "Completed",
  },
];

export default function PurchasesPage() {
  const stats = [
    {
      name: "Total Revenue",
      value: "$226.00",
      icon: CurrencyDollarIcon,
      color: "blue",
    },
    {
      name: "Total Orders",
      value: "265",
      icon: ShoppingCartIcon,
      color: "emerald",
    },
    {
      name: "Avg Order Value",
      value: "$67.50",
      icon: ChartBarIcon,
      color: "purple",
    },
    {
      name: "Refund Rate",
      value: "2.3%",
      icon: ArrowPathIcon,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Orders & Purchases
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Track and manage all customer orders
          </p>
        </div>
        <Link
          href="/admin/purchases/create"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Log Purchase
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {stat.value}
                </p>
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
                      ? "text-blue-500"
                      : stat.color === "emerald"
                        ? "text-emerald-500"
                        : stat.color === "purple"
                          ? "text-purple-500"
                          : "text-orange-500"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by order ID, user, or product..."
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Refunded</option>
            <option>Failed</option>
          </select>
          <select className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden space-y-4">
        {purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono text-zinc-500">
                    #{purchase.id}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      purchase.status === "Completed"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : purchase.status === "Refunded"
                          ? "bg-red-500/10 text-red-400 border border-red-500/20"
                          : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    }`}
                  >
                    {purchase.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white">
                  {purchase.product}
                </h3>
                <p className="text-xs text-zinc-500 mt-1">{purchase.user}</p>
              </div>
              <p className="text-lg font-bold text-white">{purchase.amount}</p>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" />
                {purchase.date}
              </div>
              <div className="flex items-center gap-1.5">
                <UserIcon className="h-3.5 w-3.5" />
                {purchase.email}
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800">
              <Link
                href={`/admin/purchases/${purchase.id}`}
                className="w-full inline-flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <EyeIcon className="h-4 w-4" />
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Order ID
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Date
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
              {purchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-white">
                      #{purchase.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {purchase.user
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {purchase.user}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {purchase.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300">
                      {purchase.product}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-white">
                      {purchase.amount}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-400">
                      {purchase.date}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        purchase.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : purchase.status === "Refunded"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/purchases/${purchase.id}`}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors group"
                      >
                        <EyeIcon className="h-4 w-4 text-zinc-400 group-hover:text-blue-400" />
                      </Link>
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
