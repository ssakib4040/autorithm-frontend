"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CommandLineIcon,
  RectangleStackIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard/config", label: "Controls", icon: CommandLineIcon },
    { href: "/dashboard/presets", label: "Presets", icon: RectangleStackIcon },
    { href: "/dashboard/usage", label: "Usage", icon: ChartBarIcon },
    { href: "/dashboard/settings", label: "Backup & Restore", icon: ShieldCheckIcon },
    { href: "/dashboard/docs", label: "Docs", icon: DocumentTextIcon },
  ];

  return (
    <>
      <Header width="full" />
      <div className="flex h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900/50 backdrop-blur-xl border-r border-zinc-800/50 flex flex-col">
          <div className="p-6 border-b border-zinc-800/50">
            <div className="flex items-center gap-2">
              <Squares2X2Icon className="h-6 w-6 text-blue-400" />
              <h1 className="text-lg font-bold text-white">Autorithm</h1>
            </div>
            <p className="text-xs text-zinc-500 mt-1">Automation Studio</p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/20"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform ${
                      isActive ? "" : "group-hover:scale-110"
                    }`}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-zinc-800/50">
            <div className="px-4 py-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-semibold text-emerald-300">
                  All Systems Active
                </span>
              </div>
              <p className="text-xs text-emerald-400/60">Runtime optimal</p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-8">{children}</div>
        </main>
      </div>
    </>
  );
}
