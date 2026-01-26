import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function PurchaseDetailsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/dashboard/purchases" className="flex items-center text-zinc-400 hover:text-white mb-4 transition-colors">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Purchases
        </Link>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Purchase #1001</h1>
            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/10 text-emerald-400">
                Completed
            </span>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-8">
            <div>
                <h3 className="text-sm font-medium text-zinc-500 uppercase mb-4">Customer Details</h3>
                <div className="space-y-3">
                    <div>
                        <span className="block text-xs text-zinc-500">Name</span>
                        <span className="text-white">Alice Johnson</span>
                    </div>
                    <div>
                        <span className="block text-xs text-zinc-500">Email</span>
                        <span className="text-white">alice@example.com</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-sm font-medium text-zinc-500 uppercase mb-4">Order Details</h3>
                <div className="space-y-3">
                    <div>
                        <span className="block text-xs text-zinc-500">Date</span>
                        <span className="text-white">March 20, 2024 at 10:30 AM</span>
                    </div>
                    <div>
                        <span className="block text-xs text-zinc-500">Total</span>
                        <span className="text-xl font-bold text-white">$49.00</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
        <h3 className="text-sm font-medium text-zinc-500 uppercase mb-4">Line Items</h3>
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
            <table className="w-full text-left text-sm text-zinc-400">
                <thead className="bg-zinc-950 font-medium">
                    <tr>
                        <th className="px-4 py-3">Item</th>
                        <th className="px-4 py-3 text-right">Price</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                    <tr>
                        <td className="px-4 py-3 text-white">SEO Automation Kit</td>
                        <td className="px-4 py-3 text-right">$49.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-3 rounded-lg border border-red-900/50 text-red-500 hover:bg-red-900/10 transition-colors font-medium">
            Refund Order
        </button>
        <button className="flex-1 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
            Send Receipt
        </button>
      </div>
    </div>
  );
}
