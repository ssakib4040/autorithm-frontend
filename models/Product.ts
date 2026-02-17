import mongoose, { Schema } from "mongoose";

const DiscountSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    value: { type: Number, min: 0 },
    percentage: { type: Number, min: 0, max: 100 },
    reason: { type: String, required: true, trim: true },
    startDate: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
  },
  { _id: false },
);

const HowItWorksSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const TechnicalDetailsSchema = new Schema(
  {
    complexity: { type: String, required: true, trim: true },
    setupTime: { type: String, required: true, trim: true },
    apis: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
  },
  { _id: false },
);

const FAQSchema = new Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const DownloadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    fileType: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const StatsSchema = new Schema(
  {
    totalSales: { type: Number, default: 0, min: 0 },
    totalRevenue: { type: Number, default: 0, min: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0, min: 0 },
  },
  { _id: false },
);

const ProductSchema = new Schema(
  {
    id: { type: Number, unique: true, sparse: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    tool: { type: String, enum: ["n8n", "Make"], required: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    slug: { type: String, required: true, trim: true },
    previewImage: { type: String, trim: true },
    createdBy: { type: String, trim: true },
    discounts: { type: [DiscountSchema], default: [] },
    keyFeatures: { type: [String], default: [] },
    howItWorks: { type: [HowItWorksSchema], default: [] },
    technicalDetails: {
      type: TechnicalDetailsSchema,
      default: () => ({
        complexity: "Medium",
        setupTime: "30 minutes",
        apis: [],
        requirements: [],
      }),
    },
    whatsIncluded: { type: [String], default: [] },
    faqs: { type: [FAQSchema], default: [] },
    downloads: { type: [DownloadSchema], default: [] },
    stats: {
      type: StatsSchema,
      default: () => ({
        totalSales: 0,
        totalRevenue: 0,
        averageRating: 0,
        totalReviews: 0,
      }),
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "draft",
    },
    stock: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  },
);

ProductSchema.index({ slug: 1, tool: 1 }, { unique: true, sparse: true });

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;
