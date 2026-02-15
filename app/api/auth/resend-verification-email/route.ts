import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import { User } from "@/models";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/mail";
import { emailVerificationTemplate } from "@/email-templates";

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

    await connectMongoose();

    // Check if user exists
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).lean();

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 },
      );
    }

    // Check if already verified
    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email is already verified" },
        { status: 400 },
      );
    }

    // Generate new verification token (valid for 24 hours)
    const verificationToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    const verificationLink = `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3000"}/auth/verify-email?token=${verificationToken}`;

    // Send verification email
    const emailSent = await sendEmail({
      to: user.email,
      subject: "Verify your Autorithm email address",
      html: emailVerificationTemplate(user.name || "User", verificationLink),
    });

    if (!emailSent) {
      return NextResponse.json(
        { message: "Failed to send verification email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Verification email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Resend verification email error:", error);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
