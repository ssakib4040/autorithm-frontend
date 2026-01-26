"use client";

import Link from 'next/link';
import { PlusIcon, PencilSquareIcon, TrashIcon, FunnelIcon } from '@heroicons/react/24/outline';

const products = [
  { id: 1, name: 'SEO Automation Kit', price: '$49.00', category: 'Marketing', status: 'Active', sales: 124 },
  { id: 2, name: 'Social Media Scheduler', price: '$29.00', category: 'Social Media', status: 'Active', sales: 98 },
  { id: 3, name: 'Email Outreach System', price: '$99.00', category: 'Sales', status: 'Draft', sales: 0 },
  { id: 4, name: 'Lead Scoring Workflow', price: '$59.00', category: 'Sales', status: 'Active', sales: 45 },
];

export default function ProductsPage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <div className="flex gap-3">
            <Link
            href="/dashboard/products/create"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
            >
            <PlusIcon className="h-4 w-4" />
            Add Product
            </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative">
            <select className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-hidden focus:border-zinc-700">
                <option>All Categories</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Social Media</option>
                <option>Operations</option>
            </select>
            <FunnelIcon className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        </div>
        <div className="relative">
            <select className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:outline-hidden focus:border-zinc-700">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
            </select>
            <FunnelIcon className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
        </div>
        <div className="flex-1">
             <input type="text" placeholder="Search products..." className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-4 py-2.5 focus:outline-hidden focus:border-zinc-700" />
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-zinc-950 text-zinc-200 uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sales</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        product.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'
                    }`}>
                        {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{product.sales}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        <Link href={`/dashboard/products/${product.id}`} className="p-1 hover:text-white transition-colors">
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
