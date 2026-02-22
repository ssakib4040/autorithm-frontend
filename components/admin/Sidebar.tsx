"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  TicketIcon,
  ArrowLeftIcon,
  ChartBarIcon,
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
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-zinc-800/70 bg-zinc-950 transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-zinc-800/70 px-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <Image
              src="/brand-2.svg"
              alt="Autorithm"
              width={36}
              height={36}
              className="h-9 w-9"
            />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-zinc-100">
              Autorithm Admin
            </p>
            <p className="text-[11px] text-zinc-500">Control Center</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors lg:hidden"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <div className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
          Operations
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? "border border-blue-500/20 bg-blue-500/10 text-blue-300"
                    : "border border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/70 hover:text-zinc-200"
                }`}
              >
                <item.icon
                  className={`h-4 w-4 shrink-0 ${
                    isActive
                      ? "text-blue-300"
                      : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                />
                <span className="font-medium">{item.name}</span>
                {isActive && <SparklesIcon className="ml-auto h-4 w-4 text-blue-300" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-zinc-800/70 p-4 space-y-3">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2.5">
          <div className="mb-1.5 flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4 text-zinc-500" />
            <span className="text-xs font-semibold text-zinc-300">System Pulse</span>
          </div>
          <div className="space-y-1 text-[11px] text-zinc-500">
            <div className="flex items-center justify-between">
              <span>API Latency</span>
              <span className="text-emerald-400">Stable</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Queue Health</span>
              <span className="text-emerald-400">Normal</span>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Site
        </Link>
      </div>
    </aside>
  );
}
