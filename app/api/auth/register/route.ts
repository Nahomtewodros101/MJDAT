import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { createSession } from "@/lib/auth"
import { hashPassword } from "@/lib/auth-server-utils"
import { sendEmail } from "@/lib/mail"
import { Role } from "@prisma/client"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
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
        password: passwordHash,
        role: Role.USER, // Default role for new registrations
      },
    })

    await createSession(newUser.id, newUser.email, newUser.role)

    // Send welcome email
    await sendEmail({
      to: newUser.email,
      subject: "Welcome to MJDAt Solutions!",
      html: `<p>Hello ${newUser.name},</p><p>Welcome to MJDAt Solutions! We're excited to have you on board.</p><p>You can now explore our platform and find exciting job opportunities.</p><p>Best regards,<br/>The MJDAt Solutions Team</p>`,
    })

    return NextResponse.json(
      {
        message: "Registration successful",
        user: { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
