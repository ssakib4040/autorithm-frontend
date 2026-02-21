import { Product, ErrorResponse } from "@/types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!process.env.NEXT_PUBLIC_API_URL) {
  console.log(
    "WARNING: NEXT_PUBLIC_API_URL is not set. Falling back to default localhost URL.",
  );
}

interface User {
  email: string;
  name: string;
  isAdmin?: boolean;
  isVerified?: boolean;
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    console.log(`[API] ${options.method || "GET"} ${url}`);

    const headers: Record<string, string> =
      (options.headers as Record<string, string>) || {};

    // Add Vercel bypass token if available
    if (process.env.NEXT_PUBLIC_VERCEL_BYPASS_TOKEN) {
      headers["x-vercel-protection-bypass"] =
        process.env.NEXT_PUBLIC_VERCEL_BYPASS_TOKEN;
    }

    const res = await fetch(url, {
      credentials: "include",
      ...options,
      headers,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`[API] Error for ${endpoint}:`, error);
    throw error;
  }
}

// Products API
export const productsApi = {
  getAll: (params?: Record<string, string | number>) => {
    return apiRequest<{ products: Product[]; totalPages: number }>(
      `/products${buildQuery(params)}`,
      {
        cache: "force-cache",
      },
    );
  },

  getBySlug: (slug: string) => {
    return apiRequest<
      (Product & { relatedVersions: Product[] }) | ErrorResponse
    >(`/products/${slug}`, {
      cache: "force-cache",
    });
  },

  create: (data: Partial<Product>, token: string) =>
    apiRequest<{ message: string; product: Product }>("/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  update: (slug: string, data: Partial<Product>, token: string) =>
    apiRequest<{ message: string; product: Product }>(`/products/${slug}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),

  delete: (slug: string, token: string) =>
    apiRequest<{ message: string }>(`/products/${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Auth API
export const authApi = {
  register: (data: { email: string; password: string; name?: string }) =>
    apiRequest<{ message: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: (data: { email: string; password: string }) =>
    apiRequest<{ message: string; token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  forgotPassword: (email: string) =>
    apiRequest<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  resetPassword: (data: { token: string; password: string }) =>
    apiRequest<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Contact API
export const contactApi = {
  create: (
    data: {
      name: string;
      subject: string;
      message: string;
      turnstileToken: string;
    },
    token: string,
  ) =>
    apiRequest<{ message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

function buildQuery(params?: Record<string, string | number>): string {
  if (!params) return "";
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    searchParams.set(key, String(value));
  });
  return `?${searchParams.toString()}`;
}
