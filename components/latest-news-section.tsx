import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types"; // Import NewsArticle from shared types

async function getLatestNews(): Promise<NewsArticle[]> {
  // In a real application, you might fetch this from an external CMS or your own API.
  // For this example, we'll fetch from our own API route.
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/admin/news`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch news articles");
  }

  return res.json();
}

export async function LatestNewsSection() {
  const newsArticles = await getLatestNews();

  if (newsArticles.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No news articles available at the moment. Please check back later!
      </div>
    );
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Latest News
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Stay up-to-date with the latest from MJDAt Solutions.
            </p>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <Card key={article.id} className="flex flex-col overflow-hidden">
              {article.imageUrl && (
                <Image
                  alt={article.title}
                  className="aspect-video w-full object-cover"
                  height={225}
                  src={article.imageUrl || "/placeholder.svg"}
                  width={400}
                />
              )}
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                  By {article.author} |{" "}
                  {new Date(article.publishedAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                  {article.content}
                </p>
                <Link
                  className="text-blue-600 hover:underline text-sm mt-2 inline-block dark:text-blue-400"
                  href={`/news/${article.id}`}
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
