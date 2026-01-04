import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import db from "./mongodb";

export interface AuthUser {
  email: string;
  name: string;
  isAdmin?: boolean;
}

export async function verifyToken(request: Request): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secret"
    ) as AuthUser;

    return decoded;
  } catch (error) {
    return null;
  }
}

export async function requireAuth(request: Request) {
  const user = await verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return user;
}

export async function requireAdmin(request: Request) {
  const user = await verifyToken(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Fetch user from database to check admin status
  const dbUser = await db
    .collection("users")
    .findOne({ email: user.email }, { projection: { isAdmin: 1 } });

  if (!dbUser || !dbUser.isAdmin) {
    return NextResponse.json(
      { message: "Forbidden: Admin access required" },
      { status: 403 }
    );
  }

  return user;
}
