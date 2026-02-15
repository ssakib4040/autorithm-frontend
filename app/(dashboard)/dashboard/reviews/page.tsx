"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";

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
      reviewText:
        "Great product, but could use better documentation for beginners.",
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
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Reviews & Ratings
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Share your feedback on purchased products
        </p>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {review.productName}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={
                      review.status === "published" ? "default" : "outline"
                    }
                  >
                    {review.status}
                  </Badge>
                </div>

                {review.rating > 0 ? (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-300 dark:text-zinc-600"
                        }`}
                      />
                    ))}
                  </div>
                ) : null}

                {review.reviewText && (
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    &quot;{review.reviewText}&quot;
                  </p>
                )}

                {review.status === "pending" && (
                  <Button size="sm" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Write Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
