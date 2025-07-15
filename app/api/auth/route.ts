import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Auth API is running" })
}

export async function POST(request: Request) {
  const { email } = await request.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  // Simulate a delay for API processing
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real application, you would handle user authentication/registration here
  // e.g., send a magic link, check credentials, etc.

  console.log(`Attempting to sign in with email: ${email}`)

  return NextResponse.json({ message: `Magic link sent to ${email}. Please check your inbox.` }, { status: 200 })
}
