"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Advanced Data Processing Workflow",
      price: 49.99,
      category: "Data",
      addedDate: "2 days ago",
    },
    {
      id: 2,
      name: "Customer CRM Integration",
      price: 39.99,
      category: "CRM",
      addedDate: "5 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Wishlist
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Products saved for later
        </p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <Heart className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-4" />
            <p className="text-zinc-600 dark:text-zinc-400 text-center mb-4">
              Your wishlist is empty
            </p>
            <Button asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {wishlistItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <Badge variant="outline">{item.category}</Badge>
                      <span>Added {item.addedDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        ${item.price}
                      </p>
                    </div>
                    <Button asChild variant="default" size="sm">
                      <Link href="/products">Buy Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
