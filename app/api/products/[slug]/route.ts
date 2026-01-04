import { NextResponse } from "next/server";
import db from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

// GET /api/products/[slug] - Get single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await db
      .collection("products")
      .findOne({ slug }, { projection: { _id: 0 } });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    const err = error as Error;
    console.error("Get product error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[slug] - Update product (Admin only)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { slug } = await params;
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const { _id, ...updateData } = body;

    const result = await db
      .collection("products")
      .updateOne({ slug }, { $set: { ...updateData, updatedAt: new Date() } });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await db
      .collection("products")
      .findOne({ slug }, { projection: { _id: 0 } });

    return NextResponse.json(
      { message: "Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.error("Update product error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[slug] - Delete product (Admin only)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authResult = await requireAdmin(request);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { slug } = await params;

    const result = await db.collection("products").deleteOne({ slug });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.error("Delete product error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
