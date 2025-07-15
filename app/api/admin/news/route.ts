import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth"
import { Role } from "@prisma/client"
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  const user = await getAuthUser()
  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, content, imageUrl, isPublished } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    const newNews = await prisma.newsAnnouncement.create({
      data: {
        title,
        content,
        imageUrl,
        isPublished: isPublished ?? true,
      },
    })

    // Send email notification to all users about new news
    if (newNews.isPublished) {
      const allUsers = await prisma.user.findMany({ select: { email: true } })
      const userEmails = allUsers.map((u) => u.email)

      if (userEmails.length > 0) {
        await sendEmail({
          to: userEmails,
          subject: `New Announcement from MJDAt Solutions: ${newNews.title}`,
          html: `<p>Check out our latest news!</p><p><strong>${newNews.title}</strong></p><p>${newNews.content.substring(0, 150)}...</p><p>Read more: <a href="${process.env.NEXT_PUBLIC_APP_URL}/news">Visit News Page</a></p>`,
        })
      }
    }

    return NextResponse.json(newNews, { status: 201 })
  } catch (error) {
    console.error("Error creating news announcement:", error)
    return NextResponse.json({ error: "Failed to create news announcement" }, { status: 500 })
  }
}

export async function GET() {
  // This GET route can be used by both admin (for management) and public (for listing)
  try {
    const newsItems = await prisma.newsAnnouncement.findMany({
      orderBy: { publishedAt: "desc" },
    })
    return NextResponse.json(newsItems, { status: 200 })
  } catch (error) {
    console.error("Error fetching news announcements:", error)
    return NextResponse.json({ error: "Failed to fetch news announcements" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await getAuthUser()
  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, title, content, imageUrl, isPublished } = await request.json()
    if (!id || !title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updatedNews = await prisma.newsAnnouncement.update({
      where: { id },
      data: { title, content, imageUrl, isPublished },
    })
    return NextResponse.json(updatedNews, { status: 200 })
  } catch (error) {
    console.error("Error updating news announcement:", error)
    return NextResponse.json({ error: "Failed to update news announcement" }, { status: 500 })
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
      return NextResponse.json({ error: "News ID is required" }, { status: 400 })
    }

    await prisma.newsAnnouncement.delete({ where: { id } })
    return NextResponse.json({ message: "News announcement deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting news announcement:", error)
    return NextResponse.json({ error: "Failed to delete news announcement" }, { status: 500 })
  }
}
