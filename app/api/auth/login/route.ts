import { NextResponse } from "next/server"
import { comparePassword, generateToken, setAuthCookie } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = generateToken({ id: user.id, email: user.email, role: user.role })
    setAuthCookie(token)

    // Send login notification email
    await sendEmail({
      to: user.email,
      subject: "Successful Login to MJDAt Solutions",
      html: `<p>Hello ${user.name || user.email},</p><p>You have successfully logged in to your MJDAt Solutions account.</p><p>If this wasn't you, please contact support immediately.</p>`,
    })

    return NextResponse.json(
      { message: "Login successful", user: { id: user.id, email: user.email, role: user.role } },
      { status: 200 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
