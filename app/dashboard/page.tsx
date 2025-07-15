"use client" // This page needs to be client-side to use useAuth
import { useEffect } from "react"
import { redirect } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context" // Import custom auth hook
import { BriefcaseIcon, UsersIcon, MailIcon, NewspaperIcon, ArrowRightIcon } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      redirect("/auth/login")
    }
  }, [user, isLoading])

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
        <AnimatedBackground />
        <Header />
        <main className="relative z-10 flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mjdat-green" />
            <p className="text-xl text-mjdat-green">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isAdmin = user?.role === "ADMIN"

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex-1 py-16 px-4 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-mjdat-green">
          {isAdmin ? "Admin Dashboard" : "User Dashboard"}
        </h1>

        {isAdmin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/dashboard/jobs"
              className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center hover:bg-mjdat-green/10 transition-colors shadow-lg"
            >
              <BriefcaseIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Manage Job Openings</h2>
              <p className="text-gray-300 text-sm mt-2">Create, edit, and delete job listings.</p>
            </Link>
            <Link
              href="/dashboard/users"
              className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center hover:bg-mjdat-green/10 transition-colors shadow-lg"
            >
              <UsersIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Manage Users</h2>
              <p className="text-gray-300 text-sm mt-2">View and manage user accounts and roles.</p>
            </Link>
            <Link
              href="/dashboard/messages"
              className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center hover:bg-mjdat-green/10 transition-colors shadow-lg"
            >
              <MailIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Manage Contact Messages</h2>
              <p className="text-gray-300 text-sm mt-2">Review and respond to customer inquiries.</p>
            </Link>
            <Link
              href="/dashboard/news"
              className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center hover:bg-mjdat-green/10 transition-colors shadow-lg"
            >
              <NewspaperIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Manage News & Announcements</h2>
              <p className="text-gray-300 text-sm mt-2">Publish and update company news.</p>
            </Link>
            <Link
              href="/dashboard/applications"
              className="bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 text-center hover:bg-mjdat-green/10 transition-colors shadow-lg"
            >
              <BriefcaseIcon className="h-12 w-12 text-mjdat-green mx-auto mb-4" />
              <h2 className="text-xl font-semibold">Manage Job Applications</h2>
              <p className="text-gray-300 text-sm mt-2">Review and manage submitted job applications.</p>
            </Link>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <p className="text-xl text-gray-300">Welcome, {user?.name || user?.email}!</p>
            <p className="text-lg text-gray-400">Explore job openings, submit applications, and manage your profile.</p>
            <Link
              href="/careers"
              className="inline-flex items-center bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 rounded-md font-medium"
            >
              View Job Openings <ArrowRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
