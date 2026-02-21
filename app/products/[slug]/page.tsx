import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  CheckCircle2,
  ChevronLeft,
  Sparkles,
  Clock,
  Package,
  Zap,
  Download,
  Shield,
  Headphones,
  FileText,
} from "lucide-react";
import { getServerSession } from "next-auth";

import { productsApi } from "@/features/api";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { connectMongoose } from "@/lib/mongoose";
import { WishlistButton } from "./WishlistButton";

// Technology logo mapping
const getTechLogo = (techName: string): string | null => {
  const logos: Record<string, string> = {
    OpenAI: "/brands/openai.svg",
    Apify: "/brands/apify.svg",
    Supabase: "/brands/supabase.svg",
    PostgreSQL: "/brands/postgresql.svg",
    Stripe: "/brands/stripe.svg",
    Gmail: "/brands/gmail.svg",
    Google: "/brands/google.svg",
    Slack: "/brands/slack.svg",
    Discord: "/brands/discord.svg",
    Telegram: "/brands/telegram.svg",
    HubSpot: "/brands/hubspot.svg",
    Salesforce: "/brands/salesforce.svg",
    MongoDB: "/brands/mongodb.svg",
    Redis: "/brands/redis.svg",
    AWS: "/brands/aws.svg",
    Anthropic: "/brands/anthropic.svg",
    Claude: "/brands/anthropic.svg",
    Notion: "/brands/notion.svg",
    Airtable: "/brands/airtable.svg",
    Zapier: "/brands/zapier.svg",
    Twilio: "/brands/twilio.svg",
    SendGrid: "/brands/sendgrid.svg",
    Mailgun: "/brands/mailgun.svg",
  };

  // Try to match the technology name (case-insensitive)
  const matchedKey = Object.keys(logos).find((key) =>
    techName.toLowerCase().includes(key.toLowerCase()),
  );

  return matchedKey ? logos[matchedKey] : null;
};

type Platform = "n8n" | "make";

type DiscountInfo = {
  type?: "percentage" | "fixed";
  value?: number;
  percentage?: number;
  reason?: string;
  timeLeft?: string;
};

const getDiscountType = (discount?: DiscountInfo) =>
  discount?.type || "percentage";

const getDiscountValue = (discount?: DiscountInfo) => {
  if (!discount) return 0;
  if (typeof discount.value === "number") return discount.value;
  if (typeof discount.percentage === "number") return discount.percentage;
  return 0;
};

const getDiscountedPrice = (price: number, discount?: DiscountInfo) => {
  if (!discount) return price;
  const value = getDiscountValue(discount);
  return getDiscountType(discount) === "fixed"
    ? Math.max(price - value, 0)
    : Math.round(price * (1 - value / 100));
};

