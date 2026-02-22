"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  TicketIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowDownTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  CalendarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const coupons = [
  {
    id: 1,
    code: "WELCOME10",
    discount: "10%",
    type: "Percentage",
    uses: 154,
    maxUses: 500,
    status: "Active",
    expiry: "2025-12-31",
    createdAt: "2024-01-15",
    revenue: 12450,
  },
  {
    id: 2,
    code: "SAVE50",
    discount: "$50.00",
    type: "Fixed Amount",
    uses: 23,
    maxUses: 100,
    status: "Active",
    expiry: "2024-06-30",
    createdAt: "2024-02-10",
    revenue: 3450,
  },
  {
    id: 3,
    code: "FLASH20",
    discount: "20%",
    type: "Percentage",
    uses: 89,
    maxUses: 200,
    status: "Expired",
    expiry: "2024-01-01",
    createdAt: "2023-12-15",
    revenue: 8920,
  },
  {
    id: 4,
    code: "SUMMER25",
    discount: "25%",
    type: "Percentage",
    uses: 67,
    maxUses: 150,
    status: "Active",
    expiry: "2025-08-31",
    createdAt: "2024-05-01",
    revenue: 5680,
  },
  {
    id: 5,
    code: "NEWYEAR",
    discount: "$100.00",
    type: "Fixed Amount",
    uses: 12,
    maxUses: 50,
    status: "Paused",
    expiry: "2025-01-31",
    createdAt: "2024-12-20",
    revenue: 2400,
  },
];

const stats = [
  {
    label: "Total Coupons",
    value: "24",
    change: "+3 this month",
    icon: TicketIcon,
    color: "blue",
  },
  {
    label: "Active Coupons",
    value: "18",
    change: "75% of total",
    icon: CheckCircleIcon,
    color: "emerald",
  },
  {
    label: "Total Uses",
    value: "1,284",
    change: "+12.5% vs last month",
    icon: ChartBarIcon,
    color: "purple",
  },
  {
    label: "Revenue Generated",
    value: "$32,900",
    change: "+8.2% vs last month",
    icon: CurrencyDollarIcon,
    color: "amber",
  },
];

