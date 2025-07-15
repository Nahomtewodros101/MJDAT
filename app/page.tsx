"use client";
import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import AnimatedBackground from "@/components/animated-background";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  ZapIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "lucide-react";
import { Suspense } from "react";
import LatestNewsSection from "@/components/latest-news-section";
import { InteractiveServiceCard } from "@/components/interactive-service-card"; // New import

export default function HomePage() {
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
            We aim to optimize operations, reduce costs, and enhance customer
            satisfaction for our partners. This comprehensive 360° solution
            provides growth and efficiency for logistics carriers and business
            owners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 flex items-center gap-2">
              <Link href="/auth/login">Start Your Journey</Link>{" "}
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="border-mjdat-green text-mjdat-green hover:bg-mjdat-green/10 transition-colors text-lg px-8 py-3 flex items-center gap-2 bg-transparent"
            >
              <Link href="/about">Learn More</Link>{" "}
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="w-full max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">
            Our Core Services
          </h2>
          <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            MJDAt Solutions offers a comprehensive suite of Business Process
            Outsourcing services designed to streamline your operations, reduce
            costs, and enhance efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
            <InteractiveServiceCard
              icon={BriefcaseIcon}
              title="Logistics Support"
              description="Efficient management of supply chain and transportation processes."
              href="/services#logistics-support"
            />

            <InteractiveServiceCard
              icon={UsersIcon}
              title="Customer Service"
              description="Deliver exceptional customer experiences 24/7."
              href="/services#customer-service"
            />

            <InteractiveServiceCard
              icon={DatabaseIcon}
              title="Data Entry & Processing"
              description="Accurate and efficient data management solutions."
              href="/services#data-entry"
            />
          </div>
          <Link
            href="/services"
            className="inline-flex items-center bg-mjdat-green text-mjdat-dark hover:bg-mjdat-light-green transition-colors text-lg px-8 py-3 rounded-md font-medium"
          >
            View All Services <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </section>

        {/* New Static Section: Our Approach */}
        <section className="w-full max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">
            Our Unique Approach
          </h2>
          <p className="text-lg text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            We combine cutting-edge technology with human expertise to deliver
            unparalleled BPO solutions. Our process is designed for maximum
            efficiency and client satisfaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 shadow-lg">
              <ZapIcon className="h-12 w-12 text-mjdat-green mb-4" />
              <h3 className="text-xl font-semibold text-mjdat-green">
                Agile Implementation
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Rapid deployment and iterative improvements for quick results.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 shadow-lg">
              <ShieldCheckIcon className="h-12 w-12 text-mjdat-green mb-4" />
              <h3 className="text-xl font-semibold text-mjdat-green">
                Data Security
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Robust protocols to protect your sensitive information.
              </p>
            </div>
            <div className="flex flex-col items-center text-center bg-mjdat-dark/50 border border-mjdat-green/20 rounded-lg p-6 shadow-lg">
              <TrendingUpIcon className="h-12 w-12 text-mjdat-green mb-4" />
              <h3 className="text-xl font-semibold text-mjdat-green">
                Continuous Optimization
              </h3>
              <p className="text-gray-300 text-sm mt-2">
                Always seeking ways to enhance performance and value.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="w-full max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">
            Why Choose MJDAt Solutions?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <DollarSignIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">
                  Cost Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Reduce operational costs without compromising on quality.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <LightbulbIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">
                  Expertise & Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Leverage our industry-leading knowledge and cutting-edge tech.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <ScaleIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">
                  Scalability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Adapt quickly to changing business needs with flexible
                  solutions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6 text-center">
              <CardHeader className="flex flex-col items-center">
                <HandshakeIcon className="h-12 w-12 text-mjdat-green mb-4" />
                <CardTitle className="text-xl font-semibold">
                  Client-Centric Approach
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  Your success is our priority, with tailored solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full max-w-6xl mx-auto py-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6">
              <CardContent className="flex flex-col items-center text-center">
                <QuoteIcon className="h-10 w-10 text-mjdat-green mb-4" />
                <p className="text-lg text-gray-300 italic mb-4">
                  "MJDAt Solutions transformed our logistics operations. Their
                  efficiency and dedication are unmatched. Highly recommended!"
                </p>
                <p className="font-semibold text-mjdat-green">
                  - John Doe, CEO of Logistics Corp
                </p>
              </CardContent>
            </Card>
            <Card className="bg-mjdat-dark/50 border border-mjdat-green/20 text-mjdat-text-light p-6">
              <CardContent className="flex flex-col items-center text-center">
                <QuoteIcon className="h-10 w-10 text-mjdat-green mb-4" />
                <p className="text-lg text-gray-300 italic mb-4">
                  "Their customer service team is exceptional. Our client
                  satisfaction scores have never been higher since partnering
                  with MJDAt."
                </p>
                <p className="font-semibold text-mjdat-green">
                  - Jane Smith, Head of Customer Experience at Retail Co.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Latest News & Announcements Section (with Suspense) */}
        <Suspense
          fallback={
            <section className="w-full max-w-6xl mx-auto py-16 text-center">
              <h2 className="text-4xl font-bold text-center mb-12 text-mjdat-green">
                Latest News & Announcements
              </h2>
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mjdat-green" />
                <p className="text-xl text-mjdat-green">Loading news...</p>
              </div>
            </section>
          }
        >
          <LatestNewsSection />
        </Suspense>

        {/* Call to Action Section */}
        <section className="w-full max-w-6xl mx-auto py-16 text-center">
          <h2 className="text-4xl font-bold text-mjdat-green mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Contact us today for a free consultation and discover how MJDAt
            Solutions can drive your success.
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
  );
}
