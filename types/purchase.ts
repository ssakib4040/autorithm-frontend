export interface Purchase {
  id: number;
  productId: number; // Reference to product - can be populated via MongoDB $lookup
  discountApplied?: {
    percentage: number;
    reason: string;
    discountedPrice: number;
  };
  originalPrice: number;
  finalPrice: number;
  purchasedBy: string; // User MongoDB _id (ObjectId) - can be populated to get full user details
  purchaseDate: Date;
}
