import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { Role } from "@prisma/client";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  // Await the result of verifyToken as it's an async function
  const user = token ? await verifyToken(token) : null;

  const protectedRoutes = ["/dashboard", "/api/admin"];
  const isAdminRoute = request.nextUrl.pathname.startsWith("/api/admin");
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboardRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAdminRoute && (!user || user.role !== Role.ADMIN)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
};
