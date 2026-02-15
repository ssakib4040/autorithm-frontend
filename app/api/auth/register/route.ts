import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name = "Anonymous" } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    await connectMongoose();

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    }).lean();

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Admin assignment - Grant admin privileges to specific email
    const ADMIN_EMAIL = "admin@autorithm.com";
    const isAdmin = email.toLowerCase() === ADMIN_EMAIL;

    // Create new user
    const newUser = {
      userId: uuidv4(),
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name || "",
      isAdmin: isAdmin,
      emailVerified: false,
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await User.create(newUser);

    // Return user data (excluding password and _id)
    const userResponse = {
      email: newUser.email,
      name: newUser.name,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
      },
      { status: 201 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Registration error:", error);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
