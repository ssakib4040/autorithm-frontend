import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Autorithm",
  description: "Terms and conditions for using Autorithm services and products.",
};

export default function TermsConditions() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-white dark:bg-zinc-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12">
            <div className="space-y-8 text-zinc-600 dark:text-zinc-400">
              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="leading-relaxed">
                  By accessing and using Autorithm (&quot;the Service&quot;), you
                  accept and agree to be bound by the terms and provision of
                  this agreement. In addition, when using these particular
                  services, you shall be subject to any posted guidelines or
                  rules applicable to such services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  2. Intellectual Property
                </h2>
                <p className="leading-relaxed mb-4">
                  The Site and its original content, features, and functionality
                  are owned by Autorithm and are protected by international
                  copyright, trademark, patent, trade secret, and other
                  intellectual property or proprietary rights laws.
                </p>
                <p className="leading-relaxed">
                  Our automation kits and workflows are licensed to you for use
                  within your business or for your personal projects. You may
                  not resell, redistribute, or sub-license the source code or
                  configuration files of our products without explicit written
                  permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  3. User Obligations
                </h2>
                <p className="leading-relaxed mb-4">
                  As a user of this site, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Provide accurate and complete information when registering
                    or making a purchase.
                  </li>
                  <li>
                    Maintain the security of your account credentials.
                  </li>
                  <li>
                    Not use the Service for any illegal or unauthorized purpose.
                  </li>
                  <li>
                    Not interfere with or disrupt the Service or servers or
                    networks connected to the Service.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  4. Refund Policy
                </h2>
                <p className="leading-relaxed">
                  Due to the digital nature of our products (downloadable
                  automation workflows), we generally do not offer refunds once
                  the files have been downloaded. However, if you encounter technical
                  issues that we cannot resolve, please contact support for
                  assistance or to request a refund evaluation on a case-by-case
                  basis.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  5. Limitation of Liability
                </h2>
                <p className="leading-relaxed">
                  In no event shall Autorithm, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from (i)
                  your access to or use of or inability to access or use the
                  Service; (ii) any conduct or content of any third party on the
                  Service; (iii) any content obtained from the Service; and (iv)
                  unauthorized access, use or alteration of your transmissions
                  or content.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  6. Changes to Terms
                </h2>
                <p className="leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. We will try to provide at
                  least 30 days notice prior to any new terms taking effect.
                  What constitutes a material change will be determined at our
                  sole discretion.
                </p>
              </section>

              <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <p className="leading-relaxed">
                  If you have any questions about these Terms, please contact us
                  at{" "}
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
