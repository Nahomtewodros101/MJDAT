import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import UserManagement from "@/components/dashboard/user-management";

export default async function ManageUsersPage() {
  const user = await getAuthUser();

  if (!user || user.role !== Role.ADMIN) {
    redirect("/auth/login");
  }

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex-1 py-16 px-4 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-mjdat-green">
          Manage Users
        </h1>
        <UserManagement />
      </main>
      <Footer />
    </div>
  );
}
