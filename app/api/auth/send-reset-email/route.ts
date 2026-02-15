import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import { User } from "@/models";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/mail";
import { passwordResetEmailTemplate } from "@/email-templates";

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
      // For security, don't reveal if email exists or not
      return NextResponse.json(
        {
          message:
            "If an account with this email exists, a password reset link has been sent",
        },
        { status: 200 },
      );
    }

    // Generate password reset token (valid for 24 hours)
    const resetToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    const resetLink = `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3000"}/auth/reset-password?token=${resetToken}`;

    // Send password reset email
    const emailSent = await sendEmail({
      to: user.email,
      subject: "Reset your Autorithm password",
      html: passwordResetEmailTemplate(user.name || "User", resetLink),
    });

    if (!emailSent) {
      console.warn("Password reset email failed to send for:", user.email);
    }

    // Always return the same message for security
    return NextResponse.json(
      {
        message:
          "If an account with this email exists, a password reset link has been sent",
      },
      { status: 200 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Password reset email error:", error);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
