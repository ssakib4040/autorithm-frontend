import { Purchase } from "@/types/purchase";
import { getUsers } from "./users";

// Generate purchases with proper userId references
export async function getAllPurchases(): Promise<Purchase[]> {
  const users = await getUsers();
  const user1 = users[0].userId; // Sadman
  const user2 = users[1].userId; // John

  return [
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
      purchasedBy: user1,
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
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-02T14:20:00"),
    },
    {
      id: 3,
      productId: 4,
      originalPrice: 179,
      finalPrice: 179,
      purchasedBy: user1,
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
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-04T16:45:00"),
    },
    {
      id: 5,
      productId: 5,
      originalPrice: 189,
      finalPrice: 189,
      purchasedBy: user2,
      purchaseDate: new Date("2025-12-30T11:00:00"),
    },
    {
      id: 6,
      productId: 6,
      originalPrice: 129,
      finalPrice: 129,
      purchasedBy: user1,
      purchaseDate: new Date("2025-12-28T13:30:00"),
    },
    {
      id: 7,
      productId: 7,
      originalPrice: 139,
      finalPrice: 139,
      purchasedBy: user2,
      purchaseDate: new Date("2025-12-27T10:00:00"),
    },
    {
      id: 8,
      productId: 8,
      originalPrice: 119,
      finalPrice: 119,
      purchasedBy: user1,
      purchaseDate: new Date("2026-01-05T08:20:00"),
    },
  ];
}

// Helper functions
export const getPurchasesByUser = async (
  userId: string,
): Promise<Purchase[]> => {
  const purchases = await getAllPurchases();
  return purchases.filter((purchase) => purchase.purchasedBy === userId);
};

export const getPurchasesByProduct = async (
  productId: number,
): Promise<Purchase[]> => {
  const purchases = await getAllPurchases();
  return purchases.filter((purchase) => purchase.productId === productId);
};

export const getTotalRevenue = async (): Promise<number> => {
  const purchases = await getAllPurchases();
  return purchases.reduce((total, purchase) => total + purchase.finalPrice, 0);
};

export const getTotalRevenueByUser = async (
  userId: string,
): Promise<number> => {
  const purchases = await getAllPurchases();
  return purchases
    .filter((purchase) => purchase.purchasedBy === userId)
    .reduce((total, purchase) => total + purchase.finalPrice, 0);
};
