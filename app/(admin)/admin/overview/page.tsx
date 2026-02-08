import Link from "next/link";
import {
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  TagIcon,
  DocumentChartBarIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function DashboardOverview() {
  const stats = [
    {
      name: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "positive",
      icon: CurrencyDollarIcon,
    },
    {
      name: "Active Users",
      value: "2,350",
      change: "+180.1%",
      changeType: "positive",
      icon: UsersIcon,
    },
    {
      name: "Sales",
      value: "+12,234",
      change: "+19%",
      changeType: "positive",
      icon: ShoppingBagIcon,
    },
    {
      name: "Conversion",
      value: "3.2%",
      change: "+4.75%",
      changeType: "positive",
      icon: ArrowTrendingUpIcon,
    },
  ];

  const recentOrders = [
    {
      id: "ORD001",
      customer: "Olivia Martin",
      email: "olivia.martin@email.com",
      amount: "$1,999.00",
      status: "Completed",
    },
    {
      id: "ORD002",
      customer: "Jackson Lee",
      email: "jackson.lee@email.com",
      amount: "$39.00",
      status: "Processing",
    },
    {
      id: "ORD003",
      customer: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      amount: "$299.00",
      status: "Completed",
    },
    {
      id: "ORD004",
      customer: "William Kim",
      email: "will@email.com",
      amount: "$99.00",
      status: "Pending",
    },
    {
      id: "ORD005",
      customer: "Sofia Davis",
      email: "sofia.davis@email.com",
      amount: "$39.00",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h2>
        <p className="text-zinc-400 mt-1">
          Here&apos;s an overview of your store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm hover:bg-zinc-900/80 transition-all"
          >
            <div className="flex items-center justify-between space-x-2">
              <div className="text-sm font-medium text-zinc-400">
                {stat.name}
              </div>
              <stat.icon className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-emerald-500 mt-1">
                {stat.change} from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Orders */}
        <div className="lg:col-span-4 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Recent Orders
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  You made 265 sales this month.
                </p>
              </div>
              <Link
                href="/admin/purchases"
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {order.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {order.customer}
                      </p>
                      <p className="text-xs text-zinc-500">{order.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : order.status === "Processing"
                            ? "bg-blue-500/10 text-blue-500"
                            : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {order.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="lg:col-span-3 space-y-6">
          {/* Sales Overview Card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Sales Overview
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Total Products</span>
                  <span className="text-sm font-semibold text-white">124</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-blue-500 to-purple-600 w-[85%]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Total Orders</span>
                  <span className="text-sm font-semibold text-white">265</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-emerald-500 to-teal-600 w-[65%]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-zinc-400">Customers</span>
                  <span className="text-sm font-semibold text-white">
                    2,350
                  </span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-orange-500 to-red-600 w-[90%]"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/products/create"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/30 transition-all group"
              >
                <PlusIcon className="h-6 w-6 text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white">
                  Add Product
                </span>
              </Link>
              <Link
                href="/admin/coupons/create"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-500/30 transition-all group"
              >
                <TagIcon className="h-6 w-6 text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white">
                  New Coupon
                </span>
              </Link>
              <Link
                href="/admin/users"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 hover:border-emerald-500/30 transition-all group"
              >
                <UserGroupIcon className="h-6 w-6 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white">Users</span>
              </Link>
              <Link
                href="/admin/purchases"
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/30 transition-all group"
              >
                <DocumentChartBarIcon className="h-6 w-6 text-orange-500 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-white">Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
