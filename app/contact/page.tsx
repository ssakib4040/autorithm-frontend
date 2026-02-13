import { Metadata } from "next";

import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Autorithm",
  description: "Get in touch with the Autorithm team for support or inquiries.",
};

export default function Contact() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)] bg-size-[28px_28px] opacity-40 dark:opacity-25" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              Contact Support
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
              Contact the Autorithm team
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Share what you are building or stuck on. We respond fast and keep
              it practical.
            </p>
          </div>

          <ContactForm />

          <div className="mt-8 text-center rounded-2xl border border-zinc-200/80 bg-white/90 px-6 py-8 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Prefer email? Reach us directly at
            </p>
            <a
              href="mailto:contact@autorithm.com"
              className="mt-2 block text-xl font-semibold text-zinc-900 transition-colors hover:text-zinc-700 dark:text-white dark:hover:text-zinc-200"
            >
              contact@autorithm.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
