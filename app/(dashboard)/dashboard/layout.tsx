"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutGrid,
  Sliders,
  Layers,
  BarChart3,
  Shield,
  BookOpen,
  ChevronRight,
  Menu,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
    description: "Dashboard home",
  },
  {
    href: "/dashboard/config/demo-project",
    label: "Controls",
    icon: Sliders,
    description: "Project settings",
  },
  {
    href: "/dashboard/presets",
    label: "Presets",
    icon: Layers,
    description: "Saved configurations",
  },
  {
    href: "/dashboard/usage",
    label: "Usage",
    icon: BarChart3,
    description: "Analytics & stats",
  },
  {
    href: "/dashboard/settings",
    label: "Backup & Restore",
    icon: Shield,
    description: "Data protection",
  },
  {
    href: "/dashboard/docs",
    label: "Documentation",
    icon: BookOpen,
    description: "Guides & help",
  },
];

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {/* Header */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
              Autorithm
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Automation Studio
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href.split("?")[0]);
          return (
            <Link key={item.href} href={item.href} onClick={onLinkClick}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-auto py-3 px-4",
                  isActive
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive
                      ? "text-white"
                      : "text-zinc-600 dark:text-zinc-400",
                  )}
                />
                <div className="flex-1 text-left">
                  <div
                    className={cn(
                      "text-sm font-medium",
                      isActive
                        ? "text-white"
                        : "text-zinc-900 dark:text-zinc-100",
                    )}
                  >
                    {item.label}
                  </div>
                  <div
                    className={cn(
                      "text-xs",
                      isActive
                        ? "text-blue-100"
                        : "text-zinc-500 dark:text-zinc-400",
                    )}
                  >
                    {item.description}
                  </div>
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Button>
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* Footer - Status */}
      <div className="p-4">
        <div className="px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              All Systems Active
            </span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-500">
            Runtime optimal
          </p>
        </div>
      </div>
    </>
  );
}

function DashboardHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  // Get page title based on route
  const getPageTitle = () => {
    if (pathname?.includes("/overview")) return "Overview";
    if (pathname?.includes("/config")) return "Controls";
    if (pathname?.includes("/presets")) return "Presets";
    if (pathname?.includes("/usage")) return "Usage";
    if (pathname?.includes("/settings")) return "Backup & Restore";
    if (pathname?.includes("/docs")) return "Documentation";
    return "Dashboard";
  };

  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {getPageTitle()}
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Welcome back, {session?.user?.name || "User"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
        </Button>

        {/* Separator */}
        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800"></div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 h-auto py-2 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-blue-500 text-white text-sm font-semibold">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-zinc-900 dark:text-white">
                  {session?.user?.name || "User"}
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  {session?.user?.email || ""}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
              className="text-red-600 dark:text-red-400 cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const getUserInitials = () => {
    if (!session?.user?.name) return "U";
    return session.user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 flex-col overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  <SidebarContent
                    onLinkClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>

            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <LayoutGrid className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-sm font-bold text-zinc-900 dark:text-white">
              Autorithm
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-zinc-600 dark:text-zinc-400"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-500 text-white text-xs font-semibold">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {session?.user?.email || ""}
                    </p>
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
                  className="text-red-600 dark:text-red-400 cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-16 lg:pt-0">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <DashboardHeader />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
