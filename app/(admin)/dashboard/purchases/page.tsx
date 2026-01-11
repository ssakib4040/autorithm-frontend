import Link from 'next/link';
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline';

const purchases = [
  { id: 1001, user: 'Alice Johnson', product: 'SEO Automation Kit', amount: '$49.00', date: '2024-03-20', status: 'Completed' },
  { id: 1002, user: 'Bob Smith', product: 'Social Media Scheduler', amount: '$29.00', date: '2024-03-21', status: 'Refunded' },
  { id: 1003, user: 'Charlie Brown', product: 'Email Outreach System', amount: '$99.00', date: '2024-03-21', status: 'Pending' },
  { id: 1004, user: 'Diana Ross', product: 'SEO Automation Kit', amount: '$49.00', date: '2024-03-22', status: 'Completed' },
];

export default function PurchasesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Purchases</h1>
        <Link
          href="/dashboard/purchases/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Log Purchase
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-zinc-200 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-white">#{purchase.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{purchase.user}</td>
                  <td className="px-6 py-4">{purchase.product}</td>
                  <td className="px-6 py-4">{purchase.amount}</td>
                  <td className="px-6 py-4">{purchase.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        purchase.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                        purchase.status === 'Refunded' ? 'bg-red-500/10 text-red-400' : 
                        'bg-yellow-500/10 text-yellow-400'
                    }`}>
                        {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/purchases/${purchase.id}`} className="p-1 hover:text-white transition-colors">
                            <EyeIcon className="h-4 w-4" />
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
