import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/mongodb";
import { ObjectId } from "mongodb";

/**
 * GET /api/purchases/stats
 * Get purchase statistics
 * Query params:
 * - userId: Filter stats by user ID (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const collection = db.collection("purchases");

    // Build match filter
    const matchFilter: Record<string, unknown> = {};
    if (userId) {
      matchFilter.purchasedBy = new ObjectId(userId);
    }

    // Aggregate statistics
    const stats = await collection
      .aggregate([
        ...(Object.keys(matchFilter).length > 0
          ? [{ $match: matchFilter }]
          : []),
        {
          $group: {
            _id: null,
            totalPurchases: { $sum: 1 },
            totalRevenue: { $sum: "$finalPrice" },
            averageOrderValue: { $avg: "$finalPrice" },
            totalDiscounts: {
              $sum: {
                $subtract: ["$originalPrice", "$finalPrice"],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            totalPurchases: 1,
            totalRevenue: { $round: ["$totalRevenue", 2] },
            averageOrderValue: { $round: ["$averageOrderValue", 2] },
            totalDiscounts: { $round: ["$totalDiscounts", 2] },
          },
        },
      ])
      .toArray();

    // Get top products
    const topProducts = await collection
      .aggregate([
        ...(Object.keys(matchFilter).length > 0
          ? [{ $match: matchFilter }]
          : []),
        {
          $group: {
            _id: "$productId",
            count: { $sum: 1 },
            revenue: { $sum: "$finalPrice" },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            productId: "$_id",
            productName: "$product.name",
            count: 1,
            revenue: { $round: ["$revenue", 2] },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    return NextResponse.json({
      stats:
        stats.length > 0
          ? stats[0]
          : {
              totalPurchases: 0,
              totalRevenue: 0,
              averageOrderValue: 0,
              totalDiscounts: 0,
            },
      topProducts,
    });
  } catch (error: unknown) {
    console.error("Error fetching purchase stats:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch purchase stats",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
