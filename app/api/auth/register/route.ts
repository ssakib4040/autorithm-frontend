import { NextResponse } from "next/server";
import { connectMongoose } from "@/lib/mongoose";
import { User } from "@/models";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/lib/mail";
import { welcomeEmailTemplate } from "@/email-templates";

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

    // Generate email verification token (valid for 24 hours)
    const verificationToken = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "24h" },
    );

    const verificationLink = `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:3000"}/auth/verify-email?token=${verificationToken}`;

    // Send welcome email with verification link
    const emailSent = await sendEmail({
      to: newUser.email,
      subject: "Welcome to Autorithm! Verify your email",
      html: welcomeEmailTemplate(newUser.name || "User", verificationLink),
    });

    if (!emailSent) {
      console.warn(
        "Welcome email failed to send for:",
        newUser.email,
        "- User still created",
      );
    }

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
