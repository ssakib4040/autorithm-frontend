export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  purchasedProducts: number[];
  wishlist?: Array<string | number>;
}
