import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    purchasedProducts: number[];
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      purchasedProducts: number[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    purchasedProducts: number[];
  }
}
