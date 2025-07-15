import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import JobApplicationForm from "@/components/job-application-form"

export default async function CareersPage() {
  const jobs = await prisma.jobOpening.findMany({
    orderBy: { postedAt: "desc" },
  })

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Careers at MJDAt Solutions</h1>

        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Join our dynamic team and contribute to a company that's redefining business process outsourcing. We offer
          exciting opportunities for growth, innovation, and impact.
        </p>

        <h2 className="text-3xl font-semibold text-mjdat-green mb-8 text-center">Current Job Openings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Card key={job.id} className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light">
                <CardHeader>
                  <CardTitle className="text-mjdat-green">{job.title}</CardTitle>
                  <p className="text-sm text-gray-400">
                    {job.location} - {job.type} {job.salary && `(${job.salary})`}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-4">{job.description}</p>
                  <JobApplicationForm jobId={job.id} />
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No job openings available at the moment. Please check back later!
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
