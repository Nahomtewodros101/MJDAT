"use client"
import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Role } from "@prisma/client"

interface User {
  id: string
  name?: string | null
  email: string
  role: Role
  createdAt: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      } else {
        const errorData = await res.json()
        setError(errorData.error || "Failed to fetch users.")
      }
    } catch (err) {
      console.error("Fetch users error:", err)
      setError("An unexpected error occurred while fetching users.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleRoleChange = async (userId: string, newRole: Role) => {
    if (!confirm(`Are you sure you want to change the role of this user to ${newRole}?`)) {
      return
    }
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, role: newRole }),
      })
      if (res.ok) {
        alert("User role updated successfully!")
        fetchUsers() // Re-fetch users to update the list
      } else {
        const errorData = await res.json()
        alert(errorData.error || "Failed to update user role.")
      }
    } catch (err) {
      console.error("Update role error:", err)
      alert("An unexpected error occurred.")
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return
    }
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId }),
      })
      if (res.ok) {
        alert("User deleted successfully!")
        fetchUsers() // Re-fetch users to update the list
      } else {
        const errorData = await res.json()
        alert(errorData.error || "Failed to delete user.")
      }
    } catch (err) {
      console.error("Delete user error:", err)
      alert("An unexpected error occurred.")
    }
  }

  if (loading) return <p className="text-center text-mjdat-green">Loading users...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="text-mjdat-green">
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="text-gray-300">
              <TableCell>{user.name || "N/A"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Select value={user.role} onValueChange={(value: Role) => handleRoleChange(user.id, value)}>
                  <SelectTrigger className="w-[120px] bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent className="bg-mjdat-dark text-mjdat-text-light border-mjdat-green/30">
                    <SelectItem value={Role.USER}>User</SelectItem>
                    <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users.length === 0 && <p className="text-center text-gray-400 mt-4">No users found.</p>}
    </div>
  )
}
