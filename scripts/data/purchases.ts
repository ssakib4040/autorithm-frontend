import { faker } from "@faker-js/faker";
import type { InferSchemaType } from "mongoose";
import Purchase from "../../models/Purchase";

type PurchaseSeed = Omit<InferSchemaType<typeof Purchase.schema>, "_id">;

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

const MAX_PURCHASES_PER_PRODUCT = 52;
const DISCOUNT_PROBABILITY = 0.2;
const PURCHASE_DATE_RANGE = {
  from: new Date("2025-01-01"),
  to: new Date("2026-02-10"),
};

const calculateDiscountedPrice = (price: number, percentage: number): number =>
  Math.round(price * (1 - percentage / 100));

const buildDiscount = (
  product: SeedProductRef,
): PurchaseSeed["discountApplied"] | undefined => {
  if (!product.discounts?.length) {
    return undefined;
  }

  const shouldApply = faker.datatype.boolean({
    probability: DISCOUNT_PROBABILITY,
  });
  if (!shouldApply) {
    return undefined;
  }

  const discount = product.discounts[0];
  return {
    percentage: discount.percentage,
    reason: discount.reason,
    discountedPrice: calculateDiscountedPrice(
      product.price,
      discount.percentage,
    ),
  };
};

const pickUsers = (users: SeedUserRef[], count: number): SeedUserRef[] =>
  faker.helpers.shuffle(users).slice(0, count);

export async function getAllPurchases(
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<PurchaseSeed[]> {
  const purchases: PurchaseSeed[] = [];
  const purchasedCombinations = new Set<string>();
  let purchaseId = 1;

  for (const product of products) {
    const maxPurchases = Math.min(users.length, MAX_PURCHASES_PER_PRODUCT);
    const purchaseCount = faker.number.int({ min: 1, max: maxPurchases });

    for (const user of pickUsers(users, purchaseCount)) {
      if (!user.userId) {
        continue;
      }

      const combinationKey = `${user.userId}-${product.id}`;
      if (purchasedCombinations.has(combinationKey)) {
        continue;
      }

      purchasedCombinations.add(combinationKey);

      const discountApplied = buildDiscount(product);
      const finalPrice = discountApplied
        ? discountApplied.discountedPrice
        : product.price;

      purchases.push({
        id: purchaseId++,
        productId: product.id,
        discountApplied,
        originalPrice: product.price,
        finalPrice,
        purchasedBy: user.userId,
        purchaseDate: faker.date.between(PURCHASE_DATE_RANGE),
      });
    }
  }

  purchases.sort((a, b) => b.purchaseDate.getTime() - a.purchaseDate.getTime());
  return purchases;
}

// Helper functions
export const getPurchasesByUser = async (
  userId: string,
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<PurchaseSeed[]> => {
  const purchases = await getAllPurchases(users, products);
  return purchases.filter((purchase) => purchase.purchasedBy === userId);
};

export const getPurchasesByProduct = async (
  productId: number,
  users: SeedUserRef[],
  products: SeedProductRef[],
): Promise<PurchaseSeed[]> => {
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
