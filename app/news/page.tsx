import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { format } from "date-fns"

export default async function NewsPage() {
  const newsItems = await prisma.newsAnnouncement.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  })

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden flex flex-col">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">Latest News & Announcements</h1>

        <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
          Stay up-to-date with the latest developments, insights, and exciting news from MJDAt Solutions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.length > 0 ? (
            newsItems.map((news) => (
              <Card key={news.id} className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light">
                <CardHeader>
                  {news.imageUrl && (
                    <img
                      src={news.imageUrl || "/placeholder.svg"}
                      alt={news.title}
                      className="rounded-md mb-4 w-full h-48 object-cover"
                    />
                  )}
                  <CardTitle className="text-mjdat-green">{news.title}</CardTitle>
                  <p className="text-sm text-gray-400">Published: {format(news.publishedAt, "PPP")}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 line-clamp-4">{news.content}</p>
                  {/* In a real app, you'd have a dedicated news detail page */}
                  <Link href={`/news/${news.id}`} className="text-mjdat-light-green hover:underline text-sm mt-4 block">
                    Read More &rarr;
                  </Link>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No news or announcements at the moment.</p>
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
