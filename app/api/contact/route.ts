import { NextResponse } from "next/server";
import { Types } from "mongoose";

import { connectMongoose } from "@/lib/mongoose";
import { Contact } from "@/models";
import { requireAuth } from "@/lib/auth";

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  hostname?: string;
  action?: string;
  cdata?: string;
}

async function verifyTurnstile(
  token: string,
  remoteIp?: string | null,
): Promise<TurnstileResponse> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return { success: process.env.NODE_ENV !== "production" };
  }

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );

  return (await response.json()) as TurnstileResponse;
}

export async function POST(request: Request) {
  try {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const authenticatedUser = authResult;

    const body = await request.json();
    const { name, subject, message, turnstileToken } = body || {};

    if (!name || !subject || !message) {
      return NextResponse.json(
        { message: "Name, subject, and message are required" },
        { status: 400 },
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { message: "Security verification is required" },
        { status: 400 },
      );
    }

    const remoteIp =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip");
    const turnstileResult = await verifyTurnstile(turnstileToken, remoteIp);

    if (!turnstileResult.success) {
      return NextResponse.json(
        { message: "Security verification failed" },
        { status: 403 },
      );
    }

    await connectMongoose();

    const now = new Date();

    const contact = {
      name: String(name).trim(),
      email: authenticatedUser.email.toLowerCase(),
      userId: new Types.ObjectId(authenticatedUser.id),
      subject: String(subject).trim(),
      message: String(message).trim(),
      status: "new",
      createdAt: now,
      updatedAt: now,
    };

    await Contact.create(contact);

    return NextResponse.json(
      { message: "Thanks! Your message has been received." },
      { status: 201 },
    );
  } catch (error) {
    const err = error as Error;
    console.error("Contact submission error:", err);

    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 },
    );
  }
}
