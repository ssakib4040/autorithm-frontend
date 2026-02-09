import { Purchase } from "@/types/purchase";
import { getUsers } from "./users";
import { getAllProducts } from "./products";

// Generate purchases with proper userId references and actual product data
export async function getAllPurchases(): Promise<Purchase[]> {
  const users = await getUsers();
  const products = await getAllProducts();
  const user1 = users[0].userId; // Sadman
  const user2 = users[1].userId; // John

  // Create purchases from actual products
  const purchases: Purchase[] = [];
  let purchaseId = 1;

  // Function to calculate discount price
  const calculateDiscountedPrice = (
    price: number,
    percentage: number,
  ): number => {
    return Math.round(price * (1 - percentage / 100));
  };

  // Purchase 1: Product 1 with active discount
  const product1 = products.find((p) => p.id === 1);
  if (product1 && product1.discounts && product1.discounts.length > 0) {
    const discount = product1.discounts[0];
    purchases.push({
      id: purchaseId++,
      productId: product1.id,
      discountApplied: {
        percentage: discount.percentage,
        reason: discount.reason,
        discountedPrice: calculateDiscountedPrice(
          product1.price,
          discount.percentage,
        ),
      },
      originalPrice: product1.price,
      finalPrice: calculateDiscountedPrice(product1.price, discount.percentage),
      purchasedBy: user1,
      purchaseDate: new Date("2026-01-03T10:30:00"),
    });
  }

  // Purchase 2: Product 2 with active discount
  const product2 = products.find((p) => p.id === 2);
  if (product2 && product2.discounts && product2.discounts.length > 0) {
    const discount = product2.discounts[0];
    purchases.push({
      id: purchaseId++,
      productId: product2.id,
      discountApplied: {
        percentage: discount.percentage,
        reason: discount.reason,
        discountedPrice: calculateDiscountedPrice(
          product2.price,
          discount.percentage,
        ),
      },
      originalPrice: product2.price,
      finalPrice: calculateDiscountedPrice(product2.price, discount.percentage),
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-04T16:45:00"),
    });
  }

  // Purchase 3: Product 3 without discount
  const product3 = products.find((p) => p.id === 3);
  if (product3) {
    purchases.push({
      id: purchaseId++,
      productId: product3.id,
      originalPrice: product3.price,
      finalPrice: product3.price,
      purchasedBy: user1,
      purchaseDate: new Date("2026-01-02T14:20:00"),
    });
  }

  // Purchase 4: Product 4 without discount
  const product4 = products.find((p) => p.id === 4);
  if (product4) {
    purchases.push({
      id: purchaseId++,
      productId: product4.id,
      originalPrice: product4.price,
      finalPrice: product4.price,
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-01T09:15:00"),
    });
  }

  // Purchase 5: Product 5 without discount
  const product5 = products.find((p) => p.id === 5);
  if (product5) {
    purchases.push({
      id: purchaseId++,
      productId: product5.id,
      originalPrice: product5.price,
      finalPrice: product5.price,
      purchasedBy: user1,
      purchaseDate: new Date("2025-12-30T11:00:00"),
    });
  }

  // Purchase 6: Product 6 without discount
  const product6 = products.find((p) => p.id === 6);
  if (product6) {
    purchases.push({
      id: purchaseId++,
      productId: product6.id,
      originalPrice: product6.price,
      finalPrice: product6.price,
      purchasedBy: user2,
      purchaseDate: new Date("2025-12-28T13:30:00"),
    });
  }

  // Purchase 7: Product 7 without discount
  const product7 = products.find((p) => p.id === 7);
  if (product7) {
    purchases.push({
      id: purchaseId++,
      productId: product7.id,
      originalPrice: product7.price,
      finalPrice: product7.price,
      purchasedBy: user1,
      purchaseDate: new Date("2025-12-27T10:00:00"),
    });
  }

  // Purchase 8: Product 8 without discount
  const product8 = products.find((p) => p.id === 8);
  if (product8) {
    purchases.push({
      id: purchaseId++,
      productId: product8.id,
      originalPrice: product8.price,
      finalPrice: product8.price,
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-05T08:20:00"),
    });
  }

  // Purchase 9: Product 9 without discount
  const product9 = products.find((p) => p.id === 9);
  if (product9) {
    purchases.push({
      id: purchaseId++,
      productId: product9.id,
      originalPrice: product9.price,
      finalPrice: product9.price,
      purchasedBy: user1,
      purchaseDate: new Date("2026-01-06T12:15:00"),
    });
  }

  // Purchase 10: Product 10 without discount
  const product10 = products.find((p) => p.id === 10);
  if (product10) {
    purchases.push({
      id: purchaseId++,
      productId: product10.id,
      originalPrice: product10.price,
      finalPrice: product10.price,
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-07T15:30:00"),
    });
  }

  // Purchase 11: Product 11
  const product11 = products.find((p) => p.id === 11);
  if (product11) {
    purchases.push({
      id: purchaseId++,
      productId: product11.id,
      originalPrice: product11.price,
      finalPrice: product11.price,
      purchasedBy: user1,
      purchaseDate: new Date("2026-01-08T09:00:00"),
    });
  }

  // Purchase 12: Product 12
  const product12 = products.find((p) => p.id === 12);
  if (product12) {
    purchases.push({
      id: purchaseId++,
      productId: product12.id,
      originalPrice: product12.price,
      finalPrice: product12.price,
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-09T11:20:00"),
    });
  }

  // Purchase 13: Product 13
  const product13 = products.find((p) => p.id === 13);
  if (product13) {
    purchases.push({
      id: purchaseId++,
      productId: product13.id,
      originalPrice: product13.price,
      finalPrice: product13.price,
      purchasedBy: user1,
      purchaseDate: new Date("2026-01-10T14:45:00"),
    });
  }

  // Purchase 14: Product 14
  const product14 = products.find((p) => p.id === 14);
  if (product14) {
    purchases.push({
      id: purchaseId++,
      productId: product14.id,
      originalPrice: product14.price,
      finalPrice: product14.price,
      purchasedBy: user2,
      purchaseDate: new Date("2026-01-11T10:10:00"),
    });
  }

  // Purchase 15: Product 15
  const product15 = products.find((p) => p.id === 15);
  if (product15) {
    purchases.push({
      id: purchaseId++,
      productId: product15.id,
      originalPrice: product15.price,
      finalPrice: product15.price,
      purchasedBy: user1,
      purchaseDate: new Date("2026-01-12T16:30:00"),
    });
  }

  return purchases;
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
