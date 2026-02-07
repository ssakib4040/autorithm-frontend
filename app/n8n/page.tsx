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
  Layers,
  Code,
  Server,
  Sliders,
  Zap,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Building2,
  Wrench,
  Shield,
} from "lucide-react";
import { getProductsByTool } from "@/scripts/data/products";

export const metadata: Metadata = {
  title: "n8n Automation Workflows - Autorithm",
  description:
    "Premium n8n workflows for your business. Self-hosted automation solutions built by experts.",
};

// Get n8n products from centralized data
const n8nProducts = getProductsByTool("n8n").slice(0, 6);

export default function N8nPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800">
              <Layers className="w-4 h-4 mr-2" />
              Open-Source Power
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white mb-6">
              n8n Automation,
              <br />
              Built for Production
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
              Self-hosted, flexible, developer-grade workflows that give you
              complete control over your automation logic and data
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link href="/products?tool=n8n">
                  Browse n8n Automation Kits
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="#featured">See Examples</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is n8n */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              What Is n8n?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              n8n is an open-source workflow automation tool that combines the
              visual simplicity of low-code platforms with the power and
              flexibility of custom code. Unlike cloud-only solutions, n8n can
              be self-hosted, giving you complete control over your data, logic,
              and infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Open-Source</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Full access to source code, no vendor lock-in, and a thriving
                  community of contributors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Server className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Self-Hosting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Run on your own infrastructure with complete data sovereignty
                  and security control
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Sliders className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Full Control</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Customize every aspect of your workflows with code, APIs, and
                  custom integrations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key n8n Advantages */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Key n8n Advantages
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              What makes n8n the choice for developers and technical teams
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      Visual Workflows with Code-Level Power
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Drag-and-drop interface for speed, custom JavaScript for
                      unlimited flexibility
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
                      Advanced Branching & Error Handling
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Complex conditional logic, sophisticated error recovery,
                      and retry mechanisms
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      Webhooks & Custom APIs
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Trigger workflows via HTTP requests, build custom
                      endpoints, and integrate anything
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                    <Server className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      Scalability & Extensibility
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Queue mode for high-volume workloads, custom nodes, and
                      enterprise-ready architecture
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Most n8n Workflows Fail */}
      <section className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-100 border-red-200 dark:border-red-800">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Common Pitfalls
              </Badge>

              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Why Most n8n Workflows Fail
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
                n8n&apos;s power is a double-edged sword. Without proper
                architecture, workflows become unmaintainable quickly.
              </p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-1">
                        Poor Error Handling
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Workflows crash on edge cases with no recovery or
                        notification
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
                        Hardcoded Logic
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Values and rules baked into nodes, making updates a
                        nightmare
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
                        No Modularity
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Monolithic workflows that can&apos;t be reused or tested
                        independently
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
                        No Observability
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        When something breaks, you have no idea what happened or
                        where
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How Autorithm Builds n8n Systems */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              The Autorithm Way
            </Badge>

            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              How Autorithm Builds n8n Systems
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Production-grade patterns that make your n8n workflows reliable,
              maintainable, and scalable
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle className="text-2xl">
                  Modular Workflow Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Break complex automations into reusable sub-workflows. Each
                  module has a single responsibility and clear inputs/outputs.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-2xl">
                  Centralized Error Handling
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Every workflow has a standardized error handling pattern with
                  logging, notifications, and automatic retry logic where
                  appropriate.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-2xl">Versioned Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  All business rules and configurations are versioned and stored
                  externally, making updates safe and trackable.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-2xl">
                  Production-Ready Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Built-in monitoring, comprehensive logging, data validation,
                  and idempotency checks on every critical operation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured n8n Products */}
      <section id="featured" className="py-20 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Featured n8n Automation Kits
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Ready-to-deploy n8n workflows built with production best practices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {n8nProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:border-zinc-900 dark:hover:border-white transition-colors"
              >
                <CardHeader>
                  <Badge className="w-fit mb-4 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800">
                    n8n
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

      {/* Who n8n Is Best For */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Who n8n Is Best For
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              n8n shines when you need control, customization, and can handle
              technical complexity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Developers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Engineers who want visual workflows but need code-level
                  control when required
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>SaaS Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Product teams building customer-facing automations that need
                  reliability
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Internal Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Companies building custom internal automation platforms
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>High-Control Environments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Organizations with strict data sovereignty or compliance
                  requirements
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-linear-to-b from-zinc-900 to-black dark:from-zinc-950 dark:to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Production-Grade n8n Workflows?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Browse our n8n automation kits or get a custom solution built for
            your needs
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-lg bg-white text-zinc-900 hover:bg-zinc-100"
            >
              <Link href="/products?tool=n8n">Explore All n8n Automations</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg border-white text-white hover:bg-white hover:text-zinc-900"
            >
              <Link href="/#contact">Get Custom n8n Automation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
