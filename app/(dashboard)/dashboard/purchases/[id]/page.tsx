"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  DollarSign,
  Download,
  FileText,
  Mail,
  Package,
  Sparkles,
  Tag,
  Wrench,
} from "lucide-react";

export default function PurchaseDetail() {
  const params = useParams();
  const purchaseId = params.id;

  const purchase = {
    id: purchaseId,
    productName: "AI Lead Enrichment Workflow",
    productDescription:
      "Automate lead enrichment with AI-powered data gathering and CRM sync. Includes implementation guidance and reusable configuration assets.",
    tool: "n8n",
    category: "CRM",
    price: 29.99,
    discount: 0,
    finalPrice: 29.99,
    purchaseDate: "2024-02-10T14:30:00Z",
    orderId: "ORD-2024-001234",
    downloads: [
      { name: "n8n Workflow Template", description: "Main workflow file", fileType: "JSON", size: "12.5 KB", url: "#" },
      { name: "Setup Documentation", description: "Installation guide", fileType: "PDF", size: "2.3 MB", url: "#" },
      { name: "Configuration Templates", description: "Sample configs", fileType: "ZIP", size: "856 KB", url: "#" },
    ],
    features: [
      "Automatic lead data enrichment",
      "CRM integration support",
      "Social profile lookup",
      "Email verification flow",
      "Lifetime updates",
    ],
    supportEmail: "support@autorithm.com",
  };

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link href="/dashboard/purchases">
          <ArrowLeft className="h-4 w-4" />
          Back to Purchases
        </Link>
      </Button>

      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-blue-50/60 to-violet-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-10 -top-8 h-44 w-44 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-violet-600 text-white">
              <Package className="h-7 w-7" />
            </div>
            <div>
              <Badge className="mb-2 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
                <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                Purchase Details
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{purchase.productName}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="outline"><Wrench className="mr-1 h-3 w-3" />{purchase.tool}</Badge>
                <Badge variant="secondary"><Tag className="mr-1 h-3 w-3" />{purchase.category}</Badge>
              </div>
            </div>
          </div>

          <Button asChild variant="outline" className="rounded-lg">
            <Link href="#">
              <FileText className="mr-2 h-4 w-4" />
              Invoice
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-4"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Amount Paid</p><p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">${purchase.finalPrice.toFixed(2)}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Purchase Date</p><p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{new Date(purchase.purchaseDate).toLocaleDateString()}</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Order ID</p><p className="mt-1 text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-100">{purchase.orderId}</p></CardContent></Card>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-lg">About This Template</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{purchase.productDescription}</p></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">What&apos;s Included</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {purchase.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckCircle className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Download className="h-5 w-5" />Available Downloads</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {purchase.downloads.map((item) => (
                <div key={item.name} className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{item.name}</p>
                    <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">{item.description}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{item.fileType} • {item.size}</p>
                  </div>
                  <Button asChild size="sm" className="rounded-lg"><Link href={item.url}>Download</Link></Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-zinc-600 dark:text-zinc-400">Product Price</span><span className="font-medium text-zinc-900 dark:text-zinc-100">${purchase.price.toFixed(2)}</span></div>
              <div className="border-t border-zinc-200 pt-3 dark:border-zinc-800 flex justify-between"><span className="font-semibold text-zinc-900 dark:text-zinc-100">Total Paid</span><span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">${purchase.finalPrice.toFixed(2)}</span></div>
            </CardContent>
          </Card>

          <Card className="border-violet-200 bg-violet-50/60 dark:border-violet-900/40 dark:bg-violet-950/20">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Mail className="h-5 w-5 text-violet-500" />Need Help?</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Support team can help with setup or troubleshooting.</p>
              <Button asChild variant="outline" className="w-full rounded-lg"><Link href={`mailto:${purchase.supportEmail}`}>Contact Support</Link></Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <DollarSign className="h-3.5 w-3.5" />
                Purchase ID: {String(purchase.id)}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Calendar className="h-3.5 w-3.5" />
                Recorded on {new Date(purchase.purchaseDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
