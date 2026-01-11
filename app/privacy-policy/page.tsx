import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Autorithm",
  description: "Privacy Policy outlining how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-white dark:bg-zinc-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-12">
            <div className="space-y-8 text-zinc-600 dark:text-zinc-400">
              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  1. Information We Collect
                </h2>
                <p className="leading-relaxed mb-4">
                  We collect information that you strictly provide to us
                  directly, such as when you create an account, make a
                  purchase, or contact us for support. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and email address</li>
                  <li>Billing information (processed securely by our payment providers)</li>
                  <li>Account credentials</li>
                  <li>Communication history</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, security alerts, and support messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  3. Information Sharing
                </h2>
                <p className="leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personally
                  identifiable information to outside parties. This does not
                  include trusted third parties who assist us in operating our
                  website, conducting our business, or servicing you, so long
                  as those parties agree to keep this information confidential.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  4. Data Security
                </h2>
                <p className="leading-relaxed">
                  We implement a variety of security measures to maintain the
                  safety of your personal information. Your personal information
                  is contained behind secured networks and is only accessible by
                  a limited number of persons who have special access rights to
                  such systems.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">
                  5. Cookies
                </h2>
                <p className="leading-relaxed">
                  We use cookies to understand and save your preferences for
                  future visits and compile aggregate data about site traffic
                  and site interaction so that we can offer better site
                  experiences and tools in the future.
                </p>
              </section>

              <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <p className="leading-relaxed">
                  If you have any questions about this Privacy Policy, please
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
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
