import { faker } from "@faker-js/faker";

type SeedUserRef = {
  userId?: string;
};

type SeedProductRef = {
  id: number;
  price: number;
  discounts?: Array<{
    percentage: number;
    reason: string;
  }>;
};

type SeedPurchase = {
  id: number;
  productId: number;
  discountApplied?: {
    percentage: number;
    reason: string;
    discountedPrice: number;
  };
  originalPrice: number;
  finalPrice: number;
  purchasedBy: SeedUserRef["userId"];
  purchaseDate: Date;
};

// Generate purchases with proper userId references and actual product data
export async function getAllPurchases(
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<SeedPurchase[]> {
  const purchases: SeedPurchase[] = [];
  let purchaseId = 1;

  // Track user-product combinations to ensure one user can only purchase one product once
  const purchasedCombinations = new Set<string>();

  // Function to calculate discount price
  const calculateDiscountedPrice = (
    price: number,
    percentage: number,
  ): number => {
    return Math.round(price * (1 - percentage / 100));
  };

  // Generate random purchases for each product
  products.forEach((product) => {
    // Random number of purchases between 1 and number of users (max 52)
    const maxPurchases = Math.min(users.length, 52);
    const purchaseCount = faker.number.int({ min: 1, max: maxPurchases });

    // Create a shuffled copy of users array and take only the number we need
    const shuffledUsers = [...users]
      .sort(() => Math.random() - 0.5)
      .slice(0, purchaseCount);

    shuffledUsers.forEach((user) => {
      const combinationKey = `${user.userId}-${product.id}`;

      // Skip if this user already purchased this product
      if (purchasedCombinations.has(combinationKey)) {
        return;
      }

      purchasedCombinations.add(combinationKey);

      // 20% chance of applying a discount if product has discounts
      const hasDiscount =
        product.discounts &&
        product.discounts.length > 0 &&
        faker.datatype.boolean({ probability: 0.2 });

      const discount = hasDiscount ? product.discounts![0] : null;

      purchases.push({
        id: purchaseId++,
        productId: product.id,
        discountApplied: discount
          ? {
              percentage: discount.percentage,
              reason: discount.reason,
              discountedPrice: calculateDiscountedPrice(
                product.price,
                discount.percentage,
              ),
            }
          : undefined,
        originalPrice: product.price,
        finalPrice: discount
          ? calculateDiscountedPrice(product.price, discount.percentage)
          : product.price,
        purchasedBy: user.userId,
        purchaseDate: faker.date.between({
          from: "2025-01-01",
          to: "2026-02-10",
        }),
      });
    });
  });

  // Sort by purchase date descending
  purchases.sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime());

  return purchases;
}

// Helper functions
export const getPurchasesByUser = async (
  userId: string,
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<SeedPurchase[]> => {
  const purchases = await getAllPurchases(users, products);
  return purchases.filter((purchase) => purchase.purchasedBy === userId);
};

export const getPurchasesByProduct = async (
  productId: number,
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<SeedPurchase[]> => {
  const purchases = await getAllPurchases(users, products);
  return purchases.filter((purchase) => purchase.productId === productId);
};

export const getTotalRevenue = async (
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<number> => {
  const purchases = await getAllPurchases(users, products);
  return purchases.reduce((total, purchase) => total + purchase.finalPrice, 0);
};

export const getTotalRevenueByUser = async (
  userId: string,
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<number> => {
  const purchases = await getAllPurchases(users, products);
  return purchases
    .filter((purchase) => purchase.purchasedBy === userId)
    .reduce((total, purchase) => total + purchase.finalPrice, 0);
};
