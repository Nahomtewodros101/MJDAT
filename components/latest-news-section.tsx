import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import { ArrowRightIcon } from "lucide-react"

export default async function LatestNewsSection() {
  const newsItems = await prisma.newsAnnouncement.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 3, // Limit to 3 news items for the homepage
  })

  return (
    <section className="w-full max-w-6xl mx-auto py-16">
      <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">Latest News & Announcements</h2>
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
                <p className="text-gray-300 line-clamp-3">{news.content}</p>
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
      {newsItems.length > 0 && (
        <div className="text-center mt-12">
          <Link
            href="/news"
            className="inline-flex items-center bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 rounded-md font-medium"
          >
            View All News <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      )}
    </section>
  )
}
