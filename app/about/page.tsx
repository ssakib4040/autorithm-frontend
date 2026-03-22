import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Workflow, Wrench } from "lucide-react";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const siteUrl = "https://autorithm.net";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Autorithm and how we build production-ready n8n and Make.com automation systems for real business workflows.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Autorithm",
    description:
      "Learn about Autorithm and how we build production-ready n8n and Make.com automation systems for real business workflows.",
    url: `${siteUrl}/about`,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", item: siteUrl },
          { name: "About", item: `${siteUrl}/about` },
        ]}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 py-24">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            About Autorithm
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
            We build automations that hold up in production
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl">
            Autorithm focuses on practical automation systems for teams that
            need reliability, speed, and clean handoff. We create premium n8n
            and Make.com workflows that reduce implementation time without
            sacrificing quality.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/products">
                Explore Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Workflow className="h-6 w-6 text-blue-600" />
              <CardTitle>Workflow-first</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-600 dark:text-zinc-400">
              We design around business outcomes, then map automation logic that
              is easy to maintain.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <CardTitle>Production-minded</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-600 dark:text-zinc-400">
              Error handling, retries, data quality checks, and docs are part of
              the baseline.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Wrench className="h-6 w-6 text-orange-600" />
              <CardTitle>Ready to adapt</CardTitle>
            </CardHeader>
            <CardContent className="text-zinc-600 dark:text-zinc-400">
              You get a strong starting point that can evolve with your tools,
              channels, and team.
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
