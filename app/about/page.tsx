import Header from "@/components/header"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircleIcon, GlobeIcon, HandshakeIcon } from "lucide-react"
import { ArrowLeftIcon } from "@/components/icons/arrow-left-icon"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-mjdat-dark text-mjdat-text-light overflow-hidden">
      <AnimatedBackground />
      <Header />
      <main className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-mjdat-green hover:underline mb-8">
          <ArrowLeftIcon className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">About MJDAt Solutions</h1>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-mjdat-green mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light">
              <CardHeader className="flex flex-col items-center text-center">
                <CheckCircleIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-2xl font-bold">Excellence</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                We strive for perfection in every project, delivering quality that exceeds client expectations.
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light">
              <CardHeader className="flex flex-col items-center text-center">
                <GlobeIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-2xl font-bold">Global Perspective</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                We bring international expertise and cultural understanding to serve clients worldwide effectively.
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light">
              <CardHeader className="flex flex-col items-center text-center">
                <HandshakeIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-2xl font-bold">Commitment</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-300">
                We are dedicated to long-term partnerships and the success of every client we serve.
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-center text-mjdat-green mb-8">Milestones & Achievements</h2>
          <div className="relative border-l-2 border-mjdat-green/50 pl-8 py-4">
            <div className="absolute w-4 h-4 bg-mjdat-green rounded-full -left-2 top-6" />
            <div className="mb-8">
              <h3 className="text-xl font-bold text-mjdat-green">2014</h3>
              <p className="text-gray-300">Company Founded</p>
              <p className="text-sm text-gray-400">
                MJDAt Solutions was established with a vision to transform business operations through innovative BPO
                services.
              </p>
            </div>
            <div className="absolute w-4 h-4 bg-mjdat-green rounded-full -left-2 top-[calc(6rem+24px)]" />{" "}
            {/* Adjust top based on content height */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-mjdat-green">2016</h3>
              <p className="text-gray-300">First 100 Clients</p>
              <p className="text-sm text-gray-400">
                Reached our first major milestone by serving 100+ satisfied clients across various industries.
              </p>
            </div>
            <div className="absolute w-4 h-4 bg-mjdat-green rounded-full -left-2 top-[calc(12rem+48px)]" />{" "}
            {/* Adjust top based on content height */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-mjdat-green">2020</h3>
              <p className="text-gray-300">Expanded Global Offices</p>
              <p className="text-sm text-gray-400">
                Opened new offices in key international markets to better serve our growing global clientele.
              </p>
            </div>
            {/* Add more milestones */}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
