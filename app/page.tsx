import Link from "next/link";
import { getFeaturedProducts } from "@/scripts/data/products";
import { Metadata } from "next";
import {
  SparklesIcon,
  RocketLaunchIcon,
  ShieldCheckIcon,
  CircleStackIcon,
  AdjustmentsHorizontalIcon,
  CpuChipIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  XCircleIcon,
  BoltIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

// Get featured products
const featuredProducts = getFeaturedProducts(6);

const useCases = [
  {
    title: "SaaS Onboarding",
    description:
      "Orchestrate user journeys from signup to activation with intelligent workflows",
    icon: RocketLaunchIcon,
  },
  {
    title: "Lead Qualification",
    description:
      "Score, enrich, and route leads automatically based on custom criteria",
    icon: ChartBarSquareIcon,
  },
  {
    title: "E-commerce Operations",
    description:
      "Sync inventory, process orders, and manage fulfillment across platforms",
    icon: CircleStackIcon,
  },
  {
    title: "Internal Tooling",
    description:
      "Build custom automation systems that connect your internal tools seamlessly",
    icon: Cog6ToothIcon,
  },
  {
    title: "AI Workflows",
    description:
      "Integrate GPT, Claude, and other AI models into production-ready systems",
    icon: CpuChipIcon,
  },
];

export const metadata: Metadata = {
  title: "Autorithm - Premium Automation Marketplace",
  description:
    "Pre-built automation workflows for n8n and Make.com. Save hours of development time with our premium automation kits.",
};

export default function Home() {
  return (
    <div className="bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3f3f4612_1px,transparent_1px),linear-gradient(to_bottom,#3f3f4612_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-8 backdrop-blur-xl">
              <SparklesIcon className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-white">
                Production-Ready Automation
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-8 leading-tight">
              Premium Automation{" "}
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Systems
              </span>
              <br />
              for n8n & Make.com
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-zinc-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              Pre-built workflows, AI automations, and custom systems engineered
              for <span className="text-white font-semibold">reliability</span>.
              Skip the trial-and-error and deploy production-ready automation
              from day one.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg hover:from-blue-500 hover:to-purple-500 transition-all shadow-2xl shadow-blue-600/25 hover:shadow-blue-600/40"
              >
                Browse Automation Kits
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-white font-semibold text-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all backdrop-blur-xl"
              >
                Get Custom Automation
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-zinc-800/50">
              <div>
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-sm text-zinc-500">Workflows Deployed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-zinc-500">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-sm text-zinc-500">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-zinc-500">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What We Do */}
      <section className="py-24 bg-zinc-900" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What We Do
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Three ways to transform your operations with professional
              automation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Automation Kits */}
            <div className="group bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 hover:border-zinc-700/50 transition-all shadow-xl hover:shadow-2xl">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 w-fit mb-6">
                <CircleStackIcon className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Automation Kits
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Ready-to-deploy workflow templates for common business
                processes. Install in minutes, customize to your needs, start
                seeing results immediately.
              </p>
              <Link
                href="#products"
                className="inline-flex items-center gap-2 text-blue-400 font-semibold hover:gap-3 transition-all group"
              >
                Browse Kits
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Custom Automation */}
            <div className="group bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 hover:border-zinc-700/50 transition-all shadow-xl hover:shadow-2xl">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 w-fit mb-6">
                <AdjustmentsHorizontalIcon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Custom Automation
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Bespoke automation systems designed specifically for your
                workflows. From requirements to deployment, we handle the entire
                build process.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-purple-400 font-semibold hover:gap-3 transition-all group"
              >
                Start a Project
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Managed Automation */}
            <div className="group bg-linear-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-2xl p-8 hover:border-zinc-700/50 transition-all shadow-xl hover:shadow-2xl">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 w-fit mb-6">
                <ShieldCheckIcon className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Managed Automation
              </h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Ongoing maintenance, monitoring, and optimization for your
                automation infrastructure. Focus on your business while we keep
                everything running smoothly.
              </p>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 text-green-400 font-semibold hover:gap-3 transition-all group"
              >
                Learn More
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* n8n & Make.com Focus */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-xl">
                <BoltIcon className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-semibold text-white">
                  Platform Excellence
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Why n8n & Make.com?
              </h2>
              <p className="text-lg text-zinc-300 mb-4 leading-relaxed">
                These platforms are incredibly powerful—they can connect
                virtually any tool, process complex logic, and scale to
                enterprise workloads.
              </p>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                But power without structure leads to brittle automations that
                break in production, lack proper error handling, and become
                impossible to maintain.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Comprehensive Error Handling
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Every failure scenario mapped and handled gracefully
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Modular Logic Architecture
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Clean, reusable components that are easy to update
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Built for Scale
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Performance optimized to handle growing data volumes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
                  <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 shrink-0">
                    <CheckCircleIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">
                      Production-Ready from Day One
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Thoroughly tested and documented for immediate deployment
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all"
                >
                  View n8n Templates
                </Link>
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-500 transition-all"
                >
                  View Make Templates
                </Link>
              </div>
            </div>
            <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-zinc-800/50 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">
                The Autorithm Approach
              </h3>
              <div className="space-y-6">
                <div className="p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono text-sm font-bold text-blue-400">
                      01
                    </div>
                    <h4 className="font-bold text-white">Architecture</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Every workflow follows proven patterns for reliability and
                    maintainability
                  </p>
                </div>
                <div className="p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-mono text-sm font-bold text-purple-400">
                      02
                    </div>
                    <h4 className="font-bold text-white">Documentation</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Clear setup guides, configuration instructions, and
                    troubleshooting steps
                  </p>
                </div>
                <div className="p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center font-mono text-sm font-bold text-green-400">
                      03
                    </div>
                    <h4 className="font-bold text-white">Testing</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Validated against real-world scenarios and edge cases before
                    release
                  </p>
                </div>
                <div className="p-5 bg-zinc-950/50 rounded-xl border border-zinc-800/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-mono text-sm font-bold text-amber-400">
                      04
                    </div>
                    <h4 className="font-bold text-white">Support</h4>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Ongoing updates and assistance to ensure long-term success
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-900" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured Automation Kits
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Production-ready workflows that solve real business problems
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-zinc-950/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-6 hover:border-blue-500/30 transition-all shadow-xl hover:shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      product.tool === "n8n"
                        ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    }`}
                  >
                    {product.tool}
                  </span>
                  <span className="text-3xl font-bold text-white">
                    ${product.price}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {product.name}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all group/btn border border-zinc-700"
                >
                  View Details
                  <ArrowRightIcon className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all text-lg"
            >
              View All Products
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Autorithm */}
      <section className="py-24 bg-zinc-950" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20 mb-6 backdrop-blur-xl">
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
              <span className="text-sm font-semibold text-white">
                Why Autorithm
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Autorithm?
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              The difference between cheap templates and professional automation
              systems
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-2xl border border-green-500/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircleIcon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Autorithm Systems
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    <strong className="text-white">
                      Bulletproof error handling
                    </strong>{" "}
                    - Every edge case covered
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    <strong className="text-white">
                      Complete documentation
                    </strong>{" "}
                    - Setup guides and configuration instructions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    <strong className="text-white">Production-tested</strong> -
                    Validated in real-world environments
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    <strong className="text-white">Modular architecture</strong>{" "}
                    - Easy to customize and extend
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    <strong className="text-white">Ongoing support</strong> -
                    Updates and assistance when you need it
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    <strong className="text-white">Built for scale</strong> -
                    Handle growing workloads without refactoring
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-zinc-900/30 backdrop-blur-xl p-8 rounded-2xl border border-red-500/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                  <XCircleIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-semibold text-zinc-400">
                  Cheap Templates
                </h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-500">
                    Break on unexpected inputs and edge cases
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-500">
                    Minimal or no documentation provided
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-500">
                    Demo workflows that fail in production
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-500">
                    Monolithic design that&apos;s hard to modify
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-500">
                    No support after purchase
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircleIcon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-500">
                    Performance issues at scale
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Proven Use Cases
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              See how Autorithm systems transform operations across industries
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-zinc-950/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50 p-6 hover:border-blue-500/30 transition-all shadow-xl"
              >
                <h3 className="text-lg font-bold text-white mb-3">
                  {useCase.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="relative py-24 bg-zinc-950 overflow-hidden"
        id="contact"
      >
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-purple-500/20 rounded-full blur-3xl animation-pulse" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Better Automation?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Whether you need a ready-made kit or a fully custom system,
            we&apos;re here to help you automate with confidence.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-zinc-900 font-semibold hover:bg-zinc-100 transition-all text-lg"
            >
              Explore All Products
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-800 text-white font-semibold hover:bg-zinc-700 transition-all text-lg border border-zinc-700"
            >
              Get Custom Automation
            </Link>
          </div>
          <p className="text-zinc-400 mt-8">
            Questions? Email us at{" "}
            <a
              href="mailto:hello@autorithm.com"
              className="text-white hover:underline"
            >
              hello@autorithm.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
