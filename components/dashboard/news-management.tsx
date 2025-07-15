"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusIcon, EditIcon, Trash2Icon } from "lucide-react"
import { format } from "date-fns"

interface NewsAnnouncement {
  id: string
  title: string
  content: string
  imageUrl?: string | null
  publishedAt: string
  isPublished: boolean
}

export default function NewsManagement() {
  const [newsItems, setNewsItems] = useState<NewsAnnouncement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formState, setFormState] = useState<Partial<NewsAnnouncement>>({
    title: "",
    content: "",
    imageUrl: "",
    isPublished: true,
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/news")
      if (res.ok) {
        const data = await res.json()
        setNewsItems(data)
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Failed to fetch news.")
      }
    } catch (err) {
      console.error("Fetch news error:", err)
      setError("An unexpected error occurred while fetching news.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleEditClick = (news: NewsAnnouncement) => {
    setEditingId(news.id)
    setFormState({
      title: news.title,
      content: news.content,
      imageUrl: news.imageUrl || "",
      isPublished: news.isPublished,
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setFormState({ title: "", content: "", imageUrl: "", isPublished: true })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const method = editingId ? "PUT" : "POST"
    const url = editingId ? `/api/admin/news?id=${editingId}` : "/api/admin/news"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, id: editingId }),
      })

      const data = await res.json()

      if (res.ok) {
        alert(`News ${editingId ? "updated" : "created"} successfully!`)
        handleCancelEdit()
        fetchNews()
      } else {
        setError(data.error || `Failed to ${editingId ? "update" : "create"} news.`)
      }
    } catch (err) {
      console.error("News form submission error:", err)
      setError("An unexpected error occurred.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteNews = async (newsId: string) => {
    if (!confirm("Are you sure you want to delete this news announcement? This action cannot be undone.")) {
      return
    }
    try {
      const res = await fetch("/api/admin/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: newsId }),
      })
      if (res.ok) {
        alert("News announcement deleted successfully!")
        fetchNews()
      } else {
        const errorData = await res.json()
        alert(errorData.error || "Failed to delete news.")
      }
    } catch (err) {
      console.error("Delete news error:", err)
      alert("An unexpected error occurred.")
    }
  }

  if (loading) return <p className="text-center text-mjdat-green">Loading news...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="space-y-8">
      <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light">
        <CardHeader>
          <CardTitle className="text-mjdat-green flex items-center gap-2">
            {editingId ? <EditIcon className="h-6 w-6" /> : <PlusIcon className="h-6 w-6" />}
            {editingId ? "Edit News Announcement" : "Create New News Announcement"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="title"
              placeholder="Title"
              value={formState.title || ""}
              onChange={handleChange}
              required
              className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
            />
            <Textarea
              name="content"
              placeholder="Content"
              value={formState.content || ""}
              onChange={handleChange}
              required
              rows={5}
              className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
            />
            <Input
              name="imageUrl"
              placeholder="Image URL (optional)"
              value={formState.imageUrl || ""}
              onChange={handleChange}
              className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPublished"
                name="isPublished"
                checked={formState.isPublished}
                onCheckedChange={(checked: boolean) => setFormState((prev) => ({ ...prev, isPublished: checked }))}
                className="border-mjdat-green/50 data-[state=checked]:bg-mjdat-green data-[state=checked]:text-mjdat-dark"
              />
              <label
                htmlFor="isPublished"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Publish immediately
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (editingId ? "Updating..." : "Creating...") : editingId ? "Update News" : "Add News"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="border-mjdat-green text-mjdat-green hover:bg-mjdat-green/10 bg-transparent"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-3xl font-semibold mb-6 text-mjdat-green">All News & Announcements</h2>
      <div className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 shadow-lg">
        <Table>
          <TableHeader>
            <TableRow className="text-mjdat-green">
              <TableHead>Title</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsItems.map((news) => (
              <TableRow key={news.id} className="text-gray-300">
                <TableCell className="font-medium">{news.title}</TableCell>
                <TableCell>{news.isPublished ? "Yes" : "No"}</TableCell>
                <TableCell>{format(news.publishedAt, "PPP")}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditClick(news)}>
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteNews(news.id)}>
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {newsItems.length === 0 && <p className="text-center text-gray-400 mt-4">No news announcements found.</p>}
      </div>
    </div>
  )
}
