import Link from "next/link";
import { Geist } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function NotFound() {
  return (
    <div
      className={`${geistSans.variable} font-sans min-h-screen bg-white dark:bg-zinc-900 flex flex-col`}
    >
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-zinc-900 dark:text-white"
              >
                Autorithm
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/products"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Products
              </Link>
              <Link
                href="/#services"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
              >
                Get Custom Automation
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center">
          {/* Abstract broken workflow visual */}
          <div className="mb-8 flex justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48">
              {/* Disconnected nodes representing broken workflow */}
              <circle
                cx="50"
                cy="80"
                r="20"
                fill="currentColor"
                className="text-zinc-300 dark:text-zinc-700"
              />
              <circle
                cx="150"
                cy="80"
                r="20"
                fill="currentColor"
                className="text-zinc-300 dark:text-zinc-700"
              />
              <circle
                cx="100"
                cy="140"
                r="20"
                fill="currentColor"
                className="text-zinc-300 dark:text-zinc-700"
              />

              {/* Broken connection lines */}
              <line
                x1="70"
                y1="80"
                x2="90"
                y2="80"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="text-zinc-300 dark:text-zinc-700"
              />
              <line
                x1="110"
                y1="80"
                x2="130"
                y2="80"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="text-zinc-300 dark:text-zinc-700"
              />
              <line
                x1="65"
                y1="95"
                x2="90"
                y2="125"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="text-zinc-300 dark:text-zinc-700"
              />
              <line
                x1="135"
                y1="95"
                x2="110"
                y2="125"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="5,5"
                className="text-zinc-300 dark:text-zinc-700"
              />

              {/* Error X in the middle */}
              <line
                x1="90"
                y1="90"
                x2="110"
                y2="110"
                stroke="currentColor"
                strokeWidth="4"
                className="text-red-500"
              />
              <line
                x1="110"
                y1="90"
                x2="90"
                y2="110"
                stroke="currentColor"
                strokeWidth="4"
                className="text-red-500"
              />
            </svg>
          </div>

          <div className="font-mono text-7xl sm:text-8xl font-bold text-zinc-900 dark:text-white mb-4">
            404
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Workflow Not Found
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
            Looks like this automation path doesn't exist. The page you're
            looking for might have been moved or deleted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/products"
              className="px-8 py-4 rounded-lg border-2 border-zinc-900 dark:border-white text-zinc-900 dark:text-white font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Browse Products
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              Need help finding something?{" "}
              <Link
                href="/#contact"
                className="text-zinc-900 dark:text-white hover:underline font-medium"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-white font-bold text-xl mb-4 md:mb-0">
              Autorithm
            </div>
            <div className="flex gap-8 text-zinc-400">
              <Link
                href="/products"
                className="hover:text-white transition-colors"
              >
                Products
              </Link>
              <Link
                href="/#services"
                className="hover:text-white transition-colors"
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 text-sm">
            © 2025 Autorithm. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
