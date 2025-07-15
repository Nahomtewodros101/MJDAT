import { SignJWT, jwtVerify, type JWTPayload } from "jose"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import prisma from "./prisma"

// For better security, you should store this in environment variables
const secretKey = process.env.JWT_SECRET || "supersecretjwtkey" // Changed to JWT_SECRET
const key = new TextEncoder().encode(secretKey)

export interface UserPayload extends JWTPayload {
  id: string
  email: string
  role: "USER" | "ADMIN"
  name?: string
}

export async function encrypt(payload: UserPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h") // Token expires in 2 hours
    .sign(key)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    })
    return payload as UserPayload
  } catch (error) {
    console.error("Token verification failed:", error)
    return null
  }
}

export async function createSession(userId: string, email: string, role: "USER" | "ADMIN") {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
  const session = await encrypt({ id: userId, email, role, exp: expiresAt.getTime() / 1000 })

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  cookies().set("session", "", { expires: new Date(0) })
}

export async function getAuthUser(): Promise<UserPayload | null> {
  const session = cookies().get("session")?.value
  if (!session) {
    return null
  }
  const decoded = await decrypt(session)
  if (!decoded || !decoded.id || !decoded.email || !decoded.role) {
    return null
  }

  // Fetch user from DB to ensure the session is still valid and get the latest user data
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, email: true, role: true, name: true }, // Include name
  })

  if (!user) {
    // If user not found in DB, clear session
    await deleteSession()
    return null
  }

  // Return a new object with properties from the database user,
  // ensuring consistency and avoiding duplicate property issues.
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name || undefined, // Ensure name is string | undefined
  }
}

export async function authMiddleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  const user = await decrypt(session)
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Optionally, revalidate user from DB to ensure session is still valid (e.g., user role hasn't changed)
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, email: true, role: true },
  })

  if (!dbUser) {
    // If user not found in DB, clear session and redirect
    await deleteSession()
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // You can attach the user to the request if needed for subsequent handlers
  // For example, by setting a header or using a custom context (more complex for Next.js middleware)
  // For now, we just ensure they are authenticated.
  return NextResponse.next()
}
