"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Mail, MessageSquare, Sparkles } from "lucide-react";

export default function SupportPage() {
  const messages = [
    {
      id: 1,
      subject: "Support for AI Lead Enrichment setup",
      sender: "support@autorithm.com",
      date: "2024-02-12",
      status: "resolved",
    },
    {
      id: 2,
      subject: "Question about workflow customization",
      sender: "support@autorithm.com",
      date: "2024-02-08",
      status: "resolved",
    },
    {
      id: 3,
      subject: "Account upgrade inquiry",
      sender: "support@autorithm.com",
      date: "2024-02-01",
      status: "new",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-blue-50/50 to-purple-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-purple-400/15 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Help Desk
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Support</h1>
            <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Review support threads and contact us for implementation help.</p>
          </div>
          <Button asChild className="rounded-xl">
            <Link href="/contact">Send Message</Link>
          </Button>
        </div>
      </section>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <MessageSquare className="mb-4 h-10 w-10 text-zinc-400 dark:text-zinc-500" />
            <p className="text-sm text-zinc-600 dark:text-zinc-400">No messages yet</p>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-3">
          {messages.map((message) => (
            <Card key={message.id}>
              <CardContent className="flex items-center justify-between gap-3 p-5">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/20">
                    <Mail className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{message.subject}</p>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      {message.sender} • {new Date(message.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={message.status === "resolved" ? "text-emerald-700 dark:text-emerald-300" : "text-blue-700 dark:text-blue-300"}>
                    {message.status}
                  </Badge>
                  <Button asChild variant="outline" size="icon" className="h-8 w-8 rounded-lg">
                    <Link href="/contact">
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      <Card className="border-blue-200 bg-blue-50/60 dark:border-blue-900/40 dark:bg-blue-950/20">
        <CardContent className="flex items-center justify-between gap-3 p-5">
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Need direct help?</p>
            <p className="text-xs text-blue-700/90 dark:text-blue-300">Contact our support team for setup guidance and troubleshooting.</p>
          </div>
          <Button asChild variant="outline" size="sm" className="rounded-lg">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
