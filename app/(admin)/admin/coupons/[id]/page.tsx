"use client";

import { useState } from 'react';
import Link from 'next/link';
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
  ShoppingBagIcon,
  DocumentDuplicateIcon,
  TrashIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PauseCircleIcon
} from '@heroicons/react/24/outline';

// Mock coupon data
const couponData = {
  id: 1,
  code: 'WELCOME10',
  discountType: 'Percentage',
  discountValue: 10,
  description: 'Welcome discount for new customers',
  validFrom: '2024-01-15',
  validUntil: '2025-12-31',
  maxUses: 500,
  usesPerCustomer: 1,
  minPurchase: 50,
  maxDiscount: 100,
  status: 'Active',
  currentUses: 154,
  revenue: 12450,
  activeStatus: true,
  firstTimeOnly: true,
  freeShipping: false,
  excludeSale: true,
};

const usageHistory = [
  { id: 1, user: 'john@example.com', date: '2024-11-15', orderValue: 150, discount: 15 },
  { id: 2, user: 'sarah@example.com', date: '2024-11-14', orderValue: 200, discount: 20 },
  { id: 3, user: 'mike@example.com', date: '2024-11-13', orderValue: 89, discount: 8.9 },
  { id: 4, user: 'lisa@example.com', date: '2024-11-12', orderValue: 120, discount: 12 },
];

