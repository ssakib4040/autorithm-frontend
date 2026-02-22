import Link from "next/link";
import { Metadata } from "next";
import { FileText } from "lucide-react";

import PolicyShell from "@/components/legal/PolicyShell";

export const metadata: Metadata = {
  title: "Terms and Conditions - Autorithm",
  description:
    "Terms and conditions for using Autorithm services and products.",
};

const lastUpdated = "February 22, 2026";
const sectionTitle =
  "mb-3 text-2xl font-semibold tracking-tight text-zinc-100";
const paragraph = "leading-relaxed text-zinc-300";

export default function TermsConditions() {
  return (
    <PolicyShell
      badge="Terms & Conditions"
      title="Usage Terms"
      subtitle="Rules and responsibilities for using Autorithm services."
      lastUpdated={lastUpdated}
      icon={<FileText className="h-4 w-4 text-amber-300" />}
    >
      <section>
        <h2 className={sectionTitle}>1. Acceptance of Terms</h2>
        <p className={paragraph}>
          By using Autorithm, you agree to these terms and any applicable
          policies referenced in this document.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>2. Intellectual Property</h2>
        <p className={`${paragraph} mb-3`}>
          All site content, templates, workflows, and code assets remain the
          property of Autorithm or its licensors.
        </p>
        <p className={paragraph}>
          Purchases grant you a usage license. You may not resell,
          redistribute, or sublicense products without written permission.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>3. User Obligations</h2>
        <ul className="list-disc space-y-2 pl-6 text-zinc-300">
          <li>Provide accurate account and billing information</li>
          <li>Keep credentials secure and confidential</li>
          <li>Use the service lawfully and responsibly</li>
          <li>Do not disrupt platform infrastructure or other users</li>
        </ul>
      </section>

      <section>
        <h2 className={sectionTitle}>4. Refunds</h2>
        <p className={paragraph}>
          Refund terms for digital products are governed by our refund policy.
          Please review it before purchasing.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>5. Limitation of Liability</h2>
        <p className={paragraph}>
          To the maximum extent permitted by law, Autorithm is not liable for
          indirect, incidental, or consequential damages resulting from your use
          of the service.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>6. Updates</h2>
        <p className={paragraph}>
          We may update these terms periodically. Continued use after updates
          indicates acceptance of the revised terms.
        </p>
      </section>

      <section className="border-t border-zinc-800 pt-6">
        <h2 className={sectionTitle}>Contact</h2>
        <p className={paragraph}>
          Questions can be sent to{" "}
          <Link
            href="mailto:hello@autorithm.com"
            className="font-semibold text-amber-300 hover:text-amber-200"
          >
            hello@autorithm.com
          </Link>
          .
        </p>
      </section>
    </PolicyShell>
  );
}
