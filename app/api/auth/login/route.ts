import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { createSession } from "@/lib/auth"
import { comparePassword } from "@/lib/auth-server-utils"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const passwordMatch = await comparePassword(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    await createSession(user.id, user.email, user.role)

    return NextResponse.json(
      { message: "Login successful", user: { id: user.id, email: user.email, role: user.role, name: user.name } },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
