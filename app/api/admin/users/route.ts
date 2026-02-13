import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { getDb } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/auth";

const DEFAULT_LIMIT = 25;

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const role = searchParams.get("role")?.trim();
    const status = searchParams.get("status")?.trim();
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const limit = Math.max(
      parseInt(searchParams.get("limit") || `${DEFAULT_LIMIT}`, 10),
      1,
    );
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      if (role.toLowerCase() === "admin") {
        filter.isAdmin = true;
      } else if (role.toLowerCase() === "user") {
        filter.isAdmin = { $ne: true };
      }
    }

    if (status) {
      filter.status = status;
    }

    const db = await getDb();
    const usersCollection = db.collection("users");

    const total = await usersCollection.countDocuments(filter);

    const users = await usersCollection
      .find(filter, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total counts for stats (without filter)
    const totalUsers = await usersCollection.countDocuments({});
    const totalActive = await usersCollection.countDocuments({
      status: "active",
    });
    const totalSuspended = await usersCollection.countDocuments({
      status: "suspended",
    });

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      meta: {
        total_users: totalUsers,
        total_active: totalActive,
        total_suspended: totalSuspended,
      },
    });
  } catch (error) {
    const err = error as Error;
    console.error("Admin users GET error:", err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAdmin();
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const body = await request.json();
    const { name, email, password, role } = body || {};

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      email: String(email).toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(String(password), 10);
    const now = new Date();

    const newUser = {
      name: String(name).trim(),
      email: String(email).toLowerCase().trim(),
      password: hashedPassword,
      isAdmin: String(role).toLowerCase() === "admin",
      role: role || "User",
      emailVerified: false,
      createdAt: now,
      updatedAt: now,
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Admin users POST error:", err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
