"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, EyeIcon, TrashIcon } from "lucide-react"
import type { Message } from "@/types" // Import Message from shared types

export function MessageManagement() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null)
  const [formLoading, setFormLoading] = useState(false)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/messages")
      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }
      const data = await response.json()
      setMessages(data)
    } catch (error: any) {
     
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleOpenDialog = (message: Message) => {
    setViewingMessage(message)
    setIsDialogOpen(true)
    if (!message.read) {
      handleMarkAsRead(message.id, true)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setViewingMessage(null)
  }

  const handleMarkAsRead = async (id: string, readStatus: boolean) => {
    setFormLoading(true)
    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ read: readStatus }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update message status.")
      }

      
      fetchMessages() // Refresh the list
      if (viewingMessage && viewingMessage.id === id) {
        setViewingMessage((prev) => (prev ? { ...prev, read: readStatus } : null))
      }
    } catch (error: any) {
    
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete message.")
      }

      
      fetchMessages()
    } catch (error: any) {
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>View and manage messages submitted through the contact form.</CardDescription>
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
                <TableHead>Read</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Received At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} className={message.read ? "text-muted-foreground" : "font-medium"}>
                  <TableCell>
                    <Checkbox
                      checked={message.read}
                      onCheckedChange={(checked: boolean) => handleMarkAsRead(message.id, checked)}
                      disabled={formLoading}
                    />
                  </TableCell>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.subject || "N/A"}</TableCell>
                  <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(message)}>
                      <EyeIcon className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteMessage(message.id)}>
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
            <DialogTitle>Message Details</DialogTitle>
            <CardDescription>Review the full message content.</CardDescription>
          </DialogHeader>
          {viewingMessage && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">From:</Label>
                <div className="col-span-3 font-medium">
                  {viewingMessage.name} ({viewingMessage.email})
                </div>
              </div>
              {viewingMessage.subject && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Subject:</Label>
                  <div className="col-span-3">{viewingMessage.subject}</div>
                </div>
              )}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Message:</Label>
                <div className="col-span-3 border rounded-md p-3 bg-muted/50 min-h-[150px] whitespace-pre-wrap text-sm">
                  {viewingMessage.message}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Received At:</Label>
                <div className="col-span-3">{new Date(viewingMessage.createdAt).toLocaleString()}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Status:</Label>
                <div className="col-span-3">
                  <Checkbox
                    checked={viewingMessage.read}
                    onCheckedChange={(checked: boolean) => handleMarkAsRead(viewingMessage.id, checked)}
                    disabled={formLoading}
                  />
                  <span className="ml-2 text-sm">{viewingMessage.read ? "Read" : "Unread"}</span>
                </div>
              </div>
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
