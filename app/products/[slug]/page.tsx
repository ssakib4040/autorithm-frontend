import Link from "next/link";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { productsApi } from "@/utils/api";
import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronLeft, Sparkles, Clock } from "lucide-react";

type Platform = "n8n" | "make";

export default async function ProductDetails({
  params,
  searchParams,
}: // searchParams,
{
  params: { slug: string };
  searchParams: { tool: string };
}) {
  const { slug } = await params;
  const { tool } = await searchParams;
  const selectedPlatform: Platform = "n8n";

  const productDetails = (await productsApi.getBySlug(
    `${slug}?tool=${tool}`,
  )) as Product;

  // if ("status" in productDetails && productDetails.status === 404) {
  //   notFound();
  // }

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-zinc-900">
        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t-2 border-zinc-200 dark:border-zinc-800 p-4 z-50 shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              {productDetails.discount ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                      $
                      {Math.round(
                        productDetails.price *
                          (1 - productDetails.discount.percentage / 100),
                      )}
                    </div>
                    <div className="text-sm font-semibold text-zinc-400 dark:text-zinc-600 line-through">
                      ${productDetails.price}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {productDetails.discount.percentage}% OFF
                    </span>
                    {productDetails.discount.timeLeft && (
                      <>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                          {productDetails.discount.timeLeft} left
                        </span>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    ${productDetails.price}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400">
                    {productDetails.tool === "n8n" ? "n8n" : "Make.com"} •{" "}
                    {productDetails.technicalDetails.complexity}
                  </div>
                </>
              )}
            </div>
            <Button
              size="lg"
              className={selectedPlatform === "n8n"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-purple-600 hover:bg-purple-700"
              }
            >
              Buy Now
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 pb-24 lg:pb-8">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8 -ml-4">
            <Link href="/products">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>

          {/* 2 COLUMN GRID - ENTIRE PAGE */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT GRID - All Product Details */}
            <div>
              {/* Category */}
              <Badge variant="secondary" className="mb-4">
                {productDetails.category}
              </Badge>

              {/* Product Name with Platform Badge */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white">
                  {productDetails.name}
                </h1>
                <Badge
                  className={`text-base px-4 py-2 ${
                    productDetails.tool === "n8n"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  {productDetails.tool === "n8n" ? "n8n" : "Make"}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-base text-zinc-600 dark:text-zinc-400 mb-10">
                {productDetails.description}
              </p>

              {/* How It Works */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
                  How It Works
                </h2>
                <div className="space-y-4">
                  {productDetails.howItWorks.map(
                    (
                      step: { title: string; description: string },
                      index: number,
                    ) => (
                      <div
                        key={index}
                        className="flex gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                      >
                        <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
                            {step.title}
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {productDetails.keyFeatures.map(
                    (feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-zinc-700 dark:text-zinc-300">
                          {feature}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* Technical Details */}
              <div className="mb-10 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                  Technical Details
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      COMPLEXITY
                    </h3>
                    <p className="text-zinc-900 dark:text-white font-medium">
                      {productDetails.technicalDetails.complexity}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      SETUP TIME
                    </h3>
                    <p className="text-zinc-900 dark:text-white font-medium">
                      {productDetails.technicalDetails.setupTime}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      APIS & INTEGRATIONS
                    </h3>
                    <p className="text-zinc-900 dark:text-white text-xs">
                      {productDetails.technicalDetails.apis.join(", ")}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      REQUIREMENTS
                    </h3>
                    <ul className="space-y-0.5">
                      {productDetails.technicalDetails.requirements.map(
                        (assumption: string, index: number) => (
                          <li
                            key={index}
                            className="text-zinc-700 dark:text-zinc-300 text-xs"
                          >
                            • {assumption}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                  FAQs
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      question: "What is the refund policy?",
                      answer:
                        "Due to the digital nature of our products, we cannot offer refunds once purchased. We provide 30 days of implementation support to ensure your success.",
                    },
                    {
                      question: "What CRMs does this integrate with?",
                      answer:
                        "Out of the box: Salesforce, HubSpot, and Pipedrive. We include setup guides for these three. The workflow can be adapted to any CRM with an API.",
                    },
                    {
                      question: "How accurate is the lead scoring?",
                      answer:
                        "The scoring model is configurable based on your ICP. Typical accuracy is 75-85% when properly tuned with your historical data.",
                    },
                    {
                      question: "What AI providers are supported?",
                      answer:
                        "The workflow is built for OpenAI GPT-4, but can be adapted for Anthropic Claude, Google Gemini, or any LLM API.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                    >
                      <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT GRID - CTA Card (Sticky) */}
            <div className="lg:sticky lg:top-4 h-fit space-y-6">
              {/* CTA CARD */}
              <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800">
                <div className="mb-6">
                  {productDetails.discount ? (
                    <>
                      {/* Discount Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                          {productDetails.discount.percentage}% OFF •{" "}
                          {productDetails.discount.reason}
                        </span>
                      </div>

                      {/* Pricing with Discount */}
                      <div className="flex items-end gap-3 mb-2">
                        <div className="text-5xl font-bold text-zinc-900 dark:text-white">
                          $
                          {Math.round(
                            productDetails.price *
                              (1 - productDetails.discount.percentage / 100),
                          )}
                        </div>
                        <div className="text-2xl font-semibold text-zinc-400 dark:text-zinc-600 line-through mb-1.5">
                          ${productDetails.price}
                        </div>
                      </div>

                      {/* Time Left */}
                      {productDetails.discount.timeLeft && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-900/30 mb-3">
                          <Clock className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                          <span className="text-xs font-semibold text-red-700 dark:text-red-300">
                            {productDetails.discount.timeLeft} left
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="text-5xl font-bold text-zinc-900 dark:text-white mb-3">
                        ${productDetails.price}
                      </div>
                    </>
                  )}

                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    One-time payment
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {productDetails.technicalDetails.complexity} •{" "}
                    {productDetails.technicalDetails.setupTime}
                  </p>
                </div>

                <Button
                  size="lg"
                  className={`w-full text-lg mb-4 ${
                    productDetails.tool === "n8n"
                      ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                      : "bg-purple-600 hover:bg-purple-700 shadow-lg"
                  }`}
                >
                  Buy {productDetails.tool === "n8n" ? "n8n" : "Make.com"}{" "}
                  Version
                </Button>

                {/* Platform Switcher */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                    Also available for{" "}
                    {productDetails.tool === "n8n" ? "Make.com" : "N8N"}
                  </p>
                  <Link
                    href={`/products/${productDetails.slug}?tool=${
                      productDetails.tool === "n8n" ? "make" : "n8n"
                    }`}
                    // onClick={() =>
                    //   setSelectedPlatform(
                    //     selectedPlatform === "n8n" ? "make" : "n8n"
                    //   )
                    // }
                    className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Switch to{" "}
                    {productDetails.tool === "n8n" ? "Make.com" : "N8N"} →
                  </Link>
                </div>
              </div>

              {/* What's Included */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3">
                  {productDetails.whatsIncluded.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-zinc-700 dark:text-zinc-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
