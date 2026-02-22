"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";

import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getHeaderMeta = () => {
    if (pathname.startsWith("/admin/overview")) {
      return {
        title: "Admin Overview",
        subtitle: "Track platform performance and operational health.",
      };
    }
    if (pathname.startsWith("/admin/products")) {
      return {
        title: "Product Management",
        subtitle: "Create, refine, and publish automation products.",
      };
    }
    if (pathname.startsWith("/admin/purchases")) {
      return {
        title: "Purchases",
        subtitle: "Monitor transactions and customer purchase activity.",
      };
    }
    if (pathname.startsWith("/admin/users")) {
      return {
        title: "User Management",
        subtitle: "Review accounts, permissions, and user lifecycle data.",
      };
    }
    if (pathname.startsWith("/admin/coupons")) {
      return {
        title: "Coupons",
        subtitle: "Configure discounts and campaign-level incentives.",
      };
    }
    return {
      title: "Admin Console",
      subtitle: "Manage the Autorithm platform from one place.",
    };
  };

  const headerMeta = getHeaderMeta();
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/65 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <main className="lg:ml-64">
        <header className="sticky top-0 z-20 border-b border-zinc-800/70 bg-zinc-950/90 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="mt-0.5 lg:hidden rounded-lg border border-zinc-800 bg-zinc-900/70 p-2 hover:bg-zinc-800 transition-colors"
                >
                  <Bars3Icon className="h-6 w-6 text-zinc-300" />
                </button>

                <div className="min-w-0">
                  <p className="text-lg sm:text-xl font-semibold text-zinc-50 truncate">
                    {headerMeta.title}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-400 truncate">
                    {headerMeta.subtitle}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3 py-1.5 text-xs text-zinc-300">
                <ShieldCheckIcon className="h-4 w-4 text-emerald-400" />
                <span>Admin Mode</span>
                <span className="text-zinc-600">•</span>
                <span>{todayLabel}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/45 p-3 sm:p-4 lg:p-5">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
