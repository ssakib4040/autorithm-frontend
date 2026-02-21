"use client";

import { Heart } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { toggleWishlist } from "./actions";

interface WishlistButtonProps {
  productId: string | number;
  isInWishlist: boolean;
}

export function WishlistButton({
  productId,
  isInWishlist,
}: WishlistButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleWishlist(productId);

      if (result.success) {
        if (result.isInWishlist) {
          toast.success("Product added to wishlist");
        } else {
          toast.success("Product removed from wishlist");
        }
      } else {
        toast.error(result.error || "Failed to update wishlist");
      }
    });
  };

  return (
    <form action={handleToggle}>
      <button
        type="submit"
        disabled={isPending}
        className="p-3 rounded-full bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-700 hover:border-red-400 dark:hover:border-red-600 transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isInWishlist
              ? "fill-red-500 text-red-500"
              : "text-zinc-600 dark:text-zinc-400"
          } ${isPending ? "opacity-50" : ""}`}
        />
      </button>
    </form>
  );
}
