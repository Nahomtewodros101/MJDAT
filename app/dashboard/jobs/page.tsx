"use client"

import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { Role } from "@prisma/client"
import { JobOpeningsTableClient } from "@/components/dashboard/job-openings-table-client" // Import the new client component
import type { JobOpening } from "@/types"

export default async function JobsPage() {
  const user = await getAuthUser()

  if (!user || user.role !== Role.ADMIN) {
    redirect("/auth/login")
  }

  let initialJobs: JobOpening[] = []
  try {
    // Fetch initial jobs on the server
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/jobs`, {
      cache: "no-store", // Ensure fresh data on every request
    })
    if (!response.ok) {
      // If fetching fails, throw an error to be caught by error.tsx [^1]
      throw new Error("Failed to fetch initial job openings")
    }
    initialJobs = await response.json()
  } catch (error) {
    console.error("Error fetching initial jobs:", error)
    // You might want to handle this more gracefully, e.g., pass an error state to the client component
    // For now, we'll proceed with an empty array if fetching fails.
    initialJobs = []
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-8">Manage Job Openings</h1>
      {/* Pass the fetched initialJobs to the client component */}
      <JobOpeningsTableClient initialJobs={initialJobs} />
    </div>
  )
}
