import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    // Validate input
    if (!token) {
      return NextResponse.json(
        { message: "Verification token is required" },
        { status: 400 },
      );
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "fallback-secret",
      ) as { email: string };
    } catch {
      return NextResponse.json(
        { message: "Invalid or expired verification token" },
        { status: 401 },
      );
    }

    const db = await getDb();

    // Find user
    const user = await db
      .collection("users")
      .findOne({ email: decoded.email.toLowerCase() });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 200 },
      );
    }

    // Update user as verified
    await db.collection("users").updateOne(
      { email: decoded.email.toLowerCase() },
      {
        $set: {
          emailVerified: true,
          verifiedAt: new Date(),
        },
      },
    );

    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { message: "Failed to verify email" },
      { status: 500 },
    );
  }
}
