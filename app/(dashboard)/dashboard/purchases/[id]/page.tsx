"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Download,
  Package,
  Calendar,
  DollarSign,
  CheckCircle,
  FileText,
  ArrowLeft,
  ExternalLink,
  Mail,
  Tag,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PurchaseDetail() {
  const params = useParams();
  const purchaseId = params.id;

  // Placeholder data - would be fetched from API in production
  const purchase = {
    id: purchaseId,
    productName: "AI Lead Enrichment Workflow",
    productDescription:
      "Automate your lead enrichment process with AI-powered data gathering and analysis. This workflow integrates with popular CRM systems and enriches your leads with company information, social profiles, and contact details.",
    tool: "n8n",
    category: "CRM",
    price: 29.99,
    discount: 0,
    finalPrice: 29.99,
    purchaseDate: "2024-02-10T14:30:00Z",
    orderId: "ORD-2024-001234",
    downloads: [
      {
        name: "n8n Workflow Template",
        description: "Main workflow file ready to import",
        fileType: "JSON",
        size: "12.5 KB",
        url: "#",
      },
      {
        name: "Setup Documentation",
        description: "Step-by-step installation guide",
        fileType: "PDF",
        size: "2.3 MB",
        url: "#",
      },
      {
        name: "Configuration Templates",
        description: "Pre-configured settings and examples",
        fileType: "ZIP",
        size: "856 KB",
        url: "#",
      },
      {
        name: "Video Tutorial",
        description: "Complete walkthrough and best practices",
        fileType: "MP4",
        size: "45.2 MB",
        url: "#",
      },
    ],
    invoiceUrl: "#",
    features: [
      "Automatic lead data enrichment",
      "CRM integration (Salesforce, HubSpot)",
      "Social media profile lookup",
      "Company information gathering",
      "Email verification",
      "Lifetime updates",
    ],
    documentation: "#",
    supportEmail: "support@autorithm.com",
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link href="/dashboard/purchases">
          <ArrowLeft className="h-4 w-4" />
          Back to Purchases
        </Link>
      </Button>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
            <Package className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              {purchase.productName}
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <Wrench className="h-3 w-3 mr-1" />
                {purchase.tool}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {purchase.category}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href={purchase.invoiceUrl}>
              <FileText className="h-4 w-4" />
              Invoice
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Amount Paid
                </p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">
                  ${purchase.finalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Purchase Date
                </p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {new Date(purchase.purchaseDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Order ID
                </p>
                <p className="text-xs font-mono font-semibold text-zinc-900 dark:text-white">
                  {purchase.orderId}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Description & Features */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About This Template</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {purchase.productDescription}
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What&apos;s Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {purchase.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Downloads Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Download className="h-5 w-5" />
                Available Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {purchase.downloads.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all group"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {item.name}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {item.fileType}
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                        {item.description}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-500">
                        {item.size}
                      </p>
                    </div>
                    <Button asChild size="sm" className="shrink-0">
                      <Link href={item.url}>
                        <Download className="h-3.5 w-3.5 mr-1.5" />
                        Download
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary & Support */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Product Price
                  </span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    ${purchase.price.toFixed(2)}
                  </span>
                </div>
                {purchase.discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">
                      Discount
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      -${purchase.discount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between">
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      Total Paid
                    </span>
                    <span className="text-lg font-bold text-zinc-900 dark:text-white">
                      ${purchase.finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full gap-2">
                <Link href={purchase.invoiceUrl}>
                  <FileText className="h-4 w-4" />
                  Download Invoice
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card className="border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                Need Help?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Our support team is here to help you get the most out of your
                template.
              </p>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href={`mailto:${purchase.supportEmail}`}>
                    <Mail className="h-4 w-4" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href={purchase.documentation} target="_blank">
                    <FileText className="h-4 w-4" />
                    View Docs
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                href="/products"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Browse More Templates
                </span>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
              </Link>
              <Link
                href="/dashboard/purchases"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  All Purchases
                </span>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
              >
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  Contact Us
                </span>
                <ExternalLink className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
