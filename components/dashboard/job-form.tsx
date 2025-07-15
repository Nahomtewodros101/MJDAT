"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function JobForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("")
  const [salary, setSalary] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, location, type, salary }),
      })

      const data = await response.json()

      if (response.ok) {
        alert("Job opening created successfully!")
        setTitle("")
        setDescription("")
        setLocation("")
        setType("")
        setSalary("")
        router.refresh() // Revalidate data on the page
      } else {
        setError(data.error || "Failed to create job opening.")
      }
    } catch (err) {
      console.error("Create job error:", err)
      setError("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light mb-8">
      <CardHeader>
        <CardTitle className="text-mjdat-green flex items-center gap-2">
          <PlusIcon className="h-6 w-6" /> Create New Job Opening
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
          <Textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
            />
            <Select onValueChange={setType} value={type} required>
              <SelectTrigger className="w-full bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent className="bg-mjdat-dark text-mjdat-text-light border-mjdat-green/30">
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Input
            placeholder="Salary (e.g., $50,000 - $70,000)"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Add Job Opening"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
