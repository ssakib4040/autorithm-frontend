import { Product } from "@/types/product";

interface AdminProductsResponse {
  products: Product[];
  total: number;
  meta: {
    totalProducts: number;
    activeProducts: number;
    draftProducts: number;
    totalRevenue: number;
  };
}

interface AdminProductResponse {
  product: Product;
}

interface AdminProductParams {
  status?: string;
  tool?: string;
  category?: string;
  search?: string;
}

export const adminProductsApi = {
  getAll: async (token: string, params?: AdminProductParams) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append("status", params.status);
    if (params?.tool) searchParams.append("tool", params.tool);
    if (params?.category) searchParams.append("category", params.category);
    if (params?.search) searchParams.append("search", params.search);

    const queryString = searchParams.toString();
    const url = `/api/admin/products${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch products");
    }

    return response.json() as Promise<AdminProductsResponse>;
  },

  getBySlug: async (token: string, slug: string, tool: string) => {
    const response = await fetch(`/api/admin/products/${slug}?tool=${tool}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to fetch product");
    }

    return response.json() as Promise<AdminProductResponse>;
  },

  create: async (token: string, data: Partial<Product>) => {
    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create product");
    }

    return response.json() as Promise<{ message: string; product: Product }>;
  },

  update: async (
    token: string,
    slug: string,
    tool: string,
    data: Partial<Product>,
  ) => {
    const response = await fetch(`/api/admin/products/${slug}?tool=${tool}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update product");
    }

    return response.json() as Promise<{ message: string; product: Product }>;
  },

  delete: async (token: string, slug: string, tool: string) => {
    const response = await fetch(`/api/admin/products/${slug}?tool=${tool}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete product");
    }

    return response.json() as Promise<{ message: string }>;
  },
};
