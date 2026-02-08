"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Hide header and footer for dashboard and admin routes
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAdmin = pathname?.startsWith("/admin");
  const hideLayout = isDashboard || isAdmin;

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header width="full" />
      {children}
      <Footer />
    </>
  );
}
