import Link from "next/link";
import { getFeaturedProducts } from "@/scripts/data/products";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  Shield,
  Code,
  Sparkles,
  Clock,
  Users,
} from "lucide-react";

// Get featured products
const featuredProducts = getFeaturedProducts(6);

const useCases = [
  {
    title: "SaaS Onboarding",
    description:
      "Orchestrate user journeys from signup to activation with intelligent workflows",
  },
  {
    title: "Lead Qualification",
    description:
      "Score, enrich, and route leads automatically based on custom criteria",
  },
  {
    title: "E-commerce Operations",
    description:
      "Sync inventory, process orders, and manage fulfillment across platforms",
  },
  {
    title: "Internal Tooling",
    description:
      "Build custom automation systems that connect your internal tools seamlessly",
  },
  {
    title: "AI Workflows",
    description:
      "Integrate GPT, Claude, and other AI models into production-ready systems",
  },
];

export const metadata: Metadata = {
  title: "Autorithm - Premium Automation Marketplace",
  description:
    "Pre-built automation workflows for n8n and Make.com. Save hours of development time with our premium automation kits.",
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="mb-6 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Production-Ready Automation Workflows
            </Badge>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
              Build Automation{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                10x Faster
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-3xl mx-auto">
              Premium n8n & Make.com templates built by automation experts. Skip
              the trial-and-error, deploy professional workflows in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" asChild className="text-lg px-8">
                <Link href="/products">
                  Browse Templates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8"
              >
                <Link href="#contact">Get Custom Build</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">
                    {featuredProducts.length}+
                  </p>
                  <p className="text-xs">Templates</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">
                    100%
                  </p>
                  <p className="text-xs">Production Ready</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold text-zinc-900 dark:text-white">
                    30 Days
                  </p>
                  <p className="text-xs">Support Included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white dark:bg-zinc-900" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Three Ways to Automate
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Choose the solution that fits your needs and timeline
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Automation Kits */}
            <Card className="hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Code className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">
                  Automation Templates
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Ready-to-deploy workflow templates. Install in minutes,
                  customize to your needs, start seeing results immediately.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all"
                >
                  Browse Templates
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Custom Automation */}
            <Card className="hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all group border-2">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <Badge
                  variant="secondary"
                  className="mb-2 w-fit bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                >
                  Most Popular
                </Badge>
                <CardTitle className="text-2xl mb-2">
                  Custom Automation
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Bespoke automation systems designed for your workflows. From
                  requirements to deployment, we build it all.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:gap-3 transition-all"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            {/* Managed Automation */}
            <Card className="hover:shadow-xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all group">
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">
                  Managed Automation
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Ongoing maintenance and optimization. We monitor, maintain,
                  and improve your automation infrastructure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* n8n & Make.com Focus */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 mb-6">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Platform Excellence
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Why n8n & Make.com?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                These platforms are incredibly powerful—they can connect
                virtually any tool, process complex logic, and scale to
                enterprise workloads.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                But power without structure leads to brittle automations that
                break in production, lack proper error handling, and become
                impossible to maintain.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      Comprehensive Error Handling
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Every failure scenario mapped and handled gracefully
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      Modular Logic Architecture
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Clean, reusable components that are easy to update
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      Built for Scale
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Performance optimized to handle growing data volumes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                      Production-Ready from Day One
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Thoroughly tested and documented for immediate deployment
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="#products">View n8n Templates</Link>
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="#products">View Make Templates</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
                The Autorithm Approach
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-sm text-blue-600 dark:text-blue-400 mb-2">
                    01. Architecture
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Every workflow follows proven patterns for reliability and
                    maintainability
                  </p>
                </div>
                <div>
                  <div className="font-mono text-sm text-purple-600 dark:text-purple-400 mb-2">
                    02. Documentation
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Clear setup guides, configuration instructions, and
                    troubleshooting steps
                  </p>
                </div>
                <div>
                  <div className="font-mono text-sm text-emerald-600 dark:text-emerald-400 mb-2">
                    03. Testing
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Validated against real-world scenarios and edge cases before
                    release
                  </p>
                </div>
                <div>
                  <div className="font-mono text-sm text-orange-600 dark:text-orange-400 mb-2">
                    04. Support
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Ongoing updates and assistance to ensure long-term success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white dark:bg-zinc-900" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
            >
              <Zap className="h-3 w-3 mr-1" />
              Featured Templates
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Ready-Made Workflows
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Production-tested templates that solve real business problems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer"
              >
                <Link href={`/products/${product.slug}?tool=${product.tool}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        className={`${
                          product.tool === "n8n"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                            : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                        }`}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        {product.tool}
                      </Badge>
                      <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                        ${product.price}
                      </span>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed line-clamp-2">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      <span className="font-medium">View Details</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link href="/products">
                View All Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Autorithm */}
      <section
        className="py-24 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative overflow-hidden"
        id="about"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/30 dark:to-blue-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
            >
              <CheckCircle2 className="h-3 w-3 mr-1.5" />
              The Autorithm Difference
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Autorithm?
              </span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              The difference between cheap templates and professional automation
              systems built for production
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Autorithm Systems Card */}
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 dark:from-emerald-950/20 dark:via-zinc-900 dark:to-blue-950/20 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Autorithm Systems
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-white">
                        Bulletproof error handling
                      </strong>{" "}
                      - Every edge case covered with graceful fallbacks
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-white">
                        Complete documentation
                      </strong>{" "}
                      - Setup guides, configuration, and troubleshooting
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-white">
                        Production-tested
                      </strong>{" "}
                      - Validated in real production environments
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-white">
                        Modular architecture
                      </strong>{" "}
                      - Clean, reusable components easy to extend
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-white">
                        30-day support included
                      </strong>{" "}
                      - Expert assistance when you need it
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      <strong className="text-zinc-900 dark:text-white">
                        Built for scale
                      </strong>{" "}
                      - Handle growing workloads without refactoring
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Cheap Templates Card */}
            <Card className="border-2 border-red-200 dark:border-red-900/50 bg-gradient-to-br from-red-50/30 via-zinc-50 to-zinc-100 dark:from-red-950/10 dark:via-zinc-900 dark:to-zinc-950 opacity-75">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                    <XCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-500 dark:text-zinc-600">
                    Cheap Templates
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Break on unexpected inputs and edge cases
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Minimal or no documentation provided
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Demo workflows that fail in production
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Monolithic design that&apos;s hard to modify
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-600">
                      No support after purchase
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-500" />
                    </div>
                    <span className="text-zinc-500 dark:text-zinc-600">
                      Performance issues at scale
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                100% Production Ready
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                30-Day Support
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                Instant Access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-6 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Real-World Applications
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Proven{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Use Cases
              </span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              See how Autorithm systems transform operations across industries
              and business functions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => {
              const colors = [
                {
                  gradient: "from-blue-500 to-blue-600",
                  bg: "bg-blue-100 dark:bg-blue-900/30",
                  border: "hover:border-blue-300 dark:hover:border-blue-700",
                },
                {
                  gradient: "from-purple-500 to-purple-600",
                  bg: "bg-purple-100 dark:bg-purple-900/30",
                  border:
                    "hover:border-purple-300 dark:hover:border-purple-700",
                },
                {
                  gradient: "from-emerald-500 to-emerald-600",
                  bg: "bg-emerald-100 dark:bg-emerald-900/30",
                  border:
                    "hover:border-emerald-300 dark:hover:border-emerald-700",
                },
                {
                  gradient: "from-orange-500 to-orange-600",
                  bg: "bg-orange-100 dark:bg-orange-900/30",
                  border:
                    "hover:border-orange-300 dark:hover:border-orange-700",
                },
                {
                  gradient: "from-pink-500 to-pink-600",
                  bg: "bg-pink-100 dark:bg-pink-900/30",
                  border: "hover:border-pink-300 dark:hover:border-pink-700",
                },
              ];
              const color = colors[index % colors.length];
              return (
                <Card
                  key={index}
                  className={`group ${color.border} hover:shadow-xl transition-all`}
                >
                  <CardHeader>
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                      {useCase.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Don&apos;t see your use case? We build custom automation for
              unique business needs.
            </p>
            <Button asChild size="lg" className="px-8">
              <Link href="#contact">
                Discuss Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-24 bg-gradient-to-b from-zinc-900 via-zinc-900 to-black dark:from-zinc-950 dark:via-zinc-950 dark:to-black relative overflow-hidden"
        id="contact"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-blue-900/30 text-blue-300 border-blue-800"
          >
            <Sparkles className="h-3 w-3 mr-1" />
            Get Started Today
          </Badge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Build Better{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Automation?
            </span>
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Whether you need a ready-made template or a fully custom system,
            we're here to help you automate with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button
              size="lg"
              asChild
              variant="secondary"
              className="text-lg px-8"
            >
              <Link href="/products">
                Browse Templates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="text-lg px-8 text-white border-zinc-700 hover:bg-zinc-800"
            >
              <Link href="/contact">Get Custom Build</Link>
            </Button>
          </div>
          <div className="pt-8 border-t border-zinc-800">
            <p className="text-zinc-400 text-sm">
              Questions? Email us at{" "}
              <a
                href="mailto:hello@autorithm.com"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                hello@autorithm.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
