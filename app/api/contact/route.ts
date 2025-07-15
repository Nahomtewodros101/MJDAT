import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, phone, company, serviceInterest, subject, message } = await request.json()

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newContactMessage = await prisma.contactMessage.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        company,
        serviceInterest,
        subject,
        message,
      },
    })

    // Send confirmation email to user
    await sendEmail({
      to: newContactMessage.email,
      subject: "Thank you for your inquiry to MJDAt Solutions",
      html: `<p>Dear ${newContactMessage.name},</p><p>Thank you for contacting MJDAt Solutions. We have received your message and will get back to you shortly.</p><p>Subject: ${newContactMessage.subject}</p><p>Message: ${newContactMessage.message}</p>`,
    })

    // Send notification email to admin (replace with actual admin email)
    await sendEmail({
      to: "admin@mjdat.com", // Replace with actual admin email
      subject: `New Contact Message: ${newContactMessage.subject}`,
      html: `<p>New message from ${newContactMessage.name} (${newContactMessage.email}):</p><p>${newContactMessage.message}</p>`,
    })

    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 })
  } catch (error) {
    console.error("Error submitting contact message:", error)
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 })
  }
}
