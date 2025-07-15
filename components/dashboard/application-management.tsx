"use client"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

interface Application {
  id: string
  coverLetter: string
  cvUrl: string
  appliedAt: string
  status: string
  user: {
    id: string
    name?: string | null
    email: string
  }
  jobOpening: {
    id: string
    title: string
  }
}

export default function ApplicationManagement() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchApplications = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/applications")
      if (res.ok) {
        const data = await res.json()
        setApplications(data)
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Failed to fetch applications.")
      }
    } catch (err) {
      console.error("Fetch applications error:", err)
      setError("An unexpected error occurred while fetching applications.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    if (!confirm(`Are you sure you want to change the status of this application to ${newStatus}?`)) {
      return
    }
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: applicationId, status: newStatus }),
      })
      if (res.ok) {
        alert("Application status updated successfully!")
        fetchApplications() // Re-fetch applications to update the list
      } else {
        const errorData = await res.json()
        alert(errorData.error || "Failed to update application status.")
      }
    } catch (err) {
      console.error("Update status error:", err)
      alert("An unexpected error occurred.")
    }
  }

  if (loading) return <p className="text-center text-mjdat-green">Loading applications...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="text-mjdat-green">
            <TableHead>Job Title</TableHead>
            <TableHead>Applicant Email</TableHead>
            <TableHead>CV</TableHead>
            <TableHead>Cover Letter</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id} className="text-gray-300">
              <TableCell>{app.jobOpening.title}</TableCell>
              <TableCell>{app.user.email}</TableCell>
              <TableCell>
                <Link
                  href={app.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mjdat-green hover:underline"
                >
                  View CV
                </Link>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">{app.coverLetter}</TableCell>
              <TableCell>
                <Select value={app.status} onValueChange={(value: string) => handleStatusChange(app.id, value)}>
                  <SelectTrigger className="w-[140px] bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-mjdat-dark text-mjdat-text-light border-mjdat-green/30">
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reviewed">Reviewed</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
              <TableCell>{/* Add more actions like "View Details" if needed */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {applications.length === 0 && <p className="text-center text-gray-400 mt-4">No job applications found.</p>}
    </div>
  )
}
