import { v4 as uuidv4 } from "uuid";
import { Activity } from "@/types/activity";

type SeedUserRef = {
  userId?: string;
};

// Generate activity logs from users and their actions
export async function getAllActivities(
  users: SeedUserRef[],
): Promise<Activity[]> {
  if (!users[0]?.userId || !users[1]?.userId) {
    throw new Error("Seed activities requires at least two users with userId");
  }

  const user1 = users[0].userId; // Sadman (admin)
  const user2 = users[1].userId; // John

  const activities: Activity[] = [
    {
      id: uuidv4(),
      userId: user1,
      action: "register",
      description: "Admin account created and verified",
      metadata: { isAdmin: true, verified: true },
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0",
      createdAt: new Date("2025-12-15T08:00:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/121.0.0.0",
      createdAt: new Date("2025-12-28T09:15:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "product_view",
      resourceType: "product",
      resourceId: 6,
      description: "Viewed CRM Data Sync Engine",
      metadata: { productName: "CRM Data Sync Engine", price: 129 },
      ipAddress: "192.168.1.100",
      createdAt: new Date("2025-12-28T09:20:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 6,
      description: "Purchased CRM Data Sync Engine for $129",
      metadata: {
        productId: 6,
        amount: 129,
        paymentMethod: "stripe",
      },
      ipAddress: "192.168.1.100",
      createdAt: new Date("2025-12-28T13:30:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "192.168.1.100",
      createdAt: new Date("2026-01-01T07:45:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "product_view",
      resourceType: "product",
      resourceId: 4,
      description: "Viewed E-commerce Order Pipeline",
      metadata: { productName: "E-commerce Order Pipeline", price: 179 },
      ipAddress: "192.168.1.100",
      createdAt: new Date("2026-01-01T08:00:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 3,
      description: "Purchased E-commerce Order Pipeline for $179",
      metadata: {
        productId: 4,
        amount: 179,
        paymentMethod: "stripe",
      },
      ipAddress: "192.168.1.100",
      createdAt: new Date("2026-01-01T09:15:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "192.168.1.105",
      createdAt: new Date("2026-01-03T09:00:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "product_view",
      resourceType: "product",
      resourceId: 1,
      description: "Viewed AI Lead Enrichment System",
      metadata: { productName: "AI Lead Enrichment System", price: 149 },
      ipAddress: "192.168.1.105",
      createdAt: new Date("2026-01-03T09:30:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 1,
      description:
        "Purchased AI Lead Enrichment System for $119 (20% discount)",
      metadata: {
        productId: 1,
        amount: 119,
        originalPrice: 149,
        discount: 20,
        paymentMethod: "stripe",
      },
      ipAddress: "192.168.1.105",
      createdAt: new Date("2026-01-03T10:30:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "product_view",
      resourceType: "product",
      resourceId: 8,
      description: "Viewed Social Media Scheduler Pro",
      metadata: { productName: "Social Media Scheduler Pro", price: 119 },
      ipAddress: "192.168.1.105",
      createdAt: new Date("2026-01-05T07:45:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 8,
      description: "Purchased Social Media Scheduler Pro for $119",
      metadata: {
        productId: 8,
        amount: 119,
        paymentMethod: "stripe",
      },
      ipAddress: "192.168.1.105",
      createdAt: new Date("2026-01-05T08:20:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "contact_create",
      resourceType: "contact",
      description: "Submitted admin account setup inquiry",
      metadata: { subject: "Admin account setup and configuration" },
      ipAddress: "192.168.1.105",
      createdAt: new Date("2026-02-08T08:00:00"),
    },
    {
      id: uuidv4(),
      userId: user1,
      action: "product_create",
      resourceType: "product",
      resourceId: 1,
      description: "Created product: AI Lead Enrichment System",
      metadata: { productName: "AI Lead Enrichment System", tool: "n8n" },
      ipAddress: "192.168.1.105",
      createdAt: new Date("2026-02-08T09:30:00"),
    },

    // John's activities
    {
      id: uuidv4(),
      userId: user2,
      action: "register",
      description: "User account created",
      metadata: { isAdmin: false, verified: false },
      ipAddress: "203.0.113.45",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1",
      createdAt: new Date("2025-12-20T14:30:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "email_verify",
      description: "Email verification pending",
      ipAddress: "203.0.113.45",
      createdAt: new Date("2025-12-20T14:35:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "203.0.113.45",
      createdAt: new Date("2025-12-27T11:00:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "product_view",
      resourceType: "product",
      resourceId: 7,
      description: "Viewed Marketing Campaign Automator",
      metadata: { productName: "Marketing Campaign Automator", price: 139 },
      ipAddress: "203.0.113.45",
      createdAt: new Date("2025-12-27T09:30:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 7,
      description: "Purchased Marketing Campaign Automator for $139",
      metadata: {
        productId: 7,
        amount: 139,
        paymentMethod: "paypal",
      },
      ipAddress: "203.0.113.45",
      createdAt: new Date("2025-12-27T10:00:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "203.0.113.48",
      createdAt: new Date("2025-12-30T10:00:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "product_view",
      resourceType: "product",
      resourceId: 5,
      description: "Viewed E-commerce Order Pipeline (Make version)",
      metadata: { productName: "E-commerce Order Pipeline", price: 189 },
      ipAddress: "203.0.113.48",
      createdAt: new Date("2025-12-30T10:30:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 5,
      description: "Purchased E-commerce Order Pipeline for $189",
      metadata: {
        productId: 5,
        amount: 189,
        paymentMethod: "stripe",
      },
      ipAddress: "203.0.113.48",
      createdAt: new Date("2025-12-30T11:00:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "203.0.113.48",
      createdAt: new Date("2026-01-02T13:00:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "product_view",
      resourceType: "product",
      resourceId: 3,
      description: "Viewed SaaS Onboarding Orchestrator",
      metadata: { productName: "SaaS Onboarding Orchestrator", price: 199 },
      ipAddress: "203.0.113.48",
      createdAt: new Date("2026-01-02T13:45:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 2,
      description:
        "Purchased SaaS Onboarding Orchestrator for $169 (15% discount)",
      metadata: {
        productId: 3,
        amount: 169,
        originalPrice: 199,
        discount: 15,
        paymentMethod: "stripe",
      },
      ipAddress: "203.0.113.48",
      createdAt: new Date("2026-01-02T14:20:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "203.0.113.50",
      createdAt: new Date("2026-01-04T15:30:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "product_view",
      resourceType: "product",
      resourceId: 2,
      description: "Viewed AI Lead Enrichment System (Make version)",
      metadata: { productName: "AI Lead Enrichment System", price: 169 },
      ipAddress: "203.0.113.50",
      createdAt: new Date("2026-01-04T16:00:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "purchase",
      resourceType: "purchase",
      resourceId: 4,
      description:
        "Purchased AI Lead Enrichment System for $144 (15% discount)",
      metadata: {
        productId: 2,
        amount: 144,
        originalPrice: 169,
        discount: 15,
        paymentMethod: "stripe",
      },
      ipAddress: "203.0.113.50",
      createdAt: new Date("2026-01-04T16:45:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "profile_update",
      resourceType: "user",
      description: "Updated profile information",
      metadata: { fields: ["name", "email"] },
      ipAddress: "203.0.113.50",
      createdAt: new Date("2026-01-04T17:00:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "contact_create",
      resourceType: "contact",
      description: "Submitted inquiry about workflow automation",
      metadata: { subject: "General inquiry about workflow automation" },
      ipAddress: "203.0.113.50",
      createdAt: new Date("2026-02-07T16:45:00"),
    },
    {
      id: uuidv4(),
      userId: user2,
      action: "login",
      description: "Logged in successfully",
      ipAddress: "203.0.113.50",
      createdAt: new Date("2026-02-08T10:00:00"),
    },
  ];

  return activities;
}

// Helper functions
export const getActivitiesByUser = async (
  userId: string,
  users: SeedUserRef[],
): Promise<Activity[]> => {
  const activities = await getAllActivities(users);
  return activities
    .filter((activity) => activity.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getActivitiesByAction = async (
  action: string,
  users: SeedUserRef[],
): Promise<Activity[]> => {
  const activities = await getAllActivities(users);
  return activities
    .filter((activity) => activity.action === action)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getRecentActivities = async (
  users: SeedUserRef[],
  limit: number = 20,
): Promise<Activity[]> => {
  const activities = await getAllActivities(users);
  return activities
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
};

export const getActivitiesByDateRange = async (
  startDate: Date,
  endDate: Date,
  users: SeedUserRef[],
): Promise<Activity[]> => {
  const activities = await getAllActivities(users);
  return activities
    .filter(
      (activity) =>
        activity.createdAt >= startDate && activity.createdAt <= endDate,
    )
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
