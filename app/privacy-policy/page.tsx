import Link from "next/link";
import { Metadata } from "next";
import { Shield } from "lucide-react";

import PolicyShell from "@/components/legal/PolicyShell";

export const metadata: Metadata = {
  title: "Privacy Policy - Autorithm",
  description:
    "Privacy Policy outlining how we collect, use, and protect your data.",
};

const lastUpdated = "February 22, 2026";

const sectionTitle =
  "mb-3 text-2xl font-semibold tracking-tight text-zinc-100";
const paragraph = "leading-relaxed text-zinc-300";

export default function PrivacyPolicy() {
  return (
    <PolicyShell
      badge="Privacy Policy"
      title="Your Data, Protected"
      subtitle="How we collect, use, and secure your information."
      lastUpdated={lastUpdated}
      icon={<Shield className="h-4 w-4 text-teal-300" />}
    >
      <section>
        <h2 className={sectionTitle}>1. Information We Collect</h2>
        <p className={`${paragraph} mb-3`}>
          We collect information you provide directly when creating an account,
          placing an order, or contacting support.
        </p>
        <ul className="list-disc space-y-2 pl-6 text-zinc-300">
          <li>Name and email address</li>
          <li>Billing details (processed by payment providers)</li>
          <li>Account credentials</li>
          <li>Support and communication history</li>
        </ul>
      </section>

      <section>
        <h2 className={sectionTitle}>2. How We Use Your Information</h2>
        <ul className="list-disc space-y-2 pl-6 text-zinc-300">
          <li>Deliver and improve our services</li>
          <li>Process transactions and send purchase updates</li>
          <li>Send security notices and product communications</li>
          <li>Respond to requests and support tickets</li>
        </ul>
      </section>

      <section>
        <h2 className={sectionTitle}>3. Information Sharing</h2>
        <p className={paragraph}>
          We do not sell your personal information. We only share data with
          trusted service providers required to operate the platform and process
          payments.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>4. Security</h2>
        <p className={paragraph}>
          We maintain administrative, technical, and organizational safeguards
          to protect your data against unauthorized access, loss, or misuse.
        </p>
      </section>

      <section>
        <h2 className={sectionTitle}>5. Cookies</h2>
        <p className={paragraph}>
          We use cookies and similar technologies to keep sessions secure,
          remember preferences, and improve product performance.
        </p>
      </section>

      <section className="border-t border-zinc-800 pt-6">
        <h2 className={sectionTitle}>Contact</h2>
        <p className={paragraph}>
          Questions about privacy can be sent to{" "}
          <Link
            href="mailto:hello@autorithm.com"
            className="font-semibold text-teal-300 hover:text-teal-200"
          >
            hello@autorithm.com
          </Link>
          .
        </p>
      </section>
    </PolicyShell>
  );
}
