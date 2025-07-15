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
    const { title, description, location, type, salary } = await request.json()

    if (!title || !description || !location || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newJob = await prisma.jobOpening.create({
      data: {
        title,
        description,
        location,
        type,
        salary,
      },
    })

    // Send email notification to all users about new job
    const allUsers = await prisma.user.findMany({ select: { email: true } })
    const userEmails = allUsers.map((u) => u.email)

    if (userEmails.length > 0) {
      await sendEmail({
        to: userEmails,
        subject: `Don't miss out! New Job Opening: ${newJob.title}`,
        html: `<p>A new exciting job opportunity has been posted at MJDAt Solutions!</p><p><strong>${newJob.title}</strong> - ${newJob.location} (${newJob.type})</p><p>${newJob.description.substring(0, 150)}...</p><p>Apply now: <a href="${process.env.NEXT_PUBLIC_APP_URL}/careers">View all jobs</a></p>`,
      })
    }

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    console.error("Error creating job opening:", error)
    return NextResponse.json({ error: "Failed to create job opening" }, { status: 500 })
  }
}

export async function GET() {
  // This GET route can be used by both admin (for management) and public (for listing)
  // Admin check is done in middleware for /api/admin/* routes, but this is also public
  try {
    const jobs = await prisma.jobOpening.findMany({
      orderBy: { postedAt: "desc" },
    })
    return NextResponse.json(jobs, { status: 200 })
  } catch (error) {
    console.error("Error fetching job openings:", error)
    return NextResponse.json({ error: "Failed to fetch job openings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await getAuthUser()
  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, title, description, location, type, salary } = await request.json()
    if (!id || !title || !description || !location || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const updatedJob = await prisma.jobOpening.update({
      where: { id },
      data: { title, description, location, type, salary },
    })
    return NextResponse.json(updatedJob, { status: 200 })
  } catch (error) {
    console.error("Error updating job opening:", error)
    return NextResponse.json({ error: "Failed to update job opening" }, { status: 500 })
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
      return NextResponse.json({ error: "Job ID is required" }, { status: 400 })
    }

    await prisma.jobOpening.delete({ where: { id } })
    return NextResponse.json({ message: "Job opening deleted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error deleting job opening:", error)
    return NextResponse.json({ error: "Failed to delete job opening" }, { status: 500 })
  }
}
