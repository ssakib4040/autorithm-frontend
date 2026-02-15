import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import { Product, Purchase } from "@/models";
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

    await connectMongoose();

    // Fetch all purchases to calculate sales and revenue
    const allPurchases = await Purchase.find({}).lean();

    console.log("Total purchases found:", allPurchases.length);
    if (allPurchases.length > 0) {
      console.log(
        "First purchase sample:",
        JSON.stringify(allPurchases[0], null, 2),
      );
    }

    // Calculate sales and revenue per product
    const productStats = allPurchases.reduce(
      (acc, purchase) => {
        const productId = purchase.productId;
        if (!acc[productId]) {
          acc[productId] = { sales: 0, revenue: 0 };
        }
        acc[productId].sales += 1;
        acc[productId].revenue += purchase.finalPrice || 0;
        return acc;
      },
      {} as Record<string | number, { sales: number; revenue: number }>,
    );

    console.log(
      "Product stats calculated:",
      JSON.stringify(productStats, null, 2),
    );

    // Fetch products
    const productsRaw = await Product.find(query)
      .select("-__v -_id")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Add sales and revenue to each product
    const products = productsRaw.map((product) => {
      // Try both number and string keys
      const stats =
        productStats[product.id] ||
        productStats[String(product.id)] ||
        productStats[Number(product.id)];

      return {
        ...product,
        sales: stats?.sales || 0,
        revenue: `$${stats?.revenue || 0}`,
      };
    });

    const total = await Product.countDocuments(query);

    // Calculate meta statistics
    const allProducts = await Product.find({}).lean();
    const totalProducts = allProducts.length;
    const activeProducts = allProducts.filter(
      (p) => p.status === "active",
    ).length;
    const draftProducts = allProducts.filter(
      (p) => p.status === "draft",
    ).length;

    // Calculate total revenue from purchases
    const totalRevenue = allPurchases.reduce(
      (sum, purchase) => sum + (purchase.finalPrice || 0),
      0,
    );

    return NextResponse.json(
      {
        products,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        meta: {
          totalProducts,
          activeProducts,
          draftProducts,
          totalRevenue,
        },
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

    await connectMongoose();

    // Check if slug already exists
    const existingProduct = await Product.findOne({ slug, tool }).lean();

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

    await Product.create(newProduct);

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
