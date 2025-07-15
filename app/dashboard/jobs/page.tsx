import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import JobForm from "@/components/dashboard/job-form";
import prisma from "@/lib/prisma";

export default async function ManageJobsPage() {
  const user = await getAuthUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/auth/login"); // Redirect non-admins
  }

  const jobs = await prisma.jobOpening.findMany({
    orderBy: { postedAt: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex-1 py-16 px-4 max-w-6xl mx-auto w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-mjdat-green">
          Manage Job Openings
        </h1>

        <div className="mb-8">
          <JobForm />
        </div>

        <h2 className="text-3xl font-semibold mb-6 text-mjdat-green">
          Current Job Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light"
            >
              <CardHeader>
                <CardTitle className="text-mjdat-green">{job.title}</CardTitle>
                <p className="text-sm text-gray-400">
                  {job.location} - {job.type}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 line-clamp-3">{job.description}</p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="border-mjdat-green text-mjdat-green hover:bg-mjdat-green/10 bg-transparent"
                  >
                    Edit
                  </Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {jobs.length === 0 && (
            <p className="text-gray-400 col-span-full text-center">
              No job openings found.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
