"use server";

import User from "@/models/User";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoose } from "@/lib/mongoose";

export async function toggleWishlist(productId: string | number) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    await connectMongoose();

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Initialize wishlist if it doesn't exist
    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Toggle logic with type-safe comparison
    const index = user.wishlist.findIndex(
      (id: string | number) => String(id) === String(productId),
    );

    if (index > -1) {
      // Remove from wishlist
      user.wishlist.splice(index, 1);
    } else {
      // Add to wishlist
      user.wishlist.push(productId);
    }

    await user.save();

    // Revalidate the current path to refresh the UI
    revalidatePath(`/products/[slug]`); 

    return {
      success: true,
      isInWishlist: index === -1, // true if we just added it
    };
  } catch {
    return { success: false, error: "Failed to update wishlist" };
  }
}
