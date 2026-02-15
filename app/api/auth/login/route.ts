import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import { Session, User } from "@/models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }

    await connectMongoose();

    // Find user in database
    const user = await User.findOne({ email: email.toLowerCase() }).lean();

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        id: user._id.toString(),
        isAdmin: user.isAdmin || false,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    );

    // Store session in database
    // Get next session ID
    const lastSession = await Session.findOne({}).sort({ id: -1 }).lean();
    const nextId = lastSession?.id ? lastSession.id + 1 : 1;

    // Extract request metadata
    const ipAddress =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    const session = {
      id: nextId,
      token: crypto.createHash("sha256").update(token).digest("hex"), // Store hashed token for security
      userId: user._id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      createdAt: new Date(),
      lastActiveAt: new Date(),
      ipAddress,
      userAgent,
    };

    await Session.create(session);

    // Return user data (excluding password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: userWithoutPassword,
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Login error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
