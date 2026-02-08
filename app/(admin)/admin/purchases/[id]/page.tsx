import Link from "next/link";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  CalendarIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function PurchaseDetailsPage() {
  const orderHistory = [
    {
      status: "Completed",
      title: "Order completed",
      description: "Payment received and order fulfilled",
      date: "March 20, 2024 at 10:45 AM",
      icon: CheckCircleIcon,
      color: "emerald",
    },
    {
      status: "Processing",
      title: "Payment processing",
      description: "Payment gateway confirmed transaction",
      date: "March 20, 2024 at 10:31 AM",
      icon: CreditCardIcon,
      color: "blue",
    },
    {
      status: "Created",
      title: "Order created",
      description: "Customer initiated the purchase",
      date: "March 20, 2024 at 10:30 AM",
      icon: ShoppingBagIcon,
      color: "zinc",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/purchases"
          className="inline-flex items-center text-sm text-zinc-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Purchases
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Order #1001
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Placed on March 20, 2024 at 10:30 AM
            </p>
          </div>
          <span className="inline-flex self-start items-center px-3 py-2 rounded-lg text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircleIcon className="h-4 w-4 mr-2" />
            Completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-white">Order Items</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50">
                  <div className="h-16 w-16 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <ShoppingBagIcon className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">
                      SEO Automation Kit
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      Complete SEO workflow for n8n
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-400">Quantity: 1</p>
                    <p className="text-lg font-bold text-white mt-1">$49.00</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="text-white">$49.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Tax</span>
                  <span className="text-white">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Discount</span>
                  <span className="text-emerald-400">-$0.00</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800">
                  <span className="text-base font-semibold text-white">
                    Total
                  </span>
                  <span className="text-xl font-bold text-white">$49.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-white">
                Order Timeline
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {orderHistory.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          event.color === "emerald"
                            ? "bg-emerald-500/10"
                            : event.color === "blue"
                              ? "bg-blue-500/10"
                              : "bg-zinc-700/50"
                        }`}
                      >
                        <event.icon
                          className={`h-5 w-5 ${
                            event.color === "emerald"
                              ? "text-emerald-400"
                              : event.color === "blue"
                                ? "text-blue-400"
                                : "text-zinc-400"
                          }`}
                        />
                      </div>
                      {index !== orderHistory.length - 1 && (
                        <div className="absolute top-10 left-5 w-px h-8 bg-zinc-700" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-sm font-semibold text-white">
                        {event.title}
                      </h3>
                      <p className="text-sm text-zinc-400 mt-1">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-2 text-xs text-zinc-500">
                        <ClockIcon className="h-3.5 w-3.5" />
                        {event.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-white">Customer</h2>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  AJ
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Alice Johnson
                  </p>
                  <p className="text-xs text-zinc-500">Customer since 2024</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Email</p>
                    <p className="text-sm text-white">alice@example.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <UserIcon className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Customer ID</p>
                    <p className="text-sm text-white font-mono">#USER-1001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="text-lg font-semibold text-white">Payment</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <CreditCardIcon className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Payment Method</p>
                  <p className="text-sm text-white">Credit Card</p>
                  <p className="text-xs text-zinc-500 mt-1">•••• 4242</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-zinc-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Transaction ID</p>
                  <p className="text-sm text-white font-mono">TXN-5678-9012</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Actions</h2>
            <div className="space-y-3">
              <button className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
                <EnvelopeIcon className="h-4 w-4" />
                Send Receipt
              </button>
              <button className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-red-700/50 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium transition-colors">
                <ArrowPathIcon className="h-4 w-4" />
                Refund Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
