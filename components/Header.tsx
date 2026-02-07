"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Menu, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header({
  width = "compact",
}: {
  width?: "full" | "compact";
}) {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const isLoading = status === "loading";

  const navLinks = [
    { href: "/products", label: "Products" },
    { href: "/n8n", label: "N8N Integrations" },
    { href: "/make", label: "Make.com Integrations" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div
        className={`${width !== "full" ? "max-w-7xl" : ""} mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">Autorithm</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <Button disabled size="sm">
                Loading...
              </Button>
            ) : session ? (
              <Button asChild size="sm">
                <Link href="/dashboard/overview">Dashboard</Link>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link href="/auth/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 sm:w-100">
                <SheetHeader>
                  <SheetTitle className="flex items-center space-x-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <span>Autorithm</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-foreground hover:text-primary transition-colors font-medium py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    {isLoading ? (
                      <Button disabled className="w-full">
                        Loading...
                      </Button>
                    ) : session ? (
                      <Button asChild className="w-full">
                        <Link href="/dashboard/overview">Dashboard</Link>
                      </Button>
                    ) : (
                      <Button asChild className="w-full">
                        <Link href="/auth/login">Login</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
