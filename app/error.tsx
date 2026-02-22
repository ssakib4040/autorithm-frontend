"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, LifeBuoy } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.log("Error:", error);

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-zinc-50 via-white to-zinc-100 px-4 py-16 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.14),transparent_45%),radial-gradient(circle_at_80%_5%,rgba(251,146,60,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)] bg-size-[28px_28px] opacity-35 dark:opacity-20" />

      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl border border-zinc-200/80 bg-white/90 p-8 text-center shadow-sm backdrop-blur sm:p-12 dark:border-zinc-800 dark:bg-zinc-900/80">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-200 bg-rose-100 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
            Something Went Wrong
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
            We hit an unexpected issue while processing this page. You can try
            again, go back to the homepage, or contact support if the problem
            persists.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-teal-400"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <LifeBuoy className="h-4 w-4" />
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
