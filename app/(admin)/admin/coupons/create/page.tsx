"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeftIcon,
  TicketIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon,
  InformationCircleIcon,
  SparklesIcon,
  TagIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function CreateCouponPage() {
  const [discountType, setDiscountType] = useState("Percentage");
  const [discountValue, setDiscountValue] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [usageLimit, setUsageLimit] = useState("");

  const generateCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCouponCode(code);
  };

  const calculateExample = () => {
    if (!discountValue) return "Enter a discount value";
    const value = parseFloat(discountValue);
    if (discountType === "Percentage") {
      const discounted = 100 - (100 * value) / 100;
      return `$100 product → $${discounted.toFixed(2)} (${value}% off)`;
    } else {
      const discounted = Math.max(0, 100 - value);
      return `$100 product → $${discounted.toFixed(2)} ($${value} off)`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/coupons"
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4 transition-colors group"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Coupons
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Coupon</h1>
            <p className="text-zinc-400 mt-1">
              Set up a new discount coupon for your customers
            </p>
          </div>
        </div>
      </div>

      <form className="space-y-6">
        {/* Coupon Code Section */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TicketIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Coupon Code</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Code <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                required
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600 uppercase"
                placeholder="SUMMER2024"
              />
              <button
                type="button"
                onClick={generateCode}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors whitespace-nowrap"
              >
                <SparklesIcon className="h-4 w-4" />
                Generate
              </button>
            </div>
            <p className="text-xs text-zinc-500 mt-1.5">
              Enter a unique code or generate a random one
            </p>
          </div>
        </div>

        {/* Discount Settings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <CurrencyDollarIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Discount Settings
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Discount Type <span className="text-red-400">*</span>
              </label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
              >
                <option value="Percentage">Percentage (%)</option>
                <option value="Fixed Amount">Fixed Amount ($)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Discount Value <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  required
                  min="0"
                  step={discountType === "Percentage" ? "1" : "0.01"}
                  max={discountType === "Percentage" ? "100" : undefined}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                  placeholder={discountType === "Percentage" ? "10" : "50.00"}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
                  {discountType === "Percentage" ? "%" : "$"}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600 resize-none"
                placeholder="Optional description for internal reference..."
              />
            </div>
          </div>

          {/* Example Calculation */}
          {discountValue && (
            <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
              <div className="flex items-start gap-2">
                <InformationCircleIcon className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-white text-sm mb-1">
                    Example Calculation:
                  </p>
                  <p className="text-sm text-zinc-400">{calculateExample()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Validity Period */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Validity Period
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-zinc-400" />
                  Valid From <span className="text-red-400">*</span>
                </span>
              </label>
              <input
                type="date"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <span className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-zinc-400" />
                  Valid Until <span className="text-red-400">*</span>
                </span>
              </label>
              <input
                type="date"
                required
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Usage Limits */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <ChartBarIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Usage Limits</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                <span className="flex items-center gap-2">
                  <UserGroupIcon className="h-4 w-4 text-zinc-400" />
                  Maximum Uses
                </span>
              </label>
              <input
                type="number"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
                min="1"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                placeholder="e.g., 100 (leave empty for unlimited)"
              />
              <p className="text-xs text-zinc-500 mt-1.5">
                Total number of times this coupon can be used
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Uses Per Customer
              </label>
              <input
                type="number"
                min="1"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                placeholder="e.g., 1 (leave empty for unlimited)"
              />
              <p className="text-xs text-zinc-500 mt-1.5">
                Limit usage per customer
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Minimum Purchase Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1.5">
                Minimum order value required
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Maximum Discount Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-zinc-600"
                  placeholder="No limit"
                />
              </div>
              <p className="text-xs text-zinc-500 mt-1.5">
                Cap the maximum discount (useful for % discounts)
              </p>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TagIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Additional Options
            </h3>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  Active immediately
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Make this coupon active as soon as it&apos;s created
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  First-time customers only
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Restrict this coupon to customers who haven&apos;t made a
                  purchase before
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  Free shipping
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Include free shipping with this coupon
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer"
              />
              <div className="flex-1">
                <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                  Exclude sale items
                </span>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Don&apos;t allow this coupon to be used on items already on
                  sale
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <p className="text-sm text-zinc-400">
            <span className="text-red-400">*</span> Required fields
          </p>
          <div className="flex gap-3">
            <Link
              href="/admin/coupons"
              className="px-6 py-2.5 rounded-lg border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium shadow-lg shadow-blue-600/20"
            >
              Create Coupon
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
