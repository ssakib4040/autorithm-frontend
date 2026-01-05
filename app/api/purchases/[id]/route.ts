import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/mongodb";

/**
 * GET /api/purchases/[id]
 * Get a single purchase by ID with populated product and user details
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const collection = db.collection("purchases");

    const purchase = await collection
      .aggregate([
        { $match: { id: parseInt(id) } },
        // Populate product details
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "id",
            as: "product",
          },
        },
        { $unwind: { path: "$product", preserveNullAndEmptyArrays: true } },
        // Populate user details
        {
          $lookup: {
            from: "users",
            localField: "purchasedBy",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
        // Remove sensitive user data
        {
          $project: {
            "user.password": 0,
          },
        },
      ])
      .toArray();

    if (!purchase || purchase.length === 0) {
      return NextResponse.json(
        { status: 404, message: "Purchase not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(purchase[0]);
  } catch (error: unknown) {
    console.error("Error fetching purchase:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch purchase",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/purchases/[id]
 * Delete a purchase by ID
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const collection = db.collection("purchases");

    const result = await collection.deleteOne({ id: parseInt(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { status: 404, message: "Purchase not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Purchase deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting purchase:", error);
    return NextResponse.json(
      {
        error: "Failed to delete purchase",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