const getDiscountLabel = (discount?: DiscountInfo) => {
  if (!discount) return "";
  const value = getDiscountValue(discount);
  return getDiscountType(discount) === "fixed"
    ? `$${value} OFF`
    : `${value}% OFF`;
};

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
  )) as Product & { message?: string };

  const discountedPrice = getDiscountedPrice(
    productDetails.price,
    productDetails.discount,
  );
  const discountLabel = getDiscountLabel(productDetails.discount);

  // Handle 404 response from API
  if (
    "message" in productDetails &&
    productDetails.message === "Product not found"
  ) {
    notFound();
  }

  // Fetch wishlist status server-side
  let isInWishlist = false;
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    try {
      await connectMongoose();
      const user = await User.findOne({ email: session.user.email });
      if (user?.wishlist) {
        isInWishlist = user.wishlist.some(
          (id: string | number) => String(id) === String(productDetails.id),
        );
      }
    } catch {
      // Silently fail - wishlist is not critical
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-950 border-t-2 border-zinc-200 dark:border-zinc-800 p-4 z-50 shadow-2xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            {productDetails.discount ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    ${discountedPrice}
                  </div>
                  <div className="text-sm font-semibold text-zinc-400 dark:text-zinc-600 line-through">
                    ${productDetails.price}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {discountLabel}
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
            className={
              selectedPlatform === "n8n"
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
            {/* Hero Section */}
            <div className="mb-10 p-8 rounded-2xl bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 relative">
              {/* Wishlist Button */}
              <div className="absolute top-4 right-4">
                <WishlistButton
                  productId={productDetails.id}
                  isInWishlist={isInWishlist}
                />
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white"
                >
                  {productDetails.category}
                </Badge>
                <Badge
                  className={`${
                    productDetails.tool === "n8n"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                      : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                  }`}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  {productDetails.tool === "n8n" ? "n8n" : "Make"}
                </Badge>
                <Badge variant="outline" className="bg-white dark:bg-zinc-900">
                  {productDetails.technicalDetails.complexity}
                </Badge>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                {productDetails.name}
              </h1>

              {/* Description */}
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {productDetails.description}
              </p>
            </div>

            {/* Workflow Preview */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                Workflow Preview
              </h2>
              <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 aspect-video">
                {/* Placeholder - Replace with actual workflow image */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 dark:from-zinc-800 dark:via-zinc-850 dark:to-zinc-900">
                  <div className="text-center p-8">
                    <Package className="h-16 w-16 text-zinc-400 dark:text-zinc-600 mx-auto mb-4" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Workflow visualization coming soon
                    </p>
                  </div>
                </div>
                {/* Uncomment when you have actual images
                  <Image
                    src={productDetails.previewImage || "/placeholder-workflow.jpg"}
                    alt={`${productDetails.name} workflow preview`}
                    fill
                    className="object-cover"
                    priority
                  />
                  */}
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                How It Works
              </h2>
              <div className="space-y-3">
                {productDetails.howItWorks.map(
                  (
                    step: { title: string; description: string },
                    index: number,
                  ) => (
                    <div
                      key={index}
                      className="flex gap-4 p-6 rounded-xl bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center shadow-lg">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {productDetails.keyFeatures.map(
                  (feature: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-4 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-700 dark:text-zinc-300">
                        {feature}
                      </span>
                    </div>
                  ),
                )}
              </div>
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
                  <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    TECHNOLOGIES USED
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {productDetails.technicalDetails.apis.map(
                      (api: string, index: number) => {
                        const logo = getTechLogo(api);
                        return (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-sm font-medium flex items-center gap-2 px-3 py-2"
                          >
                            {logo ? (
                              <div className="w-5 h-5 flex items-center justify-center bg-white rounded-full p-0.5 border border-zinc-200">
                                <Image
                                  src={logo}
                                  alt={api}
                                  width={18}
                                  height={18}
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <Package className="w-4 h-4" />
                            )}
                            {api}
                          </Badge>
                        );
                      },
                    )}
                  </div>
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
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <FileText className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                Frequently Asked Questions
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
            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 shadow-xl">
              <div className="mb-6">
                {productDetails.discount ? (
                  <>
                    {/* Discount Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        {discountLabel} • {productDetails.discount.reason}
                      </span>
                    </div>

                    {/* Pricing with Discount */}
                    <div className="flex items-end gap-3 mb-2">
                      <div className="text-5xl font-bold text-zinc-900 dark:text-white">
                        ${discountedPrice}
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
                className={`w-full text-lg mb-4 text-white ${
                  productDetails.tool === "n8n"
                    ? "bg-blue-600 hover:bg-blue-700 shadow-lg"
                    : "bg-purple-600 hover:bg-purple-700 shadow-lg"
                }`}
              >
                Buy {productDetails.tool === "n8n" ? "n8n" : "Make.com"} Version
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
                  Switch to {productDetails.tool === "n8n" ? "Make.com" : "N8N"}{" "}
                  →
                </Link>
              </div>
            </div>

            {/* What's Included */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-zinc-900 dark:to-zinc-950 border border-blue-200 dark:border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                What&apos;s Included
              </h3>
              <ul className="space-y-3">
                {productDetails.whatsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Download className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                  Instant Access
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                  Secure Payment
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Headphones className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                  30d Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
