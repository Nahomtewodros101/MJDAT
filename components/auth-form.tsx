"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChromeIcon, GithubIcon } from "lucide-react"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message)
      } else {
        setMessage(data.error || "An unexpected error occurred.")
      }
    } catch (error) {
      setMessage("Failed to connect to the server.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialSignIn = (provider: string) => {
    setMessage(`Attempting to sign in with ${provider}... (This is a placeholder action)`)
    // In a real application, you would redirect to the OAuth provider
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <img src="/placeholder.svg?height=64&width=64" alt="v0 logo" className="mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2">Sign in to v0</h1>
        <p className="text-gray-500 mb-8">Sign in to v0 using your Vercel account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Continuing..." : "Continue with Email"}
          </Button>
        </form>

        {message && (
          <p className={`mt-4 text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>{message}</p>
        )}

        <div className="mt-6 space-y-3">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors bg-transparent"
            onClick={() => handleSocialSignIn("Google")}
          >
            <ChromeIcon className="h-5 w-5" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors bg-transparent"
            onClick={() => handleSocialSignIn("GitHub")}
          >
            <GithubIcon className="h-5 w-5" />
            Continue with GitHub
          </Button>
        </div>

        <div className="mt-6 text-sm">
          <Link href="#" className="text-gray-500 hover:underline" prefetch={false}>
            Show other options
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="#" className="text-black hover:underline" prefetch={false}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
