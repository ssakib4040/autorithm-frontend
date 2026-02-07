import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative text-center max-w-2xl">
          {/* 404 with subtle gradient */}
          <div className="mb-8">
            <h1 className="text-8xl sm:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
              404
            </h1>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Page Not Found
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg">
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
    </>
  );
}
