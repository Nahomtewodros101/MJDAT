import nodemailer from "nodemailer"

interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function sendEmail(options: EmailOptions) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Sender address
      to: options.to, // List of recipients
      subject: options.subject, // Subject line
      html: options.html, // HTML body
      text: options.text || "", // Plain text body
    })
    console.log(`Email sent successfully to ${options.to}`)
  } catch (error) {
    console.error(`Failed to send email to ${options.to}:`, error)
    // In a production app, you might log this error to a monitoring service
  }
}
