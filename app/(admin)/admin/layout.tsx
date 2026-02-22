"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pageTitle =
    pathname === "/admin/overview"
      ? "Overview"
      : pathname
          .split("/")
          .filter(Boolean)
          .at(-1)
          ?.replace(/-/g, " ")
          ?.replace(/\b\w/g, (char) => char.toUpperCase()) || "Dashboard";

  return (
    <div className="admin-theme relative flex min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_20%_100%,rgba(249,115,22,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[26px_26px]" />

      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="relative flex-1 lg:ml-72">
        <div className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="rounded-lg border border-white/10 bg-zinc-900/70 p-2 text-zinc-300 transition hover:border-teal-400/40 hover:text-zinc-100 lg:hidden"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Admin Console
                  </p>
                  <h1 className="text-lg font-semibold tracking-tight text-white sm:text-2xl">
                    {pageTitle}
                  </h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="relative min-w-[220px] flex-1 sm:flex-none">
                  <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search products, users, purchases..."
                    className="h-10 w-full rounded-xl border border-white/10 bg-zinc-900/70 pl-9 pr-3 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-teal-400/50"
                  />
                </div>

                <Link
                  href="/admin/products/create"
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-teal-400 px-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-teal-300"
                >
                  <PlusIcon className="h-4 w-4" />
                  New Product
                </Link>

                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/70 text-zinc-300 transition hover:border-teal-400/40 hover:text-zinc-100">
                  <BellIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
