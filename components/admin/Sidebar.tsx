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
  XMarkIcon,
  SparklesIcon,
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
      className={`fixed bottom-0 left-0 top-0 z-40 flex min-h-screen w-72 flex-col border-r border-white/10 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-teal-400 to-blue-500 shadow-lg shadow-teal-500/20">
            <Squares2X2Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white">
              AUTORITHM
            </div>
            <div className="text-xs text-zinc-400">Admin Control Room</div>
          </div>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-100 lg:hidden"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        <nav className="space-y-1 px-4">
          {navigation.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-linear-to-r from-teal-500/20 to-blue-500/15 text-teal-200"
                    : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-100"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 transition-colors ${
                    isActive
                      ? "text-teal-300"
                      : "text-zinc-500 group-hover:text-zinc-200"
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-300"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-3">
          <div className="mb-1 flex items-center gap-2">
            <SparklesIcon className="h-4 w-4 text-teal-300" />
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-zinc-400">
              Quick Stats
            </span>
          </div>
          <div className="text-xs text-zinc-500">
            <div className="flex justify-between py-0.5">
              <span>Today&apos;s Sales:</span>
              <span className="font-medium text-zinc-200">$1,234</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span>Active Users:</span>
              <span className="font-medium text-zinc-200">42</span>
            </div>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-500 transition-all hover:bg-zinc-800/60 hover:text-zinc-200"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </div>
  );
}
