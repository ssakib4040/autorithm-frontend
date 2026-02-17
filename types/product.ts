export interface Product {
  id: number;
  name: string;
  description: string;
  tool: "n8n" | "Make";
  category: string;
  price: number;
  slug: string;
  previewImage?: string; // Workflow preview image URL
  createdBy?: string;
  discounts?: {
    type?: "percentage" | "fixed";
    value?: number;
    percentage?: number;
    reason: string;
    startDate: Date;
    expiresAt: Date;
  }[];
  discount?: {
    type?: "percentage" | "fixed";
    value?: number;
    percentage?: number;
    reason: string;
    timeLeft?: string;
  };
  keyFeatures: string[];
  howItWorks: {
    title: string;
    description: string;
  }[];
  technicalDetails: {
    complexity: string;
    setupTime: string;
    apis: string[];
    requirements: string[];
  };
  whatsIncluded: string[];
  faqs?: {
    question: string;
    answer: string;
  }[]; // Custom FAQs per product
  downloads?: {
    name: string;
    description: string;
    fileType: string;
    size: string;
    url: string;
  }[]; // Available download files
  stats?: {
    totalSales?: number;
    totalRevenue?: number;
    averageRating?: number;
    totalReviews?: number;
  }; // Product statistics
  status: "active" | "inactive" | "draft";
}

export interface ProductDetailResponse {
  name: string;
  category: string;
  product: Product;
  relatedVersions: Product[];
}

export interface ErrorResponse {
  status: number;
  message: string;
}
