import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/products/[slug] - Get single product (any status) - Admin only
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // Check if user is admin
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get("tool");

    // Build query
    const query: { slug: string; tool?: string } = { slug };
    if (tool) {
      query.tool = tool;
    }

    const db = await getDb();

    const product = await db
      .collection("products")
      .findOne(query, { projection: { _id: 0 } });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Admin get product error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

// PUT /api/admin/products/[slug] - Update product - Admin only
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // Check if user is admin
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get("tool");
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, createdAt, createdBy, slug: bodySlug, ...updateData } = body;

    // Add updatedAt timestamp
    updateData.updatedAt = new Date();

    // Build query
    const query: { slug: string; tool?: string } = { slug };
    if (tool) {
      query.tool = tool;
    }

    const db = await getDb();

    const result = await db
      .collection("products")
      .updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const updatedProduct = await db
      .collection("products")
      .findOne(query, { projection: { _id: 0 } });

    return NextResponse.json(
      { message: "Product updated successfully", product: updatedProduct },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Admin update product error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

// DELETE /api/admin/products/[slug] - Delete product - Admin only
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    // Check if user is admin
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { slug } = await params;
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get("tool");

    // Build query
    const query: { slug: string; tool?: string } = { slug };
    if (tool) {
      query.tool = tool;
    }

    const db = await getDb();

    const result = await db.collection("products").deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Admin delete product error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
