"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cog6ToothIcon,
  RectangleStackIcon,
  ChartBarIcon,
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard/config", label: "Config", icon: Cog6ToothIcon },
    { href: "/dashboard/presets", label: "Presets", icon: RectangleStackIcon },
    { href: "/dashboard/usage", label: "Usage", icon: ChartBarIcon },
    { href: "/dashboard/docs", label: "Docs", icon: DocumentTextIcon },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: AdjustmentsHorizontalIcon,
    },
  ];

  return (
    <>
      <Header width="full" />
      <div className="flex h-screen bg-zinc-950">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-zinc-800">
            <div className="px-4 py-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-medium text-zinc-300">
                  System Active
                </span>
              </div>
              <p className="text-xs text-zinc-500">All workflows running</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto p-8">{children}</div>
        </main>
      </div>
    </>
  );
}
