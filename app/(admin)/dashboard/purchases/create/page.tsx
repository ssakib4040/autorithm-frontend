import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function CreatePurchasePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/purchases" className="flex items-center text-zinc-400 hover:text-white mb-4 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Purchases
        </Link>
        <h1 className="text-2xl font-bold text-white">Log Manual Purchase</h1>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-zinc-400 mb-2">User Email</label>
                <input type="email" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" placeholder="user@example.com" />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Product</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors appearance-none">
                        <option>Select Product...</option>
                        <option>SEO Automation Kit</option>
                        <option>Social Media Scheduler</option>
                        <option>Email Outreach System</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Amount ($)</label>
                    <input type="number" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors" placeholder="0.00" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Payment Method</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors appearance-none">
                        <option>Credit Card (Stripe)</option>
                        <option>PayPal</option>
                        <option>Bank Transfer</option>
                        <option>Manual / Cash</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Status</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-hidden focus:border-blue-500 transition-colors appearance-none">
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Failed</option>
                    </select>
                </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <Link href="/dashboard/purchases" className="px-4 py-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                    Cancel
                </Link>
                <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
                    Log Purchase
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}
