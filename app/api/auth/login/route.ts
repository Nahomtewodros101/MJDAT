import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { generateToken, setAuthCookie } from "@/lib/auth"
import { comparePassword } from "@/lib/auth-server-utils" // Import from auth-server-utils

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await generateToken({ id: user.id, email: user.email, role: user.role, name: user.name || undefined })
    setAuthCookie(token)

    return NextResponse.json(
      { message: "Login successful", user: { id: user.id, email: user.email, name: user.name, role: user.role } },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
