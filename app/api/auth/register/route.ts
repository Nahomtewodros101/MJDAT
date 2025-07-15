import { NextResponse } from "next/server"
import { generateToken, setAuthCookie } from "@/lib/auth"
import { hashPassword } from "@/lib/auth-server-utils"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // Default role for new registrations
      },
    })

    const token = await generateToken({ id: newUser.id, email: newUser.email, role: newUser.role })
    setAuthCookie(token)

    // Send registration confirmation email
    await sendEmail({
      to: newUser.email,
      subject: "Welcome to MJDAt Solutions!",
      html: `<p>Hello ${newUser.name || newUser.email},</p><p>Welcome to MJDAt Solutions! Your account has been successfully created.</p><p>You are now logged in.</p>`,
    })

    return NextResponse.json(
      { message: "Registration successful", user: { id: newUser.id, email: newUser.email, role: newUser.role } },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
