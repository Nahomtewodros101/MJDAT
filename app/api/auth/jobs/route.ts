import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getAuthUser } from "@/lib/auth" // Corrected import
import { sendEmail } from "@/lib/mail"

export async function POST(request: Request) {
  const session = await getAuthUser()

  if (!session || session.role !== "ADMIN") {
    // Access role directly from session
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

    // Send email notification to all users about new job (conceptual)
    // In a real app, you'd fetch users and send emails in batches or via a queue
    await sendEmail({
      to: "all_users@mjdat.com", // Placeholder for a mailing list or user group
      subject: `Don't miss out! New Job Opening: ${newJob.title}`,
      html: `<p>A new exciting job opportunity has been posted at MJDAt Solutions!</p><p><strong>${newJob.title}</strong> - ${newJob.location} (${newJob.type})</p><p>${newJob.description.substring(0, 150)}...</p><p>Apply now: <a href="${process.env.NEXT_PUBLIC_APP_URL}/careers">View all jobs</a></p>`,
    })

    return NextResponse.json(newJob, { status: 201 })
  } catch (error) {
    console.error("Error creating job opening:", error)
    return NextResponse.json({ error: "Failed to create job opening" }, { status: 500 })
  }
}

export async function GET() {
  // This GET route can be used by both admin (for management) and public (for listing)
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
