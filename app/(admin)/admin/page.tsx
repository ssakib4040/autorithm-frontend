"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function AdminLandingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/admin/overview");
    }, 450);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="admin-theme relative flex min-h-[70vh] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.14),transparent_35%)]" />
      <div className="relative text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
          <ArrowPathIcon className="h-6 w-6 animate-spin" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
          Redirecting to Admin Overview
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Preparing your workspace and recent platform metrics.
        </p>
        <Link
          href="/admin/overview"
          className="mt-5 inline-flex rounded-lg border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition-colors hover:border-teal-400/60 hover:text-teal-200"
        >
          Continue now
        </Link>
      </div>
    </div>
  );
}
