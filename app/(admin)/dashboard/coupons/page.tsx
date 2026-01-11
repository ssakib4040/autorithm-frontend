"use client";

import Link from 'next/link';
import { PlusIcon, PencilSquareIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline';

const coupons = [
  { id: 1, code: 'WELCOME10', discount: '10%', type: 'Percentage', uses: 154, status: 'Active', expiry: '2025-12-31' },
  { id: 2, code: 'SAVE50', discount: '$50.00', type: 'Fixed Amount', uses: 23, status: 'Active', expiry: '2024-06-30' },
  { id: 3, code: 'FLASH20', discount: '20%', type: 'Percentage', uses: 89, status: 'Expired', expiry: '2024-01-01' },
];

export default function CouponsPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-white">Coupons</h1>
        <div className="flex gap-3">
            <Link
            href="/dashboard/coupons/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
            >
            <PlusIcon className="h-4 w-4" />
            Create Coupon
            </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative">
            <select className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-hidden focus:border-zinc-700">
                <option>All Types</option>
                <option>Percentage</option>
                <option>Fixed Amount</option>
            </select>
            <FunnelIcon className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        </div>
        <div className="relative">
            <select className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-hidden focus:border-zinc-700">
                <option>All Status</option>
                <option>Active</option>
                <option>Expired</option>
                <option>Paused</option>
            </select>
            <FunnelIcon className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        </div>
        <div className="flex-1">
             <input type="text" placeholder="Search coupons..." className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-4 py-2.5 focus:outline-hidden focus:border-zinc-700" />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-zinc-200 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Discount</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Uses</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-white">{coupon.code}</td>
                  <td className="px-6 py-4">{coupon.discount}</td>
                  <td className="px-6 py-4">{coupon.type}</td>
                  <td className="px-6 py-4">{coupon.uses}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        coupon.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                    }`}>
                        {coupon.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{coupon.expiry}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/coupons/${coupon.id}`} className="p-1 hover:text-white transition-colors">
                            <PencilSquareIcon className="h-4 w-4" />
                        </Link>
                        <button className="p-1 hover:text-red-400 transition-colors">
                            <TrashIcon className="h-4 w-4" />
                        </button>
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
