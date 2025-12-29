import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Get users from localStorage (in production, this would be a database call)
        if (typeof window !== "undefined") {
          const usersJson = localStorage.getItem("autorithm_users");
          const users = usersJson ? JSON.parse(usersJson) : [];

          const user = users.find((u: any) => u.email === credentials.email);

          if (user && user.password === credentials.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              purchasedProducts: user.purchasedProducts || [],
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.purchasedProducts = (user as any).purchasedProducts || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).purchasedProducts = token.purchasedProducts;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
};

export default NextAuth(authOptions);
