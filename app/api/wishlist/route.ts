import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectMongoose } from "@/lib/mongoose";
import { User } from "@/models";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoose();
    const user = await User.findOne({ userId: session.user.id });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ wishlist: user.wishlist || [] });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 },
      );
    }

    await connectMongoose();
    const user = await User.findOne({ userId: session.user.id });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.wishlist) {
      user.wishlist = [];
    }

    // Convert both to strings for comparison
    const productIdStr = String(productId);
    const productIndex = user.wishlist.findIndex(
      (id: string | number) => String(id) === productIdStr,
    );

    let action: "added" | "removed";

    if (productIndex > -1) {
      // Product exists, remove it
      user.wishlist.splice(productIndex, 1);
      action = "removed";
    } else {
      // Product doesn't exist, add it
      user.wishlist.push(productId);
      action = "added";
    }

    await user.save();

    return NextResponse.json({
      action,
      wishlist: user.wishlist,
      isInWishlist: action === "added",
    });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
