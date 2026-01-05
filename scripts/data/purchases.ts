import { Purchase } from "@/types/purchase";

// Sample purchases with randomly assigned users
// Note: purchasedBy will be replaced with actual MongoDB ObjectIds during seeding
export const allPurchases: Purchase[] = [
  {
    id: 1,
    productId: 1,
    discountApplied: {
      percentage: 20,
      reason: "Launch Week Special",
      discountedPrice: 119,
    },
    originalPrice: 149,
    finalPrice: 119,
    purchasedBy: "USER_1", // Will be replaced with Sadman's _id
    purchaseDate: new Date("2026-01-03T10:30:00"),
  },
  {
    id: 2,
    productId: 3,
    discountApplied: {
      percentage: 15,
      reason: "New Year Sale",
      discountedPrice: 169,
    },
    originalPrice: 199,
    finalPrice: 169,
    purchasedBy: "USER_2", // Will be replaced with John's _id
    purchaseDate: new Date("2026-01-02T14:20:00"),
  },
  {
    id: 3,
    productId: 4,
    originalPrice: 179,
    finalPrice: 179,
    purchasedBy: "USER_1", // Will be replaced with Sadman's _id
    purchaseDate: new Date("2026-01-01T09:15:00"),
  },
  {
    id: 4,
    productId: 2,
    discountApplied: {
      percentage: 15,
      reason: "Launch Week Special",
      discountedPrice: 144,
    },
    originalPrice: 169,
    finalPrice: 144,
    purchasedBy: "USER_2", // Will be replaced with John's _id
    purchaseDate: new Date("2026-01-04T16:45:00"),
  },
  {
    id: 5,
    productId: 5,
    originalPrice: 189,
    finalPrice: 189,
    purchasedBy: "USER_2", // Will be replaced with John's _id
    purchaseDate: new Date("2025-12-30T11:00:00"),
  },
  {
    id: 6,
    productId: 6,
    originalPrice: 129,
    finalPrice: 129,
    purchasedBy: "USER_1", // Will be replaced with Sadman's _id
    purchaseDate: new Date("2025-12-28T13:30:00"),
  },
  {
    id: 7,
    productId: 7,
    originalPrice: 139,
    finalPrice: 139,
    purchasedBy: "USER_2", // Will be replaced with John's _id
    purchaseDate: new Date("2025-12-27T10:00:00"),
  },
  {
    id: 8,
    productId: 8,
    originalPrice: 119,
    finalPrice: 119,
    purchasedBy: "USER_1", // Will be replaced with Sadman's _id
    purchaseDate: new Date("2026-01-05T08:20:00"),
  },
];

// Helper functions
export const getPurchasesByUser = (userId: string): Purchase[] => {
  return allPurchases.filter((purchase) => purchase.purchasedBy === userId);
};

export const getPurchasesByProduct = (productId: number): Purchase[] => {
  return allPurchases.filter((purchase) => purchase.productId === productId);
};

export const getTotalRevenue = (): number => {
  return allPurchases.reduce(
    (total, purchase) => total + purchase.finalPrice,
    0
  );
};

export const getTotalRevenueByUser = (userId: string): number => {
  return allPurchases
    .filter((purchase) => purchase.purchasedBy === userId)
    .reduce((total, purchase) => total + purchase.finalPrice, 0);
};
