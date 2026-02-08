import Link from "next/link";
import {
  ArrowTrendingUpIcon,
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  PlusIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

export default function DashboardHome() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      icon: CurrencyDollarIcon,
      trend: "up",
      bgColor: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "Total Users",
      value: "1,234",
      change: "+5.2%",
      icon: UsersIcon,
      trend: "up",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "Products Sold",
      value: "567",
      change: "+8.1%",
      icon: ShoppingBagIcon,
      trend: "up",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-500",
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "-0.5%",
      icon: ArrowTrendingUpIcon,
      trend: "down",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
  ];

  const quickActions = [
    {
      label: "Add Product",
      href: "/admin/products/create",
      icon: PlusIcon,
      color: "blue",
    },
    {
      label: "Add Coupon",
      href: "/admin/coupons/create",
      icon: PlusIcon,
      color: "purple",
    },
    {
      label: "View Users",
      href: "/admin/users",
      icon: UsersIcon,
      color: "emerald",
    },
    {
      label: "Analytics",
      href: "/admin/purchases",
      icon: ChartBarIcon,
      color: "orange",
    },
  ];

  const recentActivity = [
    {
      type: "purchase",
      user: "John Doe",
      action: "purchased",
      item: "SEO Automation Kit",
      amount: "$49.00",
      time: "2 min ago",
      status: "success",
    },
    {
      type: "user",
      user: "Jane Smith",
      action: "registered",
      item: "New account",
      time: "15 min ago",
      status: "success",
    },
    {
      type: "purchase",
      user: "Mike Johnson",
      action: "purchased",
      item: "Email Outreach System",
      amount: "$99.00",
      time: "1 hour ago",
      status: "success",
    },
    {
      type: "purchase",
      user: "Sarah Wilson",
      action: "payment failed",
      item: "Lead Scoring Workflow",
      time: "2 hours ago",
      status: "failed",
    },
    {
      type: "product",
      user: "Admin",
      action: "updated",
      item: "Social Media Scheduler",
      time: "3 hours ago",
      status: "success",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
          Dashboard Overview
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 sm:p-5 hover:border-zinc-700 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-zinc-400 text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 flex-wrap">
                  <span
                    className={`text-xs font-semibold ${
                      stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                  <span className="text-xs text-zinc-500">vs last month</span>
                </div>
              </div>
              <div className={`${stat.bgColor} p-2.5 sm:p-3 rounded-lg`}>
                <stat.icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-base sm:text-lg font-semibold text-white mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className={`bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4 hover:border-${action.color}-500/50 hover:bg-zinc-800/50 transition-all group`}
            >
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                <div
                  className={`bg-${action.color}-500/10 p-2 sm:p-2.5 rounded-lg group-hover:bg-${action.color}-500/20 transition-colors`}
                >
                  <action.icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 text-${action.color}-500`}
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  {action.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg">
        <div className="p-4 sm:p-5 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-semibold text-white">
              Recent Activity
            </h2>
            <Link
              href="/admin/purchases"
              className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 font-medium"
            >
              View all
            </Link>
          </div>
        </div>
        <div className="divide-y divide-zinc-800">
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 hover:bg-zinc-800/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 sm:gap-4">
                <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                  <div
                    className={`mt-0.5 sm:mt-1 ${
                      activity.status === "success"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-red-500/10 text-red-400"
                    } p-1.5 sm:p-2 rounded-lg shrink-0`}
                  >
                    {activity.status === "success" ? (
                      <CheckCircleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    ) : (
                      <XCircleIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm text-white font-medium wrap-break-word">
                      <span className="text-zinc-300">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="text-zinc-300">{activity.item}</span>
                    </p>
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                      <ClockIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-500 shrink-0" />
                      <span className="text-xs text-zinc-500">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                </div>
                {activity.amount && (
                  <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0">
                    {activity.amount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
