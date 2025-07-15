"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, PlusIcon, EditIcon, TrashIcon } from "lucide-react"
import type { NewsArticle } from "@/types" // Import NewsArticle from shared types

export function NewsManagement() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [formTitle, setFormTitle] = useState("")
  const [formContent, setFormContent] = useState("")
  const [formAuthor, setFormAuthor] = useState("")
  const [formImageUrl, setFormImageUrl] = useState("")
  const [formLoading, setFormLoading] = useState(false)


  const fetchArticles = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/news")
      if (!response.ok) {
        throw new Error("Failed to fetch news articles")
      }
      const data = await response.json()
      setArticles(data)
    } catch (error: any) {
     
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  const handleOpenDialog = (article?: NewsArticle) => {
    if (article) {
      setEditingArticle(article)
      setFormTitle(article.title)
      setFormContent(article.content)
      setFormAuthor(article.author)
      setFormImageUrl(article.imageUrl || "")
    } else {
      setEditingArticle(null)
      setFormTitle("")
      setFormContent("")
      setFormAuthor("")
      setFormImageUrl("")
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingArticle(null)
    setFormTitle("")
    setFormContent("")
    setFormAuthor("")
    setFormImageUrl("")
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    const method = editingArticle ? "PUT" : "POST"
    const url = editingArticle ? `/api/admin/news?id=${editingArticle.id}` : "/api/admin/news"
    const body = { title: formTitle, content: formContent, author: formAuthor, imageUrl: formImageUrl || null }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to ${editingArticle ? "update" : "create"} article.`)
      }

     
      handleCloseDialog()
      fetchArticles() // Refresh the list
    } catch (error: any) {
      
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/news?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete article.")
      }

      
      fetchArticles()
    } catch (error: any) {
     
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>News Management</CardTitle>
          <CardDescription>Create, edit, and delete news articles.</CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Article
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
                <TableHead>Author</TableHead>
                <TableHead>Published At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>{new Date(article.publishedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(article)}>
                      <EditIcon className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteArticle(article.id)}>
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
            <DialogTitle>{editingArticle ? "Edit News Article" : "Create New News Article"}</DialogTitle>
            <CardDescription>
              {editingArticle ? "Update the details for this article." : "Fill in the details to create a new article."}
            </CardDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={formAuthor}
                onChange={(e) => setFormAuthor(e.target.value)}
                required
                disabled={formLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                value={formImageUrl}
                onChange={(e) => setFormImageUrl(e.target.value)}
                placeholder="e.g., https://example.com/image.jpg"
                disabled={formLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                rows={10}
                required
                disabled={formLoading}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={formLoading}>
                {formLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingArticle ? "Save Changes" : "Create Article"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
