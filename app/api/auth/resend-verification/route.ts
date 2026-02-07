import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate input
    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const db = await getDb();

    // Find user
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if user exists
      return NextResponse.json(
        { message: "If email exists, verification link has been sent" },
        { status: 200 },
      );
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 200 },
      );
    }

    // Generate verification token
    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "24h" },
    );

    // In production, you would send this via email
    // For now, we'll just return it in the response
    console.log("Verification token:", verificationToken);
    console.log(
      "Verification link:",
      `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/verify-email?token=${verificationToken}&email=${user.email}`,
    );

    return NextResponse.json(
      {
        message: "Verification email sent successfully",
        // Remove this in production - only for development
        verificationToken,
        verificationLink: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/verify-email?token=${verificationToken}&email=${user.email}`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { message: "Failed to send verification email" },
      { status: 500 },
    );
  }
}
