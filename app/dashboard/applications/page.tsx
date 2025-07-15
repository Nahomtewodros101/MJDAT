import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/auth"
import { Role } from "@prisma/client"
import  {ApplicationManagement}  from "@/components/dashboard/application-management"

export default async function ApplicationsPage() {
  const user = await getAuthUser()

  if (!user || user.role !== Role.ADMIN) {
    redirect("/auth/login") // Redirect non-admins
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl mb-8">Job Applications</h1>
      <ApplicationManagement />
    </div>
  )
}
