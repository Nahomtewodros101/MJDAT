import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRightIcon,
  BriefcaseIcon,
  UsersIcon,
  DatabaseIcon,
  DollarSignIcon,
  LightbulbIcon,
  ScaleIcon,
  QuoteIcon,
  HandshakeIcon,
} from "lucide-react"
import prisma from "@/lib/prisma"
import { format } from "date-fns"
import { ModernFrame } from "@/components/modern-frame" // Import the new ModernFrame

export default async function HomePage() {
  const newsItems = await prisma.newsAnnouncement.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 3, // Limit to 3 news items for the homepage
  })

  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto py-20">
          <span className="inline-block px-3 py-1 text-xs font-medium text-mjdat-green border border-mjdat-green rounded-full mb-4">
            Business Process Outsourcing Excellence
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4">
            MJDAt <span className="text-mjdat-green">Solutions</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We aim to optimize operations, reduce costs, and enhance customer satisfaction for our partners. This
            comprehensive 360° solution provides growth and efficiency for logistics carriers and business owners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 flex items-center gap-2">
              Start Your Journey <ArrowRightIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-mjdat-green text-mjdat-green hover:bg-mjdat-green/10 transition-colors text-lg px-8 py-3 flex items-center gap-2 bg-transparent"
            >
              Learn More <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="w-full max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">Our Core Services</h2>
          <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            MJDAt Solutions offers a comprehensive suite of Business Process Outsourcing services designed to streamline
            your operations, reduce costs, and enhance efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <div className="flex flex-col items-center text-center">
              <ModernFrame className="mb-6">
                <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-mjdat-green to-mjdat-light-green text-white">
                  <BriefcaseIcon className="h-16 w-16 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Logistics Support</h3>
                  <p className="text-sm">Efficient management of supply chain and transportation processes.</p>
                </div>
              </ModernFrame>
              <h3 className="text-2xl font-semibold text-mjdat-green">Logistics Support</h3>
              <p className="text-gray-300 text-sm mt-2">Streamline your supply chain with our expert support.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <ModernFrame className="mb-6">
                {" "}
                {/* Removed color="white" as ModernFrame doesn't need it */}
                <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-gray-100 to-gray-200 text-mjdat-dark">
                  <UsersIcon className="h-16 w-16 mb-4 text-mjdat-green" />
                  <h3 className="text-xl font-bold mb-2">Customer Service</h3>
                  <p className="text-sm">Deliver exceptional customer experiences 24/7.</p>
                </div>
              </ModernFrame>
              <h3 className="text-2xl font-semibold text-mjdat-green">Customer Service</h3>
              <p className="text-gray-300 text-sm mt-2">Enhance satisfaction with our dedicated support teams.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <ModernFrame className="mb-6">
                <div className="flex flex-col items-center justify-center h-full p-4 bg-gradient-to-br from-mjdat-green to-mjdat-light-green text-white">
                  <DatabaseIcon className="h-16 w-16 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Data Entry & Processing</h3>
                  <p className="text-sm">Accurate and efficient data management solutions.</p>
                </div>
              </ModernFrame>
              <h3 className="text-2xl font-semibold text-mjdat-green">Data Entry & Processing</h3>
              <p className="text-gray-300 text-sm mt-2">Ensure data integrity and accessibility.</p>
            </div>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 rounded-md font-medium"
          >
            View All Services <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">Why Choose MJDAt Solutions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <DollarSignIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">Cost Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">Reduce operational costs without compromising on quality.</p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <LightbulbIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">Expertise & Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">Leverage our industry-leading knowledge and cutting-edge tech.</p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <ScaleIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">Scalability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Adapt quickly to changing business needs with flexible solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <HandshakeIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">Client-Centric Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">Your success is our priority, with tailored solutions.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6">
              <CardContent className="flex flex-col items-center text-center">
                <QuoteIcon className="h-10 w-10 text-mjdat-green mb-4" />
                <p className="text-lg text-gray-300 italic mb-4">
                  "MJDAt Solutions transformed our logistics operations. Their efficiency and dedication are unmatched.
                  Highly recommended!"
                </p>
                <p className="font-semibold text-mjdat-green">- John Doe, CEO of Logistics Corp</p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6">
              <CardContent className="flex flex-col items-center text-center">
                <QuoteIcon className="h-10 w-10 text-mjdat-green mb-4" />
                <p className="text-lg text-gray-300 italic mb-4">
                  "Their customer service team is exceptional. Our client satisfaction scores have never been higher
                  since partnering with MJDAt."
                </p>
                <p className="font-semibold text-mjdat-green">
                  - Jane Smith, Head of Customer Experience at Retail Co.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Latest News & Announcements Section */}
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
                    <Link
                      href={`/news/${news.id}`}
                      className="text-mjdat-light-green hover:underline text-sm mt-4 block"
                    >
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

        {/* Call to Action Section */}
        <section className="w-full max-w-6xl mx-auto py-16 text-center">
          <h2 className="text-4xl font-bold text-mjdat-green mb-4">Ready to Transform Your Business?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Contact us today for a free consultation and discover how MJDAt Solutions can drive your success.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 rounded-md font-medium"
          >
            Get a Free Consultation <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
