"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, EyeIcon, TrashIcon, DownloadIcon } from "lucide-react"
import type { Application } from "@/types" // Import Application from shared types

export function ApplicationManagement() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewingApplication, setViewingApplication] = useState<Application | null>(null)
  const [formStatus, setFormStatus] = useState("")
  const [formLoading, setFormLoading] = useState(false)

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/applications")
      if (!response.ok) {
        throw new Error("Failed to fetch applications")
      }
      const data = await response.json()
      setApplications(data)
    } catch (error: any) {
      
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleOpenDialog = (application: Application) => {
    setViewingApplication(application)
    setFormStatus(application.status)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setViewingApplication(null)
    setFormStatus("")
  }

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!viewingApplication) return

    setFormLoading(true)
    try {
      const response = await fetch(`/api/admin/applications?id=${viewingApplication.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: formStatus }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update application status.")
      }

      
      handleCloseDialog()
      fetchApplications() // Refresh the list
    } catch (error: any) {
      
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/applications?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete application.")
      }

     
      fetchApplications()
    } catch (error: any) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Management</CardTitle>
        <CardDescription>Review and manage all submitted job applications.</CardDescription>
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
                <TableHead>Job Title</TableHead>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Applicant Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.jobOpening.title}</TableCell>
                  <TableCell>{app.user.name}</TableCell>
                  <TableCell>{app.user.email}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>{new Date(app.appliedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(app)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View/Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteApplication(app.id)}>
                      <TrashIcon className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <CardDescription>Review and update the status of this application.</CardDescription>
          </DialogHeader>
          {viewingApplication && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Job Title:</Label>
                <div className="col-span-3 font-medium">{viewingApplication.jobOpening.title}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Applicant Name:</Label>
                <div className="col-span-3">{viewingApplication.user.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Applicant Email:</Label>
                <div className="col-span-3">{viewingApplication.user.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Applied At:</Label>
                <div className="col-span-3">{new Date(viewingApplication.appliedAt).toLocaleString()}</div>
              </div>
              {viewingApplication.resumeUrl && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Resume:</Label>
                  <div className="col-span-3">
                    <Button asChild variant="outline" size="sm">
                      <a href={viewingApplication.resumeUrl} target="_blank" rel="noopener noreferrer">
                        <DownloadIcon className="mr-2 h-4 w-4" /> Download Resume
                      </a>
                    </Button>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Cover Letter:</Label>
                <div className="col-span-3 border rounded-md p-3 bg-muted/50 min-h-[100px] whitespace-pre-wrap text-sm">
                  {viewingApplication.coverLetter || "No cover letter provided."}
                </div>
              </div>
              <form onSubmit={handleUpdateStatus} className="grid grid-cols-4 items-center gap-4 mt-4">
                <Label htmlFor="status" className="text-right">
                  Status:
                </Label>
                <div className="col-span-3 flex items-center gap-2">
                  <Select value={formStatus} onValueChange={setFormStatus} disabled={formLoading}>
                    <SelectTrigger id="status" className="w-[180px]">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Reviewed">Reviewed</SelectItem>
                      <SelectItem value="Interview">Interview</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Hired">Hired</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" size="sm" disabled={formLoading}>
                    {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Update
                  </Button>
                </div>
              </form>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
