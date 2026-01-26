import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EditCouponPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/coupons" className="flex items-center text-zinc-400 hover:text-white mb-4 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Coupons
        </Link>
        <h1 className="text-2xl font-bold text-white">Edit Coupon</h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Coupon Code</label>
                <input type="text" defaultValue="WELCOME10" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors uppercase" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Discount Value</label>
                    <input type="number" defaultValue="10" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Type</label>
                    <select defaultValue="Percentage (%)" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors appearance-none">
                        <option>Percentage (%)</option>
                        <option>Fixed Amount ($)</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Valid From</label>
                    <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Valid Until</label>
                    <input type="date" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                <select defaultValue="Active" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors appearance-none">
                    <option>Active</option>
                    <option>Expired</option>
                    <option>Paused</option>
                </select>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <Link href="/dashboard/coupons" className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                    Cancel
                </Link>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
                    Save Changes
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
