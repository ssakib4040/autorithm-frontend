"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import { adminProductsApi } from "@/features/admin/products";

interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  status: string;
  tool: string;
  sales?: number;
  revenue?: string;
}

export default function ProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  console.log("session > ", session);

  const fetchProducts = async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);
      const data = await adminProductsApi.getAll(session.accessToken, {
        status: selectedStatus,
        category: selectedCategory,
      });
      setProducts(data.products || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStatus, selectedCategory, session]);

  const handleDelete = async (slug: string, tool: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    if (!session?.accessToken) return;

    try {
      await adminProductsApi.delete(session.accessToken, slug, tool);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const stats = [
    {
      name: "Total Products",
      value: "124",
      icon: ShoppingBagIcon,
      color: "blue",
    },
    {
      name: "Active Products",
      value: "98",
      icon: ChartBarIcon,
      color: "emerald",
    },
    {
      name: "Total Revenue",
      value: "$45,231",
      icon: CurrencyDollarIcon,
      color: "purple",
    },
    {
      name: "Archived",
      value: "12",
      icon: ArchiveBoxIcon,
      color: "orange",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Products
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your automation products and inventory
          </p>
        </div>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
        >
          <PlusIcon className="h-4 w-4" />
          Add Product
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">All Categories</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>Social Media</option>
            <option>Operations</option>
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Archived</option>
          </select>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden space-y-4">
        {loading ? (
          <div className="text-center py-8 text-zinc-400">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-8 text-zinc-400">
            No products found
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={`${product.slug}-${product.tool}`}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <ShoppingBagIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {product.category}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${
                    product.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                  }`}
                >
                  {product.status.charAt(0).toUpperCase() +
                    product.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Price</p>
                  <p className="text-sm font-semibold text-white">
                    ${product.price}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Sales</p>
                  <p className="text-sm text-zinc-300">{product.sales || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Revenue</p>
                  <p className="text-sm font-semibold text-white">
                    {product.revenue || "$0"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
                <Link
                  href={`/admin/products/${product.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.slug, product.tool)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      {/* Desktop Table View */}
      <div className="hidden lg:block rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Sales
                </th>
                <th className="text-left text-xs font-medium text-zinc-400 uppercase tracking-wider px-6 py-4">
                  Revenue
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
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-zinc-400"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-zinc-400"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={`${product.slug}-${product.tool}`}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <ShoppingBagIcon className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-zinc-400">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        ${product.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-zinc-400">
                        {product.sales || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        {product.revenue || "$0"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          product.status === "active"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20"
                        }`}
                      >
                        {product.status.charAt(0).toUpperCase() +
                          product.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.slug}`}
                          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors group"
                        >
                          <PencilSquareIcon className="h-4 w-4 text-zinc-400 group-hover:text-blue-400" />
                        </Link>
                        <button
                          onClick={() =>
                            handleDelete(product.slug, product.tool)
                          }
                          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors group"
                        >
                          <TrashIcon className="h-4 w-4 text-zinc-400 group-hover:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
