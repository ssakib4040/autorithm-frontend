import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund Policy - Autorithm",
  description: "Refund policy regarding our digital products and services.",
};

export default function RefundPolicy() {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-zinc-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-100 border-emerald-200 dark:border-emerald-800">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Refund Policy
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Fair & Transparent Returns
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <Card>
            <CardContent className="p-8 sm:p-12">
              <div className="space-y-8 text-zinc-600 dark:text-zinc-400">
                <section>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                    1. Digital Products
                  </h2>
                  <p className="leading-relaxed mb-4">
                    Due to the nature of digital goods (downloadable automation
                    workflows, scripts, and configuration files), we generally
                    do not offer refunds once a purchase has been completed and
                    files have been accessed or downloaded. Unlike physical
                    goods, digital goods cannot be &quot;returned&quot; in the
                    traditional sense.
                  </p>
                  <p className="leading-relaxed">
                    All sales of digital products are considered final. We
                    encourage you to review the product description,
                    requirements, and compatibility details carefully before
                    making a purchase.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                    2. Exceptions
                  </h2>
                  <p className="leading-relaxed mb-4">
                    We may consider refund requests under the following
                    exceptional circumstances:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Duplicate Purchase:</strong> If you accidentally
                      purchased the same product twice.
                    </li>
                    <li>
                      <strong>Technical Fault:</strong> If the product is
                      technically defective and our support team cannot resolve
                      the issue within a reasonable timeframe.
                    </li>
                    <li>
                      <strong>Misrepresentation:</strong> If the product is
                      significantly different from its description or preview.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                    3. Refund Process
                  </h2>
                  <p className="leading-relaxed">
                    To request a refund under one of the exceptions above,
                    please contact our support team at{" "}
                    <Link
                      href="mailto:support@autorithm.com"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      support@autorithm.com
                    </Link>{" "}
                    within 14 days of your purchase. Please include your order
                    ID and a detailed explanation of the issue.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                    4. Services and Custom Work
                  </h2>
                  <p className="leading-relaxed">
                    For custom automation services or consulting, refunds are
                    handled according to the specific service agreement or
                    contract signed before the commencement of work. Generally,
                    refunds are not provided for work that has already been
                    completed and delivered.
                  </p>
                </section>

                <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                    Questions?
                  </h2>
                  <p className="leading-relaxed">
                    If you have any questions about our Refund Policy, please
                    contact us at{" "}
                    <Link
                      href="mailto:hello@autorithm.com"
                      className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                    >
                      hello@autorithm.com
                    </Link>
                    .
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
