import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  PlusIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import ProductsClient from "./ProductsClient";

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

interface PageProps {
  searchParams: Promise<{
    status?: string;
    category?: string;
    search?: string;
  }>;
}

async function getProducts(
  token: string,
  params: { status?: string; category?: string; search?: string },
) {
  const searchParams = new URLSearchParams();
  if (params?.status) searchParams.append("status", params.status);
  if (params?.category) searchParams.append("category", params.category);
  if (params?.search) searchParams.append("search", params.search);

  const queryString = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/admin/products${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store", // Ensures fresh data on each request
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);
  const params = await searchParams;

  // Redirect if not authenticated
  if (!session?.accessToken) {
    redirect("/auth/login");
  }

  // Redirect if not admin
  if (!session?.user?.isAdmin) {
    redirect("/dashboard/overview");
  }

  // Fetch products server-side
  const data = await getProducts(session.accessToken, {
    status: params.status,
    category: params.category,
    search: params.search,
  });

  const products: Product[] = data.products || [];
  const stats = data.meta || {
    totalProducts: 0,
    activeProducts: 0,
    draftProducts: 0,
    totalRevenue: 0,
  };

  const statsDisplay = [
    {
      name: "Total Products",
      value: stats.totalProducts.toString(),
      icon: ShoppingBagIcon,
      color: "blue",
    },
    {
      name: "Active Products",
      value: stats.activeProducts.toString(),
      icon: ChartBarIcon,
      color: "emerald",
    },
    {
      name: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: "purple",
    },
    {
      name: "Draft Products",
      value: stats.draftProducts.toString(),
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
        {statsDisplay.map((stat) => (
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

      {/* Client-side interactive components */}
      <ProductsClient
        initialProducts={products}
        initialSearchQuery={params.search}
        initialCategory={params.category}
        initialStatus={params.status}
      />
    </div>
  );
}
