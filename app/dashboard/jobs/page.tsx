"use client"

import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { Role } from "@prisma/client"
import { JobForm } from "@/components/dashboard/job-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { PlusIcon, EditIcon, TrashIcon, Loader2 } from "lucide-react"
import { useState } from "react"
import type { JobOpening } from "@/types" // Import JobOpening from shared types

export default async function JobsPage() {
  const user = await getAuthUser()

  if (!user || user.role !== Role.ADMIN) {
    redirect("/auth/login")
  }

  let initialJobs: JobOpening[] = []
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/jobs`, {
      cache: "no-store",
    })
    if (!response.ok) {
      throw new Error("Failed to fetch initial job openings")
    }
    initialJobs = await response.json()
  } catch (error) {
    console.error("Error fetching initial jobs:", error)
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-8">Manage Job Openings</h1>
      <JobOpeningsTable initialJobs={initialJobs} />
    </div>
  )
}

function JobOpeningsTable({ initialJobs }: { initialJobs: JobOpening[] }) {
  const [jobs, setJobs] = useState<JobOpening[]>(initialJobs)
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/jobs")
      if (!response.ok) {
        throw new Error("Failed to fetch job openings")
      }
      const data = await response.json()
      setJobs(data)
    } catch (error: any) {
     
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (job?: JobOpening) => {
    setEditingJob(job || null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingJob(null)
    fetchJobs()
  }

  const handleDeleteJob = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/jobs?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete job opening.")
      }

      
      fetchJobs()
    } catch (error: any) {
     
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Job Openings</CardTitle>
          <CardDescription>Manage all job listings on the platform.</CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Job
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead>Posted At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500">
                    No job openings found.
                  </TableCell>
                </TableRow>
              ) : (
                jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell>{job.salary || "N/A"}</TableCell>
                    <TableCell>{new Date(job.postedAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(job)}>
                        <EditIcon className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteJob(job.id)}>
                        <TrashIcon className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job Opening" : "Create New Job Opening"}</DialogTitle>
          </DialogHeader>
          <JobForm initialData={editingJob || undefined} onSuccess={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </Card>
  )
}
