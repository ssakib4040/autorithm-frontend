import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";

import "../styles/globals.css";
import AuthProvider from "../components/AuthProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://autorithm.net"),
  title: {
    default: "Autorithm | Production-Ready n8n & Make.com Automation Workflows",
    template: "%s | Autorithm",
  },
  description:
    "Browse production-ready automation workflows, AI systems, and premium templates for n8n and Make.com. Launch proven automations faster with Autorithm.",
  keywords: [
    "n8n workflows",
    "Make.com templates",
    "automation workflows",
    "AI automation",
    "workflow automation",
    "automation marketplace",
    "prebuilt automations",
    "business automation templates",
  ],
  applicationName: "Autorithm",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Autorithm",
    title: "Autorithm | Production-Ready n8n & Make.com Automation Workflows",
    description:
      "Browse production-ready automation workflows, AI systems, and premium templates for n8n and Make.com. Launch proven automations faster with Autorithm.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autorithm | Production-Ready n8n & Make.com Automation Workflows",
    description:
      "Browse production-ready automation workflows, AI systems, and premium templates for n8n and Make.com. Launch proven automations faster with Autorithm.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
        {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
