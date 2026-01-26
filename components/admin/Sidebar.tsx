"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  UsersIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  TicketIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon },
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Products", href: "/admin/products", icon: ShoppingBagIcon },
  { name: "Purchases", href: "/admin/purchases", icon: CreditCardIcon },
  { name: "Coupons", href: "/admin/coupons", icon: TicketIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen fixed left-0 top-0 bottom-0">
      <div className="flex items-center justify-center h-16 border-b border-zinc-800">
        <span className="text-xl font-bold text-white tracking-wider">
          AUTORITHM
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 group-hover:text-white"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-zinc-800">
        <Link
          href="/"
          className="flex items-center px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors"
        >
          <ArrowUturnLeftIcon className="mr-3 h-5 w-5" />
          Back to Site
        </Link>
      </div>
    </div>
  );
}
