import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  ArrowUpRight,
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
  Layers,
  Workflow,
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
import { PaymentGatewaySelector } from "./PaymentGatewaySelector";

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

  const matchedKey = Object.keys(logos).find((key) =>
    techName.toLowerCase().includes(key.toLowerCase()),
  );

  return matchedKey ? logos[matchedKey] : null;
};

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

const defaultFaqs = [
  {
    question: "How fast can I deploy this workflow?",
    answer:
      "Most teams launch in under an hour with the included setup guidance and templates.",
  },
  {
    question: "Can I customize this for my stack?",
    answer:
      "Yes. All logic blocks and integration points are designed so you can adapt fields, triggers, and actions safely.",
  },
  {
    question: "What support is included after purchase?",
    answer:
      "You get implementation support for setup and troubleshooting so you can move from install to production quickly.",
  },
];

interface ProductDetailsPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tool?: string }>;
}

export default async function ProductDetails({
  params,
  searchParams,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const { tool } = await searchParams;

  const productDetails = (await productsApi.getBySlug(
    `${slug}?tool=${tool || ""}`,
  )) as (Product & { relatedVersions?: Product[] }) | { message?: string };

  if (
    "message" in productDetails &&
    productDetails.message === "Product not found"
  ) {
    notFound();
  }

  const details = productDetails as Product & { relatedVersions?: Product[] };
  const discountedPrice = getDiscountedPrice(details.price, details.discount);
  const discountLabel = getDiscountLabel(details.discount);
  const isN8N = details.tool.toLowerCase() === "n8n";
  const accentClasses = isN8N
    ? {
        subtleBg:
          "from-blue-50/90 via-cyan-50/70 to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-950",
        border: "border-blue-200/70 dark:border-blue-900/40",
        badge:
          "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900/50",
        cta: "bg-blue-600 hover:bg-blue-700",
      }
    : {
        subtleBg:
          "from-fuchsia-50/90 via-purple-50/70 to-white dark:from-purple-950/20 dark:via-zinc-950 dark:to-zinc-950",
        border: "border-purple-200/70 dark:border-purple-900/40",
        badge:
          "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50",
        cta: "bg-purple-600 hover:bg-purple-700",
      };

  const keyFeatures = details.keyFeatures ?? [];
  const howItWorks = details.howItWorks ?? [];
  const requirements = details.technicalDetails?.requirements ?? [];
  const apis = details.technicalDetails?.apis ?? [];
  const whatsIncluded = details.whatsIncluded ?? [];
  const faqs = details.faqs && details.faqs.length > 0 ? details.faqs : defaultFaqs;
  const relatedVersions = details.relatedVersions ?? [];

  let isInWishlist = false;
  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    try {
      await connectMongoose();
      const user = await User.findOne({ email: session.user.email });
      if (user?.wishlist) {
        isInWishlist = user.wishlist.some(
          (id: string | number) => String(id) === String(details.id),
        );
      }
    } catch {
      // Wishlist is optional for page rendering.
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 border-t border-zinc-200 dark:border-zinc-800 p-4 z-50 backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <div>
            {details.discount ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    ${discountedPrice}
                  </div>
                  <div className="text-sm font-semibold text-zinc-400 dark:text-zinc-600 line-through">
                    ${details.price}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {discountLabel}
                  </span>
                  {details.discount.timeLeft && (
                    <>
                      <span className="text-xs text-zinc-400">•</span>
                      <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                        {details.discount.timeLeft} left
                      </span>
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                  ${details.price}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400">
                  {details.tool} • {details.technicalDetails.complexity}
                </div>
              </>
            )}
          </div>
          <PaymentGatewaySelector
            productName={details.name}
            price={discountedPrice}
            tool={details.tool}
            buttonText="Buy Now"
            buttonClassName={accentClasses.cta}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-24 lg:pb-14">
        <Button asChild variant="ghost" className="mb-6 -ml-4">
          <Link href="/products">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>

        <div
          className={`relative mb-8 overflow-hidden rounded-3xl border bg-linear-to-br ${accentClasses.subtleBg} ${accentClasses.border}`}
        >
          <div className="absolute -top-20 -right-12 h-56 w-56 rounded-full bg-white/50 blur-3xl dark:bg-white/5"></div>
          <div className="relative grid gap-8 p-6 md:p-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline" className={accentClasses.badge}>
                  <Zap className="h-3 w-3 mr-1" />
                  {details.tool}
                </Badge>
                <Badge variant="secondary">{details.category}</Badge>
                <Badge variant="outline">{details.technicalDetails.complexity}</Badge>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-4">
                {details.name}
              </h1>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                {details.description}
              </p>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Setup Time</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {details.technicalDetails.setupTime}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Complexity</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {details.technicalDetails.complexity}
                  </p>
                </div>
                <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Integrations</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{apis.length}</p>
                </div>
                <div className="rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/70 p-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Components</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {whatsIncluded.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between lg:justify-end">
              <WishlistButton productId={details.id} isInWishlist={isInWishlist} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8">
          <div className="space-y-8">
            <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
              <div className="px-6 pt-6">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                  Workflow Preview
                </h2>
              </div>
              <div className="relative aspect-video bg-zinc-100 dark:bg-zinc-800">
                {details.previewImage ? (
                  <Image
                    src={details.previewImage}
                    alt={`${details.name} preview`}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900">
                    <div className="text-center px-6">
                      <Workflow className="h-14 w-14 text-zinc-500 dark:text-zinc-400 mx-auto mb-3" />
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        Visual architecture preview will appear here.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  Key Features
                </h3>
                <div className="space-y-3">
                  {keyFeatures.length > 0 ? (
                    keyFeatures.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">{feature}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Feature details are being prepared for this product.
                    </p>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-blue-500" />
                  What&apos;s Included
                </h3>
                <div className="space-y-3">
                  {whatsIncluded.length > 0 ? (
                    whatsIncluded.map((item, index) => (
                      <div key={index} className="flex items-start gap-2.5">
                        <Package className="w-4.5 h-4.5 text-zinc-600 dark:text-zinc-300 shrink-0 mt-0.5" />
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">{item}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Included assets will appear here.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-5 flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                Implementation Roadmap
              </h2>
              <div className="space-y-4">
                {howItWorks.length > 0 ? (
                  howItWorks.map(
                    (step: { title: string; description: string }, index: number) => (
                      <div
                        key={index}
                        className="flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950/60"
                      >
                        <div className="shrink-0 h-8 w-8 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-sm font-bold flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {step.title}
                          </h3>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ),
                  )
                ) : (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Step-by-step rollout guidance will be added soon.
                  </p>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-5">
                Technical Details
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
                    Complexity
                  </p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {details.technicalDetails.complexity}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-1">
                    Setup Time
                  </p>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {details.technicalDetails.setupTime}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">
                    Technologies
                  </p>
                  {apis.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {apis.map((api: string, index: number) => {
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
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Integration stack is not listed for this item yet.
                    </p>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400 mb-2">
                    Requirements
                  </p>
                  {requirements.length > 0 ? (
                    <div className="space-y-1.5">
                      {requirements.map((requirement: string, index: number) => (
                        <p
                          key={index}
                          className="text-sm text-zinc-700 dark:text-zinc-300"
                        >
                          • {requirement}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      No strict prerequisites beyond your platform account.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {details.downloads && details.downloads.length > 0 && (
              <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-5 flex items-center gap-2">
                  <Download className="h-5 w-5 text-indigo-500" />
                  Downloads
                </h2>
                <div className="space-y-3">
                  {details.downloads.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950"
                    >
                      <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-2">
                        {item.fileType} • {item.size}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-5 flex items-center gap-2">
                <FileText className="h-5 w-5 text-zinc-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={`${faq.question}-${index}`}
                    className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800"
                  >
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-6 h-fit space-y-4">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
              <div className="mb-6">
                {details.discount ? (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                        {discountLabel} • {details.discount.reason}
                      </span>
                    </div>

                    <div className="flex items-end gap-3 mb-2">
                      <div className="text-5xl font-bold text-zinc-900 dark:text-white">
                        ${discountedPrice}
                      </div>
                      <div className="text-2xl font-semibold text-zinc-400 dark:text-zinc-600 line-through mb-1.5">
                        ${details.price}
                      </div>
                    </div>

                    {details.discount.timeLeft && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-100 dark:bg-red-900/30 mb-3">
                        <Clock className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                        <span className="text-xs font-semibold text-red-700 dark:text-red-300">
                          {details.discount.timeLeft} left
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-5xl font-bold text-zinc-900 dark:text-white mb-3">
                    ${details.price}
                  </div>
                )}

                <p className="text-sm text-zinc-600 dark:text-zinc-400">One-time payment</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {details.technicalDetails.complexity} • {details.technicalDetails.setupTime}
                </p>
              </div>

              <PaymentGatewaySelector
                productName={details.name}
                price={discountedPrice}
                tool={details.tool}
                buttonClassName={`w-full text-lg mb-4 text-white ${accentClasses.cta}`}
              />

              {relatedVersions.length > 0 && (
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">Also available on</p>
                  <div className="space-y-2">
                    {relatedVersions.map((version: Product) => (
                      <Link
                        key={`${version.slug}-${version.tool}`}
                        href={`/products/${version.slug}?tool=${version.tool}`}
                        className="flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {version.tool}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-zinc-500" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Download className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Instant Access</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Shield className="h-5 w-5 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Secure Checkout</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Headphones className="h-5 w-5 text-purple-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Setup Support</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Need enterprise deployment or custom tailoring?
              </p>
              <Link
                href="/contact"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 hover:underline"
              >
                Talk to us <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
