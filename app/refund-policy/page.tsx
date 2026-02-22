import Link from "next/link";
import { Metadata } from "next";
import { RefreshCcw } from "lucide-react";

import PolicyShell from "@/components/legal/PolicyShell";

export const metadata: Metadata = {
  title: "Refund Policy - Autorithm",
  description: "Refund policy regarding our digital products and services.",
};

const lastUpdated = "February 22, 2026";
const sectionTitle =
  "mb-3 text-2xl font-semibold tracking-tight text-zinc-100";
const paragraph = "leading-relaxed text-zinc-300";

export default function RefundPolicy() {
  return (
    <PolicyShell
      badge="Refund Policy"
      title="Refunds for Digital Products"
      subtitle="Clear rules for eligibility, exceptions, and request handling."
      lastUpdated={lastUpdated}
      icon={<RefreshCcw className="h-4 w-4 text-emerald-300" />}
    >
      <section>
        <h2 className={sectionTitle}>1. Digital Goods</h2>
        <p className={`${paragraph} mb-3`}>
          Most digital product sales are final after access or download due to
          the non-returnable nature of digital files.
        </p>
        <p className={paragraph}>
          Review product details, requirements, and compatibility before
          purchase.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>2. Eligible Exceptions</h2>
        <ul className="list-disc space-y-2 pl-6 text-zinc-300">
          <li>Accidental duplicate purchase</li>
          <li>Confirmed technical defect not fixable by support</li>
          <li>Material mismatch between product and description</li>
        </ul>
      </section>

      <section>
        <h2 className={sectionTitle}>3. Request Window</h2>
        <p className={paragraph}>
          Refund requests must be submitted within 14 days of purchase with the
          order ID and issue details.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>4. Services and Custom Work</h2>
        <p className={paragraph}>
          Service work and custom implementations follow the signed project
          agreement. Completed delivered work is generally non-refundable.
        </p>
      </section>

      <section className="border-t border-zinc-800 pt-6">
        <h2 className={sectionTitle}>Support Contact</h2>
        <p className={paragraph}>
          Submit refund questions to{" "}
          <Link
            href="mailto:support@autorithm.com"
            className="font-semibold text-emerald-300 hover:text-emerald-200"
          >
            support@autorithm.com
          </Link>
          .
        </p>
      </section>
    </PolicyShell>
  );
}
