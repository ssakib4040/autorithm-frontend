import Link from "next/link";
import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Cloud,
  Palette,
  Server,
  Database,
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Briefcase,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react";
import { getProductsByTool } from "@/scripts/data/products";

export const metadata: Metadata = {
  title: "Make.com Automation Scenarios - Autorithm",
  description:
    "Premium Make.com scenarios for your business. Cloud-based automation solutions built by experts.",
};

// Get Make.com products from centralized data
const makeProducts = getProductsByTool("Make").slice(0, 6);

export default function MakePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800">
              <Zap className="w-4 h-4 mr-2" />
              Cloud-Powered Speed
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-6">
              Make.com Automations
              <br />
              That Actually Scale
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              Fast, visual, cloud-based automation with thousands of
              integrations—built with the clarity and structure your team needs
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="/products?tool=Make">
                  Browse Make Automation Kits
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="#featured">See Examples</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is Make.com */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              What Is Make.com?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Make.com (formerly Integromat) is a visual automation platform
              that combines speed with sophistication. With a massive
              integration library and powerful data transformation tools, Make
              lets you connect any service and automate complex workflows—all
              from an intuitive drag-and-drop interface.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Visual & Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Intuitive scenario builder that lets you create complex
                  automations visually without writing code
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Cloud-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Fully managed infrastructure means no servers to maintain,
                  instant scaling, and always-on reliability
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Ease + Power</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Simple enough for non-technical users, powerful enough for
                  complex business logic and data transformations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Fast Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Pre-built integrations and templates mean you can go from idea
                  to production in hours, not weeks
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Make.com Advantages */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Key Make.com Advantages
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Why Make.com is the go-to choice for fast-moving teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                    <Database className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      Huge Integration Library
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      1,500+ pre-built integrations covering marketing, sales,
                      support, and operations tools
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      Fast Setup
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Templates and wizards accelerate development, get
                      automations live in minutes
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      Visual Data Mapping
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      See exactly how data flows and transforms between modules
                      in real-time
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      Strong for Marketing & Ops
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Purpose-built for marketing automation, lead generation,
                      and operational workflows
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Make Mistakes */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 border-red-200 dark:border-red-800">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Common Pitfalls
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Common Make Mistakes
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                Make&apos;s ease of use can be deceptive. Without discipline,
                scenarios become unmaintainable fast.
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-1">
                        Overloaded Scenarios
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Trying to do too much in one scenario makes debugging
                        and updates painful
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-1">
                        No Error Recovery
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Scenarios fail silently or crash completely when hitting
                        edge cases
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-1">
                        Poor Data Validation
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Assuming data is always clean leads to cascade failures
                        downstream
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Autorithm's Make Approach */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              The Autorithm Way
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Autorithm&apos;s Make Approach
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              We build Make scenarios with the same rigor as production software
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">
                  Clean Scenario Separation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Each scenario has one clear purpose. Complex workflows are
                  broken into coordinated sub-scenarios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">Defensive Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Every module validates input, handles errors gracefully, and
                  fails safely with clear logging.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl">
                  Readable, Maintainable Flows
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Clear naming, proper documentation, and logical module
                  organization make scenarios easy to understand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Make Products */}
      <section id="featured" className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Featured Make Automation Kits
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Polished Make scenarios ready to power your operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {makeProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:border-zinc-900 dark:hover:border-white transition-colors"
              >
                <CardHeader>
                  <Badge className="w-fit mb-4 bg-purple-100 dark:bg-purple-900/30 text-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800">
                    Make
                  </Badge>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-zinc-900 dark:text-white">
                      ${product.price}
                    </span>
                  </div>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/products/${product.slug}`}>View Details</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Who Make Is Best For */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Who Make Is Best For
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Make excels when speed, visual clarity, and broad integrations
              matter most
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Agencies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Fast-moving teams building client automations across diverse
                  platforms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Marketing Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Marketers who need to connect campaigns, CRMs, and analytics
                  tools
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>No-Code Operators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Operations teams who want power without needing to write code
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Rapid Automation Needs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Teams that need to ship automation fast and iterate quickly
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-zinc-900 to-black dark:from-zinc-950 dark:to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready for Production-Grade Make Automations?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Browse our Make scenario kits or request a custom automation built
            for your workflow
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-lg bg-white text-zinc-900 hover:bg-zinc-100"
            >
              <Link href="/products?tool=Make">
                Explore All Make Automations
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg border-white text-white hover:bg-white hover:text-zinc-900"
            >
              <Link href="/#contact">Request Custom Make Automation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
