import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white font-bold text-xl mb-4 md:mb-0">
            Autorithm
          </div>
          <div className="flex gap-8 text-zinc-400">
            <Link
              href="/products"
              className="hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              href="/#services"
              className="hover:text-white transition-colors"
            >
              Services
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link
              href="/#contact"
              className="hover:text-white transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Autorithm. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link
              href="/terms-conditions"
              className="hover:text-zinc-300 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-zinc-300 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-zinc-300 transition-colors"
            >
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
