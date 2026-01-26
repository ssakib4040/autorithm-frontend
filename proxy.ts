import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if route requires admin access
    const isAdminRoute = path.startsWith("/admin");

    if (isAdminRoute && !token?.isAdmin) {
      // Redirect non-admin users trying to access admin routes
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Allow all API routes to pass through (handle auth in API endpoints)
        if (path.startsWith("/api")) {
          return true;
        }

        // Protected routes that require authentication
        const protectedRoutes = ["/profile", "/admin"];

        const isProtectedRoute = protectedRoutes.some(
          (route) => path === route || path.startsWith(`${route}/`),
        );

        // If it's a protected route, require authentication
        if (isProtectedRoute) {
          return !!token;
        }

        // All other routes are public by default
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  },
);

// Specify which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)",
  ],
};
