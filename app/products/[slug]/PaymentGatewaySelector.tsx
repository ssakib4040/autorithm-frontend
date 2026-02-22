"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CreditCard, Check, Shield } from "lucide-react";

interface PaymentGateway {
  id: string;
  name: string;
  description: string;
  logo?: string;
  available: boolean;
}

const paymentGateways: PaymentGateway[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Credit Card, Apple Pay, Google Pay",
    available: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "PayPal account or Credit Card",
    available: true,
  },
  {
    id: "paddle",
    name: "Paddle",
    description: "Credit Card, PayPal, Wire Transfer",
    available: true,
  },
  {
    id: "lemonsqueezy",
    name: "Lemon Squeezy",
    description: "Credit Card, PayPal",
    available: true,
  },
  {
    id: "gumroad",
    name: "Gumroad",
    description: "Credit Card, PayPal, Apple Pay",
    available: false,
  },
];

interface PaymentGatewaySelectorProps {
  productName: string;
  price: number;
  tool: string;
  buttonClassName?: string;
  buttonText?: string;
}

export function PaymentGatewaySelector({
  productName,
  price,
  tool,
  buttonClassName = "",
  buttonText,
}: PaymentGatewaySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  const handleProceedToPayment = () => {
    if (selectedGateway) {
      // TODO: Implement actual payment gateway integration
      console.log(`Proceeding with ${selectedGateway} for ${productName}`);
      // This will be implemented later with actual payment links
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        size="lg"
        className={buttonClassName}
        onClick={() => setIsOpen(true)}
      >
        {buttonText || `Buy ${tool === "n8n" ? "n8n" : "Make.com"} Version`}
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-125 overflow-y-auto p-6 sm:p-8"
        >
          <SheetHeader className="mb-8 px-0 pb-0">
            <SheetTitle className="text-2xl">Choose Payment Method</SheetTitle>
            <SheetDescription className="mt-2">
              Select your preferred payment gateway to complete your purchase
            </SheetDescription>
          </SheetHeader>

          <div>
            {/* Product Summary */}
            <div className="mb-8 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                {productName}
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                ${price}
              </p>
            </div>

            {/* Payment Gateway Options */}
            <div className="space-y-4 mb-8">
              {paymentGateways.map((gateway) => (
                <button
                  key={gateway.id}
                  disabled={!gateway.available}
                  onClick={() => setSelectedGateway(gateway.id)}
                  className={`w-full p-5 rounded-xl border-2 transition-all text-left ${
                    selectedGateway === gateway.id
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  } ${
                    !gateway.available
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
                        <CreditCard className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2 mb-1">
                          {gateway.name}
                          {!gateway.available && (
                            <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                              (Coming Soon)
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {gateway.description}
                        </p>
                      </div>
                    </div>
                    {selectedGateway === gateway.id && (
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Proceed Button */}
            <Button
              className="w-full mb-6"
              size="lg"
              disabled={!selectedGateway}
              onClick={handleProceedToPayment}
            >
              Continue to Payment
            </Button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 py-2">
              <Shield className="w-4 h-4" />
              <p>
                Secure payment processing. Your data is encrypted and protected.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
