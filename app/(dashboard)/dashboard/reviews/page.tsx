"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Sparkles, Star } from "lucide-react";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      productName: "Lead Enrichment Workflow",
      rating: 5,
      date: "2024-02-10",
      reviewText: "Amazing workflow, saved me hours of manual work!",
      status: "published",
    },
    {
      id: 2,
      productName: "Email Marketing Automation",
      rating: 4,
      date: "2024-01-28",
      reviewText: "Great product, but could use better documentation for beginners.",
      status: "published",
    },
    {
      id: 3,
      productName: "Social Media Scheduler",
      rating: 0,
      date: "2024-01-20",
      reviewText: "",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-linear-to-br from-white via-amber-50/50 to-violet-50/60 p-6 sm:p-7 dark:border-zinc-800 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950">
        <div className="absolute -right-10 -top-8 h-44 w-44 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="relative">
          <Badge className="mb-3 border-zinc-200 bg-white/90 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Feedback Center
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Reviews & Ratings</h1>
          <p className="mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">Share your experience and help others pick the right templates.</p>
        </div>
      </section>

      <section className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{review.productName}</p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{new Date(review.date).toLocaleDateString()}</p>
                </div>
                <Badge variant="outline" className="capitalize">{review.status}</Badge>
              </div>

              {review.rating > 0 && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-300 dark:text-zinc-600"}`} />
                  ))}
                </div>
              )}

              {review.reviewText && (
                <p className="text-sm text-zinc-700 dark:text-zinc-300">&quot;{review.reviewText}&quot;</p>
              )}

              {review.status === "pending" && (
                <Button size="sm" className="rounded-lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Write Review
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
