import Link from "next/link";
import { ReactNode } from "react";

interface PolicyShellProps {
  badge: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function PolicyShell({
  badge,
  title,
  subtitle,
  lastUpdated,
  icon,
  children,
}: PolicyShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.16),transparent_45%),radial-gradient(circle_at_90%_0%,rgba(251,191,36,0.14),transparent_38%),radial-gradient(circle_at_20%_100%,rgba(59,130,246,0.15),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[28px_28px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-200">
            {icon}
            <span>{badge}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-3 text-lg text-zinc-300">{subtitle}</p>
          <p className="mt-2 text-sm text-zinc-400">Last updated: {lastUpdated}</p>
        </div>

        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/85 p-6 shadow-2xl shadow-black/25 backdrop-blur sm:p-10">
          <div className="space-y-8 text-zinc-300">{children}</div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-100"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
