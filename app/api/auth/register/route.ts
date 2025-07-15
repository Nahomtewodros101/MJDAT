import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { generateToken, setAuthCookie } from "@/lib/auth"
import { hashPassword } from "@/lib/auth-server-utils" // Import from auth-server-utils
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "USER", // Default role
      },
    })

    const token = await generateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name || undefined,
    })
    setAuthCookie(token)

    // Send welcome email
    await sendEmail({
      to: newUser.email,
      subject: "Welcome to MJDAt Solutions!",
      html: `<p>Hello ${newUser.name},</p><p>Welcome to MJDAt Solutions! We're excited to have you on board.</p><p>You can now explore our services and job openings.</p><p>Best regards,<br/>The MJDAt Team</p>`,
    })

    return NextResponse.json(
      {
        message: "Registration successful",
        user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
