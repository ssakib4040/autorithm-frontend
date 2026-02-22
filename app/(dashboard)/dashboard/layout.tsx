"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutGrid,
  ShoppingBag,
  MessageSquare,
  Heart,
  Activity,
  CreditCard,
  Settings,
  Gift,
  Star,
  HardDrive,
  ChevronRight,
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  {
    href: "/dashboard/overview",
    label: "Overview",
    icon: LayoutGrid,
  },
  {
    href: "/dashboard/purchases",
    label: "My Purchases",
    icon: ShoppingBag,
  },
  {
    href: "/dashboard/wishlist",
    label: "Wishlist",
    icon: Heart,
  },
  {
    href: "/dashboard/activity",
    label: "Activity Log",
    icon: Activity,
  },
  {
    href: "/dashboard/billing",
    label: "Billing & Invoices",
    icon: CreditCard,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
  {
    href: "/dashboard/referral",
    label: "Referral Program",
    icon: Gift,
  },
  {
    href: "/dashboard/reviews",
    label: "Reviews & Ratings",
    icon: Star,
  },
  {
    href: "/dashboard/backup",
    label: "Backup & Restore",
    icon: HardDrive,
  },
  {
    href: "/dashboard/support",
    label: "Support",
    icon: MessageSquare,
  },
];

function getPageMeta(pathname: string) {
  if (pathname.includes("/overview")) {
    return {
      title: "Overview",
      subtitle: "Track your activity, purchases, and account health.",
    };
  }
  if (pathname.includes("/purchases")) {
    return {
      title: "My Purchases",
      subtitle: "Manage purchased workflows and access your assets.",
    };
  }
  if (pathname.includes("/wishlist")) {
    return {
      title: "Wishlist",
      subtitle: "Save automation kits you want to revisit later.",
    };
  }
  if (pathname.includes("/activity")) {
    return {
      title: "Activity Log",
      subtitle: "Review recent actions and account events.",
    };
  }
  if (pathname.includes("/billing")) {
    return {
      title: "Billing & Invoices",
      subtitle: "Monitor payment history and billing details.",
    };
  }
  if (pathname.includes("/settings")) {
    return {
      title: "Settings",
      subtitle: "Update profile details and account preferences.",
    };
  }
  if (pathname.includes("/referral")) {
    return {
      title: "Referral Program",
      subtitle: "Invite others and track referral performance.",
    };
  }
  if (pathname.includes("/reviews")) {
    return {
      title: "Reviews & Ratings",
      subtitle: "Share feedback and manage your submitted reviews.",
    };
  }
  if (pathname.includes("/backup")) {
    return {
      title: "Backup & Restore",
      subtitle: "Securely export and recover your dashboard data.",
    };
  }
  if (pathname.includes("/support")) {
    return {
      title: "Support",
      subtitle: "Get help with product setup and troubleshooting.",
    };
  }
  return {
    title: "Dashboard",
    subtitle: "Manage your Autorithm workspace.",
  };
}

function getUserInitials(name?: string | null) {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function UserMenu({
  name,
  email,
  compact = false,
}: {
  name?: string | null;
  email?: string | null;
  compact?: boolean;
}) {
  const initials = getUserInitials(name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="h-auto gap-3 rounded-xl px-2.5 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Avatar className="h-8 w-8 border border-zinc-200 dark:border-zinc-800">
              <AvatarFallback className="bg-blue-600 text-white text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {name || "User"}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-44">
                {email || ""}
              </p>
            </div>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{name || "User"}</p>
            <p className="text-xs text-zinc-500">{email || ""}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/docs" className="cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            Help & Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600 dark:text-red-400"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="border-b border-zinc-200 dark:border-zinc-800 p-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
            <Image
              src="/brand-2.svg"
              alt="Autorithm"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Autorithm
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Workspace
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} onClick={onLinkClick}>
              <Button
                variant="ghost"
                className={cn(
                  "h-auto w-full justify-start rounded-xl px-3 py-2.5",
                  isActive
                    ? "border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300 dark:hover:bg-blue-950/30"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="ml-2 text-sm font-medium">{item.label}</span>
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator />

      <div className="p-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/20">
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Workspace Healthy
            </span>
          </div>
          <p className="text-xs text-emerald-700/80 dark:text-emerald-500">
            All services are responding normally.
          </p>
        </div>
      </div>
    </>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pageMeta = getPageMeta(pathname);
  const todayLabel = new Date().toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="dashboard-theme flex h-screen overflow-hidden bg-linear-to-br from-zinc-50 via-cyan-50/40 to-white dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
      <aside className="hidden lg:flex w-72 flex-col overflow-hidden border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <SidebarContent />
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex h-full flex-col">
                  <SidebarContent onLinkClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <div className="h-8 w-8 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              <Image
                src="/brand-2.svg"
                alt="Autorithm"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Dashboard
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl text-zinc-600 dark:text-zinc-300"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal-400" />
            </Button>
            <UserMenu name={session?.user?.name} email={session?.user?.email} compact />
          </div>
        </div>
      </div>

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden pt-[61px] lg:pt-0">
        <header className="hidden lg:block sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/85">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div>
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {pageMeta.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {pageMeta.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                <Input
                  placeholder="Search dashboard"
                  className="w-72 rounded-xl border-zinc-200 bg-white pl-9 dark:border-zinc-800 dark:bg-zinc-900"
                />
              </div>

              <div className="hidden md:flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                <Sparkles className="h-3.5 w-3.5 text-teal-300" />
                <span>{todayLabel}</span>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl text-zinc-600 dark:text-zinc-300"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-teal-400" />
              </Button>

              <UserMenu name={session?.user?.name} email={session?.user?.email} />
            </div>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <section className="dashboard-surface p-3 sm:p-4 lg:p-5">
              {children}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
