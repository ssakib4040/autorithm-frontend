"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  TicketIcon,
  ArrowLeftIcon,
  Squares2X2Icon,
  ChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Overview", href: "/admin/overview", icon: HomeIcon, exact: true },
  { name: "Products", href: "/admin/products", icon: ShoppingBagIcon },
  { name: "Purchases", href: "/admin/purchases", icon: CreditCardIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Coupons", href: "/admin/coupons", icon: TicketIcon },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`flex flex-col w-64 bg-zinc-950 border-r border-zinc-800/50 min-h-screen fixed left-0 top-0 bottom-0 z-40 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Squares2X2Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-tight">
              AUTORITHM
            </div>
            <div className="text-xs text-zinc-500">Admin Panel</div>
          </div>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
        >
          <XMarkIcon className="h-5 w-5 text-zinc-400" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    isActive
                      ? "text-blue-400"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-800/50 space-y-3">
        <div className="px-3 py-2.5 bg-zinc-900/50 rounded-lg border border-zinc-800/50">
          <div className="flex items-center gap-2 mb-1">
            <ChartBarIcon className="h-4 w-4 text-zinc-500" />
            <span className="text-xs font-medium text-zinc-400">
              Quick Stats
            </span>
          </div>
          <div className="text-xs text-zinc-500">
            <div className="flex justify-between py-0.5">
              <span>Today&apos;s Sales:</span>
              <span className="text-zinc-300 font-medium">$1,234</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Active Users:</span>
              <span className="text-zinc-300 font-medium">42</span>
            </div>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 rounded-lg transition-all"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </div>
  );
}