export default function EditCouponPage() {
  const [discountType, setDiscountType] = useState(couponData.discountType);
  const [discountValue, setDiscountValue] = useState(couponData.discountValue.toString());
  const [activeTab, setActiveTab] = useState<'details' | 'usage'>('details');

  const calculateExample = () => {
    if (!discountValue) return 'Enter a discount value';
    const value = parseFloat(discountValue);
    if (discountType === 'Percentage') {
      const discounted = 100 - (100 * value / 100);
      return `$100 product → $${discounted.toFixed(2)} (${value}% off)`;
    } else {
      const discounted = Math.max(0, 100 - value);
      return `$100 product → $${discounted.toFixed(2)} ($${value} off)`;
    }
  };

  const getUsagePercentage = () => {
    return Math.round((couponData.currentUses / couponData.maxUses) * 100);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link 
          href="/admin/coupons" 
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4 transition-colors group"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Coupons
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <TicketIcon className="h-8 w-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white font-mono">{couponData.code}</h1>
              <p className="text-zinc-400 mt-1">Edit coupon details and view usage statistics</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg text-sm font-medium transition-colors">
              <DocumentDuplicateIcon className="h-4 w-4 inline mr-2" />
              Duplicate
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">Times Used</p>
              <p className="text-2xl font-bold text-white mt-1">{couponData.currentUses}</p>
              <p className="text-xs text-zinc-500 mt-1">of {couponData.maxUses} max</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10">
              <ChartBarIcon className="h-6 w-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${getUsagePercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">Revenue Impact</p>
              <p className="text-2xl font-bold text-white mt-1">${couponData.revenue.toLocaleString()}</p>
              <p className="text-xs text-emerald-400 mt-1">↑ Total sales</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10">
              <CurrencyDollarIcon className="h-6 w-6 text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">Avg Discount</p>
              <p className="text-2xl font-bold text-white mt-1">${(couponData.revenue / couponData.currentUses).toFixed(2)}</p>
              <p className="text-xs text-zinc-500 mt-1">Per use</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10">
              <ShoppingBagIcon className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-zinc-400 text-sm font-medium">Status</p>
              <p className="text-2xl font-bold text-white mt-1 text-base capitalize">{couponData.status}</p>
              <p className="text-xs text-zinc-500 mt-1">Current state</p>
            </div>
            <div className={`p-3 rounded-xl ${
              couponData.status === 'Active' 
                ? 'bg-emerald-500/10' 
                : couponData.status === 'Paused' 
                ? 'bg-amber-500/10' 
                : 'bg-red-500/10'
            }`}>
              {couponData.status === 'Active' && <CheckCircleIcon className="h-6 w-6 text-emerald-400" />}
              {couponData.status === 'Paused' && <PauseCircleIcon className="h-6 w-6 text-amber-400" />}
              {couponData.status === 'Expired' && <ClockIcon className="h-6 w-6 text-red-400" />}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="border-b border-zinc-800">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'details'
                  ? 'border-blue-500 text-white bg-zinc-800/50'
                  : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <TagIcon className="h-4 w-4 inline mr-2" />
              Coupon Details
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                activeTab === 'usage'
                  ? 'border-blue-500 text-white bg-zinc-800/50'
                  : 'border-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/30'
              }`}
            >
              <ChartBarIcon className="h-4 w-4 inline mr-2" />
              Usage History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <form className="space-y-6">
              {/* Coupon Code Section */}
              <div>
                <h3 className="text-base font-semibold text-white mb-4">Coupon Code</h3>
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    Code <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="text" 
                    defaultValue={couponData.code}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white font-mono font-bold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors uppercase" 
                  />
                  <p className="text-xs text-zinc-500 mt-1.5">Changing the code will affect existing users who saved it</p>
                </div>
              </div>

              {/* Discount Settings */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-4">Discount Settings</h3>
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
                        step={discountType === 'Percentage' ? '1' : '0.01'}
                        max={discountType === 'Percentage' ? '100' : undefined}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 pr-10 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
                        {discountType === 'Percentage' ? '%' : '$'}
                      </span>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Description
                    </label>
                    <textarea 
                      rows={3}
                      defaultValue={couponData.description}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none" 
                    />
                  </div>
                </div>

                {/* Example Calculation */}
                {discountValue && (
                  <div className="mt-4 p-4 bg-zinc-950 border border-zinc-800 rounded-lg">
                    <div className="flex items-start gap-2">
                      <InformationCircleIcon className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium text-white text-sm mb-1">Example Calculation:</p>
                        <p className="text-sm text-zinc-400">{calculateExample()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Validity Period */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-4">Validity Period</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Valid From <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="date" 
                      defaultValue={couponData.validFrom}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Valid Until <span className="text-red-400">*</span>
                    </label>
                    <input 
                      type="date" 
                      defaultValue={couponData.validUntil}
                      required
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* Usage Limits */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-4">Usage Limits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Maximum Uses
                    </label>
                    <input 
                      type="number" 
                      defaultValue={couponData.maxUses}
                      min="1"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Uses Per Customer
                    </label>
                    <input 
                      type="number" 
                      defaultValue={couponData.usesPerCustomer}
                      min="1"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Minimum Purchase Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
                      <input 
                        type="number" 
                        defaultValue={couponData.minPurchase}
                        min="0"
                        step="0.01"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Maximum Discount Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">$</span>
                      <input 
                        type="number" 
                        defaultValue={couponData.maxDiscount}
                        min="0"
                        step="0.01"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status & Options */}
              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-base font-semibold text-white mb-4">Status & Options</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Coupon Status
                    </label>
                    <select 
                      defaultValue={couponData.status}
                      className="w-full md:w-64 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                    >
                      <option>Active</option>
                      <option>Paused</option>
                      <option>Expired</option>
                    </select>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={couponData.activeStatus}
                      className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer" 
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                        Active immediately
                      </span>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Keep this coupon active and usable
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={couponData.firstTimeOnly}
                      className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer" 
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                        First-time customers only
                      </span>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Restrict this coupon to customers who haven&apos;t made a purchase before
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      defaultChecked={couponData.freeShipping}
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
                      defaultChecked={couponData.excludeSale}
                      className="w-5 h-5 mt-0.5 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-blue-600 focus:ring-offset-zinc-900 cursor-pointer" 
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                        Exclude sale items
                      </span>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Don&apos;t allow this coupon to be used on items already on sale
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
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
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Usage History Tab */}
          {activeTab === 'usage' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-white">Recent Usage</h3>
                <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Download Report
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-zinc-950 border-b border-zinc-800">
                    <tr>
                      <th className="px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">User</th>
                      <th className="px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Order Value</th>
                      <th className="px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wider">Discount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {usageHistory.map((usage) => (
                      <tr key={usage.id} className="hover:bg-zinc-800/50 transition-colors">
                        <td className="px-4 py-3 text-white">{usage.user}</td>
                        <td className="px-4 py-3 text-zinc-400">{usage.date}</td>
                        <td className="px-4 py-3 text-white font-medium">${usage.orderValue}</td>
                        <td className="px-4 py-3 text-emerald-400 font-medium">-${usage.discount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-center pt-4">
                <button className="text-sm text-zinc-400 hover:text-white font-medium transition-colors">
                  Load More History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-zinc-900 border-2 border-red-500/20 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-red-500/10 shrink-0">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white mb-1">Danger Zone</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Irreversible actions that will permanently affect this coupon
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 border border-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                <TrashIcon className="h-4 w-4 inline mr-2" />
                Delete Coupon
              </button>
              <button className="px-4 py-2 bg-amber-600/10 hover:bg-amber-600/20 border border-amber-600/30 text-amber-400 rounded-lg text-sm font-medium transition-colors">
                Reset Usage Count
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
