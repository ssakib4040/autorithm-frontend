import Link from "next/link";
import { ReactNode } from "react";

interface AuthShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthShell({
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.2),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_50%_100%,rgba(249,115,22,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[26px_26px]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-xl flex-col justify-center gap-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">
            Autorithm Account
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          <p className="text-sm text-zinc-300 sm:text-base">{description}</p>
        </div>

        {children}

        <p className="text-center text-sm text-zinc-400">
          <Link href="/" className="transition-colors hover:text-zinc-100">
            Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
