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
    const applications = await prisma.jobApplication.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        jobOpening: { select: { id: true, title: true } },
      },
      orderBy: { appliedAt: "desc" },
    })
    return NextResponse.json(applications, { status: 200 })
  } catch (error) {
    console.error("Error fetching job applications:", error)
    return NextResponse.json({ error: "Failed to fetch job applications" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const user = await getAuthUser()
  if (!user || user.role !== Role.ADMIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, status } = await request.json()
    if (!id || !status) {
      return NextResponse.json({ error: "Application ID and status are required" }, { status: 400 })
    }

    const updatedApplication = await prisma.jobApplication.update({
      where: { id },
      data: { status },
    })
    return NextResponse.json(updatedApplication, { status: 200 })
  } catch (error) {
    console.error("Error updating job application status:", error)
    return NextResponse.json({ error: "Failed to update application status" }, { status: 500 })
  }
}