export default function CouponsPage() {
  const [selectedCoupons, setSelectedCoupons] = useState<number[]>([]);
  const [showActions, setShowActions] = useState<number | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const toggleCouponSelection = (couponId: number) => {
    setSelectedCoupons((prev) =>
      prev.includes(couponId)
        ? prev.filter((id) => id !== couponId)
        : [...prev, couponId],
    );
  };

  const toggleAllCoupons = () => {
    setSelectedCoupons((prev) =>
      prev.length === coupons.length ? [] : coupons.map((c) => c.id),
    );
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getUsagePercentage = (uses: number, maxUses: number) => {
    return Math.round((uses / maxUses) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Coupon Management</h1>
          <p className="text-zinc-400 mt-1">
            Create and manage discount coupons
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Export
          </button>
          <Link
            href="/admin/coupons/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-lg shadow-blue-600/20"
          >
            <PlusIcon className="h-4 w-4" />
            Create Coupon
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-zinc-400 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-white mt-2">
                  {stat.value}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium mt-2 text-zinc-500">
                  {stat.change}
                </span>
              </div>
              <div className={`p-3 rounded-xl bg-${stat.color}-500/10`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search by coupon code..."
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <select className="appearance-none bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-zinc-700 cursor-pointer">
                <option>All Types</option>
                <option>Percentage</option>
                <option>Fixed Amount</option>
              </select>
            </div>
            <div className="relative">
              <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none" />
              <select className="appearance-none bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-none focus:border-zinc-700 cursor-pointer">
                <option>All Status</option>
                <option>Active</option>
                <option>Expired</option>
                <option>Paused</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedCoupons.length > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-sm text-zinc-400">
              {selectedCoupons.length} coupon
              {selectedCoupons.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2 flex-wrap">
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Activate
              </button>
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Pause
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Coupons Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full w-full text-left text-sm">
                <thead className="bg-zinc-950 border-b border-zinc-800 hidden md:table-header-group">
                  <tr>
                    <th className="px-6 py-4 w-12">
                      <input
                        type="checkbox"
                        checked={selectedCoupons.length === coupons.length}
                        onChange={toggleAllCoupons}
                        className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Coupon Code
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Discount
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Expiry
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th className="px-6 py-4 text-xs font-semibold text-zinc-400 uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {coupons.map((coupon) => (
                    <tr
                      key={coupon.id}
                      className="hover:bg-zinc-800/50 transition-colors group flex flex-col md:table-row border-b border-zinc-800 md:border-0 py-4 md:py-0"
                    >
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:w-auto"
                        data-label="Select"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Select
                        </span>
                        <input
                          type="checkbox"
                          checked={selectedCoupons.includes(coupon.id)}
                          onChange={() => toggleCouponSelection(coupon.id)}
                          className="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
                        />
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:w-auto"
                        data-label="Coupon Code"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Coupon Code
                        </span>
                        <div className="flex items-center gap-2">
                          <code className="font-mono font-bold text-white bg-zinc-800 px-2 py-1 rounded text-xs sm:text-sm">
                            {coupon.code}
                          </code>
                          <button
                            onClick={() => copyToClipboard(coupon.code)}
                            className="p-1 hover:bg-zinc-700 rounded text-zinc-400 hover:text-white transition-all"
                            title="Copy code"
                          >
                            {copiedCode === coupon.code ? (
                              <CheckCircleIcon className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <DocumentDuplicateIcon className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:w-auto"
                        data-label="Discount"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Discount
                        </span>
                        <span className="font-semibold text-white">
                          {coupon.discount}
                        </span>
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:w-auto"
                        data-label="Type"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Type
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            coupon.type === "Percentage"
                              ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                              : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                          }`}
                        >
                          {coupon.type}
                        </span>
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell flex-col md:w-auto"
                        data-label="Usage"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase mb-1">
                          Usage
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-white font-medium">
                              {coupon.uses} / {coupon.maxUses}
                            </span>
                            <span className="text-zinc-500">
                              {getUsagePercentage(coupon.uses, coupon.maxUses)}%
                            </span>
                          </div>
                          <div className="w-full md:w-32 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                getUsagePercentage(
                                  coupon.uses,
                                  coupon.maxUses,
                                ) >= 80
                                  ? "bg-red-500"
                                  : getUsagePercentage(
                                        coupon.uses,
                                        coupon.maxUses,
                                      ) >= 50
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                              }`}
                              style={{
                                width: `${getUsagePercentage(coupon.uses, coupon.maxUses)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:w-auto"
                        data-label="Status"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Status
                        </span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            coupon.status === "Active"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : coupon.status === "Paused"
                                ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              coupon.status === "Active"
                                ? "bg-emerald-400"
                                : coupon.status === "Paused"
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                            }`}
                          ></span>
                          {coupon.status}
                        </span>
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:w-auto"
                        data-label="Expiry"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Expiry
                        </span>
                        <div className="flex items-center gap-1.5 text-zinc-400">
                          <CalendarIcon className="h-4 w-4" />
                          <span className="text-sm">{coupon.expiry}</span>
                        </div>
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:w-auto"
                        data-label="Revenue"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Revenue
                        </span>
                        <span className="text-white font-medium">
                          ${coupon.revenue.toLocaleString()}
                        </span>
                      </td>
                      <td
                        className="px-6 py-2 md:py-4 flex md:table-cell items-center justify-between md:justify-end md:w-auto"
                        data-label="Actions"
                      >
                        <span className="md:hidden font-semibold text-zinc-400 text-xs uppercase">
                          Actions
                        </span>
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/coupons/${coupon.id}`}
                            className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                            title="Edit coupon"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                          </Link>
                          <button
                            className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-red-400 transition-all"
                            title="Delete coupon"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() =>
                                setShowActions(
                                  showActions === coupon.id ? null : coupon.id,
                                )
                              }
                              className="p-2 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                            >
                              <EllipsisVerticalIcon className="h-4 w-4" />
                            </button>
                            {showActions === coupon.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl z-10 py-1">
                                <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                                  View Details
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                                  Duplicate Coupon
                                </button>
                                <button className="w-full px-4 py-2 text-left text-sm text-zinc-300 hover:bg-zinc-700 transition-colors">
                                  View Usage History
                                </button>
                                <hr className="my-1 border-zinc-700" />
                                {coupon.status === "Active" ? (
                                  <button className="w-full px-4 py-2 text-left text-sm text-amber-400 hover:bg-zinc-700 transition-colors">
                                    Pause Coupon
                                  </button>
                                ) : (
                                  <button className="w-full px-4 py-2 text-left text-sm text-emerald-400 hover:bg-zinc-700 transition-colors">
                                    Activate Coupon
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-zinc-950 border-t border-zinc-800 px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-zinc-400">
              Showing <span className="font-medium text-white">1</span> to{" "}
              <span className="font-medium text-white">5</span> of{" "}
              <span className="font-medium text-white">24</span> coupons
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium">
                1
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-sm transition-colors">
                2
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-sm transition-colors">
                3
              </button>
              <button className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white text-sm transition-colors">
                4
              </button>
              <button className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
