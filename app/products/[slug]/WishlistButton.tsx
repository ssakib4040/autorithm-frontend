"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";

interface WishlistButtonProps {
  productId: string | number;
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchWishlistState = async () => {
      try {
        const response = await fetch("/api/wishlist");
        if (response.ok) {
          const data = await response.json();
          const wishlist = data.wishlist || [];
          // Use loose equality to handle type differences
          const isWished = wishlist.some(
            (id: string | number) => id == productId,
          );
          setIsInWishlist(isWished);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlistState();
  }, [productId]);

  const handleToggle = async () => {
    setIsLoading(true);

    // Optimistic update
    const previousState = isInWishlist;
    setIsInWishlist(!isInWishlist);

    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const data = await response.json();
        // Use the returned state to be sure
        setIsInWishlist(data.isInWishlist);
      } else {
        // Revert on error
        setIsInWishlist(previousState);
      }
    } catch (error) {
      console.error("Error:", error);
      // Revert on error
      setIsInWishlist(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="p-2 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all"
    >
      <Heart
        className={`h-5 w-5 ${isInWishlist ? "fill-red-500 text-red-500" : "text-zinc-600 dark:text-zinc-400"}`}
      />
    </button>
  );
}
