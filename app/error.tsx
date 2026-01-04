"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-zinc-900 dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
            We encountered an unexpected error while processing your request.
            Our team has been notified and is working on a fix.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-8 py-4 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-8 py-4 rounded-lg border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Go Home
            </Link>
          </div>

          {/* Support Link */}
          <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
            Need help?{" "}
            <Link
              href="/contact"
              className="text-zinc-900 dark:text-white hover:underline font-medium"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
