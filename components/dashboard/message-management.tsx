"use client"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, Trash2Icon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  serviceInterest?: string | null
  subject: string
  message: string
  receivedAt: string
  isRead: boolean
}

export default function MessageManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/messages")
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Failed to fetch messages.")
      }
    } catch (err) {
      console.error("Fetch messages error:", err)
      setError("An unexpected error occurred while fetching messages.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const handleMarkAsRead = async (messageId: string, isRead: boolean) => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId, isRead }),
      })
      if (res.ok) {
        fetchMessages() // Re-fetch messages to update the list
      } else {
        const errorData = await res.json()
        alert(errorData.error || "Failed to update message status.")
      }
    } catch (err) {
      console.error("Update message status error:", err)
      alert("An unexpected error occurred.")
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
      return
    }
    try {
      const res = await fetch("/api/admin/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageId }),
      })
      if (res.ok) {
        alert("Message deleted successfully!")
        fetchMessages() // Re-fetch messages to update the list
      } else {
        const errorData = await res.json()
        alert(errorData.error || "Failed to delete message.")
      }
    } catch (err) {
      console.error("Delete message error:", err)
      alert("An unexpected error occurred.")
    }
  }

  if (loading) return <p className="text-center text-mjdat-green">Loading messages...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="text-mjdat-green">
            <TableHead>Read</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Received At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {messages.map((msg) => (
            <TableRow key={msg.id} className={msg.isRead ? "text-gray-500" : "text-gray-300 font-medium"}>
              <TableCell>
                <Checkbox
                  checked={msg.isRead}
                  onCheckedChange={(checked: boolean) => handleMarkAsRead(msg.id, checked)}
                />
              </TableCell>
              <TableCell>{msg.name}</TableCell>
              <TableCell>{msg.email}</TableCell>
              <TableCell className="max-w-[200px] truncate">{msg.subject}</TableCell>
              <TableCell>{new Date(msg.receivedAt).toLocaleDateString()}</TableCell>
              <TableCell className="flex gap-2">
                <Dialog onOpenChange={(open: boolean) => !open && setSelectedMessage(null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => setSelectedMessage(msg)}>
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  {selectedMessage && (
                    <DialogContent className="bg-mjdat-dark text-mjdat-text-light border-mjdat-green/20">
                      <DialogHeader>
                        <DialogTitle className="text-mjdat-green">Message from {selectedMessage.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Email:</strong> {selectedMessage.email}
                        </p>
                        {selectedMessage.phone && (
                          <p>
                            <strong>Phone:</strong> {selectedMessage.phone}
                          </p>
                        )}
                        {selectedMessage.company && (
                          <p>
                            <strong>Company:</strong> {selectedMessage.company}
                          </p>
                        )}
                        {selectedMessage.serviceInterest && (
                          <p>
                            <strong>Service Interest:</strong> {selectedMessage.serviceInterest}
                          </p>
                        )}
                        <p>
                          <strong>Subject:</strong> {selectedMessage.subject}
                        </p>
                        <p>
                          <strong>Message:</strong>
                        </p>
                        <p className="whitespace-pre-wrap border border-mjdat-green/10 p-3 rounded-md bg-mjdat-dark/30">
                          {selectedMessage.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          Received: {new Date(selectedMessage.receivedAt).toLocaleString()}
                        </p>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteMessage(msg.id)}>
                  <Trash2Icon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {messages.length === 0 && <p className="text-center text-gray-400 mt-4">No contact messages found.</p>}
    </div>
  )
}
