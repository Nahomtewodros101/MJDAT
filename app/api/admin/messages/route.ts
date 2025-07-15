import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function GET() {
  const user = await getAuthUser()
  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { receivedAt: "desc" },
    })
    return NextResponse.json(messages, { status: 200 })
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return NextResponse.json({ error: "Failed to fetch contact messages" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await getAuthUser()
  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, isRead } = await request.json()
    if (!id || typeof isRead !== "boolean") {
      return NextResponse.json({ error: "Message ID and read status are required" }, { status: 400 })
    }

    const updatedMessage = await prisma.contactMessage.update({
      where: { id },
      data: { isRead },
    })
    return NextResponse.json(updatedMessage, { status: 200 })
  } catch (error) {
    console.error("Error updating contact message:", error)
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const user = await getAuthUser()
  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Message ID is required" }, { status: 400 })
    }

    await prisma.contactMessage.delete({ where: { id } })
    return NextResponse.json({ message: "Message deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting contact message:", error)
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
