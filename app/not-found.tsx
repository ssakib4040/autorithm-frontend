import Link from "next/link";
import { Metadata } from "next";
import { Home, ArrowRight, Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found - Autorithm",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-zinc-50 via-white to-zinc-100 px-4 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.16),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)] bg-size-[28px_28px] opacity-35 dark:opacity-20" />

      <div className="relative mx-auto flex min-h-screen max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl border border-zinc-200/80 bg-white/90 p-8 text-center shadow-sm backdrop-blur sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <Compass className="h-3.5 w-3.5" />
            Route Missing
          </div>
          <h1 className="mb-3 text-7xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-8xl">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white sm:text-3xl">
            Page Not Found
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-zinc-600 dark:text-zinc-400">
            This route does not exist anymore, or the URL was entered
            incorrectly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-teal-500 text-zinc-950 hover:bg-teal-400">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
