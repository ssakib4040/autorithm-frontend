import { NextResponse } from "next/server";
import db from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        { message: "If email exists, password reset link has been sent" },
        { status: 200 }
      );
    }

    // Generate password reset token
    const resetToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "1h" }
    );

    // In production, you would send this via email
    // For now, we'll just return it in the response
    console.log("Password reset token:", resetToken);

    return NextResponse.json(
      {
        message: "If email exists, password reset link has been sent",
        // Remove this in production - only for development
        resetToken,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.error("Forgot password error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
