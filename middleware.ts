import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { decrypt } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value
  const user = token ? await decrypt(token) : null // Await the promise

  // Attach user to request for API routes and server components
  // This is a simplified approach; in a real app, you might use a custom header or context
  // For server components, `getAuthUser()` is used directly.
  // For API routes, you'd typically re-verify the token or pass user info.
  const protectedRoutes = ["/dashboard", "/api/admin"]
  const isAdminRoute = request.nextUrl.pathname.startsWith("/api/admin")
  const isDashboardRoute = request.nextUrl.pathname.startsWith("/dashboard")

  if (isDashboardRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (isAdminRoute && (!user || user.role !== Role.ADMIN)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/admin/:path*"],
}
