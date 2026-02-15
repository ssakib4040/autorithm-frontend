import mongoose, { Schema } from "mongoose";

const DiscountAppliedSchema = new Schema(
  {
    percentage: { type: Number, min: 0, max: 100 },
    reason: { type: String, trim: true },
    discountedPrice: { type: Number, min: 0 },
  },
  { _id: false },
);

const PurchaseSchema = new Schema(
  {
    id: { type: Number, unique: true, sparse: true },
    productId: { type: Number, required: true },
    discountApplied: { type: DiscountAppliedSchema },
    originalPrice: { type: Number, required: true, min: 0 },
    finalPrice: { type: Number, required: true, min: 0 },
    purchasedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    purchaseDate: { type: Date, default: Date.now },
  },
  { timestamps: false },
);

PurchaseSchema.index({ purchasedBy: 1, productId: 1 });

const Purchase =
  mongoose.models.Purchase || mongoose.model("Purchase", PurchaseSchema);

export default Purchase;
