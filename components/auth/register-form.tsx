"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context" // Import custom auth hook
import Image from "next/image"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [company, setCompany] = useState("") // New field
  const [phone, setPhone] = useState("") // New field
  const [error, setError] = useState<string | null>(null)
  const { register, isLoading } = useAuth() // Use custom auth hook

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    // Note: The backend API for register currently only accepts name, email, password.
    // Company and phone would need to be added to the User model and the API route
    // if you wish to persist them. For now, they are collected in the UI.
    const success = await register(name, email, password, confirmPassword)
    if (!success) {
      setError("Registration failed. Please check your details.")
    }
  }

  return (
    <div className="w-full max-w-md bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-8 shadow-lg text-center">
      <Image src="/MJDAT/MJDAT9.png" alt="MJDAt Solutions Logo" className="mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-2 text-mjdat-green">Register</h1>
      <p className="text-gray-300 mb-8">Create your MJDAt Solutions account.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Confirm Password *"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Company (Optional)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        <div>
          <Input
            type="tel"
            placeholder="Phone Number (Optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-mjdat-dark border-mjdat-green/30 text-mjdat-text-light placeholder:text-gray-500 focus:ring-mjdat-green"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          className="w-full bg-mjdat-green text-mjdat-dark py-2 rounded-md hover:bg-mjdat-light-green transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </form>

      <div className="mt-8 text-sm text-gray-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-mjdat-green hover:underline" prefetch={false}>
          Sign In
        </Link>
      </div>
    </div>
  )
}
