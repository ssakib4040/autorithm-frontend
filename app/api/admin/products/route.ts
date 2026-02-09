import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

// GET /api/admin/products - List all products (including inactive/draft) - Admin only
export async function GET(request: Request) {
  try {
    // Check if user is admin
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const tool = searchParams.get("tool");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");
    const page = parseInt(searchParams.get("page") || "1");
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = {};

    if (category) {
      query.category = category;
    }

    if (tool) {
      query.tool = tool;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    const db = await getDb();

    // Fetch products
    const products = await db
      .collection("products")
      .find(query, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("products").countDocuments(query);

    return NextResponse.json(
      {
        products,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Admin get products error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/admin/products - Create a new product - Admin only
export async function POST(request: Request) {
  try {
    // Check if user is admin
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const {
      name,
      description,
      tool,
      category,
      price,
      slug,
      keyFeatures,
      howItWorks,
      technicalDetails,
      whatsIncluded,
      status,
      discounts,
    } = body;

    // Validate required fields
    if (!name || !description || !tool || !price || !slug) {
      return NextResponse.json(
        {
          message:
            "Name, description, tool, price, and slug are required fields",
        },
        { status: 400 },
      );
    }

    if (typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        { message: "Price must be a positive number" },
        { status: 400 },
      );
    }

    if (!["n8n", "Make"].includes(tool)) {
      return NextResponse.json(
        { message: "Tool must be either 'n8n' or 'Make'" },
        { status: 400 },
      );
    }

    const db = await getDb();

    // Check if slug already exists
    const existingProduct = await db
      .collection("products")
      .findOne({ slug, tool });

    if (existingProduct) {
      return NextResponse.json(
        { message: "A product with this slug and tool already exists" },
        { status: 409 },
      );
    }

    // Create new product
    const newProduct = {
      name,
      description,
      tool,
      category: category || "uncategorized",
      price,
      slug,
      keyFeatures: keyFeatures || [],
      howItWorks: howItWorks || [],
      technicalDetails: {
        complexity: technicalDetails?.complexity || "Medium",
        setupTime: technicalDetails?.setupTime || "30 minutes",
        apis: technicalDetails?.apis || [],
        requirements: technicalDetails?.requirements || [],
      },
      whatsIncluded: whatsIncluded || [],
      status: status || "draft",
      discounts: discounts || [],
      createdBy: authResult.email,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("products").insertOne(newProduct);

    // Return product data (excluding _id)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, ...productResponse } = newProduct as typeof newProduct & {
      _id: unknown;
    };

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: productResponse,
      },
      { status: 201 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Admin create product error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
